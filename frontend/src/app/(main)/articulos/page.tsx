"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  Heart,
  Share2,
  BookOpen,
  TrendingUp,
  Grid3x3,
  Brush,
  MessageSquare,
} from "lucide-react";
import { Label } from "@/components/ui/label";

// Mock data para artículos
const mockArticles = [
  {
    id: 1,
    title: "Introducción a React 18: Nuevas características y mejoras",
    excerpt:
      "Descubre las nuevas funcionalidades de React 18 incluyendo Concurrent Features, Automatic Batching y más.",
    category: "Frontend",
    author: "Fernando Herrera",
    date: "2024-03-15",
    readTime: "8 min",
    views: 1250,
    likes: 89,
    comments: 24,
    image: "https://picsum.photos/300/180?random=1",
    featured: true,
    tags: ["React", "JavaScript", "Frontend"],
  },
  {
    id: 2,
    title: "Node.js y Express: Creando APIs RESTful robustas",
    excerpt:
      "Aprende a construir APIs escalables y seguras con Node.js y Express desde cero.",
    category: "Backend",
    author: "Carlos Azaustre",
    date: "2024-03-12",
    readTime: "12 min",
    views: 987,
    likes: 67,
    comments: 18,
    image: "https://picsum.photos/300/180?random=2",
    featured: false,
    tags: ["Node.js", "Express", "API", "Backend"],
  },
  {
    id: 3,
    title: "Flutter vs React Native: ¿Cuál elegir en 2024?",
    excerpt:
      "Comparativa completa entre Flutter y React Native para desarrollo móvil multiplataforma.",
    category: "Mobile",
    author: "Juan Pablo De la Torre",
    date: "2024-03-10",
    readTime: "15 min",
    views: 2100,
    likes: 156,
    comments: 42,
    image: "https://picsum.photos/300/180?random=3",
    featured: true,
    tags: ["Flutter", "React Native", "Mobile", "Comparativa"],
  },
  {
    id: 4,
    title: "Docker y Kubernetes: Containerización para principiantes",
    excerpt:
      "Guía paso a paso para entender y implementar Docker y Kubernetes en tus proyectos.",
    category: "DevOps",
    author: "Nicolás Schürmann",
    date: "2024-03-08",
    readTime: "20 min",
    views: 1567,
    likes: 134,
    comments: 31,
    image: "https://picsum.photos/300/180?random=4",
    featured: false,
    tags: ["Docker", "Kubernetes", "DevOps", "Containerización"],
  },
  {
    id: 5,
    title: "Machine Learning con Python: Primeros pasos",
    excerpt:
      "Introducción práctica al Machine Learning usando Python, NumPy y Scikit-learn.",
    category: "Inteligencia Artificial",
    author: "Andrés Muro",
    date: "2024-03-05",
    readTime: "18 min",
    views: 1834,
    likes: 198,
    comments: 56,
    image: "https://picsum.photos/300/180?random=5",
    featured: true,
    tags: ["Python", "Machine Learning", "IA", "Scikit-learn"],
  },
  {
    id: 6,
    title: "Next.js 14: App Router y Server Components",
    excerpt:
      "Explora las nuevas funcionalidades de Next.js 14 y cómo aprovechar el App Router.",
    category: "Frontend",
    author: "Fernando Herrera",
    date: "2024-03-03",
    readTime: "10 min",
    views: 1423,
    likes: 112,
    comments: 28,
    image: "https://picsum.photos/300/180?random=6",
    featured: false,
    tags: ["Next.js", "React", "Server Components", "App Router"],
  },
  {
    id: 7,
    title: "Bases de datos NoSQL: MongoDB para desarrolladores",
    excerpt: "Introducción a MongoDB y cómo utilizarlo en tus aplicaciones.",
    category: "Backend",
    author: "Carlos Azaustre",
    date: "2024-02-28",
    readTime: "12 min",
    views: 800,
    likes: 45,
    comments: 10,
    image: "https://picsum.photos/300/180?random=7",
    featured: false,
    tags: ["MongoDB", "NoSQL", "Base de datos", "Backend"],
  },
  {
    id: 8,
    title: "GraphQL: La nueva forma de construir APIs",
    excerpt:
      "Descubre cómo GraphQL está revolucionando la forma en que construimos APIs.",
    category: "Backend",
    author: "Carlos Azaustre",
    date: "2024-02-25",
    readTime: "14 min",
    views: 900,
    likes: 60,
    comments: 12,
    image: "https://picsum.photos/300/180?random=8",
    featured: false,
    tags: ["GraphQL", "API", "Backend"],
  },
  {
    id: 9,
    title: "Introducción a TypeScript: Tipos y Funciones",
    excerpt:
      "Aprende los conceptos básicos de TypeScript, incluyendo tipos y funciones.",
    category: "Frontend",
    author: "Fernando Herrera",
    date: "2024-02-20",
    readTime: "10 min",
    views: 1200,
    likes: 80,
    comments: 15,
    image: "https://picsum.photos/300/180?random=9",
    featured: false,
    tags: ["TypeScript", "JavaScript", "Frontend"],
  },
  {
    id: 10,
    title: "Introducción a la Inteligencia Artificial",
    excerpt:
      "Explora los conceptos básicos de la inteligencia artificial y sus aplicaciones.",
    category: "Inteligencia Artificial",
    author: "Andrés Muro",
    date: "2024-02-15",
    readTime: "12 min",
    views: 950,
    likes: 70,
    comments: 10,
    image: "https://picsum.photos/300/180?random=10",
    featured: false,
    tags: ["IA", "Machine Learning", "Python"],
  },
  {
    id: 11,
    title: "Introducción a la Programación con JavaScript",
    excerpt:
      "Aprende los fundamentos de la programación utilizando JavaScript.",
    category: "Frontend",
    author: "Fernando Herrera",
    date: "2024-02-10",
    readTime: "10 min",
    views: 1100,
    likes: 90,
    comments: 20,
    image: "https://picsum.photos/300/180?random=11",
    featured: false,
    tags: ["JavaScript", "Programación", "Frontend"],
  },
  {
    id: 12,
    title: "Introducción a la Programación con Python",
    excerpt: "Aprende los fundamentos de la programación utilizando Python.",
    category: "Frontend",
    author: "Fernando Herrera",
    date: "2024-02-05",
    readTime: "10 min",
    views: 1000,
    likes: 80,
    comments: 15,
    image: "https://picsum.photos/300/180?random=12",
    featured: false,
    tags: ["Python", "Programación", "Frontend"],
  },
];

