import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
export class FileManagement {
  public addToSession(sessionName: string, filePath: string): void {
    RNFetchBlob.session(sessionName).add(filePath);
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
  //RNFetchBlob.fs.isDir(path);
  public listAllFolder(path: string) {
    // list all files in the path
    RNFetchBlob.fs.ls(path).then((files) => {
      // check if file is a directory
      files.forEach((file) => {
        RNFetchBlob.fs.isDir(file).then((isDir) => {
          console.log(`${file} is a directory ? ${isDir}`);
        });
      });
    });
  }
}
