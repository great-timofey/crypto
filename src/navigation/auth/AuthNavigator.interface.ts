import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { AuthScreensNames } from '../names';

export type AuthNavigatorParamsList = {
  [AuthScreensNames.Start]: undefined;
  [AuthScreensNames.SignUpOrResetPassword]: {
    signUp?: boolean;
  };
  [AuthScreensNames.SignIn]: undefined;
};

export type StartScreenNavigationProp = StackNavigationProp<
  AuthNavigatorParamsList,
  typeof AuthScreensNames.Start
>;

export type ProfileScreenRouteProp = RouteProp<
  AuthNavigatorParamsList,
  typeof AuthScreensNames.SignUpOrResetPassword
>;

export type SignUpOrResetPasswordProp = StackNavigationProp<
  AuthNavigatorParamsList,
  typeof AuthScreensNames.SignUpOrResetPassword
>;

export type SignInScreenNavigationProp = StackNavigationProp<
  AuthNavigatorParamsList,
  typeof AuthScreensNames.SignIn
>;
