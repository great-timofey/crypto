import { StatusBar } from 'react-native';

export function lightenStatusBar() {
  StatusBar.setBarStyle('light-content');
}

export function darkenStatusBar() {
  StatusBar.setBarStyle('dark-content');
}
