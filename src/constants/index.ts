import type { IFile, IFolder } from "@/types";
import { Section } from "lucide-react";

export const folders: IFolder[] = [
  {
    folder_id: "1",
    name: "Documents",
    itemCount: 12,
    parentId: "0",
    section: "my-drive",
  },
  {
    folder_id: "2",
    name: "Photos",
    itemCount: 156,
    parentId: "0",
    section: "my-drive",
  },
  {
    folder_id: "3",
    name: "Projects",
    itemCount: 8,
    parentId: "0",
    section: "my-drive",
  },
  {
    folder_id: "4",
    name: "Shared",
    itemCount: 24,
    parentId: "0",
    section: "shared",
  },
  {
    folder_id: "5",
    name: "Work",
    itemCount: 8,
    parentId: "1",
    section: "my-drive",
  },
  {
    folder_id: "6",
    name: "Personal",
    itemCount: 4,
    parentId: "1",
    section: "my-drive",
  },
  {
    folder_id: "7",
    name: "Vacation 2024",
    itemCount: 45,
    parentId: "2",
    section: "my-drive",
  },
  {
    folder_id: "8",
    name: "Family",
    itemCount: 67,
    parentId: "2",
    section: "my-drive",
  },
  {
    folder_id: "9",
    name: "Website Redesign",
    itemCount: 15,
    parentId: "3",
    section: "my-drive",
  },
  {
    folder_id: "10",
    name: "Mobile App",
    itemCount: 23,
    parentId: "3",
    section: "my-drive",
  },
];

export type Section = "my-drive" | "shared" | "recent" | "starred" | "trash";

export const files: IFile[] = [
  {
    file_id: "f1",
    filename: "Resume.pdf",
    type: "pdf",
    size: "2.1 MB",
    modified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    url: "/files/resume.pdf",
    starred: true,
    parentId: "0", // Root level file
  },
  {
    file_id: "f2",
    filename: "Presentation.pptx",
    type: "presentation",
    size: "5.4 MB",
    modified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    url: "/files/presentation.pptx",
    starred: false,
    parentId: "4", // In Shared folder
  },
  {
    file_id: "f3",
    filename: "Budget.xlsx",
    type: "spreadsheet",
    size: "1.2 MB",
    modified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    url: "/files/budget.xlsx",
    starred: true,
    parentId: "5", // In Work folder
  },
  {
    file_id: "f4",
    filename: "Contract.pdf",
    type: "pdf",
    size: "890 KB",
    modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    url: "/files/contract.pdf",
    starred: false,
    parentId: "5", // In Work folder
  },
  {
    file_id: "f5",
    filename: "Notes.docx",
    type: "document",
    size: "245 KB",
    modified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    url: "/files/notes.docx",
    starred: true,
    parentId: "6",
  },
  {
    file_id: "f6",
    filename: "Invoice.pdf",
    type: "pdf",
    size: "1.1 MB",
    modified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    url: "/files/invoice.pdf",
    starred: false,
    parentId: "6",
  },
  {
    file_id: "f7",
    filename: "sunset.jpg",
    type: "image",
    size: "3.2 MB",
    modified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    url: "/images/sunset.jpg",
    starred: true,
    parentId: "7",
  },
  {
    file_id: "f8",
    filename: "portrait.png",
    type: "image",
    size: "2.8 MB",
    modified: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    url: "/images/portrait.png",
    starred: false,
    parentId: "8",
  },
  {
    file_id: "f9",
    filename: "landscape.jpg",
    type: "image",
    size: "4.1 MB",
    modified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    url: "/images/landscape.jpg",
    starred: false,
    parentId: "7",
  },
  {
    file_id: "f10",
    filename: "project-plan.pdf",
    type: "pdf",
    size: "1.5 MB",
    modified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    url: "/files/project-plan.pdf",
    starred: false,
    parentId: "9",
  },
  {
    file_id: "f11",
    filename: "wireframes.fig",
    type: "design",
    size: "12.3 MB",
    modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    url: "/files/wireframes.fig",
    starred: true,
    parentId: "9",
  },
  {
    file_id: "sf1",
    filename: "Shared Presentation.pptx",
    type: "presentation",
    size: "8.2 MB",
    modified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    url: "/files/shared-presentation.pptx",
    starred: false,
    parentId: "4",
  },
  {
    file_id: "sf2",
    filename: "Team Photo.jpg",
    type: "image",
    size: "4.5 MB",
    modified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    url: "/images/team-photo.jpg",
    starred: true,
    parentId: "4",
  },
];
