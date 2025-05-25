/* eslint-disable */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Search,
  Grid3X3,
  List,
  Settings,
  HelpCircle,
  Plus,
  Upload,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  MoreVertical,
  Star,
  Share,
  Download,
  Trash2,
  Clock,
  Users,
  Cloud,
  Home,
  StarIcon,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

// Sample data structure
const driveData = {
  "/": {
    name: "My Drive",
    folders: [
      { id: "1", name: "Documents", itemCount: 12 },
      { id: "2", name: "Photos", itemCount: 156 },
      { id: "3", name: "Projects", itemCount: 8 },
      { id: "4", name: "Shared", itemCount: 24 },
    ],
    files: [
      {
        id: "f1",
        name: "Resume.pdf",
        type: "pdf",
        size: "2.1 MB",
        modified: "2 days ago",
        url: "/files/resume.pdf",
        starred: true,
      },
      {
        id: "f2",
        name: "Presentation.pptx",
        type: "presentation",
        size: "5.4 MB",
        modified: "1 week ago",
        url: "/files/presentation.pptx",
        starred: false,
      },
      {
        id: "f3",
        name: "Budget.xlsx",
        type: "spreadsheet",
        size: "1.2 MB",
        modified: "3 days ago",
        url: "/files/budget.xlsx",
        starred: true,
      },
    ],
  },
  "/Documents": {
    name: "Documents",
    folders: [
      { id: "5", name: "Work", itemCount: 8 },
      { id: "6", name: "Personal", itemCount: 4 },
    ],
    files: [
      {
        id: "f4",
        name: "Contract.pdf",
        type: "pdf",
        size: "890 KB",
        modified: "1 day ago",
        url: "/files/contract.pdf",
        starred: false,
      },
      {
        id: "f5",
        name: "Notes.docx",
        type: "document",
        size: "245 KB",
        modified: "5 days ago",
        url: "/files/notes.docx",
        starred: true,
      },
      {
        id: "f6",
        name: "Invoice.pdf",
        type: "pdf",
        size: "1.1 MB",
        modified: "1 week ago",
        url: "/files/invoice.pdf",
        starred: false,
      },
    ],
  },
  "/Photos": {
    name: "Photos",
    folders: [
      { id: "7", name: "Vacation 2024", itemCount: 45 },
      { id: "8", name: "Family", itemCount: 67 },
    ],
    files: [
      {
        id: "f7",
        name: "sunset.jpg",
        type: "image",
        size: "3.2 MB",
        modified: "2 days ago",
        url: "/images/sunset.jpg",
        starred: true,
      },
      {
        id: "f8",
        name: "portrait.png",
        type: "image",
        size: "2.8 MB",
        modified: "4 days ago",
        url: "/images/portrait.png",
        starred: false,
      },
      {
        id: "f9",
        name: "landscape.jpg",
        type: "image",
        size: "4.1 MB",
        modified: "1 week ago",
        url: "/images/landscape.jpg",
        starred: false,
      },
    ],
  },
  "/Projects": {
    name: "Projects",
    folders: [
      { id: "9", name: "Website Redesign", itemCount: 15 },
      { id: "10", name: "Mobile App", itemCount: 23 },
    ],
    files: [
      {
        id: "f10",
        name: "project-plan.pdf",
        type: "pdf",
        size: "1.5 MB",
        modified: "3 days ago",
        url: "/files/project-plan.pdf",
        starred: false,
      },
      {
        id: "f11",
        name: "wireframes.fig",
        type: "design",
        size: "12.3 MB",
        modified: "1 day ago",
        url: "/files/wireframes.fig",
        starred: true,
      },
    ],
  },
};

