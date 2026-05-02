import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Building2, CircleDollarSign, UserPlus, UserCheck } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNaira } from '../../lib/format';
import { developers, properties } from '../../lib/mock-data';
import { PropertyCard } from '../../components/PropertyCard';
import { StatCard } from '../../components/ui/StatCard';

export default function DeveloperProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const developer = developers.find((d) => d.id === id);
  const [isFollowing, setIsFollowing] = useState(developer?.isFollowing ?? false);

  if (!developer) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.medium, color: colors.textTertiary }}>Developer not found</Text>
      </View>
    );
  }

  const devProperties = properties.filter((p) => developer.propertyIds.includes(p.id));

  const similarDevs = developers
    .filter((d) => d.id !== developer.id)
    .slice(0, 3);

  const toggleFollow = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFollowing(!isFollowing);
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
        }}
      >
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
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h3, color: colors.textPrimary, marginLeft: spacing.md }}>
          Developer
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 20 }}
      >
        {/* Profile Card */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.xl,
            alignItems: 'center',
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
            ...(!isDark && shadows.sm),
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: brand.emerald,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: fonts.bold, fontSize: 24, color: '#FFFFFF' }}>{developer.initials}</Text>
          </View>
          <Text style={{ fontFamily: fonts.bold, fontSize: fontSize.h2, color: colors.textPrimary, marginTop: spacing.lg, textAlign: 'center' }}>
            {developer.name}
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center', lineHeight: 20 }}>
            {developer.bio}
          </Text>

          {/* Follow Button */}
          <TouchableOpacity
            onPress={toggleFollow}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.sm,
              marginTop: spacing.xl,
              paddingHorizontal: spacing.xl,
              paddingVertical: spacing.md,
              borderRadius: radius.full,
              backgroundColor: isFollowing ? colors.bgTertiary : brand.emerald,
              borderWidth: isFollowing ? 1 : 0,
              borderColor: colors.borderDefault,
            }}
          >
            {isFollowing ? (
              <UserCheck size={16} color={colors.textSecondary} strokeWidth={2} />
            ) : (
              <UserPlus size={16} color="#FFFFFF" strokeWidth={2} />
            )}
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.bodySmall,
                color: isFollowing ? colors.textSecondary : '#FFFFFF',
              }}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg }}>
          <StatCard value={developer.propertiesListed.toString()} label="Properties" />
          <StatCard value={formatNaira(developer.totalRaised)} label="Total Raised" />
        </View>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
          <StatCard value={developer.investorCount.toLocaleString()} label="Investors" />
          <StatCard value={developer.followerCount.toLocaleString()} label="Followers" />
        </View>

        {/* Properties */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginTop: spacing['2xl'], marginBottom: spacing.lg }}>
          Listed Properties
        </Text>
        {devProperties.map((property) => (
          <View key={property.id} style={{ marginBottom: spacing.md }}>
            <PropertyCard property={property} />
          </View>
        ))}

        {/* Track Record */}
        <View style={{ marginTop: spacing['3xl'] }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: fontSize.h4,
              color: colors.textPrimary,
              marginBottom: spacing.lg,
            }}
          >
            Track Record
          </Text>
          <View
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: radius.xl,
              padding: spacing.lg,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.cardBorder,
              ...(!isDark && shadows.sm),
            }}
          >
            {[
              { label: 'Completed Projects', value: developer.propertiesListed > 0 ? Math.max(1, developer.propertiesListed - 1) : 0 },
              { label: 'Average Returns', value: '12.5%' },
              { label: 'On-time Delivery', value: '95%' },
              { label: 'Investor Satisfaction', value: '4.8/5' },
            ].map((stat, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: spacing.md,
                  borderBottomWidth: i < 3 ? 1 : 0,
                  borderBottomColor: colors.borderSubtle,
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary }}>
                  {stat.label}
                </Text>
                <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
                  {typeof stat.value === 'number' ? stat.value : stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Similar Developers */}
        {similarDevs.length > 0 && (
          <View style={{ marginTop: spacing['3xl'] }}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.h4,
                color: colors.textPrimary,
                marginBottom: spacing.lg,
              }}
            >
              Similar Developers
            </Text>
            {similarDevs.map((dev) => (
              <TouchableOpacity
                key={dev.id}
                onPress={() => router.push(`/developer/${dev.id}`)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.cardBg,
                  borderRadius: radius.xl,
                  padding: spacing.lg,
                  marginBottom: spacing.sm,
                  borderWidth: isDark ? 1 : 0,
                  borderColor: colors.cardBorder,
                  ...(!isDark && shadows.sm),
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: radius.full,
                    backgroundColor: isDark ? 'rgba(0,230,181,0.15)' : '#ECFDF5',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.md,
                  }}
                >
                  <Text style={{ fontFamily: fonts.bold, fontSize: 14, color: brand.emerald }}>
                    {dev.initials}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
                    {dev.name}
                  </Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
                    {dev.propertiesListed} properties · {dev.followerCount} followers
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
