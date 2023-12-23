/* eslint-disable max-lines-per-function */
/* eslint-disable react-native/no-inline-styles */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import * as React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, ZoomIn } from 'react-native-reanimated';

import { useEditorX } from '@/core';
import { Image, View } from '@/ui';

type Props = {
  data: any;
  id: any;
  index: number;
  onClick?: () => void;
  fontSize: any;
};
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export const ITWidget = ({ data, id, index, onClick, fontSize }: Props) => {
  const userInfo = useEditorX((s) => s.businessData);
  const frame = useEditorX((s) => s.editorData.frame);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [img, setImg] = useState('');
  const [txt, setTxt] = useState('');
  const animatedFontSize = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
      lineHeight: fontSize.value * 1.35,
    };
  });
  React.useEffect(() => {
    switch (id) {
      case 'user_name':
        setTxt(userInfo.name);
        break;
      case 'user_photo':
        setImg(userInfo.photo);
        break;
      case 'user_email':
        setTxt(userInfo.email);
        break;
      case 'user_phone':
        setTxt(userInfo.phone);
        break;
      case 'user_website':
        setTxt(userInfo.website);
        break;
      case 'user_address':
        setTxt(userInfo.address);
        break;
      default:
        if (data?.image) {
          setImg(data?.image);
        }
        if (data?.text) {
          setTxt(data?.text);
        }
        break;
    }
  }, [
    data?.image,
    data?.text,
    id,
    userInfo.address,
    userInfo.email,
    userInfo.name,
    userInfo.phone,
    userInfo.photo,
    userInfo.website,
  ]);

  const handlePress = () => {
    setAnimationKey(animationKey + 1);
    onClick?.();
  };
  return (
    <View
      style={[
        {
          width: '100%',
          height: '100%',
        },
        data?.viewProps?.style,
      ]}
    >
      <AnimatedTouchable
        // key={`${animationKey}-it`}
        key={`ITWidget-${animationKey}-${index}-${txt}-${img}-${frame}--${data?.resizeMode}-${data?.text}-${userInfo.name}-${userInfo.photo}-${userInfo.email}-${userInfo.phone}-${userInfo.website}-${userInfo.address}`}
        activeOpacity={1}
        onPress={handlePress}
        entering={ZoomIn}
        useNativeDriver={true}
        duration={800}
        {...data?.viewProps}
      >
        {img && (
          <Image
            src={img}
            style={{ width: '100%', height: '100%' }}
            resizeMode={data?.resizeMode || 'cover'}
          />
        )}
        {txt && (
          <View className="h-full w-full">
            <Animated.Text
              useNativeDriver={true}
              onPress={handlePress}
              {...data?.textProps}
              style={[animatedFontSize, data?.textProps?.style]}
            >
              {txt}
            </Animated.Text>
          </View>
        )}
      </AnimatedTouchable>
    </View>
  );
};
