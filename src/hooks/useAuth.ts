import { useEffect } from "react";

import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth, logout, login, profiling_form, user } =
    useUserStore();

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/");
    }
  }, [checkAuth, navigate]);

  return { isAuthenticated, checkAuth, logout, login, profiling_form, user };
}
