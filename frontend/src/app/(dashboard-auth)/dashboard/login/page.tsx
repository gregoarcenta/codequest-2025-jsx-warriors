"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";

export default function DashboardLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const checkAuth = setTimeout(() => {
      if (isAuthenticated && user && user.roles.includes("admin")) {
        router.push("/dashboard");
      }
      setIsCheckingAuth(false);
    }, 100); // Pequeño delay para permitir que Zustand se hidrate

    return () => clearTimeout(checkAuth);
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("auth/signin", {
        email,
        password,
      });

      const { accessToken, user } = response.data;

      // Verificar que el usuario tenga rol admin
      if (!user.roles.includes("admin")) {
        setError("No tienes permisos para acceder al dashboard");
        return;
      }

      // Guardar en el store
      login(accessToken, user);

      // Redirigir al dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        setError("Credenciales incorrectas");
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido a DevTalles
        </h1>
        <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Usuario
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">
            Contraseña
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="•••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="pl-10 pr-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 disabled:opacity-50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-gray-300 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <Label htmlFor="remember" className="text-sm text-gray-600">
              Recordar sesión
            </Label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>

      {/* Copyright */}
      <div className="text-center pt-4">
        <p className="text-gray-500 text-xs">
          © {dayjs().year()} DevTalles - Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
