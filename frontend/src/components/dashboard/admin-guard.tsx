"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dar tiempo para que Zustand se hidrate desde localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Solo ejecutar las redirecciones después de que el estado esté cargado
    if (!isLoading) {
      // Si no está autenticado, redirigir al login
      if (!isAuthenticated) {
        router.push("/dashboard/login");
        return;
      }

      // Si está autenticado pero no es admin, redirigir al home
      if (user && !user.roles.includes("admin")) {
        router.push("/");
        return;
      }
    }
  }, [isAuthenticated, user, router, isLoading]);

  // Mostrar loading mientras se carga el estado o se validan permisos
  if (isLoading || !isAuthenticated || !user || !user.roles.includes("admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-600" />
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
