"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Settings, HelpCircle, Cloud, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface DriveHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DriveHeader({ searchQuery, onSearchChange }: DriveHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-medium text-gray-700 dark:text-gray-200">
            Drive
          </span>
        </div>

        <div className="relative max-w-2xl flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search in Drive"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-full border-0 bg-gray-100 pl-10 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
          <span className="text-sm font-medium text-white">U</span>
        </div>
      </div>
    </header>
  );
}
