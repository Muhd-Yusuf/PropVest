import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, TrendingDown, CheckSquare, Square, User, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react-native';
import { useTheme } from '../../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../../lib/theme';
import { formatNairaFull } from '../../../lib/format';
import { marketListings, properties } from '../../../lib/mock-data';
import { Button } from '../../../components/ui/Button';
import { PropertyBadge } from '../../../components/ui/Badge';
import { MoneyRoutingFlow } from '../../../components/MoneyRoutingFlow';
import { calcTradingFee, tradingFeeLabel } from '../../../lib/platform-config';

export default function BuyListingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);
  const [showRouting, setShowRouting] = useState(false);

  const listing = marketListings.find((l) => l.id === id);
  const property = listing ? properties.find((p) => p.id === listing.propertyId) : null;

  if (!listing || !property) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgPrimary, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: fonts.medium, color: colors.textTertiary }}>Listing not found</Text>
      </View>
    );
  }

  const isGain = listing.gainPercent >= 0;
  const totalCost = listing.units * listing.askingPrice;
  const tradingFee = calcTradingFee(totalCost);
  const grandTotal = totalCost + tradingFee;

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
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: fontSize.h3,
            color: colors.textPrimary,
            marginLeft: spacing.md,
          }}
        >
          Buy Listing
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 100 }}
      >
        {/* Property Card */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
            ...(!isDark && shadows.sm),
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, marginRight: spacing.md }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }} numberOfLines={1}>
                {listing.propertyName}
              </Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
                {property.location.area}, {property.location.city}
              </Text>
            </View>
            <PropertyBadge type={listing.propertyType} />
          </View>

          {/* Seller Info */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: spacing.lg,
              paddingTop: spacing.md,
              borderTopWidth: 1,
              borderTopColor: colors.borderSubtle,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.bgTertiary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: spacing.sm,
              }}
            >
              <User size={16} color={colors.textTertiary} strokeWidth={2} />
            </View>
            <View>
              <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
                Sold by {listing.sellerName}
              </Text>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
                Listed {listing.listedAt}
              </Text>
            </View>
          </View>
        </View>

        {/* Pricing Comparison */}
        <View
          style={{
            flexDirection: 'row',
            gap: spacing.md,
            marginTop: spacing.lg,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              padding: spacing.lg,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.borderDefault,
            }}
          >
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
              Asking Price
            </Text>
            <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.h3, color: colors.textPrimary, marginTop: 4 }}>
              {formatNairaFull(listing.askingPrice)}
            </Text>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary, marginTop: 2 }}>
              per unit
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              padding: spacing.lg,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.borderDefault,
            }}
          >
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
              vs Original
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              {isGain ? (
                <TrendingUp size={18} color={brand.emerald} strokeWidth={2} />
              ) : (
                <TrendingDown size={18} color={colors.error} strokeWidth={2} />
              )}
              <Text
                style={{
                  fontFamily: fonts.monoBold,
                  fontSize: fontSize.h3,
                  color: isGain ? brand.emerald : colors.error,
                  marginLeft: 4,
                }}
              >
                {isGain ? '+' : ''}{listing.gainPercent}%
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary, marginTop: 2 }}>
              Original: {formatNairaFull(listing.originalPrice)}
            </Text>
          </View>
        </View>

        {/* Cost Summary */}
        <View
          style={{
            marginTop: spacing.lg,
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.xl,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.md }}>
            Order Summary
          </Text>
          <CostRow label={`${listing.units} unit${listing.units > 1 ? 's' : ''} × ${formatNairaFull(listing.askingPrice)}`} value={formatNairaFull(totalCost)} colors={colors} />
          <CostRow label={tradingFeeLabel()} value={formatNairaFull(tradingFee)} colors={colors} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: spacing.md,
              marginTop: spacing.sm,
              borderTopWidth: 1,
              borderTopColor: colors.borderSubtle,
            }}
          >
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }}>Total</Text>
            <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.h3, color: brand.emerald }}>
              {formatNairaFull(grandTotal)}
            </Text>
          </View>
        </View>

        {/* Money Routing */}
        <TouchableOpacity
          onPress={() => setShowRouting(!showRouting)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: spacing.xl,
            paddingVertical: spacing.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <HelpCircle size={16} color={brand.emerald} strokeWidth={2} />
            <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.bodySmall, color: brand.emerald }}>
              Where does your money go?
            </Text>
          </View>
          {showRouting ? (
            <ChevronUp size={16} color={brand.emerald} strokeWidth={2} />
          ) : (
            <ChevronDown size={16} color={brand.emerald} strokeWidth={2} />
          )}
        </TouchableOpacity>

        {showRouting && (
          <View
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.xl,
              padding: spacing.lg,
              marginTop: spacing.sm,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.borderDefault,
            }}
          >
            <MoneyRoutingFlow
              perspective="buyer"
              units={listing.units}
              pricePerUnit={listing.askingPrice}
              sellerName={listing.sellerName}
              compact
            />
            <TouchableOpacity
              onPress={() => router.push('/market/how-it-works')}
              activeOpacity={0.7}
              style={{ alignItems: 'center', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.borderSubtle }}
            >
              <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.caption, color: brand.emerald }}>
                Learn more about P2P trading
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Checkbox */}
        <TouchableOpacity
          onPress={() => setAgreed(!agreed)}
          activeOpacity={0.7}
          style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.xl }}
        >
          {agreed ? (
            <CheckSquare size={20} color={brand.emerald} strokeWidth={2} />
          ) : (
            <Square size={20} color={colors.textTertiary} strokeWidth={1.5} />
          )}
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              marginLeft: spacing.sm,
              flex: 1,
              lineHeight: 18,
            }}
          >
            I understand this is a secondary market purchase from another investor. PropVest facilitates but does not guarantee this transaction.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sticky CTA */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: spacing.screenPadding,
          paddingTop: spacing.lg,
          paddingBottom: insets.bottom + spacing.md,
          backgroundColor: colors.bgPrimary,
          borderTopWidth: 1,
          borderTopColor: colors.borderDefault,
        }}
      >
        <Button
          label={`Buy for ${formatNairaFull(grandTotal)}`}
          onPress={() =>
            router.push({
              pathname: '/market/trade-complete',
              params: {
                propertyName: listing.propertyName,
                units: listing.units.toString(),
                total: grandTotal.toString(),
                sellerName: listing.sellerName,
              },
            })
          }
          size="lg"
          fullWidth
          disabled={!agreed}
        />
      </View>
    </View>
  );
}

function CostRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm }}>
      <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textTertiary }}>{label}</Text>
      <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>{value}</Text>
    </View>
  );
}
