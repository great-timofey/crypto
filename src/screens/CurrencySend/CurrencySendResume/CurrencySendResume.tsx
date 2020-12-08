import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import * as S from './CurrencySendResume.styles';

import { Typography, UnifiedNumber } from '$components';
import {
  InfoCell,
  InfoCellContent,
  InfoCellFooter,
  InfoCellHeading,
} from '$components/InfoCell';
import messages from '$i18n/shared/currencies.messages';
import { currencySelector, walletsSelector } from '$redux/selectors';
import { WalletOperationEnum } from '$redux/wallets/interface';

export interface CurrencySendResumeProps {}

export const CurrencySendResume: FC<CurrencySendResumeProps> = () => {
  const {
    send: { login, address, amount, amountUsd, type },
    wallet: {
      currency,
      sendLimit: { fee },
    },
  } = useSelector(walletsSelector);

  const currencyInfo = useSelector(currencySelector(currency));

  return (
    <S.CurrencySendResumeStyled>
      <S.CurrencySendStepTitleStyled type="HeadingsSB4">
        <FormattedMessage
          {...messages.sendCurrency}
          values={{ currency: currencyInfo.name }}
        />
      </S.CurrencySendStepTitleStyled>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage
            {...(login ? messages.transferRecipient : messages.recipientAddress)}
          />
        </InfoCellHeading>
        <InfoCellContent>{login || address}</InfoCellContent>
      </InfoCell>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.sum} />
        </InfoCellHeading>
        <InfoCellContent bold>
          <UnifiedNumber value={parseFloat(amount)} currency={currency} />
        </InfoCellContent>
        <InfoCellFooter>
          <UnifiedNumber roughly value={parseFloat(amountUsd)} currency="usd" />
        </InfoCellFooter>
      </InfoCell>
      <InfoCell>
        {type === WalletOperationEnum.transaction ? (
          <>
            <InfoCellHeading>
              <FormattedMessage {...messages.fee} />
            </InfoCellHeading>
            <InfoCellContent>
              <UnifiedNumber value={fee} currency={currency} />
            </InfoCellContent>
          </>
        ) : (
          <Typography type="HeadingsSB4">
            <FormattedMessage {...messages.feeFree} />
          </Typography>
        )}
      </InfoCell>
    </S.CurrencySendResumeStyled>
  );
};
