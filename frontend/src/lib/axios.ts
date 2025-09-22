// lib/axios.ts
import { useAuthStore } from "@/stores/auth-store";
import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Tipos base
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Configuración de la instancia base
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api-devtalles.jspadev.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests tipado
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Solo en el cliente
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Interceptor para responses tipado
api.interceptors.response.use(
  <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    return response;
  },
  (error: AxiosError<ApiError>): Promise<AxiosError<ApiError>> => {
    // Manejar errores específicos
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const { logout } = useAuthStore.getState();

        //logout();
        //window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
