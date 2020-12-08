import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import messages from '../HistoryItem.messages';
import { HistoryItemDate } from '../HistoryItemDate/HistoryItemDate';

import { HistoryItemTransferProps } from './Transfer.interface';

import { UnifiedNumber } from '$components';
import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';
import {
  InfoCell,
  InfoCellContent,
  InfoCellFooter,
  InfoCellHeading,
} from '$components/InfoCell';
import { currencySelector } from '$redux/selectors';

export const HistoryItemTransfer: FC<{
  item: HistoryItemTransferProps;
}> = ({ item }) => {
  const theme = useTheme();

  const currencyInfo = useSelector(currencySelector(item.currency));
  const isIncomingTransfer = item.type === HistoryListTypeEnum.transferReceive;

  const getTitleColor = () => {
    if (item.type === HistoryListTypeEnum.transferSend) {
      return theme.colors.gray;
    }

    return isIncomingTransfer ? theme.colors.success2 : theme.colors.error2;
  };

  return (
    <>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.amount} />
        </InfoCellHeading>
        <InfoCellContent
          bold
          style={{
            color: getTitleColor(),
          }}
        >
          <UnifiedNumber
            value={item.amount}
            currency={item.currency}
            plusSign={isIncomingTransfer}
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
          {/** TODO: need to remove or add correct fee UI display */}
          <UnifiedNumber value={0} currency={item.currency} />
        </InfoCellContent>
      </InfoCell>

      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.from} />
        </InfoCellHeading>
        {isIncomingTransfer ? (
          <InfoCellContent bold>{item.address}</InfoCellContent>
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
        {isIncomingTransfer ? (
          <InfoCellContent>
            <FormattedMessage
              {...messages.myCurrencyWallet}
              values={{ currency: currencyInfo.name }}
            />
          </InfoCellContent>
        ) : (
          <InfoCellContent bold>{item.address}</InfoCellContent>
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
    </>
  );
};
