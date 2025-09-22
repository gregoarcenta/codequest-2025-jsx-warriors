"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";

interface UserFormData {
  email: string;
  fullName: string;
  bio: string;
  password: string;
  confirmPassword: string;
  roles: string[];
  isActive: boolean;
}

export default function CrearUsuarioPage() {
  const router = useRouter();
  const [loading, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    fullName: "",
    bio: "",
    password: "",
    confirmPassword: "",
    roles: ["user"],
    isActive: true,
  });

  // Validaciones de contraseña
  const checkPasswordRequirement = (type: string) => {
    const password = formData.password;
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

    if (!formData.password.trim()) {
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

    try {
      setSaving(true);

      const userData = {
        email: formData.email.trim(),
        fullName: formData.fullName.trim(),
        bio: formData.bio.trim(),
        password: formData.password,
        roles: formData.roles,
        isActive: formData.isActive,
      };

      await api.post("/users", userData);

      toast.success("Usuario creado correctamente");
      router.push("/dashboard/usuarios");
    } catch (error: any) {
      console.error("Error creating user:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear usuario";
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
          <h1 className="text-3xl font-bold tracking-tight">
            Crear Nuevo Usuario
          </h1>
          <p className="text-muted-foreground">
            Completa los datos para crear un nuevo usuario en la plataforma
          </p>
        </div>
      </div>

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
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Descripción breve del usuario (opcional)"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Credenciales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Credenciales de Acceso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Contraseña <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="Contraseña segura"
                    required
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
                          {checkPasswordRequirement("uppercase") ? "✅" : "❌"}
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
                          {checkPasswordRequirement("lowercase") ? "✅" : "❌"}
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
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    placeholder="Confirmar contraseña"
                    required
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
          <Button variant="outline" asChild disabled={loading}>
            <Link href="/dashboard/usuarios">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            disabled={
              loading ||
              !isPasswordValid() ||
              formData.password !== formData.confirmPassword ||
              !formData.fullName.trim() ||
              !formData.email.trim()
            }
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Creando..." : "Crear Usuario"}
          </Button>
        </div>
      </form>
    </div>
  );
}
