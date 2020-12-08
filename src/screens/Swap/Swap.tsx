import React, { FC, useCallback, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ListRenderItemInfo } from 'react-native';
import {
  State,
  FlatList,
  Directions,
  FlingGestureHandler,
  FlingGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import { SwapCurrencyOperationEnum, SwapUIProps } from './Swap.interface';
import messages from './Swap.messages';
import * as S from './Swap.styles';
import { SwapCurrencyPair } from './SwapCurrencyPair/SwapCurrencyPair';
import { SwapCurrencyTabs } from './SwapCurrencyTabs/SwapCurrencyTabs';

import {
  BottomSheet,
  Coin,
  CustomKeyboard,
  Icon,
  LocalizedCurrency,
  StatusBar,
  Typography,
  UnifiedNumber,
} from '$components';
import { DOT_CHARACTER, REGEXES } from '$global/constants';
import { getValueByPressKey } from '$global/currencies/formatting';
import { DEVICE_HEIGHT } from '$global/device';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import { CurrencyType } from '$global/types';
import { addHitSlop } from '$global/utils';
import { useSwapAmount } from '$hooks';
import { MainScreensNames } from '$navigation/names';
import { currenciesForSwapSelector, swapSelector } from '$redux/selectors';
import { swapActions } from '$redux/swap';
import { CurrenciesItem } from '$redux/wallets/interface';

export const Swap: FC<SwapUIProps> = ({ navigation }) => {
  const { bottom } = useSafeArea();
  const theme = useTheme();
  const dispatch = useDispatch();
  const currencies = useSelector(currenciesForSwapSelector);
  const swap = useSelector(swapSelector);
  const [currenciesSheetOpen, setCurrenciesSheetOpen] = useState(false);
  const [activeOperationTab, setActiveOperationTab] = useState<SwapCurrencyOperationEnum>(
    SwapCurrencyOperationEnum.give,
  );
  const bottomSheetRef = useRef<BottomSheetBehavior>(null);

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
      } else {
        lightenStatusBar();
      }
    }, [theme]),
  );

  const {
    currencyFromInfo,
    currencyToInfo,
    currentCurrencyInfo,
    overallAvailable,
    secondaryCurrencyInfo,
    overallAvailableCurrentCurrency,
    secondaryAmount,
    amountType,
  } = useSwapAmount();

  const handleInsertMaxAmount = () => {
    dispatch(
      swapActions.setAmount(
        parseFloat(
          overallAvailableCurrentCurrency.toFixed(
            currentCurrencyInfo.maximumFractionDigits,
          ),
        ).toString(),
      ),
    );
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(swapActions.startPoolingRate());
      return () => {
        dispatch(swapActions.stopPoolingRate());
      };
    }, [dispatch]),
  );

  const handleToggleAmountType = () => {
    dispatch(swapActions.toggleAmountType());

    dispatch(
      swapActions.setAmount(
        (
          parseFloat(
            secondaryAmount.toFixed(secondaryCurrencyInfo.maximumFractionDigits),
          ) || 0
        ).toString(),
      ),
    );
  };

  const handleKeyboardInput = (key: string) => {
    const updatedAmount = getValueByPressKey(swap.amount, key);

    if (REGEXES.inputs[amountType].test(updatedAmount)) {
      dispatch(swapActions.setAmount(updatedAmount));
    }
  };

  const handleEraseSwipe = ({ nativeEvent }: FlingGestureHandlerStateChangeEvent) => {
    if (nativeEvent.state === State.ACTIVE) {
      handleKeyboardErase();
    }
  };

  const handleKeyboardErase = () => {
    const updatedAmount = swap.amount.slice(0, -1);
    const [number, decimal] = updatedAmount.split(DOT_CHARACTER);
    dispatch(swapActions.setAmount(decimal?.length > 0 ? updatedAmount : number));
  };

  const handleCleanKeyboardInput = () => {
    dispatch(swapActions.setAmount('0'));
  };

  const handleOpenSheet = () => {
    if (theme.isCurrent('light')) {
      lightenStatusBar();
    }

    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({ gestureEnabled: false });

    bottomSheetRef.current?.snapTo(1);
  };

  const handleCloseSheet = () => {
    bottomSheetRef.current?.snapTo(0);

    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({ gestureEnabled: true });

    if (theme.isCurrent('light')) {
      darkenStatusBar();
    }

    setCurrenciesSheetOpen(false);
  };

  const displayNumber = (value: string) => {
    if (!value || value.endsWith(DOT_CHARACTER)) {
      return `${value}0`;
    }

    return value;
  };

  const handleChangeCurrencyTab = useCallback(
    (tabIndex: SwapCurrencyOperationEnum) => {
      if (tabIndex === activeOperationTab) return;

      setActiveOperationTab(
        activeOperationTab === SwapCurrencyOperationEnum.give
          ? SwapCurrencyOperationEnum.receive
          : SwapCurrencyOperationEnum.give,
      );
    },
    [activeOperationTab],
  );

  const handlePressSwap = () => {
    if (parseFloat(swap.amount) > overallAvailableCurrentCurrency) {
      navigation.push(MainScreensNames.SwapInsufficientFunds);
    } else {
      navigation.navigate(MainScreensNames.SwapRate);
    }
  };

  const handleBottomSheetItemPress = (
    tab: SwapCurrencyOperationEnum,
    item: CurrenciesItem,
  ) => () => {
    const { type, abbr } = item;

    if (tab === SwapCurrencyOperationEnum.give) {
      dispatch(swapActions.setFromCurrency(abbr));
      if (type === currencyToInfo.type) {
        dispatch(swapActions.setToCurrency(type === CurrencyType.fiat ? 'btc' : 'usd'));
      }
    } else {
      dispatch(swapActions.setToCurrency(abbr));
      if (type === currencyFromInfo.type) {
        dispatch(swapActions.setFromCurrency(type === CurrencyType.fiat ? 'btc' : 'usd'));
      }
    }

    handleCloseSheet();
  };

  //  TODO: change to actual interface
  // @ts-ignore
  const renderSheetItem = (tab: SwapCurrencyOperationEnum) => (
    info: ListRenderItemInfo<CurrenciesItem>,
  ) => {
    const {
      item,
      item: { abbr, type, name },
    } = info;
    return (
      <S.WalletsBottomSheetItemStyled
        caption={<Coin currency={abbr} />}
        onPress={handleBottomSheetItemPress(tab, item)}
      >
        <Typography type="HeadingsSB6">
          <LocalizedCurrency {...{ abbr, type, cryptoName: name }} />
        </Typography>
        <Typography type="HeadingsR6">{abbr.toUpperCase()}</Typography>
      </S.WalletsBottomSheetItemStyled>
    );
  };

  return (
    <>
      <S.SwapContainerStyled style={{ paddingBottom: bottom }}>
        <StatusBar />
        <S.SwapHeaderContainerStyled>
          <Typography type="HeadingsSB4">
            <FormattedMessage {...messages.currencySwap} />
          </Typography>
          <S.CloseButtonStyled
            appearance="icon"
            onPress={navigation.goBack}
            touchableProps={{ ...addHitSlop([50]) }}
          >
            <Icon name="close-large" fill={theme.colors.primaryBlue} />
          </S.CloseButtonStyled>
        </S.SwapHeaderContainerStyled>
        <S.AvailableSumStyled type="HeadingsSB6">
          <FormattedMessage
            {...messages.overallAvailable}
            values={{
              availableAmount: (
                <UnifiedNumber
                  value={overallAvailable}
                  currency={currencyFromInfo.abbr}
                />
              ),
            }}
          />
        </S.AvailableSumStyled>
        <S.SwapContentContainer>
          <FlingGestureHandler
            direction={Directions.RIGHT | Directions.LEFT}
            onHandlerStateChange={handleEraseSwipe}
          >
            <S.SwapContentTextWrapperStyled>
              <S.ContentTextStyled numberOfLines={1} adjustsFontSizeToFit>
                {displayNumber(swap.amount)} {currentCurrencyInfo.abbr.toUpperCase()}
              </S.ContentTextStyled>
              <S.ToggleAmountTypeStyled
                onPress={handleToggleAmountType}
                {...addHitSlop([20])}
              >
                <Icon name="switch" fill={theme.colors.foregroundQuaternary} />
              </S.ToggleAmountTypeStyled>
            </S.SwapContentTextWrapperStyled>
          </FlingGestureHandler>
          <S.EnterWholeAvailableSumButtonStyled onPress={handleInsertMaxAmount}>
            <S.EnterWholeAvailableSumButtonTitleStyled type="BodyAccent">
              <FormattedMessage
                {...messages.insertMaxAmount}
                values={{
                  overallAmount: (
                    <UnifiedNumber
                      value={overallAvailableCurrentCurrency}
                      currency={currentCurrencyInfo.abbr}
                    />
                  ),
                }}
              />
            </S.EnterWholeAvailableSumButtonTitleStyled>
          </S.EnterWholeAvailableSumButtonStyled>
        </S.SwapContentContainer>
        <SwapCurrencyPair
          give={swap.fromCurrency}
          receive={swap.toCurrency}
          onPress={handleOpenSheet}
        />
        <CustomKeyboard
          style={{ marginBottom: 8 }}
          onInput={handleKeyboardInput}
          onErase={handleKeyboardErase}
          onFullErase={handleCleanKeyboardInput}
        />
        <S.ToSwapRateButtonStyled
          disabled={!parseFloat(swap.amount) || !swap.actualRate}
          onPress={handlePressSwap}
          title={<FormattedMessage {...messages.toSwapRate} />}
        />
      </S.SwapContainerStyled>
      <BottomSheet
        ref={bottomSheetRef}
        opened={currenciesSheetOpen}
        fixedSnapPoints={[0, DEVICE_HEIGHT * 0.8]}
        showFakeTabBar={false}
        onOpen={() => setCurrenciesSheetOpen(true)}
        onClose={handleCloseSheet}
        showCloseButton
        contentContainerStyle={{
          backgroundColor: theme.colors.backgroundSecondary,
        }}
        header={
          <S.WalletsBottomSheetTitleStyled type="HeadingsSB4">
            <FormattedMessage {...messages.chooseCurrencies} />
          </S.WalletsBottomSheetTitleStyled>
        }
      >
        <SwapCurrencyTabs
          give={swap.fromCurrency}
          receive={swap.toCurrency}
          activeTabIndex={activeOperationTab}
          onChangeTab={handleChangeCurrencyTab}
        />
        <FlatList
          data={currencies}
          renderItem={renderSheetItem(activeOperationTab)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingBottom: bottom }}
        />
      </BottomSheet>
    </>
  );
};
