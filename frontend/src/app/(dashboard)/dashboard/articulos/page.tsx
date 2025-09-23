"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FileText,
  Star,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import DeleteConfirmModal from "@/components/dashboard/delete-confirm-modal";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string;
  status: "draft" | "published";
  isFeatured: boolean;
  viewsCount: number;
  publishedAt: string | null;
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

interface Category {
  id: string;
  name: string;
}

export default function ArticulosPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");

  // Estados temporales para los filtros (antes de aplicar)
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState<string>("all");
  const [tempCategoryFilter, setTempCategoryFilter] = useState<string>("all");
  const [tempFeaturedFilter, setTempFeaturedFilter] = useState<string>("all");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0,
  });

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [deleting, setDeleting] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [currentPage, searchTerm, statusFilter, categoryFilter, featuredFilter]);

  // Sincronizar filtros temporales con los aplicados al cargar
  useEffect(() => {
    setTempSearchTerm(searchTerm);
    setTempStatusFilter(statusFilter);
    setTempCategoryFilter(categoryFilter);
    setTempFeaturedFilter(featuredFilter);
  }, [searchTerm, statusFilter, categoryFilter, featuredFilter]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAllArticlesForStats = async () => {
    try {
      // Obtener todos los artículos para calcular estadísticas correctas
      const response = await api.get("/posts?limit=1000");
      const allArticles: Article[] = response.data.posts || [];
      calculateStats(allArticles);
    } catch (error) {
      console.error("Error fetching all articles for stats:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", limit.toString());

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await api.get(`/posts?${params.toString()}`);

      // La API devuelve un objeto con la propiedad 'posts'
      let allArticles: Article[] = response.data.posts || [];

      // Aplicar filtros locales
      let filteredArticles = allArticles;

      if (statusFilter !== "all") {
        filteredArticles = filteredArticles.filter(
          (article) => article.status === statusFilter
        );
      }

      if (categoryFilter !== "all") {
        filteredArticles = filteredArticles.filter(
          (article) => article.category.id === categoryFilter
        );
      }

      if (featuredFilter !== "all") {
        const isFeatured = featuredFilter === "featured";
        filteredArticles = filteredArticles.filter(
          (article) => article.isFeatured === isFeatured
        );
      }

      // Filtro por búsqueda local si es necesario
      if (searchTerm.trim()) {
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      // Si hay filtros aplicados, usar paginación local
      if (
        statusFilter !== "all" ||
        categoryFilter !== "all" ||
        featuredFilter !== "all" ||
        searchTerm.trim()
      ) {
        // Aplicar paginación manual para filtros locales
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

        setArticles(paginatedArticles);
        setTotalPages(Math.ceil(filteredArticles.length / limit));
        setTotalArticles(filteredArticles.length);
      } else {
        // Usar paginación del servidor cuando no hay filtros
        setArticles(allArticles);
        setTotalPages(response.data.totalPages || 1);
        setTotalArticles(response.data.total || 0);
      }

      // Calcular estadísticas - necesitamos obtener todos los artículos para las estadísticas
      if (
        currentPage === 1 &&
        !searchTerm.trim() &&
        statusFilter === "all" &&
        categoryFilter === "all" &&
        featuredFilter === "all"
      ) {
        // Solo calculamos stats en la primera página sin filtros para evitar múltiples llamadas
        fetchAllArticlesForStats();
      } else {
        // Si hay filtros, calcular stats con los artículos filtrados
        calculateStats(filteredArticles);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Error al cargar artículos");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (allArticles: Article[]) => {
    const total = allArticles.length;
    const published = allArticles.filter(
      (article) => article.status === "published"
    ).length;
    const draft = total - published;
    const featured = allArticles.filter((article) => article.isFeatured).length;

    setStats({ total, published, draft, featured });
  };

  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;

    try {
      setDeleting(true);
      await api.patch(`/posts/${articleToDelete.id}/archive`);

      setIsDeleteModalOpen(false);
      setArticleToDelete(null);
      toast.success("Artículo archivado correctamente");
      fetchArticles(); // Refrescar lista
    } catch (error: any) {
      console.error("Error deleting article:", error);
      const errorMessage =
        error.response?.data?.message || "Error al archivar artículo";
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteModal = (article: Article) => {
    setArticleToDelete(article);
    setIsDeleteModalOpen(true);
  };

  const resetFilters = () => {
    setTempSearchTerm("");
    setTempStatusFilter("all");
    setTempCategoryFilter("all");
    setTempFeaturedFilter("all");
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setFeaturedFilter("all");
    setCurrentPage(1);
  };

  const applyFilters = () => {
    setSearchTerm(tempSearchTerm);
    setStatusFilter(tempStatusFilter);
    setCategoryFilter(tempCategoryFilter);
    setFeaturedFilter(tempFeaturedFilter);
    setCurrentPage(1);
  };

  const hasActiveFilters = () => {
    return (
      searchTerm.trim() !== "" ||
      statusFilter !== "all" ||
      categoryFilter !== "all" ||
      featuredFilter !== "all"
    );
  };

  const StatsCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    icon: any;
    color: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Stats Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-8 w-12" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex justify-center gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Skeleton */}
        <Card>
          <CardContent className="p-0">
            <div className="space-y-2 p-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Artículos</h1>
          <p className="text-muted-foreground">
            Gestiona los artículos y contenido del blog
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/articulos/crear">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Artículo
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Artículos"
          value={stats.total}
          icon={FileText}
          color="text-blue-600"
        />
        <StatsCard
          title="Publicados"
          value={stats.published}
          icon={Calendar}
          color="text-green-600"
        />
        <StatsCard
          title="Borradores"
          value={stats.draft}
          icon={Edit}
          color="text-yellow-600"
        />
        <StatsCard
          title="Destacados"
          value={stats.featured}
          icon={Star}
          color="text-purple-600"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {hasActiveFilters() && (
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  Filtros activos
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs h-6 px-2"
                >
                  Limpiar todo
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar artículos..."
                  value={tempSearchTerm}
                  onChange={(e) => setTempSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={tempStatusFilter}
                onValueChange={setTempStatusFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="draft">Borradores</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={tempCategoryFilter}
                onValueChange={setTempCategoryFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={tempFeaturedFilter}
                onValueChange={setTempFeaturedFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Destacado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="not-featured">No destacados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full sm:w-auto"
              >
                <Filter className="mr-2 h-4 w-4" />
                Limpiar Filtros
              </Button>
              <Button
                onClick={applyFilters}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              >
                <Search className="mr-2 h-4 w-4" />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Destacado</TableHead>
                <TableHead>Vistas</TableHead>
                <TableHead>Creado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No se encontraron artículos
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard/articulos/crear">
                          Crear primer artículo
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-mono text-xs">
                      {article.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm leading-tight">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {article.slug}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {article.author.fullName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {article.category.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          article.status === "published"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          article.status === "published"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }
                      >
                        {article.status === "published"
                          ? "Publicado"
                          : "Archivado / Borrador"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {article.isFeatured ? (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                          <Star className="w-3 h-3 mr-1" />
                          Destacado
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{article.viewsCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {dayjs(article.createdAt).format("DD/MM/YYYY")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/dashboard/articulos/${article.id}/editar`}
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteModal(article)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {articles.length} de {totalArticles} artículos
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteArticle}
        title="Archivar Artículo"
        description={`¿Estás seguro de que deseas archivar el artículo "${articleToDelete?.title}"? Esta acción no se puede deshacer.`}
        isLoading={deleting}
      />
    </div>
  );
}
