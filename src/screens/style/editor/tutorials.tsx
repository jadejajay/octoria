import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { ScrollView, Text, View } from '@/ui';

type Props = {};
export const Tutorial = ({}: Props) => {
  const { goBack } = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View className="h-8 pl-2">
        <MaterialCommunityIcons
          name="arrow-left-bold"
          size={24}
          onPress={() => goBack()}
        />
      </View>
      <View className="h-48 items-center justify-center">
        <Video
          source={{ uri: 'http://itekindia.com/intro.mp4' }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.STRETCH}
          isLooping
        />
      </View>
      <View className="p-4">
        <Text variant="xs" className="text-justify">
          {info}
        </Text>
      </View>
      <View className="p-4">
        <Text variant="xl" className="text-center font-poppins">
          Designed & Developed By
        </Text>
        <FastImage
          source={require('../../../../assets/ibais.png')}
          style={styles.image}
          resizeMode="contain"
          tintColor={'black'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  video: {
    width: '100%',
    height: '100%',
    borderWidth: 8,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  shadow: {
    borderWidth: 8,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 7.2953,
    alignSelf: 'center',
    marginTop: 10,
    tintColor: 'black',
  },
});

const info = `
🚀 Welcome to IBAIS Media - Innovators in Social Media Solutions!

At IBAIS Media, we take pride in crafting cutting-edge applications that empower individuals and businesses to shine in the world of social media. Our latest creation, the Post Maker Application, stands as a testament to our commitment to simplicity, creativity, and functionality.

🌟 Key Features:

Intuitive Design: The Post Maker app boasts an intuitive and user-friendly design, ensuring that both seasoned creators and newcomers can effortlessly navigate and unleash their creativity.

Versatile Templates: Choose from a wide array of professionally designed templates to kickstart your creative process. Whether you're creating posts for Instagram, Facebook, Twitter, or any other platform, we've got you covered.

Customization Galore: Tailor each post to perfection with our extensive customization options. From fonts and colors to stickers and filters, the power to personalize is in your hands.

One-Click Sharing: Seamlessly share your masterpieces across multiple social media platforms with a single click. No more jumping through hoops – share and engage with your audience effortlessly.

Schedule and Plan: Stay ahead of your content calendar by scheduling posts in advance. Our scheduling feature ensures that your content reaches your audience at the optimal times.

🌐 How to Get Started:

Download the App: Head to the App Store or Google Play Store and Download App.

Create Your Account: Sign up for a IBAIS Media account to unlock additional features and save your creations across devices.

Explore Templates: Dive into a world of templates tailored for various occasions and themes.

Customize and Create: Personalize your chosen template to match your brand or personal style.

Share and Shine: Share your creations with the world and watch your online presence soar.

✨ Why Choose IBAIS Media?

Innovation at its Core: We're dedicated to staying ahead of the curve, bringing you the latest features and trends in the dynamic world of social media.

User-Centric Design: Our applications are crafted with you in mind. We prioritize user experience, ensuring that our tools are accessible and enjoyable for everyone.

Reliable Support: Have questions or run into issues? Our support team is here to assist you on your creative journey.

Join the ranks of content creators, influencers, and businesses who trust IBAIS Media for their social media needs.

🌈 IBAIS Media - Where Creativity Meets Convenience! 🚀
`;
