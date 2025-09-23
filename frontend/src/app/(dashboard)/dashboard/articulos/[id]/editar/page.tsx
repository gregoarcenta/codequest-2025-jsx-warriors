"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import BlogEditor from "@/components/BlogEditor";
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
  const [uploadingImage, setUploadingImage] = useState(false);
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen válido");
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe ser menor a 5MB");
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assumiendo que la respuesta contiene la URL de la imagen
      const imageUrl = response.data?.imageUrl || null;

      if (imageUrl) {
        handleInputChange("coverImageUrl", imageUrl);
        toast.success("Imagen subida correctamente");
        await api.patch(`/posts/${articleId}`, { coverImageUrl: imageUrl });
      } else {
        toast.error("Error al procesar la imagen subida");
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      const errorMessage =
        error.response?.data?.message || "Error al subir la imagen";
      toast.error(errorMessage);
    } finally {
      setUploadingImage(false);
      // Limpiar el input para permitir subir la misma imagen otra vez
      e.target.value = "";
    }
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/articulos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Editar Artículo
            </h1>
            <p className="text-muted-foreground">
              Modificar información de {article.title}
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
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
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

      <form
        id="article-form"
        onSubmit={handleSubmit}
        className="w-full space-y-6"
      >
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
              <Label htmlFor="coverImage">Imagen de portada</Label>
              <div className="relative">
                {formData.coverImageUrl ? (
                  <div className="relative group">
                    <img
                      src={formData.coverImageUrl}
                      alt="Portada del artículo"
                      className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            document
                              .getElementById("cover-image-input")
                              ?.click()
                          }
                          disabled={uploadingImage}
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Cambiar imagen
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleInputChange("coverImageUrl", "")}
                          disabled={uploadingImage}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      uploadingImage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      !uploadingImage &&
                      document.getElementById("cover-image-input")?.click()
                    }
                  >
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          Subiendo imagen...
                        </p>
                      </>
                    ) : (
                      <>
                        <Image className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          Haz clic para subir una imagen de portada
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          PNG, JPG, JPEG hasta 5MB
                        </p>
                      </>
                    )}
                  </div>
                )}
                <input
                  id="cover-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                La imagen de portada aparecerá en la vista previa del artículo
                (opcional)
              </p>
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

        {/* Botones de Acción removidos - ahora están en el header */}
      </form>
    </div>
  );
}
