"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

export default function DashboardForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Password reset request for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">¡Email Enviado!</h1>
          <p className="text-gray-600">
            Hemos enviado las instrucciones de recuperación a tu correo
            electrónico
          </p>
        </div>

        {/* Email Display */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-purple-600 font-medium">{email}</p>
        </div>

        {/* Instructions */}
        <div className="space-y-4 text-left">
          <h3 className="text-gray-900 font-semibold">Próximos pasos:</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">1.</span>
              <span>Revisa tu bandeja de entrada (y carpeta de spam)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">2.</span>
              <span>Haz clic en el enlace de recuperación</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">3.</span>
              <span>Crea tu nueva contraseña</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-600 font-bold">4.</span>
              <span>Inicia sesión con tu nueva contraseña</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="w-full bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
          >
            Enviar nuevamente
          </Button>

          <Link href="/dashboard/login">
            <Button
              variant="ghost"
              className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio de sesión
            </Button>
          </Link>
        </div>

        {/* Support */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-xs">
            ¿No recibiste el email? Revisa tu carpeta de spam o{" "}
            <Link
              href="/contact"
              className="text-purple-600 hover:text-purple-700"
            >
              contacta con soporte
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Recuperar Contraseña
        </h1>
        <p className="text-gray-600">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para
          recuperar tu cuenta
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">
            Correo Electrónico
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
              required
            />
          </div>
          <p className="text-xs text-gray-500">
            Te enviaremos un enlace de recuperación a esta dirección
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Enviar Instrucciones
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">O</span>
        </div>
      </div>

      {/* Back to Login */}
      <Link href="/dashboard/login">
        <Button
          variant="outline"
          className="w-full bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Inicio de Sesión
        </Button>
      </Link>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3 mt-3">
        <h3 className="text-gray-900 font-semibold text-sm">
          ¿Necesitas ayuda?
        </h3>
        <ul className="space-y-2 text-gray-600 text-xs">
          <li>• Asegúrate de usar el email registrado en tu cuenta</li>
          <li>• Revisa tu carpeta de spam o correos no deseados</li>
          <li>• El enlace de recuperación expira en 24 horas</li>
        </ul>
        <Link
          href="/contact"
          className="text-purple-600 hover:text-purple-700 text-xs transition-colors inline-block"
        >
          Contactar soporte →
        </Link>
      </div>
    </div>
  );
}
