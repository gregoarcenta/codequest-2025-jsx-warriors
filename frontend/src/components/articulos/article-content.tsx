"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  User,
  Heart,
  Eye,
  MessageSquare,
  Share2,
  Bookmark,
  Facebook,
  MessageCircle,
  Hash,
  X,
} from "lucide-react";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/auth-store";

interface ApiPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string;
  status: string;
  isFeatured: boolean;
  viewsCount: number;
  publishedAt: string;
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

interface ArticleContentProps {
  slug: string;
}

export default function ArticleContent({ slug }: ArticleContentProps) {
  const [post, setPost] = useState<ApiPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/posts/published/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(
          "No se pudo cargar el artículo. Por favor, inténtalo de nuevo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Función para guardar/des-guardar post
  const handleSavePost = async () => {
    if (!isAuthenticated || !post) return;

    try {
      setSavingPost(true);
      await api.post(`/users/me/bookmarks/${post.id}`);

      // Actualizar el estado local
      setPost((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setSavingPost(false);
    }
  };

  // Función para dar like/dislike al post
  const handleLikePost = async () => {
    if (!isAuthenticated || !post) return;

    try {
      await api.post(`/likes/post/${post.id}`);

      // Actualizar el estado local
      setPost((prev) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likesCount: prev.isLiked
                ? prev.likesCount - 1
                : prev.likesCount + 1,
            }
          : null
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Funciones para compartir en redes sociales
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || "");
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      "_blank"
    );
    setShareModalOpen(false);
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${post?.title || ""} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setShareModalOpen(false);
  };

  const shareOnDiscord = () => {
    // Discord no tiene URL de share directa, copiamos al portapapeles
    const text = `${post?.title || ""}\n${window.location.href}`;
    navigator.clipboard.writeText(text);
    setShareModalOpen(false);
    // Aquí podrías mostrar un toast de confirmación
  };

  if (loading) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-xl dark:bg-slate-900 mb-8">
          <CardContent className="p-8 md:p-12">
            <div className="mb-8 space-y-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-xl dark:bg-slate-900 mb-8">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="py-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Artículo no encontrado
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {error || "El artículo que buscas no está disponible."}
              </p>
              <Button onClick={() => window.history.back()}>
                Volver atrás
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <Card className="border-0 shadow-xl dark:bg-slate-900 mb-8">
        <CardContent className="p-8 md:p-12">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white mb-4">
              {post.category.name}
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author and Date Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-purple-600" />
                <span className="font-medium">{post.author.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {dayjs(post.publishedAt || post.createdAt).format(
                    "D [de] MMMM [de] YYYY"
                  )}
                </span>
              </div>
              <div className="text-purple-600 font-medium">
                {dayjs(post.publishedAt || post.createdAt).fromNow()}
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-6 text-sm">
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    post.isLiked
                      ? "text-red-600 dark:text-red-400"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`}
                  />
                  <span className="font-medium">{post.likesCount || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{post.viewsCount || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span className="font-medium">0</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-slate-300 dark:border-slate-600 ${
                    post.isLiked ? "bg-red-50 border-red-300 text-red-700" : ""
                  }`}
                  onClick={handleLikePost}
                  disabled={!isAuthenticated}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      post.isLiked ? "fill-current" : ""
                    }`}
                  />
                  {post.isLiked ? "Te gusta" : "Me gusta"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className={`border-slate-300 dark:border-slate-600 ${
                    post.isSaved
                      ? "bg-purple-50 border-purple-300 text-purple-700"
                      : ""
                  }`}
                  onClick={handleSavePost}
                  disabled={!isAuthenticated || savingPost}
                >
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${
                      post.isSaved ? "fill-current" : ""
                    }`}
                  />
                  {savingPost
                    ? "Guardando..."
                    : post.isSaved
                    ? "Guardado"
                    : "Guardar"}
                </Button>

                <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-300 dark:border-slate-600"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Compartir artículo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Comparte este artículo en tus redes sociales favoritas
                      </p>
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={shareOnFacebook}
                          className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                        >
                          <Facebook className="h-4 w-4 mr-3" />
                          Compartir en Facebook
                        </Button>
                        <Button
                          onClick={shareOnWhatsApp}
                          className="bg-green-600 hover:bg-green-700 text-white justify-start"
                        >
                          <MessageCircle className="h-4 w-4 mr-3" />
                          Compartir en WhatsApp
                        </Button>
                        <Button
                          onClick={shareOnDiscord}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white justify-start"
                        >
                          <Hash className="h-4 w-4 mr-3" />
                          Copiar para Discord
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-xl dark:prose-invert max-w-none">
            <div
              className="text-slate-700 dark:text-slate-300 leading-relaxed article-content"
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
