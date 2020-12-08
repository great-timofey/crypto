import React, { FC, memo } from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

export interface HistoryItemDateProps {
  date: number;
}

export const HistoryItemDate: FC<HistoryItemDateProps> = memo(({ date }) => {
  return (
    <>
      <FormattedDate value={date} year="numeric" month="long" day="2-digit" />{' '}
      <FormattedTime value={date} />
    </>
  );
});
