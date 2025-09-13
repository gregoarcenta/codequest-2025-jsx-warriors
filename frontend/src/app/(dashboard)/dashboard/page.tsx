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
  return <div className="space-y-6">{/* Page Header */}</div>;
}
