"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ThumbsUp,
  ThumbsDown,
  Reply,
  Send,
  MoreVertical,
  EyeOff,
} from "lucide-react";
import dayjs from "@/lib/dayjs";
import api from "@/lib/axios";
import { useAuthStore } from "@/stores/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Interfaces para la API de comentarios
interface ApiComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isVisible: boolean;
  isLiked: boolean;
  likesCount: number;
  author: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string | null;
    roles: string[];
  };
  children?: ApiComment[];
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  // Estados para comentarios de la API
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para formularios
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Auth store
  const { isAuthenticated, user } = useAuthStore();

  // Fetch comentarios
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/comments/post/${postId}`);
        console.log("Comments response:", response.data); // Debug log

        // La API devuelve los comentarios en response.data.comments
        const commentsData = response.data?.comments || [];

        // Debug: ver la estructura de cada comentario
        console.log(
          "Comments structure:",
          commentsData.map((comment: any) => ({
            id: comment.id,
            content: comment.content,
            author: comment.author,
            hasAuthor: !!comment.author,
            likesCount: comment.likesCount,
            isLiked: comment.isLiked,
          }))
        );

        // Todos los comentarios que devuelve la API ya son visibles
        // No necesitamos filtrar por visibility aquí
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("No se pudieron cargar los comentarios");
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // Crear nuevo comentario
  const handleSubmitComment = async () => {
    if (!newComment.trim() || !isAuthenticated || !postId) return;

    try {
      setSubmitting(true);

      const response = await api.post(`/comments/${postId}`, {
        content: newComment.trim(),
      });

      if (response.data) {
        // Agregar el nuevo comentario al inicio de la lista
        setComments((prev) => [response.data, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      setError("No se pudo enviar el comentario");
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle like en comentario
  const handleToggleLike = async (commentId: string) => {
    if (!isAuthenticated) return;

    try {
      await api.post(`/likes/comment/${commentId}`);

      // Actualizar el estado local - cambiar isLiked y contador de likes
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likesCount: comment.isLiked
                  ? comment.likesCount - 1
                  : comment.likesCount + 1,
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Ocultar comentario (solo para admins)
  const handleHideComment = async (commentId: string) => {
    if (!isAuthenticated || !user?.roles?.includes("admin")) return;

    try {
      await api.patch(`/comments/${commentId}/visibility`, {
        isVisible: false,
      });

      // Remover el comentario de la lista local
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error hiding comment:", error);
    }
  };

  // Skeleton para loading
  const CommentSkeleton = () => (
    <div className="flex gap-4 animate-pulse">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-3">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );

  return (
    <Card className="border-0 shadow-xl dark:bg-slate-900">
      <CardContent className="p-8 md:p-12">
        <div className="space-y-8">
          {/* Comments Header */}
          <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Comentarios ({loading ? "..." : comments.length})
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Únete a la conversación y comparte tus ideas
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Add Comment Form */}
          {isAuthenticated ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Agregar comentario
              </h3>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {user?.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="¿Qué opinas sobre este artículo?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px] resize-none border-slate-300 dark:border-slate-600"
                    disabled={submitting}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim() || submitting}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {submitting ? "Enviando..." : "Publicar comentario"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Inicia sesión para participar en la conversación
              </p>
              <Button
                onClick={() => (window.location.href = "/login")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Iniciar Sesión
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-8">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <CommentSkeleton key={index} />
              ))
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="space-y-4">
                  {/* Main Comment */}
                  <div className="flex gap-4 group">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={comment.author?.avatarUrl || ""} />
                      <AvatarFallback className="bg-slate-100 text-slate-600">
                        {comment.author?.fullName?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              {comment.author?.fullName ||
                                "Usuario desconocido"}
                            </h4>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {dayjs(comment.createdAt).fromNow()}
                            </span>
                          </div>

                          {/* Admin Actions */}
                          {isAuthenticated &&
                            user?.roles?.includes("admin") && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
                                  >
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleHideComment(comment.id)
                                    }
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Ocultar comentario
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>

                      {/* Comment Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <button
                            onClick={() => handleToggleLike(comment.id)}
                            disabled={!isAuthenticated}
                            className={`flex items-center gap-1 transition-colors ${
                              comment.isLiked
                                ? "text-green-600 dark:text-green-400"
                                : "text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400"
                            }`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>
                              {comment.isLiked
                                ? Math.max(1, comment.likesCount || 0)
                                : comment.likesCount || 0}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No comments state
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <Reply className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Sin comentarios aún
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {isAuthenticated
                    ? "Sé el primero en comentar este artículo"
                    : "Inicia sesión para ser el primero en comentar"}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
