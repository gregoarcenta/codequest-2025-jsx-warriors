import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function TerminosCondicionesPage() {
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
              Términos y Condiciones
            </span>
          </h1>
          <p className="text-purple-100 dark:text-purple-200 text-lg max-w-2xl mx-auto">
            Condiciones de uso del blog y servicios relacionados de DevTalles
          </p>
        </div>
      </section>

      {/* Terms Section */}
      <section className="relative -mt-8 pb-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-white/20 dark:border-slate-700 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md relative z-10">
              <CardContent className="p-8 md:p-12">
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center">
                      Términos de Uso del Blog
                    </h2>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                          Última actualización
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          12 de septiembre de 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Section 1 */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      1. Aceptación de los Términos
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Al acceder y utilizar el blog de DevTalles, aceptas
                        estar sujeto a estos términos y condiciones. Si no estás
                        de acuerdo con alguna parte de estos términos, no debes
                        utilizar nuestro servicio.
                      </p>
                      <p>
                        Estos términos se aplican a todos los visitantes,
                        usuarios y otras personas que accedan o utilicen el blog
                        y sus servicios relacionados.
                      </p>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      2. Uso del Contenido
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        El contenido del blog, incluyendo artículos, tutoriales,
                        código fuente y materiales educativos, está disponible
                        para uso personal y educativo.
                      </p>
                      <p>
                        <strong>Está permitido:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Leer y estudiar el contenido</li>
                        <li>Compartir enlaces a los artículos</li>
                        <li>Citar el contenido con la debida atribución</li>
                        <li>
                          Utilizar el código de ejemplo en proyectos personales
                        </li>
                      </ul>
                      <p>
                        <strong>No está permitido:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          Copiar y redistribuir el contenido sin autorización
                        </li>
                        <li>
                          Utilizar el contenido con fines comerciales sin
                          permiso
                        </li>
                        <li>
                          Modificar el contenido y presentarlo como propio
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      3. Comentarios y Participación
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Al participar en los comentarios o discusiones del blog,
                        te comprometes a:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Mantener un tono respetuoso y constructivo</li>
                        <li>
                          No publicar contenido ofensivo, discriminatorio o
                          inapropiado
                        </li>
                        <li>
                          No hacer spam o promocionar productos no relacionados
                        </li>
                        <li>
                          Respetar los derechos de autor y propiedad intelectual
                        </li>
                        <li>No compartir información personal sensible</li>
                      </ul>
                      <p>
                        Nos reservamos el derecho de moderar, editar o eliminar
                        comentarios que no cumplan con estas pautas.
                      </p>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      4. Privacidad y Datos
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Recopilamos información mínima necesaria para mejorar tu
                        experiencia en el blog:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          Información de registro (nombre, email) para
                          comentarios
                        </li>
                        <li>
                          Datos de navegación para analíticas y mejoras del
                          sitio
                        </li>
                        <li>Preferencias de usuario para personalización</li>
                      </ul>
                      <p>
                        No vendemos ni compartimos tu información personal con
                        terceros sin tu consentimiento. Para más detalles,
                        consulta nuestra Política de Privacidad.
                      </p>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      5. Responsabilidades y Limitaciones
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        El contenido del blog se proporciona "tal como está" con
                        fines educativos e informativos. Aunque nos esforzamos
                        por mantener la información actualizada y precisa:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          No garantizamos la exactitud completa de todo el
                          contenido
                        </li>
                        <li>
                          No somos responsables de daños derivados del uso de la
                          información
                        </li>
                        <li>
                          Recomendamos verificar la información antes de
                          implementarla en producción
                        </li>
                        <li>
                          Las tecnologías evolucionan, el contenido puede
                          volverse obsoleto
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Section 6 */}
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      6. Modificaciones y Actualizaciones
                    </h3>
                    <div className="text-slate-600 dark:text-slate-300 space-y-3">
                      <p>
                        Nos reservamos el derecho de modificar estos términos en
                        cualquier momento. Los cambios significativos serán
                        notificados a través del blog.
                      </p>
                      <p>
                        También podemos actualizar, modificar o discontinuar
                        cualquier aspecto del blog sin previo aviso, aunque
                        haremos nuestro mejor esfuerzo para mantener la
                        continuidad del servicio.
                      </p>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                          ¿Tienes preguntas sobre estos términos?
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                          Si tienes dudas sobre estos términos y condiciones o
                          necesitas aclaraciones, no dudes en contactarnos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
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
                            className="border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Link href="mailto:legal@devtalles.com">
                              <Mail className="h-4 w-4 mr-2" />
                              Email Legal
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
