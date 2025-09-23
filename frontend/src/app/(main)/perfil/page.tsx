"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Bookmark,
  Heart,
  MessageSquare,
  Trash2,
  ExternalLink,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import { toast } from "sonner";

// Tipos para la API
interface UserData {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

interface BookmarkData {
  id: string;
  post: {
    id: string;
    title: string;
    slug: string;
    content: string;
    coverImageUrl: string | null;
    status: string;
    isFeatured: boolean;
    viewsCount: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    // Campos opcionales que pueden no estar presentes
    excerpt?: string;
    readTime?: number;
    category?: {
      id: string;
      name: string;
    };
    author?: {
      id: string;
      fullName: string;
    };
    likesCount?: number;
    commentsCount?: number;
  };
  createdAt?: string; // Puede no estar presente en algunos casos
}

interface UpdateUserDto {
  fullName: string;
  email: string;
  bio: string;
}

interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export default function PerfilPage() {
  const {
    user: authUser,
    isAuthenticated,
    token,
    login,
    updateUser,
  } = useAuthStore();
  const router = useRouter();

  // Estados para los datos del usuario
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editData, setEditData] = useState<UpdateUserDto>({
    fullName: "",
    email: "",
    bio: "",
  });
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);

  // Estados para el UI
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Estado para controlar la hidratación inicial
  const [isHydrated, setIsHydrated] = useState(false);

  // Estados para el cambio de contraseña
  const [passwordData, setPasswordData] = useState<UpdatePasswordDto>({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Estados para mostrar/ocultar contraseñas
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Verificar hidratación del estado de auth
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirigir si no está autenticado (solo después de hidratación)
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, router, isHydrated]);

  // Cargar datos del usuario (solo si está hidratado y autenticado)
  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      loadUserData();
      loadBookmarks();
    }
  }, [isAuthenticated, isHydrated]);

  const loadUserData = async () => {
    try {
      setIsLoading(true); // Asegurar que loading esté activo
      const response = await api.get("/auth/check-status");

      // La respuesta podría tener diferentes estructuras
      const user =
        response.data.data ||
        (response.data as any).user ||
        (response.data as any);

      if (!user || !user.fullName) {
        console.log("Usuario no encontrado en la respuesta:", response.data);
        throw new Error("Datos del usuario no válidos");
      }

      setUserData(user);
      setEditData({
        fullName: user.fullName,
        email: user.email,
        bio: user.bio || "",
      });

      // Actualizar también el store de Zustand con los datos más recientes
      updateUser(user);
    } catch (error) {
      console.log("Error al cargar datos del usuario:", error);
      toast.error("Error al cargar los datos del perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const loadBookmarks = async () => {
    try {
      const response = await api.get("/users/me/bookmarks");

      // Debug: ver la estructura de la respuesta
      console.log("Bookmarks response:", response);
      console.log("Bookmarks data:", response.data);

      // La API devuelve { bookmarks: [...], total, page, limit, pages }
      const bookmarksData = response.data.bookmarks || [];

      setBookmarks(Array.isArray(bookmarksData) ? bookmarksData : []);
    } catch (error) {
      console.log("Error al cargar bookmarks:", error);
      toast.error("Error al cargar los artículos guardados");
      // No es crítico, podemos continuar sin bookmarks
      setBookmarks([]);
    }
  };

  const handleSave = async () => {
    if (!editData.fullName.trim() || !editData.email.trim()) {
      toast.error("El nombre y email son obligatorios");
      return;
    }

    if (editData.bio.length < 10) {
      toast.error("La biografía debe tener al menos 10 caracteres");
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.patch("/users/me", editData);

      // Debug: ver la estructura de la respuesta
      console.log("Update response completa:", response);
      console.log("Update response.data:", response.data);

      // La respuesta podría tener diferentes estructuras
      const updatedUser =
        response.data.data ||
        (response.data as any).user ||
        (response.data as any);

      if (!updatedUser || !updatedUser.fullName) {
        console.log(
          "Usuario actualizado no encontrado en la respuesta:",
          response.data
        );
        // Si no podemos obtener el usuario actualizado, recargar los datos
        await loadUserData();
      } else {
        // Actualizar el estado local con los nuevos datos
        setUserData(updatedUser);
        setEditData({
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          bio: updatedUser.bio || "",
        });

        // Actualizar también el store de Zustand
        updateUser(updatedUser);
      }

      setIsEditing(false);
      toast.success("Perfil actualizado correctamente");
    } catch (error: any) {
      console.log("Error al actualizar perfil:", error);
      toast.error(
        error.response?.data?.message || "Error al actualizar el perfil"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setEditData({
        fullName: userData.fullName,
        email: userData.email,
        bio: userData.bio || "",
      });
    }
    setIsEditing(false);
  };

  const handleRemoveBookmark = async (bookmarkId: string, postId: string) => {
    try {
      await api.post(`/users/me/bookmarks/${postId}`);
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== bookmarkId));
      toast.success("Artículo eliminado de guardados");
    } catch (error) {
      console.log("Error al eliminar bookmark:", error);
      toast.error("Error al eliminar el artículo");
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamaño del archivo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("El archivo es demasiado grande. Máximo 5MB.");
      return;
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Usar axios en lugar de fetch para aprovechar los interceptores
      const response = await api.post("/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;

      // Actualizar el usuario con la nueva imagen
      const updateResponse = await api.patch("/users/me", {
        avatarUrl: result.imageUrl,
      });

      console.log("Avatar update response:", updateResponse);

      // La respuesta podría tener diferentes estructuras
      const updatedUser =
        updateResponse.data.data ||
        (updateResponse.data as any).user ||
        (updateResponse.data as any);

      if (!updatedUser || !updatedUser.fullName) {
        console.log(
          "Usuario actualizado no encontrado en la respuesta:",
          updateResponse.data
        );
        // Si no podemos obtener el usuario actualizado, recargar los datos
        await loadUserData();
      } else {
        setUserData(updatedUser);
        // Actualizar también el store de Zustand
        updateUser(updatedUser);
      }

      toast.success("Avatar actualizado correctamente");
    } catch (error) {
      console.log("Error al subir avatar:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (passwordData.newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!isNewPasswordValid()) {
      toast.error("La nueva contraseña no cumple con los requisitos mínimos");
      return;
    }

    setIsChangingPassword(true);
    try {
      await api.patch("/users/me/password", {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: "", newPassword: "" });
      setConfirmPassword("");
      toast.success("Contraseña actualizada correctamente");
    } catch (error: any) {
      console.log("Error al cambiar contraseña:", error);
      toast.error(
        error.response?.data?.message || "Error al cambiar la contraseña"
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Funciones de validación de contraseña
  const checkNewPasswordRequirement = (type: string) => {
    const password = passwordData.newPassword;
    switch (type) {
      case "length":
        return password.length >= 6;
      case "uppercase":
        return /[A-Z]/.test(password);
      case "lowercase":
        return /[a-z]/.test(password);
      case "number":
        return /[0-9]/.test(password);
      default:
        return false;
    }
  };

  const isNewPasswordValid = () => {
    return (
      checkNewPasswordRequirement("length") &&
      checkNewPasswordRequirement("uppercase") &&
      checkNewPasswordRequirement("lowercase") &&
      checkNewPasswordRequirement("number")
    );
  };

  const getUserInitials = () => {
    if (!userData?.fullName) return "U";
    return userData.fullName
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("D [de] MMMM [de] YYYY");
  };

  const formatShortDate = (dateString: string) => {
    return dayjs(dateString).format("MMMM YYYY");
  };

  // Mostrar loading mientras carga o se hidrata el estado
  if (!isHydrated || isLoading || !userData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-slate-600 dark:text-slate-400">
            {!isHydrated ? "Inicializando..." : "Cargando perfil..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 dark:from-purple-950 dark:via-indigo-950 dark:to-slate-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/60 to-slate-900/80"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-2000"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white/20 shadow-xl">
                  <AvatarImage
                    src={userData.avatarUrl}
                    alt={userData.fullName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      {isUploadingAvatar ? (
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      ) : (
                        <Camera className="w-8 h-8 text-white" />
                      )}
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        disabled={isUploadingAvatar}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-white via-purple-100 to-blue-200 bg-clip-text text-transparent">
                      {userData.fullName}
                    </span>
                  </h1>
                </div>

                <p className="text-lg text-purple-100 mb-6 max-w-2xl">
                  Gestiona tu perfil y artículos guardados
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {bookmarks.length}
                    </div>
                    <div className="text-sm text-slate-300">Guardados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {formatShortDate(userData.createdAt)}
                    </div>
                    <div className="text-sm text-slate-300">Miembro desde</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Mi Perfil
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Guardados
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Seguridad
              </TabsTrigger>
            </TabsList>

            {/* Mi Perfil Tab */}
            <TabsContent value="profile" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Mi Perfil</span>
                    {!isEditing ? (
                      <Button size="sm" onClick={() => setIsEditing(true)}>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Editar Perfil
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={isSaving}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Guardar
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancel}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-2 border-slate-200 dark:border-slate-700">
                        <AvatarImage
                          src={userData.avatarUrl}
                          alt={userData.fullName}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                          <label
                            htmlFor="avatar-upload-form"
                            className="cursor-pointer"
                          >
                            {isUploadingAvatar ? (
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            ) : (
                              <Camera className="w-6 h-6 text-white" />
                            )}
                            <input
                              id="avatar-upload-form"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarChange}
                              disabled={isUploadingAvatar}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">Foto de perfil</h4>
                        <p className="text-sm text-slate-500 mb-2">
                          Haz clic en la imagen para cambiar tu foto de perfil
                        </p>
                        <p className="text-xs text-slate-400">
                          Formato: JPG, PNG. Tamaño máximo: 5MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editData.fullName}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              fullName: e.target.value,
                            })
                          }
                          placeholder="Tu nombre completo"
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          {userData.fullName}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          placeholder="tu@email.com"
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                          {userData.email}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          rows={4}
                          value={editData.bio}
                          onChange={(e) =>
                            setEditData({ ...editData, bio: e.target.value })
                          }
                          placeholder="Cuéntanos sobre ti, tus intereses en desarrollo, experiencia..."
                        />
                      ) : (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md min-h-[100px]">
                          {userData.bio}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info adicional */}
                  {!isEditing && (
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Miembro desde {formatDate(userData.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="w-4 h-4" />
                          <span>{bookmarks.length} artículos guardados</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Artículos Guardados Tab */}
            <TabsContent value="saved" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5" />
                    Artículos Guardados ({bookmarks.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookmarks.length === 0 ? (
                    <div className="text-center py-12">
                      <Bookmark className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                        No tienes artículos guardados
                      </h3>
                      <p className="text-slate-500 mb-4">
                        Guarda artículos interesantes para leerlos más tarde
                      </p>
                      <Button asChild>
                        <Link href="/articulos">Explorar Artículos</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {bookmark.post.category && (
                                  <Badge variant="secondary">
                                    {bookmark.post.category.name}
                                  </Badge>
                                )}
                                {bookmark.post.readTime && (
                                  <span className="text-sm text-slate-500">
                                    {bookmark.post.readTime} min de lectura
                                  </span>
                                )}
                              </div>

                              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 hover:text-purple-600 transition-colors">
                                <Link href={`/articulos/${bookmark.post.slug}`}>
                                  {bookmark.post.title}
                                </Link>
                              </h3>

                              {bookmark.post.excerpt && (
                                <p className="text-slate-600 dark:text-slate-400 mb-3">
                                  {bookmark.post.excerpt}
                                </p>
                              )}

                              <div className="flex items-center justify-between text-sm text-slate-500">
                                <div className="flex items-center gap-4">
                                  {bookmark.post.author && (
                                    <span>
                                      Por {bookmark.post.author.fullName}
                                    </span>
                                  )}
                                  <span>
                                    {formatDate(bookmark.post.publishedAt)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  {bookmark.post.likesCount !== undefined && (
                                    <div className="flex items-center gap-1">
                                      <Heart className="w-4 h-4" />
                                      {bookmark.post.likesCount}
                                    </div>
                                  )}
                                  {bookmark.post.commentsCount !==
                                    undefined && (
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="w-4 h-4" />
                                      {bookmark.post.commentsCount}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 ml-4">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/articulos/${bookmark.post.slug}`}>
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Ver
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleRemoveBookmark(
                                    bookmark.id,
                                    bookmark.post.id
                                  )
                                }
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-xs text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                            {bookmark.createdAt
                              ? `Guardado el ${formatDate(bookmark.createdAt)}`
                              : "Artículo guardado"}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Seguridad Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Seguridad de la Cuenta
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-4">Cambiar Contraseña</h4>
                      <div className="space-y-4">
                        {/* Contraseña actual */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="current-password"
                            className="text-sm font-medium text-slate-700 dark:text-slate-300"
                          >
                            Contraseña actual
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                              id="current-password"
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                              className="pl-10 pr-10 h-10 text-sm border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
                              placeholder="Tu contraseña actual"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Nueva contraseña */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="new-password"
                            className="text-sm font-medium text-slate-700 dark:text-slate-300"
                          >
                            Nueva contraseña
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                              id="new-password"
                              type={showNewPassword ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                              className="pl-10 pr-10 h-10 text-sm border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
                              placeholder="Nueva contraseña segura"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>

                          {/* Requisitos de Nueva Contraseña */}
                          {passwordData.newPassword && (
                            <div className="space-y-2 mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md border">
                              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Requisitos de contraseña:
                              </p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs">
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("length")
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {checkNewPasswordRequirement("length")
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("length")
                                        ? "text-green-600"
                                        : "text-slate-600 dark:text-slate-400"
                                    }`}
                                  >
                                    Mínimo 6 caracteres
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("uppercase")
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {checkNewPasswordRequirement("uppercase")
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("uppercase")
                                        ? "text-green-600"
                                        : "text-slate-600 dark:text-slate-400"
                                    }`}
                                  >
                                    Al menos 1 letra mayúscula
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("lowercase")
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {checkNewPasswordRequirement("lowercase")
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("lowercase")
                                        ? "text-green-600"
                                        : "text-slate-600 dark:text-slate-400"
                                    }`}
                                  >
                                    Al menos 1 letra minúscula
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("number")
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {checkNewPasswordRequirement("number")
                                      ? "✅"
                                      : "❌"}
                                  </span>
                                  <span
                                    className={`${
                                      checkNewPasswordRequirement("number")
                                        ? "text-green-600"
                                        : "text-slate-600 dark:text-slate-400"
                                    }`}
                                  >
                                    Al menos 1 número
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Confirmar nueva contraseña */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirm-new-password"
                            className="text-sm font-medium text-slate-700 dark:text-slate-300"
                          >
                            Confirmar nueva contraseña
                          </Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                              id="confirm-new-password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              className="pl-10 pr-12 h-10 text-sm border-slate-300 dark:border-slate-700 focus:border-purple-400 dark:focus:border-purple-400 bg-white/50 dark:bg-transparent"
                              placeholder="Confirma tu nueva contraseña"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                              {confirmPassword && (
                                <div>
                                  {passwordData.newPassword ===
                                  confirmPassword ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                  )}
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={handlePasswordChange}
                          disabled={
                            isChangingPassword ||
                            !passwordData.currentPassword ||
                            !passwordData.newPassword ||
                            !confirmPassword ||
                            passwordData.newPassword !== confirmPassword ||
                            !isNewPasswordValid()
                          }
                          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                          {isChangingPassword ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Actualizando...
                            </>
                          ) : (
                            "Actualizar Contraseña"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
