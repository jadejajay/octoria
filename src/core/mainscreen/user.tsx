// stores/dataStore.ts

import { create } from 'zustand';

import type { UserType } from '@/types';

type UserStore = {
  user: UserType; // Replace 'any' with your data structure
  userLoading: boolean;
  setUser: (data: UserType) => void; // Replace 'any' with your data structure
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: '',
    name: '',
    email: '',
    business: '',
    type: '',
    photoUrl: '',
    info: {
      address: '',
      phone: '',
      name: '',
      photo: '',
      email: '',
      website: '',
    },
  },
  userLoading: false,
  setUser: (data) => set((_) => ({ user: data })),
}));
