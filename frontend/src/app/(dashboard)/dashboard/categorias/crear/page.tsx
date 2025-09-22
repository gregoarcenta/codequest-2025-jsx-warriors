"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Tag, Star, Hash, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";

interface CategoryFormData {
  name: string;
  description: string;
  isFeatured: boolean;
}

export default function CrearCategoriaPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    isFeatured: false,
  });

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

      const dataToSend = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        isFeatured: formData.isFeatured,
      };

      await api.post("/categories", dataToSend);

      toast.success("Categoría creada correctamente");
      router.push("/dashboard/categorias");
    } catch (error: any) {
      console.error("Error creating category:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear categoría";
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
          <h1 className="text-3xl font-bold tracking-tight">Nueva Categoría</h1>
          <p className="text-muted-foreground">
            Crea una nueva categoría para organizar el contenido
          </p>
        </div>
      </div>

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
                  value={formData.description}
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
            {saving ? "Creando..." : "Crear Categoría"}
          </Button>
        </div>
      </form>
    </div>
  );
}
