import React, { FC } from 'react';
import { useTheme } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import messages from '../HistoryItem.messages';
import { HistoryItemDate } from '../HistoryItemDate/HistoryItemDate';

import { HistoryItemTransactionProps } from './Transaction.interface';

import { Status, UnifiedNumber } from '$components';
import {
  InfoCell,
  InfoCellContent,
  InfoCellFooter,
  InfoCellHeading,
} from '$components/InfoCell';
import { currencySelector } from '$redux/selectors';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export const HistoryItemTransaction: FC<{
  item: HistoryItemTransactionProps;
}> = ({ item }) => {
  const theme = useTheme();

  const currencyInfo = useSelector(currencySelector(item.currency));

  return (
    <>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.amount} />
        </InfoCellHeading>
        <InfoCellContent
          bold
          style={{
            color:
              item.type === HistoryListTypeEnum.transactionReceive
                ? theme.colors.success2
                : theme.colors.foregroundPrimary,
          }}
        >
          <UnifiedNumber
            plusSign={item.type === HistoryListTypeEnum.transactionReceive}
            value={item.amount}
            currency={item.currency}
          />
        </InfoCellContent>
        <InfoCellFooter>
          <UnifiedNumber
            roughly
            value={item.amount * currencyInfo.toUsd}
            currency="usd"
          />
        </InfoCellFooter>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.fee} />
        </InfoCellHeading>
        <InfoCellContent>
          <UnifiedNumber value={item.fee ?? 0} currency={item.currency} />
        </InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.status} />
        </InfoCellHeading>
        <InfoCellContent>
          <Status type="HeadingsSB4" value={item.status} />
        </InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.from} />
        </InfoCellHeading>
        {item.type === HistoryListTypeEnum.transactionReceive ? (
          <InfoCellContent>
            {item.address || <FormattedMessage {...messages.unknown} />}
          </InfoCellContent>
        ) : (
          <InfoCellContent>
            <FormattedMessage
              {...messages.myCurrencyWallet}
              values={{ currency: currencyInfo.name }}
            />
          </InfoCellContent>
        )}
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.to} />
        </InfoCellHeading>
        {item.type === HistoryListTypeEnum.transactionSend ? (
          <InfoCellContent>
            {item.address || <FormattedMessage {...messages.unknown} />}
          </InfoCellContent>
        ) : (
          <InfoCellContent>
            <FormattedMessage
              {...messages.myCurrencyWallet}
              values={{ currency: currencyInfo.name }}
            />
          </InfoCellContent>
        )}
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.date} />
        </InfoCellHeading>
        <InfoCellContent>
          <HistoryItemDate date={item.createdAt * 1000} />
        </InfoCellContent>
      </InfoCell>

      {item.txid && (
        <InfoCell>
          <InfoCellHeading>
            <FormattedMessage {...messages.txid} />
          </InfoCellHeading>
          <InfoCellContent>{item.txid}</InfoCellContent>
        </InfoCell>
      )}

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.confirmationsAmount} />
        </InfoCellHeading>
        <InfoCellContent>
          {`${item.confirmations} / ${item.requiredConfirmations}`}
        </InfoCellContent>
      </InfoCell>
    </>
  );
};
