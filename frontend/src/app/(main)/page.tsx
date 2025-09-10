import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, ArrowRight, BookOpen } from "lucide-react";
import HeroMascot from "@/components/HeroMascot";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const featuredArticles: Article[] = [
  {
    id: "1",
    title:
      "Guía Completa de React 19: Las Nuevas Características que Debes Conocer",
    description:
      "Descubre todas las nuevas características de React 19, incluyendo Server Components, mejoras en el manejo del estado y optimizaciones de rendimiento.",
    category: "Frontend",
    author: "Fernando Herrera",
    publishDate: "2025-01-08",
    readTime: "12 min",
    image: "https://picsum.photos/400/240?random=1",
    featured: true,
  },
  {
    id: "2",
    title: "Next.js 15: Revolucionando el Desarrollo Full-Stack",
    description:
      "Explora las características más importantes de Next.js 15 y cómo pueden mejorar tu flujo de desarrollo.",
    category: "Frontend",
    author: "Gabriel Chaldú",
    publishDate: "2025-01-07",
    readTime: "8 min",
    image: "https://picsum.photos/400/240?random=2",
    featured: true,
  },
  {
    id: "3",
    title: "Microservicios con Node.js y Docker: Arquitectura Escalable",
    description:
      "Aprende a construir una arquitectura de microservicios robusta utilizando Node.js, Docker y Kubernetes.",
    category: "Backend",
    author: "Ricardo Cuéllar",
    publishDate: "2025-01-06",
    readTime: "15 min",
    image: "https://picsum.photos/400/240?random=3",
    featured: true,
  },
];

const recentArticles: Article[] = [
  {
    id: "4",
    title: "Python y FastAPI: Creando APIs Modernas y Eficientes",
    description: "Tutorial paso a paso para crear APIs robustas con FastAPI.",
    category: "Backend",
    author: "Teddy Paz",
    publishDate: "2025-01-05",
    readTime: "10 min",
    image: "https://picsum.photos/300/180?random=4",
  },
  {
    id: "5",
    title: "React Native vs Flutter: ¿Cuál Elegir en 2025?",
    description:
      "Comparativa completa entre las dos tecnologías móviles más populares.",
    category: "Mobile",
    author: "Mariangel Yajure",
    publishDate: "2025-01-04",
    readTime: "7 min",
    image: "https://picsum.photos/300/180?random=5",
  },
  {
    id: "6",
    title: "Inteligencia Artificial en el Desarrollo: Herramientas Esenciales",
    description:
      "Las mejores herramientas de IA que todo desarrollador debería conocer.",
    category: "AI",
    author: "Fernando Herrera",
    publishDate: "2025-01-03",
    readTime: "9 min",
    image: "https://picsum.photos/300/180?random=6",
  },
  {
    id: "7",
    title: "CSS Grid y Flexbox: Dominando el Layout Moderno",
    description: "Guía práctica para crear layouts responsive y modernos.",
    category: "Frontend",
    author: "Gabriel Chaldú",
    publishDate: "2025-01-02",
    readTime: "6 min",
    image: "https://picsum.photos/300/180?random=7",
  },
];

const categories = [
  { name: "Frontend", count: 24, color: "bg-blue-500" },
  { name: "Backend", count: 18, color: "bg-green-500" },
  { name: "Mobile", count: 12, color: "bg-purple-500" },
  { name: "DevOps", count: 8, color: "bg-orange-500" },
  { name: "AI", count: 6, color: "bg-pink-500" },
];

export default function MainHome() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
                  ¡Impulsa tu carrera
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-white bg-clip-text text-transparent">
                  hasta las estrellas!
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Aprende a tu ritmo y potencia tu carrera desde cualquier lugar
                del universo, con nuestros artículos, tutoriales y recursos de
                frontend y backend de la mano de expertos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explorar Artículos
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/80 text-white bg-white/10 hover:bg-white hover:text-slate-900 text-lg px-8 py-4 backdrop-blur-sm shadow-lg hover:shadow-white/25 transition-all duration-300"
                >
                  Unirse a la Comunidad
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right side - Hero image */}
            <div className="flex justify-center lg:justify-end">
              <HeroMascot />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative container mx-auto px-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                +872k
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Desarrolladores leyendo nuestro contenido
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                +150
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Artículos técnicos publicados
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                +40k
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Miembros en nuestra comunidad
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Artículos Destacados
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Los mejores artículos seleccionados por nuestra comunidad de
              expertos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <Card
                key={article.id}
                className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:shadow-slate-700/50 dark:bg-slate-800 ${
                  index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={index === 0 ? 800 : 400}
                    height={index === 0 ? 400 : 240}
                    className="w-full h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    {article.category}
                  </Badge>
                  {article.featured && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                      Destacado
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 dark:text-white">
                    <Link href={`/articles/${article.id}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          {new Date(article.publishDate).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles and Sidebar */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Recent Articles */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Artículos Recientes
                </h2>
                <Link
                  href="/articles"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium flex items-center"
                >
                  Ver todos
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-8">
                {recentArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md dark:shadow-slate-700/50 dark:bg-slate-800"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative overflow-hidden rounded-l-lg">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={300}
                          height={180}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3 line-clamp-2 dark:text-white">
                          <Link href={`/articles/${article.id}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                          {article.description}
                        </CardDescription>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              {new Date(article.publishDate).toLocaleDateString(
                                "es-ES",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <Card className="border-0 shadow-lg dark:shadow-slate-700/50 dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">
                    Categorías Populares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/articles/${category.name.toLowerCase()}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${category.color}`}
                          ></div>
                          <span className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 dark:text-white">
                            {category.name}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="dark:bg-slate-700 dark:text-slate-300"
                        >
                          {category.count}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="border-0 shadow-lg dark:shadow-slate-700/50 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">
                    ¡Únete a nuestra newsletter!
                  </CardTitle>
                  <CardDescription className="dark:text-slate-300">
                    Recibe los mejores artículos y novedades directamente en tu
                    email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Suscribirse
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="border-0 shadow-lg dark:shadow-slate-700/50 bg-gradient-to-br from-slate-900 to-purple-900 dark:from-slate-800 dark:to-purple-800 text-white">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    Únete a nuestra comunidad
                  </CardTitle>
                  <CardDescription className="text-slate-200 dark:text-slate-300">
                    Conecta con otros developers en Discord
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4]">
                    Unirse a Discord
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
