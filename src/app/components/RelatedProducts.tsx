import Image from "next/image";
import Link from "next/link";

interface RelatedProductsProps {
  category: string;
}

const mockRelatedProducts = [
  {
    id: "1",
    name: "Classic Shoulder Bag",
    price: 999.99,
    imageSrc: "/images/classic-shoulder-bag.jpg",
  },
  {
    id: "2",
    name: "Mini Crossbody",
    price: 799.99,
    imageSrc: "/images/mini-crossbody.jpg",
  },
  {
    id: "3",
    name: "Leather Clutch",
    price: 599.99,
    imageSrc: "/images/leather-clutch.jpg",
  },
];

export default function RelatedProducts({ category }: RelatedProductsProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-light mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockRelatedProducts.map((product) => (
          <Link key={product.id} href={`/shop/${product.id}`} className="group">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={product.imageSrc || "/placeholder.svg"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity duration-200"
              />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 text-lg font-light text-gray-900">
              {product.price.toLocaleString()} MAD
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
