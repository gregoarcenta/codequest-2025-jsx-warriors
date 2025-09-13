"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  Heart,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "YouTube",
    description: "Tutoriales completos de programación y desarrollo web",
    followers: "1.2M suscriptores",
    color: "from-red-500 to-red-500",
    hoverColor: "hover:from-red-500 hover:to-red-600",
    url: "https://youtube.com/@devtalles",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    description: "Videos cortos y tips rápidos de desarrollo",
    followers: "300K seguidores",
    color: "from-black to-black",
    hoverColor: "hover:from-gray-800 hover:to-black",
    url: "https://www.tiktok.com/@devtallescorp",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    description: "Noticias, tips rápidos y actualizaciones del mundo tech",
    followers: "180K seguidores",
    color: "from-slate-700 to-slate-800",
    hoverColor: "hover:from-slate-800 hover:to-slate-900",
    url: "https://x.com/devtalles",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    description: "Contenido profesional y oportunidades de networking",
    followers: "95K seguidores",
    color: "from-blue-600 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
    url: "https://linkedin.com/company/devtalles",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    description: "Comunidad activa con eventos y actualizaciones",
    followers: "75K seguidores",
    color: "from-blue-500 to-blue-500",
    hoverColor: "hover:from-blue-500 hover:to-blue-600",
    url: "https://facebook.com/DevTallesCorp",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    description: "Chat en tiempo real con la comunidad de desarrolladores",
    followers: "45K miembros",
    color: "from-indigo-500 to-purple-600",
    hoverColor: "hover:from-indigo-600 hover:to-purple-700",
    url: "https://discord.gg/pBjEVYTC7t",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.191.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    description: "Podcast semanal sobre desarrollo y tecnología",
    followers: "25K oyentes",
    color: "from-green-500 to-green-500",
    hoverColor: "hover:from-green-500 hover:to-green-600",
    url: "https://open.spotify.com/show/0jrfxcnCrD7N9tlA0BGJp5",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Podcasts",
    description: "Escucha nuestro podcast en el ecosistema Apple",
    followers: "18K suscriptores",
    color: "from-gray-800 to-black",
    hoverColor: "hover:from-gray-900 hover:to-black",
    url: "https://podcasts.apple.com/ec/podcast/devtalles/id1553730966",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
];

const coursesPlatform = {
  name: "Cursos DevTalles",
  description: "Plataforma oficial con cursos premium de desarrollo web",
  students: "150K+ estudiantes",
  courses: "50+ cursos disponibles",
  color: "from-purple-600 to-pink-600",
  hoverColor: "hover:from-purple-700 hover:to-pink-700",
  url: "https://cursos.devtalles.com",
  icon: <BookOpen className="w-8 h-8" />,
};

const communityStats = [
  {
    icon: <Users className="w-6 h-6" />,
    label: "Desarrolladores Activos",
    value: "250K+",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    label: "Mensajes por Día",
    value: "5K+",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    label: "Eventos Mensuales",
    value: "12+",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: <Star className="w-6 h-6" />,
    label: "Proyectos Compartidos",
    value: "1K+",
    color: "text-yellow-600 dark:text-yellow-400",
  },
];

export default function ComunidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Full Width Header/Cover */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
                Únete a nuestra
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-white bg-clip-text text-transparent">
                comunidad global
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
              Conecta con más de 250,000 desarrolladores, comparte conocimiento
              y crece profesionalmente en el ecosistema DevTalles
            </p>

            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className={`${stat.color} mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Courses Platform Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Conecta con DevTalles
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Explora nuestra plataforma oficial y síguenos en todas nuestras
                redes sociales
              </p>
            </div>

            {/* DevTalles Courses - Full Width */}
            <div className="mb-16">
              <Link
                href={coursesPlatform.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${coursesPlatform.color} ${coursesPlatform.hoverColor} p-8 text-white transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-pink-600/5"></div>
                  <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                  </div>

                  <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {coursesPlatform.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-3xl font-bold mb-2">
                          {coursesPlatform.name}
                        </h3>
                        <p className="text-white/90 text-lg mb-3">
                          {coursesPlatform.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <Users className="w-5 h-5" />
                            <span className="font-semibold">
                              {coursesPlatform.students}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <BookOpen className="w-5 h-5" />
                            <span className="font-semibold">
                              {coursesPlatform.courses}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/90 group-hover:text-white transition-colors duration-300">
                      <span className="text-xl font-semibold">
                        Explorar Cursos
                      </span>
                      <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Social Networks - Full Width */}
            <div className="space-y-8">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`group relative overflow-hidden rounded-2xl my-4 bg-gradient-to-r ${social.color} ${social.hoverColor} p-6 text-white transition-all duration-500 transform hover:scale-[1.01] shadow-lg hover:shadow-xl`}
                  >
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 opacity-3">
                      <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white blur-xl"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white blur-lg"></div>
                    </div>

                    {/* Content */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {social.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {social.name}
                          </h3>
                          <p className="text-white/90 text-sm mb-2 line-clamp-2">
                            {social.description}
                          </p>
                          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium w-fit">
                            {social.followers}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/90 group-hover:text-white transition-colors duration-300">
                        <span className="font-semibold hidden sm:block">
                          Seguir
                        </span>
                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-20 text-center">
            <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/20 border-blue-200 dark:border-blue-800/50 shadow-lg">
              <CardContent className="py-12">
                <div className="max-w-3xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    ¿Listo para formar parte?
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                    Únete a nuestra comunidad global y entérate de las últimas
                    novedades, eventos y recursos exclusivos para
                    desarrolladores.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Crear Cuenta
                        <Users className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
