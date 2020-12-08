import React, { useEffect, useRef, useState, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Animated } from 'react-native';
// import { Animated, StyleSheet, TouchableOpacity } from 'react-native';

import { ToastState } from './Toast.interface';
import { TOAST_ANIMATION_DURATION } from './constants';
// import { TOAST_ANIMATION_DURATION, TOAST_CONTAINER_ZINDEX } from './constants';
import * as S from './Toast.styles';

import { hideToastUserInitiated } from '$redux/common/actions';
import { useKeyboardHeight } from '$hooks';
import { commonSelector } from '$redux/selectors';

export const Toast: FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  // const showToastRef = useRef<boolean | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const { toastShown, toastIcon, toastIconFill, toastText } = useSelector(commonSelector);
  const keyboardHeight = useKeyboardHeight(40);
  const [{ fill, icon, text }, setToastProps] = useState<ToastState>({
    fill: null,
    icon: null,
    text: null,
  });
  const dispatch = useDispatch();

  const openToast = useCallback(() => {
    // showToastRef.current = true;
    Animated.timing(opacity, {
      toValue: 1,
      duration: TOAST_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const closeToast = useCallback(
    (trusted = false) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: TOAST_ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(() => {
        setShowOverlay(false);
        setToastProps({ fill: null, icon: null, text: null });
        // showToastRef.current = false;
        if (trusted) {
          dispatch(hideToastUserInitiated());
        }
      });
    },
    [opacity, dispatch],
  );

  useEffect(() => {
    if (toastShown) {
      // if (showToastRef.current) return;
      setShowOverlay(true);
      setToastProps({ fill: toastIconFill, icon: toastIcon, text: toastText });
      openToast();
    } else {
      // if (!showToastRef.current) return;
      closeToast();
    }
  }, [
    // showToastRef,
    opacity,
    openToast,
    closeToast,
    toastShown,
    toastText,
    toastIcon,
    toastIconFill,
  ]);

  return showOverlay ? (
    <S.ToastOverlayStyled style={{ paddingBottom: keyboardHeight }}>
      {/*<TouchableOpacity*/}
      {/*  onPress={() => {*/}
      {/*    !!icon && closeToast(true);*/}
      {/*  }}*/}
      {/*  style={[StyleSheet.absoluteFillObject, { zIndex: TOAST_CONTAINER_ZINDEX + 1 }]}*/}
      {/*/>*/}
      <S.ToastContainerStyled style={{ opacity }}>
        {icon ? (
          <S.ToastIconStyled name={icon} iconFill={fill} />
        ) : (
          <S.LoadingImageStyled toastMode />
        )}
        <S.ToastTitleStyled type="BodyAccent">{text}</S.ToastTitleStyled>
      </S.ToastContainerStyled>
    </S.ToastOverlayStyled>
  ) : (
    <></>
  );
};
