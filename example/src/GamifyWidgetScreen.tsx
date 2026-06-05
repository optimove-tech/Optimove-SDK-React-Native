import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';

import Optimove from '@optimove-inc/react-native';

const Separator = () => <View style={styles.separator} />;

type Env = 'Dev' | 'Prod US' | 'Prod EU';

const BASE_URLS: Record<Env, string> = {
  'Dev': 'https://opti-ls-widget-dev.optimove.net',
  'Prod US': 'https://opti-ls-widget-us.optimove.net',
  'Prod EU': 'https://opti-ls-widget-eu.optimove.net',
};

export function GamifyWidgetScreen() {
  const [env, setEnv] = useState<Env>('Dev');
  const [tenant, setTenant] = useState('');
  const [userId, setUserId] = useState('');

  const canOpen = tenant.trim() !== '' && userId.trim() !== '';

  const openWidget = () => {
    const widgetUrl = `${BASE_URLS[env]}/${encodeURIComponent(
      tenant
    )}/${encodeURIComponent(userId)}`;
    Optimove.gamifyWidgetOpen(widgetUrl, userId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>Environment</Text>
          <Separator />
          <View style={styles.envRow}>
            {(Object.keys(BASE_URLS) as Env[]).map((e) => (
              <TouchableOpacity
                key={e}
                style={[
                  styles.envButton,
                  env === e ? styles.envButtonActive : null,
                ]}
                onPress={() => setEnv(e)}
              >
                <Text
                  style={[
                    styles.envButtonText,
                    env === e ? styles.envButtonTextActive : null,
                  ]}
                >
                  {e}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Separator />

        <View style={styles.container}>
          <Text style={styles.titleText}>Configuration</Text>
          <Separator />
          <TextInput
            style={styles.input}
            value={tenant}
            onChangeText={setTenant}
            placeholder="Tenant ID"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Separator />
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
            placeholder="User ID"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Separator />

        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, canOpen ? null : styles.buttonDisabled]}
            onPress={openWidget}
            disabled={!canOpen}
          >
            <Text style={styles.buttonText}>Open Widget</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  container: {
    width: '100%',
    backgroundColor: '#A7B8CC',
    padding: 10,
    borderRadius: 4,
  },
  separator: {
    marginVertical: 8,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF8566',
    backgroundColor: '#fff',
  },
  envRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  envButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  envButtonActive: {
    backgroundColor: '#FF8566',
  },
  envButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  envButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#FF8566',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
