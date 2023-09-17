// import React from 'react';
// import { Animated, StyleSheet, Text, View } from 'react-native';
// import { Dimensions } from 'react-native';

// import {
//   PanGestureHandler,
//   PinchGestureHandler,
//   RotationGestureHandler,
//   State,
// } from 'react-native-gesture-handler';

// const { width, height } = Dimensions.get('window');

// const stateLabel = {
//   0: 'UNDETERMINED',
//   1: 'FAILED',
//   2: 'BEGAN',
//   3: 'CANCELLED',
//   4: 'ACTIVE',
//   5: 'END',
// };

// export class PinchableBox extends React.Component {
//   panRef = React.createRef();
//   rotationRef = React.createRef();
//   pinchRef = React.createRef();
//   constructor(props) {
//     super(props);
//     this.props.image = props.image;
//     this.props.ref = props.ref;

//     /* Pinching */
//     this._baseScale = new Animated.Value(1);
//     this._pinchScale = new Animated.Value(1);
//     this._scale = Animated.multiply(this._baseScale, this._pinchScale);
//     this._lastScale = 1;
//     this._onPinchGestureEvent = Animated.event(
//       [{ nativeEvent: { scale: this._pinchScale } }],
//       { useNativeDriver: true }
//     );

//     /* Rotation */
//     this._rotate = new Animated.Value(0);
//     this._rotateStr = this._rotate.interpolate({
//       inputRange: [-100, 100],
//       outputRange: ['-100rad', '100rad'],
//     });
//     this._lastRotate = 0;
//     this._onRotateGestureEvent = Animated.event(
//       [{ nativeEvent: { rotation: this._rotate } }],
//       { useNativeDriver: true }
//     );

//     /* Pan */
//     this._translateX = new Animated.Value(0);
//     this._translateY = new Animated.Value(0);
//     this._lastOffset = { x: 0, y: 0 };
//     this._onPanGestureEvent = Animated.event(
//       [
//         {
//           nativeEvent: {
//             translationX: this._translateX,
//             translationY: this._translateY,
//           },
//         },
//       ],
//       { useNativeDriver: true }
//     );

//     this.state = {
//       rotateStatus: null,
//       pinchStatus: null,
//       panStatus: null,
//     };
//   }

//   _onRotateHandlerStateChange = (event) => {
//     this.setState({
//       rotateStatus:
//         stateLabel[event.nativeEvent.oldState] +
//         ' => ' +
//         stateLabel[event.nativeEvent.state],
//     });
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       this._lastRotate += event.nativeEvent.rotation;
//       this._rotate.setOffset(this._lastRotate);
//       this._rotate.setValue(0);
//     }
//   };
//   _onPinchHandlerStateChange = (event) => {
//     this.setState({
//       pinchStatus:
//         stateLabel[event.nativeEvent.oldState] +
//         ' => ' +
//         stateLabel[event.nativeEvent.state],
//     });
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       this._lastScale *= event.nativeEvent.scale;
//       this._baseScale.setValue(this._lastScale);
//       this._pinchScale.setValue(1);
//     }
//   };
//   _onPanGestureStateChange = (event) => {
//     this.setState({
//       panStatus:
//         stateLabel[event.nativeEvent.oldState] +
//         ' => ' +
//         stateLabel[event.nativeEvent.state],
//     });
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       this._lastOffset.x += event.nativeEvent.translationX;
//       this._lastOffset.y += event.nativeEvent.translationY;
//       this._translateX.setOffset(this._lastOffset.x);
//       this._translateX.setValue(0);
//       this._translateY.setOffset(this._lastOffset.y);
//       this._translateY.setValue(0);
//     }
//   };

//   render() {
//     return (
//       <View
//         style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
//         ref={this.props.ref}
//       >
//         <PanGestureHandler
//           ref={this.panRef}
//           onGestureEvent={this._onPanGestureEvent}
//           onHandlerStateChange={this._onPanGestureStateChange}
//         >
//           <Animated.View style={[styles.wrapper]}>
//             <RotationGestureHandler
//               ref={this.rotationRef}
//               simultaneousHandlers={this.pinchRef}
//               onGestureEvent={this._onRotateGestureEvent}
//               onHandlerStateChange={this._onRotateHandlerStateChange}
//             >
//               <Animated.View style={[styles.wrapper]}>
//                 <PinchGestureHandler
//                   ref={this.pinchRef}
//                   simultaneousHandlers={this.rotationRef}
//                   onGestureEvent={this._onPinchGestureEvent}
//                   onHandlerStateChange={this._onPinchHandlerStateChange}
//                 >
//                   <Animated.View style={[styles.container]} collapsable={false}>
//                     <Text>{'dfjhu'}</Text>
//                     <Animated.Image
//                       style={[
//                         styles.pinchableImage,
//                         {
//                           transform: [
//                             { translateX: this._translateX },
//                             { translateY: this._translateY },
//                             { scale: this._scale },
//                             { rotate: this._rotateStr },
//                           ],
//                         },
//                       ]}
//                       source={{
//                         uri: 'http://itekindia.com/IBAIS/products/Main%20Category/Bathroom.jpg',
//                       }}
//                     />
//                   </Animated.View>
//                 </PinchGestureHandler>
//               </Animated.View>
//             </RotationGestureHandler>
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     );
//   }
// }
// export default PinchableBox;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     overflow: 'hidden',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pinchableImage: {
//     position: 'absolute',
//     width: 200,
//     height: 200,
//     resizeMode: 'contain',
//   },
//   wrapper: {
//     width: width,
//     height: height,
//   },
// });
