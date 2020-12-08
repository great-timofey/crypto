import React, { FC, useCallback, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  RefreshControl,
  ScrollView,
  SectionListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';

import { Loader } from '../Loader/Loader';
import { Typography } from '../Typography/Typography';

import { HistoryItemRenderer } from './HistoryItemRenderer';
import { HistoryListItem, HistoryListProps } from './HistoryList.interface';
import * as S from './HistoryList.styles';
import messages from './HistoryList.messages';

import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';
import { LAST_NOTIFICATION_PADDING } from '$screens/Notifications/constants';

export const HistoryList: FC<HistoryListProps<HistoryListItem>> = memo(
  ({
    items,
    listHeaderComponent: ListHeaderComponent,
    onRefresh,
    refreshing,
    onEndReached,
    style,
    paginationOver = false,
    loading,
    loadingError = false,
    contentContainerStyle,
    emptyIcon,
    emptyText,
    emptyStyle,
  }) => {
    const theme = useTheme();
    const { bottom } = useSafeArea();

    // @ts-ignore
    const Header = ListHeaderComponent ? <ListHeaderComponent /> : <></>;

    const handleEndReached = useCallback(() => {
      !refreshing && onEndReached && onEndReached();
    }, [refreshing, onEndReached]);

    const renderItem = useCallback((data) => <HistoryItemRenderer {...data} />, []);

    const renderSectionHeader = useCallback(
      ({
        section: { title, highlight },
      }: Pick<SectionListRenderItemInfo<HistoryListItem>, 'section'>) => (
        <S.HistoryDateGroupStyled highlight={highlight} type="HeadingsSB6">
          {title}
        </S.HistoryDateGroupStyled>
      ),
      [],
    );

    const Footer = useCallback(() => {
      if (loading && !paginationOver) {
        return (
          <S.HistoryListFooterStyled>
            <Loader appearance={theme.isCurrent('light') ? 'dark' : 'light'} />
          </S.HistoryListFooterStyled>
        );
      }

      if (loadingError && !paginationOver) {
        return (
          <TouchableOpacity onPress={onEndReached}>
            <S.HistoryListFooterStyled>
              <Typography type="Caption1M">
                <FormattedMessage {...messages.couldNotLoadData} />
              </Typography>
              <S.HistoryListTryAgainTitleStyled type="Caption1M">
                <FormattedMessage {...messages.tryAgain} />
              </S.HistoryListTryAgainTitleStyled>
            </S.HistoryListFooterStyled>
          </TouchableOpacity>
        );
      }

      return <S.HistoryListFooterStyled />;
    }, [loading, loadingError, onEndReached, paginationOver, theme]);

    if (!items.length) {
      if (loading) {
        return (
          <>
            {Header}
            <S.HistoryListLoaderWrapper>
              <Loader appearance={theme.isCurrent('light') ? 'dark' : 'light'} />
            </S.HistoryListLoaderWrapper>
          </>
        );
      }

      return (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingBottom: BOTTOM_TAB_BAR_HEIGHT + bottom + LAST_NOTIFICATION_PADDING * 2,
            minHeight: '100%',
          }}
        >
          {Header}
          <S.HistoryListEmptyContainerStyled style={emptyStyle}>
            {emptyIcon && <S.HistoryListEmptyIconStyled name={emptyIcon} />}
            {emptyText && (
              <S.HistoryListEmptyTitleStyled type="HeadingsSB6">
                {emptyText}
              </S.HistoryListEmptyTitleStyled>
            )}
          </S.HistoryListEmptyContainerStyled>
        </ScrollView>
      );
    }

    return (
      <S.HistoryListStyled
        ListHeaderComponent={Header}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={65}
        style={style}
        indicatorStyle={theme.isCurrent('light') ? 'black' : 'white'}
        onRefresh={onRefresh}
        refreshing={refreshing}
        stickySectionHeadersEnabled={false}
        sections={items}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingBottom: BOTTOM_TAB_BAR_HEIGHT + bottom + LAST_NOTIFICATION_PADDING,
          ...contentContainerStyle,
        }}
        keyExtractor={(item) => item.type + item.id}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListFooterComponent={Footer}
      />
    );
  },
);
