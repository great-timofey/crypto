import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useClipboard as useClipboardRNCommunityHook } from '@react-native-community/hooks';

import messages from '$i18n/shared/Toast.messages';
import { displayToastSuccess } from '$redux/common/actions';

export function useClipboard(text: string, toastText?: string, callback?: () => void) {
  const [clipboardContent, setClipboardContent] = useClipboardRNCommunityHook();
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleCopyToClipboard = useCallback(() => {
    setClipboardContent(text);

    if (callback) {
      callback();
    }

    dispatch(
      displayToastSuccess(
        toastText || intl.formatMessage(messages.textCopiedToClipboard),
      ),
    );
  }, [callback, text, dispatch, intl, setClipboardContent, toastText]);

  return { handleCopyToClipboard, clipboardContent };
}
