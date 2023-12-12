import type { Response } from '@bam.tech/react-native-image-resizer';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { Alert } from 'react-native';
// import { ImageFilter } from 'react-native-image-filter-kit';
export class ImageProcessor {
  private result: Response | undefined;

  constructor() {}
  public async resize(imageUri: string) {
    try {
      let result = await ImageResizer.createResizedImage(
        imageUri,
        256,
        256,
        'WEBP',
        100,
        0,
        undefined,
        false,
        {
          mode: 'stretch',
          onlyScaleDown: true,
        }
      );
      this.result = result;
      return this.result;
    } catch (error) {
      Alert.alert('Unable to resize the photo');
    }
  }
}
