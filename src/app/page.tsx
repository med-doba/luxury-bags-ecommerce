import Hero from "./components/Hero";
import FeaturedCollections from "./components/FeaturedCollections";
import CategorySection from "./components/CategorySection";
// import ShopTheLook from "./components/ShopTheLook";
// import ArtisanSpotlight from "./components/ArtisanSpotlight";
// import Testimonials from "./components/Testimonials";
import VideoSection from "./components/VideoSection";
import CategorySectionWrapper from "./components/CategorySectionWrapper";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCollections />
      {/* <CategorySection /> */}
      <CategorySectionWrapper />
      {/* <ShopTheLook /> */}
      {/* <VideoSection /> */}
      {/* <ArtisanSpotlight /> */}
      {/* <Testimonials /> */}
    </main>
  );
}