// Additional data for special sections
const sharedData = {
  folders: [
    {
      id: "s1",
      name: "Team Documents",
      itemCount: 15,
      owner: "john@company.com",
    },
    {
      id: "s2",
      name: "Marketing Assets",
      itemCount: 32,
      owner: "sarah@company.com",
    },
  ],
  files: [
    {
      id: "sf1",
      name: "Shared Presentation.pptx",
      type: "presentation",
      size: "8.2 MB",
      modified: "1 day ago",
      url: "/files/shared-presentation.pptx",
      owner: "mike@company.com",
      starred: false,
    },
    {
      id: "sf2",
      name: "Team Photo.jpg",
      type: "image",
      size: "4.5 MB",
      modified: "3 days ago",
      url: "/images/team-photo.jpg",
      owner: "lisa@company.com",
      starred: true,
    },
  ],
};

const trashData = {
  folders: [
    { id: "t1", name: "Old Projects", itemCount: 5, deletedDate: "2 days ago" },
  ],
  files: [
    {
      id: "tf1",
      name: "Old Resume.pdf",
      type: "pdf",
      size: "1.8 MB",
      modified: "2 weeks ago",
      url: "/files/old-resume.pdf",
      deletedDate: "1 week ago",
      starred: false,
    },
    {
      id: "tf2",
      name: "Draft Document.docx",
      type: "document",
      size: "567 KB",
      modified: "1 month ago",
      url: "/files/draft-document.docx",
      deletedDate: "3 days ago",
      starred: false,
    },
  ],
};

type Section = "my-drive" | "shared" | "recent" | "starred" | "trash";

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
    case "document":
      return <FileText className="h-8 w-8 text-red-500" />;
    case "image":
      return <ImageIcon className="h-8 w-8 text-green-500" />;
    case "video":
      return <Video className="h-8 w-8 text-purple-500" />;
    case "audio":
      return <Music className="h-8 w-8 text-orange-500" />;
    case "archive":
      return <Archive className="h-8 w-8 text-yellow-500" />;
    case "spreadsheet":
      return <FileText className="h-8 w-8 text-green-600" />;
    case "presentation":
      return <FileText className="h-8 w-8 text-orange-600" />;
    case "design":
      return <FileText className="h-8 w-8 text-purple-600" />;
    default:
      return <FileText className="h-8 w-8 text-gray-500" />;
  }
};

const getAllFiles = () => {
  const allFiles = [];
  for (const path in driveData) {
    const data = driveData[path as keyof typeof driveData];
    allFiles.push(...data.files.map((file) => ({ ...file, path })));
  }
  return allFiles;
};

const getStarredFiles = () => {
  return getAllFiles().filter((file) => file.starred);
};

