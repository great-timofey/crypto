import React, { FC, useState } from 'react';

import * as S from './Banner.style';
import { BannerProps } from './Banner.interface';

export const Banner: FC<BannerProps> = ({
  iconLeft,
  disabled = false,
  onPress,
  iconRight,
  children,
  style,
}) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    if (disabled) return;

    setPressed(true);
  };

  const handlePressOut = () => {
    if (disabled) return;

    setPressed(false);
    onPress();
  };

  return (
    <S.BannerStyled
      style={style}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      onPress={onPress}
      pressed={pressed}
      activeOpacity={1}
    >
      {iconLeft && (
        <S.BannerIconContainerStyled style={{ height: 56, width: 56 }}>
          {iconLeft}
        </S.BannerIconContainerStyled>
      )}
      <S.BannerContentWrapperStyled>{children}</S.BannerContentWrapperStyled>
      {iconRight && (
        <S.BannerIconContainerStyled>{iconRight}</S.BannerIconContainerStyled>
      )}
    </S.BannerStyled>
  );
};
