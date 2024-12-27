import api from "../utils/api";

export const userService = {
  getUserProfile: async (idUser: number | null) => {
    const response = await api.get(`/user/userProfile/${idUser}`);
    return response.data;
  },

  updateUserProfile: async (userData: any) => {
    const response = await api.put("/user/profile", userData);
    return response.data;
  },
};
