//zustand store for saving image
import { create } from 'zustand';

type ImageStore = {
  image: string;
  setImage: (image: string) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
  image:
    'https://firebasestorage.googleapis.com/v0/b/speedy-league-335221.appspot.com/o/app_assets%2Fwood.jpg?alt=media&token=f21faf5c-5f0a-4330-a81d-242ca9ba21c3',
  setImage: (image) => set({ image }),
}));
