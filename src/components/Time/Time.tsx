import React, { FC, memo } from 'react';
import { differenceInMinutes } from 'date-fns';
import { FormattedRelativeTime, FormattedTime } from 'react-intl';

export const Time: FC<{ time: number }> = memo(({ time = 0 }) => {
  const t = new Date(time);
  const minuteDiff = differenceInMinutes(new Date(), t);

  return minuteDiff < 60 ? (
    <FormattedRelativeTime
      updateIntervalInSeconds={60}
      unit="minute"
      numeric="auto"
      value={-minuteDiff}
    />
  ) : (
    <FormattedTime value={t} />
  );
});
