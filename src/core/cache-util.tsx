import { CACHE_DIR } from '@/types';

import { FileManagement } from './file-management';
import { logger } from './logger';
import { IS_ANDROID, IS_IOS } from './utils';

const fileManager = new FileManagement();
export class VideoCacheManager {
  private cacheDir: string;

  constructor() {
    // Set the cache directory path
    this.cacheDir = CACHE_DIR;
  }

  async getVideo(url: string): Promise<string | null> {
    logger.log('getVideo', url);
    if (IS_ANDROID && url.startsWith('file://')) {
      // The URL is already a local file, so return it as is
      return url;
    }
    if (IS_IOS && url.startsWith('file://')) {
      // The URL is not a remote file, so return null
      let arr = url.split('/');
      const newfilepath = `${this.cacheDir}/${arr[arr.length - 1]}`;
      return newfilepath;
    }

    const filename = this.getFilenameFromURL(url);

    const localPath = `${this.cacheDir}/${filename}`;

    // Check if the video exists in the cache
    const exists = await fileManager.checkExistFile(localPath);
    if (exists) {
      // Video is in the cache, return the local path
      return localPath;
    }

    // Video is not in the cache, download and save it
    return this.downloadVideo(url, localPath);
  }

  private async downloadVideo(
    url: string,
    localPath: string
  ): Promise<string | null> {
    try {
      // Download the video from the network
      const response = await fileManager.downloadFile(url, localPath);

      if (response.info().status === 200) {
        // Video downloaded successfully, return the local path
        return localPath;
      } else {
        // Handle download failure
        return null;
      }
    } catch (error) {
      // Handle download error
      logger.error('Error downloading video:', error);
      return null;
    }
  }

  private getFilenameFromURL(url: string): string {
    // Extract the filename from the URL
    const segments = url.split('/');
    return segments[segments.length - 1];
  }
}

// const cacheManager = new VideoCacheManager();

// // To get a video from a URL
// cacheManager.getVideo('https://example.com/video.mp4').then((localPath) => {
//   if (localPath) {
//     logger.log('Video cached at:', localPath);
//     // Play the video from localPath
//   } else {
//     logger.log('Video download failed.');
//   }
// });
