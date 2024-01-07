import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
export interface MainCategory {
  id?: string;
  image?: string;
  title?: string;
  color?: string;
}
export interface MainCarouselType {
  id?: string;
  image?: string;
  link?: string;
  video?: string;
}
export type ShareCamBgType = {
  id?: string;
  image: string;
  thumbnail: string;
};
// export interface Links {
//   id: string;
//   url?: string;
//   apikey?: string;
//   phone?: string;
//   value?: string;
//   // Add your data properties here
// }

export const CACHE_DIR =
  Platform.OS === 'ios'
    ? RNFetchBlob.fs.dirs.DocumentDir
    : RNFetchBlob.fs.dirs.DocumentDir;
export const APP_DIR = 'Octoria';
export const ASSISTANCE = 'ASSISTANCE';
export const POST_IMAGE = 'POST_IMAGE';
export const POST_VIDEO = 'POST_VIDEO';
export const CACHE_THUMBNAIL = 'CACHE_THUMBNAIL';
export const CACHE_VIDEO = 'CACHE_VIDEO';
export const CACHE_IMAGE = 'CACHE_IMAGE';
// firestore collections
export const F_PRODUCT_LIST = 'ProductList';
export const F_SUB_CATEGORY = 'SubCategory';
export const F_POST_MAIN_CATEGORY = 'PostMainCategory';
export const F_POST_IMAGES = 'PostImages';
export const F_POST_VIDEOS = 'PostVideos';
export const F_FRAME_LIST = 'Frames';
export const F_USERS = 'Users';
export const F_FAVORITES = 'Favorites';
export const F_MAIN_CATEGORY = 'MainCategory';
export const F_MAIN_CAROUSEL = 'MainCarousel';
export const F_MAIN_CAROUSEL2 = 'MainCarousel2';
export const F_IMAGES_ELEMENTS = 'ImagesElements';
export const F_SHARE_CAM_BG_IMAGES = 'ShareCamBgImages';
export const F_ELEMENTS = 'Elements';
export const F_LOGOS_LIST = 'LogosList';
export const F_SHAPES = 'Shapes';
export const F_STICKERS = 'Stickers';
export const F_FESTIVAL_IMAGE = 'FestivalImage';
export const F_LINKS = 'Links';
export const F_LINKS_GSTAPIKEY = 'gstapikey';
export const F_LINKS_SETTINGS = 'settings';
export const F_LINKS_SHARE = 'share';
