// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice: number;
//   imageUrl: string;
//   category: Category;
//   color: string;
//   size: string;
//   colors: string[];
//   sizes: string[];
//   description: string;
//   featured: boolean;
//   rating: number;
//   reviews: number;
//   seller: string;
//   sellerRating: number;
//   images: ProductImage[];
// }

// export interface Category {
//   id: string;
//   name: string;
// }

// export interface ProductImage {
//   id: string;
//   url: string;
// }

export interface Product {
  id: string;
  name: string;
  price: number;
  onSale?: boolean; // Whether product is on sale
  salePercentage?: number | null; // Sale percentage (1-99)
  imageUrl: string;
  // category: Category;
  category?: Category | null; // Make category optional or nullable
  color: string | null; // Allow null from database
  size: string;
  description: string;
  featured: boolean;
  images: ProductImage[];
  rating: number;
  reviews: number;
  seller: string;
  sellerRating: number;
  colors: string[];
  sizes: string[];
  stock: number; // Added stock field
  colorVariants?: ColorVariant[]; // Added color variants
  sizeVariants?: SizeVariant[]; // Added size variants
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ColorVariantImage {
  id: string;
  url: string;
}

export interface ColorVariant {
  id: string;
  color: string;
  colorHex?: string; // Optional hex color code for custom colors
  stock: number;
  images: ColorVariantImage[];
  sizeVariants?: ColorSizeVariant[]; // Nested size variants for each color
}

export interface SizeVariant {
  id: string;
  size: string;
  stock: number;
  price?: number;
}

export interface ColorSizeVariant {
  id: string;
  size: string;
  stock: number;
  price?: number;
  colorVariantId: string;
}
