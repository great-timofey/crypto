import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigation } from '@react-navigation/native';

import * as S from '$screens/Wallet/Wallet.styles';
import { WalletScreenNavigationProp } from '$navigation/main/MainNavigator.interface';
import { Coin, Icon, LocalizedCurrency, Typography, UnifiedNumber } from '$components';
import {
  CurrencyCardContent,
  CurrencyCardFooter,
  CurrencyCardFooterSection,
  CurrencyCardHeader,
} from '$components/CurrencyCard';
import { Currency, CurrencyType } from '$global/types';
import { upperFirst } from '$global/utils';
import messages from '$i18n/shared/currencies.messages';
import { MainScreensNames } from '$navigation/names';
import { profileSelector } from '$redux/selectors';

type WalletHistoryHeaderProps = {
  name: string;
  abbr: Currency;
  type: CurrencyType;
  amount: number;
  isCryptocurrency: boolean;
  complementaryAmount: number;
  complementaryCurrency: Currency;
  copyableWalletAddress?: string;
  handleCopyToClipboard: () => void;
};

export const WalletHistoryHeader: FC<WalletHistoryHeaderProps> = memo((props) => {
  const navigation = useNavigation<WalletScreenNavigationProp>();
  const profile = useSelector(profileSelector);

  const {
    abbr,
    type,
    name,
    amount,
    isCryptocurrency,
    complementaryAmount,
    copyableWalletAddress,
    handleCopyToClipboard,
    complementaryCurrency,
  } = props;

  return (
    <S.WalletContentStyled>
      <S.CurrencyCardStyled>
        <CurrencyCardHeader icon={<Coin currency={abbr} />}>
          <Typography type="HeadingsSB4" style={{ maxWidth: 210 }}>
            <LocalizedCurrency type={type} abbr={abbr} cryptoName={upperFirst(name)} />
          </Typography>
        </CurrencyCardHeader>
        <CurrencyCardContent
          amount={
            <UnifiedNumber
              value={amount}
              {...(isCryptocurrency
                ? { maximumFractionDigits: 8 }
                : { fractionDigits: 2 })}
            />
          }
          currency={abbr.toUpperCase()}
        />
        <CurrencyCardFooter
          leftSection={
            <CurrencyCardFooterSection>
              ≈{' '}
              <UnifiedNumber
                {...(isCryptocurrency
                  ? { fractionDigits: 2 }
                  : { minimumFractionDigits: 2 })}
                value={complementaryAmount}
                currency={complementaryCurrency}
              />
            </CurrencyCardFooterSection>
          }
          rightSection={
            copyableWalletAddress ? (
              <CurrencyCardFooterSection
                ellipsized
                onPress={handleCopyToClipboard}
                icon={<Icon name="copy16px" />}
              >
                {copyableWalletAddress}
              </CurrencyCardFooterSection>
            ) : (
              <></>
            )
          }
        />
      </S.CurrencyCardStyled>
      <S.WalletActionsContainerStyled>
        {isCryptocurrency ? (
          abbr !== 'nrfx' && (
            <>
              <S.WalletActionButtonStyled
                disabled={profile.isWithdrawDisabled}
                appearance="outline"
                title={<FormattedMessage {...messages.send} />}
                onPress={() => navigation.navigate(MainScreensNames.CurrencySend)}
              />
              <S.WalletActionButtonStyled
                appearance="primary"
                title={<FormattedMessage {...messages.receive} />}
                onPress={() => navigation.navigate(MainScreensNames.CurrencyReceive)}
              />
            </>
          )
        ) : (
          <>
            <S.WalletActionButtonStyled
              appearance="outline"
              disabled={abbr !== 'idr' || profile.isWithdrawDisabled || !amount}
              title={<FormattedMessage {...messages.withdraw} />}
              onPress={() => navigation.navigate(MainScreensNames.FiatWithdrawal)}
            />
            <S.WalletActionButtonStyled
              appearance="primary"
              disabled={abbr !== 'idr'}
              title={<FormattedMessage {...messages.refill} />}
              onPress={() => navigation.navigate(MainScreensNames.FiatRefill)}
            />
          </>
        )}
      </S.WalletActionsContainerStyled>
      <S.HistoryTitleStyled type="HeadingsSB4">
        <FormattedMessage {...messages.history} />
      </S.HistoryTitleStyled>
    </S.WalletContentStyled>
  );
});
