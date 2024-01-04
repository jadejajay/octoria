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
import {
  F_FRAME_LIST,
  F_POST_IMAGES,
  F_POST_MAIN_CATEGORY,
  F_POST_VIDEOS,
  F_PRODUCT_LIST,
  F_SUB_CATEGORY,
  type FestivalType,
  type FrameType,
  type PostMainCategoryType,
  type PostVideoType,
  type Product,
  type SubCategoryType,
} from '@/types';

const loadDataFromFirestore = async () => {
  try {
    useProductsStore.setState({ productLoading: true });
    logger.log('loading started', Date.now());
    const ProductSnapshot = await firestore().collection(F_PRODUCT_LIST).get();
    const product: Product[] = ProductSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    useProductsStore.setState({ products: product });
    // logger.log('products==========================\n', product);

    logger.log('products loaded', Date.now());
    const SubCategoryStoreSnapshot = await firestore()
      .collection(F_SUB_CATEGORY)
      .orderBy('code')
      .get();
    const SubCategoryStoreSnapshotList: SubCategoryType[] =
      SubCategoryStoreSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as SubCategoryType),
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
      .collection(F_POST_MAIN_CATEGORY)
      .orderBy('code')
      .get();
    const postMainCategorySnapshotList: PostMainCategoryType[] =
      PostMainCategorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as PostMainCategoryType),
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
    const FestivalSnapshot = await firestore().collection(F_POST_IMAGES).get();
    const festival: FestivalType[] = FestivalSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as FestivalType),
    }));
    useFestivalStore.setState({ festival: festival });
    // logger.log('festival ==========================\n', festival);
    logger.log('festival loaded', Date.now());
    const PostVideosSnapshot = await firestore()
      .collection(F_POST_VIDEOS)
      .get();
    const postVideos: PostVideoType[] = PostVideosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as PostVideoType),
    }));
    usePostVideoStore.setState({ postVideos: postVideos });
    // logger.log('post videos ==========================\n', postVideos);
    logger.log('post videos loaded', Date.now());
    // frames lower priority to load
    const FrameSnapshot = await firestore().collection(F_FRAME_LIST).get();
    const frame: FrameType[] = FrameSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as FrameType),
    }));
    useFrameStore.setState({ frames: frame });
    logger.log(
      'frames ==========================\n',
      JSON.stringify(frame, null, 2)
    );
    logger.log('frames loaded', Date.now());
  } catch (error) {
    logger.error('Error loading data from Firestore:', error);
  }
};

export { loadDataFromFirestore };
