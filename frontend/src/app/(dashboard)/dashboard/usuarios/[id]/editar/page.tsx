"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Camera,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";

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

interface UserFormData {
  email: string;
  fullName: string;
  bio: string;
  roles: string[];
  isActive: boolean;
  password?: string;
  confirmPassword?: string;
}

export default function EditarUsuarioPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    fullName: "",
    bio: "",
    roles: ["user"],
    isActive: true,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${userId}`);
      const userData: User = response.data;

      setUser(userData);
      setAvatarPreview(null); // Limpiar preview al cargar usuario
      setFormData({
        email: userData.email,
        fullName: userData.fullName,
        bio: userData.bio || "",
        roles: userData.roles,
        isActive: userData.isActive,
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error fetching user:", error);
      const errorMessage =
        error.response?.data?.message || "Error al cargar usuario";
      toast.error(errorMessage);

      if (error.response?.status === 404) {
        router.push("/dashboard/usuarios");
      }
    } finally {
      setLoading(false);
    }
  };

  // Funciones para manejo de avatar
  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen válido");
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no puede ser mayor a 5MB");
      return;
    }

    // Crear preview inmediato
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Subir imagen inmediatamente
    await uploadAvatar(file);
  };

  const uploadAvatar = async (file: File): Promise<void> => {
    try {
      setUploadingAvatar(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Actualizar el usuario con la nueva imagen
      if (response.data.imageUrl) {
        // Actualizar el estado local del usuario
        if (user) {
          setUser((prev) =>
            prev ? { ...prev, avatarUrl: response.data.imageUrl } : prev
          );
        }

        toast.success("Imagen de perfil actualizada correctamente");
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      const errorMessage =
        error.response?.data?.message || "Error al subir imagen";
      toast.error(errorMessage);

      // Revertir preview en caso de error
      setAvatarPreview(null);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const triggerAvatarInput = () => {
    document.getElementById("avatar-input")?.click();
  };

  // Validaciones de contraseña
  const checkPasswordRequirement = (type: string) => {
    const password = formData.password || "";
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

  const isPasswordValid = () => {
    if (!changePassword) return true;
    return (
      checkPasswordRequirement("length") &&
      checkPasswordRequirement("uppercase") &&
      checkPasswordRequirement("lowercase") &&
      checkPasswordRequirement("number")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.fullName.trim()) {
      toast.error("El nombre completo es obligatorio");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("El email es obligatorio");
      return;
    }

    if (changePassword) {
      if (!formData.password?.trim()) {
        toast.error("La contraseña es obligatoria");
        return;
      }

      if (!isPasswordValid()) {
        toast.error("La contraseña no cumple con los requisitos mínimos");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
    }

    try {
      setSaving(true);

      const updateData: any = {
        email: formData.email.trim(),
        fullName: formData.fullName.trim(),
        bio: formData.bio.trim(),
        roles: formData.roles,
        isActive: formData.isActive,
      };

      // Solo incluir contraseña si se está cambiando
      if (changePassword && formData.password) {
        updateData.password = formData.password;
      }

      await api.patch(`/users/${userId}`, updateData);

      toast.success("Usuario actualizado correctamente");
      router.push("/dashboard/usuarios");
    } catch (error: any) {
      console.error("Error updating user:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar usuario";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof UserFormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        {/* Form Skeletons */}
        <div className="w-full space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Usuario no encontrado</h2>
        <p className="text-muted-foreground mb-4">
          El usuario que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild>
          <Link href="/dashboard/usuarios">Volver a la lista</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/usuarios">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Usuario</h1>
          <p className="text-muted-foreground">
            Modificar información de {user.fullName}
          </p>
        </div>
      </div>

      {/* User Info */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>ID: {user.id}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Creado: {dayjs(user.createdAt).format("DD/MM/YYYY")}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Actualizado: {dayjs(user.updatedAt).fromNow()}</span>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center space-y-4 pb-6 border-b">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 hover:border-purple-400 cursor-pointer transition-colors flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100"
                  onClick={triggerAvatarInput}
                >
                  {avatarPreview || user?.avatarUrl ? (
                    <img
                      src={avatarPreview || user?.avatarUrl || ""}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Camera className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-500">Subir foto</span>
                    </div>
                  )}
                </div>
                {(avatarPreview || user?.avatarUrl) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-white hover:bg-gray-50"
                    onClick={triggerAvatarInput}
                    disabled={uploadingAvatar}
                  >
                    <Upload className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Foto de perfil</p>
                <p className="text-xs text-gray-500">
                  Haz clic para cambiar la imagen (máx. 5MB)
                </p>
                {uploadingAvatar && (
                  <p className="text-xs text-purple-600 mt-1 font-medium">
                    Subiendo imagen...
                  </p>
                )}
              </div>

              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={uploadingAvatar}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Nombre completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Ej: Juan Pérez García"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Correo electrónico <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="usuario@ejemplo.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                value={formData.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Descripción breve del usuario (opcional)"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cambiar Contraseña */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Cambiar Contraseña
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="changePassword"
                checked={changePassword}
                onCheckedChange={setChangePassword}
              />
              <Label htmlFor="changePassword" className="text-sm">
                Cambiar contraseña del usuario
              </Label>
            </div>

            {changePassword && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Nueva contraseña <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password || ""}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Nueva contraseña"
                      required={changePassword}
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Requisitos de Contraseña */}
                  {formData.password && (
                    <div className="space-y-2 mt-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md border">
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Requisitos de contraseña:
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className={`${
                              checkPasswordRequirement("length")
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {checkPasswordRequirement("length") ? "✅" : "❌"}
                          </span>
                          <span
                            className={`${
                              checkPasswordRequirement("length")
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
                              checkPasswordRequirement("uppercase")
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {checkPasswordRequirement("uppercase")
                              ? "✅"
                              : "❌"}
                          </span>
                          <span
                            className={`${
                              checkPasswordRequirement("uppercase")
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
                              checkPasswordRequirement("lowercase")
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {checkPasswordRequirement("lowercase")
                              ? "✅"
                              : "❌"}
                          </span>
                          <span
                            className={`${
                              checkPasswordRequirement("lowercase")
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
                              checkPasswordRequirement("number")
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {checkPasswordRequirement("number") ? "✅" : "❌"}
                          </span>
                          <span
                            className={`${
                              checkPasswordRequirement("number")
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmar contraseña <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword || ""}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirmar nueva contraseña"
                      required={changePassword}
                      minLength={6}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      {formData.confirmPassword && (
                        <div>
                          {formData.password === formData.confirmPassword ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                          )}
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto hover:bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Permisos y Estado */}
        <Card>
          <CardHeader>
            <CardTitle>Permisos y Estado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">Rol del usuario</Label>
                <Select
                  value={formData.roles[0] || "user"}
                  onValueChange={(value) => handleInputChange("roles", [value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {formData.roles[0] === "admin"
                    ? "El usuario tendrá acceso completo al sistema"
                    : "El usuario tendrá acceso limitado al sistema"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="isActive">Estado del usuario</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      handleInputChange("isActive", checked)
                    }
                  />
                  <Label htmlFor="isActive" className="text-sm">
                    {formData.isActive ? "Usuario activo" : "Usuario inactivo"}
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formData.isActive
                    ? "El usuario podrá acceder al sistema"
                    : "El usuario no podrá acceder al sistema"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild disabled={saving}>
            <Link href="/dashboard/usuarios">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            disabled={
              saving ||
              !formData.fullName.trim() ||
              !formData.email.trim() ||
              (changePassword &&
                (!isPasswordValid() ||
                  formData.password !== formData.confirmPassword))
            }
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
