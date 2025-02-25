"use client";

import { motion } from "framer-motion";

export default function AddToCartButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-gray-900 text-white py-3 px-8 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
    >
      Add to Cart
    </motion.button>
  );
}
