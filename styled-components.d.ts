import * as styledComponents from 'styled-components/native';
import { FlatList, SectionList } from 'react-native';

import { NarfexTheme } from './src/global/theme';

declare interface StyledFlatList {
  FlatList<T>(styles: any): new () => FlatList<T>;
}

declare interface StyledSectionList {
  SectionList<T>(styles: any): new () => SectionList<T>;
}

const {
  css,
  ThemeProvider,
  withTheme,
  useTheme,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<
  NarfexTheme
>;

declare const styled: styledComponents.ReactNativeStyledInterface<NarfexTheme> &
  StyledFlatList &
  StyledSectionList;

export { css, ThemeProvider, withTheme, useTheme };
export default styled;
