import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'src/i18n/shared/Statuses.messages';

import * as S from './Status.styles';
import { StatusProps } from './Status.interface';

export const Status: FC<StatusProps> = ({ value, type }) => {
  return (
    <S.StatusStyled type={type} value={value}>
      {messages[value] ? <FormattedMessage {...messages[value]} /> : value}
    </S.StatusStyled>
  );
};
