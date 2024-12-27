import axios from "axios";
import useUserStore from "../store/useUserStore";
import { apiUrl } from "../config/config";
const api = axios.create({
  baseURL: apiUrl.url,
});

api.interceptors.request.use((config) => {
  const { token } = useUserStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
