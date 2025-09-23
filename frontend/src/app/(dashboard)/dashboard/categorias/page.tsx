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
  Tag,
  Tags,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import DeleteConfirmModal from "@/components/dashboard/delete-confirm-modal";

interface Category {
  id: string;
  name: string;
  description: string;
  color?: string; // Campo opcional ya que no viene en la API actual
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    posts: number;
  };
}

interface CategoriesResponse {
  categories: Category[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");

  // Estados temporales para los filtros (antes de aplicar)
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState<string>("all");
  const [tempFeaturedFilter, setTempFeaturedFilter] = useState<string>("all");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    featured: 0,
  });

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchTerm, statusFilter, featuredFilter]);

  // Sincronizar filtros temporales con los aplicados al cargar
  useEffect(() => {
    setTempSearchTerm(searchTerm);
    setTempStatusFilter(statusFilter);
    setTempFeaturedFilter(featuredFilter);
  }, [searchTerm, statusFilter, featuredFilter]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", limit.toString());

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await api.get(`/categories?${params.toString()}`);

      // La API devuelve directamente un array de categorías
      let allCategories: Category[] = response.data || [];

      // Aplicar filtros locales
      let filteredCategories = allCategories;

      if (statusFilter !== "all") {
        const isActive = statusFilter === "active";
        filteredCategories = filteredCategories.filter(
          (category) => category.isActive === isActive
        );
      }

      if (featuredFilter !== "all") {
        const isFeatured = featuredFilter === "featured";
        filteredCategories = filteredCategories.filter(
          (category) => category.isFeatured === isFeatured
        );
      }

      // Filtro por búsqueda local si es necesario
      if (searchTerm.trim()) {
        filteredCategories = filteredCategories.filter(
          (category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (category.description &&
              category.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );
      }

      // Aplicar paginación manual
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCategories = filteredCategories.slice(
        startIndex,
        endIndex
      );

      setCategories(paginatedCategories);
      setTotalPages(Math.ceil(filteredCategories.length / limit));
      setTotalCategories(filteredCategories.length);

      // Calcular estadísticas con todas las categorías
      calculateStats(allCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (allCategories: Category[]) => {
    const total = allCategories.length;
    const active = allCategories.filter((category) => category.isActive).length;
    const inactive = total - active;
    const featured = allCategories.filter(
      (category) => category.isFeatured
    ).length;

    setStats({ total, active, inactive, featured });
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      setDeleting(true);
      await api.delete(`/categories/${categoryToDelete.id}`);

      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
      toast.success("Categoría eliminada correctamente");
      fetchCategories(); // Refrescar lista
    } catch (error: any) {
      console.error("Error deleting category:", error);
      const errorMessage =
        error.response?.data?.message || "Error al eliminar categoría";
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleStatus = async (category: Category) => {
    try {
      await api.patch(`/categories/${category.id}/toggle-status`);
      toast.success(
        `Categoría ${
          category.isActive ? "desactivada" : "activada"
        } correctamente`
      );
      fetchCategories(); // Refrescar lista
    } catch (error: any) {
      console.error("Error toggling category status:", error);
      const errorMessage =
        error.response?.data?.message || "Error al cambiar estado de categoría";
      toast.error(errorMessage);
    }
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const resetFilters = () => {
    setTempSearchTerm("");
    setTempStatusFilter("all");
    setTempFeaturedFilter("all");
    setSearchTerm("");
    setStatusFilter("all");
    setFeaturedFilter("all");
    setCurrentPage(1);
  };

  const applyFilters = () => {
    setSearchTerm(tempSearchTerm);
    setStatusFilter(tempStatusFilter);
    setFeaturedFilter(tempFeaturedFilter);
    setCurrentPage(1);
  };

  const hasActiveFilters = () => {
    return (
      searchTerm.trim() !== "" ||
      statusFilter !== "all" ||
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <div></div>
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
          <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
          <p className="text-muted-foreground">
            Gestiona las categorías de contenido del blog
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/categorias/crear">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Categorías"
          value={stats.total}
          icon={Tags}
          color="text-blue-600"
        />
        <StatsCard
          title="Activas"
          value={stats.active}
          icon={Tag}
          color="text-green-600"
        />
        <StatsCard
          title="Inactivas"
          value={stats.inactive}
          icon={Tag}
          color="text-red-600"
        />
        <StatsCard
          title="Destacadas"
          value={stats.featured}
          icon={Star}
          color="text-yellow-600"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar categorías..."
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
                  <SelectItem value="active">Activas</SelectItem>
                  <SelectItem value="inactive">Inactivas</SelectItem>
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
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="featured">Destacadas</SelectItem>
                  <SelectItem value="not-featured">No destacadas</SelectItem>
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
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Destacada</TableHead>
                <TableHead>Creada</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center space-y-2">
                      <Tags className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No se encontraron categorías
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard/categorias/crear">
                          Crear primera categoría
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-mono text-xs">
                      {category.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{category.name}</span>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate text-sm text-muted-foreground">
                        {category.description || "Sin descripción"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={category.isActive ? "default" : "secondary"}
                        className={
                          category.isActive
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {category.isActive ? "Activa" : "Inactiva"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {category.isFeatured ? (
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          <Star className="w-3 h-3 mr-1" />
                          Destacada
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {dayjs(category.createdAt).format("DD/MM/YYYY")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(category)}
                          title={`${
                            category.isActive ? "Desactivar" : "Activar"
                          } categoría`}
                        >
                          {category.isActive ? (
                            <ToggleRight className="h-4 w-4" />
                          ) : (
                            <ToggleLeft className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/dashboard/categorias/${category.id}/editar`}
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteModal(category)}
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
            Mostrando {categories.length} de {totalCategories} categorías
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
        onConfirm={handleDeleteCategory}
        title="Eliminar Categoría"
        description={`¿Estás seguro de que deseas eliminar la categoría "${categoryToDelete?.name}"? Esta acción no se puede deshacer.`}
        isLoading={deleting}
      />
    </div>
  );
}
