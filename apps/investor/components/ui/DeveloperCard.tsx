import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Building2, Users, TrendingUp, UserPlus, UserCheck } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNaira } from '../../lib/format';
import type { Developer } from '../../lib/types';

interface DeveloperCardProps {
  developer: Developer;
  isFollowing: boolean;
  onToggleFollow: (id: string) => void;
}

export function DeveloperCard({ developer, isFollowing, onToggleFollow }: DeveloperCardProps) {
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const handleFollow = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggleFollow(developer.id);
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/developer/${developer.id}`)}
      activeOpacity={0.7}
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: radius.xl,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: isDark ? 1 : 0,
        borderColor: colors.cardBorder,
        ...(!isDark && shadows.sm),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
        {/* Initials Avatar */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.full,
            backgroundColor: isDark ? 'rgba(0, 230, 181, 0.15)' : '#ECFDF5',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacing.md,
          }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: 16, color: brand.emerald }}>
            {developer.initials}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }} numberOfLines={1}>
            {developer.name}
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
            {developer.followerCount.toLocaleString()} followers
          </Text>
        </View>

        {/* Follow Button */}
        <TouchableOpacity
          onPress={handleFollow}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: radius.full,
            backgroundColor: isFollowing
              ? (isDark ? 'rgba(0, 230, 181, 0.15)' : '#ECFDF5')
              : brand.emerald,
            gap: 4,
          }}
        >
          {isFollowing ? (
            <UserCheck size={14} color={brand.emerald} strokeWidth={2} />
          ) : (
            <UserPlus size={14} color="#FFFFFF" strokeWidth={2} />
          )}
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: 12,
              color: isFollowing ? brand.emerald : '#FFFFFF',
            }}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bio */}
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: fontSize.caption,
          color: colors.textSecondary,
          lineHeight: 20,
        }}
        numberOfLines={2}
      >
        {developer.bio}
      </Text>

      {/* Stats */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: spacing.md,
          paddingTop: spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.borderSubtle,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Building2 size={12} color={colors.textTertiary} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.caption, color: colors.textPrimary }}>
              {developer.propertiesListed}
            </Text>
          </View>
          <Text style={{ fontFamily: fonts.regular, fontSize: 10, color: colors.textTertiary, marginTop: 2 }}>
            Properties
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Users size={12} color={colors.textTertiary} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.caption, color: colors.textPrimary }}>
              {developer.investorCount.toLocaleString()}
            </Text>
          </View>
          <Text style={{ fontFamily: fonts.regular, fontSize: 10, color: colors.textTertiary, marginTop: 2 }}>
            Investors
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={12} color={colors.textTertiary} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.caption, color: colors.textPrimary }}>
              {formatNaira(developer.totalRaised)}
            </Text>
          </View>
          <Text style={{ fontFamily: fonts.regular, fontSize: 10, color: colors.textTertiary, marginTop: 2 }}>
            Raised
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
