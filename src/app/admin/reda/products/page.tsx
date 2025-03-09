// "use client";

// import type React from "react";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// // import { useRouter } from "next/navigation";
// import { Upload, LinkIcon, X, Plus } from "lucide-react";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   color: string;
//   size: string;
//   description: string;
//   featured: boolean;
//   images: { id: string; url: string }[];
// }

// interface Category {
//   id: string;
//   name: string;
// }

// type ImageUploadMethod = "file" | "url";

// export default function ProductsAdmin() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [newProduct, setNewProduct] = useState<
//     Omit<Product, "id" | "category"> & { categoryId: string }
//   >({
//     name: "",
//     price: 0,
//     imageUrl: "",
//     categoryId: "",
//     color: "",
//     size: "",
//     description: "",
//     featured: false,
//     images: [],
//   });
//   const [newImages, setNewImages] = useState<File[]>([]);
//   const [imageUploadMethod, setImageUploadMethod] =
//     useState<ImageUploadMethod>("file");
//   const [mainImageFile, setMainImageFile] = useState<File | null>(null);
//   const [mainImagePreview, setMainImagePreview] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const additionalImagesRef = useRef<HTMLInputElement>(null);
//   // const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("/api/admin/products");
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("/api/admin/categories");
//       if (!response.ok) throw new Error("Failed to fetch categories");
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleMainImageFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setMainImageFile(file);
//       setMainImagePreview(URL.createObjectURL(file));
//       setNewProduct((prev) => ({ ...prev, imageUrl: "" })); // Clear URL when file is selected
//     }
//   };

//   const handleMainImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const url = e.target.value;
//     setNewProduct((prev) => ({ ...prev, imageUrl: url }));
//     setMainImageFile(null);
//     setMainImagePreview("");
//   };

//   const handleAdditionalImageUpload = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       // Limit to 5 additional images
//       const newFilesArray = [...newImages, ...filesArray].slice(0, 5);
//       setNewImages(newFilesArray);
//     }
//   };

//   const removeMainImage = () => {
//     setMainImageFile(null);
//     setMainImagePreview("");
//     setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const removeAdditionalImage = (index: number) => {
//     setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       const formData = new FormData();

//       // Add all product fields to formData
//       Object.entries(newProduct).forEach(([key, value]) => {
//         if (key !== "images") {
//           formData.append(key, value.toString());
//         }
//       });

//       // Add main image if a file was selected
//       if (mainImageFile) {
//         formData.append("mainImage", mainImageFile);
//       }

//       // Add additional images
//       newImages.forEach((image) => {
//         formData.append("additionalImages", image);
//       });

//       const response = await fetch("/api/admin/products", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to add product");
//       }

//       resetForm();
//       fetchProducts();
//     } catch (error) {
//       console.error("Error adding product:", error);
//       setSubmitError(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setNewProduct({
//       name: "",
//       price: 0,
//       imageUrl: "",
//       categoryId: "",
//       color: "",
//       size: "",
//       description: "",
//       featured: false,
//       images: [],
//     });
//     setNewImages([]);
//     setMainImageFile(null);
//     setMainImagePreview("");
//     setSubmitError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     if (additionalImagesRef.current) {
//       additionalImagesRef.current.value = "";
//     }
//   };

//   const handleUpdateProduct = async (
//     id: string,
//     updatedProduct: Partial<Product>
//   ) => {
//     try {
//       const response = await fetch(`/api/admin/products/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedProduct),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update product");
//       }

