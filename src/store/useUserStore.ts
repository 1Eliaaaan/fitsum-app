import { create } from "zustand";
import { apiUrl } from "../config/config";
import axios from "axios";
import { PersistOptions, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface UserStore {
  profiling_form: number;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
  token: string | null;
  userId: number | null;
  email: string | undefined;
  name: string | undefined;
}
interface JwtPayload {
  exp: number;
}

const useUserStore = create<UserStore>()(
  persist(
    (set: any, get: any) => ({
      isAuthenticated: false,
      profiling_form: 0,
      token: null,
      userId: null,
      email: undefined,
      name: undefined,
      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(`${apiUrl.url}/auth/login`, {
            email,
            password,
          });
          if (response.status === 200 && response.data.token) {
            set({
              email: response.data.email,
              name: response.data.username,
              userId: response.data.id,
              isAuthenticated: true,
              profiling_form: response.data.profiling_form,
              token: response.data.token,
            });
          }
        } catch (error: any) {
          set({ error: error.response?.data || error.message });
          throw error;
        }
      },

      register: async (username, email, password) => {
        try {
          const response = await axios.post(`${apiUrl.url}/auth/register`, {
            username,
            email,
            password,
          });

          return response.data;
        } catch (error: any) {
          set({ error: error.response?.data || error.message });
          throw error;
        }
      },

      logout: async () => {
        await axios.post(`${apiUrl.url}/auth/logout`, {});
        set({ token: null, isAuthenticated: false });
      },
      checkAuth: () => {
        const { token } = get();
        if (token) {
          try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
              set({ isAuthenticated: true });
              return true;
            }
          } catch (error) {
            console.error("Error al decodificar el token:", error);
          }
        }
        set({ isAuthenticated: false, token: null });
        return false;
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    } as PersistOptions<UserStore, UserStore>
  )
);

export default useUserStore;
