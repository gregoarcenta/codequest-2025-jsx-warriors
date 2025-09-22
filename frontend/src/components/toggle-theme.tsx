"use client";

import * as React from "react";
import { Moon, Sun, Computer } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-600/30 border border-slate-200 dark:border-white/20 hover:border-purple-300 dark:hover:border-purple-300 bg-white/80 dark:bg-transparent transition-all duration-200"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-purple-100 dark:border-purple-800"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-800 dark:hover:text-purple-200"
        >
          <Sun className="mr-2 h-4 w-4" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-800 dark:hover:text-purple-200"
        >
          <Moon className="mr-2 h-4 w-4" />
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 hover:text-purple-800 dark:hover:text-purple-200"
        >
          <Computer className="mr-2 h-4 w-4" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
