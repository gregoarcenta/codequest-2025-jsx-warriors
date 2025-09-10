import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  BookOpen,
  Eye,
  MessageCircle,
  TrendingUp,
  Users,
  Calendar,
  PlusCircle,
  Edit3,
  Heart,
} from "lucide-react";
import Link from "next/link";

// Mock data for dashboard
const stats = {
  totalPosts: 87,
  totalViews: 15420,
  totalComments: 234,
  totalLikes: 1456,
  publishedThisMonth: 8,
  subscribersGrowth: 12.5,
};

const recentPosts = [
  {
    id: 1,
    title: "Introducción a Next.js 15",
    status: "published",
    publishedAt: "2025-01-15",
    views: 156,
    comments: 8,
    likes: 24,
  },
  {
    id: 2,
    title: "Guía completa de TypeScript",
    status: "published",
    publishedAt: "2025-01-12",
    views: 203,
    comments: 12,
    likes: 31,
  },
  {
    id: 3,
    title: "React Server Components explicado",
    status: "draft",
    publishedAt: null,
    views: 0,
    comments: 0,
    likes: 0,
  },
  {
    id: 4,
    title: "Optimización de rendimiento en React",
    status: "scheduled",
    publishedAt: "2025-01-20",
    views: 0,
    comments: 0,
    likes: 0,
  },
];

const recentComments = [
  {
    id: 1,
    author: "Carlos Mendez",
    content: "Excelente artículo, muy bien explicado...",
    postTitle: "Introducción a Next.js 15",
    createdAt: "2025-01-16",
  },
  {
    id: 2,
    author: "Ana García",
    content: "¿Podrías hacer un tutorial sobre migración?",
    postTitle: "Guía completa de TypeScript",
    createdAt: "2025-01-16",
  },
  {
    id: 3,
    author: "Miguel Torres",
    content: "Increíble el rendimiento que mencionas...",
    postTitle: "Introducción a Next.js 15",
    createdAt: "2025-01-17",
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    published: {
      label: "Publicado",
      variant: "default" as const,
      color: "bg-green-100 text-green-800",
    },
    draft: {
      label: "Borrador",
      variant: "secondary" as const,
      color: "bg-gray-100 text-gray-800",
    },
    scheduled: {
      label: "Programado",
      variant: "outline" as const,
      color: "bg-blue-100 text-blue-800",
    },
  };

  return (
    statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
  );
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Bienvenido al panel de administración de DevTalles Blog
          </p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link href="/dashboard/posts/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nuevo Post
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Ver Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Posts
            </CardTitle>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalPosts}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />+{stats.publishedThisMonth}{" "}
              este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />+{stats.subscribersGrowth}%
              vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Comentarios
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalComments}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Pendientes de moderación: 5
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Likes
            </CardTitle>
            <Heart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalLikes.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Muy buena recepción
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Posts Recientes</CardTitle>
              <CardDescription>
                Tus últimas publicaciones y borradores
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/posts">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                      {post.title}
                    </h4>
                    <Badge
                      className={`text-xs ${getStatusBadge(post.status).color}`}
                    >
                      {getStatusBadge(post.status).label}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    {post.publishedAt && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString("es-ES")}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Edit3 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Comentarios Recientes</CardTitle>
              <CardDescription>
                Últimos comentarios de tus lectores
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/comments">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentComments.map((comment) => (
              <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("es-ES")}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {comment.content}
                </p>
                <p className="text-xs text-gray-500">
                  En: <span className="font-medium">{comment.postTitle}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Tareas comunes y atajos útiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/dashboard/posts/new">
                <PlusCircle className="h-6 w-6 mb-2" />
                Crear Nuevo Post
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/dashboard/media">
                <BarChart3 className="h-6 w-6 mb-2" />
                Ver Estadísticas
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/dashboard/settings">
                <Users className="h-6 w-6 mb-2" />
                Configuración
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
