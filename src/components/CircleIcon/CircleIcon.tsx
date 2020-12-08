import React, { FC, memo } from 'react';
import { useTheme } from 'styled-components';
//  TODO: add types
//  @ts-ignore
import { presetColors } from 'react-native-animated-linear-gradient';

import { SvgUri } from '../SvgUri/SvgUri';

import * as S from './CircleIcon.styles';
import { CircleIconProps } from './CircleIcon.interface';

export const CircleIcon: FC<CircleIconProps> = memo(
  ({ style, fill, gradient, name, size = 40, loading, source }) => {
    const theme = useTheme();

    const getContent = () => {
      if (loading) {
        return <S.LoaderStyled />;
      }

      if (name) {
        return <S.IconStyled name={name} fill={theme.colors.white} />;
      }

      if (source) {
        const { uri = '' } = source;

        return uri.endsWith('.svg') ? (
          <SvgUri
            style={{
              width: size,
              height: size,
            }}
            uri={uri}
          />
        ) : (
          <S.ImageStyled size={size} source={source} />
        );
      }

      return <></>;
    };

    return (
      <S.CircleIconWrapper size={size} fill={fill} style={style}>
        {!name && !source && (
          <S.LinearGradientAnimatedStyled
            customColors={presetColors.firefox}
            speed={500}
          />
        )}
        {gradient && <S.LinearGradientStyled useAngle colors={gradient} />}
        {getContent()}
      </S.CircleIconWrapper>
    );
  },
);
