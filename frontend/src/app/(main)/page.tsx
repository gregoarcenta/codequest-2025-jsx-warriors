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
import {
  CalendarDays,
  User,
  ArrowRight,
  BookOpen,
  Users,
  Heart,
  Eye,
  MessageSquare,
} from "lucide-react";
import HeroMascot from "@/components/hero-mascot";
import { Input } from "@/components/ui/input";

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
  likes: number;
  views: number;
  comments: number;
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
    likes: 245,
    views: 3420,
    comments: 38,
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
    likes: 182,
    views: 2890,
    comments: 24,
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
    likes: 198,
    views: 2156,
    comments: 31,
  },
  {
    id: "4",
    title: "Introducción a GraphQL: La Nueva Forma de Hacer APIs",
    description:
      "Aprende los conceptos básicos de GraphQL y cómo implementarlo en tus proyectos para crear APIs más flexibles y eficientes.",
    category: "Backend",
    author: "Ricardo Cuéllar",
    publishDate: "2025-01-06",
    readTime: "15 min",
    image: "https://picsum.photos/400/240?random=3",
    featured: true,
    likes: 156,
    views: 1897,
    comments: 19,
  },
  {
    id: "5",
    title: "Desarrollo Móvil con Flutter: Crea Apps Nativas en Tiempo Récord",
    description:
      "Aprende a desarrollar aplicaciones móviles nativas de forma rápida y eficiente utilizando Flutter.",
    category: "Mobile",
    author: "Gabriel Chaldú",
    publishDate: "2025-01-04",
    readTime: "7 min",
    image: "https://picsum.photos/400/240?random=5",
    featured: true,
    likes: 134,
    views: 1654,
    comments: 22,
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
    likes: 89,
    views: 1234,
    comments: 15,
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
    likes: 76,
    views: 987,
    comments: 12,
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
    likes: 112,
    views: 1567,
    comments: 18,
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
    likes: 94,
    views: 876,
    comments: 9,
  },
];

const categories = [
  { name: "Frontend", count: 24, color: "bg-blue-500" },
  { name: "Backend", count: 18, color: "bg-green-500" },
  { name: "Mobile", count: 12, color: "bg-purple-500" },
  { name: "DevOps", count: 8, color: "bg-orange-500" },
  { name: "AI", count: 6, color: "bg-pink-500" },
];

// Function to calculate time ago
const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "hace 1 día";
  if (diffDays < 7) return `hace ${diffDays} días`;
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`;
  return `hace ${Math.floor(diffDays / 365)} años`;
};

export default function MainHomePage() {
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
                  Enterate de lo último
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-white bg-clip-text text-transparent">
                  en dev/talles blog
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Descubre las mejores prácticas, tutoriales detallados y las
                últimas tendencias en desarrollo frontend y backend. Contenido
                creado por expertos para acelerar tu crecimiento profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/articulos"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-medium"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Leer Artículos
                </Link>
                <Link
                  href="/comunidad"
                  className="inline-flex items-center justify-center rounded-md border border-white/80 text-white bg-white/10 hover:bg-white/20 hover:border-white hover:text-white dark:hover:bg-white/15 dark:hover:text-white text-lg px-8 py-4 backdrop-blur-sm shadow-lg hover:shadow-white/25 transition-all duration-300 font-medium"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Comunidad
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
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
                Lectores mensuales del blog
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                +250
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Artículos y tutoriales publicados
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                +50k
              </div>
              <div className="text-slate-300 mt-3 text-sm md:text-base">
                Developers en nuestra comunidad
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
                  <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white">
                    {article.category}
                  </Badge>
                  {article.featured && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                      Destacado
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 dark:text-white">
                    <Link href={`/articulos/${article.id}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Author and Date */}
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      <span>
                        {new Date(article.publishDate).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Time ago */}
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    {getTimeAgo(article.publishDate)}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Heart className="h-4 w-4" />
                        <span className="font-medium">{article.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <Eye className="h-4 w-4" />
                        <span className="font-medium">{article.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <MessageSquare className="h-4 w-4" />
                        <span className="font-medium">{article.comments}</span>
                      </div>
                    </div>
                    <Link href={`/articulos/${article.id}`}>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Leer más
                      </Button>
                    </Link>
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
                  href="/articulos"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium flex items-center group"
                >
                  Ver todos
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="space-y-6">
                {recentArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-purple-100 dark:hover:shadow-purple-900/20 dark:bg-slate-800 rounded-xl overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={300}
                          height={180}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3 line-clamp-2 dark:text-white font-semibold leading-tight">
                          <Link href={`/articulos/${article.id}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 text-base leading-relaxed">
                          {article.description}
                        </CardDescription>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                            <div className="flex items-center space-x-1 bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded-md">
                              <User className="h-4 w-4 text-purple-500" />
                              <span className="font-medium">
                                {article.author}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarDays className="h-4 w-4 text-slate-400" />
                              <span>
                                {new Date(
                                  article.publishDate
                                ).toLocaleDateString("es-ES", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Time ago */}
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                          {getTimeAgo(article.publishDate)}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                            <Heart className="h-4 w-4" />
                            <span className="font-medium">{article.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                            <Eye className="h-4 w-4" />
                            <span className="font-medium">{article.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                            <MessageSquare className="h-4 w-4" />
                            <span className="font-medium">
                              {article.comments}
                            </span>
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
              {/* Enhanced Categories Section */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-800 dark:to-purple-950/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                  <CardTitle className="text-2xl font-bold flex items-center relative z-10">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    Explora por Categorías
                  </CardTitle>
                  <p className="text-purple-100 mt-2 text-sm relative z-10">
                    Descubre contenido especializado
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((category, index) => (
                      <Link
                        key={category.name}
                        href={`/articulos/${category.name.toLowerCase()}`}
                        className="group relative p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 bg-white dark:bg-slate-700/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 rounded-xl ${category.color} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              <div className="w-6 h-6 bg-white/90 rounded-lg flex items-center justify-center">
                                <div
                                  className={`w-3 h-3 rounded-full ${category.color}`}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-lg">
                                {category.name}
                              </span>
                              <div className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">
                                {category.count} artículos
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 border-0 group-hover:from-purple-200 group-hover:to-pink-200 dark:group-hover:from-purple-800/70 dark:group-hover:to-pink-800/70 transition-all duration-300 font-semibold"
                            >
                              {category.count}
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>

                        {/* Animated background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      </Link>
                    ))}
                  </div>

                  {/* Call to action */}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
                    <Link
                      href="/articulos"
                      className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      Ver Todos los Artículos
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Newsletter Section - Full Width */}
        </div>
      </section>

      {/* Newsletter Section - Full Width without container */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 text-white overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>

        <div className="relative py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
                ¡Recibe nuestras últimas novedades!
              </h3>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto">
                Recibe los mejores artículos, tutoriales exclusivos y las
                últimas novedades del mundo del desarrollo web directamente en
                tu email.
                <span className="block mt-1 font-semibold text-white">
                  ¡Sin spam, solo contenido de valor!
                </span>
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="example@tucorreo.com"
                  className="w-full px-6 py-3 text-base border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Suscribirse Gratis
              </Button>
            </div>

            <p className="text-sm text-slate-400">
              Más de 50,000 developers ya reciben nuestro contenido semanal
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
