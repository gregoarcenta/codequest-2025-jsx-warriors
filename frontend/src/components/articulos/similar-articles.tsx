"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Eye, MessageCircle } from "lucide-react";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";

interface ApiPost {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  createdAt: string;
  publishedAt: string;
  likesCount: number;
  viewsCount: number;
  commentsCount: number;
  isFeatured: boolean;
  category: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    fullName: string;
  };
}

interface SimilarArticlesProps {
  currentPostId: string;
  categoryId?: string;
}

export default function SimilarArticles({
  currentPostId,
  categoryId,
}: SimilarArticlesProps) {
  const [articles, setArticles] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarArticles = async () => {
      try {
        setLoading(true);

        // Parámetros para la búsqueda
        const params = new URLSearchParams();
        params.append("limit", "4");
        params.append("page", "1");

        // Si tenemos categoryId, filtramos por categoría
        if (categoryId) {
          params.append("categoryId", categoryId);
        }

        const response = await api.get(`/posts/published?${params.toString()}`);
        const posts = response.data?.posts || response.data || [];

        // Filtrar el artículo actual y tomar solo los primeros 4
        const filteredPosts = posts
          .filter((post: ApiPost) => post.id !== currentPostId)
          .slice(0, 4);

        setArticles(filteredPosts);
      } catch (error) {
        console.error("Error fetching similar articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarArticles();
  }, [currentPostId, categoryId]);

  if (loading) {
    return (
      <div className="sticky top-8">
        <Card className="border-0 shadow-xl dark:bg-slate-900">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex gap-3 p-3">
                  <Skeleton className="w-16 h-16 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-3">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="sticky top-8">
      <Card className="border-0 shadow-xl dark:bg-slate-900">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Artículos Similares
          </h3>

          {articles.length > 0 ? (
            <div className="space-y-4">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articulos/${article.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={
                          article.coverImageUrl ||
                          `https://picsum.photos/400/240?random=${article.id}`
                        }
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Badge
                        variant="secondary"
                        className="text-xs mb-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                      >
                        {article.category.name}
                      </Badge>
                      <h4 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {dayjs(
                          article.publishedAt || article.createdAt
                        ).fromNow()}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-400" />
                          {article.likesCount || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-blue-400" />
                          {article.viewsCount || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3 text-green-400" />
                          {article.commentsCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No hay artículos similares disponibles
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <Link href="/articulos">
              <Button
                variant="outline"
                className="w-full border-slate-300 dark:border-slate-600 hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20"
              >
                Ver todos los artículos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
