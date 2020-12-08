import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FormattedMessage, useIntl } from 'react-intl';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';

import * as S from './UIKit.styles';

import {
  BadgedButton,
  BankLogo,
  Banner,
  CaptionCell,
  CircleIcon,
  Clipboard,
  Coin,
  CurrencyPair,
  HistoryItem,
  Icon,
  ListItem,
  Navbar,
  PostTime,
  RadioButton,
  Status,
  StatusBar,
  Switch,
  Tabs,
  Time,
  Typography,
  SvgUri,
} from '$components';
import {
  CurrencyCard,
  CurrencyCardContent,
  CurrencyCardFooter,
  CurrencyCardFooterSection,
  CurrencyCardHeader,
} from '$components/CurrencyCard';
import { BOTTOM_TAB_BAR_HEIGHT } from '$global/constants';
import { isAndroid } from '$global/device';
import { darkenStatusBar, lightenStatusBar } from '$global/statusBar';
import messages from '$i18n/shared/currencies.messages';
import { displayToast } from '$redux/common/actions';
import { AppDispatch } from '$redux/store';
import { StatusEnum } from '$global/types';

export const UIKit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bottom, top } = useSafeArea();

  const theme = useTheme();
  const intl = useIntl();

  const handleCopyToClipboard = () => {
    dispatch(
      displayToast({
        text: intl.formatMessage(messages.addressCopiedToClipboard),
        icon: 'check',
        iconFill: 'success',
      }),
    );
  };

  const [switchValue, handleToggleSwitch] = useState(true);
  const [radioButtonValue, handleRadioButtonValue] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (theme.isCurrent('light')) {
        darkenStatusBar();
        return;
      }

      lightenStatusBar();
    }, [theme]),
  );
  const [activeTab, setActiveTab] = useState('transfer');

  return (
    <S.UIKitContainerStyled>
      <StatusBar />
      <Navbar>UIKit</Navbar>
      <S.ContainerStyled
        contentContainerStyle={{
          paddingBottom: BOTTOM_TAB_BAR_HEIGHT + 20 + (isAndroid ? top : 0) + bottom + 10,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Typography type="HeadingsBigHeader">Inputs</Typography>
        <S.InputStyled />
        <S.InputStyled iconLeftName="menu" />
        <S.InputStyled placeholder="Placeholder" />
        <S.InputStyled placeholder="Label on the right" labelRight="SFX" />
        <S.InputStyled placeholder="Icon on the right" iconRightName="wallet" />
        <S.InputStyled disabled value="Disabled input" />
        <S.InputStyled iconLeftName="copy" disabled value="Disabled input with icon" />
        <S.InputStyled label="Label" />
        <S.InputStyled label="Label for disabled input" disabled />
        <S.InputStyled label="Label" description="Description text" />
        <S.InputStyled
          label="Label"
          description="Description text"
          disabled
          value="Disabled input with label, description"
        />
        <S.InputStyled
          appearance="invisible"
          iconRightName="help-alt"
          inputProps={{ autoFocus: false }}
        />
        <S.InputStyled
          inputProps={{ autoFocus: false }}
          appearance="invisible"
          value="NARFEXPRO"
          iconRightName="help-alt"
        />
        <Typography type="HeadingsBigHeader">Buttons</Typography>
        <S.ButtonWithMargin title="Primary" onPress={() => console.log(1)} />
        <S.ButtonWithMargin
          title="Outline"
          appearance="outline"
          onPress={() => console.log(1)}
        />
        <S.ButtonWithMargin
          title="Ghost"
          appearance="ghost"
          onPress={() => console.log(1)}
        />
        <S.ButtonWithMargin disabled title="Primary" onPress={() => console.log(1)} />
        <S.ButtonWithMargin
          disabled
          title="Outline"
          appearance="outline"
          onPress={() => console.log(1)}
        />
        <S.ButtonWithMargin
          disabled
          title="Ghost"
          appearance="ghost"
          onPress={() => console.log(1)}
        />
        <Typography type="HeadingsBigHeader">Typography</Typography>
        <Typography type="HeadingsSB1">Headings</Typography>
        <Typography type="HeadingsSB1">Headings SB 1</Typography>
        <Typography type="HeadingsSB2">Headings SB 2</Typography>
        <Typography type="HeadingsSB3">Headings SB 3</Typography>
        <Typography type="HeadingsSB4">Headings SB 4</Typography>
        <Typography type="HeadingsSB5">Headings SB 5</Typography>
        <Typography type="HeadingsSB6">Headings SB 6</Typography>
        <Typography type="HeadingsR1">Headings R 1</Typography>
        <Typography type="HeadingsR2">Headings R 2</Typography>
        <Typography type="HeadingsR3">Headings R 3</Typography>
        <Typography type="HeadingsR4">Headings R 4</Typography>
        <Typography type="HeadingsR5">Headings R 5</Typography>
        <Typography type="HeadingsR6">Headings R 6</Typography>
        <Typography type="HeadingsSB1">Body</Typography>
        <Typography type="BodyText1SB">Body Text1SB</Typography>
        <Typography type="BodyText2R">Body Text2R</Typography>
        <Typography type="BodyText3SB">Body Text3SB</Typography>
        <Typography type="BodyText3R">Body Text3R</Typography>
        <Typography type="BodyAccent">Body Accent</Typography>
        <Typography type="BodySmallText">Body SmallText</Typography>
        <Typography type="BodyInput">Body Input</Typography>
        <Typography type="BodyLabelNumbers">Body LabelNumbers</Typography>
        <Typography type="HeadingsSB1">Buttons</Typography>
        <Typography type="Buttons1SB">Button 1SB</Typography>
        <Typography type="Buttons2SB">Button 2SB</Typography>
        <Typography type="HeadingsSB1">Captions</Typography>
        <Typography type="Caption1M">Caption 1M</Typography>
        <Typography type="Caption2SB">Caption 2SB</Typography>

        <View style={{ backgroundColor: theme.colors.error }}>
          <S.LoaderStyled />
        </View>
        <S.LoaderStyled fill="#000" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <BadgedButton
            badgeContent={1}
            iconName="user-woman"
            onPress={() => console.log('press badged button')}
          />
          <BadgedButton
            badgeContent={10}
            iconName="shopping-cart"
            onPress={() => console.log('press badged button')}
          />
          <BadgedButton
            badgeContent={100}
            iconName="trash"
            onPress={() => console.log('press badged button')}
          />
          <BadgedButton
            badgeContent={1000}
            iconName="wallet"
            onPress={() => console.log('press badged button')}
          />
        </View>
        <CaptionCell caption={<CircleIcon name="home" />}>
          <Typography type="HeadingsSB5">Header goes here</Typography>
          <Typography type="BodySmallText">Content goes here</Typography>
        </CaptionCell>

        <S.CoinsWrapper>
          <S.CircleCoinStyled name="home" />
          <S.CircleCoinStyled name="home" fill="#F8AC4D" />
          <S.CircleCoinStyled name="home" gradient={['#896ADF', '#98B1F1']} />
          <S.CircleCoinStyled name="home" fill="#F8AC4D" loading />
          <S.CoinStyled currency="ltc" />
        </S.CoinsWrapper>

        <Typography type="HeadingsBigHeader">PostTime</Typography>

        <PostTime time={0} />
        <PostTime time={Date.now()} />
        <PostTime time={Date.now() - 60000} />

        <CurrencyCard style={{ marginBottom: 16 }}>
          <CurrencyCardHeader icon={<Coin currency="btc" />}>
            <Typography type="HeadingsSB4">Bitcoin</Typography>
          </CurrencyCardHeader>
          <CurrencyCardContent amount="10000.40525453" currency="BTC" />
          <CurrencyCardFooter
            leftSection={
              <CurrencyCardFooterSection>
                ≈296500000000000.07USD
              </CurrencyCardFooterSection>
            }
            rightSection={
              <CurrencyCardFooterSection
                onPress={handleCopyToClipboard}
                ellipsized
                icon={<Icon name="copy16px" />}
              >
                3NZxCsdlsdkfljsldjflkj
              </CurrencyCardFooterSection>
            }
          />
        </CurrencyCard>

        <CurrencyCard style={{ marginBottom: 16 }}>
          <CurrencyCardHeader icon={<Coin currency="nrfx" />}>
            <Typography type="HeadingsSB4">Narfex Token</Typography>
          </CurrencyCardHeader>
          <CurrencyCardContent amount="1000000000000001.40525453" currency="NRFX" />

          <CurrencyCardFooter
            leftSection={
              <CurrencyCardFooterSection>
                ≈29650000000000000000000000.07USD
              </CurrencyCardFooterSection>
            }
            rightSection={
              <CurrencyCardFooterSection
                onPress={handleCopyToClipboard}
                ellipsized
                icon={<Icon name="copy16px" />}
              >
                3NZxCsdlsdkfljsldjflkj
              </CurrencyCardFooterSection>
            }
          />
        </CurrencyCard>
        <Typography type="HeadingsBigHeader">Tabs</Typography>
        <Tabs
          style={{ marginBottom: 8 }}
          tabs={[
            { name: 'transfer', title: 'Narfex' },
            { name: 'transaction', title: 'Bitcoin' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <Typography style={{ marginBottom: 24 }} type="BodyText1SB">
          Active tab name: {activeTab}
        </Typography>

        <Typography type="HeadingsBigHeader">Banner</Typography>
        <Banner
          onPress={() => console.log(1)}
          iconLeft={<Icon name="15" />}
          iconRight={<Icon name="angle-right" />}
        >
          <Typography type="HeadingsSB6">
            <FormattedMessage
              {...messages.buyCurrencyProfitably}
              values={{ currency: 'Bitcoin' }}
            />
          </Typography>
        </Banner>

        <Typography type="HeadingsBigHeader">Clipboard</Typography>
        <S.ComponentWrapperStyled>
          <Clipboard text="445883949112373" />
        </S.ComponentWrapperStyled>

        <Typography type="HeadingsBigHeader">BankLogo</Typography>
        <S.ComponentWrapperStyled>
          <BankLogo code="MANDIRI" />
        </S.ComponentWrapperStyled>

        <Typography type="HeadingsBigHeader">Time</Typography>
        <S.ComponentWrapperStyled>
          <Typography type="BodyAccent">
            <Time time={0} />
          </Typography>
          <Typography type="BodyAccent">
            <Time time={1000000000} />
          </Typography>
          <Typography type="BodyAccent">
            <Time time={Date.now()} />
          </Typography>
        </S.ComponentWrapperStyled>

        <Typography type="HeadingsBigHeader">HistoryItem</Typography>
        <S.ComponentWrapperStyled style={{ marginHorizontal: -16 }}>
          <HistoryItem
            title="Поступление средств"
            iconFill="success2"
            amount={10}
            currency="btc"
            info="Получено c адреса 7461L.. c2c171"
            time={1000}
          />
          <HistoryItem
            title="Верификация аккаунта"
            iconFill="warning"
            icon="id-badge"
            info="Подана заявка на верификацию, если вы не совершали данное действие обратитесь в службу поддержки."
            time={1000}
          />
        </S.ComponentWrapperStyled>

        <Typography type="HeadingsBigHeader">ListItem</Typography>
        <S.ComponentWrapperStyled style={{ marginHorizontal: -16 }}>
          <ListItem
            type="list-1"
            label="Item Label"
            info="100 000 IDR"
            description="fee: 1000 IDR"
          />
          <ListItem
            type="list-2"
            label="Item Label"
            info="100 000 IDR"
            description="fee: 1000 IDR"
          />
          <ListItem
            type="list-3"
            icon="trash"
            label="Item Label"
            info="100 000 IDR"
            description="fee: 1000 IDR"
          />
          <ListItem
            type="list-menu"
            icon="archive"
            label="Label"
            suffix="Suffix"
            angle
            onPress={console.log}
          />
          <ListItem
            type="list-menu"
            icon="archive"
            label="Label"
            control={<Switch value={switchValue} onChange={handleToggleSwitch} />}
          />
        </S.ComponentWrapperStyled>

        <Typography type="HeadingsBigHeader">Switch</Typography>
        <S.ComponentWrapperStyled>
          <Switch value={switchValue} onChange={handleToggleSwitch} />
          <Typography type="HeadingsSB4">{switchValue ? 'on' : 'off'}</Typography>
        </S.ComponentWrapperStyled>

        <Typography type="HeadingsBigHeader">RadioButton</Typography>
        <S.ComponentWrapperStyled>
          <RadioButton
            value={!radioButtonValue}
            onChange={() => handleRadioButtonValue(false)}
          />
        </S.ComponentWrapperStyled>
        <S.ComponentWrapperStyled>
          <RadioButton
            value={radioButtonValue}
            onChange={() => handleRadioButtonValue(true)}
          />
        </S.ComponentWrapperStyled>
        <Typography type="HeadingsBigHeader">CurrencyPair</Typography>
        <S.ComponentWrapperStyled>
          <CurrencyPair from="usd" to="btc" />
        </S.ComponentWrapperStyled>
        <Typography type="HeadingsBigHeader">Status</Typography>
        <S.ComponentWrapperStyled>
          <Status type="HeadingsSB4" value={StatusEnum.failed} />
        </S.ComponentWrapperStyled>
        <S.ComponentWrapperStyled>
          <Status type="HeadingsSB4" value={StatusEnum.pending} />
        </S.ComponentWrapperStyled>
        <Typography type="HeadingsBigHeader">SvgUri</Typography>
        <S.ComponentWrapperStyled>
          <SvgUri
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'blue',
            }}
            uri="https://static.narfex.com/img/currencies/bitcoin.svg"
          />
        </S.ComponentWrapperStyled>
      </S.ContainerStyled>
    </S.UIKitContainerStyled>
  );
};
