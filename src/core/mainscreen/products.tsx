// stores/dataStore.ts

import { create } from 'zustand';

import type { Product } from '@/types';

type ProductsStore = {
  products: Product[]; // Replace 'any' with your data structure
  productLoading: boolean;
  setProducts: (data: Product[]) => void; // Replace 'any' with your data structure
};

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  productLoading: true,
  setProducts: (data) => set((_) => ({ products: data })),
}));
