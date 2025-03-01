// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// interface ProductGalleryProps {
//   images: string[];
// }

// export default function ProductGallery({ images }: ProductGalleryProps) {
//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   return (
//     <div className="space-y-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden"
//       >
//         <Image
//           src={selectedImage || "/placeholder.svg"}
//           alt="Product image"
//           layout="fill"
//           objectFit="cover"
//           className="w-full h-full object-center object-cover"
//         />
//       </motion.div>
//       <div className="grid grid-cols-4 gap-4">
//         {images.map((image, index) => (
//           <motion.button
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setSelectedImage(image)}
//             className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
//               selectedImage === image ? "ring-2 ring-black" : ""
//             }`}
//           >
//             <Image
//               src={image || "/placeholder.svg"}
//               alt={`Product thumbnail ${index + 1}`}
//               layout="fill"
//               objectFit="cover"
//               className="w-full h-full object-center object-cover"
//             />
//           </motion.button>
//         ))}
//       </div>
//     </div>
//   );
// }

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
    <div className="flex flex-col-reverse md:flex-row md:space-x-4">
      {/* Thumbnails */}
      <div className="flex mt-4 space-x-2 md:flex-col md:space-x-0 md:space-y-2 md:mt-0 md:w-20">
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
              selectedImage === image ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex-1 aspect-square bg-gray-100 rounded-lg overflow-hidden"
      >
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Product image"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
  );
}
