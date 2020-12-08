import styled, { css } from 'styled-components';

import { TypographyStyledProps, TypographyType } from './Typography.interface';

import { FONTS } from '$global/fonts';

const typographyStyles: { [key in TypographyType]: ReturnType<typeof css> } = {
  BodyText1SB: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 17px;
    line-height: 24px;
  `,
  BodyText2R: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 15px;
    line-height: 24px;
  `,
  BodyText3R: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 13px;
    line-height: 20px;
  `,
  BodyText3SB: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 13px;
    line-height: 20px;
  `,
  BodyAccent: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 13px;
    line-height: 16px;
  `,
  BodySmallText: css`
    font-family: ${FONTS.Montserrat['500']};
    font-size: 11px;
    line-height: 16px;
  `,
  BodyInput: css`
    font-family: ${FONTS.Montserrat['500']};
    font-size: 17px;
    line-height: 24px;
  `,
  BodyLabelNumbers: css`
    font-family: ${FONTS.Montserrat['500']};
    font-size: 10px;
    line-height: 12px;
  `,
  HeadingsBigHeader: css`
    font-family: ${FONTS.Montserrat.bold};
    font-size: 48px;
    line-height: 60px;
  `,
  HeadingsSB1: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 34px;
    line-height: 40px;
    letter-spacing: -${34 * 0.02}px;
  `,
  HeadingsSB2: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 28px;
    line-height: 36px;
    letter-spacing: -${28 * 0.02}px;
  `,
  HeadingsSB3: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 22px;
    line-height: 32px;
    letter-spacing: -${22 * 0.02}px;
  `,
  HeadingsSB4: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -${20 * 0.02}px;
  `,
  HeadingsSB5: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 17px;
    line-height: 24px;
  `,
  HeadingsSB6: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 15px;
    line-height: 20px;
  `,
  HeadingsR1: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 34px;
    line-height: 40px;
  `,
  HeadingsR2: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 28px;
    line-height: 36px;
    letter-spacing: -${28 * 0.02}px;
  `,
  HeadingsR3: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 22px;
    line-height: 32px;
    letter-spacing: -${22 * 0.02}px;
  `,
  HeadingsR4: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -${20 * 0.02}px;
  `,
  HeadingsR5: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 17px;
    line-height: 24px;
  `,
  HeadingsR6: css`
    font-family: ${FONTS.Montserrat.normal};
    font-size: 15px;
    line-height: 20px;
  `,
  Buttons1SB: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 17px;
    line-height: 24px;
  `,
  Buttons2SB: css`
    font-family: ${FONTS.Montserrat.bold};
    font-size: 15px;
    line-height: 24px;
    text-transform: uppercase;
  `,
  Caption1M: css`
    font-family: ${FONTS.Montserrat['500']};
    font-size: 12px;
    line-height: 16px;
  `,
  Caption2SB: css`
    font-family: ${FONTS.Montserrat['600']};
    font-size: 11px;
    line-height: 16px;
    text-transform: uppercase;
  `,
};

function getTypographyStyles(type: keyof typeof typographyStyles) {
  if (!typographyStyles[type]) {
    console.warn(`There is no Typography with type ${type}`);
    return css`
      color: red;
    `;
  }
  return typographyStyles[type];
}

export const TypographyStyled = styled.Text<TypographyStyledProps>`
  color: ${({ theme }) => theme.colors.foregroundPrimary};
  ${({ type }) => getTypographyStyles(type)}
`;
