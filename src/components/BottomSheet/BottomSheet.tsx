import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Reanimated from 'react-native-reanimated';
import { useSafeArea } from 'react-native-safe-area-context';
import BottomSheetComponent from 'reanimated-bottom-sheet';

import { BottomSheetProps } from './BottomSheet.interface';
import { BottomSheetHeader } from './BottomSheetHeader/BottomSheetHeader';
import * as S from './BottomSheet.styles';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$global/device';

export const BottomSheet = forwardRef<BottomSheetComponent, BottomSheetProps>(
  (
    {
      onClose,
      onOpen,
      opened,
      children,
      header,
      fixedSnapPoints = null,
      showFakeTabBar = true,
      contentContainerStyle,
      bottomSheetProps,
      showCloseButton = false,
    },
    ref,
  ) => {
    const { bottom } = useSafeArea();
    const [snapPoints, setSnapPoints] = useState<number[] | null>(fixedSnapPoints);
    const [contentHeight, setContentHeight] = useState(0);
    const [showClearfix, setShowClearfix] = useState(false);

    const fall = useRef(new Reanimated.Value(1)).current;
    const contentRef = useRef(new Reanimated.Value(0)).current;

    const opacifier = Reanimated.interpolate(fall, {
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1, 0],
      extrapolate: Reanimated.Extrapolate.CLAMP,
    });

    const clearfixer = Reanimated.interpolate(fall, {
      inputRange: [0, 0.5, 1],
      outputRange: [0, contentHeight / 2.5 + bottom, contentHeight / 2.5 + bottom],
      extrapolate: Reanimated.Extrapolate.CLAMP,
    });

    useEffect(() => {
      if (!contentHeight || fixedSnapPoints) return;

      const needShowClearfix = contentHeight >= DEVICE_HEIGHT * 0.9;

      setSnapPoints(
        contentHeight <= DEVICE_HEIGHT / 2
          ? [0, contentHeight]
          : [
              0,
              DEVICE_HEIGHT / 2,
              contentHeight >= DEVICE_HEIGHT * 0.9 ? DEVICE_HEIGHT * 0.9 : contentHeight,
            ],
      );

      setShowClearfix(needShowClearfix);
    }, [contentHeight, fixedSnapPoints, opened]);

    const calculateContentHeight = useCallback(
      (height: number) => {
        if (fixedSnapPoints || !height || height === contentHeight) return;
        setContentHeight(height);
      },
      [contentHeight, fixedSnapPoints],
    );

    const onFakeLayout = (e: LayoutChangeEvent) => {
      calculateContentHeight(e.nativeEvent.layout.height);
    };

    return (
      <>
        {(fixedSnapPoints || contentHeight > 0) && snapPoints && (
          <>
            {opened && (
              <S.BottomSheetOverlayContainerStyled activeOpacity={1} onPress={onClose}>
                <S.BottomSheetOverlayStyled style={{ opacity: opacifier }} />
              </S.BottomSheetOverlayContainerStyled>
            )}
            <BottomSheetComponent
              ref={ref}
              snapPoints={snapPoints}
              onCloseEnd={onClose}
              callbackNode={fall}
              onOpenStart={onOpen}
              contentPosition={contentRef}
              enabledBottomInitialAnimation
              borderRadius={header ? 0 : 16}
              {...bottomSheetProps}
              //  do not touch this styles, attempt to make this view styled component leads to broken content styling
              renderContent={() => (
                <View
                  style={{
                    height: '100%',
                    width: DEVICE_WIDTH,
                    zIndex: 5,
                    ...contentContainerStyle,
                  }}
                >
                  {children}
                  {/*//  we need clearfix for cases with dynamic snap points calculation*/}
                  {showClearfix && (
                    <Reanimated.View
                      style={{
                        height: clearfixer,
                        width: '100%',
                      }}
                    />
                  )}
                </View>
              )}
              renderHeader={() =>
                header ? (
                  <BottomSheetHeader
                    onCloseButtonPress={showCloseButton ? onClose : undefined}
                  >
                    {header}
                  </BottomSheetHeader>
                ) : (
                  <></>
                )
              }
            />
          </>
        )}

        {fixedSnapPoints ? (
          <></>
        ) : (
          <S.FakeLayoutContainerStyled>
            <View onLayout={onFakeLayout} style={{ paddingBottom: bottom }}>
              {header && (
                <BottomSheetHeader
                  onCloseButtonPress={showCloseButton ? onClose : undefined}
                >
                  {header}
                </BottomSheetHeader>
              )}
              {children}
            </View>
          </S.FakeLayoutContainerStyled>
        )}

        {showFakeTabBar ? <S.FakeTabBarStyled bottom={bottom} /> : <></>}
      </>
    );
  },
);
