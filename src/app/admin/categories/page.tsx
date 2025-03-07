// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface Category {
//   id: string;
//   name: string;
//   imageUrl: string;
// }

// export default function CategoriesAdmin() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
//     name: "",
//     imageUrl: "",
//   });
//   const router = useRouter();

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     const response = await fetch("/api/admin/categories");
//     const data = await response.json();
//     setCategories(data);
//   };

//   const handleAddCategory = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await fetch("/api/admin/categories", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newCategory),
//     });
//     setNewCategory({ name: "", imageUrl: "" });
//     fetchCategories();
//   };

//   const handleUpdateCategory = async (
//     id: string,
//     updatedCategory: Partial<Category>
//   ) => {
//     await fetch(`/api/admin/categories/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedCategory),
//     });
//     fetchCategories();
//   };

//   const handleDeleteCategory = async (id: string) => {
//     await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
//     fetchCategories();
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Categories</h1>

//       <form
//         onSubmit={handleAddCategory}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
//         <input
//           type="text"
//           placeholder="Category Name"
//           value={newCategory.name}
//           onChange={(e) =>
//             setNewCategory({ ...newCategory, name: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newCategory.imageUrl}
//           onChange={(e) =>
//             setNewCategory({ ...newCategory, imageUrl: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Category
//         </button>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.length > 0 &&
//           categories.map((category) => (
//             <div key={category.id} className="p-4 bg-white rounded-lg shadow">
//               <img
//                 src={category.imageUrl || "/placeholder.svg"}
//                 alt={category.name}
//                 className="w-full h-40 object-cover mb-4 rounded"
//               />
//               <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() =>
//                     handleUpdateCategory(category.id, {
//                       name: prompt("New name:", category.name) || category.name,
//                     })
//                   }
//                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteCategory(category.id)}
//                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import { Upload, LinkIcon, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

type ImageUploadMethod = "file" | "url";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    imageUrl: "",
  });
  const [imageUploadMethod, setImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setNewCategory((prev) => ({ ...prev, imageUrl: "" })); // Clear URL when file is selected
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewCategory((prev) => ({ ...prev, imageUrl: url }));
    setImageFile(null);
    setImagePreview("");
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setNewCategory((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Add category name to formData
      formData.append("name", newCategory.name);

      // Add image URL if using URL method
      if (imageUploadMethod === "url" && newCategory.imageUrl) {
        formData.append("imageUrl", newCategory.imageUrl);
      }

      // Add image file if using file upload method
      if (imageUploadMethod === "file" && imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await fetch("/api/admin/categories", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add category");
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewCategory({ name: "", imageUrl: "" });
    setImageFile(null);
    setImagePreview("");
    setSubmitError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpdateCategory = async (
    id: string,
    updatedCategory: Partial<Category>
  ) => {
    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

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

  const isFormValid = () => {
    return (
      newCategory.name.trim() !== "" &&
      (imageFile !== null || newCategory.imageUrl.trim() !== "")
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Categories</h1>

      <form
        onSubmit={handleAddCategory}
        className="mb-8 p-4 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

        {submitError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {submitError}
          </div>
        )}

        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
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
                  onChange={handleImageFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {!imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center w-full"
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-gray-600">
                        Click to upload an image
                      </span>
                      <span className="text-gray-400 text-sm mt-1">
                        PNG, JPG, GIF up to 10MB
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="relative">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Category preview"
                      width={200}
                      height={200}
                      className="mx-auto h-40 object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
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
                  value={newCategory.imageUrl}
                  onChange={handleImageUrlChange}
                  className="flex-1 p-2 border rounded-l"
                />
                {newCategory.imageUrl && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-red-500 text-white px-3 rounded-r"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {newCategory.imageUrl && (
                <div className="mt-2">
                  <Image
                    src={newCategory.imageUrl || "/placeholder.svg"}
                    alt="Category preview"
                    width={200}
                    height={200}
                    className="mx-auto h-40 object-contain"
                    onError={() => {
                      alert("Invalid image URL. Please enter a valid URL.");
                      setNewCategory((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? "Adding..." : "Add Category"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Reset Form
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="p-4 bg-white rounded-lg shadow">
            <div className="relative h-40 mb-4">
              <Image
                src={category.imageUrl || "/placeholder.svg"}
                alt={category.name}
                fill
                className="rounded object-cover"
              />
            </div>
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
