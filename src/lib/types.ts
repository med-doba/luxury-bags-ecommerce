export interface Product {
    id: number;
    name: string;
    price: number;
    imageSrc: string;
    description?: string;
    category?: string;
    colors?: string[];
    sizes?: string[];
  }