import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';

import Optimove from '@optimove-inc/react-native';

const Separator = () => <View style={styles.separator} />;

export function HomeScreen({ navigation }: { navigation: any }) {
  const [visitorId, setVisitorId] = useState<string>();
  const [userIdText, onChangeUserId] = useState('');
  const [emailText, onChangeEmail] = useState('');
  const [eventText, onChangeEvent] = useState('');
  const [screenTitleText, onChangeScreenTitleText] = useState('');
  const [screenCategoryText, onChangeScreenCategoryText] = useState('');

  useEffect(() => {
    Optimove.getVisitorId().then(setVisitorId);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 16,
        paddingLeft: 16,
      }}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>Current visitor id:</Text>
          <Text style={styles.titleText}>{visitorId}</Text>
        </View>
        <Separator />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUserId}
            value={userIdText}
            placeholder="User id"
          />
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Optimove.setUserId(userIdText);
              setTimeout(() => Optimove.getVisitorId().then(setVisitorId), 0);
            }}
          >
            <Text style={styles.buttonText}>Set user id</Text>
          </TouchableOpacity>
          <Separator />
          <Separator />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={emailText}
            placeholder="Email"
          />
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Optimove.setUserEmail(emailText)}
          >
            <Text style={styles.buttonText}>Set email</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Optimove.registerUser(userIdText, emailText)}
          >
            <Text style={styles.buttonText}>Register user</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Optimove.signOutUser()}
          >
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <Separator />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Optimove.pushRequestDeviceToken()}
          >
            <Text style={styles.buttonText}>Register push</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Optimove.pushUnregister()}
          >
            <Text style={styles.buttonText}>Unregister push</Text>
          </TouchableOpacity>
        </View>
        <Separator />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEvent}
            value={eventText}
            placeholder="Event name"
          />
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Optimove.reportEvent(eventText, { string_param: 'some_param' })
            }
          >
            <Text style={styles.buttonText}>
              Report event with string_param: some_param
            </Text>
          </TouchableOpacity>
        </View>

        <Separator />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeScreenTitleText}
            value={screenTitleText}
            placeholder="Screen title"
          />
          <Separator />
          <TextInput
            style={styles.input}
            onChangeText={onChangeScreenCategoryText}
            value={screenCategoryText}
            placeholder="Screen category (Optional)"
          />
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Optimove.reportScreenVisit(
                screenTitleText,
                screenCategoryText !== '' ? screenCategoryText : undefined
              )
            }
          >
            <Text style={styles.buttonText}>Report screen visit</Text>
          </TouchableOpacity>
        </View>
        <Separator />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Inbox')}
          >
            <Text style={styles.buttonText}>Go to inbox</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EmbeddedMessaging')}
          >
            <Text style={styles.buttonText}>Embedded Messaging</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Optimove.inAppUpdateConsent(true)}
          >
            <Text style={styles.buttonText}>Opt in</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Optimove.inAppUpdateConsent(false)}
          >
            <Text style={styles.buttonText}>Opt out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#A7B8CC',
    padding: 10,
    borderRadius: 4,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  input: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF8566',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#FF8566',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
