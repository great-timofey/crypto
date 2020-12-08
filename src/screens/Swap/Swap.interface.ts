import { SwapUINavigationProp } from '$navigation/main/MainNavigator.interface';

export enum SwapCurrencyOperationEnum {
  give,
  receive,
}

export interface SwapUIProps {
  navigation: SwapUINavigationProp;
}
