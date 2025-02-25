"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  // Add more image paths as needed
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
            alt={`Luxury bag ${index + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
          Where Art Meets Functionality
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-gray-300">
          Discover our exquisite collection of handcrafted luxury bags, where
          timeless elegance meets modern design.
        </p>
        <div className="mt-10">
          <Link
            href="/shop"
            className="inline-block bg-primary text-white py-3 px-8 border border-transparent rounded-md text-base font-medium hover:bg-secondary transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
