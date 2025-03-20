"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  featured: boolean;
  category: {
    id: string;
    name: string;
  };
}

export default function FeaturedCollectionsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  // const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/admin/products");
    const data = await response.json();
    setProducts(data);
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured }),
    });
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">
        Manage Featured Collections
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 &&
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded-lg shadow">
              {/* <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded"
              /> */}
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={300} // Set an appropriate width
                height={160} // Set an appropriate height
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">
                {/* ${parseFloat(product.price).toFixed(2)} */}
                {Number(product.price)?.toFixed(2) ?? "0.00"}
              </p>
              <p className="text-gray-600 mb-2">
                {/* Category: {product.category.name} */}
                Category:{" "}
                {product.category ? product.category.name : "No Category"}
              </p>
              <button
                onClick={() =>
                  handleToggleFeatured(product.id, !product.featured)
                }
                className={`px-3 py-1 rounded ${
                  product.featured
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-500 hover:bg-gray-600"
                } text-white`}
              >
                {product.featured ? "Featured" : "Not Featured"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
