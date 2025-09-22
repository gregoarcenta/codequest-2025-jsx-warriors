"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Camera,
  Save,
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  discordId?: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  bio?: string;
  isActive: boolean;
  roles: string[];
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { user: authUser, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Usar el endpoint de check-status para obtener el perfil actual
      const response = await api.get("/auth/check-status");

      const userData: UserProfile = response.data.user;
      setUser(userData);

      // Actualizar también el store de autenticación con los datos más recientes
      // Adaptar la estructura para que coincida con la interface User del store
      updateUser({
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl || "",
        bio: userData.bio || "",
        roles: userData.roles,
      });

      setProfileData({
        fullName: userData.fullName || "",
        email: userData.email || "",
        bio: userData.bio || "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);

    try {
      // Subir el avatar directamente
      const avatarFormData = new FormData();
      avatarFormData.append("image", file);

      const uploadResponse = await api.post("/upload/avatar", avatarFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newAvatarUrl = uploadResponse.data.secureUrl;

      // Actualizar el usuario inmediatamente con la nueva URL del avatar
      const response = await api.patch("/users/me", {
        avatarUrl: newAvatarUrl,
      });

      const updatedUser = { ...response.data, roles: user?.roles || ["admin"] };
      setUser(updatedUser);

      // Actualizar también el store de autenticación
      updateUser({
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        avatarUrl: updatedUser.avatarUrl || "",
        bio: updatedUser.bio || "",
        roles: updatedUser.roles,
      });

      toast.success("Avatar actualizado correctamente");
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      const errorMessage = error.response?.data?.message || "Error desconocido";
      toast.error("Error al subir avatar: " + errorMessage);
    } finally {
      setUploadingAvatar(false);
      // Limpiar el input para permitir seleccionar el mismo archivo otra vez
      e.target.value = "";
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Actualizar solo los datos del perfil (sin avatar)
      const updateData = {
        fullName: profileData.fullName,
        email: profileData.email,
        bio: profileData.bio,
      };

      const response = await api.patch("/users/me", updateData);

      const updatedUser = { ...response.data, roles: user?.roles || ["admin"] };
      setUser(updatedUser);

      // Actualizar también el store de autenticación con los datos actualizados
      updateUser({
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        avatarUrl: updatedUser.avatarUrl || "",
        bio: updatedUser.bio || "",
        roles: updatedUser.roles,
      });

      toast.success("Perfil actualizado correctamente");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      const errorMessage = error.response?.data?.message || "Error desconocido";
      toast.error("Error al actualizar perfil: " + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!isPasswordValid()) {
      toast.error("La nueva contraseña no cumple con los requisitos mínimos");
      return;
    }

    setSaving(true);

    try {
      await api.patch("/users/me/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Contraseña actualizada correctamente");
    } catch (error: any) {
      console.error("Error changing password:", error);
      const errorMessage = error.response?.data?.message || "Error desconocido";
      toast.error("Error al cambiar contraseña: " + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Funciones de validación de contraseña (copiadas de register-form.tsx)
  const checkPasswordRequirement = (type: string) => {
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

  const isPasswordValid = () => {
    return (
      checkPasswordRequirement("length") &&
      checkPasswordRequirement("uppercase") &&
      checkPasswordRequirement("lowercase") &&
      checkPasswordRequirement("number")
    );
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD [de] MMMM [de] YYYY");
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

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-20 w-20 rounded-full mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Error al cargar el perfil</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y configuración de cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <Avatar
                  className={`h-20 w-20 mb-4 cursor-pointer transition-all duration-200 ${
                    uploadingAvatar
                      ? "opacity-50 cursor-not-allowed"
                      : "group-hover:opacity-80"
                  }`}
                  onClick={() => {
                    if (!uploadingAvatar) {
                      document.getElementById("avatar-input")?.click();
                    }
                  }}
                >
                  <AvatarImage src={user.avatarUrl || ""} alt={user.fullName} />
                  <AvatarFallback className="text-lg">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-all duration-200 ${
                    uploadingAvatar
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!uploadingAvatar) {
                      document.getElementById("avatar-input")?.click();
                    }
                  }}
                >
                  {uploadingAvatar ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <Camera className="h-6 w-6 text-white" />
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

              <h3 className="font-semibold text-lg">{user.fullName}</h3>
              <p className="text-sm text-muted-foreground mb-2">{user.email}</p>

              <Badge
                variant={user.roles.includes("admin") ? "default" : "secondary"}
              >
                <Shield className="mr-1 h-3 w-3" />
                {user.roles.includes("admin") ? "admin" : "user"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estado:</span>
                <Badge variant={user.isActive ? "default" : "destructive"}>
                  {user.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              {user.bio && (
                <div className="flex items-start justify-between text-sm">
                  <span className="text-muted-foreground">Bio:</span>
                  <span className="font-medium text-right max-w-[200px]">
                    {user.bio}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Miembro desde:</span>
                <span className="font-medium">
                  {formatDate(user.createdAt)}
                </span>
              </div>

              {user.lastLoginAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Último acceso:</span>
                  <span className="font-medium">
                    {dayjs(user.lastLoginAt).fromNow()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Editar Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nombre completo</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biografía</Label>
                  <Input
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        bio: e.target.value,
                      })
                    }
                    placeholder="Cuéntanos un poco sobre ti..."
                  />
                </div>

                <Button type="submit" disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Cambiar Contraseña
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Contraseña actual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">Nueva contraseña</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Requisitos de Contraseña */}
                    {passwordData.newPassword && (
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

                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                        minLength={6}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        {passwordData.confirmPassword && (
                          <div>
                            {passwordData.newPassword ===
                            passwordData.confirmPassword ? (
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

                <Button
                  type="submit"
                  disabled={
                    saving ||
                    !isPasswordValid() ||
                    passwordData.newPassword !== passwordData.confirmPassword ||
                    !passwordData.currentPassword
                  }
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {saving ? "Cambiando..." : "Cambiar Contraseña"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
