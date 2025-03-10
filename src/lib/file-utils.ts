import path from "path";

export function getUploadsDir() {
  return path.join(process.cwd(), "public", "uploads");
}

export function getCategoriesUploadsDir() {
  return path.join(getUploadsDir(), "categories");
}

export function getUploadUrl(filePath: string) {
  return `/uploads/${filePath}`;
}
