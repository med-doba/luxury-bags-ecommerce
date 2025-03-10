// import prisma from "./prisma";

// export async function getCategories() {
//   try {
//     const categories = await prisma.category.findMany();
//     return categories;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }
import prisma from "./prisma";
import { unstable_noStore } from "next/cache";

export async function getCategories() {
  // Tell Next.js not to cache this data fetch
  unstable_noStore();

  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
