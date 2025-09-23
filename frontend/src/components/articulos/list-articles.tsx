"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  Brush,
  Calendar,
  Eye,
  Filter,
  Heart,
  Loader2,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";

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
  commentsCount: number;
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

interface ApiAuthor {
  id: string;
  fullName: string;
}

export default function ListArticles() {
  const searchParams = useSearchParams();

  // Estados para los datos de la API
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [authors, setAuthors] = useState<ApiAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedAuthor, setSelectedAuthor] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Estados para filtros aplicados (los que realmente se envían a la API)
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("Todas");
  const [appliedAuthor, setAppliedAuthor] = useState("Todos");
  const [appliedSortBy, setAppliedSortBy] = useState("default");

  // Detectar categoryId de query params
  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    if (categoryId && categories.length > 0) {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category) {
        setSelectedCategory(category.name);
        setAppliedCategory(category.name);
        // Trigger API call with the category filter
        setCurrentPage(1);
      }
    }
  }, [searchParams, categories]);

  // Detectar title de query params
  useEffect(() => {
    const titleParam = searchParams.get("title");
    if (titleParam) {
      setSearchTerm(titleParam);
      setAppliedSearchTerm(titleParam);
      // Reset to first page when coming from search
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Trigger fetch when categoryId is applied from URL
  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    if (categoryId && categories.length > 0 && authors.length > 0) {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category && appliedCategory === category.name) {
        // Force a fetch when the category is automatically applied from URL
        const fetchFromURL = async () => {
          try {
            setLoading(true);

            const params = new URLSearchParams();
            params.append("page", "1");
            params.append("limit", articlesPerPage.toString());
            params.append("categoryId", category.id);

            const response = await api.get(
              `/posts/published?${params.toString()}`
            );
            const data = response.data;

            setPosts(data.posts || []);
            setTotalPosts(data.total || 0);
            setTotalPages(Math.ceil((data.total || 0) / articlesPerPage));
          } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]);
          } finally {
            setLoading(false);
          }
        };

        fetchFromURL();
      }
    }
  }, [searchParams, categories, authors, appliedCategory]);

  // Trigger fetch when title is applied from URL
  useEffect(() => {
    const titleParam = searchParams.get("title");
    if (
      titleParam &&
      categories.length > 0 &&
      authors.length > 0 &&
      appliedSearchTerm === titleParam
    ) {
      // Force a fetch when the search term is automatically applied from URL
      const fetchFromURL = async () => {
        try {
          setLoading(true);

          const params = new URLSearchParams();
          params.append("page", "1");
          params.append("limit", articlesPerPage.toString());
          params.append("title", titleParam.trim());

          const response = await api.get(
            `/posts/published?${params.toString()}`
          );
          const data = response.data;

          setPosts(data.posts || []);
          setTotalPosts(data.total || 0);
          setTotalPages(Math.ceil((data.total || 0) / articlesPerPage));
        } catch (error) {
          console.error("Error fetching posts:", error);
          setPosts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchFromURL();
    }
  }, [searchParams, categories, authors, appliedSearchTerm]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/actives");
        const cats = response.data?.categories || response.data || [];
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch authors (from posts)
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.get("/posts/published?limit=100&page=1");
        const posts = response.data?.posts || response.data || [];

        // Extract unique authors
        const uniqueAuthors = posts.reduce(
          (acc: ApiAuthor[], post: ApiPost) => {
            const exists = acc.find((author) => author.id === post.author.id);
            if (!exists) {
              acc.push(post.author);
            }
            return acc;
          },
          []
        );

        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  // Fetch posts with filters
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Build query parameters
        const params = new URLSearchParams();
        params.append("page", currentPage.toString());
        params.append("limit", articlesPerPage.toString());

        // Add search term
        if (appliedSearchTerm.trim()) {
          params.append("title", appliedSearchTerm.trim());
        }

        // Add category filter
        if (appliedCategory !== "Todas") {
          const category = categories.find(
            (cat) => cat.name === appliedCategory
          );
          if (category) {
            params.append("categoryId", category.id);
          }
        }

        // Add author filter
        if (appliedAuthor !== "Todos") {
          const author = authors.find(
            (auth) => auth.fullName === appliedAuthor
          );
          if (author) {
            params.append("authorId", author.id);
          }
        }

        // Add sorting
        switch (appliedSortBy) {
          case "newest":
            params.append("sortBy", "recent");
            break;
          case "oldest":
            params.append("sortBy", "old");
            break;
          case "popular":
            params.append("sortBy", "viewed");
            break;
          case "liked":
            params.append("sortBy", "liked");
            break;
          case "default":
          default:
            // No sortBy parameter for default case
            break;
        }

        const response = await api.get(`/posts/published?${params.toString()}`);
        const data = response.data;

        setPosts(data.posts || []);
        setTotalPosts(data.total || 0);
        setTotalPages(Math.ceil((data.total || 0) / articlesPerPage));
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have categories and authors loaded
    if (categories.length > 0 && authors.length > 0) {
      fetchPosts();
    }
  }, [
    currentPage,
    appliedSearchTerm,
    appliedCategory,
    appliedAuthor,
    appliedSortBy,
    categories,
    authors,
  ]);

  // Function to calculate time ago using dayjs
  const getTimeAgo = (dateString: string) => {
    return dayjs(dateString).fromNow();
  };

  // Apply filters
  const applyFilters = () => {
    setAppliedSearchTerm(searchTerm);
    setAppliedCategory(selectedCategory);
    setAppliedAuthor(selectedAuthor);
    setAppliedSortBy(sortBy);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Todas");
    setSelectedAuthor("Todos");
    setSortBy("default");
    setAppliedSearchTerm("");
    setAppliedCategory("Todas");
    setAppliedAuthor("Todos");
    setAppliedSortBy("default");
    setCurrentPage(1);
  };

  // Loading skeleton component
  const ArticleSkeleton = () => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:shadow-slate-700/50 dark:bg-slate-800">
      <div className="relative overflow-hidden rounded-t-lg">
        <Skeleton className="w-full h-48" />
      </div>
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-3 w-24 mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  return (
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        applyFilters();
                      }
                    }}
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
                    <SelectItem key="todas" value="Todas">
                      Todas
                    </SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
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
                    <SelectItem key="todos" value="Todos">
                      Todos
                    </SelectItem>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.fullName}>
                        {author.fullName}
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
                    <SelectItem value="default">Por defecto</SelectItem>
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
              <Button size="sm" onClick={applyFilters} disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Filter />
                )}{" "}
                Aplicar filtros
              </Button>
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <Brush /> Limpiar filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-6">
            <span>
              {totalPosts} artículo
              {totalPosts !== 1 ? "s" : ""} encontrado
              {totalPosts !== 1 ? "s" : ""}
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleSkeleton key={index} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:shadow-slate-700/50 dark:bg-slate-800"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={
                        article.coverImageUrl ||
                        `https://picsum.photos/400/240?random=${article.id}`
                      }
                      alt={article.title}
                      width={400}
                      height={240}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white">
                      {article.category.name}
                    </Badge>
                    {article.isFeatured && (
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
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Author and Date */}
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">
                          {article.author.fullName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>
                          {dayjs(
                            article.publishedAt || article.createdAt
                          ).format("D MMMM")}
                        </span>
                      </div>
                    </div>

                    {/* Time ago */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {getTimeAgo(article.publishedAt || article.createdAt)}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <Heart className="h-4 w-4" />
                          <span className="font-medium">
                            {article.likesCount || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <Eye className="h-4 w-4" />
                          <span className="font-medium">
                            {article.viewsCount || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-medium">
                            {article.commentsCount || 0}
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
              <Button variant="outline" onClick={resetFilters}>
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
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
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
  );
}
