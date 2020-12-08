import { TypographyType } from '../Typography/Typography.interface';

import { StatusEnum } from '$global/types';

export interface StatusProps {
  type: TypographyType;
  value: StatusEnum;
}
