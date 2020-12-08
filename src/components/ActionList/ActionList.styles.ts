import styled from 'styled-components';

import { ActionListItemType } from './ActionList.interface';

export const ActionListStyled = styled.FlatList<ActionListItemType>`
  margin-vertical: 8px;
  margin-horizontal: -8px;
`;
