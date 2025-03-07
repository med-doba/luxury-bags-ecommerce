import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// interface NewCollection {
//   id: string;
//   name: string;
//   imageUrl: string;
//   description: string;
//   releaseDate: string;
// }

// This is a server component that fetches new collection data
async function getNewCollections() {
  try {
    // In a real implementation, you would fetch from your database
    // For now, we'll return mock data
    const collections = [
      {
        id: "1",
        name: "Collection Printemps-Été 2025",
        imageUrl: "/images/collections/spring-summer.jpg",
        description:
          "Notre nouvelle collection inspirée par les couleurs vives et les textures légères de la saison estivale.",
        releaseDate: "Mars 2025",
      },
      {
        id: "2",
        name: "Collection Capsule Voyage",
        imageUrl: "/images/collections/travel.jpg",
        description:
          "Des pièces élégantes et fonctionnelles conçues pour les voyageurs exigeants.",
        releaseDate: "Avril 2025",
      },
      {
        id: "3",
        name: "Collection Édition Limitée",
        imageUrl: "/images/collections/limited.jpg",
        description:
          "Une série exclusive de sacs à main en édition limitée, créée en collaboration avec des artistes contemporains.",
        releaseDate: "Mai 2025",
      },
    ];

    return collections;
  } catch (error) {
    console.error("Error fetching new collections:", error);
    return [];
  }
}

export default async function NouvelleCollectionPage() {
  const collections = await getNewCollections();

  return (
    <div className="bg-background min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">
          Nouvelle Collection
        </h1>
        {/* <p className="text-lg text-text mb-12 max-w-3xl">
          Découvrez nos dernières créations, où l'élégance rencontre
          l'innovation. Chaque pièce de notre nouvelle collection incarne notre
          engagement envers l'excellence et le raffinement.
        </p> */}
        <p className="text-lg text-text mb-12 max-w-3xl">
          Découvrez nos dernières créations, où l&apos;élégance rencontre
          l&apos;innovation. Chaque pièce de notre nouvelle collection incarne
          notre engagement envers l&apos;excellence et le raffinement.
        </p>

        {collections.map((collection, index) => (
          <div
            key={collection.id}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 mb-20`}
          >
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={collection.imageUrl || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="text-sm text-secondary font-medium mb-2">
                {collection.releaseDate}
              </div>
              <h2 className="text-3xl font-semibold text-primary mb-4">
                {collection.name}
              </h2>
              <p className="text-text mb-6">{collection.description}</p>
              <Link
                href={`/shop/collection/${collection.id}`}
                className="inline-flex items-center text-secondary hover:text-primary transition-colors"
              >
                Découvrir la collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-primary text-white py-3 px-8 border border-transparent rounded-none text-base font-medium hover:bg-secondary transition-colors duration-300"
          >
            Voir tous nos produits
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
