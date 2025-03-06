import Image from "next/image";
import Link from "next/link";

interface Brand {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

// This is a server component that fetches brands data
async function getBrands() {
  try {
    // In a real implementation, you would fetch from your database
    // For now, we'll return mock data
    const brands = [
      {
        id: "1",
        name: "Louis Vuitton",
        imageUrl: "/images/brands/louis-vuitton.jpg",
        description: "Maison de luxe française fondée en 1854",
      },
      {
        id: "2",
        name: "Chanel",
        imageUrl: "/images/brands/chanel.jpg",
        description: "Marque emblématique créée par Coco Chanel",
      },
      {
        id: "3",
        name: "Gucci",
        imageUrl: "/images/brands/gucci.jpg",
        description: "Maison italienne fondée en 1921",
      },
      {
        id: "4",
        name: "Hermès",
        imageUrl: "/images/brands/hermes.jpg",
        description:
          "Maison de luxe française spécialisée dans les accessoires",
      },
      {
        id: "5",
        name: "Prada",
        imageUrl: "/images/brands/prada.jpg",
        description: "Marque italienne de prêt-à-porter de luxe",
      },
      {
        id: "6",
        name: "Dior",
        imageUrl: "/images/brands/dior.jpg",
        description: "Maison de couture française fondée par Christian Dior",
      },
    ];

    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export default async function MarquesPage() {
  const brands = await getBrands();

  return (
    <div className="bg-background min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">Nos Marques</h1>
        <p className="text-lg text-text mb-12 max-w-3xl">
          Découvrez notre sélection exclusive des marques les plus prestigieuses
          du monde de la mode. Chaque marque représente l'excellence, le
          savoir-faire et l'innovation dans l'univers du luxe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link
              href={`/shop/brand/${brand.id}`}
              key={brand.id}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 w-full">
                  <Image
                    src={brand.imageUrl || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-2">
                    {brand.name}
                  </h2>
                  <p className="text-text">{brand.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-secondary font-medium group-hover:underline">
                      Découvrir la collection
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
