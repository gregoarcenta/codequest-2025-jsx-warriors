import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  MessageSquare,
  Calendar,
  Cookie,
  UserCheck,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function PoliticaPrivacidadPage() {
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
              Políticas de Privacidad
            </span>
          </h1>
          <p className="text-purple-100 dark:text-purple-200 text-lg max-w-2xl mx-auto">
            Tu privacidad es nuestra prioridad. Conoce cómo protegemos y
            manejamos tu información
          </p>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section className="relative -mt-8 pb-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md relative z-10">
              <CardContent className="p-8 md:p-12">
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center">
                      Política de Privacidad del Blog
                    </h2>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                          Última actualización
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          12 de septiembre de 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Section 1 */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      1. Información que Recopilamos
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-4">
                      <p>
                        En el blog de DevTalles recopilamos información mínima
                        necesaria para brindarte la mejor experiencia de
                        aprendizaje:
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                          <UserCheck className="h-4 w-4" />
                          Información Personal
                        </h4>
                        <ul className="list-disc pl-6 space-y-1 text-blue-800 dark:text-blue-200">
                          <li>
                            Nombre y dirección de email (para comentarios y
                            suscripciones)
                          </li>
                          <li>Avatar o foto de perfil (opcional)</li>
                          <li>Preferencias de contenido y notificaciones</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Información Automática
                        </h4>
                        <ul className="list-disc pl-6 space-y-1 text-purple-800 dark:text-purple-200">
                          <li>Dirección IP y ubicación general</li>
                          <li>Tipo de navegador y dispositivo</li>
                          <li>Páginas visitadas y tiempo de permanencia</li>
                          <li>Artículos leídos y favoritos</li>
                          <li>Historial de búsquedas en el blog</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      2. Cómo Utilizamos tu Información
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Utilizamos la información recopilada exclusivamente para
                        mejorar tu experiencia en el blog y proporcionarte
                        contenido relevante:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Servicios del Blog
                          </h4>
                          <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                            <li>• Gestión de comentarios y discusiones</li>
                            <li>• Recomendaciones de contenido</li>
                            <li>• Notificaciones de nuevos artículos</li>
                            <li>• Funcionalidades de suscripción</li>
                          </ul>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            Mejoras del Sitio
                          </h4>
                          <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                            <li>• Análisis de tráfico y comportamiento</li>
                            <li>• Optimización de rendimiento</li>
                            <li>• Desarrollo de nuevas funciones</li>
                            <li>• Resolución de problemas técnicos</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      3. Cookies y Tecnologías Similares
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Utilizamos cookies y tecnologías similares para mejorar
                        la funcionalidad del blog:
                      </p>

                      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Cookie className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                              Tipos de Cookies
                            </h4>
                            <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                              <li>
                                <strong>Esenciales:</strong> Necesarias para el
                                funcionamiento básico del sitio
                              </li>
                              <li>
                                <strong>Preferencias:</strong> Recordar tu
                                configuración y preferencias
                              </li>
                              <li>
                                <strong>Analíticas:</strong> Entender cómo
                                interactúas con el contenido
                              </li>
                              <li>
                                <strong>Funcionales:</strong> Mejorar
                                características como búsqueda y comentarios
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm">
                        Puedes gestionar tus preferencias de cookies en la
                        configuración de tu navegador. Ten en cuenta que
                        deshabilitar ciertas cookies puede afectar la
                        funcionalidad del blog.
                      </p>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      4. Compartir Información
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Lock className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                              Compromiso de No Venta
                            </h4>
                            <p className="text-red-800 dark:text-red-200">
                              <strong>
                                Nunca vendemos, alquilamos o comercializamos tu
                                información personal.
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>

                      <p>
                        Solo compartimos información en casos muy específicos:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          Con proveedores de servicios esenciales (hosting,
                          analíticas) bajo estrictos acuerdos de
                          confidencialidad
                        </li>
                        <li>
                          Cuando sea requerido por ley o autoridades competentes
                        </li>
                        <li>
                          Para proteger nuestros derechos, propiedad o seguridad
                        </li>
                        <li>
                          Con tu consentimiento explícito para casos específicos
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      5. Tus Derechos y Control
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>Tienes control total sobre tu información personal:</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Settings className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold">
                                Acceso y Rectificación
                              </h4>
                              <p className="text-sm">
                                Ver y corregir tu información personal
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Database className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold">Portabilidad</h4>
                              <p className="text-sm">
                                Exportar tus datos en formato estándar
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Eye className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold">Limitación</h4>
                              <p className="text-sm">
                                Restringir el procesamiento de tus datos
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold">Eliminación</h4>
                              <p className="text-sm">
                                Solicitar la eliminación de tu cuenta
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6 */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      6. Seguridad de los Datos
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Implementamos múltiples capas de seguridad para proteger
                        tu información:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          Cifrado SSL/TLS para todas las transmisiones de datos
                        </li>
                        <li>Almacenamiento seguro en servidores protegidos</li>
                        <li>
                          Acceso limitado a personal autorizado únicamente
                        </li>
                        <li>Auditorías de seguridad regulares</li>
                        <li>Copias de seguridad automatizadas y seguras</li>
                        <li>Monitoreo continuo para detectar amenazas</li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 7 */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      7. Retención de Datos
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Conservamos tu información solo durante el tiempo
                        necesario:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <strong>Datos de cuenta:</strong> Mientras tu cuenta
                          esté activa
                        </li>
                        <li>
                          <strong>Comentarios:</strong> Indefinidamente para
                          mantener la integridad de las discusiones
                        </li>
                        <li>
                          <strong>Analíticas:</strong> Datos agregados y
                          anonimizados por hasta 24 meses
                        </li>
                        <li>
                          <strong>Logs del servidor:</strong> 12 meses para
                          propósitos de seguridad
                        </li>
                      </ul>
                      <p>
                        Puedes solicitar la eliminación de tu cuenta y datos
                        personales en cualquier momento.
                      </p>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex-shrink-0">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                          ¿Preguntas sobre tu Privacidad?
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                          Si tienes preguntas sobre cómo manejamos tu
                          información o quieres ejercer tus derechos de
                          privacidad, estamos aquí para ayudarte.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Link href="/contactanos">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contactar Soporte
                            </Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                          >
                            <Link href="mailto:privacidad@devtalles.com">
                              <Mail className="h-4 w-4 mr-2" />
                              Email Privacidad
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
