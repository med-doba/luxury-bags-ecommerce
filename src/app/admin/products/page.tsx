// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   category: string;
//   color: string;
//   size: string;
//   description: string;
// }

// export default function ProductsAdmin() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
//     name: "",
//     price: 0,
//     imageUrl: "",
//     category: "",
//     color: "",
//     size: "",
//     description: "",
//   });
//   const router = useRouter();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const response = await fetch("/api/admin/products");
//     const data = await response.json();
//     setProducts(data);
//   };

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("newProduct : ", newProduct);
//     await fetch("/api/admin/products", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newProduct),
//     });

//     setNewProduct({
//       name: "",
//       price: 0,
//       imageUrl: "",
//       category: "",
//       color: "",
//       size: "",
//       description: "",
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
//         <input
//           type="text"
//           placeholder="Category"
//           value={newProduct.category}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, category: e.target.value })
//           }
//           className="w-full p-2 mb-4 border rounded"
//         />
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
//               <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
//               <p className="text-gray-600 mb-2">Category: {product.category}</p>
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

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: {
    id: string;
    name: string;
  };
  color: string;
  size: string;
  description: string;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
}

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
  });
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/admin/products");
    const data = await response.json();
    console.log("fetchProducts : ", data);
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch("/api/admin/categories");
    const data = await response.json();
    setCategories(data);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({
      name: "",
      price: 0,
      imageUrl: "",
      categoryId: "",
      color: "",
      size: "",
      description: "",
      featured: false,
    });
    fetchProducts();
  };

  const handleUpdateProduct = async (
    id: string,
    updatedProduct: Partial<Product>
  ) => {
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

      <form
        onSubmit={handleAddProduct}
        className="mb-8 p-4 bg-white rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: Number.parseFloat(e.target.value),
            })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageUrl: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <select
          value={newProduct.categoryId}
          onChange={(e) =>
            setNewProduct({ ...newProduct, categoryId: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
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
        />
        <input
          type="text"
          placeholder="Size"
          value={newProduct.size}
          onChange={(e) =>
            setNewProduct({ ...newProduct, size: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
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
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded-lg shadow">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              {/* <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p> */}
              <p className="text-gray-600 mb-2">
                Category: {product.category.name}
              </p>
              <p className="text-gray-600 mb-2">Color: {product.color}</p>
              <p className="text-gray-600 mb-2">Size: {product.size}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
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
