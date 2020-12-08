import React, { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { markAsRead } from 'src/redux/notifications/index';

import { CircleIcon } from '../CircleIcon/CircleIcon';
import { Typography } from '../Typography/Typography';
import { UnifiedNumber } from '../UnifiedNumber/UnifiedNumber';
import { Time } from '../Time/Time';

import * as S from './HistoryItem.styled';
import { HistoryItemProps } from './HistoryItem.interface';

import { MainScreensNames } from '$navigation/names';

export const HistoryItem: FC<HistoryItemProps> = memo(
  ({
    title,
    info,
    amountColor,
    iconFill,
    icon = 'star',
    highlight,
    amount,
    currency,
    time,
    item,
    showPlusSign = false,
  }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
      <S.HistoryItemStyled
        onPress={() => {
          navigation.navigate(MainScreensNames.HistoryItem, { item });
          item?.isNotification && dispatch(markAsRead(item.id));
        }}
        highlight={highlight}
        caption={<CircleIcon fill={iconFill && theme.colors[iconFill]} name={icon} />}
      >
        {!!title && <Typography type="HeadingsSB6">{title}</Typography>}
        {!!amount && (
          <S.HistoryItemActionStyled color={amountColor} type="HeadingsSB3">
            <UnifiedNumber plusSign={showPlusSign} value={amount} currency={currency} />
          </S.HistoryItemActionStyled>
        )}
        {!!info && (
          <S.HistoryItemInfoStyled type="BodyText3R">{info}</S.HistoryItemInfoStyled>
        )}
        {!!time && (
          <S.HistoryItemTimeStyled type="BodyLabelNumbers">
            <Time time={time * 1000} />
          </S.HistoryItemTimeStyled>
        )}
      </S.HistoryItemStyled>
    );
  },
);
