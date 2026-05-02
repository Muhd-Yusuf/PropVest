import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCheck } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../lib/theme';
import { notifications as mockNotifications } from '../lib/mock-data';
import { NotificationItem } from '../components/NotificationItem';
import { NotificationType } from '../lib/types';

type FilterTab = 'all' | NotificationType;

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filters: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'payout', label: 'Payouts' },
    { key: 'property', label: 'Properties' },
    { key: 'market', label: 'Market' },
    { key: 'system', label: 'System' },
  ];

  const filtered = notifications.filter((n) => activeFilter === 'all' || n.type === activeFilter);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + spacing.sm,
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: radius.full,
              backgroundColor: colors.bgSecondary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: fontSize.h3,
              color: colors.textPrimary,
              marginLeft: spacing.md,
            }}
          >
            Notifications
          </Text>
          {unreadCount > 0 && (
            <View
              style={{
                backgroundColor: brand.emerald,
                borderRadius: 10,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginLeft: spacing.sm,
              }}
            >
              <Text style={{ fontFamily: fonts.bold, fontSize: 11, color: '#FFFFFF' }}>{unreadCount}</Text>
            </View>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <CheckCheck size={16} color={brand.emerald} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.caption, color: brand.emerald }}>
              Mark all read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: spacing.md,
          gap: spacing.sm,
        }}
      >
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setActiveFilter(f.key)}
            style={{
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
              borderRadius: radius.full,
              backgroundColor: activeFilter === f.key ? brand.emerald : colors.bgSecondary,
              borderWidth: activeFilter === f.key ? 0 : 1,
              borderColor: colors.borderDefault,
            }}
          >
            <Text
              style={{
                fontFamily: activeFilter === f.key ? fonts.semibold : fonts.regular,
                fontSize: fontSize.bodySmall,
                color: activeFilter === f.key ? '#FFFFFF' : colors.textSecondary,
              }}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {filtered.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingTop: spacing['4xl'] }}>
            <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.body, color: colors.textTertiary }}>
              No notifications
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
