import React, { FC } from 'react';

import { CurrencyCardFooterSectionProps } from './CurrencyCardFooterSection.interface';
import * as S from './CurrencyCardFooterSection.styles';

export const CurrencyCardFooterSection: FC<CurrencyCardFooterSectionProps> = ({
  icon,
  style,
  children,
  onPress,
  ellipsized = false,
}) => {
  const Wrapper = onPress
    ? S.CurrencyCardFooterSectionTouchableStyled
    : S.CurrencyCardFooterSectionStyled;

  return (
    <Wrapper onPress={onPress} style={style}>
      <S.CurrencyCardFooterSectionTitle ellipsized={ellipsized} type="BodyAccent">
        {children}
      </S.CurrencyCardFooterSectionTitle>
      {icon && (
        <S.CurrencyCardFooterSectionIconContainerStyled>
          {icon}
        </S.CurrencyCardFooterSectionIconContainerStyled>
      )}
    </Wrapper>
  );
};
