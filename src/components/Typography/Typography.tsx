import React, { FC } from 'react';

import { TypographyProps } from './Typography.interface';
import * as S from './Typography.styles';

export const Typography: FC<TypographyProps> = ({
  type,
  style,
  children,
  onLayout,
  textProps,
}) => {
  return (
    <S.TypographyStyled onLayout={onLayout} style={style} type={type} {...textProps}>
      {children}
    </S.TypographyStyled>
  );
};
