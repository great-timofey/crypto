import React, { FC } from 'react';
import { useTheme } from 'styled-components';

import { Icon } from '../Icon/Icon';
import { IconName } from '../Icon/Icon.interface';

import * as S from './BankLogo.styles';

export const BankLogo: FC<{ code: string }> = ({ code }) => {
  const theme = useTheme();
  const name = `xendit-banks-${code.toLowerCase()}-${
    theme.isCurrent('light') ? 'light' : 'dark'
  }`;

  return (
    <S.BankLogoWrapperStyles>
      <Icon name={name as IconName} />
    </S.BankLogoWrapperStyles>
  );
};
