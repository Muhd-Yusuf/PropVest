import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useTheme } from '../lib/ThemeContext';
import { PropertyBadge } from './ui/Badge';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../lib/theme';
import { formatNaira } from '../lib/format';
import { MarketListing } from '../lib/types';

interface Props {
  listing: MarketListing;
  onPress: () => void;
}

export function MarketListingCard({ listing, onPress }: Props) {
  const { colors, isDark } = useTheme();
  const isGain = listing.gainPercent >= 0;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        backgroundColor: colors.cardBg,
        borderRadius: radius.xl,
        borderWidth: isDark ? 1 : 0,
        borderColor: colors.cardBorder,
        padding: spacing.lg,
        ...(!isDark && shadows.sm),
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: spacing.md }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: fontSize.body,
              color: colors.textPrimary,
            }}
            numberOfLines={1}
          >
            {listing.propertyName}
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.caption,
              color: colors.textTertiary,
              marginTop: 2,
            }}
          >
            {listing.units} units · by {listing.sellerName}
          </Text>
        </View>
        <PropertyBadge type={listing.propertyType} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: spacing.md,
          paddingTop: spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.borderSubtle,
        }}
      >
        <View>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
            Asking Price
          </Text>
          <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.body, color: colors.textPrimary, marginTop: 2 }}>
            {formatNaira(listing.askingPrice)}/unit
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
            vs Original
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            {isGain ? (
              <TrendingUp size={14} color={brand.emerald} strokeWidth={2} />
            ) : (
              <TrendingDown size={14} color={colors.error} strokeWidth={2} />
            )}
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.bodySmall,
                color: isGain ? brand.emerald : colors.error,
                marginLeft: 4,
              }}
            >
              {isGain ? '+' : ''}{listing.gainPercent}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
