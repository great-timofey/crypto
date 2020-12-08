import React, { FC } from 'react';

import * as S from './BankItem.styles';

import { BankLogo } from '$components';

export const BankItem: FC<{ code: string; onPress: () => void }> = ({
  code,
  onPress,
}) => {
  return (
    <S.BankItemStyle onPress={onPress}>
      <BankLogo code={code} />
      <S.AngleIconStyled name="angle-right" />
    </S.BankItemStyle>
  );
};
