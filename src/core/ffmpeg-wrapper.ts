import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from 'ffmpeg-kit-react-native';
import RNFetchBlob from 'react-native-blob-util';

import { showErrorMessage, showSuccessMessage } from '@/ui';

import { logger } from './logger';
import { isVideoURL } from './utils';

const dirs = RNFetchBlob.fs.dirs.DocumentDir;
export class FFmpegWrapper {
  outputFile = `${dirs}/OCTORIA`;

  async executeFFmpegCommand(command: string): Promise<number> {
    try {
      const session = await FFmpegKit.execute(`-y -hide_banner ${command}`);
      const returnCode = await session.getReturnCode();

      if (ReturnCode.isSuccess(returnCode)) {
        const logs = await session.getOutput();
        logger.log('Logs:', logs);
        return 1;
      } else if (ReturnCode.isCancel(returnCode)) {
        logger.error('FFmpeg command canceled:', command);
        return 2;
      } else {
        const logs = await session.getOutput();
        logger.error('FFmpeg command failed:', command);
        logger.error('Logs:', logs);
        return 0;
      }
    } catch (error) {
      logger.error('Error executing FFmpeg command:', error);
      return 0;
    }
  }
  async combineVideoImage({
    dwnVideo,
    renderedAsset,
    resolution,
    ext,
  }: {
    dwnVideo: string;
    renderedAsset: string;
    resolution: number;
    ext: string;
  }): Promise<string | false> {
    logger.log('dwnVideo', dwnVideo);
    logger.log('renderedAsset', renderedAsset);
    logger.log('resolution', resolution);
    logger.log('ext', ext);
    var temp = `${this.outputFile}.${ext}`;
    const cmd = `-i ${dwnVideo} -i ${renderedAsset} -filter_complex "[0:v]scale=${resolution}:${resolution} [video]; [video][1:v]overlay=0:0 [output]" -map 0:a -c:a copy -map 0:a -strict -2 -c:a aac -map "[output]" -q:v 1 ${temp}`;
    const result = await this.executeFFmpegCommand(cmd);
    temp = `file://${this.outputFile}`;
    if (result === 1) {
      showSuccessMessage('render.succ_video');
      return temp;
    } else if (result === 2) {
      showErrorMessage('render.proc_canceled');
      return false;
    } else {
      showErrorMessage('render.failed_video');
      return false;
    }
  }
  Logs(callback: (progress: React.SetStateAction<number>) => void) {
    let totalFrames = 0;
    FFmpegKitConfig.enableLogCallback((log) => {
      let message = log.getMessage();
      logger.log(message);
      if (message.startsWith('frame=')) {
        const progressMatch = /frame=(\s*\d+)\s+fps=/.exec(message as string);
        if (progressMatch) {
          const frame = parseInt(progressMatch[1], 10);
          if (!isNaN(frame)) {
            if (totalFrames === 0) {
              // Determine the total number of frames (first frame message)
              totalFrames = frame;
            } else {
              // Calculate and update the progress state variable
              const completionPercentage = Math.round(
                (frame / totalFrames) * 100
              );
              callback(completionPercentage);
            }
          }
        }
      }
    });
  }
  async applyFilter({
    dwnimage,
    filter,
    ext,
  }: {
    dwnimage: string;
    filter: string;
    ext: string;
  }): Promise<string | false> {
    logger.log('dwnVideo', dwnimage);
    logger.log('filter', filter);
    logger.log('ext', ext);
    var temp = `${this.outputFile}_${Date.now()}.${ext}`;
    const cmd = `-i ${dwnimage} ${filter} -c:v png ${temp}`;
    const result = await this.executeFFmpegCommand(cmd);
    if (result === 1) {
      return temp;
    } else {
      return false;
    }
  }

  async getImageBase64(uri: string): Promise<string | null> {
    logger.log('uri', uri);
    try {
      const response = await RNFetchBlob.fs.readFile(uri, 'base64');
      return response;
    } catch (error) {
      logger.error('Error reading file as base64:', error);
      return null;
    }
  }
  cancel(renderedAsset?: string) {
    if (renderedAsset) {
      isVideoURL(renderedAsset) && this.deleteFile(renderedAsset);
    }
    FFmpegKit.cancel();
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      await RNFetchBlob.fs.unlink(filePath);
      logger.log('File deleted:', filePath);
    } catch (error) {
      logger.error('Error deleting file:', error);
    }
  }

  async deleteCacheFiles(): Promise<void> {
    try {
      const files = await RNFetchBlob.fs.ls(dirs);
      for (const file of files) {
        const filePath = `${dirs}/${file}`;
        await this.deleteFile(filePath);
      }
      logger.log('Cache files deleted.');
    } catch (error) {
      logger.error('Error deleting cache files:', error);
    }
  }
}
