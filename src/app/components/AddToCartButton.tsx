// "use client";

// import { motion } from "framer-motion";

// export default function AddToCartButton() {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="w-full bg-gray-900 text-white py-3 px-8 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
//     >
//       Add to Cart
//     </motion.button>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1 bg-primary text-white py-3 px-8 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 flex items-center justify-center"
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      Add to Cart
    </motion.button>
  );
}
