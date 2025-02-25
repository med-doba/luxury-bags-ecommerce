export default function VideoSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary mb-6">
          Discover Our Craftsmanship
        </h2>
        <div className="border-b border-accent mb-10"></div>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <video
            className="w-full h-full object-cover"
            controls
            poster="/video-poster.jpg"
          >
            <source src="/images/4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* <div className="mt-8 max-w-3xl">
          <p className="text-text text-lg">
            Experience the artistry behind our luxury handbags. Each piece is
            meticulously crafted by our skilled artisans, embodying generations
            of expertise and an unwavering commitment to excellence.
          </p>
        </div> */}
      </div>
    </section>
  );
}
