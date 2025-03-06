import { getHeroSections } from "@/lib/getHeroSections";
import Hero from "./Hero";

export default async function HeroWrapper() {
  try {
    const heroSections = await getHeroSections();

    if (!heroSections || heroSections.length === 0) {
      // Fallback to default images if no hero sections are found
      return (
        <Hero
          defaultImages={["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]}
        />
      );
    }

    return <Hero heroSections={heroSections} />;
  } catch (error) {
    console.error("Error in HeroWrapper:", error);
    // Fallback to default images if there's an error
    return (
      <Hero
        defaultImages={["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]}
      />
    );
  }
}