//       fetchProducts();
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const handleDeleteProduct = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const response = await fetch(`/api/admin/products/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete product");
//       }

//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const isFormValid = () => {
//     return (
//       newProduct.name.trim() !== "" &&
//       newProduct.categoryId !== "" &&
//       (mainImageFile !== null || newProduct.imageUrl.trim() !== "")
//     );
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

//       <form
//         onSubmit={handleAddProduct}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

//         {submitError && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {submitError}
//           </div>
//         )}

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, price: Number(e.target.value) })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           min="0"
//           step="0.01"
//           required
//         />

//         {/* Main Image Upload Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-2">Main Product Image</h3>

//           {/* Toggle between upload methods */}
//           <div className="flex mb-4 border rounded overflow-hidden">
//             <button
//               type="button"
//               onClick={() => setImageUploadMethod("file")}
//               className={`flex-1 py-2 px-4 flex items-center justify-center ${
//                 imageUploadMethod === "file"
//                   ? "bg-gray-200 font-medium"
//                   : "bg-white"
//               }`}
//             >
//               <Upload className="h-4 w-4 mr-2" />
//               Upload File
//             </button>
//             <button
//               type="button"
//               onClick={() => setImageUploadMethod("url")}
//               className={`flex-1 py-2 px-4 flex items-center justify-center ${
//                 imageUploadMethod === "url"
//                   ? "bg-gray-200 font-medium"
//                   : "bg-white"
//               }`}
//             >
//               <LinkIcon className="h-4 w-4 mr-2" />
//               Image URL
//             </button>
//           </div>

//           {/* File upload option */}
//           {imageUploadMethod === "file" && (
//             <div className="space-y-4">
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleMainImageFileChange}
//                   className="hidden"
//                   ref={fileInputRef}
//                 />
//                 {!mainImagePreview ? (
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="inline-flex items-center justify-center w-full"
//                   >
//                     <div className="flex flex-col items-center">
//                       <Upload className="h-10 w-10 text-gray-400 mb-2" />
//                       <span className="text-gray-600">
//                         Click to upload an image
//                       </span>
//                       <span className="text-gray-400 text-sm mt-1">
//                         PNG, JPG, GIF up to 10MB
//                       </span>
//                     </div>
//                   </button>
//                 ) : (
//                   <div className="relative">
//                     <Image
//                       src={mainImagePreview || "/placeholder.svg"}
//                       alt="Product preview"
//                       width={200}
//                       height={200}
//                       className="mx-auto h-40 object-contain"
//                     />
//                     <button
//                       type="button"
//                       onClick={removeMainImage}
//                       className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* URL input option */}
//           {imageUploadMethod === "url" && (
//             <div className="space-y-4">
//               <div className="flex">
//                 <input
//                   type="text"
//                   placeholder="Enter image URL"
//                   value={newProduct.imageUrl}
//                   onChange={handleMainImageUrlChange}
//                   className="flex-1 p-2 border rounded-l"
//                 />
//                 {newProduct.imageUrl && (
//                   <button
//                     type="button"
//                     onClick={removeMainImage}
//                     className="bg-red-500 text-white px-3 rounded-r"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>

//               {newProduct.imageUrl && (
//                 <div className="mt-2">
//                   <Image
//                     src={newProduct.imageUrl || "/placeholder.svg"}
//                     alt="Product preview"
//                     width={200}
//                     height={200}
//                     className="mx-auto h-40 object-contain"
//                     onError={() => {
//                       alert("Invalid image URL. Please enter a valid URL.");
//                       setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <select
//           value={newProduct.categoryId}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, categoryId: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Color"
//           value={newProduct.color}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, color: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Size"
//           value={newProduct.size}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, size: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={newProduct.description}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, description: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <label className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             checked={newProduct.featured}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, featured: e.target.checked })
//             }
//             className="mr-2"
//           />
//           Featured
//         </label>

//         {/* Additional Images Section */}
//         <div className="mb-4">
//           <h3 className="text-lg font-medium mb-2">Additional Images</h3>
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleAdditionalImageUpload}
//               id="additional-images"
//               className="hidden"
//               ref={additionalImagesRef}
//             />
//             <label
//               htmlFor="additional-images"
//               className="cursor-pointer inline-flex items-center justify-center w-full"
//             >
//               <div className="flex flex-col items-center">
//                 <Plus className="h-8 w-8 text-gray-400 mb-2" />
//                 <span className="text-gray-600">Add more images</span>
//                 <span className="text-gray-400 text-sm mt-1">
//                   Up to 5 additional images
//                 </span>
//               </div>
//             </label>
//           </div>
//         </div>

