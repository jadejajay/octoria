import React from 'react';
import { Linking } from 'react-native';
import { Dimensions, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';

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
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          Linking.openURL(uri);
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
