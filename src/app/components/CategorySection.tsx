import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Small Bags",
    href: "/shop?category=leather",
    imageSrc: "/classic-tote.jpg",
  },
  {
    name: "Medium Bags",
    href: "/shop?category=tote",
    imageSrc: "/classic-tote.jpg",
  },
  {
    name: "Large Bags",
    href: "/shop?category=crossbody",
    imageSrc: "/classic-tote.jpg",
  },
];

// export default function CategorySection() {
//   return (
//     <section className="bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
//           Shop by Category
//         </h2>
//         <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
//           {categories.map((category) => (
//             <Link key={category.name} href={category.href} className="group">
//               <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
//                 <Image
//                   src={category.imageSrc || "/placeholder.svg"}
//                   alt={category.name}
//                   width={500}
//                   height={500}
//                   className="w-full h-full object-center object-cover group-hover:opacity-75"
//                 />
//               </div>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">
//                 {category.name}
//               </h3>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

export default function CategorySection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary mb-6">
          Shop by Category
        </h2>
        <div className="border-b border-accent mb-10"></div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="relative w-full aspect-w-1 aspect-h-1 bg-accent rounded-lg overflow-hidden">
                <Image
                  src={category.imageSrc || "/placeholder.svg"}
                  alt={category.name}
                  // layout="fill"
                  objectFit="cover"
                  width={500}
                  height={500}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                  // className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-primary hover:text-secondary transition-colors duration-300">
                  Shop Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
