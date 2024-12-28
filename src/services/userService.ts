import api from "../utils/api";

export const userService = {
  getUserProfile: async (idUser: number | null) => {
    const response = await api.get(`/user/userProfile/${idUser}`);
    return response.data;
  },

  updateUserProfile: async (userData: any, idUser: number | null) => {
    const response = await api.post(`/user/userProfile/${idUser}`, userData);
    return response.data;
  },
  getUserRoutines: async (idUser: number | null) => {
    const response = await api.get(`user/userRoutines/${idUser}`);
    return response.data;
  },
  createUserRoutines: async (userData: any, idUser: number | null) => {
    const response = await api.post(`user/userRoutines/${idUser}`, userData);
    return response.data;
  },
  createUserRecipes: async (userData: any, idUser: number | null) => {
    const response = await api.post(`user/userRecipes/${idUser}`, userData);
    return response.data;
  },
};
