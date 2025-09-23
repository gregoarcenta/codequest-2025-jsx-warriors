"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Users,
  UserCheck,
  UserX,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import DeleteConfirmModal from "@/components/dashboard/delete-confirm-modal";

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  bio: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Estados temporales para los filtros (antes de aplicar)
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempRoleFilter, setTempRoleFilter] = useState<string>("all");
  const [tempStatusFilter, setTempStatusFilter] = useState<string>("all");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
  });

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const limit = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, roleFilter, statusFilter]);

  // Sincronizar filtros temporales con los aplicados al cargar
  useEffect(() => {
    setTempSearchTerm(searchTerm);
    setTempRoleFilter(roleFilter);
    setTempStatusFilter(statusFilter);
  }, [searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", limit.toString());

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await api.get(`/users?${params.toString()}`);
      const data: UsersResponse = response.data;

      let filteredUsers = data.users || [];

      // Aplicar filtros locales si la API no los soporta
      if (roleFilter !== "all") {
        filteredUsers = filteredUsers.filter((user) =>
          user.roles.includes(roleFilter)
        );
      }

      if (statusFilter !== "all") {
        const isActive = statusFilter === "active";
        filteredUsers = filteredUsers.filter(
          (user) => user.isActive === isActive
        );
      }

      setUsers(filteredUsers);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalUsers(data.pagination?.total || 0);

      // Calcular estadísticas
      calculateStats(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (allUsers: User[]) => {
    const total = allUsers.length;
    const active = allUsers.filter((user) => user.isActive).length;
    const inactive = total - active;
    const admins = allUsers.filter((user) =>
      user.roles.includes("admin")
    ).length;

    setStats({ total, active, inactive, admins });
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setDeleting(true);
      await api.patch(`/users/${userToDelete.id}`, {
        isActive: false,
      });

      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      toast.success("Usuario desactivado correctamente");
      fetchUsers(); // Refrescar lista
    } catch (error: any) {
      console.error("Error deleting user:", error);
      const errorMessage =
        error.response?.data?.message || "Error al desactivar usuario";
      toast.error(errorMessage);
    } finally {
      setDeleting(false);
    }
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const getInitials = (fullName: string) => {
    if (!fullName || fullName.trim() === "") {
      return "??";
    }
    return fullName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const resetFilters = () => {
    setTempSearchTerm("");
    setTempRoleFilter("all");
    setTempStatusFilter("all");
    setSearchTerm("");
    setRoleFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const applyFilters = () => {
    setSearchTerm(tempSearchTerm);
    setRoleFilter(tempRoleFilter);
    setStatusFilter(tempStatusFilter);
    setCurrentPage(1);
  };

  const hasActiveFilters = () => {
    return (
      searchTerm.trim() !== "" || roleFilter !== "all" || statusFilter !== "all"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de Usuarios
          </h1>
          <p className="text-muted-foreground">
            Administra los usuarios de la plataforma
          </p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/dashboard/usuarios/crear">
            <Plus className="mr-2 h-4 w-4" />
            Crear Usuario
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Usuarios"
          value={stats.total}
          icon={Users}
          color="text-blue-600"
        />
        <StatsCard
          title="Usuarios Activos"
          value={stats.active}
          icon={UserCheck}
          color="text-green-600"
        />
        <StatsCard
          title="Usuarios Inactivos"
          value={stats.inactive}
          icon={UserX}
          color="text-red-600"
        />
        <StatsCard
          title="Administradores"
          value={stats.admins}
          icon={Users}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={tempSearchTerm}
                  onChange={(e) => setTempSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div> */}

              <Select value={tempRoleFilter} onValueChange={setTempRoleFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="admin">Administradores</SelectItem>
                  <SelectItem value="user">Usuarios</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={tempStatusFilter}
                onValueChange={setTempStatusFilter}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>

              {/* Empty div to maintain grid alignment */}
              <div></div>
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Usuarios</CardTitle>
            <div className="text-sm text-muted-foreground">
              {loading
                ? "Cargando..."
                : `${users.length} de ${totalUsers} usuarios`}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de registro</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end space-x-2">
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                          <Skeleton className="h-8 w-8 rounded" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl || ""} />
                            <AvatarFallback className="text-sm">
                              {getInitials(user.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.fullName}</div>
                            {user.bio && (
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {user.bio}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.roles.includes("admin")
                              ? "default"
                              : "secondary"
                          }
                        >
                          {user.roles.includes("admin") ? "Admin" : "Usuario"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isActive ? "default" : "destructive"}
                          className={
                            user.isActive
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : ""
                          }
                        >
                          {user.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>{dayjs(user.createdAt).format("DD/MM/YYYY")}</div>
                        <div className="text-muted-foreground">
                          {dayjs(user.createdAt).fromNow()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="h-8 w-8 p-0"
                          >
                            <Link
                              href={`/dashboard/usuarios/${user.id}/editar`}
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDeleteModal(user)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {searchTerm ||
                          roleFilter !== "all" ||
                          statusFilter !== "all"
                            ? "No se encontraron usuarios con los filtros aplicados"
                            : "No hay usuarios registrados"}
                        </p>
                        {(searchTerm ||
                          roleFilter !== "all" ||
                          statusFilter !== "all") && (
                          <Button variant="outline" onClick={resetFilters}>
                            Limpiar filtros
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {(currentPage - 1) * limit + 1} a{" "}
                  {Math.min(currentPage * limit, totalUsers)} de {totalUsers}{" "}
                  usuarios
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNumber}
                          variant={
                            currentPage === pageNumber ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNumber)}
                          disabled={loading}
                          className="w-8 h-8"
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages || loading}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="Desactivar Usuario"
        description={`¿Estás seguro de que deseas desactivar al usuario "${userToDelete?.fullName}"? Esta acción no se puede deshacer.`}
        isLoading={deleting}
      />
    </div>
  );
}