//         {newImages.length > 0 && (
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-2">
//               Additional Images Preview
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {newImages.map((image, index) => (
//                 <div key={index} className="relative">
//                   <Image
//                     src={URL.createObjectURL(image) || "/placeholder.svg"}
//                     alt={`Preview ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="w-full h-24 object-cover rounded"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeAdditionalImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting || !isFormValid()}
//           >
//             {isSubmitting ? "Adding..." : "Add Product"}
//           </button>
//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
//             disabled={isSubmitting}
//           >
//             Reset Form
//           </button>
//         </div>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="p-4 bg-white rounded-lg shadow">
//             <div className="relative h-40 mb-4">
//               <Image
//                 src={product.imageUrl || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="rounded object-contain"
//               />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//             <p className="text-gray-600 mb-2">
//               {/* ${parseFloat(product.price).toFixed(2)} */}
//               {Number(product.price)?.toFixed(2) ?? "0.00"}
//             </p>
//             <p className="text-gray-600 mb-2">
//               {/* Category: {product.category.name} */}
//               Category:{" "}
//               {product.category ? product.category.name : "No Category"}
//             </p>
//             <p className="text-gray-600 mb-2">Color: {product.color}</p>
//             <p className="text-gray-600 mb-2">Size: {product.size}</p>
//             <p className="text-gray-600 mb-4 line-clamp-3">
//               {product.description}
//             </p>
//             {product.images.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="text-md font-medium mb-2">Additional Images</h4>
//                 <div className="grid grid-cols-4 gap-2">
//                   {product.images.map((image) => (
//                     <div key={image.id} className="relative h-12 w-12">
//                       <Image
//                         src={image.url || "/placeholder.svg"}
//                         alt={`${product.name} additional image`}
//                         fill
//                         className="object-cover rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             <div className="flex space-x-2">
//               <button
//                 onClick={() =>
//                   handleUpdateProduct(product.id, {
//                     name: prompt("New name:", product.name) || product.name,
//                   })
//                 }
//                 className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteProduct(product.id)}
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import type React from "react";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { Upload, LinkIcon, X, Plus } from "lucide-react";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   categoryId?: string;
//   color: string;
//   size: string;
//   description: string;
//   featured: boolean;
//   images: { id: string; url: string }[];
// }

// interface Category {
//   id: string;
//   name: string;
// }

// type ImageUploadMethod = "file" | "url";

// export default function ProductsAdmin() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [newProduct, setNewProduct] = useState<
//     Omit<Product, "id" | "category"> & { categoryId: string }
//   >({
//     name: "",
//     price: 0,
//     imageUrl: "",
//     categoryId: "",
//     color: "",
//     size: "",
//     description: "",
//     featured: false,
//     images: [],
//   });
//   const [newImages, setNewImages] = useState<File[]>([]);
//   const [imageUploadMethod, setImageUploadMethod] =
//     useState<ImageUploadMethod>("file");
//   const [mainImageFile, setMainImageFile] = useState<File | null>(null);
//   const [mainImagePreview, setMainImagePreview] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const additionalImagesRef = useRef<HTMLInputElement>(null);

//   // Edit mode states
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [editMainImageFile, setEditMainImageFile] = useState<File | null>(null);
//   const [editMainImagePreview, setEditMainImagePreview] = useState<string>("");
//   const [editImageUploadMethod, setEditImageUploadMethod] =
//     useState<ImageUploadMethod>("file");
//   const [editNewImages, setEditNewImages] = useState<File[]>([]);
//   const [isEditSubmitting, setIsEditSubmitting] = useState(false);
//   const editFileInputRef = useRef<HTMLInputElement>(null);
//   const editAdditionalImagesRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("/api/admin/products");
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("/api/admin/categories");
//       if (!response.ok) throw new Error("Failed to fetch categories");
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleMainImageFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setMainImageFile(file);
//       setMainImagePreview(URL.createObjectURL(file));
//       setNewProduct((prev) => ({ ...prev, imageUrl: "" })); // Clear URL when file is selected
//     }
//   };

//   const handleMainImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const url = e.target.value;
//     setNewProduct((prev) => ({ ...prev, imageUrl: url }));
//     setMainImageFile(null);
//     setMainImagePreview("");
//   };

//   const handleAdditionalImageUpload = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       // Limit to 5 additional images
//       const newFilesArray = [...newImages, ...filesArray].slice(0, 5);
//       setNewImages(newFilesArray);
//     }
//   };

//   const removeMainImage = () => {
//     setMainImageFile(null);
//     setMainImagePreview("");
//     setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const removeAdditionalImage = (index: number) => {
//     setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       const formData = new FormData();

//       // Add all product fields to formData
//       Object.entries(newProduct).forEach(([key, value]) => {
//         if (key !== "images") {
//           formData.append(key, value.toString());
//         }
//       });

//       // Add main image if a file was selected
//       if (mainImageFile) {
//         formData.append("mainImage", mainImageFile);
//       }

//       // Add additional images
//       newImages.forEach((image) => {
//         formData.append("additionalImages", image);
//       });

//       const response = await fetch("/api/admin/products", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to add product");
//       }

//       resetForm();
//       fetchProducts();
//     } catch (error) {
//       console.error("Error adding product:", error);
//       setSubmitError(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetForm = () => {
//     setNewProduct({
//       name: "",
//       price: 0,
//       imageUrl: "",
//       categoryId: "",
//       color: "",
//       size: "",
//       description: "",
//       featured: false,
//       images: [],
//     });
//     setNewImages([]);
//     setMainImageFile(null);
//     setMainImagePreview("");
//     setSubmitError(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     if (additionalImagesRef.current) {
//       additionalImagesRef.current.value = "";
//     }
//   };

//   const handleDeleteProduct = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const response = await fetch(`/api/admin/products/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete product");
//       }

//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   const isFormValid = () => {
//     return (
//       newProduct.name.trim() !== "" &&
//       newProduct.categoryId !== "" &&
//       (mainImageFile !== null || newProduct.imageUrl.trim() !== "")
//     );
//   };

//   // Edit product functions
//   const startEditing = (product: Product) => {
//     setEditingProduct({
//       ...product,
//       categoryId: product.category?.id || "",
//     });
//     setEditMainImagePreview("");
//     setEditMainImageFile(null);
//     setEditNewImages([]);
//     setEditImageUploadMethod("file");
//   };

//   const cancelEditing = () => {
//     setEditingProduct(null);
//     setEditMainImagePreview("");
//     setEditMainImageFile(null);
//     setEditNewImages([]);
//     setSubmitError(null);
//   };

//   const handleEditMainImageFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files && e.target.files[0] && editingProduct) {
//       const file = e.target.files[0];
//       setEditMainImageFile(file);
//       setEditMainImagePreview(URL.createObjectURL(file));
//       setEditingProduct({ ...editingProduct, imageUrl: "" });
//     }
//   };

//   const handleEditMainImageUrlChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const url = e.target.value;
//     if (editingProduct) {
//       setEditingProduct({ ...editingProduct, imageUrl: url });
//       setEditMainImageFile(null);
//       setEditMainImagePreview("");
//     }
//   };

//   const removeEditMainImage = () => {
//     setEditMainImageFile(null);
//     setEditMainImagePreview("");
//     if (editingProduct) {
//       setEditingProduct({ ...editingProduct, imageUrl: "" });
//     }
//     if (editFileInputRef.current) {
//       editFileInputRef.current.value = "";
//     }
//   };

//   const handleEditAdditionalImageUpload = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       // Limit to 5 additional images
//       const newFilesArray = [...editNewImages, ...filesArray].slice(0, 5);
//       setEditNewImages(newFilesArray);
//     }
//   };

//   const removeEditAdditionalImage = (index: number) => {
//     setEditNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const removeExistingImage = (imageId: string) => {
//     if (editingProduct) {
//       setEditingProduct({
//         ...editingProduct,
//         images: editingProduct.images.filter((img) => img.id !== imageId),
//       });
//     }
//   };

//   const handleUpdateProduct = async () => {
//     if (!editingProduct) return;

//     setIsEditSubmitting(true);
//     setSubmitError(null);

//     try {
//       const formData = new FormData();

//       // Add all product fields to formData
//       Object.entries(editingProduct).forEach(([key, value]) => {
//         if (key !== "images" && key !== "category" && value !== undefined) {
//           formData.append(key, value.toString());
//         }
//       });

//       // Add main image if a file was selected
//       if (editMainImageFile) {
//         formData.append("mainImage", editMainImageFile);
//       }

//       // Add additional images
//       editNewImages.forEach((image) => {
//         formData.append("additionalImages", image);
//       });

//       // Add list of images to keep (in case some were removed)
//       const imageIdsToKeep = editingProduct.images.map((img) => img.id);
//       formData.append("imageIdsToKeep", JSON.stringify(imageIdsToKeep));

//       const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to update product");
//       }

//       fetchProducts();
//       cancelEditing();
//     } catch (error) {
//       console.error("Error updating product:", error);
//       setSubmitError(
//         error instanceof Error ? error.message : "An unknown error occurred"
//       );
//     } finally {
//       setIsEditSubmitting(false);
//     }
//   };

//   const isEditFormValid = () => {
//     return (
//       editingProduct &&
//       editingProduct.name.trim() !== "" &&
//       (editingProduct.categoryId !== undefined || editingProduct.category) &&
//       (editMainImageFile !== null || editingProduct.imageUrl.trim() !== "")
//     );
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

//       <form
//         onSubmit={handleAddProduct}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

//         {submitError && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {submitError}
//           </div>
//         )}

//         <input
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, price: Number(e.target.value) })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           min="0"
//           step="0.01"
//           required
//         />

//         {/* Main Image Upload Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-2">Main Product Image</h3>

//           {/* Toggle between upload methods */}
//           <div className="flex mb-4 border rounded overflow-hidden">
//             <button
//               type="button"
//               onClick={() => setImageUploadMethod("file")}
//               className={`flex-1 py-2 px-4 flex items-center justify-center ${
//                 imageUploadMethod === "file"
//                   ? "bg-gray-200 font-medium"
//                   : "bg-white"
//               }`}
//             >
//               <Upload className="h-4 w-4 mr-2" />
//               Upload File
//             </button>
//             <button
//               type="button"
//               onClick={() => setImageUploadMethod("url")}
//               className={`flex-1 py-2 px-4 flex items-center justify-center ${
//                 imageUploadMethod === "url"
//                   ? "bg-gray-200 font-medium"
//                   : "bg-white"
//               }`}
//             >
//               <LinkIcon className="h-4 w-4 mr-2" />
//               Image URL
//             </button>
//           </div>

//           {/* File upload option */}
//           {imageUploadMethod === "file" && (
//             <div className="space-y-4">
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleMainImageFileChange}
//                   className="hidden"
//                   ref={fileInputRef}
//                 />
//                 {!mainImagePreview ? (
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="inline-flex items-center justify-center w-full"
//                   >
//                     <div className="flex flex-col items-center">
//                       <Upload className="h-10 w-10 text-gray-400 mb-2" />
//                       <span className="text-gray-600">
//                         Click to upload an image
//                       </span>
//                       <span className="text-gray-400 text-sm mt-1">
//                         PNG, JPG, GIF up to 10MB
//                       </span>
//                     </div>
//                   </button>
//                 ) : (
//                   <div className="relative">
//                     <Image
//                       src={mainImagePreview || "/placeholder.svg"}
//                       alt="Product preview"
//                       width={200}
//                       height={200}
//                       className="mx-auto h-40 object-contain"
//                     />
//                     <button
//                       type="button"
//                       onClick={removeMainImage}
//                       className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* URL input option */}
//           {imageUploadMethod === "url" && (
//             <div className="space-y-4">
//               <div className="flex">
//                 <input
//                   type="text"
//                   placeholder="Enter image URL"
//                   value={newProduct.imageUrl}
//                   onChange={handleMainImageUrlChange}
//                   className="flex-1 p-2 border rounded-l"
//                 />
//                 {newProduct.imageUrl && (
//                   <button
//                     type="button"
//                     onClick={removeMainImage}
//                     className="bg-red-500 text-white px-3 rounded-r"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>

