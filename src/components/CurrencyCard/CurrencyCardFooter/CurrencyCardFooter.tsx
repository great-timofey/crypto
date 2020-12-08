import React, { FC, useState, useEffect } from 'react';

import { CURRENCY_CARD_PADDING } from '../constants';

import * as S from './CurrencyCardFooter.styles';
import { CurrencyCardFooterProps } from './CurrencyCardFooter.interface';

import { DEVICE_WIDTH } from '$global/device';
import { DEFAULT_SCREEN_PADDING } from '$global/constants';

export const CurrencyCardFooter: FC<CurrencyCardFooterProps> = ({
  leftSection,
  rightSection,
  style,
}) => {
  const [verticalized, setVerticalized] = useState(false);
  const [sectionsWidth, setsectionsWidth] = useState([0, 0]);

  useEffect(() => {
    if (
      sectionsWidth[0] + sectionsWidth[1] >
      DEVICE_WIDTH - (DEFAULT_SCREEN_PADDING + CURRENCY_CARD_PADDING) * 2
    ) {
      setVerticalized(true);
    }
  }, [sectionsWidth]);

  return (
    <S.CurrencyCardFooterStyled verticalized={verticalized} style={style}>
      {leftSection && (
        <S.CurrencyCardFooterLeftSectionStyled
          addMarginBottom={verticalized}
          onLayout={(e) =>
            setsectionsWidth([sectionsWidth[0], e.nativeEvent?.layout?.width ?? 0])
          }
        >
          {leftSection}
        </S.CurrencyCardFooterLeftSectionStyled>
      )}
      {rightSection && (
        <S.CurrencyCardFooterRightSectionStyled
          onLayout={(e) =>
            setsectionsWidth([e.nativeEvent?.layout?.width ?? 0, sectionsWidth[1]])
          }
        >
          {rightSection}
        </S.CurrencyCardFooterRightSectionStyled>
      )}
    </S.CurrencyCardFooterStyled>
  );
};
