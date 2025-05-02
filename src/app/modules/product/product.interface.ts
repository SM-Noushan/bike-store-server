/* eslint-disable no-unused-vars */
export enum ProductCategory {
  scooter = "scooter",
  sports = "sports",
  performancesports = "performancesports",
  commuter = "commuter",
  supersports = "supersports",
}

export const ProductCategoryList = Object.values(ProductCategory);

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
