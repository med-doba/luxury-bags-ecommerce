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
  imageUrl: string;
  // category: Category;
  category?: Category | null; // Make category optional or nullable
  color: string;
  size: string;
  description: string;
  featured: boolean;
  images: ProductImage[];
  rating: number;
  reviews: number;
  originalPrice: number;
  seller: string;
  sellerRating: number;
  colors: string[];
  sizes: string[];
  stock: number; // Added stock field
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductImage {
  id: string;
  url: string;
}
