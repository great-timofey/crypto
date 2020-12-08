import { ReactNode, FC } from 'react';
import { ViewStyle } from 'react-native';

export type TabsComponent<T = any> = FC<TabsProps<T>>;

export interface TabsProps<T> {
  tabs: Tab<T>[];
  onChange: (idx: Tab<T>['name']) => void;
  activeTab: Tab<T>['name'];
  style?: ViewStyle;
}

export interface Tab<T> {
  title: ReactNode;
  name: T;
}

export interface TabProps {
  active: boolean;
  onPress: () => void;
  style?: ViewStyle;
}
