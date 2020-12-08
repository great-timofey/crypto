import React, { FC } from 'react';

import * as S from './Navbar.styles';
import { NavbarProps } from './Navbar.interface';

export const Navbar: FC<NavbarProps> = ({
  leftContent,
  rightContent,
  children,
  style,
}) => {
  return (
    <S.NavbarContainerStyled style={style}>
      <S.NavbarLeftContentStyled>{leftContent}</S.NavbarLeftContentStyled>
      <S.NavbarContentStyled>
        <S.NavbarTitleStyled
          type="HeadingsSB4"
          textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
        >
          {children}
        </S.NavbarTitleStyled>
      </S.NavbarContentStyled>
      <S.NavbarRightContentStyled>{rightContent}</S.NavbarRightContentStyled>
    </S.NavbarContainerStyled>
  );
};
