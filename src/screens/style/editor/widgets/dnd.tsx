/* eslint-disable max-lines-per-function */
/*
     -  .-.  :--:  .---.  .:  .-       -   -:  -  .: --:   ---:.:  .: --:  : .-  :. -   : 
    +* .##+ .@..*+ %+-:   *= -##-     :%  #*%  *++* +*.:@.:@--.-% -%.%*:: +* %%+.@ =%::*+ 
 .  @::@*## +*  #=:%--.. .@ -@+#*     #= ##+@  .@-  @: :@ **--  @=#  .-** @.:% %#* %=:-@. 
 =++- +. .* ++=+: =+==.=++:.+  .+  :++= +:  +. :+  .*=+=  *+==  ++  :+++.:+ -- .*..*  :+  
                                                                                          
*/
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import type { ForwardedRef } from 'react';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { useEditorX } from '@/core';
import { View } from '@/ui';

import { ITWidget } from './itwidget';

type Props = {
  index: number;
  isFocused: boolean;
  onClick: () => void;
};
const Magic = (props: Props, ref: ForwardedRef<any>) => {
  const [index, setIndex] = useState<number>(props.index);
  const isFocused = props.isFocused;
  const deleteElement = useEditorX((s) => s.deleteElement);
  const copyElement = useEditorX((s) => s.copyElement);
  const setData = useEditorX((s) => s.setData);
  const data = useEditorX((s) => s.editorData.elements[index]?.properties);
  const dataId = useEditorX((s) => s.editorData.elements[index]?.id);
  const sFrame = useEditorX((s) => s.editorData.frame);
  const soffset = useEditorX(
    (s) => s.editorData.elements[index]?.properties?.offset
  );
  const swidth = useEditorX(
    (s) => s.editorData.elements[index]?.properties?.width
  );
  const sheight = useEditorX(
    (s) => s.editorData.elements[index]?.properties?.height
  );
  const srotation = useEditorX(
    (s) => s.editorData.elements[index]?.properties?.rotation
  );
  const sFontSize = useEditorX(
    (s) => s.editorData.elements[index]?.properties?.textProps?.style?.fontSize
  );
  const offset = useSharedValue(soffset);
  const start = useSharedValue(soffset);
  const width = useSharedValue(swidth);
  const savedWidth = useSharedValue(swidth);
  const savedHeight = useSharedValue(sheight);
  const height = useSharedValue(sheight);
  const rotation = useSharedValue(srotation);
  const savedRotation = useSharedValue(srotation);
  const fontSize = useSharedValue(sFontSize);
  const savedFontSize = useSharedValue(sFontSize);

  useEffect(() => {
    offset.value = withTiming(soffset, { duration: 0 });
    start.value = withTiming(soffset, { duration: 0 });
    width.value = withTiming(swidth, { duration: 0 });
    savedWidth.value = withTiming(swidth, { duration: 0 });
    height.value = withTiming(sheight, { duration: 0 });
    savedHeight.value = withTiming(sheight, { duration: 0 });
    rotation.value = withTiming(srotation, { duration: 0 });
    savedRotation.value = withTiming(srotation, { duration: 0 });
    fontSize.value = withTiming(sFontSize, { duration: 0 });
    savedFontSize.value = withTiming(sFontSize, { duration: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sFrame]);

  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { rotateZ: `${rotation.value}rad` },
      ],
    };
  });
  const rotateToDegree = useCallback((degree: any) => {
    const radians = (degree * Math.PI) / 180; // Convert degrees to radians
    rotation.value = withTiming(radians);
    savedRotation.value = withTiming(radians, { duration: 0 });
    setData({ id: props.index, props: { rotation: radians } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const moveToCenter = useCallback(() => {
    offset.value = withTiming({ x: 0, y: 0 });
    setData({ id: props.index, props: { offset: { x: 0, y: 0 } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const moveToPosition = useCallback(({ x, y }: { x: number; y: number }) => {
    offset.value = withTiming(
      { x: offset.value.x + x, y: offset.value.y + y },
      { duration: 100 }
    );
    setData({ id: props.index, props: { offset: { x: x, y: y } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      rotateToDegree,
      moveToCenter,
      moveToPosition,
    }),
    [rotateToDegree, moveToCenter, moveToPosition]
  );
  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      if (isFocused) {
        offset.value = {
          x: e.translationX + start.value.x,
          y: e.translationY + start.value.y,
        };
      }
    })
    .onEnd(() => {
      if (isFocused) {
        start.value = {
          x: offset.value.x,
          y: offset.value.y,
        };
        runOnJS(setData)({
          id: props.index,
          props: { offset: { x: offset.value.x, y: offset.value.y } },
        });
      }
    });
  const zoomGesture = Gesture.Pinch()
    .onUpdate((event) => {
      if (isFocused) {
        height.value = savedHeight.value * event.scale;
        width.value = savedWidth.value * event.scale;
        fontSize.value = height.value * 0.67 - 5;
      }
    })
    .onEnd(() => {
      if (isFocused) {
        savedHeight.value = height.value;
        savedWidth.value = width.value;
        savedFontSize.value = fontSize.value;
        runOnJS(setData)({
          id: props.index,
          props: {
            width: width.value,
            height: height.value,
            textProps: { style: { fontSize: fontSize.value } },
          },
        });
      }
    });
  const rotateGesture = Gesture.Rotation()
    .onUpdate((event) => {
      if (isFocused) {
        rotation.value = savedRotation.value + event.rotation;
      }
    })
    .onEnd(() => {
      if (isFocused) {
        savedRotation.value = rotation.value;
        runOnJS(setData)({
          id: props.index,
          props: { rotation: rotation.value },
        });
      }
    });
  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture)
  );
  const haptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  const pan3 = Gesture.Pan()
    .averageTouches(true)
    .onBegin(() => {
      runOnJS(haptic)();
    })
    .onUpdate((e) => {
      const angle = -savedRotation.value * (Math.PI / 180); // Convert degrees to radians
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      width.value += e.x * cos + e.y * sin;
      height.value += e.y * cos - e.x * sin;
      fontSize.value = height.value * 0.67 - 5;
    })
    .onEnd((_) => {
      savedHeight.value = height.value;
      savedWidth.value = width.value;
      savedFontSize.value = fontSize.value;
      runOnJS(setData)({
        id: props.index,
        props: {
          height: height.value,
          width: width.value,
          textProps: { style: { fontSize: fontSize.value } },
        },
      });
    });
  return (
    <>
      {isFocused && (
        <Animated.View style={[animatedStyles, styles.container2]}>
          <View
            className="absolute -top-10 right-1 z-50 w-16 flex-row items-center justify-between rounded-full bg-white p-1"
            style={[styles.shadow]}
          >
            <MaterialCommunityIcons
              onPress={() => {
                copyElement(props.index);
              }}
              name="content-copy"
              size={13}
              color="black"
            />
            <MaterialCommunityIcons
              onPress={() => {
                width.value = withTiming(0, { duration: 0 });
                height.value = withTiming(0, { duration: 0 });
                deleteElement(props.index);
                props.onClick();
              }}
              name="trash-can-outline"
              size={15}
              color="black"
            />
          </View>
        </Animated.View>
      )}
      <GestureDetector gesture={composed}>
        <Animated.View style={[animatedStyles, styles.container]}>
          {isFocused && (
            <>
              <GestureDetector gesture={pan3}>
                <Animated.View style={[styles.bottomRightTip]} />
              </GestureDetector>
              <View style={styles.boundary} />
            </>
          )}
          <ITWidget
            id={dataId}
            fontSize={fontSize}
            data={data}
            index={props.index}
            onClick={props.onClick}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 4,
    backgroundColor: 'transparent',
  },
  container2: {
    padding: 4,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#fff',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  boundary: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    zIndex: 1000,
    overflow: 'hidden',
    position: 'absolute',
    borderStyle: 'dashed',
    borderColor: '#fff',
    backgroundColor: '#0004',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomTip: {
    position: 'absolute',
    bottom: -7,
    height: 10,
    width: 40,
    zIndex: 1000,
    overflow: 'hidden',
    alignItems: 'center',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: '#fff',
  },
  rightTip: {
    position: 'absolute',
    right: -7,
    height: 40,
    width: 10,
    zIndex: 1000,
    justifyContent: 'center',
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  bottomRightTip: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    height: 20,
    width: 20,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    overflow: 'hidden',
    zIndex: 1000,
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },
});

export default forwardRef(Magic);
