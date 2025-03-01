"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    imageUrl: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("/api/admin/categories");
    const data = await response.json();
    setCategories(data);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    setNewCategory({ name: "", imageUrl: "" });
    fetchCategories();
  };

  const handleUpdateCategory = async (
    id: string,
    updatedCategory: Partial<Category>
  ) => {
    await fetch(`/api/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCategory),
    });
    fetchCategories();
  };

  const handleDeleteCategory = async (id: string) => {
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Categories</h1>

      <form
        onSubmit={handleAddCategory}
        className="mb-8 p-4 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCategory.imageUrl}
          onChange={(e) =>
            setNewCategory({ ...newCategory, imageUrl: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length > 0 &&
          categories.map((category) => (
            <div key={category.id} className="p-4 bg-white rounded-lg shadow">
              <img
                src={category.imageUrl || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleUpdateCategory(category.id, {
                      name: prompt("New name:", category.name) || category.name,
                    })
                  }
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
