import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';

type CurrencyCardHeaderProps = {
  icon?: ReactNode;
};

export const CurrencyCardHeader: FC<CurrencyCardHeaderProps> = ({ icon, children }) => {
  return (
    <CurrencyCardHeaderStyled>
      {icon && (
        <CurrencyCardHeaderIconContainerStyled>
          {icon}
        </CurrencyCardHeaderIconContainerStyled>
      )}
      {children}
    </CurrencyCardHeaderStyled>
  );
};

export const CurrencyCardHeaderStyled = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  width: 100%;
  align-items: center;
`;

export const CurrencyCardHeaderIconContainerStyled = styled.View`
  margin-right: 16px;
`;
