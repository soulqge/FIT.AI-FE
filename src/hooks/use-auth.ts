import { authService } from "@/lib/services/auth.service";
import { useEffect, useState } from "react";

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>();

  const fetchToken = () => {
    try {
      const storedToken = authService.getToken();
      setToken(storedToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
      setToken(null);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return { token, refreshToken: fetchToken };
};
