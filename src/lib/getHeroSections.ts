import prisma from "./prisma";

export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export async function getHeroSections(): Promise<HeroSection[]> {
  try {
    const heroSections = await prisma.heroSection.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    console.log("heroSections :", heroSections);

    return heroSections;
  } catch (error) {
    console.error("Error fetching hero sections:", error);
    return [];
  }
}
