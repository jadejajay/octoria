// useREnderStore
import { create } from 'zustand';

type RenderStore = {
  renderedAsset: string;
  renderedAssetData: string;
  setRenderedAsset: (data: string) => void;
  setRenderedAssetData: (data: string) => void;
};

export const useRenderStore = create<RenderStore>((set) => ({
  renderedAsset: '',
  renderedAssetData: '',
  setRenderedAsset: (data) => set((_) => ({ renderedAsset: data })),
  setRenderedAssetData: (data) => set((_) => ({ renderedAssetData: data })),
}));
