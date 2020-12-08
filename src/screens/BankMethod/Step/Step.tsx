import React, { FC } from 'react';

import * as S from './Step.styles';

import { Clipboard } from '$components';

const formatRow = (row: string, keys: { [key: string]: string }) => {
  const keysOfKeys = Object.keys(keys);

  return row.split(/({account_number}|{service_provider_code})/).map((e) => {
    const key = e.slice(1, e.length - 1);

    if (keysOfKeys.includes(key)) {
      return <Clipboard text={keys[key]} />;
    }

    return e;
  });
};

export const Step: FC<{
  number: number;
  content: string;
  accountNumber: string;
  serviceProviderCode?: string;
}> = ({ number, content, accountNumber, serviceProviderCode }) => {
  return (
    <S.StepWrapperStyled>
      <S.StepCircleStyled>
        <S.StepCircleTextStyled type="HeadingsSB5">{number}</S.StepCircleTextStyled>
      </S.StepCircleStyled>
      <S.StepContentStyled type="BodyText2R">
        {formatRow(content, {
          account_number: `${accountNumber}`,
          service_provider_code: `${serviceProviderCode}`,
        })}
      </S.StepContentStyled>
    </S.StepWrapperStyled>
  );
};
