import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import {
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export type ThemedScreenProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScreen({ style, lightColor, darkColor, ...otherProps }: ThemedScreenProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style, styles.container]} {...otherProps} />;
}

const styles = StyleSheet.create(({
  container: {
    paddingTop: hp('5%')
  }
}));