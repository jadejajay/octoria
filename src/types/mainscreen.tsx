import type { BusinessDataType } from '@/core';

export interface MainCategory {
  id: string;
  image: string;
  title: string;
  color?: string;
  // Add your data properties here
}
export interface MainCategory2 {
  image: string;
  title: string;
  // Add your data properties here
}

export interface MainCategoriesState {
  MainCategoriesData: MainCategory[];
  isLoading: boolean;
  subscribeToMainCategories: () => () => void;
}
export interface Links {
  id: string;
  url?: string;
  apikey?: string;
  phone?: string;
  value?: string;
  // Add your data properties here
}
export interface Links2 {
  url?: string;
  apikey?: string;
  phone?: string;
  value?: string;
  // Add your data properties here
}

export interface LinksState {
  LinksData: Links[];
  isLoading: boolean;
  subscribeToLinks: () => () => void;
}
export interface Background {
  id: string;
  url?: string;
  apikey?: string;
  phone?: string;
  value?: string;
  // Add your data properties here
}
export interface Background2 {
  url?: string;
  apikey?: string;
  phone?: string;
  value?: string;
  // Add your data properties here
}

export interface BackgroundState {
  BackgroundData: Background[];
  BackgroundMain: Background[];
  BackgroundSecondary: Background[];
  isLoading: boolean;
  subscribeToBackground: (id: string) => void;
  subscribeToBackgroundMainList: () => void;
  subscribeToBackgroundSecondaryList: (id: string) => void;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  business: string;
  photoUrl: string;
  type: string;
  info: BusinessDataType;
}
