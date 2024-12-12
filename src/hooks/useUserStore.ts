import { create } from "zustand";
import { api } from "./../config/config";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  profiling_form: number;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserStore>((set: any) => ({
  user: null,
  isLoggedIn: false,
  profiling_form: 0,
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${api.url}/auth/login`, {
        email,
        password,
      });
      set({
        user: response.data,
        isLoggedIn: true,
        profiling_form: response.data.profiling_form,
      });
    } catch (error: any) {
      set({ error: error.response?.data || error.message });
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post(`${api.url}/auth/register`, {
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
    await axios.post(`${api.url}/auth/logout`, {});
    set({ user: null, isLoggedIn: false });
  },
}));

export default useUserStore;
