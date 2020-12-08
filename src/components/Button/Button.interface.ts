import { ReactNode } from 'react';
import { ViewStyle, TouchableOpacityProps } from 'react-native';

export type ButtonAppearance = 'ghost' | 'outline' | 'primary' | 'icon';

type CommonButtonProps = {
  appearance?: ButtonAppearance;
  disabled?: boolean;
};

type CommonButtonStyledProps = {
  style?: ViewStyle;
  touchableProps?: Omit<TouchableOpacityProps, 'style'>;
};

export type ButtonProps = CommonButtonProps &
  CommonButtonStyledProps & {
    onPress?: () => void;
    title?: ReactNode;
  };
//  TODO:
// title?: T extends IconButtonType ? never : ReactNode;
//ButtonProps & T extends 'icon'
// : { title: ReactNode; children: never }

export type ButtonStyledProps = CommonButtonProps & {
  appearance: ButtonAppearance;
  pressed?: boolean;
};

export type ButtonStyledWithoutButtonProps = CommonButtonStyledProps;

export interface ButtonTextStyledProps {
  appearance: ButtonAppearance;
  absolutePosition?: boolean;
}
