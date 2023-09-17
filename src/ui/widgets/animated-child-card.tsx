// /* eslint-disable max-lines-per-function */
// /* eslint-disable react-native/no-inline-styles */
// import { MaterialIcons } from '@expo/vector-icons';
// import { useIsFocused } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useEffect } from 'react';
// import { FlatList, StyleSheet } from 'react-native';
// import * as Animated from 'react-native-animatable';

// import { Image, Text, TouchableOpacity, View } from '@/ui';

// import { AnimatedButton } from '../core/animated-button';

// export const Categories = () => {
//   const [data, setData] = React.useState([]);
//   const isFocused = useIsFocused();
//   useEffect(() => {
//     // Make the Axios request to your PHP file
//     try {
//       axios
//         .get(
//           'http://itekindia.com/IBAIS/products/Main Category/main-categories.php'
//         )
//         .then((response) => {
//           // Print the content of the JSON response
//           setData(response.data);
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }, [isFocused]);
//   const renderItem = ({ item, index }: { item: any; index: any }) => {
//     return (
//       <AnimatedButton onClick={() => {}}>
//         <Animated.View
//           animation="slideInRight"
//           delay={(index + 1) * 200}
//           useNativeDriver
//           style={[styles.card, { backgroundColor: '#83b4be' }]}
//         >
//           <View className="flex-1 items-center justify-center">
//             <Image
//               src={item.image}
//               style={{ width: '100%', height: '100%', borderRadius: 14 }}
//             />
//           </View>
//           {/* <View className="absolute  bottom-0 left-0 bg-transparent">
//             <LinearGradient
//               colors={['#0000', '#0005']}
//               style={{ height: 75, width: 75, borderRadius: 14 }}
//             />
//           </View>

//           <Text
//             className="absolute bottom-1 left-1 font-ssbold leading-3 text-white"
//             style={{ fontSize: 10, width: 70 }}
//             numberOfLines={2}
//           >
//             {item.title}
//           </Text> */}
//         </Animated.View>
//       </AnimatedButton>
//     );
//   };

//   return (
//     <View className="flex-column  mt-5">
//       <View
//         style={{
//           margin: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'baseline',
//         }}
//       >
//         <Text className="font-ssbold text-xl">Categories</Text>
//         <TouchableOpacity className="flex-row items-center" onPress={() => {}}>
//           <Text className="font-ssbold mx-1">more</Text>
//           <MaterialIcons name="keyboard-arrow-right" size={28} />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={data}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     paddingHorizontal: 8,
//   },
//   card: {
//     margin: 8,
//     borderRadius: 14,
//     backgroundColor: '#fff',
//     elevation: 4,
//     width: 75,
//     height: 75,
//   },
// });
