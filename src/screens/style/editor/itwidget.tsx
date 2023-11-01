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
import * as Animatable from 'react-native-animatable';

// import type { SharedValue } from 'react-native-reanimated';
import { useEditorX } from '@/core';
import { Image, Text, TouchableOpacity, View } from '@/ui';

type Props = {
  data: any;
  id: any;
  index: number;
  onClick?: () => void;
  // scale: SharedValue<any>;
  // isDragging: boolean;
};
export const ITWidget = ({
  data,
  id,
  index,
  onClick,
}: // scale,
// isDragging,
Props) => {
  const userInfo = useEditorX((s) => s.businessData);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [img, setImg] = useState('');
  const [txt, setTxt] = useState('');
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
  // const savedScale = useEditorX(
  //   (s) => s.editorData.elements[index]?.properties.scale
  // );

  const handlePress = () => {
    // Increment the key to trigger a re-render and restart the animation
    setAnimationKey(animationKey + 1);
    onClick?.();
  };
  return (
    <TouchableOpacity
      key={`anim_button_${index}`}
      onPress={handlePress}
      activeOpacity={1}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Animatable.View
        key={`ITWidget-${animationKey}-${index}`}
        animation="zoomIn"
        useNativeDriver={true}
        duration={800}
        style={{ flex: 1 }}
        {...data?.viewProps}
      >
        {img && (
          <Image
            key={`image_${index}`}
            src={img}
            style={{ width: '100%', height: '100%' }}
            resizeMode={data?.resizeMode ? data?.resizeMode : 'cover'}
          />
        )}
        {txt && (
          <View
            key={`animated-view-text_${index}`}
            className="h-full w-full items-center justify-center"
          >
            <Text key={`itwidget-text_${index}`} {...data?.textProps}>
              {txt}
            </Text>
          </View>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};
