import React, { FC, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { Currency, CurrencyType } from '$global/types';
import messages from '$i18n/shared/currencies.messages';

export interface LocalizedCurrencyProps {
  type: CurrencyType;
  abbr: Currency;
  cryptoName: ReactNode;
}

export const LocalizedCurrency: FC<LocalizedCurrencyProps> = ({
  type,
  abbr,
  cryptoName,
}) => {
  return type === CurrencyType.fiat ? (
    <FormattedMessage {...messages[abbr]} />
  ) : (
    <>{cryptoName}</>
  );
};
