export interface IFile {
  id: string;
  name: string;
  type: string; // e.g., "pdf", "image", "video", etc.
  size: string; // e.g., "2.1 MB"
  parentId: string; // For files in folders  //TODO add parent ID for files in folders
  url: string; // URL to access the file
  modified: string; // Last modified date
  starred: boolean; // Whether the file is starred
}

export interface IFolder {
  id: string;
  name: string;
  itemCount: number; // Number of items in the folder
  parentId: string; // Optional parent ID for nested folders
  section: "my-drive" | "shared" | "recent" | "starred" | "trash"; // Section where the folder is located
}