//               {newProduct.imageUrl && (
//                 <div className="mt-2">
//                   <Image
//                     src={newProduct.imageUrl || "/placeholder.svg"}
//                     alt="Product preview"
//                     width={200}
//                     height={200}
//                     className="mx-auto h-40 object-contain"
//                     onError={() => {
//                       alert("Invalid image URL. Please enter a valid URL.");
//                       setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <select
//           value={newProduct.categoryId}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, categoryId: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Color"
//           value={newProduct.color}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, color: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Size"
//           value={newProduct.size}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, size: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={newProduct.description}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, description: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <label className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             checked={newProduct.featured}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, featured: e.target.checked })
//             }
//             className="mr-2"
//           />
//           Featured
//         </label>

//         {/* Additional Images Section */}
//         <div className="mb-4">
//           <h3 className="text-lg font-medium mb-2">Additional Images</h3>
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleAdditionalImageUpload}
//               id="additional-images"
//               className="hidden"
//               ref={additionalImagesRef}
//             />
//             <label
//               htmlFor="additional-images"
//               className="cursor-pointer inline-flex items-center justify-center w-full"
//             >
//               <div className="flex flex-col items-center">
//                 <Plus className="h-8 w-8 text-gray-400 mb-2" />
//                 <span className="text-gray-600">Add more images</span>
//                 <span className="text-gray-400 text-sm mt-1">
//                   Up to 5 additional images
//                 </span>
//               </div>
//             </label>
//           </div>
//         </div>

