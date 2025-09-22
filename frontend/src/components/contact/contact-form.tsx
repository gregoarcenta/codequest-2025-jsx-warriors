"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, RotateCcw } from "lucide-react";
import api from "@/lib/axios";

interface ContactFormData {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

const initialFormData: ContactFormData = {
  nombre: "",
  email: "",
  empresa: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setMessage({ type: "error", text: "El nombre es requerido" });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setMessage({ type: "error", text: "Email válido es requerido" });
      return false;
    }
    if (!formData.asunto.trim()) {
      setMessage({ type: "error", text: "El asunto es requerido" });
      return false;
    }
    if (!formData.mensaje.trim()) {
      setMessage({ type: "error", text: "El mensaje es requerido" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Submit to contact API
      await api.post("/contact", {
        fullName: formData.nombre,
        email: formData.email,
        company: formData.empresa || undefined,
        phone: formData.telefono || undefined,
        subject: formData.asunto,
        message: formData.mensaje,
      });

      setMessage({
        type: "success",
        text: "¡Mensaje enviado exitosamente! Te responderemos en menos de 24 horas.",
      });

      // Clear form
      setFormData(initialFormData);
    } catch (error: any) {
      console.error("Error sending contact form:", error);

      if (error.response?.status === 429) {
        setMessage({
          type: "error",
          text: "Has enviado muchos mensajes. Por favor espera un momento antes de enviar otro.",
        });
      } else if (error.response?.status === 400) {
        setMessage({
          type: "error",
          text: "Datos inválidos. Por favor revisa el formulario.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Error al enviar el mensaje. Por favor intenta de nuevo.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData(initialFormData);
    setMessage({ type: "", text: "" });
  };

  return (
    <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <CardContent className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Envíanos un mensaje
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Completa el formulario y nos pondremos en contacto contigo en menos
            de 24 horas.
          </p>
        </div>

        {/* Message display */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="nombre"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Nombre completo *
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                disabled={isSubmitting}
                className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                disabled={isSubmitting}
                className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="empresa"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Empresa / Organización
              </Label>
              <Input
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                placeholder="Nombre de tu empresa"
                disabled={isSubmitting}
                className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="telefono"
                className="text-slate-700 dark:text-slate-300 font-medium"
              >
                Teléfono
              </Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
                className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="asunto"
              className="text-slate-700 dark:text-slate-300 font-medium"
            >
              Asunto *
            </Label>
            <Input
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleInputChange}
              placeholder="¿De qué quieres hablarnos?"
              disabled={isSubmitting}
              className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="mensaje"
              className="text-slate-700 dark:text-slate-300 font-medium"
            >
              Mensaje *
            </Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              placeholder="Cuéntanos más detalles sobre tu consulta o propuesta..."
              rows={6}
              disabled={isSubmitting}
              className="resize-none border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-8 flex-1 sm:flex-initial disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClearForm}
              disabled={isSubmitting}
              className="h-12 px-8 border-slate-300 dark:border-slate-600 disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpiar formulario
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
