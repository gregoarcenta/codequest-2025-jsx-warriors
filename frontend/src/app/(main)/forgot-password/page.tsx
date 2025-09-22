"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envío de email
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSubmitted(true);

    // TODO: Implementar lógica de envío de email
    console.log("Reset password email sent to:", email);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      {/* Full Width Header/Cover */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>

        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
              ¿Olvidaste tu contraseña?
            </span>
          </h1>
          <p className="text-purple-100 dark:text-purple-200 text-lg max-w-2xl mx-auto">
            No te preocupes, te ayudaremos a recuperar el acceso a tu cuenta
          </p>
        </div>
      </section>

      {/* Forgot Password Form Section */}
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
                    Recuperar Contraseña
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {!isSubmitted
                      ? "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña"
                      : "Hemos enviado las instrucciones a tu correo electrónico"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {!isSubmitted ? (
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
                    <div className="text-center">
                      <Link
                        href="/login"
                        className="inline-flex items-center text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 font-medium text-sm transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al inicio de sesión
                      </Link>
                    </div>

                    {/* Sign up link */}
                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                      ¿No tienes una cuenta?{" "}
                      <Link
                        href="/registro"
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-semibold"
                      >
                        Regístrate aquí
                      </Link>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
