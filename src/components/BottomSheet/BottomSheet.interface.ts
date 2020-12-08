import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface BottomSheetProps {
  children: ReactNode;
  opened: boolean;
  onClose: () => void;
  onOpen?: () => void;
  showCloseButton?: boolean;
  header?: ReactNode;
  contentContainerStyle?: ViewStyle;
  fixedSnapPoints?: number[];
  showFakeTabBar?: boolean;

  bottomSheetProps?: {
    overdragResistanceFactor: number;
    initialSnap: number;
    enabledImperativeSnapping: boolean;
    enabledGestureInteraction: boolean;
    enabledBottomClamp: boolean;
    enabledBottomInitialAnimation: boolean;
    enabledHeaderGestureInteraction: boolean;
    enabledContentGestureInteraction: boolean;
    enabledContentTapInteraction: boolean;
    enabledInnerScrolling: boolean;
    springConfig: {};
    callbackThreshold: number;
  };
}
