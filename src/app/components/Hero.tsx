// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// // const images = [
// //   "/images/1.jpg",
// //   "/images/2.jpg",
// //   "/images/3.jpg",
// //   // Add more image paths as needed
// // ];

// export default function Hero() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//     // fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("/api/admin/hero");
//       if (!response.ok) throw new Error("Failed to fetch hero");
//       const data = await response.json();
//       setImages(data);
//     } catch (error) {
//       console.error("Error fetching hero:", error);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative h-screen">
//       {images.length > 0 &&
//         images.map((src, index) => (
//           <div
//             key={src.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentImageIndex ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <Image
//               src={src.imageUrl || "/placeholder.svg"}
//               alt={`Luxury bag ${index + 1}`}
//               layout="fill"
//               objectFit="cover"
//               quality={100}
//               priority={index === 0}
//             />
//           </div>
//         ))}
//       <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
//       <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
//           Where Art Meets Functionality
//         </h1>
//         <p className="mt-6 max-w-2xl text-xl text-gray-300">
//           Discover our exquisite collection of handcrafted luxury bags, where
//           timeless elegance meets modern design.
//         </p>
//         <div className="mt-10">
//           <Link
//             href="/shop"
//             className="inline-block bg-primary text-white py-3 px-8 border border-transparent rounded-md text-base font-medium hover:bg-secondary transition-colors duration-300"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HeroSection } from "@/lib/getHeroSections";

interface HeroProps {
  heroSections?: HeroSection[];
  defaultImages?: string[];
}

export default function Hero({
  heroSections,
  defaultImages = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use hero sections if available, otherwise use default images
  const images = heroSections?.length
    ? heroSections.map((section) => section.imageUrl)
    : defaultImages;
  const currentHeroSection = heroSections?.[currentImageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={currentHeroSection?.title || `Luxury bag ${index + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl leading-tight">
          {currentHeroSection?.title || "Where Artistry Meets "}
          {!currentHeroSection && (
            <span className="font-semibold">Elegance</span>
          )}
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-200 font-light">
          {currentHeroSection?.subtitle ||
            "Discover our exquisite collection of handcrafted luxury bags, where timeless sophistication embraces contemporary design."}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-white text-black py-3 px-8 border border-transparent rounded-none text-base font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            Acheter maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          {/* <Link
            href="/about"
            className="inline-flex items-center justify-center bg-transparent text-white py-3 px-8 border border-white rounded-none text-base font-medium hover:bg-white hover:text-black transition-colors duration-300"
          >
            Our Story
          </Link> */}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
