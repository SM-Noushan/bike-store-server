/* eslint-disable no-unused-vars */
export enum ProductCategory {
  mountain = "mountain",
  road = "road",
  hybrid = "hybrid",
  electric = "electric",
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
