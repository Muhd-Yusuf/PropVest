import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CircleDollarSign, Building2, ArrowLeftRight, Bell } from 'lucide-react-native';
import { useTheme } from '../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../lib/theme';
import { AppNotification } from '../lib/types';

const iconMap = {
  payout: CircleDollarSign,
  property: Building2,
  market: ArrowLeftRight,
  system: Bell,
};

const colorMap = {
  payout: brand.emerald,
  property: brand.royal,
  market: '#F5A623',
  system: '#7A8BA0',
};

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const Icon = iconMap[notification.type];
  const iconColor = colorMap[notification.type];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => notification.route && router.push(notification.route as any)}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: spacing.lg,
        backgroundColor: notification.read ? 'transparent' : isDark ? 'rgba(0, 230, 181, 0.05)' : 'rgba(0, 230, 181, 0.03)',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSubtle,
      }}
    >
      {!notification.read && (
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: brand.emerald,
            position: 'absolute',
            top: spacing.lg + 6,
            left: spacing.sm,
          }}
        />
      )}
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: radius.full,
          backgroundColor: isDark ? `${iconColor}20` : `${iconColor}15`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.md,
          marginLeft: notification.read ? 0 : spacing.md,
        }}
      >
        <Icon size={20} color={iconColor} strokeWidth={1.5} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: notification.read ? fonts.medium : fonts.bold,
            fontSize: fontSize.bodySmall,
            color: colors.textPrimary,
          }}
        >
          {notification.title}
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
            marginTop: 2,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {notification.body}
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.overline,
            color: colors.textTertiary,
            marginTop: spacing.xs,
          }}
        >
          {notification.createdAt}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
