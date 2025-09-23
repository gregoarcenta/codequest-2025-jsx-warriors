"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, Loader2Icon } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [processingDiscordToken, setProcessingDiscordToken] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await api.post("auth/signin", formData);
      login(resp.data.accessToken, resp.data.user);
      router.push("/perfil");
      toast.success("Inicio de sesión exitoso!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Error de credenciales, intente de nuevo.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginDiscord = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/discord`;
  };

  // Función para hacer login automático con token de Discord
  const handleDiscordTokenLogin = async (token: string) => {
    try {
      setProcessingDiscordToken(true);

      // Usar el endpoint check-status para validar el token y obtener los datos del usuario
      const response = await api.get("/auth/check-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Si la respuesta es exitosa, hacer login
      if (response.data && response.data.user) {
        login(token, response.data.user);

        // Limpiar el token de la URL
        const url = new URL(window.location.href);
        url.searchParams.delete("token");
        window.history.replaceState({}, "", url.toString());

        toast.success("¡Inicio de sesión con Discord exitoso!");
        router.push("/perfil");
      }
    } catch (error: any) {
      console.error("Error en login con Discord:", error);
      const errorMessage =
        error.response?.data?.message || "Error al autenticar con Discord";
      toast.error(errorMessage);

      // Limpiar el token de la URL en caso de error
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.toString());
    } finally {
      setProcessingDiscordToken(false);
    }
  };

  // Verificar hidratación del estado de auth
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Verificar si hay token de Discord en la URL y hacer login automático
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      const token = searchParams.get("token");
      if (token && !processingDiscordToken) {
        handleDiscordTokenLogin(token);
      }
    }
  }, [isHydrated, searchParams, isAuthenticated, processingDiscordToken]);

  // Redirigir si está autenticado (solo después de hidratación)
  useEffect(() => {
    if (isHydrated && isAuthenticated && !processingDiscordToken) {
      router.push("/perfil");
      return;
    }
  }, [isAuthenticated, router, isHydrated, processingDiscordToken]);

  // Mostrar loading durante la hidratación inicial o procesamiento de token Discord
  if (!isHydrated || processingDiscordToken) {
    return (
      <section className="relative -mt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md relative z-10">
              <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                <CardContent className="py-16">
                  <div className="text-center">
                    <Loader2Icon className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
                    <p className="text-slate-600 dark:text-slate-400">
                      {processingDiscordToken
                        ? "Autenticando con Discord..."
                        : "Inicializando..."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative -mt-8 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md relative z-10">
            <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
              <CardHeader className="text-center pb-6">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div className="relative h-16 w-16 p-2 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50">
                    <Image
                      src="/DEVTALLES-LOGO-CIRCULO.png"
                      alt="DevTalles Logo"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                  Iniciar Sesión
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Accede a tu cuenta para continuar aprendiendo
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Login Buttons */}
                <div className="space-y-3">
                  {/*   <Button
                      variant="outline"
                      className="w-full h-12 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 bg-white/50 dark:bg-transparent"
                      onClick={() => console.log("Login with Google")}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            className="text-blue-500"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            className="text-green-500"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            className="text-yellow-500"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            className="text-red-500"
                          />
                        </svg>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          Continuar con Google
                        </span>
                      </div>
                    </Button>
 */}
                  <Button
                    variant="outline"
                    className="w-full h-12 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 bg-white/50 dark:bg-transparent"
                    onClick={loginDiscord}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <svg
                        className="w-5 h-5 text-indigo-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.191.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Continuar con Discord
                      </span>
                    </div>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-slate-200 dark:bg-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400 font-medium">
                      O continúa con
                    </span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 h-12 border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 dark:border-slate-600 text-purple-600 focus:ring-purple-500 dark:bg-slate-700"
                      />
                      <span>Recordarme</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mt-6"
                  >
                    {loading ? (
                      <>
                        <Loader2Icon className="animate-spin" /> Verificando...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className="pt-6">
                <div className="text-center w-full text-sm text-slate-600 dark:text-slate-400">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/registro"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold"
                  >
                    Regístrate aquí
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
