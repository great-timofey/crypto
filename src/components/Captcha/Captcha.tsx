import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ViewStyle } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useTheme } from 'styled-components';

import { Button } from '../Button/Button';
import { ButtonAppearance } from '../Button/Button.interface';

import { patchPostMessageJsCode } from './utils';
import { CaptchaStyled } from './Captcha.styles';
import { CaptchaProps } from './Captcha.interface';

import { DEFAULT_SCREEN_PADDING } from '$global/constants';
import { DEVICE_WIDTH, isISE } from '$global/device';
import shortMessages from '$i18n/shared/short.messages';
import { RECAPTCHA_KEY, RECAPTCHA_BASE_URL } from '$services/config';

export const Captcha: FC<CaptchaProps> = memo(({ onSuccess, onFailure }) => {
  const { top, bottom } = useSafeArea();
  const theme = useTheme();

  const generateTheWebViewContent = (sitekey: string) => `<!DOCTYPE html>
      <html lang="en">
      <head> 
        <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
        <script src="https://recaptcha.google.com/recaptcha/api.js?explicit&hl='en'"></script> 
        <script type="text/javascript"> 
        var onDataCallback = function(response) { 
          window.ReactNativeWebView.postMessage(response);  
          setTimeout(function () {
            document.getElementById('captcha').style.display = 'none';
          }, 1500);
        };  
        var onCancel = function() {  
          window.ReactNativeWebView.postMessage("cancel"); 
          document.getElementById('captcha').style.display = 'none';
        }
        var onDataExpiredCallback = function(error) {  
          window.ReactNativeWebView.postMessage("expired");
         };  
        var onDataErrorCallback = function(error) {  
          window.ReactNativeWebView.postMessage("error");
         } 
        </script> 
        <style>
          html, body {
           height: 100%;
           background-color: ${theme.colors.backgroundBlur};
          }
          
          body {
           overflow: hidden;
           margin: 0;
           display: flex;
           flex-direction: column;
           background-color: transparent;
          }
          
          .captcha {
            z-index: 1;
            margin-top: auto;
            text-align: center;
           background-color: transparent;
          }
          
          .btn {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            color: transparent; 
            margin-top: 16px; 
            border: none; 
            font-size: 20px;
            text-align: center;
            font-family: Montserrat, Arial, sans-serif;
            font-weight: bold;
           background-color: transparent;
          }
          
          .btn:active {
            opacity: 1;
            outline: none;
            background-color: transparent;
            color: transparent; 
          }
          
          .btn:focus {
            opacity: 1;
            outline: none;
            background-color: transparent;
            color: transparent; 
          }
          
          .clearfix {
            height: 150px;
            width: 100%;
           background-color: transparent;
          }
        </style>
      </head>
      <body> 
        <div>
          <div 
            onclick="onCancel()"
            class="btn">
          </div> 
        </div>
        <div class="captcha">
          <div class="g-recaptcha" style="display: inline-block; height: auto;" 
            data-theme="${theme.isCurrent('light') ? 'light' : 'dark'}"
            data-sitekey="${sitekey}" data-callback="onDataCallback"  
            data-expired-callback="onDataExpiredCallback"  
            data-error-callback="onDataErrorCallback">
          </div>
        </div>
        <div class="clearfix"></div> 
      </body>
      </html>`;

  const [buttonDown, setButtonDown] = useState(false);

  const onMessage = (event: { nativeEvent?: { data?: string } }) => {
    const message = event?.nativeEvent?.data;

    if (!message) {
      onFailure('no data received from webview');
      return;
    }

    if (message === 'bottom-down') {
      setButtonDown(true);
      return;
    }

    if (message === 'bottom-up') {
      setButtonDown(false);
      return;
    }

    if (['cancel', 'error', 'expired'].includes(message)) {
      onFailure(message);
      return;
    }

    setTimeout(() => {
      onSuccess(message);
    }, 1500);
  };

  const ref = useRef<WebView | null>(null);

  useEffect(() => {
    const run = `
      const interval = setInterval(() => {
        const recaptchaSelector = 'iframe[title*="recaptcha"]'
        if (window.getComputedStyle(document.querySelector(recaptchaSelector)).visibility === "visible") {
          document.querySelector(recaptchaSelector).offsetParent.offsetParent.style.top = '${top}px';
          window.ReactNativeWebView.postMessage('bottom-down');  
        } else {
          window.ReactNativeWebView.postMessage('bottom-up');  
        }
      }, 500)
    `;

    setTimeout(() => {
      ref.current?.injectJavaScript(run);
    }, 1000);
  }, [top]);

  const getButtonAppearance = () => {
    let appearance: ButtonAppearance;
    let buttonBottomPosition;

    if (theme.isCurrent('light')) {
      appearance = 'ghost';
    } else {
      appearance = buttonDown ? 'primary' : 'ghost';
    }

    if (buttonDown) {
      buttonBottomPosition = isISE ? 0 : 10;
    } else {
      buttonBottomPosition = bottom || 30;
    }

    return {
      appearance,
      style: {
        width: DEVICE_WIDTH - DEFAULT_SCREEN_PADDING * 2,
        alignSelf: 'center',
        position: 'absolute',
        bottom: buttonBottomPosition,
      } as ViewStyle,
    };
  };
  /**
   * problem with auto managable status bar color
   * after webview hiding status bas will change color and become white
   * for now you need to manually update Obj-C code after every yarn install
   * @see {@link https://github.com/react-native-community/react-native-webview/issues/735}
   */
  return (
    <>
      <CaptchaStyled
        ref={ref}
        originWhitelist={['*']}
        mixedContentMode="always"
        onMessage={onMessage}
        javaScriptEnabled
        injectedJavaScript={patchPostMessageJsCode}
        automaticallyAdjustContentInsets
        source={{
          html: generateTheWebViewContent(RECAPTCHA_KEY),
          baseUrl: RECAPTCHA_BASE_URL,
        }}
        containerStyle={{
          backgroundColor: theme.colors.backgroundBlur,
        }}
        style={{ paddingTop: top, backgroundColor: theme.colors.backgroundBlur }}
      />

      <Button
        {...getButtonAppearance()}
        onPress={() => onFailure('')}
        title={<FormattedMessage {...shortMessages.cancel} />}
      />
    </>
  );
});
