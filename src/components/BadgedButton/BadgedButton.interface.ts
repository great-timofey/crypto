import { BadgeProps } from '../Badge/Badge.interface';
import { IconName } from '../Icon/Icon.interface';

export interface BadgedButtonProps extends BadgeProps {
  iconName: IconName;
  iconFill?: string;
}
