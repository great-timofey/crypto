import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreensNames } from '../names';

import { SignIn, Start, SignUpOrResetPassword } from '$screens';

const AuthStack = createStackNavigator();

export function AuthNavigator() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name={AuthScreensNames.Start} component={Start} />
      <AuthStack.Screen name={AuthScreensNames.SignIn} component={SignIn} />
      <AuthStack.Screen
        name={AuthScreensNames.SignUpOrResetPassword}
        component={SignUpOrResetPassword}
      />
    </AuthStack.Navigator>
  );
}
