"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BlogEditor from "@/components/BlogEditor";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, FileText, Tag, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";

interface ArticleFormData {
  title: string;
  content: string;
  isFeatured: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function CrearArticuloPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    content: "",
    isFeatured: false,
    categoryId: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error al cargar categorías");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    if (formData.title.trim().length < 5) {
      toast.error("El título debe tener al menos 5 caracteres");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("El contenido es obligatorio");
      return;
    }

    // Obtener texto sin HTML para validar longitud
    const contentText = formData.content.replace(/<[^>]*>/g, "").trim();
    if (contentText.length < 50) {
      toast.error("El contenido debe tener al menos 50 caracteres");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Debe seleccionar una categoría");
      return;
    }

    try {
      setSaving(true);

      const dataToSend = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        isFeatured: formData.isFeatured,
        categoryId: formData.categoryId,
      };

      await api.post("/posts", dataToSend);

      toast.success("Artículo creado correctamente");
      router.push("/dashboard/articulos");
    } catch (error: any) {
      console.error("Error creating article:", error);
      const errorMessage =
        error.response?.data?.message || "Error al crear artículo";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof ArticleFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/articulos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Nuevo Artículo
            </h1>
            <p className="text-muted-foreground">
              Crea un nuevo artículo para el blog
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" asChild disabled={saving}>
            <Link href="/dashboard/articulos">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            form="article-form"
            disabled={
              saving ||
              !formData.title.trim() ||
              !formData.content.trim() ||
              formData.content.replace(/<[^>]*>/g, "").trim().length < 50 ||
              !formData.categoryId
            }
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Creando..." : "Crear Artículo"}
          </Button>
        </div>
      </div>

      <form
        id="article-form"
        onSubmit={handleSubmit}
        className="w-full space-y-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Título del artículo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ej: Introducción a React 18"
                required
                maxLength={200}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {formData.title.length}/200 caracteres
                </p>
                {formData.title && (
                  <p className="text-xs text-muted-foreground">
                    Slug: {generateSlug(formData.title)}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">
                Categoría <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  handleInputChange("categoryId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenido del Artículo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">
                Contenido <span className="text-red-500">*</span>
              </Label>
              <BlogEditor
                content={formData.content}
                onChange={(value: string) =>
                  handleInputChange("content", value)
                }
                placeholder="Escribe el contenido de tu artículo aquí..."
              />
              <p className="text-xs text-muted-foreground">
                {formData.content.replace(/<[^>]*>/g, "").length} caracteres
                (mínimo 50)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="isFeatured">Artículo destacado</Label>
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
                    ? "Artículo destacado"
                    : "Artículo normal"}
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                {formData.isFeatured
                  ? "El artículo aparecerá en secciones destacadas"
                  : "El artículo aparecerá en el listado normal"}
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
