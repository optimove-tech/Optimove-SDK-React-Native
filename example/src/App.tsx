import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Optimove from 'optimove-react-native';
import * as React from 'react';
import { Alert } from 'react-native';
import { HomeScreen } from './HomeScreen';
import { InboxScreen } from './InboxScreen';

const Stack = createNativeStackNavigator();


function App() {
  initListeners();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Optimove React Native QA',
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
