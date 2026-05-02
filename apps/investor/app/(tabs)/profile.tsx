import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  User,
  Settings,
  Shield,
  HelpCircle,
  FileText,
  Moon,
  ChevronRight,
  LogOut,
  Lock,
  CreditCard,
} from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { useAuth } from '../../lib/AuthContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';

const menuItems = [
  { label: 'Account Settings', icon: Settings, route: '/settings/account' },
  { label: 'KYC Verification', icon: Shield, route: '/kyc' },
  { label: 'Bank Accounts', icon: CreditCard, route: '/settings/bank-accounts' },
  { label: 'Security', icon: Lock, route: '/settings/security' },
  { label: 'Help & Support', icon: HelpCircle, route: '/settings/help' },
  { label: 'Legal', icon: FileText, route: '/settings/legal' },
];

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={{ paddingTop: insets.top + spacing.md, marginBottom: spacing['2xl'] }}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSize.h2,
            color: colors.textPrimary,
          }}
        >
          Profile
        </Text>
      </View>

      {/* Avatar + Name */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: spacing['3xl'],
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: radius.full,
            backgroundColor: isDark
              ? 'rgba(0, 212, 170, 0.12)'
              : colors.successBg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.md,
          }}
        >
          <User size={36} color={brand.emerald} strokeWidth={1.5} />
        </View>
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: fontSize.h3,
            color: colors.textPrimary,
          }}
        >
          Muhammad Sada Yusuf
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.bodySmall,
            color: colors.textTertiary,
            marginTop: spacing.xs,
          }}
        >
          muhd@propvest.ng
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: spacing.sm,
            backgroundColor: colors.successBg,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xs,
            borderRadius: radius.full,
          }}
        >
          <Shield size={12} color={brand.emerald} strokeWidth={2} />
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: 11,
              color: brand.emerald,
              marginLeft: spacing.xs,
            }}
          >
            KYC Verified
          </Text>
        </View>
      </View>

      {/* Dark Mode Toggle */}
      <TouchableOpacity
        onPress={toggleTheme}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.cardBg,
          borderRadius: radius.lg,
          borderWidth: isDark ? 1 : 0,
          borderColor: colors.cardBorder,
          padding: spacing.lg,
          marginBottom: spacing['2xl'],
          ...(!isDark && shadows.sm),
        }}
      >
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: radius.md,
            backgroundColor: colors.bgSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
          }}
        >
          <Moon size={18} color={colors.textSecondary} strokeWidth={1.8} />
        </View>
        <Text
          style={{
            flex: 1,
            fontFamily: fonts.medium,
            fontSize: fontSize.body,
            color: colors.textPrimary,
          }}
        >
          Dark Mode
        </Text>
        <View
          style={{
            width: 48,
            height: 28,
            borderRadius: 14,
            backgroundColor: isDark ? brand.emerald : colors.bgTertiary,
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              alignSelf: isDark ? 'flex-end' : 'flex-start',
            }}
          />
        </View>
      </TouchableOpacity>

      {/* Menu Items */}
      <View
        style={{
          backgroundColor: colors.cardBg,
          borderRadius: radius.xl,
          borderWidth: isDark ? 1 : 0,
          borderColor: colors.cardBorder,
          overflow: 'hidden',
          marginBottom: spacing['2xl'],
          ...(!isDark && shadows.sm),
        }}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            activeOpacity={0.7}
            onPress={() => router.push(item.route as any)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.lg,
              borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
              borderBottomColor: colors.borderSubtle,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: radius.md,
                backgroundColor: colors.bgSecondary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}
            >
              <item.icon size={18} color={colors.textSecondary} strokeWidth={1.8} />
            </View>
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.medium,
                fontSize: fontSize.body,
                color: colors.textPrimary,
              }}
            >
              {item.label}
            </Text>
            <ChevronRight size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={signOut}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing.lg,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.error,
          gap: spacing.sm,
        }}
      >
        <LogOut size={18} color={colors.error} strokeWidth={1.8} />
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: fontSize.body,
            color: colors.error,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
