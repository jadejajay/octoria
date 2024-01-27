import { StyleSheet } from 'react-native';

export const shadow = StyleSheet.create({
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
});
