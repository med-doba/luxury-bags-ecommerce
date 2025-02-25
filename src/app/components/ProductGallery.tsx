"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden"
      >
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Product image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-center object-cover"
        />
      </motion.div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
            className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
              selectedImage === image ? "ring-2 ring-black" : ""
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-center object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
