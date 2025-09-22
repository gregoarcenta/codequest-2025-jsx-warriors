import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className={`border-0 shadow-lg dark:shadow-slate-700/50 dark:bg-slate-800 ${
            index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
          }`}
        >
          <div className="relative overflow-hidden rounded-t-lg">
            <Skeleton className={`w-full h-48 lg:h-64`} />
            <div className="absolute top-4 left-4">
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="absolute top-4 right-4">
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <CardHeader className="pb-3">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 mb-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-3 w-16 mb-3" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function RecentArticlesSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={index}
          className="border border-slate-200 dark:border-slate-700 shadow-md dark:bg-slate-800 rounded-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative overflow-hidden">
              <Skeleton className="w-full h-48 md:h-full" />
              <div className="absolute top-4 left-4">
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-3 w-16 mb-3" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function CategoriesSkeleton() {
  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-800 dark:to-purple-950/20 rounded-2xl overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
        <div className="flex items-center relative z-10">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">Explora por Categorías</h3>
            <p className="text-purple-100 mt-2 text-sm">
              Descubre contenido especializado
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div>
                    <Skeleton className="h-5 w-20 mb-1" />
                  </div>
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
}