//         {newImages.length > 0 && (
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-2">
//               Additional Images Preview
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {newImages.map((image, index) => (
//                 <div key={index} className="relative">
//                   <Image
//                     src={URL.createObjectURL(image) || "/placeholder.svg"}
//                     alt={`Preview ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="w-full h-24 object-cover rounded"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeAdditionalImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting || !isFormValid()}
//           >
//             {isSubmitting ? "Adding..." : "Add Product"}
//           </button>
//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
//             disabled={isSubmitting}
//           >
//             Reset Form
//           </button>
//         </div>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="p-4 bg-white rounded-lg shadow">
//             <div className="relative h-40 mb-4">
//               <Image
//                 src={product.imageUrl || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="rounded object-contain"
//               />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//             <p className="text-gray-600 mb-2">
//               ${Number(product.price)?.toFixed(2) ?? "0.00"}
//             </p>
//             <p className="text-gray-600 mb-2">
//               Category: {product.category?.name || "No Category"}
//             </p>
//             <p className="text-gray-600 mb-2">Color: {product.color}</p>
//             <p className="text-gray-600 mb-2">Size: {product.size}</p>
//             <p className="text-gray-600 mb-4 line-clamp-3">
//               {product.description}
//             </p>
//             {product.images.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="text-md font-medium mb-2">Additional Images</h4>
//                 <div className="grid grid-cols-4 gap-2">
//                   {product.images.map((image) => (
//                     <div key={image.id} className="relative h-12 w-12">
//                       <Image
//                         src={image.url || "/placeholder.svg"}
//                         alt={`${product.name} additional image`}
//                         fill
//                         className="object-cover rounded"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => startEditing(product)}
//                 className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDeleteProduct(product.id)}
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Product Modal */}
//       {editingProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//           <div className="bg-white rounded-lg p-6 w-full max-w-4xl my-8 mx-4">
//             <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

//             {submitError && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {submitError}
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Product Name"
//                   value={editingProduct.name}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       name: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 mb-4 border rounded"
//                   required
//                 />

//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Price"
//                   value={editingProduct.price}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       price: Number(e.target.value),
//                     })
//                   }
//                   className="w-full p-2 mb-4 border rounded"
//                   min="0"
//                   step="0.01"
//                   required
//                 />

//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category
//                 </label>
//                 <select
//                   value={
//                     editingProduct.categoryId ||
//                     editingProduct.category?.id ||
//                     ""
//                   }
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       categoryId: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 mb-4 border rounded"
//                 >
//                   <option value="">No Category</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>

//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Color
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Color"
//                   value={editingProduct.color}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       color: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 mb-4 border rounded"
//                   required
//                 />

//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Size
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Size"
//                   value={editingProduct.size}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       size: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 mb-4 border rounded"
//                   required
//                 />

//                 <label className="flex items-center mb-4">
//                   <input
//                     type="checkbox"
//                     checked={editingProduct.featured}
//                     onChange={(e) =>
//                       setEditingProduct({
//                         ...editingProduct,
//                         featured: e.target.checked,
//                       })
//                     }
//                     className="mr-2"
//                   />
//                   Featured
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   placeholder="Description"
//                   value={editingProduct.description}
//                   onChange={(e) =>
//                     setEditingProduct({
//                       ...editingProduct,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 mb-4 border rounded h-32"
//                   required
//                 />

//                 {/* Main Image Section */}
//                 <div className="mb-4">
//                   <h3 className="text-lg font-medium mb-2">Main Image</h3>

//                   {/* Current Main Image */}
//                   {editingProduct.imageUrl && !editMainImagePreview && (
//                     <div className="mb-2">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Current Image:
//                       </p>
//                       <div className="relative h-40 w-full">
//                         <Image
//                           src={editingProduct.imageUrl || "/placeholder.svg"}
//                           alt={editingProduct.name}
//                           fill
//                           className="rounded object-contain"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Toggle between upload methods */}
//                   <div className="flex mb-4 border rounded overflow-hidden">
//                     <button
//                       type="button"
//                       onClick={() => setEditImageUploadMethod("file")}
//                       className={`flex-1 py-2 px-4 flex items-center justify-center ${
//                         editImageUploadMethod === "file"
//                           ? "bg-gray-200 font-medium"
//                           : "bg-white"
//                       }`}
//                     >
//                       <Upload className="h-4 w-4 mr-2" />
//                       Upload File
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setEditImageUploadMethod("url")}
//                       className={`flex-1 py-2 px-4 flex items-center justify-center ${
//                         editImageUploadMethod === "url"
//                           ? "bg-gray-200 font-medium"
//                           : "bg-white"
//                       }`}
//                     >
//                       <LinkIcon className="h-4 w-4 mr-2" />
//                       Image URL
//                     </button>
//                   </div>

//                   {/* File upload option */}
//                   {editImageUploadMethod === "file" && (
//                     <div className="space-y-4">
//                       <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleEditMainImageFileChange}
//                           className="hidden"
//                           ref={editFileInputRef}
//                         />
//                         {!editMainImagePreview ? (
//                           <button
//                             type="button"
//                             onClick={() => editFileInputRef.current?.click()}
//                             className="inline-flex items-center justify-center w-full"
//                           >
//                             <div className="flex flex-col items-center">
//                               <Upload className="h-10 w-10 text-gray-400 mb-2" />
//                               <span className="text-gray-600">
//                                 Click to upload a new image
//                               </span>
//                               <span className="text-gray-400 text-sm mt-1">
//                                 PNG, JPG, GIF up to 10MB
//                               </span>
//                             </div>
//                           </button>
//                         ) : (
//                           <div className="relative">
//                             <Image
//                               src={editMainImagePreview || "/placeholder.svg"}
//                               alt="Product preview"
//                               width={200}
//                               height={200}
//                               className="mx-auto h-40 object-contain"
//                             />
//                             <button
//                               type="button"
//                               onClick={removeEditMainImage}
//                               className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                             >
//                               <X className="h-4 w-4" />
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* URL input option */}
//                   {editImageUploadMethod === "url" && (
//                     <div className="space-y-4">
//                       <div className="flex">
//                         <input
//                           type="text"
//                           placeholder="Enter image URL"
//                           value={editingProduct.imageUrl}
//                           onChange={handleEditMainImageUrlChange}
//                           className="flex-1 p-2 border rounded-l"
//                         />
//                         {editingProduct.imageUrl && (
//                           <button
//                             type="button"
//                             onClick={removeEditMainImage}
//                             className="bg-red-500 text-white px-3 rounded-r"
//                           >
//                             <X className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>

