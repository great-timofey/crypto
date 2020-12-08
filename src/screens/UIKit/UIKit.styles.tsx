import styled from 'styled-components';

import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { Button, CircleIcon, Coin, Input, Loader, ActionList } from '$components';

export const ButtonWithMargin = styled(Button)`
  margin-bottom: 20px;
`;

export const ComponentWrapperStyled = styled.View`
  margin-vertical: 16px;
`;

export const ActionListStyled = styled(ActionList)`
  margin: 16px -8px;
`;

export const ContainerStyled = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-color: ${({ theme }) => theme.colors.backgroundQuaternary};
  padding: ${DEFAULT_SCREEN_PADDING}px;
`;

export const InputStyled = styled(Input)`
  margin-bottom: 20px;
`;

export const CoinsWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const LoaderStyled = styled(Loader)`
  margin-bottom: 20px;
`;

export const CoinStyled = styled(Coin)`
  margin-right: 8px;
`;

export const CircleCoinStyled = styled(CircleIcon)`
  margin-right: 8px;
`;

export const UIKitContainerStyled = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  margin-bottom: 80px;
`;
