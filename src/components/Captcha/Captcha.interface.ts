export interface CaptchaProps {
  onSuccess: (message: string) => void;
  onFailure: (message: string) => void;
}
