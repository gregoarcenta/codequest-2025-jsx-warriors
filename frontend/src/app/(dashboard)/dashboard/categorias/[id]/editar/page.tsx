"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Tag,
  Star,
  Hash,
  FileText,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";

interface Category {
  id: string;
  name: string;
  description: string;
  color?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    posts: number;
  };
}

interface CategoryFormData {
  name: string;
  description: string;
  isFeatured: boolean;
}

export default function EditarCategoriaPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    isFeatured: false,
  });

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/categories/${categoryId}`);
      const categoryData: Category = response.data;

      setCategory(categoryData);
      setFormData({
        name: categoryData.name,
        description: categoryData.description || "",
        isFeatured: categoryData.isFeatured,
      });
    } catch (error: any) {
      console.error("Error fetching category:", error);
      const errorMessage =
        error.response?.data?.message || "Error al cargar categoría";
      toast.error(errorMessage);

      if (error.response?.status === 404) {
        router.push("/dashboard/categorias");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name.trim()) {
      toast.error("El nombre de la categoría es obligatorio");
      return;
    }

    if (formData.name.trim().length < 2) {
      toast.error("El nombre debe tener al menos 2 caracteres");
      return;
    }

    if (formData.description.trim().length > 500) {
      toast.error("La descripción no puede tener más de 500 caracteres");
      return;
    }

    try {
      setSaving(true);

      const updateData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        isFeatured: formData.isFeatured,
      };

      await api.patch(`/categories/${categoryId}`, updateData);

      toast.success("Categoría actualizada correctamente");
      router.push("/dashboard/categorias");
    } catch (error: any) {
      console.error("Error updating category:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar categoría";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof CategoryFormData,
    value: string | boolean
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

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Categoría no encontrada</h2>
        <p className="text-muted-foreground mb-4">
          La categoría que buscas no existe o ha sido eliminada.
        </p>
        <Button asChild>
          <Link href="/dashboard/categorias">Volver a la lista</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/categorias">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Editar Categoría
          </h1>
          <p className="text-muted-foreground">
            Modificar información de {category.name}
          </p>
        </div>
      </div>

      {/* Category Info */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Información de la Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>ID: {category.id}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>
              Creada: {dayjs(category.createdAt).format("DD/MM/YYYY")}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span>Actualizada: {dayjs(category.updatedAt).fromNow()}</span>
            {category._count && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span>Posts: {category._count.posts}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Información Básica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre de la categoría <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: Tecnología, Diseño, Marketing..."
                  className="pl-10"
                  required
                  maxLength={100}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {formData.name.length}/100 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Descripción breve de la categoría (opcional)"
                  rows={3}
                  className="pl-10"
                  maxLength={500}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/500 caracteres
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="isFeatured">Categoría destacada</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    handleInputChange("isFeatured", checked)
                  }
                />
                <Label htmlFor="isFeatured" className="text-sm">
                  {formData.isFeatured
                    ? "Categoría destacada"
                    : "Categoría normal"}
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                {formData.isFeatured
                  ? "La categoría aparecerá en secciones destacadas"
                  : "La categoría aparecerá en el listado normal"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium">
                  {formData.name || "Nombre de la categoría"}
                </h3>
                {formData.description && (
                  <p className="text-sm text-muted-foreground">
                    {formData.description}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {formData.isFeatured && (
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild disabled={saving}>
            <Link href="/dashboard/categorias">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            disabled={saving || !formData.name.trim()}
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
