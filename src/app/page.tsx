import Hero from "./components/Hero";
import FeaturedCollections from "./components/FeaturedCollections";
import CategorySection from "./components/CategorySection";
// import ShopTheLook from "./components/ShopTheLook";
// import ArtisanSpotlight from "./components/ArtisanSpotlight";
// import Testimonials from "./components/Testimonials";
import VideoSection from "./components/VideoSection";

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "The Classic Tote",
    price: 299,
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 32,
    name: "Elegant Crossbody",
    price: 199,
    // imageSrc: '/images/elegant-crossbody.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 33,
    name: "Luxe Leather Satchel",
    price: 349,
    // imageSrc: '/images/luxe-leather-satchel.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 34,
    name: "Mini Evening Clutch",
    price: 149,
    // imageSrc: '/images/mini-evening-clutch.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 51,
    name: "The Classic Tote",
    price: 299,
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 52,
    name: "Elegant Crossbody",
    price: 199,
    // imageSrc: '/images/elegant-crossbody.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 53,
    name: "Luxe Leather Satchel",
    price: 349,
    // imageSrc: '/images/luxe-leather-satchel.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 54,
    name: "Mini Evening Clutch",
    price: 149,
    // imageSrc: '/images/mini-evening-clutch.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 31,
    name: "The Classic Tote",
    price: 299,
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 32,
    name: "Elegant Crossbody",
    price: 199,
    // imageSrc: '/images/elegant-crossbody.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 33,
    name: "Luxe Leather Satchel",
    price: 349,
    // imageSrc: '/images/luxe-leather-satchel.jpg',
    imageSrc: "/classic-tote.jpg",
  },
  {
    id: 34,
    name: "Mini Evening Clutch",
    price: 149,
    // imageSrc: '/images/mini-evening-clutch.jpg',
    imageSrc: "/classic-tote.jpg",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCollections products={featuredProducts} />
      <CategorySection />
      {/* <ShopTheLook /> */}
      <VideoSection />
      {/* <ArtisanSpotlight /> */}
      {/* <Testimonials /> */}
    </main>
  );
}
