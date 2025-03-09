import type { ReactNode } from "react";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
        </div>
        <nav className="mt-4">
          <Link
            href="/admin/reda"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/reda/hero"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Hero Section
          </Link>
          <Link
            href="/admin/reda/featured-collections"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Featured Collections
          </Link>
          <Link
            href="/admin/reda/categories"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Categories
          </Link>
          <Link
            href="/admin/reda/products"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Products
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
