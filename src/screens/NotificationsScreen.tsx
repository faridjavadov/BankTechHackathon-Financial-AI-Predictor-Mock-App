// src/screens/NotificationsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Colors from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type IconName = React.ComponentProps<typeof Ionicons>['name'];
type NotificationNavigationProp = StackNavigationProp<RootStackParamList>;

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'prediction' | 'alert' | 'news' | 'system';
  read: boolean;
  timestamp: string;
  data?: {
    screen?: keyof RootStackParamList;
    params?: any;
  };
}

// Helper function to get the icon based on notification type
const getIconForType = (type: string): { name: IconName; color: string } => {
  switch (type) {
    case 'prediction':
      return { name: 'analytics-outline', color: Colors.primary };
    case 'alert':
      return { name: 'alert-circle-outline', color: Colors.warning };
    case 'news':
      return { name: 'newspaper-outline', color: Colors.info };
    case 'system':
      return { name: 'settings-outline', color: Colors.textLight };
    default:
      return { name: 'notifications-outline', color: Colors.primary };
  }
};

// Mock notifications data
const initialNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'New AI Prediction',
    message: 'Our AI has detected a potential increase in USD/TRY. Check the prediction for more details.',
    type: 'prediction',
    read: false,
    timestamp: '2023-06-15T08:30:00Z',
    data: {
      screen: 'PredictionDetail',
      params: { id: 'curr-001', type: 'currency' }
    }
  },
  {
    id: 'notif-002',
    title: 'Price Alert',
    message: 'Gold has reached your target price of $2,345. Consider reviewing your portfolio.',
    type: 'alert',
    read: false,
    timestamp: '2023-06-14T15:45:00Z',
    data: {
      screen: 'AssetDetail',
      params: { id: 'port-002' }
    }
  },
  {
    id: 'notif-003',
    title: 'Market News',
    message: 'Fed signals potential rate cuts in next quarter. This could impact your currency positions.',
    type: 'news',
    read: true,
    timestamp: '2023-06-13T10:15:00Z',
    data: {
      screen: 'NewsDetail',
      params: { id: 'news-001' }
    }
  },
  {
    id: 'notif-004',
    title: 'Account Update',
    message: 'Your account has been successfully verified. You now have access to all features.',
    type: 'system',
    read: true,
    timestamp: '2023-06-12T09:00:00Z'
  },
  {
    id: 'notif-005',
    title: 'New AI Prediction',
    message: 'Our AI predicts a potential decline in TSLA stock over the next 30 days.',
    type: 'prediction',
    read: false,
    timestamp: '2023-06-11T14:20:00Z',
    data: {
      screen: 'PredictionDetail',
      params: { id: 'stock-003', type: 'stock' }
    }
  },
  {
    id: 'notif-006',
    title: 'Weekly Portfolio Summary',
    message: 'Your portfolio has grown by 2.4% this week. Tap to view the details.',
    type: 'system',
    read: true,
    timestamp: '2023-06-10T18:00:00Z',
    data: {
      screen: 'Portfolio'
    }
  },
  {
    id: 'notif-007',
    title: 'Market News',
    message: 'OPEC+ agrees to extend production cuts. This may impact oil prices in the coming weeks.',
    type: 'news',
    read: false,
    timestamp: '2023-06-09T11:30:00Z',
    data: {
      screen: 'NewsDetail',
      params: { id: 'news-002' }
    }
  }
];

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationNavigationProp>();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read when pressed
    markAsRead(notification.id);
    
    // Navigate if there's a destination
    if (notification.data?.screen) {
      navigation.navigate(notification.data.screen, notification.data.params);
    }
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => setNotifications([]) }
      ]
    );
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    const icon = getIconForType(item.type);
    
    return (
      <TouchableOpacity 
        style={[styles.notificationItem, item.read ? styles.readNotification : styles.unreadNotification]} 
        onPress={() => handleNotificationPress(item)}
      >
        <View style={[styles.iconContainer, { backgroundColor: `${icon.color}15` }]}>
          <Ionicons name={icon.name} size={24} color={icon.color} />
        </View>
        
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
        </View>
        
        {!item.read && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {notifications.length > 0 ? (
        <>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
              <Text style={styles.actionButtonText}>Mark All as Read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={clearAllNotifications}>
              <Text style={styles.actionButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            renderItem={renderNotificationItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={64} color={Colors.textLight} />
          <Text style={styles.emptyText}>No notifications</Text>
          <Text style={styles.emptySubtext}>You don't have any notifications at the moment</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionButton: {
    paddingVertical: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  readNotification: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.textLight,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
});

export default NotificationsScreen;