import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';

import { CACHE_DIR, CACHE_IMAGE } from '@/types';

import { logger } from './logger';
export class FileManagement {
  public addToSession(sessionName: string, filePath: string): void {
    RNFetchBlob.session(sessionName).add(filePath);
  }
  public async checkExistFile(path: string) {
    return await RNFetchBlob.fs.exists(path);
  }
  public async downloadFile(url: string, path: string) {
    return await RNFetchBlob.config({ path, trusty: true }).fetch('GET', url);
  }
  public async readFile(path: string) {
    return await RNFetchBlob.fs.readFile(path, 'base64');
  }

  // Remove a file path from a session
  public listSessionPaths(sessionName: string): Promise<string[]> {
    return Promise.resolve(RNFetchBlob.session(sessionName).list());
  }
  public async checkAndCreateDir(path: string) {
    let dir =
      Platform.OS === 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir + path
        : RNFetchBlob.fs.dirs.SDCardDir + '/Octoria/' + path;

    try {
      let exists = await RNFetchBlob.fs.exists(dir);
      let isDir = await RNFetchBlob.fs.isDir(dir);
      if (!exists || !isDir) {
        await RNFetchBlob.fs.mkdir(dir);
      }
    } catch (e) {
      await RNFetchBlob.fs.mkdir(dir);
    }
    return dir;
  }

  // Remove all files in a session
  public disposeSessionFiles(sessionName: string): Promise<void> {
    return RNFetchBlob.session(sessionName).dispose();
  }
  public async deleteThumbnails() {
    await RNFetchBlob.fs
      .ls(CACHE_DIR)
      .then((files) => {
        files
          .filter((file) => file.startsWith(CACHE_IMAGE))
          .map(async (file) => {
            if (file) {
              const path = `${CACHE_DIR}/${file}`;
              await RNFetchBlob.fs.exists(path).then(async (exist) => {
                if (!exist) {
                  return `file does not exist====> ${file}`;
                }
                await RNFetchBlob.fs.unlink(path);
                return `cache deleted====> ${file.toString()}`;
              });
            }
          });
      })
      .catch((err) => logger.log(err));
  }
  public async copyFile(source: string, dest: string) {
    await RNFetchBlob.fs.cp(source, dest);
  }

  public async listAllFolder(path: string) {
    // list all files in the path
    await RNFetchBlob.fs.ls(path).then((files) => {
      // check if file is a directory
      files.forEach(async (file) => {
        await RNFetchBlob.fs.isDir(file).then((isDir) => {
          console.log(`${file} is a directory ? ${isDir}`);
        });
      });
    });
  }
}
