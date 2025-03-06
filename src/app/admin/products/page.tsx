// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface Product {
//   id: string;
//   name: string;
//   price: string;
//   imageUrl: string;
//   category: {
//     id: string;
//     name: string;
//   };
//   color: string;
//   size: string;
//   description: string;
//   featured: boolean;
// }

// interface Category {
//   id: string;
//   name: string;
// }

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
//   });
//   const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await fetch("/api/admin/products");
//     const data = await response.json();
//     console.log("fetchProducts : ", data);
//     setProducts(data);
//   };

//   const fetchCategories = async () => {
//     const response = await fetch("/api/admin/categories");
//     const data = await response.json();
//     setCategories(data);
//   };

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await fetch("/api/admin/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newProduct),
//     });
//     setNewProduct({
//       name: "",
//       price: 0,
//       imageUrl: "",
//       categoryId: "",
//       color: "",
//       size: "",
//       description: "",
//       featured: false,
//     });
//     fetchProducts();
//   };

//   const handleUpdateProduct = async (
//     id: string,
//     updatedProduct: Partial<Product>
//   ) => {
//     await fetch(`/api/admin/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedProduct),
//     });
//     fetchProducts();
//   };

//   const handleDeleteProduct = async (id: string) => {
//     await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

//       <form
//         onSubmit={handleAddProduct}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({
//               ...newProduct,
//               price: Number.parseFloat(e.target.value),
//             })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newProduct.imageUrl}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, imageUrl: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <select
//           value={newProduct.categoryId}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, categoryId: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//         />
//         <input
//           type="text"
//           placeholder="Size"
//           value={newProduct.size}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, size: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={newProduct.description}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, description: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Product
//         </button>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.length > 0 &&
//           products.map((product) => (
//             <div key={product.id} className="p-4 bg-white rounded-lg shadow">
//               <img
//                 src={product.imageUrl || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-40 object-cover mb-4 rounded"
//               />
//               <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//               <p className="text-gray-600 mb-2">
//                 ${parseFloat(product.price).toFixed(2)}
//               </p>
//               {/* <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p> */}
//               <p className="text-gray-600 mb-2">
//                 Category: {product.category.name}
//               </p>
//               <p className="text-gray-600 mb-2">Color: {product.color}</p>
//               <p className="text-gray-600 mb-2">Size: {product.size}</p>
//               <p className="text-gray-600 mb-4">{product.description}</p>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() =>
//                     handleUpdateProduct(product.id, {
//                       name: prompt("New name:", product.name) || product.name,
//                     })
//                   }
//                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteProduct(product.id)}
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

// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

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
//   const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await fetch("/api/admin/products");
//     const data = await response.json();
//     setProducts(data);
//   };

//   const fetchCategories = async () => {
//     const response = await fetch("/api/admin/categories");
//     const data = await response.json();
//     setCategories(data);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setNewImages((prevImages) => [
//         ...prevImages,
//         ...Array.from(e.target.files as FileList),
//       ]);
//     }
//   };

//   const removeImage = (index: number) => {
//     setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();

//     Object.entries(newProduct).forEach(([key, value]) => {
//       formData.append(key, value.toString());
//     });

//     newImages.forEach((image) => {
//       formData.append("images", image);
//     });

//     try {
//       const response = await fetch("/api/admin/products", {
//         method: "POST",
//         body: formData,
//       });

//       console.log("images products : ", response);

//       if (response.ok) {
//         setNewProduct({
//           name: "",
//           price: 0,
//           imageUrl: "",
//           categoryId: "",
//           color: "",
//           size: "",
//           description: "",
//           featured: false,
//           images: [],
//         });
//         setNewImages([]);
//         fetchProducts();
//       } else {
//         console.error("Failed to add product");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleUpdateProduct = async (
//     id: string,
//     updatedProduct: Partial<Product>
//   ) => {
//     await fetch(`/api/admin/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedProduct),
//     });
//     fetchProducts();
//   };

//   const handleDeleteProduct = async (id: string) => {
//     await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

//       <form
//         onSubmit={handleAddProduct}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, price: Number(e.target.value) })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Main Image URL"
//           value={newProduct.imageUrl}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, imageUrl: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <select
//           value={newProduct.categoryId}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, categoryId: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//         />
//         <input
//           type="text"
//           placeholder="Size"
//           value={newProduct.size}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, size: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={newProduct.description}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, description: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//         <div className="mb-4">
//           <label className="block mb-2">Additional Images</label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         {newImages.length > 0 && (
//           <div className="mb-4">
//             <h3 className="text-lg font-medium mb-2">Preview Images</h3>
//             <div className="grid grid-cols-4 gap-4">
//               {newImages.map((image, index) => (
//                 <div key={index} className="relative">
//                   <Image
//                     src={URL.createObjectURL(image) || "/placeholder.svg"}
//                     alt={`Preview ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="object-cover rounded"
//                   />
//                   <button
//                     onClick={() => removeImage(index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Product
//         </button>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="p-4 bg-white rounded-lg shadow">
//             <Image
//               src={product.imageUrl || "/placeholder.svg"}
//               alt={product.name}
//               width={200}
//               height={200}
//               className="w-full h-40 object-cover mb-4 rounded"
//             />
//             <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//             <p className="text-gray-600 mb-2">
//               ${parseFloat(product.price).toFixed(2)}
//             </p>
//             <p className="text-gray-600 mb-2">
//               Category: {product.category.name}
//             </p>
//             <p className="text-gray-600 mb-2">Color: {product.color}</p>
//             <p className="text-gray-600 mb-2">Size: {product.size}</p>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             {product.images.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="text-md font-medium mb-2">Additional Images</h4>
//                 <div className="grid grid-cols-4 gap-2">
//                   {product.images.map((image) => (
//                     <Image
//                       key={image.id}
//                       src={image.url || "/placeholder.svg"}
//                       alt={`${product.name} additional image`}
//                       width={50}
//                       height={50}
//                       className="object-cover rounded"
//                     />
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

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

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
//   const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await fetch("/api/admin/products");
//     const data = await response.json();
//     setProducts(data);
//   };

//   const fetchCategories = async () => {
//     const response = await fetch("/api/admin/categories");
//     const data = await response.json();
//     setCategories(data);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setNewImages((prevImages) => [
//         ...prevImages,
//         ...Array.from(e.target.files as FileList),
//       ]);
//     }
//   };

//   const removeImage = (index: number) => {
//     setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();

//     Object.entries(newProduct).forEach(([key, value]) => {
//       if (key !== "images") {
//         formData.append(key, value.toString());
//       }
//     });

//     newImages.forEach((image) => {
//       formData.append("images", image);
//     });

//     try {
//       const response = await fetch("/api/admin/products", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const addedProduct = await response.json();
//         setProducts([...products, addedProduct]);
//         setNewProduct({
//           name: "",
//           price: 0,
//           imageUrl: "",
//           categoryId: "",
//           color: "",
//           size: "",
//           description: "",
//           featured: false,
//           images: [],
//         });
//         setNewImages([]);
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to add product:", errorData.error);
//         // You might want to show this error to the user in the UI
//       }
//     } catch (error) {
//       console.error(
//         "Error adding product:",
//         error instanceof Error ? error.message : "Unknown error"
//       );
//       // You might want to show this error to the user in the UI
//     }
//   };

//   const handleUpdateProduct = async (
//     id: string,
//     updatedProduct: Partial<Product>
//   ) => {
//     await fetch(`/api/admin/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedProduct),
//     });
//     fetchProducts();
//   };

//   const handleDeleteProduct = async (id: string) => {
//     await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

//       <form
//         onSubmit={handleAddProduct}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, price: Number(e.target.value) })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Main Image URL"
//           value={newProduct.imageUrl}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, imageUrl: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <select
//           value={newProduct.categoryId}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, categoryId: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//         />
//         <input
//           type="text"
//           placeholder="Size"
//           value={newProduct.size}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, size: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={newProduct.description}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, description: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//         <div className="mb-4">
//           <label className="block mb-2">Additional Images</label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         {newImages.length > 0 && (
//           <div className="mb-4">
//             <h3 className="text-lg font-medium mb-2">Preview Images</h3>
//             <div className="grid grid-cols-4 gap-4">
//               {newImages.map((image, index) => (
//                 <div key={index} className="relative">
//                   <Image
//                     src={URL.createObjectURL(image) || "/placeholder.svg"}
//                     alt={`Preview ${index + 1}`}
//                     width={100}
//                     height={100}
//                     className="object-cover rounded"
//                   />
//                   <button
//                     onClick={() => removeImage(index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Product
//         </button>
//       </form>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="p-4 bg-white rounded-lg shadow">
//             <Image
//               src={product.imageUrl || "/placeholder.svg"}
//               alt={product.name}
//               width={200}
//               height={200}
//               className="w-full h-40 object-cover mb-4 rounded"
//             />
//             <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//             <p className="text-gray-600 mb-2">
//               ${parseFloat(product.price).toFixed(2)}
//             </p>
//             <p className="text-gray-600 mb-2">
//               Category: {product.category.name}
//             </p>
//             <p className="text-gray-600 mb-2">Color: {product.color}</p>
//             <p className="text-gray-600 mb-2">Size: {product.size}</p>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             {product.images.length > 0 && (
//               <div className="mb-4">
//                 <h4 className="text-md font-medium mb-2">Additional Images</h4>
//                 <div className="grid grid-cols-4 gap-2">
//                   {product.images.map((image) => (
//                     <Image
//                       key={image.id}
//                       src={image.url || "/placeholder.svg"}
//                       alt={`${product.name} additional image`}
//                       width={50}
//                       height={50}
//                       className="object-cover rounded"
//                     />
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
// import { useRouter } from "next/navigation";
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
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await fetch("/api/admin/products");
//     const data = await response.json();
//     setProducts(data);
//   };

//   const fetchCategories = async () => {
//     const response = await fetch("/api/admin/categories");
//     const data = await response.json();
//     setCategories(data);
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
//       setNewImages((prevImages) => [
//         ...prevImages,
//         ...Array.from(e.target.files as FileList),
//       ]);
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
//     const formData = new FormData();

//     // Add all product fields to formData
//     Object.entries(newProduct).forEach(([key, value]) => {
//       if (key !== "images") {
//         formData.append(key, value.toString());
//       }
//     });

//     // Add main image if a file was selected
//     if (mainImageFile) {
//       formData.append("mainImage", mainImageFile);
//     }

//     // Add additional images
//     newImages.forEach((image) => {
//       formData.append("additionalImages", image);
//     });

//     try {
//       const response = await fetch("/api/admin/products", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         resetForm();
//         fetchProducts();
//       } else {
//         console.error("Failed to add product");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
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
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleUpdateProduct = async (
//     id: string,
//     updatedProduct: Partial<Product>
//   ) => {
//     await fetch(`/api/admin/products/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedProduct),
//     });
//     fetchProducts();
//   };

//   const handleDeleteProduct = async (id: string) => {
//     await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

//       <form
//         onSubmit={handleAddProduct}
//         className="mb-8 p-4 bg-white rounded-lg shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, name: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, price: Number(e.target.value) })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//         />
//         <input
//           type="text"
//           placeholder="Size"
//           value={newProduct.size}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, size: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={newProduct.description}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, description: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
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
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             disabled={
//               (!mainImageFile && !newProduct.imageUrl) ||
//               !newProduct.name ||
//               !newProduct.categoryId
//             }
//           >
//             Add Product
//           </button>
//           <button
//             type="button"
//             onClick={resetForm}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
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
//               ${parseFloat(product.price).toFixed(2)}
//             </p>
//             <p className="text-gray-600 mb-2">
//               Category: {product.category.name}
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

"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const handleUpdateProduct = async (
    id: string,
    updatedProduct: Partial<Product>
  ) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
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
              ${parseFloat(product.price).toFixed(2)}
            </p>
            <p className="text-gray-600 mb-2">
              Category: {product.category.name}
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
                onClick={() =>
                  handleUpdateProduct(product.id, {
                    name: prompt("New name:", product.name) || product.name,
                  })
                }
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
    </div>
  );
}
