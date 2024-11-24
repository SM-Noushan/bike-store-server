/* eslint-disable no-unused-vars */
export enum ProductCategory {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  Electric = "Electric",
}

export interface TProduct {
  name: string;
  brand: string;
  price: number;
  category: ProductCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}
