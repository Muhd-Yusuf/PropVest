import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Building2, TrendingUp, ArrowUpRight } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull, formatNaira, formatPercent } from '../../lib/format';
import { holdings, portfolioSummary } from '../../lib/mock-data';
import { ScreenWrapper } from '../../components/ui/ScreenWrapper';
import { StatCard } from '../../components/ui/StatCard';
import { ProgressBar } from '../../components/ui/ProgressBar';

export default function PortfolioScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      {/* Header */}
      <View style={{ paddingTop: insets.top + spacing.md, marginBottom: spacing.xl }}>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSize.h2,
            color: colors.textPrimary,
          }}
        >
          Portfolio
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.bodySmall,
            color: colors.textTertiary,
            marginTop: 2,
          }}
        >
          Your investments at a glance
        </Text>
      </View>

      {/* Summary Stats */}
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing['2xl'] }}>
        <StatCard
          value={formatNairaFull(portfolioSummary.currentValue)}
          label="Current Value"
        />
        <StatCard
          value={`+${formatPercent(portfolioSummary.gainPercent)}`}
          label="Total Gain"
          valueColor={brand.emerald}
        />
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing['3xl'] }}>
        <StatCard
          value={formatNairaFull(portfolioSummary.totalInvested)}
          label="Invested"
        />
        <StatCard
          value={formatNairaFull(portfolioSummary.totalEarned)}
          label="Earned"
          valueColor={brand.emerald}
        />
      </View>

      {/* Holdings */}
      <Text
        style={{
          fontFamily: fonts.semibold,
          fontSize: fontSize.h4,
          color: colors.textPrimary,
          marginBottom: spacing.lg,
        }}
      >
        Your Holdings
      </Text>

      {holdings.map((holding) => {
        const gain =
          ((holding.currentValue - holding.investedAmount) / holding.investedAmount) * 100;
        const funded = holding.property.unitsSold / holding.property.totalUnits;

        return (
          <TouchableOpacity
            key={holding.id}
            activeOpacity={0.85}
            onPress={() => router.push(`/holding/${holding.id}`)}
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: radius.xl,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.cardBorder,
              padding: spacing.lg,
              marginBottom: spacing.md,
              ...(!isDark && shadows.sm),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <View style={{ flex: 1, marginRight: spacing.md }}>
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: fontSize.body,
                    color: colors.textPrimary,
                  }}
                  numberOfLines={1}
                >
                  {holding.property.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: fontSize.caption,
                    color: colors.textTertiary,
                    marginTop: 2,
                  }}
                >
                  {holding.units} units · {holding.property.type === 'rental' ? 'Rental' : 'Build & Sell'}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: fontSize.body,
                    color: colors.textPrimary,
                  }}
                >
                  {formatNaira(holding.currentValue)}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                  <ArrowUpRight size={12} color={brand.emerald} strokeWidth={2} />
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: fontSize.caption,
                      color: brand.emerald,
                      marginLeft: 2,
                    }}
                  >
                    +{gain.toFixed(1)}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Progress */}
            <View style={{ marginTop: spacing.md }}>
              <ProgressBar progress={funded} height={4} />
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: 11,
                  color: colors.textTertiary,
                  marginTop: spacing.xs,
                }}
              >
                {Math.round(funded * 100)}% funded
              </Text>
            </View>

            {holding.totalEarned > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: spacing.md,
                  paddingTop: spacing.md,
                  borderTopWidth: 1,
                  borderTopColor: colors.borderSubtle,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: fontSize.caption,
                    color: colors.textTertiary,
                  }}
                >
                  Earned: {formatNaira(holding.totalEarned)}
                </Text>
                {holding.nextPayoutAmount > 0 && (
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: fontSize.caption,
                      color: colors.textTertiary,
                    }}
                  >
                    Next: {formatNaira(holding.nextPayoutAmount)} in {holding.nextPayoutDays}d
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScreenWrapper>
  );
}
