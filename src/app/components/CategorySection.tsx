"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({
  categories = [],
}: CategorySectionProps) {
  console.log("CategorySection received categories:", categories);

  return (
    <section className="bg-background py-16 sm:py-24" id="category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary mb-6">
          Acheter par catégorie
        </h2>
        <div className="border-b border-accent mb-10"></div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/shop?category=${category.id}`} className="group">
      <div className="relative w-full aspect-w-1 aspect-h-1 bg-accent rounded-lg overflow-hidden">
        {!imageError ? (
          // <Image
          //   src={category.imageUrl || "/placeholder.svg"}
          //   alt={category.name}
          //   fill
          //   className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
          //   sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          //   onError={() => setImageError(true)}
          // />
          <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
            <Image
              src={category.imageUrl || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
            {category.name}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
        </div>
      </div>
      <div className="mt-4">
        <button className="text-primary hover:text-secondary transition-colors duration-300">
          Acheter
        </button>
      </div>
    </Link>
  );
}
