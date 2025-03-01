import { getCategories } from "@/lib/getCategories";
import CategorySection from "./CategorySection";

export default async function CategorySectionWrapper() {
  try {
    const categories = await getCategories();
    console.log("CategorySectionWrapper categories:", categories);

    if (!categories || categories.length === 0) {
      return <div className="text-center py-10">No categories found.</div>;
    }

    return <CategorySection categories={categories} />;
  } catch (error) {
    console.error("Error in CategorySectionWrapper:", error);
    return (
      <div className="text-center py-10">
        Error loading categories. Please try again later.
      </div>
    );
  }
}
