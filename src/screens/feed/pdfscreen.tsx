import React from 'react';
import { Linking } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';

import { HEIGHT, WIDTH } from '@/ui';
import { openLinkInBrowser } from '@/core';

export const PDFExample = ({ route }: { route: any }) => {
  const { url } = route.params;

  const source = {
    uri: url,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        onPressLink={(uri) => {
          openLinkInBrowser(uri);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
  },
});
