// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// interface Category {
//   id: string;
//   name: string;
//   imageUrl: string;
// }

// interface CategorySectionProps {
//   categories: Category[];
// }

// export default function CategorySection({
//   categories = [],
// }: CategorySectionProps) {
//   console.log("CategorySection received categories:", categories);

//   return (
//     <section className="bg-background py-16 sm:py-24" id="category">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-primary mb-6">
//           Acheter par catégorie
//         </h2>
//         <div className="border-b border-accent mb-10"></div>
//         <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
//           {categories.map((category) => (
//             <CategoryCard key={category.id} category={category} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function CategoryCard({ category }: { category: Category }) {
//   const [imageError, setImageError] = useState(false);

//   return (
//     <Link href={`/shop?category=${category.id}`} className="group">
//       <div className="relative w-full aspect-w-1 aspect-h-1 bg-accent rounded-lg overflow-hidden">
//         {!imageError ? (
//           // <Image
//           //   src={category.imageUrl || "/placeholder.svg"}
//           //   alt={category.name}
//           //   fill
//           //   className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
//           //   sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
//           //   onError={() => setImageError(true)}
//           // />
//           <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
//             <Image
//               src={category.imageUrl || "/placeholder.svg"}
//               alt={category.name}
//               fill
//               className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
//               sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
//               onError={() => setImageError(true)}
//             />
//           </div>
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
//             {category.name}
//           </div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-4">
//           <h3 className="text-xl font-semibold text-white">{category.name}</h3>
//         </div>
//       </div>
//       <div className="mt-4">
//         <button className="text-primary hover:text-secondary transition-colors duration-300">
//           Acheter
//         </button>
//       </div>
//     </Link>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const hasMultipleCategories = categories.length > 3;

  // Check if scrolling controls should be shown
  useEffect(() => {
    if (!hasMultipleCategories || !scrollContainerRef.current) return;

    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    };

    const container = scrollContainerRef.current;
    container.addEventListener("scroll", checkScroll);
    checkScroll();

    // Initial check after images might have loaded
    setTimeout(checkScroll, 500);

    return () => container.removeEventListener("scroll", checkScroll);
  }, [categories, hasMultipleCategories]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background py-16 sm:py-24" id="category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary mb-6">
          Acheter par catégorie
        </h2>
        <div className="border-b border-accent mb-10"></div>

        {hasMultipleCategories ? (
          <div className="relative">
            {showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex-none w-[280px] snap-start"
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>

            {showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>
            )}

            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/shop?category=${category.id}`} className="group">
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-accent">
        {!imageError ? (
          <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
            {/* <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-200"> */}
            <Image
              src={category.imageUrl || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-contain object-center group-hover:opacity-75 transition-opacity duration-300"
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
