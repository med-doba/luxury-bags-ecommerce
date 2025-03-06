import Image from "next/image";
import Link from "next/link";

export default function ShopTheLook() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Shop the Look
        </h2>
        <div className="relative">
          <Image
            src="/classic-tote.jpg"
            alt="Model with luxury bag"
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              href="/shop"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
            >
              Acheter maintenant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