const getRecentFiles = () => {
  const allFiles = getAllFiles();
  // Sort by modified date (most recent first)
  return allFiles
    .sort((a, b) => {
      const dateA = new Date(
        a.modified.includes("day")
          ? Date.now() - Number.parseInt(a.modified) * 24 * 60 * 60 * 1000
          : Date.now(),
      );
      const dateB = new Date(
        b.modified.includes("day")
          ? Date.now() - Number.parseInt(b.modified) * 24 * 60 * 60 * 1000
          : Date.now(),
      );
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10); // Show only 10 most recent
};

export default function GoogleDriveClone() {
  const [currentPath, setCurrentPath] = useState("/");
  const [currentSection, setCurrentSection] = useState<Section>("my-drive");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  const getCurrentData = () => {
    switch (currentSection) {
      case "my-drive":
        return (
          driveData[currentPath as keyof typeof driveData] || driveData["/"]
        );
      case "shared":
        return {
          name: "Shared with me",
          folders: sharedData.folders,
          files: sharedData.files,
        };
      case "recent":
        return { name: "Recent", folders: [], files: getRecentFiles() };
      case "starred":
        return { name: "Starred", folders: [], files: getStarredFiles() };
      case "trash":
        return {
          name: "Trash",
          folders: trashData.folders,
          files: trashData.files,
        };
      default:
        return driveData["/"];
    }
  };

  const currentData = getCurrentData();
  const pathSegments = currentPath.split("/").filter(Boolean);

  const navigateToFolder = (folderName: string) => {
    if (currentSection !== "my-drive") return; // Only allow folder navigation in My Drive

    const newPath =
      currentPath === "/" ? `/${folderName}` : `${currentPath}/${folderName}`;
    if (driveData[newPath as keyof typeof driveData]) {
      setCurrentPath(newPath);
    }
  };

  const navigateToPath = (index: number) => {
    if (currentSection !== "my-drive") return;

    if (index === -1) {
      setCurrentPath("/");
    } else {
      const newPath = "/" + pathSegments.slice(0, index + 1).join("/");
      setCurrentPath(newPath);
    }
  };

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
    if (section === "my-drive") {
      setCurrentPath("/"); // Reset to root when going back to My Drive
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case "my-drive":
        return currentData.name;
      case "shared":
        return "Shared with me";
      case "recent":
        return "Recent";
      case "starred":
        return "Starred";
      case "trash":
        return "Trash";
      default:
        return "My Drive";
    }
  };

  const toggleStarred = (fileId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggle starred for file: ${fileId}`);
  };

  const restoreFromTrash = (itemId: string) => {
    console.log(`Restore item: ${itemId}`);
  };

  const permanentlyDelete = (itemId: string) => {
    console.log(`Permanently delete item: ${itemId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className="flex">
        {/* Sidebar */}
        <aside className="h-[calc(100vh-73px)] w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Folder className="mr-2 h-4 w-4" />
                  Folder
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Upload className="mr-2 h-4 w-4" />
                  File upload
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Google Docs
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <nav className="px-2">
            <div className="space-y-1">
              <Button
                variant={currentSection === "my-drive" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => handleSectionChange("my-drive")}
              >
                <Home className="h-5 w-5" />
                My Drive
              </Button>
              <Button
                variant={currentSection === "shared" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => handleSectionChange("shared")}
              >
                <Users className="h-5 w-5" />
                Shared with me
              </Button>
              <Button
                variant={currentSection === "recent" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => handleSectionChange("recent")}
              >
                <Clock className="h-5 w-5" />
                Recent
              </Button>
              <Button
                variant={currentSection === "starred" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => handleSectionChange("starred")}
              >
                <Star className="h-5 w-5" />
                Starred
              </Button>
              <Button
                variant={currentSection === "trash" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => handleSectionChange("trash")}
              >
                <Trash2 className="h-5 w-5" />
                Trash
              </Button>
            </div>
          </nav>

          <div className="mt-8 px-4">
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Storage
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: "45%" }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              6.8 GB of 15 GB used
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white dark:bg-gray-900">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <Breadcrumb>
              <BreadcrumbList>
                {currentSection === "my-drive" ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="#"
                        onClick={() => navigateToPath(-1)}
                        className="flex items-center gap-1"
                      >
                        <Home className="h-4 w-4" />
                        My Drive
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathSegments.map((segment, index) => (
                      <div key={index} className="flex items-center">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          {index === pathSegments.length - 1 ? (
                            <BreadcrumbPage>{segment}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href="#"
                              onClick={() => navigateToPath(index)}
                            >
                              {segment}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </div>
                    ))}
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="flex items-center gap-2">
                      {currentSection === "shared" && (
                        <Users className="h-4 w-4" />
                      )}
                      {currentSection === "recent" && (
                        <Clock className="h-4 w-4" />
                      )}
                      {currentSection === "starred" && (
                        <Star className="h-4 w-4" />
                      )}
                      {currentSection === "trash" && (
                        <Trash2 className="h-4 w-4" />
                      )}
                      {getSectionTitle()}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {/* Folders */}
                {currentData.folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="group cursor-pointer"
                    onClick={() => navigateToFolder(folder.name)}
                  >
                    <div className="flex flex-col items-center rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Folder className="mb-2 h-12 w-12 text-blue-500" />
                      <span className="text-center text-sm text-gray-700 group-hover:text-blue-600 dark:text-gray-300">
                        {folder.name}
                      </span>
                      <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {currentSection === "trash"
                          ? `Deleted ${(folder as any).deletedDate}`
                          : `${folder.itemCount} items`}
                      </span>
                      {currentSection === "shared" && (
                        <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          ? // @ts-expect-error by {(folder as any).owner}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Files */}
                {currentData.files.map((file) => (
                  <div key={file.id} className="group">
                    <div className="relative">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block flex flex-col items-center rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="relative">
                          {getFileIcon(file.type)}
                          {file.starred && (
                            <StarIcon className="absolute -top-1 -right-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                          )}
                        </div>
                        <span className="mt-2 text-center text-sm text-gray-700 group-hover:text-blue-600 dark:text-gray-300">
                          {file.name}
                        </span>
                        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {file.size}
                        </span>
                        {currentSection === "shared" && (
                          <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            by {(file as any).owner}
                          </span>
                        )}
                        {currentSection === "trash" && (
                          <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            Deleted {(file as any).deletedDate}
                          </span>
                        )}
                      </a>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {currentSection === "trash" ? (
                            <>
                              <DropdownMenuItem
                                onClick={() => restoreFromTrash(file.id)}
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Restore
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => permanentlyDelete(file.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete forever
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem>
                                <Share className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toggleStarred(file.id)}
                              >
                                <Star className="mr-2 h-4 w-4" />
                                {file.starred
                                  ? "Remove from starred"
                                  : "Add to starred"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Move to trash
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {/* List Header */}
                <div className="grid grid-cols-12 gap-4 border-b px-4 py-2 text-sm font-medium text-gray-600 dark:border-gray-700 dark:text-gray-400">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-2">
                    {currentSection === "shared"
                      ? "Owner"
                      : currentSection === "trash"
                        ? "Deleted"
                        : "Owner"}
                  </div>
                  <div className="col-span-2">Last modified</div>
                  <div className="col-span-2">File size</div>
                </div>

                {/* Folders */}
                {currentData.folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="group grid cursor-pointer grid-cols-12 gap-4 rounded-lg px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => navigateToFolder(folder.name)}
                  >
                    <div className="col-span-6 flex items-center gap-3">
                      <Folder className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 dark:text-gray-300">
                        {folder.name}
                      </span>
                    </div>
                    <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                      {currentSection === "shared"
                        ? (folder as any).owner
                        : currentSection === "trash"
                          ? (folder as any).deletedDate
                          : "me"}
                    </div>
                    <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                      —
                    </div>
                    <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                      {folder.itemCount} items
                    </div>
                  </div>
                ))}

                {/* Files */}
                {currentData.files.map((file) => (
                  <div
                    key={file.id}
                    className="group grid grid-cols-12 gap-4 rounded-lg px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="relative">
                        {getFileIcon(file.type)}
                        {file.starred && (
                          <StarIcon className="absolute -top-1 -right-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                        )}
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-300"
                      >
                        {file.name}
                      </a>
                    </div>
                    <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                      {currentSection === "shared"
                        ? (file as any).owner
                        : currentSection === "trash"
                          ? (file as any).deletedDate
                          : "me"}
                    </div>
                    <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                      {file.modified}
                    </div>
                    <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
                      {file.size}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentData.folders.length === 0 &&
              currentData.files.length === 0 && (
                <div className="py-12 text-center">
                  {currentSection === "starred" && (
                    <>
                      <Star className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
                        No starred files
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        Add stars to things that you want to easily find later
                      </p>
                    </>
                  )}
                  {currentSection === "recent" && (
                    <>
                      <Clock className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
                        No recent files
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        Files you&apos;ve recently viewed will appear here
                      </p>
                    </>
                  )}
                  {currentSection === "trash" && (
                    <>
                      <Trash2 className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
                        Trash is empty
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        Items you delete will appear here
                      </p>
                    </>
                  )}
                  {currentSection === "shared" && (
                    <>
                      <Users className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
                        No shared files
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        Files shared with you will appear here
                      </p>
                    </>
                  )}
                  {currentSection === "my-drive" && (
                    <>
                      <Folder className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
                        This folder is empty
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        Drop files here or use the &quot;New&quot; button to add
                        content
                      </p>
                    </>
                  )}
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}
