import { format, startOfYesterday, isSameYear } from 'date-fns';
import { IntlShape } from 'react-intl';

import { HISTORY_ITEMS_DATE_FORMAT } from './constants';

import timeMessages from '$i18n/shared/time.messages';
import { HistoryListItem } from '$components/HistoryList/HistoryList.interface';

export function prepareHistoryItemsToDisplay(items: HistoryListItem[], intl: IntlShape) {
  const result: {
    [key: string]: HistoryListItem[];
  } = {};
  if (!items.length) return [];

  items.sort((itemA, itemB) => itemB.createdAt - itemA.createdAt);

  items.forEach((item: HistoryListItem) => {
    const date = format(item.createdAt * 1000, HISTORY_ITEMS_DATE_FORMAT).toString();
    if (result[date]) {
      result[date].push(item);
    } else {
      result[date] = [item];
    }
  });

  return Object.entries(result).reduce(
    (
      acc: {
        title: string;
        highlight: boolean;
        data: HistoryListItem[];
      }[],
      [dateString, item]: [string, HistoryListItem[]],
    ) => {
      const highlight = item.some((notification) => notification?.highlight);

      if (dateString === format(new Date(), HISTORY_ITEMS_DATE_FORMAT)) {
        //  today
        acc.push({
          title: intl.formatMessage(timeMessages.today),
          data: [...item],
          highlight,
        });
      } else if (dateString === format(startOfYesterday(), HISTORY_ITEMS_DATE_FORMAT)) {
        //  yesterday
        acc.push({
          highlight,
          title: intl.formatMessage(timeMessages.yesterday),
          data: [...item],
        });
      } else {
        //  before yesterday
        const needShowYear = !isSameYear(new Date(dateString), new Date());

        acc.push({
          title: intl.formatDate(new Date(dateString), {
            month: 'long',
            day: 'numeric',
            year: needShowYear ? 'numeric' : undefined,
          }),
          highlight,
          data: [...item],
        });
      }
      return acc;
    },
    [],
  );
}
