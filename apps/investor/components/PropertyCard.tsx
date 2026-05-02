import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Building2, MapPin } from 'lucide-react-native';
import { useTheme } from '../lib/ThemeContext';
import { PropertyBadge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';
import { fonts, radius, spacing, shadows, brand } from '../lib/theme';
import { formatNaira } from '../lib/format';
import { Property } from '../lib/types';

interface PropertyCardProps {
  property: Property;
  compact?: boolean; // horizontal scroll card
}

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const funded = property.unitsSold / property.totalUnits;

  const yieldLabel =
    property.type === 'rental'
      ? `${property.rentYield}% pa`
      : property.type === 'build_sell'
      ? `~${property.estimatedProfit}% return`
      : `${((property.pricePerSqm || 0) * 0.15).toLocaleString()} /sqm/yr`;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/property/${property.id}`)}
      style={[
        {
          backgroundColor: colors.cardBg,
          borderRadius: radius.xl,
          borderWidth: isDark ? 1 : 0,
          borderColor: colors.cardBorder,
          overflow: 'hidden',
          ...(!isDark && shadows.sm),
        },
        compact && { width: 200 },
      ]}
    >
      {/* Image placeholder */}
      <View
        style={{
          height: compact ? 100 : 140,
          backgroundColor: colors.bgTertiary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Building2 size={32} color={colors.textTertiary} strokeWidth={1.2} />
        {/* Badge overlay */}
        <View style={{ position: 'absolute', top: 8, right: 8 }}>
          <PropertyBadge type={property.type} />
        </View>
      </View>

      {/* Content */}
      <View style={{ padding: compact ? 12 : spacing.lg }}>
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: compact ? 13 : 15,
            color: colors.textPrimary,
          }}
          numberOfLines={1}
        >
          {property.name}
        </Text>

        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: compact ? 11 : 12,
            color: colors.textTertiary,
            marginTop: 2,
          }}
          numberOfLines={1}
        >
          by {property.developer.name}
        </Text>

        {!compact && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <MapPin size={12} color={colors.textTertiary} />
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 12,
                color: colors.textTertiary,
                marginLeft: 4,
              }}
            >
              {property.location.area}, {property.location.city}
            </Text>
          </View>
        )}

        {/* Progress */}
        <View style={{ marginTop: compact ? 8 : 12 }}>
          <ProgressBar progress={funded} height={compact ? 4 : 5} />
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: compact ? 10 : 11,
              color: colors.textTertiary,
              marginTop: 4,
            }}
          >
            {Math.round(funded * 100)}% funded · {property.unitsSold} of {property.totalUnits} units
          </Text>
        </View>

        {/* Price and yield */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: compact ? 8 : 10,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: compact ? 12 : 14,
              color: colors.textPrimary,
            }}
          >
            {formatNaira(property.unitPrice)}/unit
          </Text>
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: compact ? 11 : 12,
              color: brand.emerald,
            }}
          >
            {yieldLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
