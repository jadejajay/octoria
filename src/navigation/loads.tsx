/* eslint-disable max-lines-per-function */
// services/firebaseService.ts

import firestore from '@react-native-firebase/firestore';

import { useElementsStore } from '@/core/editorx/elements';
import { useFestivalStore } from '@/core/editorx/festival';
import { useFrameStore } from '@/core/editorx/frames';
import { useImageListStore } from '@/core/editorx/image-element';
import { useLogoStore } from '@/core/editorx/logos';
import { usePostVideoStore } from '@/core/editorx/post-video';
import { useShapesStore } from '@/core/editorx/shapes';
import { useStickerStore } from '@/core/editorx/stickers';
import { useProductsStore } from '@/core/mainscreen/products';
import type {
  ElementsType,
  FestivalType,
  FrameType,
  ImageListType,
  LogosType,
  PostVideoType,
  Product,
  ShapesType,
  StickerType,
} from '@/types';

const loadDataFromFirestore = async () => {
  try {
    const FrameSnapshot = await firestore().collection('frames').get();
    const StickersSnapshot = await firestore().collection('stickers').get();
    const FestivalSnapshot = await firestore().collection('festival').get();
    useProductsStore.setState({ productLoading: true });
    const ProductSnapshot = await firestore().collection('productList').get();
    const ElementsSnapshot = await firestore().collection('elements').get();
    const ShapesSnapshot = await firestore().collection('shapes').get();
    const LogosSnapshot = await firestore().collection('logosList').get();
    const PostVideosSnapshot = await firestore().collection('postVideos').get();
    const ImagesSnapshot = await firestore().collection('imagesElement').get();

    const frame: FrameType[] = FrameSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
      elements: doc.data()?.elements,
      mainWidth: doc.data()?.mainWidth,
    }));
    const sticker: StickerType[] = StickersSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    const festival: FestivalType[] = FestivalSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    const product: Product[] = ProductSnapshot.docs.map((doc) => ({
      id: doc.id,
      images: doc.data()?.images,
      catalogue: doc.data()?.catalogue,
      image3d: doc.data()?.image3d,
      name: doc.data()?.name,
      price: doc.data()?.price,
      description: doc.data()?.description,
      category: doc.data()?.category,
      subCategory: doc.data()?.subCategory,
      sizes: doc.data()?.sizes,
      material: doc.data()?.material,
      finishing: doc.data()?.finishing,
      type: doc.data()?.type,
      quantity: doc.data()?.quantity,
      featured: doc.data()?.featured,
    }));
    useProductsStore.setState({ productLoading: false });
    const element: ElementsType[] = ElementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    const shape: ShapesType[] = ShapesSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    const logo: LogosType[] = LogosSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    const postVideos: PostVideoType[] = PostVideosSnapshot.docs.map((doc) => ({
      id: doc.id,
      video: doc.data()?.video,
      thumbnail: doc.data()?.thumbnail,
    }));
    const imageList: ImageListType[] = ImagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));

    useFrameStore.setState({ frames: frame });
    useStickerStore.setState({ stickers: sticker });
    useFestivalStore.setState({ festival: festival });
    useProductsStore.setState({ products: product });
    useElementsStore.setState({ elements: element });
    useShapesStore.setState({ shapes: shape });
    useLogoStore.setState({ logos: logo });
    usePostVideoStore.setState({ postVideos: postVideos });
    useImageListStore.setState({ images: imageList });
  } catch (error) {
    console.error('Error loading data from Firestore:', error);
  }
};

export { loadDataFromFirestore };
