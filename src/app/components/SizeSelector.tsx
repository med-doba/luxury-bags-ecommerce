"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SizeSelectorProps {
  sizes: string[];
}

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Size</h2>
      <div className="flex space-x-4">
        {sizes.map((size) => (
          <motion.button
            key={size}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${
              selectedSize === size
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            {size.toUpperCase()}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
