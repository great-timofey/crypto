import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { differenceInMinutes } from 'date-fns';
import { FormattedRelativeTime, FormattedTime } from 'react-intl';

import { Typography } from '../Typography/Typography';

export const PostTime: FC<{ time: number; style?: ViewStyle }> = ({ time, style }) => {
  const now = new Date(time);
  const minuteDiff = differenceInMinutes(new Date(), now);

  return (
    <Typography type="BodyLabelNumbers" style={style}>
      {minuteDiff < 60 ? (
        <FormattedRelativeTime
          updateIntervalInSeconds={60}
          unit="minute"
          numeric="auto"
          value={-minuteDiff}
        />
      ) : (
        <FormattedTime value={time} />
      )}
    </Typography>
  );
};