const categories = [
  "Todas",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "Inteligencia Artificial",
];
const authors = [
  "Todos",
  "Fernando Herrera",
  "Carlos Azaustre",
  "Juan Pablo De la Torre",
  "Nicolás Schürmann",
  "Andrés Muro",
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

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedAuthor, setSelectedAuthor] = useState("Todos");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Filtrar artículos
  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || article.category === selectedCategory;
    const matchesAuthor =
      selectedAuthor === "Todos" || article.author === selectedAuthor;

    return matchesSearch && matchesCategory && matchesAuthor;
  });

  // Ordenar artículos
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return b.views - a.views;
      case "liked":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Paginación
  const totalPages = 9;
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = sortedArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section / Portada */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-5 right-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-5 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-indigo-300/50 rounded-full animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
                Artículos dev/talles
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Artículos, tutoriales y recursos sobre desarrollo web, móvil,
              DevOps e Inteligencia Artificial
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto">
          {/* Filters Section */}
          <div className="mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Filtros y Búsqueda
                </h2>
              </div>

              <div className="grid md:grid-cols-12 gap-4">
                {/* Search */}
                <div className="md:col-span-4 flex flex-col gap-1">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Buscar por titulo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="md:col-span-3 flex flex-col gap-1">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Author Filter */}
                <div className="md:col-span-3 flex flex-col gap-1">
                  <Label htmlFor="author">Autor</Label>
                  <Select
                    value={selectedAuthor}
                    onValueChange={setSelectedAuthor}
                  >
                    <SelectTrigger id="author" className="w-full">
                      <SelectValue placeholder="Autor" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author} value={author}>
                          {author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <Label htmlFor="sortby">Ordenar por</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sortby" className="w-full">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Más reciente</SelectItem>
                      <SelectItem value="oldest">Más antiguo</SelectItem>
                      <SelectItem value="popular">Más visto</SelectItem>
                      <SelectItem value="liked">Más gustado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results info */}
              <div className="md:col-span-12 mt-4 gap-2 flex items-center justify-center">
                <Button size="sm">
                  <Filter /> Aplicar filtros
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Todas");
                    setSelectedAuthor("Todos");
                    setSortBy("newest");
                    setCurrentPage(1);
                  }}
                >
                  <Brush /> Limpiar filtros
                </Button>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-6">
              <span>
                {filteredArticles.length} artículo
                {filteredArticles.length !== 1 ? "s" : ""} encontrado
                {filteredArticles.length !== 1 ? "s" : ""}
              </span>
            </div>

            {paginatedArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:shadow-slate-700/50 dark:bg-slate-800"
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white">
                        {article.category}
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 dark:text-white">
                        <Link
                          href={`/articulos/${String(article.title)
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9\-]/g, "")}`}
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-300 line-clamp-3">
                        {article.excerpt}
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
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span>
                            {new Date(article.date).toLocaleDateString(
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
                        {getTimeAgo(article.date)}
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
                            <span className="font-medium">
                              {article.comments}
                            </span>
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
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  No se encontraron artículos
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  Intenta ajustar tus filtros de búsqueda
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Todas");
                    setSelectedAuthor("Todos");
                    setCurrentPage(1);
                  }}
                >
                  <Brush /> Limpiar filtros
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
