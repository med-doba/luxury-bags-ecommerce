// export interface Product {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
//   description?: string;
//   category?: string;
//   colors?: string[];
//   sizes?: string[];
// }

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   category: Category;
//   color: string;
//   size: string;
//   description: string;
//   featured: boolean;
// }
// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
//   images: string[];
//   category: Category;
//   color: string;
//   size: string;
//   description: string;
//   featured: boolean;
// }
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  images: string[];
  category: Category;
  color: string;
  size: string;
  colors: string[];
  sizes: string[];
  description: string;
  featured: boolean;
  rating: number;
  reviews: number;
  seller: string;
  sellerRating: number;
}

export interface Category {
  id: string;
  name: string;
}
