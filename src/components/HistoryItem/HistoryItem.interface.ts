import { ReactNode } from 'react';

import { IconName } from '../Icon/Icon.interface';
import { HistoryListItem } from '../HistoryList/HistoryList.interface';

import { Currency } from '$global/types';
import { NarfexThemeColor } from '$global/theme';

export interface HistoryItemProps {
  title?: ReactNode;
  info?: ReactNode;
  iconFill?: NarfexThemeColor;
  amountColor?: NarfexThemeColor;
  icon?: IconName;
  highlight?: boolean;
  currency?: Currency;
  amount?: number;
  time?: number;
  item?: HistoryListItem;
  showPlusSign?: boolean;
}
