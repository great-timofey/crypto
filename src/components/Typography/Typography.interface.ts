import { LayoutChangeEvent, TextStyle, TextProps } from 'react-native';

type TypographyHeading =
  | 'HeadingsR1'
  | 'HeadingsR2'
  | 'HeadingsR3'
  | 'HeadingsR4'
  | 'HeadingsR5'
  | 'HeadingsR6'
  | 'HeadingsBigHeader'
  | 'HeadingsSB1'
  | 'HeadingsSB2'
  | 'HeadingsSB3'
  | 'HeadingsSB4'
  | 'HeadingsSB5'
  | 'HeadingsSB6';
type TypographyBody =
  | 'BodyText1SB'
  | 'BodyText2R'
  | 'BodyText3R'
  | 'BodyText3SB'
  | 'BodyAccent'
  | 'BodySmallText'
  | 'BodyInput'
  | 'BodyLabelNumbers';

type TypographyButton = 'Buttons1SB' | 'Buttons2SB';
type TypographyCaption = 'Caption1M' | 'Caption2SB';

export type TypographyType =
  | TypographyHeading
  | TypographyBody
  | TypographyButton
  | TypographyCaption;

export interface TypographyProps {
  type: TypographyType;
  style?: TextStyle;
  onLayout?: (e: LayoutChangeEvent) => void;
  //  there is no "onTextLayout" in @types/react-native
  textProps?: TextProps & { onTextLayout?: (e: any) => void };
}

export interface TypographyStyledProps {
  type: TypographyType;
}
