// /* eslint-disable react/react-in-jsx-scope */
// import { useState } from 'react';
// import { Modal, StyleSheet } from 'react-native';

// import { invertColor } from '@/core';
// import { Button, View } from '@/ui';

// import { ColorPicker } from './colorpicker';

// interface Props {
//   Color?: string;
//   isModalVisible: boolean;
//   SetModalVisible: (visible: boolean) => void;
//   onPress?: (color: string) => void;
// }
// export const ColorPickerModal = ({
//   Color = '#000000',
//   isModalVisible,
//   SetModalVisible,
//   onPress = () => {},
// }: Props) => {
//   const [color, setColor] = useState<string>(Color);
//   const handlePress = () => {
//     SetModalVisible(false);
//     onPress(color);
//   };
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={isModalVisible}
//       onRequestClose={() => SetModalVisible(false)}
//     >
//       <View className="flex-1 items-center justify-center">
//         <View
//           className="h-5/6 w-11/12"
//           style={[styles.container, { backgroundColor: color }]}
//         >
//           <ColorPicker
//             color={color}
//             thumbSize={40}
//             sliderSize={40}
//             noSnap={true}
//             row={false}
//             // discrete
//             onColorChange={(color2: any) => setColor(color2)}
//             onColorChangeComplete={(color2: any) => setColor(color2)}
//           />
//           <Button
//             label="Use This Color 🤩"
//             textColor={color}
//             style={[
//               styles.button,
//               { backgroundColor: `${invertColor(color)}` },
//             ]}
//             onPress={handlePress}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   button: {
//     marginTop: 20,
//   },
// });
