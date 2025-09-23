"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Loader2Icon,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/auth-store";

export default function ForgotPasswordForm() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isHydrated, setIsHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para reset password
  const [token, setToken] = useState<string | null>(null);
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.push("/perfil");
      return;
    }
  }, [isHydrated, isAuthenticated]);

  useEffect(() => {
    if (isHydrated) {
      const tokenParam = searchParams.get("token");
      if (tokenParam) {
        setToken(tokenParam);
        setShowResetForm(true);
      } else {
        // Si no hay token, resetear estados relacionados con el reset
        setToken(null);
        setShowResetForm(false);
        setResetPasswordData({ password: "", confirmPassword: "" });
        setResetSuccess(false);
        setShowPassword(false);
        setShowConfirmPassword(false);
      }
    }
  }, [isHydrated, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setIsSubmitted(true);
      toast.success("Correo de recuperación enviado");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Error al enviar el correo de recuperación";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswordRequirement = (type: string) => {
    const password = resetPasswordData.password;
    switch (type) {
      case "length":
        return password.length >= 6;
      case "uppercase":
        return /[A-Z]/.test(password);
      case "lowercase":
        return /[a-z]/.test(password);
      case "number":
        return /[0-9]/.test(password);
      default:
        return false;
    }
  };

  const isPasswordValid = () => {
    return (
      checkPasswordRequirement("length") &&
      checkPasswordRequirement("uppercase") &&
      checkPasswordRequirement("lowercase") &&
      checkPasswordRequirement("number")
    );
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!isPasswordValid()) {
      toast.error("La contraseña no cumple con los requisitos mínimos");
      return;
    }

    try {
      setResetLoading(true);
      await api.post("/auth/reset-password", {
        token,
        password: resetPasswordData.password,
      });
      setResetSuccess(true);
      router.push("/login");
      toast.success("Contraseña actualizada exitosamente");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al actualizar la contraseña";
      toast.error(errorMessage);
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setResetPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mostrar loading durante la hidratación o si está autenticado
  if (!isHydrated || isAuthenticated) {
    return (
      <section className="relative -mt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-md relative z-10">
              <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                <CardContent className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Loader2Icon className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
                    <p className="text-slate-600 dark:text-slate-400">
                      {isAuthenticated ? "Redirigiendo..." : "Cargando..."}
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
                  {showResetForm ? "Nueva Contraseña" : "Recuperar Contraseña"}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {showResetForm
                    ? "Ingresa tu nueva contraseña"
                    : !isSubmitted
                    ? "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"
                    : "Hemos enviado las instrucciones a tu correo electrónico"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {showResetForm && !resetSuccess ? (
                  /* Reset Password Form with Token */
                  <form
                    onSubmit={handleResetPasswordSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Nueva Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={resetPasswordData.password}
                          onChange={handleResetPasswordChange}
                          className="pl-10 pr-10 h-10 text-sm border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
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

                      {/* Requisitos de Contraseña */}
                      {resetPasswordData.password && (
                        <div className="space-y-2 mt-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md border">
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Requisitos de contraseña:
                          </p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className={`${
                                  checkPasswordRequirement("length")
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                              >
                                {checkPasswordRequirement("length")
                                  ? "✅"
                                  : "❌"}
                              </span>
                              <span
                                className={`${
                                  checkPasswordRequirement("length")
                                    ? "text-green-600"
                                    : "text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                Mínimo 6 caracteres
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className={`${
                                  checkPasswordRequirement("uppercase")
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                              >
                                {checkPasswordRequirement("uppercase")
                                  ? "✅"
                                  : "❌"}
                              </span>
                              <span
                                className={`${
                                  checkPasswordRequirement("uppercase")
                                    ? "text-green-600"
                                    : "text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                Al menos 1 letra mayúscula
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className={`${
                                  checkPasswordRequirement("lowercase")
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                              >
                                {checkPasswordRequirement("lowercase")
                                  ? "✅"
                                  : "❌"}
                              </span>
                              <span
                                className={`${
                                  checkPasswordRequirement("lowercase")
                                    ? "text-green-600"
                                    : "text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                Al menos 1 letra minúscula
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className={`${
                                  checkPasswordRequirement("number")
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                              >
                                {checkPasswordRequirement("number")
                                  ? "✅"
                                  : "❌"}
                              </span>
                              <span
                                className={`${
                                  checkPasswordRequirement("number")
                                    ? "text-green-600"
                                    : "text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                Al menos 1 número
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Confirmar Nueva Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={resetPasswordData.confirmPassword}
                          onChange={handleResetPasswordChange}
                          className="pl-10 pr-12 h-10 text-sm border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                          {resetPasswordData.confirmPassword && (
                            <div>
                              {resetPasswordData.password ===
                              resetPasswordData.confirmPassword ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-red-500" />
                              )}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={
                        !isPasswordValid() ||
                        resetPasswordData.password !==
                          resetPasswordData.confirmPassword ||
                        resetLoading
                      }
                    >
                      {resetLoading ? (
                        <>
                          <Loader2Icon className="animate-spin mr-2" />
                          Actualizando contraseña...
                        </>
                      ) : (
                        "Actualizar Contraseña"
                      )}
                    </Button>
                  </form>
                ) : resetSuccess ? (
                  /* Success Message for Password Reset */
                  <div className="text-center space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        ¡Contraseña actualizada!
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Tu contraseña ha sido actualizada exitosamente. Ya
                        puedes iniciar sesión con tu nueva contraseña.
                      </p>
                    </div>

                    <Button
                      onClick={() => router.push("/login")}
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      Ir a Iniciar Sesión
                    </Button>
                  </div>
                ) : !isSubmitted ? (
                  /* Reset Password Form */
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Te enviaremos un enlace seguro para restablecer tu
                        contraseña
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Enviando...</span>
                        </div>
                      ) : (
                        "Enviar Enlace de Recuperación"
                      )}
                    </Button>
                  </form>
                ) : (
                  /* Success Message */
                  <div className="text-center space-y-4">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        ¡Correo enviado!
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Hemos enviado un enlace de recuperación a:
                      </p>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {email}
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                        Próximos pasos:
                      </h4>
                      <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                        <li>• Revisa tu bandeja de entrada</li>
                        <li>• Verifica también la carpeta de spam</li>
                        <li>• Haz clic en el enlace del correo</li>
                        <li>• El enlace expira en 1 hora</li>
                      </ul>
                    </div>

                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setEmail("");
                      }}
                      variant="outline"
                      className="w-full border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                    >
                      Enviar a otro correo
                    </Button>
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="w-full space-y-4">
                  {/* Back to login */}
                  {!showResetForm && !resetSuccess && (
                    <div className="text-center">
                      <Link
                        href="/login"
                        className="inline-flex items-center text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 font-medium text-sm transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al inicio de sesión
                      </Link>
                    </div>
                  )}

                  {/* Sign up link */}
                  {!showResetForm && !resetSuccess && (
                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                      ¿No tienes una cuenta?{" "}
                      <Link
                        href="/registro"
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold"
                      >
                        Regístrate aquí
                      </Link>
                    </div>
                  )}

                  {/* Reset form navigation */}
                  {showResetForm && !resetSuccess && (
                    <div className="text-center">
                      <Link
                        href="/forgot-password"
                        className="inline-flex items-center text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 font-medium text-sm transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Solicitar nuevo enlace
                      </Link>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
