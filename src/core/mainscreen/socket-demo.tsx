/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import * as React from 'react';

import { Text, View } from '@/ui';

type Props = {};
const _SocketDemo = ({}: Props) => {
  const [serverMessages, setServerMessages] = React.useState<any>([]);

  var ws = React.useRef(new WebSocket('ws://192.168.0.8:8765/')).current;

  React.useEffect(() => {
    const serverMessagesList: any = [];
    ws.onopen = () => {
      console.log('connected to server');
    };
    ws.onclose = (_) => {
      console.log('disconnected to server');
    };
    ws.onerror = (e) => {
      console.log('error', e.message);
    };
    ws.onmessage = (e) => {
      console.log('message', e.data);

      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };
  }, []);
  const submitMessage = (mess: string) => {
    console.log('message sent');

    ws.send(mess);
  };

  return (
    <View className="flex-1">
      <Text
        className="font-kalam text-lg"
        onPress={() => submitMessage('hello2')}
      >
        Socket Message,
        {serverMessages.length > 0
          ? serverMessages.map((element) => `${element}`)
          : 'no message'}
      </Text>
    </View>
  );
};
