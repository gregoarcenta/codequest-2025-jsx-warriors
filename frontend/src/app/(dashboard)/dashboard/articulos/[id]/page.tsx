"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Tag,
  Eye,
  Heart,
  Bookmark,
  Star,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      const response = await fetch(
        `https://devtalles-blog.onrender.com/posts/${articleId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: Article = await response.json();
        setArticle(data);
      } else {
        throw new Error("Error al cargar artículo");
      }
    } catch (error: any) {
      console.error("Error fetching article:", error);
      toast.error("Error al cargar artículo");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper component for labels
  const Label = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>;

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="flex-1">
            <Skeleton className="h-8 w-96 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          </div>
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
              {article.title}
            </h1>
            <p className="text-muted-foreground">
              Vista detallada del artículo
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/dashboard/articulos/${article.id}/editar`}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Link>
        </Button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    article.status === "published" ? "default" : "secondary"
                  }
                  className={
                    article.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {article.status === "published" ? "Publicado" : "Borrador"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {article.category.name}
                </Badge>
                {article.isFeatured && (
                  <Badge className="bg-purple-100 text-purple-800">
                    <Star className="w-3 h-3 mr-1" />
                    Destacado
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{article.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Slug: {article.slug}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cover Image */}
              {article.coverImageUrl && (
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src={article.coverImageUrl}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {article.content}
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{article.viewsCount} vistas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart
                    className={`h-4 w-4 ${
                      article.isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span>{article.likesCount} likes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bookmark
                    className={`h-4 w-4 ${
                      article.isSaved ? "fill-blue-500 text-blue-500" : ""
                    }`}
                  />
                  <span>{article.isSaved ? "Guardado" : "No guardado"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Article Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Información del Artículo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">ID del Artículo</Label>
                <p className="text-sm text-muted-foreground font-mono">
                  {article.id}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Autor</Label>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{article.author.fullName}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoría</Label>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{article.category.name}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Fechas</Label>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Creado: {formatDate(article.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Actualizado: {formatDate(article.updatedAt)}
                    </span>
                  </div>
                  {article.publishedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Publicado: {formatDate(article.publishedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full">
                <Link href={`/dashboard/articulos/${article.id}/editar`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Artículo
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/articulos">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a la Lista
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Stats Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vistas</span>
                  <span className="font-medium">{article.viewsCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <span className="font-medium">{article.likesCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estado</span>
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                    className={
                      article.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {article.status === "published" ? "Publicado" : "Borrador"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Destacado
                  </span>
                  <span className="font-medium">
                    {article.isFeatured ? "Sí" : "No"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
