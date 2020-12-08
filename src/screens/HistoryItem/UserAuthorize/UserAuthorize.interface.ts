import { HistoryListTypeEnum } from '$components/HistoryList/HistoryList.interface';

export interface HistoryItemUserAuthorizeProps {
  type: HistoryListTypeEnum.userAuthorize;
  ipAddress: string;
  browserName: 'Chrome';
  browserVersion: '83.0.4103.61';
  platformName: 'OS X';
  platformVersion: '10.15.2';
  createdAt: number;
  isMobile: false;
  isMobileApplication: false;
}
