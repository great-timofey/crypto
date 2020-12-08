import React, { useCallback, useRef, useState, forwardRef } from 'react';
import BottomSheetVendor from 'reanimated-bottom-sheet';
import { useSafeArea } from 'react-native-safe-area-context';
import Animated, { Extrapolate } from 'react-native-reanimated';

import { BottomSheetStaticProps } from './BottomSheetStatic.interface';
import * as S from './BottomSheetStatic.styles';

export const BottomSheetStatic = forwardRef<BottomSheetVendor, BottomSheetStaticProps>(
  ({ snapStart, title, children, onOpen, onClose }, ref) => {
    const { top } = useSafeArea();
    const fall = useRef(new Animated.Value(1)).current;

    const backgroundOpacity = useRef(
      Animated.interpolate(fall, {
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
    ).current;

    const headerOffset = useRef(
      Animated.interpolate(fall, {
        inputRange: [0, 1],
        outputRange: [top + 16, 16],
        extrapolateRight: Extrapolate.CLAMP,
      }),
    ).current;

    const borderRadius = useRef(
      Animated.interpolate(fall, {
        inputRange: [0, 0.5],
        outputRange: [0, 16],
        extrapolateRight: Extrapolate.CLAMP,
      }),
    ).current;

    const handlerOpacity = useRef(
      Animated.interpolate(fall, {
        inputRange: [0.8, 1],
        outputRange: [0, 1],
      }),
    ).current;

    const [wrapperHeight, setWrapperHeight] = useState(0);

    const handleLayout = useCallback(
      (event) => {
        // bottomSheetRef.current.snapTo(0);
        setWrapperHeight(event.nativeEvent.layout.height);
      },
      [setWrapperHeight],
    );

    return (
      <S.BottomSheetContainerStyled onLayout={handleLayout}>
        <S.BottomSheetBackgroundStyled style={{ opacity: backgroundOpacity }} />
        {!!wrapperHeight && (
          <BottomSheetVendor
            ref={ref}
            onOpenEnd={onOpen}
            onCloseEnd={onClose}
            snapPoints={[snapStart || '40%', wrapperHeight]}
            callbackNode={fall}
            renderContent={() => (
              <S.BottomSheetWrapperStyled
                style={{
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius,
                }}
              >
                <S.BottomSheetHandlerStyled style={{ opacity: handlerOpacity }} />
                <S.BottomSheetBodyStyled style={{ paddingTop: headerOffset }}>
                  <S.BottomSheetHeaderStyled type="HeadingsSB4">
                    {title}
                  </S.BottomSheetHeaderStyled>
                  {children}
                </S.BottomSheetBodyStyled>
              </S.BottomSheetWrapperStyled>
            )}
          />
        )}
      </S.BottomSheetContainerStyled>
    );
  },
);
