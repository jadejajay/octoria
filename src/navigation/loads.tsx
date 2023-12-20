/* eslint-disable max-lines-per-function */
// services/firebaseService.ts

import firestore from '@react-native-firebase/firestore';

import {
  logger,
  useFestivalStore,
  useFrameStore,
  usePostMainCategoryStore,
  usePostVideoStore,
  useProductsStore,
} from '@/core';
import { useSubCategoryStore } from '@/core/editorx/sub-category';
import type {
  FestivalType,
  FrameType,
  PostMainCategoryType,
  PostVideoType,
  Product,
  SubCategoryType,
} from '@/types';

const loadDataFromFirestore = async () => {
  try {
    useProductsStore.setState({ productLoading: true });
    logger.log('loading started', Date.now());
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
    // logger.log('products==========================\n', product);

    logger.log('products loaded', Date.now());
    const SubCategoryStoreSnapshot = await firestore()
      .collection('SubCategory')
      .orderBy('code')
      .get();
    const SubCategoryStoreSnapshotList: SubCategoryType[] =
      SubCategoryStoreSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data()?.name,
        code: doc.data()?.code,
        date: doc.data()?.date,
      }));
    useSubCategoryStore.setState({
      SubCategory: SubCategoryStoreSnapshotList,
    });
    logger.log(
      'post main category ========================\n',
      SubCategoryStoreSnapshotList
    );
    logger.log('SubCategoryStore loaded', Date.now());
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
    // logger.log(
    //   'post main category ========================\n',
    //   postMainCategorySnapshotList
    // );
    logger.log('post main category loaded', Date.now());
    useProductsStore.setState({ productLoading: false });
    // festival images and videos to load
    const FestivalSnapshot = await firestore().collection('postImages').get();
    const festival: FestivalType[] = FestivalSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
      thumbnail: doc.data()?.thumbnail,
      categoryCode: doc.data()?.categoryCode,
      subCategory: doc.data()?.subCategory,
      tags: doc.data()?.tags,
    }));
    useFestivalStore.setState({ festival: festival });
    // logger.log('festival ==========================\n', festival);
    logger.log('festival loaded', Date.now());
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
    // logger.log('post videos ==========================\n', postVideos);
    logger.log('post videos loaded', Date.now());
    // frames lower priority to load
    const FrameSnapshot = await firestore().collection('frames').get();
    const frame: FrameType[] = FrameSnapshot.docs.map((doc) => ({
      id: doc.id,
      image: doc.data()?.image,
      elements: doc.data()?.elements,
      mainWidth: doc.data()?.mainWidth,
    }));
    useFrameStore.setState({ frames: frame });
    logger.log('frames ==========================\n', frame);
    logger.log('frames loaded', Date.now());
  } catch (error) {
    logger.error('Error loading data from Firestore:', error);
  }
};

export { loadDataFromFirestore };
