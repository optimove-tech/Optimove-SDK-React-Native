import Optimove from '@optimove-inc/react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ExpandableListView } from 'react-native-expandable-listview';
import type { InAppInboxItem, InAppInboxSummary } from 'src/inApp';

export function InboxScreen({ navigation }: { navigation: any }) {
  const [inboxItems, setInAppInboxItems] = useState<InAppInboxItem[]>([]);
  const [summary, setInAppInboxSummary] = useState<InAppInboxSummary>();
  console.debug('InboxScreen');

  useEffect(() => {
    Optimove.inAppGetInboxItems().then(setInAppInboxItems);
    Optimove.inAppGetInboxSummary().then(setInAppInboxSummary);
    Optimove.setOnInboxUpdateHandler(() => {
      Optimove.inAppGetInboxItems().then(setInAppInboxItems);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            Optimove.inAppGetInboxSummary().then(setInAppInboxSummary);
          }}
          title="Mark all read"
          color="#A7B8CC"
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        padding: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <ExpandableListView
          innerItemContainerStyle={{ padding: 8 }}
          itemContainerStyle={styles.container}
          data={inboxItems.map((inboxItem) => {
            return {
              id: inboxItem.id.toString(),
              categoryName: inboxItem.title,
              customItem: (
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.titleText}>
                      Title: {inboxItem.title}
                    </Text>
                    <Text style={styles.caption}>
                      Subtitle: {inboxItem.subtitle}
                    </Text>
                  </View>
                  {inboxItem.imageUrl && (
                    <Image
                      style={styles.image}
                      source={{
                        uri: inboxItem.imageUrl,
                      }}
                    />
                  )}
                </View>
              ),
              subCategory: [
                {
                  customInnerItem: (
                    <Button
                      onPress={() =>
                        Alert.alert(
                          'Inbox data',
                          JSON.stringify(inboxItem.data),
                          [{ text: 'OK', style: 'cancel' }]
                        )
                      }
                      title="View data"
                      color="#FF8566"
                    />
                  ),
                  id: '1',
                  name: '',
                },
                {
                  id: '2',
                  name: 'Sub Item 2',
                  customInnerItem: (
                    <Button
                      onPress={() => {
                        Optimove.inAppPresentInboxMessage(inboxItem);
                      }}
                      title="View"
                      color="#FF8566"
                    />
                  ),
                },

                {
                  id: '3',
                  name: 'Sub Item 3',
                  customInnerItem: (
                    <Button
                      onPress={() => {
                        Optimove.inAppMarkAsRead(inboxItem);
                        Optimove.inAppGetInboxSummary().then(
                          setInAppInboxSummary
                        );
                      }}
                      title="Mark read"
                      color="#FF8566"
                    />
                  ),
                },

                {
                  id: '4',
                  name: 'Sub Item 4',
                  customInnerItem: (
                    <Button
                      onPress={() => {
                        Optimove.inAppDeleteMessageFromInbox(inboxItem);
                        Optimove.inAppGetInboxSummary().then(
                          setInAppInboxSummary
                        );
                      }}
                      title="Delete"
                      color="#FF8566"
                    />
                  ),
                },
              ],
            };
          })}
        />
      </View>
      <View style={styles.footer}>
        <Text>{`Total: ${summary?.totalCount} Unread: ${summary?.unreadCount}`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 4,
    margin: 8,
    backgroundColor: '#A7B8CC',
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
  caption: {
    fontSize: 12,
  },
  separator: {
    marginVertical: 8,
  },
  horizontalSeparator: {
    marginHorizontal: 4,
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  footer: {
    height: 40,
    alignItems: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
});
