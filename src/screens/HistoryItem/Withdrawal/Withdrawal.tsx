import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import messages from '../HistoryItem.messages';
import { HistoryItemDate } from '../HistoryItemDate/HistoryItemDate';

import { InfoCell, InfoCellContent, InfoCellHeading } from '$components/InfoCell';
import { Icon, Status, UnifiedNumber } from '$components';
import { currencySelector } from '$redux/selectors';
import { HistoryItemWithdrawalProps } from '$screens/HistoryItem/Withdrawal/Withdrawal.interface';
import { StatusEnum } from '$global/types';

export const HistoryItemWithdrawal: FC<{ item: HistoryItemWithdrawalProps }> = ({
  item,
}) => {
  const theme = useTheme();
  const currencyInfo = useSelector(currencySelector(item.currency));
  const failed = item.status === StatusEnum.failed;

  return (
    <>
      {failed && <Icon style={{ alignSelf: 'center' }} name="40" />}
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.amount} />
        </InfoCellHeading>
        <InfoCellContent
          bold
          style={{
            color: failed ? theme.colors.error2 : theme.colors.foregroundPrimary,
          }}
        >
          <UnifiedNumber value={item.amount} currency={item.currency} />
        </InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.fee} />
        </InfoCellHeading>
        <InfoCellContent>
          <UnifiedNumber value={item.fee} currency={item.currency} />
        </InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.status} />
        </InfoCellHeading>
        <Status type="HeadingsSB4" value={item.status} />
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.from} />
        </InfoCellHeading>
        <InfoCellContent>
          <FormattedMessage
            {...messages.myCurrencyWallet}
            values={{
              currency: currencyInfo.name,
            }}
          />
        </InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.to} />
        </InfoCellHeading>
        <InfoCellContent>{item.bankCode}</InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.accountHolderName} />
        </InfoCellHeading>
        <InfoCellContent>{item.accountHolderName}</InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.accountNumber} />
        </InfoCellHeading>
        <InfoCellContent>{item.accountNumber}</InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.date} />
        </InfoCellHeading>
        <InfoCellContent>
          <HistoryItemDate date={item.createdAt * 1000} />
        </InfoCellContent>
      </InfoCell>
    </>
  );
};
