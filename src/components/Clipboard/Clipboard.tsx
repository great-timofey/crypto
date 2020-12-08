import React, { FC } from 'react';
import { useClipboard } from '@react-native-community/hooks';
import { ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import * as S from './Clipboard.styled';

import { displayToastSuccess } from '$redux/common/actions';
import messages from '$i18n/shared/Toast.messages';

export const Clipboard: FC<{ text: string; toastText?: string; style?: ViewStyle }> = ({
  text,
  style,
  toastText,
}) => {
  const [, setClipboardText] = useClipboard();
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleCopy = () => {
    setClipboardText(text);
    dispatch(
      displayToastSuccess(
        toastText || intl.formatMessage(messages.textCopiedToClipboard),
      ),
    );
  };

  return (
    <S.ClipboardStyled style={style} onPress={handleCopy}>
      {text}
    </S.ClipboardStyled>
  );
};
