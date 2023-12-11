// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable max-lines-per-function */
// import { zodResolver } from '@hookform/resolvers/zod';
// import auth from '@react-native-firebase/auth';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Image } from 'react-native';
// import { showMessage } from 'react-native-flash-message';
// import { z } from 'zod';

// import {
//   ActivityIndicator,
//   Button,
//   ControlledInput,
//   ReversibleCountdownButton,
//   VerifCode,
//   View,
// } from '@/ui';

// const schema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// type FormType = z.infer<typeof schema>;
// export const EmailLoginForm = () => {
//   const [confirm, setConfirm] = useState<any>();
//   const { handleSubmit, control } = useForm<FormType>({
//     resolver: zodResolver(schema),
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   async function signInWithPhoneNumber(data: FormType) {
//     try {
//       setIsLoading(true);
//       // const confirmation = await auth().createUserWithEmailAndPassword(
//       //   data.email,
//       //   data.password
//       // );
//       const confirmation = await auth().sendSignInLinkToEmail(data.email);
//       setConfirm(confirmation);
//       setIsLoading(false);
//       showMessage({
//         icon: 'success',
//         message: `Email send successfully`,
//         duration: 2000,
//       });
//     } catch (error) {
//       setIsLoading(false);
//       showMessage({
//         icon: 'danger',
//         message: `Invalid credentials,${error}`,
//         duration: 2000,
//       });
//     }
//   }
//   async function onOtpConfirm(code: any) {
//     try {
//       setIsLoading(true);
//       await confirm.confirm(code);
//       setIsLoading(false);

//       showMessage({
//         icon: 'success',
//         message: 'Login Successful',
//         duration: 1000,
//       });
//     } catch (error) {
//       setIsLoading(false);
//       showMessage({
//         icon: 'danger',
//         message: `Invalid credentials`,
//         duration: 2000,
//       });
//     }
//   }
//   if (!confirm) {
//     return (
//       <View className="flex-1 p-4">
//         {isLoading && (
//           <View className="absolute z-50 h-full w-full items-center justify-center">
//             <ActivityIndicator color={'black'} size="large" />
//           </View>
//         )}
//         <View className="mt-20 items-center justify-center">
//           <Image
//             source={require('assets/logo_big.png')}
//             style={{ width: 100, height: 100 }}
//           />
//         </View>
//         <View className="mt-20">
//           {isLoading ? null : (
//             <>
//               <ControlledInput
//                 //@ts-ignore
//                 control={control}
//                 name="email"
//                 placeholder="Email"
//                 // error="Email is required"
//               />
//               <ControlledInput
//                 //@ts-ignore
//                 control={control}
//                 name="password"
//                 placeholder="Password"
//                 // error="Password is required"
//               />
//             </>
//           )}
//         </View>
//         <View className="mt-20 ">
//           <Button
//             testID="login-button"
//             label="Login"
//             onPress={handleSubmit(signInWithPhoneNumber)}
//             variant="primary"
//           />
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 p-4">
//       {isLoading && (
//         <View className="absolute z-50 h-full w-full items-center justify-center">
//           <ActivityIndicator color={'black'} size="large" />
//         </View>
//       )}
//       <View className="mt-20 items-center  justify-center">
//         <Image
//           source={require('assets/logo_big.png')}
//           style={{ width: 100, height: 100 }}
//         />
//       </View>
//       <View className="mt-20 items-center justify-center">
//         <VerifCode onFulfill={(code) => onOtpConfirm(code)} />
//         <ReversibleCountdownButton
//           onPress={handleSubmit(signInWithPhoneNumber)}
//         />
//       </View>
//     </View>
//   );
// };
