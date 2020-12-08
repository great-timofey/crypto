import React, { memo, FC } from 'react';
import { StatusBar as StatusBarRNComponent } from 'react-native';
import { useTheme } from 'styled-components';
import { useSafeArea } from 'react-native-safe-area-context';

import { getBarStyle } from './utils';
import * as S from './StatusBar.styles';
import { StatusBarProps } from './StatusBar.interface';

export const StatusBar: FC<StatusBarProps> = memo(
  ({
    barStyle = 'dark-content',
    ignoreTheme = false,
    backgroundColorKey = 'transparent',
    style,
  }) => {
    const theme = useTheme();

    const { top } = useSafeArea();

    return (
      <S.StatusBarContainerStyled
        height={top}
        style={style}
        backgroundColorKey={backgroundColorKey}
      >
        <StatusBarRNComponent
          translucent
          animated
          barStyle={ignoreTheme ? barStyle : getBarStyle(barStyle, theme)}
          backgroundColor={theme.colors[backgroundColorKey]}
        />
      </S.StatusBarContainerStyled>
    );
  },
);
