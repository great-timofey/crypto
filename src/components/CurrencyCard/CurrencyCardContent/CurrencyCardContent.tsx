import React, { FC, useState } from 'react';

import { CurrencyCardContentProps } from './CurrencyCardContent.interface';
import * as S from './CurrencyCardContent.styles';

export const CurrencyCardContent: FC<CurrencyCardContentProps> = ({
  amount,
  currency,
}) => {
  const [ableToRender, setAbleToRender] = useState(false);
  const [multiline, setMultiline] = useState(false);

  const handleTextLayout = (e: any) => {
    setMultiline((e.nativeEvent?.lines?.length ?? 0) > 1);
    setAbleToRender(true);
  };

  const getContent = () => {
    return multiline ? (
      <>
        <S.CurrencyCardContentStyled
          type="HeadingsSB2"
          textProps={{
            numberOfLines: 1,
            adjustsFontSizeToFit: true,
          }}
        >
          {amount}
        </S.CurrencyCardContentStyled>
        <S.CurrencyCardContentStyled type="HeadingsSB2" addMarginBottom>
          {currency}
        </S.CurrencyCardContentStyled>
      </>
    ) : (
      <S.CurrencyCardContentStyled type="HeadingsSB2" addMarginBottom>
        {amount} {currency}
      </S.CurrencyCardContentStyled>
    );
  };

  return ableToRender ? (
    getContent()
  ) : (
    <>
      <S.CurrencyCardContentStyled
        addMarginBottom
        type="HeadingsSB2"
        textProps={{
          numberOfLines: 1,
          adjustsFontSizeToFit: true,
        }}
      >
        {amount} {currency}
      </S.CurrencyCardContentStyled>
      <S.CurrencyCardContentStyled
        style={{ opacity: 0, position: 'absolute' }}
        type="HeadingsSB2"
        textProps={{
          onTextLayout: handleTextLayout,
        }}
      >
        {amount} {currency}
      </S.CurrencyCardContentStyled>
    </>
  );
};
