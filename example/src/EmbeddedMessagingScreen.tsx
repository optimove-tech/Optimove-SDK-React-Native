import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';

import Optimove, {
  type Container,
  type ContainerRequestOptions,
  type EmbeddedMessage,
} from '@optimove-inc/react-native';

const Separator = () => <View style={styles.separator} />;
const ItemSeparator = () => <View style={styles.itemSeparator} />;

export function EmbeddedMessagingScreen() {
  const [containerIdsText, setContainerIdsText] = useState('');
  const [limitsText, setLimitsText] = useState('');
  const [statusText, setStatusText] = useState('Containers:');
  const [messages, setMessages] = useState<EmbeddedMessage[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<EmbeddedMessage | null>(null);
  const [jsonMessage, setJsonMessage] = useState<EmbeddedMessage | null>(null);

  const loadMessages = () => {
    if (!containerIdsText.trim()) return;

    const ids = containerIdsText.split(';');
    const limits = limitsText.split(';');
    const containers: ContainerRequestOptions[] = ids.map((id, i) => ({
      containerId: id.trim(),
      limit: parseInt(limits[i] ?? '50', 10) || 50,
    }));

    Optimove.embeddedMessagingGetMessages(containers)
      .then((response: Record<string, Container>) => {
        const allMessages = Object.values(response).flatMap((c) => c.messages);
        setMessages(allMessages);
        setStatusText(`${Object.keys(response).length} containers retrieved`);
      })
      .catch((e: any) => setStatusText(`Error: ${e.message}`));
  };

  const dismissMenu = () => setSelectedMessage(null);

  const handleToggleRead = () => {
    if (!selectedMessage) return;
    const isRead = selectedMessage.readAt === null;
    Optimove.embeddedMessagingSetAsRead(selectedMessage, isRead)
      .then(() => {
        setStatusText(isRead ? 'Marked as read' : 'Marked as unread');
        loadMessages();
      })
      .catch((e: any) => setStatusText(`Error: ${e.message}`));
    dismissMenu();
  };

  const handleClickMetric = () => {
    if (!selectedMessage) return;
    Optimove.embeddedMessagingReportClickMetric(selectedMessage)
      .then(() => setStatusText('Click metric sent'))
      .catch((e: any) => setStatusText(`Error: ${e.message}`));
    dismissMenu();
  };

  const handleDelete = () => {
    if (!selectedMessage) return;
    Optimove.embeddedMessagingDeleteMessage(selectedMessage)
      .then(() => {
        setStatusText('Message deleted');
        loadMessages();
      })
      .catch((e: any) => setStatusText(`Error: ${e.message}`));
    dismissMenu();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex]}
            placeholder="Container Id(s)"
            value={containerIdsText}
            onChangeText={setContainerIdsText}
          />
          <View style={styles.rowSeparator} />
          <TextInput
            style={[styles.input, styles.flex]}
            placeholder="Limit(s)"
            value={limitsText}
            onChangeText={setLimitsText}
            keyboardType="numeric"
          />
        </View>
        <Separator />
        <Button title="Get Messages" onPress={loadMessages} color="#FF8566" />
        <Separator />
        <Text style={styles.statusText}>{statusText}</Text>
        <Separator />
        <FlatList
          style={styles.list}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.messageRow}>
              <TouchableOpacity
                style={styles.flex}
                onLongPress={() => setSelectedMessage(item)}
              >
                <Text style={styles.messageItem}>
                  {item.title}: {item.content}
                  {item.readAt === null ? ' •' : ''}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.jsonButton}
                onPress={() => setJsonMessage(item)}
              >
                <Text style={styles.jsonButtonText}>JSON</Text>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>

      <Modal
        visible={jsonMessage !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setJsonMessage(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Message JSON</Text>
            <ScrollView style={styles.jsonScroll}>
              <Text style={styles.jsonText}>
                {jsonMessage ? JSON.stringify(jsonMessage, null, 2) : ''}
              </Text>
            </ScrollView>
            <View style={styles.modalCancel}>
              <TouchableOpacity onPress={() => setJsonMessage(null)}>
                <Text style={styles.modalAction}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={selectedMessage !== null}
        transparent
        animationType="fade"
        onRequestClose={dismissMenu}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose an Action</Text>
            <Separator />
            <TouchableOpacity onPress={handleToggleRead}>
              <Text style={styles.modalAction}>Toggle Set as Read</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity onPress={handleClickMetric}>
              <Text style={styles.modalAction}>Click Metric</Text>
            </TouchableOpacity>
            <Separator />
            <TouchableOpacity onPress={handleDelete}>
              <Text style={[styles.modalAction, styles.modalActionDelete]}>
                Delete
              </Text>
            </TouchableOpacity>
            <Separator />
            <View style={styles.modalCancel}>
              <TouchableOpacity onPress={dismissMenu}>
                <Text style={styles.modalAction}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSeparator: {
    width: 8,
  },
  flex: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  separator: {
    marginVertical: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageItem: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  jsonButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  jsonButtonText: {
    fontSize: 12,
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  jsonScroll: {
    maxHeight: 400,
    marginVertical: 8,
  },
  jsonText: {
    fontFamily: 'monospace',
    fontSize: 11,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#eee',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#e8f0fe',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalAction: {
    fontSize: 16,
    color: '#1a73e8',
    paddingVertical: 4,
  },
  modalActionDelete: {
    color: '#d93025',
  },
  modalCancel: {
    alignItems: 'flex-end',
  },
});
