export type Product = {
  id: string;
  images: string[];
  catalogue?: string;
  image3d?: string;
  model?: string;
  name: string;
  price?: string;
  description?: string;
  category?: string;
  subCategory?: string;
  sizes?: string[];
  material?: string;
  finishing?: string[];
  type?: string;
  quantity?: number[];
  featured?: boolean;
};
