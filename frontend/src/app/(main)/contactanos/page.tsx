import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
} from "lucide-react";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
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
              ¡Hablemos!
            </span>
          </h1>
          <p className="text-purple-100 dark:text-purple-200 text-lg max-w-2xl mx-auto">
            ¿Tienes una pregunta, sugerencia o quieres colaborar con nosotros?
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative -mt-8 pb-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
                  <CardContent className="p-8 md:p-12">
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        Envíanos un mensaje
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Completa el formulario y nos pondremos en contacto
                        contigo en menos de 24 horas.
                      </p>
                    </div>

                    <form className="space-y-6">
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
                            placeholder="Tu nombre completo"
                            className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
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
                            type="email"
                            placeholder="tu@email.com"
                            className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
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
                            placeholder="Nombre de tu empresa"
                            className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
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
                            placeholder="+1 (555) 123-4567"
                            className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
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
                          placeholder="¿De qué quieres hablarnos?"
                          className="h-12 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
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
                          placeholder="Cuéntanos más detalles sobre tu consulta o propuesta..."
                          rows={6}
                          className="resize-none border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-8 flex-1 sm:flex-initial"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Enviar mensaje
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 px-8 border-slate-300 dark:border-slate-600"
                        >
                          Limpiar formulario
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2">
                <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md h-fit relative z-10">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">
                      Información de contacto
                    </h3>

                    <div className="grid  gap-4">
                      <div className="group">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800 transition-all duration-200 group-hover:shadow-md">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                            <Mail className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">
                              Email
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 text-xs truncate">
                              hola@devtalles.com
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 transition-all duration-200 group-hover:shadow-md">
                          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                            <Phone className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">
                              Teléfono
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 text-xs">
                              +1 (555) 123-4567
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800 transition-all duration-200 group-hover:shadow-md">
                          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg">
                            <MapPin className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">
                              Ubicación
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 text-xs">
                              EE.UU (Remoto)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-100 dark:border-orange-800 transition-all duration-200 group-hover:shadow-md">
                          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-lg">
                            <Clock className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">
                              Respuesta
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 text-xs">
                              &lt; 24 horas
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
