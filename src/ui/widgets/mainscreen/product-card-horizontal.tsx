// import { useNavigation } from '@react-navigation/native';
// import * as React from 'react';
// import { memo } from 'react';
// import { StyleSheet } from 'react-native';

// import type { Product } from '@/types';
// import { AnimatedButton, Image, Text, View } from '@/ui/core';

// type Props = {
//   item: Product;
//   index: any;
// };

// export const ProductCardHorizontal = memo(({ item }: Props) => {
//   const navigation = useNavigation();
//   return (
//     <AnimatedButton
//       onClick={() => {
//         //@ts-ignore
//         navigation.navigate('Post', { id: item.id });
//       }}
//     >
//       <View className="flex-column m-2 overflow-hidden ">
//         <View className="h-56 w-full ">
//           <Image
//             src={item?.images[0]}
//             style={styles.image}
//             resizeMode="cover"
//           />
//         </View>
//         <Text variant="sm" className="font-bold text-slate-500">
//           {item?.name}
//         </Text>
//         {item?.description && (
//           <Text variant="sm" numberOfLines={2} className=" text-slate-500">
//             {item?.description}
//           </Text>
//         )}
//       </View>
//     </AnimatedButton>
//   );
// });

// const styles = StyleSheet.create({
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 20,
//   },
//   button: {
//     width: '100%',
//     padding: '100%',
//   },
// });
