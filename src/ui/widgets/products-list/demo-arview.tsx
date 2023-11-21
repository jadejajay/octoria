import { createAssetAsync, usePermissions } from 'expo-media-library';
import React, { useCallback, useRef, useState } from 'react';
import { Button, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import WebView from 'react-native-webview';

const WebViewExample = () => {
  const [source, setSource] = useState(null);
  const [status, requestPermission] = usePermissions();

  const dimension = { width: '100%', height: '100%' };

  let viewShotRef = useRef<ViewShot>();

  const onCapture = useCallback((uri) => setSource({ uri }), []);

  const takeScreenshot = () => {
    viewShotRef.current.capture().then(async (uri) => {
      console.log(uri);

      if (status.accessPrivileges !== 'all') {
        await requestPermission();
      }
      await createAssetAsync(uri);
    });
  };

  return (
    <View style={{ marginTop: 40, flex: 1, display: 'flex' }}>
      <Button onPress={takeScreenshot} title="Take Screenshot" />
      <ViewShot ref={viewShotRef} onCapture={onCapture} style={dimension}>
        <WebView
          source={{
            uri: 'https://github.com/gre/react-native-view-shot/issues/278',
          }}
          style={{ position: 'relative' }}
          bounces={false}
        />
      </ViewShot>
    </View>
  );
};

WebViewExample.navigationOptions = {
  title: 'react-native-webview',
};

export { WebViewExample };
