"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, LinkIcon, X, Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import ColorVariantManager, {
  ColorVariantData,
  ColorVariantImageData,
} from "@/app/components/ColorVariantManager";

interface Product {
  id: string;
  name: string;
  price?: number; // Legacy field, optional
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
  categoryId?: string;
  size?: string; // Legacy field, optional
  description: string;
  featured: boolean;
  onSale?: boolean;
  salePercentage?: number;
  stock?: number; // Legacy field, optional
  colorVariants?: {
    id: string;
    color: string;
    colorHex?: string;
    stock: number;
    images?: {
      id: string;
      url: string;
    }[];
    sizeVariants?: {
      id: string;
      size: string;
      stock: number;
      price?: number;
    }[];
  }[];
  sizeVariants?: {
    id: string;
    size: string;
    stock: number;
    price?: number;
  }[];
}

interface Category {
  id: string;
  name: string;
}

type ImageUploadMethod = "file" | "url";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    imageUrl: "",
    categoryId: "",
    description: "",
    featured: false,
    onSale: false,
    salePercentage: "",
  });
  const [colorVariants, setColorVariants] = useState<ColorVariantData[]>([]);
  const [imageUploadMethod, setImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit mode states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editColorVariants, setEditColorVariants] = useState<
    ColorVariantData[]
  >([]);
  const [editMainImageFile, setEditMainImageFile] = useState<File | null>(null);
  const [editMainImagePreview, setEditMainImagePreview] = useState<string>("");
  const [editImageUploadMethod, setEditImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  const handleMainImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
      setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  const handleMainImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewProduct((prev) => ({ ...prev, imageUrl: url }));
    setMainImageFile(null);
    setMainImagePreview("");
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview("");
    setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Add basic product fields
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === "onSale") {
          formData.append(key, value.toString());
        } else if (key === "salePercentage") {
          if (newProduct.onSale && value) {
            formData.append(key, Number(value).toString());
          }
        } else {
          formData.append(key, value.toString());
        }
      });

      // Always set price to 0 since we use variants for pricing
      formData.append("price", "0");

      // Add main image if a file was selected
      if (mainImageFile) {
        formData.append("mainImage", mainImageFile);
      }

      // Add color variants data
      formData.append("colorVariants", JSON.stringify(colorVariants));

      // Add color variant images
      colorVariants.forEach((variant) => {
        variant.newImages.forEach((file) => {
          formData.append(`colorImages_${variant.color}`, file);
        });
      });

      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      imageUrl: "",
      categoryId: "",
      description: "",
      featured: false,
      onSale: false,
      salePercentage: "",
    });
    setColorVariants([]);
    setMainImageFile(null);
    setMainImagePreview("");
    setSubmitError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const startEditing = (product: Product) => {
    setEditingProduct({
      ...product,
      categoryId: product.category?.id || "",
      onSale: product.onSale || false,
      salePercentage: product.salePercentage || 0,
    });

    // Convert product color variants to ColorVariantData format
    const editVariants: ColorVariantData[] =
      product.colorVariants?.map((cv) => ({
        id: cv.id,
        color: cv.color,
        colorHex: cv.colorHex || undefined,
        stock: cv.stock,
        images:
          cv.images?.map((img) => ({
            id: img.id,
            url: img.url,
            isExisting: true,
          })) || [],
        newImages: [],
        sizeVariants:
          cv.sizeVariants?.map((sv) => ({
            id: sv.id,
            size: sv.size,
            stock: sv.stock,
            price: sv.price || undefined,
          })) || [],
      })) || [];

    setEditColorVariants(editVariants);
    setEditMainImagePreview("");
    setEditMainImageFile(null);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditColorVariants([]);
    setEditMainImageFile(null);
    setEditMainImagePreview("");
  };

  const handleEditMainImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditMainImageFile(file);
      setEditMainImagePreview(URL.createObjectURL(file));
      if (editingProduct) {
        setEditingProduct((prev) => (prev ? { ...prev, imageUrl: "" } : null));
      }
    }
  };

  const handleEditMainImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const url = e.target.value;
    if (editingProduct) {
      setEditingProduct((prev) => (prev ? { ...prev, imageUrl: url } : null));
    }
    setEditMainImageFile(null);
    setEditMainImagePreview("");
  };

  const removeEditMainImage = () => {
    setEditMainImageFile(null);
    setEditMainImagePreview("");
    if (editingProduct) {
      setEditingProduct((prev) => (prev ? { ...prev, imageUrl: "" } : null));
    }
    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  const isFormValid = () => {
    return (
      newProduct.name.trim() !== "" &&
      newProduct.categoryId !== "" &&
      newProduct.description.trim() !== "" &&
      (newProduct.imageUrl || mainImageFile) &&
      colorVariants.length > 0 &&
      colorVariants.some((cv) => cv.sizeVariants && cv.sizeVariants.length > 0)
    );
  };

  const isEditFormValid = () => {
    return (
      editingProduct &&
      editingProduct.name.trim() !== "" &&
      editingProduct.categoryId !== "" &&
      editingProduct.description.trim() !== "" &&
      (editingProduct.imageUrl || editMainImageFile) &&
      editColorVariants.length > 0 &&
      editColorVariants.some(
        (cv) => cv.sizeVariants && cv.sizeVariants.length > 0
      )
    );
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete product");

        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    setIsEditSubmitting(true);

    try {
      const formData = new FormData();

      // Add basic product fields
      formData.append("name", editingProduct.name);
      formData.append("description", editingProduct.description);
      formData.append("categoryId", editingProduct.categoryId || "");
      formData.append("featured", editingProduct.featured.toString());
      formData.append("onSale", (editingProduct.onSale || false).toString());

      // Add sale percentage only if product is on sale
      if (editingProduct.onSale && editingProduct.salePercentage) {
        formData.append(
          "salePercentage",
          editingProduct.salePercentage.toString()
        );
      }

      // Add main image if a new file was selected
      if (editMainImageFile) {
        formData.append("mainImage", editMainImageFile);
      } else if (editingProduct.imageUrl) {
        formData.append("imageUrl", editingProduct.imageUrl);
      }

      // Add color variants data
      formData.append("colorVariants", JSON.stringify(editColorVariants));

      // Add color variant images
      editColorVariants.forEach((variant) => {
        variant.newImages.forEach((file) => {
          formData.append(`colorImages_${variant.color}`, file);
        });
      });

      const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      cancelEditing();
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      // You might want to show this error to the user
    } finally {
      setIsEditSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your luxury bag collection with color variants and size
            options
          </p>
        </div>
        <Link
          href="/admin/reda"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          ← Back to Admin Dashboard
        </Link>
      </div>

      {/* Add New Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        {submitError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Product Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newProduct.categoryId}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      categoryId: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded h-24"
                  required
                />
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newProduct.featured}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, featured: e.target.checked })
                  }
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">
                  Featured
                </span>
              </label>

              {/* Sale Section */}
              <div className="border-t pt-4 space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newProduct.onSale}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, onSale: e.target.checked })
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Put on Sale
                  </span>
                </label>

                {newProduct.onSale && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sale Percentage (%)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={newProduct.salePercentage}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            salePercentage: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                        placeholder="Enter discount percentage (e.g., 25 for 25% off)"
                        required={newProduct.onSale}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter a value between 1-99 (e.g., 25 for 25% off)
                      </p>
                    </div>

                    {newProduct.salePercentage &&
                      Number(newProduct.salePercentage) > 0 &&
                      Number(newProduct.salePercentage) < 100 && (
                        <div className="bg-blue-100 p-3 rounded">
                          <p className="text-sm font-medium text-blue-800 mb-2">
                            Sale Preview - {newProduct.salePercentage}% OFF:
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="text-blue-700">
                              This discount will be applied to all variant
                              prices in this product.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                              <div className="bg-white p-2 rounded">
                                <p className="font-semibold">Example:</p>
                                <p>Original: 100.00 MAD</p>
                                <p className="text-green-600">
                                  Sale:{" "}
                                  {(
                                    100 *
                                    (1 -
                                      Number(newProduct.salePercentage) / 100)
                                  ).toFixed(2)}{" "}
                                  MAD
                                </p>
                              </div>
                              <div className="bg-white p-2 rounded">
                                <p className="font-semibold">
                                  Another example:
                                </p>
                                <p>Original: 250.00 MAD</p>
                                <p className="text-green-600">
                                  Sale:{" "}
                                  {(
                                    250 *
                                    (1 -
                                      Number(newProduct.salePercentage) / 100)
                                  ).toFixed(2)}{" "}
                                  MAD
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* Main Image Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Main Product Image</h3>

              {/* Current Main Image */}
              {newProduct.imageUrl && !mainImagePreview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                  <div className="relative h-40 w-full">
                    <Image
                      src={newProduct.imageUrl || "/placeholder.svg"}
                      alt={newProduct.name}
                      fill
                      className="rounded object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Image Upload Methods */}
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

              {/* File Upload Option */}
              {imageUploadMethod === "file" && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageFileChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  {!mainImagePreview ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Click to upload main image
                      </span>
                    </button>
                  ) : (
                    <div className="relative">
                      <Image
                        src={mainImagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="mx-auto h-32 object-contain"
                      />
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* URL Input Option */}
              {imageUploadMethod === "url" && (
                <div className="space-y-4">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      value={newProduct.imageUrl}
                      onChange={handleMainImageUrlChange}
                      className="flex-1 p-2 border rounded-l"
                    />
                    {newProduct.imageUrl && (
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="bg-red-500 text-white px-3 rounded-r"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Color Variant Manager */}
          <ColorVariantManager
            colorVariants={colorVariants}
            onChange={setColorVariants}
            disabled={isSubmitting}
            basePrice={0}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Current Products</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Colors & Sizes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 flex flex-wrap gap-1">
                          {product.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              Featured
                            </span>
                          )}
                          {product.onSale && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Sale {product.salePercentage}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category?.name || "No category"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {product.colorVariants &&
                      product.colorVariants.length > 0 ? (
                        product.colorVariants.map((cv) => (
                          <div key={cv.id} className="text-xs">
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-medium">
                              {cv.color}
                            </span>
                            {cv.sizeVariants && cv.sizeVariants.length > 0 && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {cv.sizeVariants.map((sv) => (
                                  <span
                                    key={sv.id}
                                    className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-50 text-blue-700"
                                  >
                                    {sv.size.toUpperCase()} ({sv.stock})
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No variants
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.colorVariants?.reduce((total: number, cv) => {
                      // If color variant has size variants, sum their stock
                      const sizeVariantsStock =
                        cv.sizeVariants?.reduce(
                          (sizeTotal: number, sv) =>
                            sizeTotal + (sv.stock || 0),
                          0
                        ) || 0;

                      // If no size variants, use color variant stock, otherwise use size variants total
                      return (
                        total +
                        (sizeVariantsStock > 0
                          ? sizeVariantsStock
                          : cv.stock || 0)
                      );
                    }, 0) || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No products found. Add your first product above!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Edit Product</h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Edit form content would go here - similar structure to add form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={editingProduct.categoryId}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          categoryId: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded h-24"
                      required
                    />
                  </div>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingProduct.featured}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          featured: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured
                    </span>
                  </label>

                  {/* Sale Section for Edit */}
                  <div className="border-t pt-4 space-y-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingProduct.onSale || false}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            onSale: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Put on Sale
                      </span>
                    </label>

                    {editingProduct.onSale && (
                      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sale Percentage (%)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={editingProduct.salePercentage || ""}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                salePercentage: Number(e.target.value),
                              })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter discount percentage (e.g., 25 for 25% off)"
                            required={editingProduct.onSale}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Enter a value between 1-99 (e.g., 25 for 25% off)
                          </p>
                        </div>

                        {editingProduct.salePercentage &&
                          editingProduct.salePercentage > 0 &&
                          editingProduct.salePercentage < 100 && (
                            <div className="bg-blue-100 p-3 rounded">
                              <p className="text-sm font-medium text-blue-800 mb-2">
                                Sale Preview - {editingProduct.salePercentage}%
                                OFF:
                              </p>
                              <div className="space-y-1 text-sm">
                                <p className="text-blue-700">
                                  This discount will be applied to all variant
                                  prices in this product.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
                                  <div className="bg-white p-2 rounded">
                                    <p className="font-semibold">Example:</p>
                                    <p>Original: 100.00 MAD</p>
                                    <p className="text-green-600">
                                      Sale:{" "}
                                      {(
                                        100 *
                                        (1 -
                                          editingProduct.salePercentage / 100)
                                      ).toFixed(2)}{" "}
                                      MAD
                                    </p>
                                  </div>
                                  <div className="bg-white p-2 rounded">
                                    <p className="font-semibold">
                                      Another example:
                                    </p>
                                    <p>Original: 250.00 MAD</p>
                                    <p className="text-green-600">
                                      Sale:{" "}
                                      {(
                                        250 *
                                        (1 -
                                          editingProduct.salePercentage / 100)
                                      ).toFixed(2)}{" "}
                                      MAD
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Image Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Main Image</h3>

                  {/* Current Main Image */}
                  {editingProduct.imageUrl && !editMainImagePreview && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">
                        Current Image:
                      </p>
                      <div className="relative h-40 w-full">
                        <Image
                          src={editingProduct.imageUrl || "/placeholder.svg"}
                          alt={editingProduct.name}
                          fill
                          className="rounded object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Upload Methods */}
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

                  {/* File Upload Option */}
                  {editImageUploadMethod === "file" && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditMainImageFileChange}
                        className="hidden"
                        ref={editFileInputRef}
                      />
                      {!editMainImagePreview ? (
                        <button
                          type="button"
                          onClick={() => editFileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Click to upload a new image
                          </span>
                        </button>
                      ) : (
                        <div className="relative">
                          <Image
                            src={editMainImagePreview || "/placeholder.svg"}
                            alt="Preview"
                            width={200}
                            height={200}
                            className="mx-auto h-32 object-contain"
                          />
                          <button
                            type="button"
                            onClick={removeEditMainImage}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL Input Option */}
                  {editImageUploadMethod === "url" && (
                    <div className="space-y-4">
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Enter image URL"
                          value={editingProduct.imageUrl}
                          onChange={handleEditMainImageUrlChange}
                          className="flex-1 p-2 border rounded-l"
                        />
                        {editingProduct.imageUrl && (
                          <button
                            type="button"
                            onClick={removeEditMainImage}
                            className="bg-red-500 text-white px-3 rounded-r"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Color Variant Manager for Edit */}
              <ColorVariantManager
                colorVariants={editColorVariants}
                onChange={setEditColorVariants}
                disabled={isEditSubmitting}
                basePrice={0}
              />
            </div>

            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelEditing}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateProduct}
                disabled={isEditSubmitting || !isEditFormValid()}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isEditSubmitting ? "Updating..." : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
