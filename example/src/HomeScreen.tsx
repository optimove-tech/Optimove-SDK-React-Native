import * as React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import Optimove from 'optimove-react-native';
import { useEffect, useState } from 'react';

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
          <Button
            onPress={() => {
              Optimove.setUserId(userIdText);
              Optimove.getVisitorId().then(setVisitorId);
            }}
            title="Set user id"
            color="#FF8566"
          />
          <Separator />
          <Separator />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={emailText}
            placeholder="Email"
          />
          <Separator />
          <Button
            onPress={() => {
              Optimove.setUserEmail(emailText);
            }}
            title="Set email"
            color="#FF8566"
          />
          <Separator />
          <Button
            onPress={() => Optimove.registerUser(userIdText, emailText)}
            title="Register user"
            color="#FF8566"
          />
          <Separator />
          <Button
            onPress={() => Optimove.signOutUser()}
            title="Sign out"
            color="#FF8566"
          />
        </View>
        <Separator />
        <View style={styles.container}>
          <Button
            onPress={() => Optimove.pushRequestDeviceToken()}
            title="Register push"
            color="#FF8566"
          />
          <Separator />
          <Button
            onPress={() => Optimove.pushUnregister()}
            title="Unregister push"
            color="#FF8566"
          />
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
          <Button
            onPress={() =>
              Optimove.reportEvent(eventText, { string_param: 'some_param' })
            }
            title="Report event with string_param: some_param"
            color="#FF8566"
          />
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
          <Button
            onPress={() =>
              Optimove.reportScreenVisit(
                screenTitleText,
                screenCategoryText !== '' ? screenCategoryText : undefined
              )
            }
            title="Report screen visit"
            color="#FF8566"
          />
        </View>
        <Separator />
        <View style={styles.container}>
          <Button
            onPress={() => navigation.navigate('Inbox')}
            title="Go to inbox"
            color="#FF8566"
          />
          <Separator />
          <Button
            onPress={() => Optimove.inAppUpdateConsent(true)}
            title="Opt in"
            color="#FF8566"
          />
          <Separator />
          <Button
            onPress={() => Optimove.inAppUpdateConsent(false)}
            title="Opt out"
            color="#FF8566"
          />
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
});
