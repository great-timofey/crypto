import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { StatusBar } from '../StatusBar/StatusBar';

import * as S from './NoConnection.styles';
import messages from './NoConnection.messages';

export const NoConnection: FC = () => {
  const { bottom } = useSafeArea();
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, bottom }}>
      <StatusBar backgroundColorKey="backgroundPrimary" />
      <S.ContainerStyled>
        <S.IconStyled name="29" />
        <S.TitleStyled type="HeadingsSB6">
          <FormattedMessage {...messages.noConnection} />
        </S.TitleStyled>
      </S.ContainerStyled>
    </View>
  );
};
