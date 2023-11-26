/* eslint-disable max-lines-per-function */
// services/firebaseService.ts

import firestore from '@react-native-firebase/firestore';

import {
  useElementsStore,
  useFestivalStore,
  useFrameStore,
  useImageListStore,
  useLogoStore,
  usePostMainCategoryStore,
  usePostVideoStore,
  useProductsStore,
  useShapesStore,
  useStickerStore,
} from '@/core';
import type {
  ElementsType,
  FestivalType,
  FrameType,
  ImageListType,
  LogosType,
  PostMainCategoryType,
  PostVideoType,
  Product,
  ShapesType,
  StickerType,
} from '@/types';

const loadDataFromFirestore = async () => {
  try {
    useProductsStore.setState({ productLoading: true });
    console.log('loading started', Date.now());
    const ProductSnapshot = await firestore().collection('productList').get();
    const product: Product[] = ProductSnapshot.docs.map((doc) => ({
      id: doc.id,
      images: doc.data()?.images,
      catalogue: doc.data()?.catalogue,
      image3d: doc.data()?.image3d,
      model: doc.data()?.model,
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
    useProductsStore.setState({ products: product });
    console.log('products==========================\n', product);

    console.log('products loaded', Date.now());
    const PostMainCategorySnapshot = await firestore()
      .collection('postMainCategory')
      .orderBy('code')
      .get();
    const postMainCategorySnapshotList: PostMainCategoryType[] =
      PostMainCategorySnapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data()?.image,
        name: doc.data()?.name,
        code: doc.data()?.code,
        subCode: doc.data()?.subCode,
      }));
    usePostMainCategoryStore.setState({
      postMainCategory: postMainCategorySnapshotList,
    });
    console.log(
      'post main category ==========================\n',
      postMainCategorySnapshotList
    );
    console.log('post main category loaded', Date.now());
    useProductsStore.setState({ productLoading: false });
    // festival images and videos to load
    const FestivalSnapshot = await firestore().collection('postImages').get();
    const festival: FestivalType[] = FestivalSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
      categoryCode: doc.data()?.categoryCode,
      subCategory: doc.data()?.subCategory,
      tags: doc.data()?.tags,
    }));
    useFestivalStore.setState({ festival: festival });
    console.log('festival ==========================\n', festival);
    console.log('festival loaded', Date.now());
    const PostVideosSnapshot = await firestore().collection('postVideos').get();
    const postVideos: PostVideoType[] = PostVideosSnapshot.docs.map((doc) => ({
      id: doc.id,
      video: doc.data()?.video,
      thumbnail: doc.data()?.thumbnail,
      categoryCode: doc.data()?.categoryCode,
      subCategory: doc.data()?.subCategory,
      tags: doc.data()?.tags,
    }));
    usePostVideoStore.setState({ postVideos: postVideos });
    console.log('post videos ==========================\n', postVideos);
    console.log('post videos loaded', Date.now());
    // frames lower priority to load
    const FrameSnapshot = await firestore().collection('frames').get();
    const frame: FrameType[] = FrameSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
      elements: doc.data()?.elements,
      mainWidth: doc.data()?.mainWidth,
    }));
    useFrameStore.setState({ frames: frame });
    console.log('frames ==========================\n', frame);
    console.log('frames loaded', Date.now());
    // stickers lower priority to load
    const StickersSnapshot = await firestore().collection('stickers').get();
    const sticker: StickerType[] = StickersSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    useStickerStore.setState({ stickers: sticker });
    console.log('stickers ==========================\n', sticker);
    console.log('stickers loaded', Date.now());
    // elements lower priority to load
    const ElementsSnapshot = await firestore().collection('elements').get();
    const element: ElementsType[] = ElementsSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    useElementsStore.setState({ elements: element });
    console.log('elements ==========================\n', element);
    console.log('elements loaded', Date.now());
    // shapes lower priority to load
    const ShapesSnapshot = await firestore().collection('shapes').get();
    const shape: ShapesType[] = ShapesSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    useShapesStore.setState({ shapes: shape });
    console.log('shapes ==========================\n', shape);
    console.log('shapes loaded', Date.now());
    // logos lower priority to load
    const LogosSnapshot = await firestore().collection('logosList').get();
    const logo: LogosType[] = LogosSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    useLogoStore.setState({ logos: logo });
    console.log('logos ==========================\n', logo);
    console.log('logos loaded', Date.now());
    // image elements lower priority to load
    const ImagesSnapshot = await firestore().collection('imagesElement').get();
    const imageList: ImageListType[] = ImagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
    }));
    useImageListStore.setState({ images: imageList });
    console.log('images ==========================\n', imageList);
    console.log('images loaded', Date.now());
  } catch (error) {
    console.error('Error loading data from Firestore:', error);
  }
};

export { loadDataFromFirestore };
