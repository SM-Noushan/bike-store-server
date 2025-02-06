/* eslint-disable no-unused-vars */
export enum ProductCategory {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  Electric = "Electric",
}

export interface TProduct {
  image: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  category: ProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}
