import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';

import * as S from './Splash.styles';

import { loadInitialData } from '$redux/common/actions';
import { commonSelector } from '$redux/selectors';
import { Icon } from '$components/Icon/Icon';
import { upperFirst } from '$global/utils';

export const Splash = ({ needLoadInitialData = false }) => {
  const dispatch = useDispatch();
  const { fatalError } = useSelector(commonSelector);
  const theme = useTheme();

  useEffect(() => {
    if (needLoadInitialData) {
      dispatch(loadInitialData());
    }
  }, [dispatch, needLoadInitialData]);

  const handleReload = () => {
    dispatch(loadInitialData());
  };

  return (
    <S.SplashScreenWrapperStyled>
      {fatalError ? (
        <S.SplashScreenErrorStyled>
          <Icon name="37" />
          <S.SplashScreenTextStyled type="HeadingsSB6">
            {upperFirst(fatalError)}
          </S.SplashScreenTextStyled>
          <S.SplashScreenButtonStyled
            appearance="ghost"
            title="Reload"
            onPress={handleReload}
          />
        </S.SplashScreenErrorStyled>
      ) : (
        <S.SplashScreenLoaderStyled
          appearance={theme.isCurrent('light') ? 'dark' : 'light'}
        />
      )}
    </S.SplashScreenWrapperStyled>
  );
};
