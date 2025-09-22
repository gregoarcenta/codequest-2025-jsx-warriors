"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DataTableProps {
  title: string;
  children: React.ReactNode;
  onCreateNew?: () => void;
  createButtonText?: string;
  isLoading?: boolean;
}

export default function DataTable({
  title,
  children,
  onCreateNew,
  createButtonText = "Crear Nuevo",
  isLoading = false,
}: DataTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {onCreateNew && (
            <Button
              onClick={onCreateNew}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {createButtonText}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
