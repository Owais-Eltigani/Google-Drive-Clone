"use client";

import { Star, Clock, Trash2, Users, Folder } from "lucide-react";
import type { Section } from "../constants";

interface EmptyStateProps {
  section: Section;
}

export function EmptyState({ section }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    switch (section) {
      case "starred":
        return {
          icon: (
            <Star className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
          ),
          title: "No starred files",
          description: "Add stars to things that you want to easily find later",
        };
      case "recent":
        return {
          icon: (
            <Clock className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
          ),
          title: "No recent files",
          description: "Files you've recently viewed will appear here",
        };
      case "trash":
        return {
          icon: (
            <Trash2 className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
          ),
          title: "Trash is empty",
          description: "Items you delete will appear here",
        };
      case "shared":
        return {
          icon: (
            <Users className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
          ),
          title: "No shared files",
          description: "Files shared with you will appear here",
        };
      case "my-drive":
      default:
        return {
          icon: (
            <Folder className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
          ),
          title: "This folder is empty",
          description: 'Drop files here or use the "New" button to add content',
        };
    }
  };

  const { icon, title, description } = getEmptyStateContent();

  return (
    <div className="py-12 text-center">
      {icon}
      <h3 className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-500">{description}</p>
    </div>
  );
}
