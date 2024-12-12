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
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserStore>((set: any) => ({
  user: null,
  isLoggedIn: false,
  profiling_form: 0,
  login: async (email: string, password: string) => {
    const response = await axios.post(`${api.url}/auth/login`, {
      email,
      password,
    });
    set({
      user: response.data,
      isLoggedIn: true,
      profiling_form: response.data.profiling_form,
    });
  },

  register: async (name, email, password) => {
    // Simula una solicitud a la API

    set({ user: "", isLoggedIn: true });
  },

  logout: async () => {
    await axios.post(`${api.url}/auth/logout`, {});
    set({ user: null, isLoggedIn: false });
  },
}));

export default useUserStore;
