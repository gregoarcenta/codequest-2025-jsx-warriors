"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";

interface ApiPost {
  id: string;
  title: string;
  coverImageUrl: string;
}

interface ArticleHeroProps {
  slug: string;
}

export default function ArticleHero({ slug }: ArticleHeroProps) {
  const [post, setPost] = useState<ApiPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/posts/published/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post for hero:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <section className="relative h-[50vh] overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </section>
    );
  }

  if (!post) {
    return (
      <section className="relative h-[50vh] overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
            <p className="text-lg opacity-80">
              El artículo que buscas no está disponible
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[50vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={
            post.coverImageUrl ||
            `https://picsum.photos/1200/600?random=${post.id}`
          }
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </section>
  );
}
