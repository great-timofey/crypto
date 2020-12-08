import React, { FC } from 'react';
import { ListRenderItem } from 'react-native';

import * as S from './ActionList.styles';
import { ActionListProps, ActionListItemType } from './ActionList.interface';
import { ActionItem } from './ActionItem/ActionItem';

export const ActionList: FC<ActionListProps> = ({ style, items }) => {
  const renderItem: ListRenderItem<ActionListItemType> = ({ item }) => (
    <ActionItem
      icon={item.icon}
      title={item.title}
      loading={item.loading}
      disabled={item.disabled}
      onPress={item.onPress}
    />
  );

  const keyExtractor = (item: ActionListItemType) => item.id;

  return (
    <S.ActionListStyled
      style={style}
      scrollEnabled={false}
      data={items}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};
