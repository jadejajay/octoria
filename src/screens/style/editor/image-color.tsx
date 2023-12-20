// import * as React from 'react';

// import { useImageColorPickerStore } from '@/core';
// import { Image, Text, TouchableOpacity, View } from '@/ui';

// type Props = {};
// export const ImageColorPicker = ({}: Props) => {
//   const [position, setPosition] = React.useState({ x: 0, y: 0 });
//   const image = useImageColorPickerStore((s) => s.image);
//   return (
//     <View className="flex-1 justify-center">
//       <Text variant="sm" className="text-center">
//         {position.x}, {position.y}
//       </Text>
//       <TouchableOpacity
//         className="h-60 w-full"
//         onPress={(event) => {
//           setPosition({
//             x: event.nativeEvent.locationX,
//             y: event.nativeEvent.locationY,
//           });
//         }}
//       >
//         {image && (
//           <Image
//             src={`data:image/png;base64,${image}`}
//             onLoad={(e) => {
//               console.log(JSON.stringify(e.nativeEvent, null, 2));
//             }}
//             className="h-full w-full"
//             resizeMode="contain"
//           />
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };
