import React, { FC } from 'react';

import { CaptionCellProps } from './CaptionCell.interface';
import * as S from './CaptionCell.styles';

export const CaptionCell: FC<CaptionCellProps> = ({
  caption,
  onPress,
  children,
  style,
  iconRight,
}) => {
  return (
    <S.CaptionCellStyled style={style} onPress={onPress}>
      {caption && <S.CaptionCellContainerStyled>{caption}</S.CaptionCellContainerStyled>}
      <S.CaptionCellContentStyled>{children}</S.CaptionCellContentStyled>
      {iconRight && (
        <S.CaptionCellIconContainerStyled>{iconRight}</S.CaptionCellIconContainerStyled>
      )}
    </S.CaptionCellStyled>
  );
};