//                       {editingProduct.imageUrl && (
//                         <div className="mt-2">
//                           <Image
//                             src={editingProduct.imageUrl || "/placeholder.svg"}
//                             alt="Product preview"
//                             width={200}
//                             height={200}
//                             className="mx-auto h-40 object-contain"
//                             onError={() => {
//                               alert(
//                                 "Invalid image URL. Please enter a valid URL."
//                               );
//                               setEditingProduct((prev) => ({
//                                 ...prev,
//                                 imageUrl: "",
//                               }));
//                             }}
//                           />
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Additional Images Section */}
//                 <div className="mb-4">
//                   <h3 className="text-lg font-medium mb-2">
//                     Additional Images
//                   </h3>

//                   {/* Existing Additional Images */}
//                   {editingProduct.images.length > 0 && (
//                     <div className="mb-4">
//                       <p className="text-sm text-gray-500 mb-1">
//                         Current Additional Images:
//                       </p>
//                       <div className="grid grid-cols-3 gap-2">
//                         {editingProduct.images.map((image) => (
//                           <div key={image.id} className="relative">
//                             <Image
//                               src={image.url || "/placeholder.svg"}
//                               alt={`Additional image`}
//                               width={100}
//                               height={100}
//                               className="w-full h-24 object-cover rounded"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeExistingImage(image.id)}
//                               className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                             >
//                               <X className="h-4 w-4" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Upload new additional images */}
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       multiple
//                       onChange={handleEditAdditionalImageUpload}
//                       id="edit-additional-images"
//                       className="hidden"
//                       ref={editAdditionalImagesRef}
//                     />
//                     <label
//                       htmlFor="edit-additional-images"
//                       className="cursor-pointer inline-flex items-center justify-center w-full"
//                     >
//                       <div className="flex flex-col items-center">
//                         <Plus className="h-8 w-8 text-gray-400 mb-2" />
//                         <span className="text-gray-600">Add more images</span>
//                         <span className="text-gray-400 text-sm mt-1">
//                           Up to 5 additional images
//                         </span>
//                       </div>
//                     </label>
//                   </div>
//                 </div>

