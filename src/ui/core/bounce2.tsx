import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { AnimatedButton2 } from './animeted-button2';
import { Text } from './text';
import { View } from './view';

type Props = {
  icon: any; // You can use any icon library (e.g., FontAwesome, Ionicons)
  badgeValue?: string | number;
  onPress: () => void;
  className?: string;
  active: boolean;
  title?: string;
  size?: number;
  anim?: string;
};
export const IconButton2 = ({
  icon,
  badgeValue,
  onPress,
  className,
  title,
  active,
  size = 24,
  anim = 'bounceIn',
}: Props) => {
  const [isToggled, setIsToggled] = React.useState(active);
  const themecolor2 = 'black';
  const themecolor = '#07ab86';
  const toggleButton = () => {
    setIsToggled(!isToggled);
    onPress();
  };
  return (
    <AnimatedButton2 onClick={toggleButton} anim={anim}>
      <View style={styles.container} className={className}>
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color={isToggled ? themecolor : themecolor2}
        />
        {badgeValue && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeValue}</Text>
          </View>
        )}
      </View>
      <Text style={styles.titleText}>{title}</Text>
    </AnimatedButton2>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -1,
    left: -1,
  },
  badgeText: {
    color: 'white', // Customize badge text color
    fontWeight: 'bold',
    backgroundColor: 'red', // Customize badge background color
    borderRadius: 100, // Adjust as needed for your design
    lineHeight: 6,
    fontSize: 6, // Customize badge text size
    padding: 1,
  },
  titleText: {
    fontSize: 9,
    marginTop: 2,
    lineHeight: 9,
    width: 70,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
