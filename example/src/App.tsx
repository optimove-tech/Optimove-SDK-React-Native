import { Alert, NativeModules, Platform } from 'react-native';

import { EmbeddedMessagingScreen } from './EmbeddedMessagingScreen';
import { HomeScreen } from './HomeScreen';
import { InboxScreen } from './InboxScreen';
import { NavigationContainer } from '@react-navigation/native';
import Optimove from '@optimove-inc/react-native';
import { createStackNavigator } from '@react-navigation/stack';

const baseSdkVersion: string =
  Platform.OS === 'android'
    ? (NativeModules.SdkInfo?.getConstants?.().androidBaseSdkVersion ?? '')
    : (NativeModules.SdkInfo?.iosSdkVersion ?? '');

const Stack = createStackNavigator();

function App() {
  initListeners();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: `RN QA (native: ${baseSdkVersion ? baseSdkVersion : '-'}) `,
            headerStyle: {
              backgroundColor: '#FF8566',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Inbox"
          component={InboxScreen}
          options={{
            title: 'In-app inbox',
            headerStyle: {
              backgroundColor: '#FF8566',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="EmbeddedMessaging"
          component={EmbeddedMessagingScreen}
          options={{
            title: 'Embedded Messaging',
            headerStyle: {
              backgroundColor: '#FF8566',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function initListeners() {
  Optimove.setPushReceivedHandler((notification) => {
    console.debug('Push received');
    Alert.alert(
      `Recevied push\n\n${notification.title}`,
      `${notification.message}\n\nData:\n${JSON.stringify(notification.data)}`,
      [{ text: 'OK', style: 'cancel' }]
    );
  });

  Optimove.setPushOpenedHandler((notification) => {
    console.debug('Push opened');
    Alert.alert(
      `Opened push\n\n${notification.title}`,
      `${notification.message}\nAction button tapped: ${
        notification.actionId ?? 'none'
      }\nData:\n${JSON.stringify(notification.data)}`,
      [{ text: 'OK', style: 'cancel' }]
    );
  });

  Optimove.setInAppDeeplinkHandler((inAppButtonPress) => {
    console.debug('In app deeplink');
    Alert.alert(
      `In app deeplink`,
      `Message id: ${inAppButtonPress.messageId}\nMessge data: ${JSON.stringify(
        inAppButtonPress.messageData
      )}\nDeeplink data: ${JSON.stringify(inAppButtonPress.deepLinkData)}`,
      [{ text: 'OK', style: 'cancel' }]
    );
  });

  Optimove.setDeepLinkHandler((deepLink) => {
    console.debug('Deeplink');
    Alert.alert(`Deeplink`, JSON.stringify(deepLink), [
      { text: 'OK', style: 'cancel' },
    ]);
  });
}

export default App;
