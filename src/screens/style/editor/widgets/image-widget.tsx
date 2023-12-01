/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { Stagger } from '@animatereactnative/stagger';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { useEditorX } from '@/core';
import { IconButton, IconButtonW, View, WIDTH } from '@/ui';

type Props3 = {
  handleRotationPress: (r: number) => void;
  handlePressMoveToCenter: () => void;
  handlePressMoveToPosition: ({ x, y }: { x: number; y: number }) => void;
};
export const ImageWidget = ({
  handleRotationPress,
  handlePressMoveToPosition,
  handlePressMoveToCenter,
}: Props3) => {
  const isSpecial = useEditorX((s) => s.isSpecial);
  const [rotationDegree, setRotationDegree] = useState(90);
  const [rM, setRM] = useState('contain');
  const [rC, setRC] = useState<boolean>(true);
  const [update, _setUpdate] = useState(1);
  const setData = useEditorX((s) => s.setViewStyle);
  const state = useEditorX((s) => s.selectedItem);
  const { navigate } = useNavigation();

  const setResizeMode = useEditorX((s) => s.setImageResizeMode);
  const rotateRight = () => {
    const newDegree = (rotationDegree + 90) % 360;
    setRotationDegree(newDegree);
    handleRotationPress(rotationDegree);
  };
  const handleResize = () => {
    switch (rM) {
      case 'contain':
        setRM('cover');
        break;
      case 'cover':
        setRM('stretch');
        break;
      case 'stretch':
        setRM('contain');
        break;
      default:
        setRM('stretch');
        break;
    }
  };
  const roundCorner = () => {
    setData({
      id: state,
      props: {
        borderRadius: rC ? 1000 : 0,
      },
    });
    setRC(!rC);
  };

  return (
    <Stagger
      key={`stagger-view-${update}`}
      stagger={50}
      duration={400}
      exitDirection={-1}
      style={{
        width: WIDTH,
      }}
    >
      <View className="flex-row flex-wrap justify-around">
        <IconButtonW
          icon={
            <MaterialCommunityIcons
              name="image-edit"
              size={24}
              color={'black'}
            />
          }
          onPress={() => {
            if (!isSpecial()) {
              navigate('ChangeImageModal');
            } else {
              navigate('InfoWidget');
            }
          }}
          title="change image"
          className="my-1"
        />
        <IconButtonW
          icon={
            <MaterialCommunityIcons
              name="image-filter-center-focus-weak"
              size={24}
              color={'black'}
            />
          }
          onPress={handlePressMoveToCenter}
          title="Center Image"
          className="my-1"
        />
        <IconButton
          icon={
            <MaterialCommunityIcons
              name="rotate-right"
              size={24}
              color={'black'}
            />
          }
          badgeValue={`${rotationDegree.toString()}deg`}
          onPress={rotateRight}
          title="Rotate"
          className="my-1"
        />
        <IconButton
          icon={
            <MaterialCommunityIcons
              name={rC ? 'circle' : 'square'}
              size={24}
              color={'black'}
            />
          }
          onPress={() => {
            roundCorner();
          }}
          title={rC ? 'Rounded' : 'Squared'}
          className="my-1"
        />
        <IconButton
          icon={
            <MaterialCommunityIcons name="resize" size={24} color={'black'} />
          }
          badgeValue={rM}
          onPress={() => {
            setResizeMode({ id: state, resizeMode: rM });
            handleResize();
          }}
          title="Resize Mode"
          className="my-1"
        />
        <IconButtonW
          icon={
            <MaterialCommunityIcons
              name="chevron-left-circle-outline"
              size={24}
              color={'black'}
            />
          }
          onPress={() => {
            handlePressMoveToPosition({ x: -5, y: 0 });
          }}
          title="Move Left"
          className="my-1"
        />
        <IconButtonW
          icon={
            <MaterialCommunityIcons
              name="chevron-right-circle-outline"
              size={24}
              color={'black'}
            />
          }
          onPress={() => {
            handlePressMoveToPosition({ x: 5, y: 0 });
          }}
          title="Move Right"
          className="my-1"
        />
        <IconButtonW
          icon={
            <MaterialCommunityIcons
              name="chevron-up-circle-outline"
              size={24}
              color={'black'}
            />
          }
          onPress={() => {
            handlePressMoveToPosition({ x: 0, y: -5 });
          }}
          title="Move Up"
          className="my-1"
        />
        <IconButtonW
          icon={
            <MaterialCommunityIcons
              name="chevron-down-circle-outline"
              size={24}
              color={'black'}
            />
          }
          onPress={() => {
            handlePressMoveToPosition({ x: 0, y: 5 });
          }}
          title="Move Down"
          className="my-1"
        />
      </View>
    </Stagger>
  );
};
