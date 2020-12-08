import styled, { css } from 'styled-components';

export const AuthProgressContainerStyled = styled.View<{ useHeight100: boolean }>`
  ${({ useHeight100 }) =>
    useHeight100
      ? 'height: 100%'
      : css`
          flex: 1;
          margin: 0;
        `}
`;
