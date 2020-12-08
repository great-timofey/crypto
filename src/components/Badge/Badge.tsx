import React, { FC } from 'react';

import { BadgeProps } from './Badge.interface';
import * as S from './Badge.styles';

import { addHitSlop } from '$global/utils';

export const Badge: FC<BadgeProps> = ({ badgeContent, children, onPress, style }) => {
  const badgeCharsLength = badgeContent ? badgeContent.toString().length : 0;

  return (
    <S.BadgeContainerStyled
      onPress={onPress}
      badgeCharsLength={badgeCharsLength}
      style={style}
      {...addHitSlop([20, 0, 20, 20])}
    >
      {children}
      {parseFloat(badgeContent as string) > 0 && (
        <S.IconButtonBadgeContainerStyled>
          <S.IconButtonBadgeTextStyled>{badgeContent}</S.IconButtonBadgeTextStyled>
        </S.IconButtonBadgeContainerStyled>
      )}
    </S.BadgeContainerStyled>
  );
};
