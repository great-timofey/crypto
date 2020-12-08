import React, { FC } from 'react';

import { CustomKeyboardButtonProps } from './CustomKeyboardButton.interface';
import { CustomKeyboardButtonStyled } from './CustomKeyboardButton.styles';

export const CustomKeyboardButton: FC<CustomKeyboardButtonProps> = ({
  onPress,
  onLongPress,
  children,
}) => {
  return (
    <CustomKeyboardButtonStyled onLongPress={onLongPress} onPress={onPress}>
      {children}
    </CustomKeyboardButtonStyled>
  );
};
