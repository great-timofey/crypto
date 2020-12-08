import React, { memo, FC } from 'react';
import { useTheme } from 'styled-components';

import { iconsMap } from './constants';
import { IconProps } from './Icon.interface';

export const Icon: FC<IconProps> = memo(({ name, style, fill }) => {
  const theme = useTheme();

  if (!iconsMap[name]) {
    console.warn(`Icon with name ${name} is not exists`);
    return <></>;
  }

  const Component = iconsMap[name];

  return <Component style={style} fill={fill ?? theme.colors.foregroundTertiary} />;
});
