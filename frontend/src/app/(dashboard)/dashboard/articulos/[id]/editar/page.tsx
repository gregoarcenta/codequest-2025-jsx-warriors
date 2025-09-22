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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  FileText,
  Image,
  Tag,
  Star,
  Eye,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";

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

interface ArticleFormData {
  title: string;
  content: string;
  coverImageUrl: string;
  isFeatured: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function EditarArticuloPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    content: "",
    coverImageUrl: "",
    isFeatured: false,
    categoryId: "",
  });

  useEffect(() => {
    if (articleId) {
      fetchArticle();
      fetchCategories();
    }
  }, [articleId]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${articleId}`);
      const articleData: Article = response.data;

      setArticle(articleData);
      setFormData({
        title: articleData.title,
        content: articleData.content,
        coverImageUrl: articleData.coverImageUrl || "",
        isFeatured: articleData.isFeatured,
        categoryId: articleData.category.id,
      });
    } catch (error: any) {
      console.error("Error fetching article:", error);
      const errorMessage =
        error.response?.data?.message || "Error al cargar artículo";
      toast.error(errorMessage);

      if (error.response?.status === 404) {
        router.push("/dashboard/articulos");
      }
    } finally {
      setLoading(false);
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

    if (formData.content.trim().length < 50) {
      toast.error("El contenido debe tener al menos 50 caracteres");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Debe seleccionar una categoría");
      return;
    }

    if (formData.coverImageUrl && !isValidUrl(formData.coverImageUrl)) {
      toast.error("La URL de la imagen no es válida");
      return;
    }

    try {
      setSaving(true);

      const updateData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        coverImageUrl: formData.coverImageUrl.trim() || undefined,
        isFeatured: formData.isFeatured,
        categoryId: formData.categoryId,
      };

      await api.patch(`/posts/${articleId}`, updateData);

      toast.success("Artículo actualizado correctamente");
      router.push("/dashboard/articulos");
    } catch (error: any) {
      console.error("Error updating article:", error);
      const errorMessage =
        error.response?.data?.message || "Error al actualizar artículo";
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

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
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
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Artículo no encontrado</h2>
        <p className="text-muted-foreground mb-4">
          El artículo que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild>
          <Link href="/dashboard/articulos">Volver a la lista</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/articulos">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Artículo</h1>
          <p className="text-muted-foreground">
            Modificar información de {article.title}
          </p>
        </div>
      </div>

      {/* Article Info */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Información del Artículo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>ID: {article.id}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Slug: {article.slug}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Creado: {dayjs(article.createdAt).format("DD/MM/YYYY")}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Actualizado: {dayjs(article.updatedAt).fromNow()}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Vistas: {article.viewsCount}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Likes: {article.likesCount}</span>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Información Básica */}
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
                    Nuevo slug: {generateSlug(formData.title)}
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

            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">URL de imagen de portada</Label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={(e) =>
                    handleInputChange("coverImageUrl", e.target.value)
                  }
                  placeholder="https://example.com/imagen.jpg"
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                URL de la imagen que aparecerá como portada del artículo
                (opcional)
              </p>
              {formData.coverImageUrl && isValidUrl(formData.coverImageUrl) && (
                <div className="mt-2">
                  <img
                    src={formData.coverImageUrl}
                    alt="Vista previa"
                    className="w-32 h-20 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contenido */}
        <Card>
          <CardHeader>
            <CardTitle>Contenido del Artículo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">
                Contenido <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Escribe el contenido de tu artículo aquí..."
                rows={15}
                required
                className="min-h-[300px]"
              />
              <p className="text-xs text-muted-foreground">
                {formData.content.length} caracteres (mínimo 50)
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

        {/* Vista Previa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Vista Previa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {categories.find((c) => c.id === formData.categoryId) && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {
                        categories.find((c) => c.id === formData.categoryId)
                          ?.name
                      }
                    </span>
                  )}
                  {formData.isFeatured && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Destacado
                    </span>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-bold">
                {formData.title || "Título del artículo"}
              </h2>

              {formData.coverImageUrl && isValidUrl(formData.coverImageUrl) && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={formData.coverImageUrl}
                    alt="Portada"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              <div className="prose max-w-none">
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {formData.content ||
                    "El contenido del artículo aparecerá aquí..."}
                </p>
              </div>

              {formData.title && (
                <p className="text-xs text-muted-foreground">
                  Nuevo slug: {generateSlug(formData.title)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" asChild disabled={saving}>
            <Link href="/dashboard/articulos">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            disabled={
              saving ||
              !formData.title.trim() ||
              !formData.content.trim() ||
              !formData.categoryId
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
