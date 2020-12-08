import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationMountedRef = createRef<boolean>();
export const navigationRef = createRef<NavigationContainerRef>();

/**
 * function for execution navigation actions
 * without access to navigation prop
 * e.g. in redux saga
 * @param name route name to navigate
 * @param params object with navigation action params
 * @returns void
 */
export function appNavigate(name: string, params?: any) {
  if (navigationMountedRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
    console.log('navigation error, app hasnt been mounted at the moment');
  }
}

/**
 * parses passed url params
 * useful for deep linking
 * @param url string to parse
 * @returns undefined if no params or object with type {[paramName] : [paramValue]}
 */
export function parseUrl(url: string): { [key: string]: string } | undefined {
  const paramsIndex = url.indexOf('?');
  if (paramsIndex === -1) return;

  const actions = url.slice(paramsIndex + 1);
  const tokens = actions.split('&');

  return tokens.reduce((acc: any, token: string) => {
    const [param, value] = token.split('=');
    return { ...acc, [param]: value };
  }, {});
}
