import { IconName } from '../Icon/Icon.interface';
import { InputProps } from '../Input/Input.interface';

type CodeExtentedProps = Pick<
  InputProps,
  'inputProps' | 'value' | 'style' | 'onChangeText'
>;

export interface CodeInputProps extends CodeExtentedProps {
  icon?: IconName;
  error?: boolean;
  length?: number;
  onSubmitEditing?: () => void;
  renderInvisibleInput?: boolean;
  secureTextEntry?: boolean;
}

export interface CodeItemStyledProps {
  active: boolean;
  colorless: boolean;
  error?: boolean;
}
