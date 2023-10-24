// usePostVideoStore
import { create } from 'zustand';

import type { PostVideoType } from '@/types';

type PostVideoStore = {
  postVideos: PostVideoType[]; // Replace 'any' with your data structure
  setPostVideo: (data: PostVideoType[]) => void; // Replace 'any' with your data structure
};

export const usePostVideoStore = create<PostVideoStore>((set) => ({
  postVideos: [],
  setPostVideo: (data) => set((_) => ({ postVideos: data })),
}));