//                 {/* New Additional Images Preview */}
//                 {editNewImages.length > 0 && (
//                   <div className="mb-6">
//                     <h3 className="text-lg font-medium mb-2">
//                       New Additional Images Preview
//                     </h3>
//                     <div className="grid grid-cols-3 gap-2">
//                       {editNewImages.map((image, index) => (
//                         <div key={index} className="relative">
//                           <Image
//                             src={
//                               URL.createObjectURL(image) || "/placeholder.svg"
//                             }
//                             alt={`Preview ${index + 1}`}
//                             width={100}
//                             height={100}
//                             className="w-full h-24 object-cover rounded"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeEditAdditionalImage(index)}
//                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
//                           >
//                             <X className="h-4 w-4" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end space-x-4 mt-6">
//               <button
//                 type="button"
//                 onClick={cancelEditing}
//                 className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleUpdateProduct}
//                 className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
//                   isEditSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 disabled={isEditSubmitting || !isEditFormValid()}
//               >
//                 {isEditSubmitting ? "Updating..." : "Update Product"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, LinkIcon, X, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
  categoryId?: string;
  color: string;
  size: string;
  description: string;
  featured: boolean;
  images: { id: string; url: string }[];
}

interface Category {
  id: string;
  name: string;
}

type ImageUploadMethod = "file" | "url";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<
    Omit<Product, "id" | "category"> & { categoryId: string }
  >({
    name: "",
    price: 0,
    imageUrl: "",
    categoryId: "",
    color: "",
    size: "",
    description: "",
    featured: false,
    images: [],
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imageUploadMethod, setImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesRef = useRef<HTMLInputElement>(null);

  // Edit mode states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editMainImageFile, setEditMainImageFile] = useState<File | null>(null);
  const [editMainImagePreview, setEditMainImagePreview] = useState<string>("");
  const [editImageUploadMethod, setEditImageUploadMethod] =
    useState<ImageUploadMethod>("file");
  const [editNewImages, setEditNewImages] = useState<File[]>([]);
  const [isEditSubmitting, setIsEditSubmitting] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const editAdditionalImagesRef = useRef<HTMLInputElement>(null);

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
      setNewProduct((prev) => ({ ...prev, imageUrl: "" })); // Clear URL when file is selected
    }
  };

  const handleMainImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewProduct((prev) => ({ ...prev, imageUrl: url }));
    setMainImageFile(null);
    setMainImagePreview("");
  };

  const handleAdditionalImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      // Limit to 5 additional images
      const newFilesArray = [...newImages, ...filesArray].slice(0, 5);
      setNewImages(newFilesArray);
    }
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview("");
    setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAdditionalImage = (index: number) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Add all product fields to formData
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, value.toString());
        }
      });

      // Add main image if a file was selected
      if (mainImageFile) {
        formData.append("mainImage", mainImageFile);
      }

      // Add additional images
      newImages.forEach((image) => {
        formData.append("additionalImages", image);
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
      price: 0,
      imageUrl: "",
      categoryId: "",
      color: "",
      size: "",
      description: "",
      featured: false,
      images: [],
    });
    setNewImages([]);
    setMainImageFile(null);
    setMainImagePreview("");
    setSubmitError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (additionalImagesRef.current) {
      additionalImagesRef.current.value = "";
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const isFormValid = () => {
    return (
      newProduct.name.trim() !== "" &&
      newProduct.categoryId !== "" &&
      (mainImageFile !== null || newProduct.imageUrl.trim() !== "")
    );
  };

  // Edit product functions
  const startEditing = (product: Product) => {
    setEditingProduct({
      ...product,
      categoryId: product.category?.id || "",
    });
    setEditMainImagePreview("");
    setEditMainImageFile(null);
    setEditNewImages([]);
    setEditImageUploadMethod("file");
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditMainImagePreview("");
    setEditMainImageFile(null);
    setEditNewImages([]);
    setSubmitError(null);
  };

  const handleEditMainImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0] && editingProduct) {
      const file = e.target.files[0];
      setEditMainImageFile(file);
      setEditMainImagePreview(URL.createObjectURL(file));
      setEditingProduct({ ...editingProduct, imageUrl: "" });
    }
  };

  const handleEditMainImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const url = e.target.value;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, imageUrl: url });
      setEditMainImageFile(null);
      setEditMainImagePreview("");
    }
  };

  const removeEditMainImage = () => {
    setEditMainImageFile(null);
    setEditMainImagePreview("");
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, imageUrl: "" });
    }
    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

  const handleEditAdditionalImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      // Limit to 5 additional images
      const newFilesArray = [...editNewImages, ...filesArray].slice(0, 5);
      setEditNewImages(newFilesArray);
    }
  };

  const removeEditAdditionalImage = (index: number) => {
    setEditNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId: string) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        images: editingProduct.images.filter((img) => img.id !== imageId),
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    setIsEditSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Add all product fields to formData
      Object.entries(editingProduct).forEach(([key, value]) => {
        if (key !== "images" && key !== "category" && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Add main image if a file was selected
      if (editMainImageFile) {
        formData.append("mainImage", editMainImageFile);
      }

      // Add additional images
      editNewImages.forEach((image) => {
        formData.append("additionalImages", image);
      });

      // Add list of images to keep (in case some were removed)
      const imageIdsToKeep = editingProduct.images.map((img) => img.id);
      formData.append("imageIdsToKeep", JSON.stringify(imageIdsToKeep));

      const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      fetchProducts();
      cancelEditing();
    } catch (error) {
      console.error("Error updating product:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsEditSubmitting(false);
    }
  };

  const isEditFormValid = () => {
    return (
      editingProduct &&
      editingProduct.name.trim() !== "" &&
      (editingProduct.categoryId !== undefined || editingProduct.category) &&
      (editMainImageFile !== null || editingProduct.imageUrl.trim() !== "")
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

      <form
        onSubmit={handleAddProduct}
        className="mb-8 p-4 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        {submitError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {submitError}
          </div>
        )}

        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
          className="w-full p-2 mb-4 border rounded"
          min="0"
          step="0.01"
          required
        />

        {/* Main Image Upload Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Main Product Image</h3>

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
                  onChange={handleMainImageFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {!mainImagePreview ? (
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
                      src={mainImagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      width={200}
                      height={200}
                      className="mx-auto h-40 object-contain"
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
            </div>
          )}

          {/* URL input option */}
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

              {newProduct.imageUrl && (
                <div className="mt-2">
                  <Image
                    src={newProduct.imageUrl || "/placeholder.svg"}
                    alt="Product preview"
                    width={200}
                    height={200}
                    className="mx-auto h-40 object-contain"
                    onError={() => {
                      alert("Invalid image URL. Please enter a valid URL.");
                      setNewProduct((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <select
          value={newProduct.categoryId}
          onChange={(e) =>
            setNewProduct({ ...newProduct, categoryId: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Color"
          value={newProduct.color}
          onChange={(e) =>
            setNewProduct({ ...newProduct, color: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Size"
          value={newProduct.size}
          onChange={(e) =>
            setNewProduct({ ...newProduct, size: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={newProduct.featured}
            onChange={(e) =>
              setNewProduct({ ...newProduct, featured: e.target.checked })
            }
            className="mr-2"
          />
          Featured
        </label>

        {/* Additional Images Section */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Additional Images</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImageUpload}
              id="additional-images"
              className="hidden"
              ref={additionalImagesRef}
            />
            <label
              htmlFor="additional-images"
              className="cursor-pointer inline-flex items-center justify-center w-full"
            >
              <div className="flex flex-col items-center">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-gray-600">Add more images</span>
                <span className="text-gray-400 text-sm mt-1">
                  Up to 5 additional images
                </span>
              </div>
            </label>
          </div>
        </div>

        {newImages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              Additional Images Preview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {newImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? "Adding..." : "Add Product"}
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
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white rounded-lg shadow">
            <div className="relative h-40 mb-4">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                fill
                className="rounded object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">
              ${Number(product.price)?.toFixed(2) ?? "0.00"}
            </p>
            <p className="text-gray-600 mb-2">
              Category: {product.category?.name || "No Category"}
            </p>
            <p className="text-gray-600 mb-2">Color: {product.color}</p>
            <p className="text-gray-600 mb-2">Size: {product.size}</p>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {product.description}
            </p>
            {product.images.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-medium mb-2">Additional Images</h4>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image) => (
                    <div key={image.id} className="relative h-12 w-12">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`${product.name} additional image`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => startEditing(product)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Product</h2>
              <button
                onClick={cancelEditing}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitError && (
              <div className="m-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {submitError}
              </div>
            )}

            <div className="overflow-y-auto p-4 max-h-[calc(90vh-8rem)]">
              <div className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full p-2 border rounded"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={
                          editingProduct.categoryId ||
                          editingProduct.category?.id ||
                          ""
                        }
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            categoryId: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      >
                        <option value="">No Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <input
                        type="text"
                        value={editingProduct.color}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            color: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Size
                      </label>
                      <input
                        type="text"
                        value={editingProduct.size}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            size: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
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

                {/* Additional Images Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Images</h3>

                  {/* Existing Additional Images */}
                  {editingProduct.images.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        Current Additional Images:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {editingProduct.images.map((image) => (
                          <div key={image.id} className="relative">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt="Additional image"
                              width={100}
                              height={100}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(image.id)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload New Additional Images */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleEditAdditionalImageUpload}
                      className="hidden"
                      ref={editAdditionalImagesRef}
                    />
                    <button
                      type="button"
                      onClick={() => editAdditionalImagesRef.current?.click()}
                      className="w-full"
                    >
                      <Plus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Add more images
                      </span>
                      <span className="block text-xs text-gray-400">
                        Up to 5 additional images
                      </span>
                    </button>
                  </div>

                  {/* New Additional Images Preview */}
                  {editNewImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        New Images Preview:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {editNewImages.map((image, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={
                                URL.createObjectURL(image) || "/placeholder.svg"
                              }
                              alt={`Preview ${index + 1}`}
                              width={100}
                              height={100}
                              className="w-full h-24 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeEditAdditionalImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
