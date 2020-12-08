import React, { FC } from 'react';
import { useTheme } from 'styled-components';

import { Icon } from '../../Icon/Icon';

import { BottomSheetHeaderProps } from './BottomSheetHeader.interface';
import * as S from './BottomSheetHeader.styles';

import { addHitSlop } from '$global/utils';

export const BottomSheetHeader: FC<BottomSheetHeaderProps> = ({
  children,
  onCloseButtonPress,
}) => {
  const theme = useTheme();

  return (
    <S.BottomSheetHeaderContainerStyled>
      <S.BottomSheetHandlerStyled />
      <S.BottomSheetHeaderContentWrapperStyled>
        {children}
        {onCloseButtonPress && (
          <S.BottomSheetHeaderCloseButtonStyled
            touchableProps={{ ...addHitSlop([50]) }}
            appearance="icon"
            onPress={onCloseButtonPress}
          >
            <Icon name="close-large" fill={theme.colors.primaryBlue} />
          </S.BottomSheetHeaderCloseButtonStyled>
        )}
      </S.BottomSheetHeaderContentWrapperStyled>
    </S.BottomSheetHeaderContainerStyled>
  );
};
