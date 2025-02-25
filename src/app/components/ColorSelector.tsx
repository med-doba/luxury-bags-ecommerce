"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ColorSelectorProps {
  colors: string[];
}

export default function ColorSelector({ colors }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Color</h2>
      <div className="flex space-x-4">
        {colors.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${
              selectedColor === color ? "ring-2 ring-gray-900" : ""
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
    </div>
  );
}
