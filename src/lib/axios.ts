
import axios, { type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/constants/appUrl";
import { tokenStorage } from "@/lib/tokenStorage";
import { refreshAccessToken } from "@/lib/session";

export const api = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});