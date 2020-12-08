const window: any = '';
export const patchPostMessageJsCode = `(${String(function() {
  const originalPostMessage = window.ReactNativeWebView.postMessage;
  const patchedPostMessage = function(message: any, targetOrigin: any, transfer: any) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };
  window.ReactNativeWebView.postMessage = patchedPostMessage;
})})();`;
