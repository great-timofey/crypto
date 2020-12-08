import styled from 'styled-components';

import { CaptionCell, Loader, Typography } from '$components';

export const WalletsContainerStyled = styled.ScrollView`
  z-index: 1;
  display: flex;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const ActivityIndicatorStyled = styled(Loader)`
  margin: auto;
`;

export const WalletsLoaderWrapperStyled = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const WalletsHeaderStyled = styled(Typography)`
  margin: 16px;
`;

export const WalletsBottomSheetTitleStyled = styled(Typography)`
  max-width: 85%;
`;

export const WalletsBottomSheetItemStyled = styled(CaptionCell)`
  padding: 20px 0;
  min-height: 80px;
`;
