import React, { FC, useState, useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';

import * as S from './BlurView.styles';

export const BlurView: FC = ({ children }) => {
  const [ableToRender, setAbleToRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      Keyboard.dismiss();
      setAbleToRender(true);
    }, 200);
  }, []);

  return (
    <S.BlurViewStyled {...StyleSheet.absoluteFillObject}>
      {ableToRender ? children : <></>}
    </S.BlurViewStyled>
  );
};
