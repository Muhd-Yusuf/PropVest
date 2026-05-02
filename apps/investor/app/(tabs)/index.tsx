import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TrendingUp,
  Briefcase,
  BarChart3,
  Wallet,
  ChevronRight,
  Bell,
  ArrowUpRight,
  CircleDollarSign,
} from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNaira, formatNairaFull, formatPercent } from '../../lib/format';
import { properties, holdings, payouts, portfolioSummary } from '../../lib/mock-data';
import { getRecommendations } from '../../lib/recommendations';
import { developers } from '../../lib/mock-data';
import { PropertyCard } from '../../components/PropertyCard';
import { StatCard } from '../../components/ui/StatCard';

export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const followedDevIds = developers.filter((d) => d.isFollowing).map((d) => d.id);
  const recommendations = getRecommendations(properties, holdings, followedDevIds);

  const quickActions = [
    { label: 'Invest', icon: TrendingUp, route: '/(tabs)/explore' as const },
    { label: 'Portfolio', icon: Briefcase, route: '/(tabs)/portfolio' as const },
    { label: 'Market', icon: BarChart3, route: '/market' as const },
    { label: 'Payouts', icon: Wallet, route: '/(tabs)/payouts' as const },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.screenPadding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.lg,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.bodySmall,
              color: colors.textTertiary,
            }}
          >
            Good morning
          </Text>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSize.h3,
              color: colors.textPrimary,
              marginTop: 2,
            }}
          >
            Muhammad
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/notifications')}
          style={{
            width: 40,
            height: 40,
            borderRadius: radius.full,
            backgroundColor: colors.bgSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.borderDefault,
          }}
        >
          <Bell size={20} color={colors.textSecondary} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      {/* Portfolio Hero Card */}
      <View style={{ paddingHorizontal: spacing.screenPadding }}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: radius.xl,
            padding: spacing.xl,
            ...(!isDark && shadows.lg),
          }}
        >
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.bodySmall,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Total Portfolio Value
          </Text>
          <Text
            style={{
              fontFamily: fonts.monoBold,
              fontSize: 32,
              color: '#FFFFFF',
              marginTop: spacing.xs,
            }}
          >
            {formatNairaFull(portfolioSummary.currentValue)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: spacing.sm,
            }}
          >
            <ArrowUpRight size={16} color={brand.emerald} strokeWidth={2} />
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
                marginLeft: 4,
              }}
            >
              +{formatPercent(portfolioSummary.gainPercent)}
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.caption,
                color: 'rgba(255,255,255,0.5)',
                marginLeft: spacing.sm,
              }}
            >
              all time
            </Text>
          </View>

          {/* Mini stats */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: spacing.xl,
              gap: spacing.md,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: radius.md,
                padding: spacing.md,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                Invested
              </Text>
              <Text
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 15,
                  color: '#FFFFFF',
                  marginTop: 2,
                }}
              >
                {formatNairaFull(portfolioSummary.totalInvested)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: radius.md,
                padding: spacing.md,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                Earned
              </Text>
              <Text
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 15,
                  color: brand.emerald,
                  marginTop: 2,
                }}
              >
                {formatNairaFull(portfolioSummary.totalEarned)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Quick Actions */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: spacing.screenPadding,
          marginTop: spacing['2xl'],
          gap: spacing.md,
        }}
      >
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.label}
            onPress={() => router.push(action.route)}
            activeOpacity={0.7}
            style={{
              flex: 1,
              alignItems: 'center',
              gap: spacing.sm,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: radius.lg,
                backgroundColor: isDark
                  ? 'rgba(0, 212, 170, 0.1)'
                  : colors.successBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <action.icon size={22} color={brand.emerald} strokeWidth={1.8} />
            </View>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: 11,
                color: colors.textSecondary,
              }}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recommended for You */}
      {recommendations.length > 0 && (
        <View style={{ marginTop: spacing['3xl'] }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: spacing.screenPadding,
              marginBottom: spacing.lg,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: fontSize.h4,
                  color: colors.textPrimary,
                }}
              >
                Recommended for You
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: fontSize.caption,
                  color: colors.textTertiary,
                  marginTop: 2,
                }}
              >
                Based on your investment activity
              </Text>
            </View>
          </View>

          <FlatList
            data={recommendations}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: spacing.screenPadding,
              gap: spacing.md,
            }}
            keyExtractor={(item) => item.property.id}
            renderItem={({ item }) => (
              <View>
                <PropertyCard property={item.property} compact />
                <View
                  style={{
                    backgroundColor: isDark ? 'rgba(0, 230, 181, 0.08)' : '#F0FDF9',
                    borderRadius: radius.md,
                    paddingVertical: 4,
                    paddingHorizontal: spacing.sm,
                    marginTop: spacing.xs,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Text style={{ fontFamily: fonts.medium, fontSize: 10, color: brand.emerald }}>
                    {item.reason}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {/* Trending Properties */}
      <View style={{ marginTop: spacing['3xl'] }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: spacing.screenPadding,
            marginBottom: spacing.lg,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: fontSize.h4,
              color: colors.textPrimary,
            }}
          >
            Trending Properties
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/explore')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
              }}
            >
              See all
            </Text>
            <ChevronRight size={16} color={brand.emerald} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={properties.slice(0, 3)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: spacing.screenPadding,
            gap: spacing.md,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PropertyCard property={item} compact />}
        />
      </View>

      {/* Recent Payouts */}
      <View
        style={{
          marginTop: spacing['3xl'],
          paddingHorizontal: spacing.screenPadding,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.lg,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: fontSize.h4,
              color: colors.textPrimary,
            }}
          >
            Recent Payouts
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/payouts')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
              }}
            >
              See all
            </Text>
            <ChevronRight size={16} color={brand.emerald} />
          </TouchableOpacity>
        </View>

        {payouts.slice(0, 3).map((payout) => (
          <View
            key={payout.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: spacing.md,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderSubtle,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: radius.full,
                backgroundColor: colors.successBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.md,
              }}
            >
              <CircleDollarSign size={20} color={brand.emerald} strokeWidth={1.5} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: fontSize.bodySmall,
                  color: colors.textPrimary,
                }}
                numberOfLines={1}
              >
                {payout.propertyName}
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: fontSize.caption,
                  color: colors.textTertiary,
                  marginTop: 2,
                }}
              >
                {payout.date}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fonts.mono,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
              }}
            >
              +{formatNaira(payout.amount)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
