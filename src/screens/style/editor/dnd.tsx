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
  const sscale = useEditorX(
    (s) => s.editorData.elements[index]?.properties.scale
  );
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
  const offset = useSharedValue(soffset);
  const start = useSharedValue(soffset);
  const scale = useSharedValue(sscale);
  const width = useSharedValue(swidth);
  const savedWidth = useSharedValue(swidth);
  const savedHeight = useSharedValue(sheight);
  const height = useSharedValue(sheight);
  const savedScale = useSharedValue(sscale);
  const rotation = useSharedValue(srotation);
  const savedRotation = useSharedValue(srotation);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    offset.value = withTiming(soffset, { duration: 0 });
    start.value = withTiming(soffset, { duration: 0 });
    scale.value = withTiming(sscale, { duration: 0 });
    savedScale.value = withTiming(sscale, { duration: 0 });
    width.value = withTiming(swidth, { duration: 0 });
    savedWidth.value = withTiming(swidth, { duration: 0 });
    height.value = withTiming(sheight, { duration: 0 });
    savedHeight.value = withTiming(sheight, { duration: 0 });
    rotation.value = withTiming(srotation, { duration: 0 });
    savedRotation.value = withTiming(srotation, { duration: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sFrame]);

  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value * scale.value,
      height: height.value * scale.value,
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
    offset.value = withTiming({ x: offset.value.x + x, y: offset.value.y + y });
    setData({ id: props.index, props: { offset: { x: x, y: y } } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getState = useCallback(
    () => ({
      index: index,
      offset: offset.value,
      start: start.value,
      scale: scale.value,
      width: width.value,
      height: height.value,
      rotation: rotation.value,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // const setState = useCallback((state: ElementProperties) => {
  //   // sOffset = {
  //   //   x: newValue(state.offset.x),
  //   //   y: state.offset.y,
  //   // };
  //   offset.value = withTiming(state.offset, { duration: 0 });
  //   start.value = withTiming(state.offset, { duration: 0 });
  //   scale.value = withTiming(state.scale, { duration: 0 });
  //   savedScale.value = withTiming(state.scale, { duration: 0 });
  //   width.value = withTiming(state.width, { duration: 0 });
  //   savedWidth.value = withTiming(state.width, { duration: 0 });
  //   height.value = withTiming(state.height, { duration: 0 });
  //   savedHeight.value = withTiming(state.height, { duration: 0 });
  //   rotation.value = withTiming(state.rotation, { duration: 0 });
  //   savedRotation.value = withTiming(state.rotation, { duration: 0 });
  //   setData({
  //     id: props.index,
  //     props: {
  //       offset: state.offset,
  //       scale: state.scale,
  //       width: state.width,
  //       height: state.height,
  //       rotation: state.rotation,
  //     },
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useImperativeHandle(
    ref,
    () => ({
      rotateToDegree,
      moveToCenter,
      getState,
      moveToPosition,
      // setState,
    }),
    [rotateToDegree, moveToCenter, getState, moveToPosition]
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
    .onStart(() => {
      runOnJS(setIsDragging)(true);
    })
    .onUpdate((event) => {
      if (isFocused) {
        scale.value = savedScale.value * event.scale;
      }
    })
    .onEnd(() => {
      if (isFocused) {
        savedScale.value = scale.value;
        runOnJS(setData)({ id: props.index, props: { scale: scale.value } });
      }
      runOnJS(setIsDragging)(false);
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
  const pan2 = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => runOnJS(haptic)())
    .onUpdate((e) => {
      const angle = -savedRotation.value * (Math.PI / 180); // Convert degrees to radians
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      height.value += e.y * cos - e.x * sin;
    })
    .onEnd((_) => {
      savedHeight.value = height.value;
      runOnJS(setData)({ id: props.index, props: { height: height.value } });
    });
  const pan3 = Gesture.Pan()
    .averageTouches(true)
    .onStart(() => {
      runOnJS(haptic)();
    })
    .onUpdate((e) => {
      const angle = -savedRotation.value * (Math.PI / 180); // Convert degrees to radians
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      width.value += e.x * cos + e.y * sin;
      height.value += e.y * cos - e.x * sin;
    })
    .onEnd((_) => {
      savedHeight.value = height.value;
      savedWidth.value = width.value;
      runOnJS(setData)({
        id: props.index,
        props: { height: height.value, width: width.value },
      });
    });
  const pan4 = Gesture.Pan()
    .averageTouches(true)
    .onBegin(() => runOnJS(haptic)())
    .onUpdate((e) => {
      const angle = -savedRotation.value * (Math.PI / 180); // Convert degrees to radians
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      width.value += e.x * cos + e.y * sin;
    })
    .onEnd((_) => {
      savedWidth.value = width.value;
      runOnJS(setData)({ id: props.index, props: { width: width.value } });
    });
  return (
    <>
      {isFocused && (
        <Animated.View
          key={`tool-${index}`}
          style={[animatedStyles, styles.container2]}
        >
          <View
            key={`dnd-shadow-tool-${index}`}
            className="absolute -top-10 right-1 z-50 w-16 flex-row items-center justify-between rounded-full bg-white p-1"
            style={[styles.shadow]}
          >
            <MaterialCommunityIcons
              key={`dnd-shadow-tool-button1-${index}`}
              onPress={() => {
                copyElement(props.index);
              }}
              name="content-copy"
              size={13}
              color="black"
            />
            <MaterialCommunityIcons
              key={`dnd-shadow-tool-button2-${index}`}
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
          <GestureDetector gesture={pan2}>
            <Animated.View
              key={`dnd-shadow-tool-button3-${index}`}
              style={[styles.bottomTip]}
            >
              <MaterialCommunityIcons
                name="drag-horizontal"
                size={16}
                color="white"
              />
            </Animated.View>
          </GestureDetector>
          <GestureDetector gesture={pan4}>
            <Animated.View
              key={`dnd-shadow-tool-button4-${index}`}
              style={[styles.rightTip]}
            >
              <MaterialCommunityIcons
                name="drag-vertical"
                size={16}
                color="white"
              />
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      )}

      <GestureDetector key={`composed-${index}`} gesture={composed}>
        <Animated.View
          key={`dnd-view-animated-${index}`}
          style={[animatedStyles, styles.container]}
        >
          {isFocused && (
            <>
              <GestureDetector key={`border-gesture-${index}`} gesture={pan3}>
                <Animated.View
                  key={`dnd-view2-animated-${index}`}
                  style={[styles.bottomRightTip]}
                />
              </GestureDetector>
              <View
                key={`dnd-view3-animated-${index}`}
                style={styles.boundary}
              />
            </>
          )}

          <ITWidget
            id={dataId}
            key={`ITWidget-gesture-${index}`}
            data={data}
            index={props.index}
            onClick={props.onClick}
            scale={scale}
            isDragging={isDragging}
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
    borderColor: '#0284c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    padding: 4,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#0284c7',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  boundary: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'absolute',
    borderStyle: 'dashed',
    borderColor: '#0284c7',
    backgroundColor: '#0284c733',
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
    overflow: 'hidden',
    alignItems: 'center',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: '#0284c7',
  },
  rightTip: {
    position: 'absolute',
    right: -7,
    height: 40,
    width: 10,
    justifyContent: 'center',
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#0284c7',
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
    backgroundColor: 'transparent',
    borderColor: '#0284c7',
  },
});

export default forwardRef(Magic);
