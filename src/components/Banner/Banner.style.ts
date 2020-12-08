import styled from 'styled-components';

export const BannerStyled = styled.TouchableOpacity<{ pressed: boolean }>`
  flex-direction: row;
  min-height: 72px;
  padding: 8px;
  width: 100%;
  align-items: center;
  background: ${({ theme, pressed }) =>
    pressed ? theme.colors.backgroundTertiary : theme.colors.backgroundSecondary};
  border: 0.5px solid ${({ theme }) => theme.colors.backgroundTertiary};
  border-radius: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const BannerIconContainerStyled = styled.View`
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

export const BannerContentWrapperStyled = styled.View`
  margin-right: auto;
  max-width: 200px;
`;
