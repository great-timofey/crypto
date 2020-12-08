import React, { FC } from 'react';
import { TouchableHighlight, TouchableNativeFeedback, View } from 'react-native';
import { useTheme } from 'styled-components';

import { HighlightProps } from './Highlight.interface';

import { isAndroid } from '$global/device';
import { getRippleColor, hex2rgba } from '$global/utils';

export const Highlight: FC<HighlightProps> = (props) => {
  const { onPress, style, children } = props;

  const theme = useTheme();

  if (isAndroid) {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        style={{ overflow: 'hidden' }}
        background={getRippleColor(theme)}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      style={style}
      onPress={onPress}
      activeOpacity={1}
      underlayColor={hex2rgba(theme.colors.backgroundQuaternary, 0.3)}
    >
      <>{children}</>
    </TouchableHighlight>
  );
};
