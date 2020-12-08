import { StyleProp, ViewStyle } from 'react-native';

type HighlightBackground = 'backgroundTertiary' | 'backgroundQuaternary';

export interface HighlightProps {
  onPress?: () => void;
  background?: HighlightBackground;
  style?: StyleProp<ViewStyle>;
}
