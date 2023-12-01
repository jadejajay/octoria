//zustand store for saving image
import { Env } from '@env';
import { create } from 'zustand';

type ImageStore = {
  image: string;
  setImage: (image: string) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  image: Env.SHARECAM_BACKGROUND,
  setImage: (image) => set({ image }),
}));
