import Image from 'next/image';

export default function ArtisanSpotlight() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Artisan Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
            //   src="/images/artisan.jpg"
              src="/classic-tote.jpg"
              alt="Artisan crafting a bag"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Craftsmanship at Its Finest</h3>
            <p className="text-gray-600 mb-4">
              Our bags are meticulously handcrafted by skilled artisans using the finest materials. Each piece is a testament to the dedication and expertise of our craftspeople, ensuring that every bag is a unique work of art.
            </p>
            <p className="text-gray-600">
              We take pride in supporting traditional craftsmanship while embracing modern design, resulting in timeless pieces that stand the test of time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}