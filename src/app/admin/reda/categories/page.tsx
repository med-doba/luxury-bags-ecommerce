"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, LinkIcon, X } from "lucide-react";

type Category = {
  id: string;
  name: string;
  imageUrl: string;
};

type ImageUploadMethod = "file" | "url";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState<string>("");
  const [imageUploadMethod, setImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [editImageUrl, setEditImageUrl] = useState<string>("");
  const [editImageUploadMethod, setEditImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories/get-all");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleNewImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImageFile(file);
      setNewImagePreview(URL.createObjectURL(file));
      setNewImageUrl("");
    }
  };

  const handleNewImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewImageUrl(url);
    setNewImageFile(null);
    setNewImagePreview("");
  };

  const removeNewImage = () => {
    setNewImageFile(null);
    setNewImagePreview("");
    setNewImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCategoryName);

      if (imageUploadMethod === "url" && newImageUrl) {
        formData.append("imageUrl", newImageUrl);
      }

      if (imageUploadMethod === "file" && newImageFile) {
        formData.append("imageFile", newImageFile);
      }

      const response = await fetch("/api/admin/categories", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      setNewCategoryName("");
      setNewImageFile(null);
      setNewImagePreview("");
      setNewImageUrl("");
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
      setEditImageUrl("");
    }
  };

  const handleEditImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setEditImageUrl(url);
    setEditImageFile(null);
    setEditImagePreview("");
  };

  const removeEditImage = () => {
    setEditImageFile(null);
    setEditImagePreview("");
    setEditImageUrl("");
    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setEditImageUrl(category.imageUrl);
    setEditImagePreview("");
    setEditImageFile(null);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditImageUrl("");
    setEditImagePreview("");
    setEditImageFile(null);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;

    try {
      const formData = new FormData();
      formData.append("name", editingCategory.name);

      // Add image URL if using URL method
      if (editImageUploadMethod === "url" && editImageUrl) {
        formData.append("imageUrl", editImageUrl);
      }

      // Add image file if using file upload method
      if (editImageUploadMethod === "file" && editImageFile) {
        formData.append("imageFile", editImageFile);
      }

      const response = await fetch(
        `/api/admin/categories/${editingCategory.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      fetchCategories();
      cancelEditing();
    } catch (error) {
      console.error("Error updating category:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin - Categories</h1>

      {submitError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {submitError}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      {/* Create Category Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New Category</h2>

        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        {/* Image Upload Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Category Image</h3>

          {/* Toggle between upload methods */}
          <div className="flex mb-4 border rounded overflow-hidden">
            <button
              type="button"
              onClick={() => setImageUploadMethod("file")}
              className={`flex-1 py-2 px-4 flex items-center justify-center ${
                imageUploadMethod === "file"
                  ? "bg-gray-200 font-medium"
                  : "bg-white"
              }`}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setImageUploadMethod("url")}
              className={`flex-1 py-2 px-4 flex items-center justify-center ${
                imageUploadMethod === "url"
                  ? "bg-gray-200 font-medium"
                  : "bg-white"
              }`}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Image URL
            </button>
          </div>

          {/* File upload option */}
          {imageUploadMethod === "file" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleNewImageFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {!newImagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center w-full"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-gray-600">
                        Click to upload a new image
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        PNG, JPG, GIF up to 10MB
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="relative">
                    <Image
                      src={newImagePreview || "/placeholder.svg"}
                      alt="Category preview"
                      width={200}
                      height={200}
                      className="mx-auto h-40 object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeNewImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* URL input option */}
          {imageUploadMethod === "url" && (
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={newImageUrl}
                  onChange={handleNewImageUrlChange}
                  className="flex-1 p-2 border rounded-l"
                />
                {newImageUrl && (
                  <button
                    type="button"
                    onClick={removeNewImage}
                    className="bg-red-500 text-white px-3 rounded-r"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {newImageUrl && (
                <div className="mt-2">
                  <Image
                    src={newImageUrl || "/placeholder.svg"}
                    alt="Category preview"
                    width={200}
                    height={200}
                    className="mx-auto h-40 object-contain"
                    onError={() =>
                      alert("Invalid image URL. Please enter a valid URL.")
                    }
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleCreateCategory}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Category
        </button>
      </div>

      {/* Category List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="border rounded p-4">
              <div className="relative h-40 w-full mb-2">
                <Image
                  src={category.imageUrl || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="rounded object-contain"
                />
              </div>
              <h3 className="text-lg font-medium">{category.name}</h3>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditing(category)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>

            <input
              type="text"
              placeholder="Category Name"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
              required
            />

            {/* Current Image Preview */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Current Image</h3>
              <div className="relative h-40 w-full">
                <Image
                  src={editingCategory.imageUrl || "/placeholder.svg"}
                  alt={editingCategory.name}
                  fill
                  className="rounded object-contain"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Update Image</h3>

              {/* Toggle between upload methods */}
              <div className="flex mb-4 border rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setEditImageUploadMethod("file")}
                  className={`flex-1 py-2 px-4 flex items-center justify-center ${
                    editImageUploadMethod === "file"
                      ? "bg-gray-200 font-medium"
                      : "bg-white"
                  }`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setEditImageUploadMethod("url")}
                  className={`flex-1 py-2 px-4 flex items-center justify-center ${
                    editImageUploadMethod === "url"
                      ? "bg-gray-200 font-medium"
                      : "bg-white"
                  }`}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Image URL
                </button>
              </div>

              {/* File upload option */}
              {editImageUploadMethod === "file" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageFileChange}
                      className="hidden"
                      ref={editFileInputRef}
                    />
                    {!editImagePreview ? (
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="inline-flex items-center justify-center w-full"
                      >
                        <div className="flex flex-col items-center">
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <span className="text-gray-600">
                            Click to upload a new image
                          </span>
                          <span className="text-gray-400 text-sm mt-1">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="relative">
                        <Image
                          src={editImagePreview || "/placeholder.svg"}
                          alt="Category preview"
                          width={200}
                          height={200}
                          className="mx-auto h-40 object-contain"
                        />
                        <button
                          type="button"
                          onClick={removeEditImage}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* URL input option */}
              {editImageUploadMethod === "url" && (
                <div className="space-y-4">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      value={editImageUrl}
                      onChange={handleEditImageUrlChange}
                      className="flex-1 p-2 border rounded-l"
                    />
                    {editImageUrl && (
                      <button
                        type="button"
                        onClick={removeEditImage}
                        className="bg-red-500 text-white px-3 rounded-r"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {editImageUrl &&
                    editImageUrl !== editingCategory.imageUrl && (
                      <div className="mt-2">
                        <Image
                          src={editImageUrl || "/placeholder.svg"}
                          alt="Category preview"
                          width={200}
                          height={200}
                          className="mx-auto h-40 object-contain"
                          onError={() => {
                            alert(
                              "Invalid image URL. Please enter a valid URL."
                            );
                            setEditImageUrl(editingCategory.imageUrl);
                          }}
                        />
                      </div>
                    )}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
