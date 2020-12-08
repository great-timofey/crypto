import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import * as S from './RadioButton.styles';
import { RadioButtonProps } from './RadioButton.interface';

export const RadioButton: FC<RadioButtonProps> = ({
  value,
  hiddenNotChecked,
  onChange,
}) => {
  const button = (
    <S.RadioButtonStyled style={{ opacity: hiddenNotChecked && !value ? 0 : 1 }}>
      {value ? <S.CheckStyled /> : <S.CircleStyled />}
    </S.RadioButtonStyled>
  );

  return onChange ? (
    <TouchableOpacity onPress={() => onChange && onChange(!value)}>
      {button}
    </TouchableOpacity>
  ) : (
    button
  );
};
