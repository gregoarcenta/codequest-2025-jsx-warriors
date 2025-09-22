"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  Folder,
  Heart,
  Eye,
  MessageSquare,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import dayjs from "@/lib/dayjs";

interface DashboardStats {
  users: number;
  posts: number;
  categories: number;
  publishedPosts: number;
  draftPosts: number;
}

interface RecentPost {
  id: string;
  title: string;
  excerpt: string;
  isPublished: boolean;
  publishedAt: string | null;
  author: {
    name: string;
    email: string;
  };
  categories: Array<{
    id: string;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface RecentUser {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  avatarUrl: string | null;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    posts: 0,
    categories: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to clean HTML tags from text
  const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, "").trim();
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel using axios
      const [usersRes, postsRes, categoriesRes, recentUsersRes] =
        await Promise.all([
          api.get("/users?page=1&limit=1"),
          api.get("/posts?page=1&limit=10"),
          api.get("/categories"),
          api.get("/users?page=1&limit=5"),
        ]);

      // Parse responses based on API documentation structure
      const usersData = usersRes.data || { users: [], total: 0 };
      const postsData = postsRes.data || { posts: [], total: 0 }; // Objeto con posts array y total
      const categoriesData = categoriesRes.data || []; // Array directo
      const recentUsersData = recentUsersRes.data || { users: [], total: 0 };

      // Extract totals according to actual API structure
      const totalUsers = usersData.total || 0;
      const totalPosts = postsData.total || 0; // Usar el total real de la API
      const totalCategories = Array.isArray(categoriesData)
        ? categoriesData.length
        : 0;

      // Calculate published/draft posts from the posts array
      const postsArray = postsData.posts || [];
      const publishedPosts = Array.isArray(postsArray)
        ? postsArray.filter((post: any) => post.status === "published").length
        : 0;
      const draftPosts = Array.isArray(postsArray)
        ? postsArray.filter((post: any) => post.status === "draft").length
        : 0;

      setStats({
        users: totalUsers,
        posts: totalPosts,
        categories: totalCategories,
        publishedPosts: publishedPosts,
        draftPosts: draftPosts,
      });

      // Set recent data - adaptar a la estructura real
      const recentPostsData = Array.isArray(postsArray)
        ? postsArray.slice(0, 5).map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.content
              ? stripHtmlTags(post.content).substring(0, 150) + "..."
              : "Sin extracto",
            isPublished: post.status === "published",
            publishedAt: post.publishedAt,
            author: {
              name: post.author?.fullName || "Desconocido",
              email: "",
            },
            categories: post.category
              ? [{ id: post.category.id, name: post.category.name }]
              : [],
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          }))
        : [];

      setRecentPosts(recentPostsData);
      setRecentUsers(recentUsersData.users?.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD MMM YYYY");
  };

  const formatTimeAgo = (dateString: string) => {
    return dayjs(dateString).fromNow();
  };

  const statCards = [
    {
      title: "Total Usuarios",
      value: stats.users,
      icon: Users,
      description: "Usuarios registrados",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      href: "/dashboard/usuarios",
    },
    {
      title: "Total Artículos",
      value: stats.posts,
      icon: FileText,
      description: "Artículos creados",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      href: "/dashboard/articulos",
    },
    {
      title: "Categorías",
      value: stats.categories,
      icon: Folder,
      description: "Categorías activas",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      href: "/dashboard/categorias",
    },
    {
      title: "Publicados",
      value: stats.publishedPosts,
      icon: Eye,
      description: "Artículos publicados",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      href: "/dashboard/articulos",
    },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de DevTalles Blog
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.value.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Artículos Recientes
            </CardTitle>
            <CardDescription>Los últimos artículos creados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay artículos recientes
                </p>
              ) : (
                recentPosts.map((post) => (
                  <Link key={post.id} href={`/dashboard/articulos/${post.id}`}>
                    <div className="flex items-start justify-between p-3 border mb-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium truncate">
                            {post.title}
                          </h4>
                          <Badge
                            variant={post.isPublished ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {post.isPublished ? "Publicado" : "Borrador"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {post.excerpt || "Sin extracto"}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Por {post.author.name}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimeAgo(post.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}

              {recentPosts.length > 0 && (
                <div className="pt-2">
                  <Link href="/dashboard/articulos">
                    <Button variant="ghost" className="w-full text-sm">
                      Ver todos los artículos
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Usuarios Recientes
            </CardTitle>
            <CardDescription>Los últimos usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay usuarios recientes
                </p>
              ) : (
                recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium truncate">
                          {user.fullName}
                        </h4>
                        <Badge
                          variant={
                            user.roles.includes("admin")
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {user.roles.includes("admin") ? "admin" : "user"}
                        </Badge>
                        {user.isActive && (
                          <Badge variant="outline" className="text-xs">
                            Activo
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(user.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {recentUsers.length > 0 && (
                <div className="pt-2">
                  <Link href="/dashboard/usuarios">
                    <Button variant="ghost" className="w-full text-sm">
                      Ver todos los usuarios
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
