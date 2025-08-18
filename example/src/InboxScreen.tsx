import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { InAppInboxItem, InAppInboxSummary } from '../../src/inApp';
import { useEffect, useRef, useState } from 'react';

import Optimove from '@optimove-inc/react-native';

export function InboxScreen({ navigation }: { navigation: any }) {
  const [inboxItems, setInAppInboxItems] = useState<InAppInboxItem[]>([]);
  const [summary, setInAppInboxSummary] = useState<InAppInboxSummary>();
  const isMountedRef = useRef(true);
  console.debug('InboxScreen');

  useEffect(() => {
    isMountedRef.current = true;

    const setInboxItems = (items: InAppInboxItem[]) => {
      if (isMountedRef.current) {
        setInAppInboxItems(items);
      }
    };

    const setSummary = (summaryData: InAppInboxSummary) => {
      if (isMountedRef.current) {
        setInAppInboxSummary(summaryData);
      }
    };

    Optimove.inAppGetInboxItems().then(setInboxItems);
    Optimove.inAppGetInboxSummary().then(setSummary);

    Optimove.setOnInboxUpdateHandler(() => {
      if (isMountedRef.current) {
        Optimove.inAppGetInboxItems().then(setInboxItems);
      }
    });

    return () => {
      isMountedRef.current = false;
      Optimove.setOnInboxUpdateHandler(() => {});
    };
  }, []);

  useEffect(() => {
    const setSummary = (summaryData: InAppInboxSummary) => {
      if (isMountedRef.current) {
        setInAppInboxSummary(summaryData);
      }
    };

    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            if (isMountedRef.current) {
              Optimove.inAppGetInboxSummary().then(setSummary);
            }
          }}
          title="Mark all read"
          color="#A7B8CC"
        />
      ),
    });
  }, [navigation]);

  const renderInboxItem = ({ item }: { item: InAppInboxItem }) => (
    <View style={styles.inboxCard}>
      <View style={styles.cardHeader}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.subtitleText}>{item.subtitle}</Text>
        </View>
        {item.imageUrl && (
          <Image
            style={styles.image}
            source={{ uri: item.imageUrl }}
          />
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => Optimove.inAppPresentInboxMessage(item)}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.viewDataButton]}
          onPress={() =>
            Alert.alert(
              'Inbox data',
              JSON.stringify(item.data),
              [{ text: 'OK', style: 'cancel' }]
            )
          }
        >
          <Text style={styles.buttonText}>Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.markReadButton]}
          onPress={() => {
            if (isMountedRef.current) {
              Optimove.inAppMarkAsRead(item);
              Optimove.inAppGetInboxSummary().then((summaryData) => {
                if (isMountedRef.current) {
                  setInAppInboxSummary(summaryData);
                }
              });
            }
          }}
        >
          <Text style={styles.buttonText}>Read</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => {
            if (isMountedRef.current) {
              Optimove.inAppDeleteMessageFromInbox(item);
              Optimove.inAppGetInboxSummary().then((summaryData) => {
                if (isMountedRef.current) {
                  setInAppInboxSummary(summaryData);
                }
              });
            }
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={inboxItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderInboxItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          removeClippedSubviews={false}
        />
      </View>
      <View style={styles.footer}>
        <Text>{`Total: ${summary?.totalCount} Unread: ${summary?.unreadCount}`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
  inboxCard: {
    backgroundColor: '#A7B8CC',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  viewButton: {
    backgroundColor: '#FF8566',
  },
  viewDataButton: {
    backgroundColor: '#FFA726',
  },
  markReadButton: {
    backgroundColor: '#FF7043',
  },
  deleteButton: {
    backgroundColor: '#D84315',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  footer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
