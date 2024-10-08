import RNFetchBlob from 'react-native-blob-util';

export class VideoCacheManager {
  private cacheDir: string;

  constructor() {
    // Set the cache directory path
    this.cacheDir = RNFetchBlob.fs.dirs.DocumentDir + '/video_cache';
  }

  async getVideo(url: string): Promise<string | null> {
    if (url.startsWith('file://')) {
      // The URL is already a local file, so return it as is
      return url;
    }

    const filename = this.getFilenameFromURL(url);

    const localPath = `${this.cacheDir}/${filename}`;

    // Check if the video exists in the cache
    const exists = await RNFetchBlob.fs.exists(localPath);
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
      const response = await RNFetchBlob.config({
        path: localPath,
      }).fetch('GET', url);

      if (response.info().status === 200) {
        // Video downloaded successfully, return the local path
        return localPath;
      } else {
        // Handle download failure
        return null;
      }
    } catch (error) {
      // Handle download error
      console.error('Error downloading video:', error);
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
//     console.log('Video cached at:', localPath);
//     // Play the video from localPath
//   } else {
//     console.log('Video download failed.');
//   }
// });
