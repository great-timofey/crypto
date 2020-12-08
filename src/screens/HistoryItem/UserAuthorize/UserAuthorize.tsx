import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import messages from '../HistoryItem.messages';
import { HistoryItemDate } from '../HistoryItemDate/HistoryItemDate';

import { HistoryItemUserAuthorizeProps } from './UserAuthorize.interface';

import { InfoCell, InfoCellContent, InfoCellHeading } from '$components/InfoCell';

export const HistoryItemUserAuthorize: FC<{ item: HistoryItemUserAuthorizeProps }> = ({
  item,
}) => {
  return (
    <>
      <InfoCell>
        <InfoCellHeading>
          <FormattedMessage {...messages.device} />
        </InfoCellHeading>
        {item.isMobileApplication && (
          <InfoCellContent>
            <FormattedMessage
              {...messages.appForDevice}
              values={{
                device: item.platformName,
              }}
            />
          </InfoCellContent>
        )}
        <InfoCellContent>
          {item.platformName ? (
            `${item.platformName} ${item.browserName}`
          ) : (
            <FormattedMessage {...messages.unknownDevice} />
          )}
        </InfoCellContent>
      </InfoCell>

      {!!item.ipAddress && (
        <InfoCell>
          <InfoCellHeading>
            <FormattedMessage {...messages.ipAddress} />
          </InfoCellHeading>
          <InfoCellContent>{item.ipAddress}</InfoCellContent>
        </InfoCell>
      )}

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
