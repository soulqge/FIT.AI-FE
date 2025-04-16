import api from "../axios";
import { LoginResponse, RegisterResponse } from "../api.types";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", {
      email,
      password,
    });
    return response.data;
  },

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>("/register", {
      email,
      password,
      name,
    });
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("fitai_token");
  },

  getToken(): string | null {
    return localStorage.getItem("fitai_token");
  },

  setToken(token: string): void {
    localStorage.setItem("fitai_token", token);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
