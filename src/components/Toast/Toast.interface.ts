import { IconName } from '../Icon/Icon.interface';

import { NarfexThemeColor } from '$global/theme';

export interface ToastIconStyledProps {
  iconFill: NarfexThemeColor | null;
}

export interface ToastState {
  fill: NarfexThemeColor | null;
  icon: IconName | null;
  text: string | null;
}
