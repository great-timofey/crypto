import { ReactNode } from 'react';
import { ViewStyle, TextInputProps, TextStyle } from 'react-native';

import { IconName } from '../Icon/Icon.interface';

export type InputAppearance = 'default' | 'invisible';

export interface InputProps {
  iconLeftName?: IconName;
  iconRightName?: IconName;
  label?: ReactNode;
  labelRight?: ReactNode;
  value?: string;
  disabled?: boolean;
  description?: ReactNode;
  /** string only (will crash otherwise), use intl.formatMessage if localization needed */
  placeholder?: string;
  appearance?: InputAppearance;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
  password?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  inputProps?: Omit<TextInputProps, 'onFocus' | 'onBlur'>;
  customTextStyle?: TextStyle;
}

export interface InputContainerStyledProps {
  appearance: InputAppearance;
  disabled?: boolean;
  focused: boolean;
}

export interface InputStyledProps {
  appearance: InputAppearance;
  focused?: boolean;
  disabled?: boolean;
  haveCustomStyles: boolean;
  extraPaddingLeft: boolean;
  extraPaddingRight: boolean;
}

export interface InputIconStyledProps {
  focused?: boolean;
  disabled?: boolean;
}
