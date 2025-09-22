"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import {
  FeaturedArticlesSkeleton,
  RecentArticlesSkeleton,
  CategoriesSkeleton,
} from "@/components/home/article-skeletons";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
  slug: string;
  featured?: boolean;
  likes: number;
  views: number;
  comments: number;
}

interface ApiPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string;
  status: string;
  isFeatured: boolean;
  viewsCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullName: string;
  };
  category: {
    id: string;
    name: string;
  };
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
}

interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  featured: boolean;
  status: string;
  postsCount: number;
}

// Function to transform API post to Article interface
const transformApiPostToArticle = (apiPost: ApiPost): Article => {
  const cleanContent = cleanHtmlContent(apiPost.content);
  const description =
    cleanContent.length > 150
      ? cleanContent.slice(0, 150) + "..."
      : cleanContent;

  return {
    id: apiPost.id,
    title: apiPost.title,
    description,
    category: apiPost.category.name,
    author: apiPost.author.fullName,
    publishDate: apiPost.publishedAt || apiPost.createdAt,
    readTime: "5 min", // Default read time since API doesn't provide it
    image:
      apiPost.coverImageUrl ||
      "https://picsum.photos/400/240?random=" + apiPost.id,
    slug: apiPost.slug,
    featured: apiPost.isFeatured,
    likes: apiPost.likesCount || 0,
    views: apiPost.viewsCount || 0,
    comments: 0, // Will need to fetch separately from comments API
  };
};

// Function to calculate time ago using dayjs
const getTimeAgo = (dateString: string) => {
  return dayjs(dateString).fromNow();
};

// Function to clean HTML tags from content
const cleanHtmlContent = (htmlContent: string): string => {
  // Remove HTML tags
  const textWithoutTags = htmlContent.replace(/<[^>]*>/g, "");
  // Decode HTML entities
  const textarea = document.createElement("textarea");
  textarea.innerHTML = textWithoutTags;
  const decodedText = textarea.value;
  // Clean up extra whitespace
  return decodedText.replace(/\s+/g, " ").trim();
};

export default function HomeContent() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Newsletter form state
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  useEffect(() => {
    // Fetch featured articles
    const fetchFeaturedArticles = async () => {
      try {
        setLoadingFeatured(true);
        const response = await api.get("/posts/featured");
        const posts = response.data?.posts || response.data || [];
        setFeaturedArticles(posts.slice(0, 5).map(transformApiPostToArticle));
      } catch (error) {
        console.error("Error fetching featured articles:", error);
        setFeaturedArticles([]);
      } finally {
        setLoadingFeatured(false);
      }
    };

    // Fetch recent articles
    const fetchRecentArticles = async () => {
      try {
        setLoadingRecent(true);
        const response = await api.get("/posts/published?limit=4&page=1");
        const posts = response.data?.posts || response.data || [];
        setRecentArticles(posts.map(transformApiPostToArticle));
      } catch (error) {
        console.error("Error fetching recent articles:", error);
        setRecentArticles([]);
      } finally {
        setLoadingRecent(false);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await api.get("/categories/features");
        const cats = response.data?.categories || response.data || [];
        setCategories(cats.slice(0, 5));
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchFeaturedArticles();
    fetchRecentArticles();
    fetchCategories();
  }, []);

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setSubscriptionMessage("Por favor ingresa un email válido");
      return;
    }

    try {
      setIsSubscribing(true);
      setSubscriptionMessage("");

      // Call newsletter subscription API
      await api.post("/newsletter/subscribe", { email });

      setSubscriptionMessage(
        "¡Suscripción exitosa! Revisa tu email para confirmar."
      );
      setEmail("");
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);

      if (error.response?.status === 409) {
        setSubscriptionMessage(
          "Este email ya está suscrito a nuestro newsletter."
        );
      } else {
        setSubscriptionMessage(
          "Error al suscribirse. Por favor intenta de nuevo."
        );
      }
    } finally {
      setIsSubscribing(false);
    }
  };
  return (
    <>
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

          {loadingFeatured ? (
            <FeaturedArticlesSkeleton />
          ) : (
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
                      <Link href={`/articulos/${article.slug}`}>
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
                          {dayjs(article.publishDate).format("D MMMM")}
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
                          <span className="font-medium">
                            {article.comments}
                          </span>
                        </div>
                      </div>
                      <Link href={`/articulos/${article.slug}`}>
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
          )}
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

              {loadingRecent ? (
                <RecentArticlesSkeleton />
              ) : (
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
                            <Link href={`/articulos/${article.slug}`}>
                              {article.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 text-base leading-relaxed">
                            {article.description}
                          </CardDescription>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4 text-purple-500" />
                                <span className="font-medium">
                                  {article.author}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CalendarDays className="h-4 w-4 text-slate-400" />
                                <span>
                                  {dayjs(article.publishDate).format("D MMMM")}
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
                              <span className="font-medium">
                                {article.likes}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                              <Eye className="h-4 w-4" />
                              <span className="font-medium">
                                {article.views}
                              </span>
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
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Enhanced Categories Section */}
              {loadingCategories ? (
                <CategoriesSkeleton />
              ) : (
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
                      {categories.map((category, index) => {
                        // Mapeo de colores por nombre de categoría
                        const getColorByName = (name: string) => {
                          const colorMap: { [key: string]: string } = {
                            frontend: "bg-blue-500",
                            backend: "bg-green-500",
                            mobile: "bg-purple-500",
                            devops: "bg-orange-500",
                            ai: "bg-pink-500",
                            javascript: "bg-yellow-500",
                            react: "bg-cyan-500",
                            node: "bg-green-600",
                            python: "bg-blue-600",
                            flutter: "bg-indigo-500",
                          };
                          const key = name.toLowerCase().replace(/\s+/g, "");
                          return colorMap[key] || "bg-slate-500";
                        };

                        return (
                          <Link
                            key={category.id}
                            href={{
                              pathname: "/articulos",
                              query: {
                                categoryId: category.id,
                              },
                            }}
                            className="group relative p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-500 bg-white dark:bg-slate-700/50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div
                                  className={`w-12 h-12 rounded-xl ${getColorByName(
                                    category.name
                                  )} shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                >
                                  <div className="w-6 h-6 bg-white/90 rounded-lg flex items-center justify-center">
                                    <div
                                      className={`w-3 h-3 rounded-full ${getColorByName(
                                        category.name
                                      )}`}
                                    ></div>
                                  </div>
                                </div>
                                <div>
                                  <span className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-lg">
                                    {category.name}
                                  </span>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">
                                    {category.postsCount} artículos
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 border-0 group-hover:from-purple-200 group-hover:to-pink-200 dark:group-hover:from-purple-800/70 dark:group-hover:to-pink-800/70 transition-all duration-300 font-semibold"
                                >
                                  {category.postsCount}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
                              </div>
                            </div>

                            {/* Animated background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          </Link>
                        );
                      })}
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
              )}
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
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col md:flex-row gap-4 w-full"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="example@tucorreo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubscribing}
                    className="w-full px-6 py-3 text-base border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubscribing ? "Suscribiendo..." : "Suscribirse Gratis"}
                </Button>
              </form>
            </div>

            {/* Subscription message */}
            {subscriptionMessage && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                  subscriptionMessage.includes("exitosa")
                    ? "bg-green-500/20 text-green-200 border border-green-500/30"
                    : "bg-red-500/20 text-red-200 border border-red-500/30"
                }`}
              >
                {subscriptionMessage}
              </div>
            )}

            <p className="text-sm text-slate-400">
              Más de 1,000 developers ya reciben nuestro contenido semanal
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
