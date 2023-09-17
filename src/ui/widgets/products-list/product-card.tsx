// import * as React from 'react';
// import { StyleSheet } from 'react-native';

// import { Image, Text, View } from '@/ui';
// import { AnimatedButton } from '@/ui/core/animated-button';

// import type { Product } from '../product-type';

// type Props = {
//   item: Product;
//   index: any;
// };
// export const ProductCardHorizontal = ({ item, index }: Props) => {
//   return (
//     <AnimatedButton
//       onClick={() => {
//         console.log(index);
//       }}
//     >
//       <View className="flex-column m-2 overflow-hidden">
//         <View className="h-56 w-full ">
//           <Image src={item.image} style={styles.image} resizeMode="cover" />
//         </View>
//         <Text variant="sm" className="font-bold text-slate-500">
//           {item.name}
//         </Text>
//         <Text variant="sm" numberOfLines={2} className=" text-slate-500">
//           {item.description}
//         </Text>
//         <Text variant="sm" className="font-bold text-slate-500 ">
//           Rs.{item.price}
//         </Text>
//       </View>
//     </AnimatedButton>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 20,
//   },
// });

// // import React from 'react';

// // import type { Post } from '@/api';
// // import { Image, Pressable, Text, View } from '@/ui';

// // type Props = Post & { onPress?: () => void };

// // export const Card = ({ title, body, onPress = () => {} }: Props) => {
// //   return (
// //     <Pressable
// //       className="m-2 block overflow-hidden rounded-xl  bg-neutral-200 p-2 shadow-xl dark:bg-charcoal-900"
// //       onPress={onPress}
// //     >
// //       <Image
// //         className="h-56 w-full object-cover "
// //         src={
// //           'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
// //         }
// //       />

// //       <View>
// //         <Text variant="md" numberOfLines={1} className="font-bold">
// //           {title}
// //         </Text>
// //         <Text variant="xs" numberOfLines={3}>
// //           {body}
// //         </Text>
// //       </View>
// //     </Pressable>
// //   );
// // };
