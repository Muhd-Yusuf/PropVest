import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Share2,
  Heart,
  Hammer,
  Home,
  ShoppingBag,
  Clock,
  Hourglass,
  Info,
} from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNaira, formatNairaFull } from '../../lib/format';
import { properties } from '../../lib/mock-data';
import { getSimilarProperties } from '../../lib/recommendations';
import { PropertyBadge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { PropertyCard } from '../../components/PropertyCard';

type DetailTab = 'about' | 'financials' | 'documents';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<DetailTab>('about');

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgPrimary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontFamily: fonts.medium, color: colors.textTertiary }}>
          Property not found
        </Text>
      </View>
    );
  }

  const similarProperties = property ? getSimilarProperties(property, properties) : [];

  const funded = property.unitsSold / property.totalUnits;
  const unitsRemaining = property.totalUnits - property.unitsSold;

  const yieldLabel =
    property.type === 'rental'
      ? `${property.rentYield}% pa`
      : property.type === 'build_sell'
      ? `~${property.estimatedProfit}% return`
      : `${((property.pricePerSqm || 0) * 0.15).toLocaleString()} /sqm/yr`;

  const detailTabs: { key: DetailTab; label: string }[] = [
    { key: 'about', label: 'About' },
    { key: 'financials', label: 'Financials' },
    { key: 'documents', label: 'Documents' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Image Header */}
        <View
          style={{
            height: 260,
            backgroundColor: colors.bgTertiary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Building2 size={48} color={colors.textTertiary} strokeWidth={1} />

          {/* Nav Bar */}
          <View
            style={{
              position: 'absolute',
              top: insets.top + spacing.sm,
              left: spacing.screenPadding,
              right: spacing.screenPadding,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: radius.full,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowLeft size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: radius.full,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Heart size={20} color="#FFFFFF" strokeWidth={1.8} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: radius.full,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Share2 size={20} color="#FFFFFF" strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Badge overlay */}
          <View style={{ position: 'absolute', bottom: spacing.lg, left: spacing.screenPadding }}>
            <PropertyBadge type={property.type} />
          </View>
        </View>

        {/* Content */}
        <View style={{ padding: spacing.screenPadding }}>
          {/* Title */}
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSize.h2,
              color: colors.textPrimary,
            }}
          >
            {property.name}
          </Text>

          {/* Developer */}
          <TouchableOpacity
            onPress={() => router.push(`/developer/${property.developer.id}`)}
            style={{ marginTop: spacing.xs }}
          >
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
              }}
            >
              by {property.developer.name}
            </Text>
          </TouchableOpacity>

          {/* Location */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: spacing.sm,
            }}
          >
            <MapPin size={14} color={colors.textTertiary} strokeWidth={1.8} />
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.bodySmall,
                color: colors.textTertiary,
                marginLeft: spacing.xs,
              }}
            >
              {property.location.area}, {property.location.city}, {property.location.state}
            </Text>
          </View>

          {/* Funding Progress */}
          <View
            style={{
              marginTop: spacing.xl,
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              padding: spacing.lg,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.borderDefault,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: spacing.sm,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: fontSize.bodySmall,
                  color: colors.textPrimary,
                }}
              >
                {Math.round(funded * 100)}% Funded
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: fontSize.caption,
                  color: colors.textTertiary,
                }}
              >
                {unitsRemaining.toLocaleString()} units left
              </Text>
            </View>
            <ProgressBar progress={funded} height={8} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: spacing.sm,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: fontSize.caption,
                  color: colors.textTertiary,
                }}
              >
                {formatNairaFull(property.unitsSold * property.unitPrice)} raised
              </Text>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: fontSize.caption,
                  color: colors.textTertiary,
                }}
              >
                of {formatNairaFull(property.totalValue)}
              </Text>
            </View>
          </View>

          {/* Phase Banner */}
          <View
            style={{
              marginTop: spacing.lg,
              borderRadius: radius.lg,
              padding: spacing.lg,
              backgroundColor: property.phase === 'renting' ? 'rgba(0, 230, 181, 0.08)'
                : property.phase === 'construction' ? 'rgba(245, 158, 11, 0.08)'
                : property.phase === 'holding' ? 'rgba(108, 99, 255, 0.08)'
                : property.phase === 'selling' ? 'rgba(0, 230, 181, 0.08)'
                : colors.bgSecondary,
              borderWidth: 1,
              borderColor: property.phase === 'renting' ? 'rgba(0, 230, 181, 0.2)'
                : property.phase === 'construction' ? 'rgba(245, 158, 11, 0.2)'
                : property.phase === 'holding' ? 'rgba(108, 99, 255, 0.2)'
                : property.phase === 'selling' ? 'rgba(0, 230, 181, 0.2)'
                : colors.borderDefault,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
              {property.phase === 'renting' && <Home size={16} color={brand.emerald} strokeWidth={2} />}
              {property.phase === 'construction' && <Hammer size={16} color="#F59E0B" strokeWidth={2} />}
              {property.phase === 'funding' && <TrendingUp size={16} color={brand.emerald} strokeWidth={2} />}
              {property.phase === 'holding' && <Clock size={16} color="#6C63FF" strokeWidth={2} />}
              {property.phase === 'selling' && <ShoppingBag size={16} color={brand.emerald} strokeWidth={2} />}
              {property.phase === 'vacant' && <Hourglass size={16} color="#F59E0B" strokeWidth={2} />}
              <Text style={{
                fontFamily: fonts.semibold, fontSize: fontSize.bodySmall,
                color: colors.textPrimary, marginLeft: spacing.sm,
              }}>
                {property.phase === 'renting' ? 'Earning Rental Income'
                  : property.phase === 'construction' ? 'Under Construction'
                  : property.phase === 'funding' ? 'Open for Investment'
                  : property.phase === 'holding' ? 'Holding — Appreciating'
                  : property.phase === 'selling' ? 'Being Sold to Buyers'
                  : property.phase === 'vacant' ? 'Awaiting Tenants'
                  : property.phase}
              </Text>
            </View>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textSecondary, lineHeight: 18 }}>
              {property.type === 'rental' && property.phase === 'renting'
                ? 'This property is tenanted. You earn quarterly rent payouts proportional to your units.'
                : property.type === 'rental' && property.phase === 'vacant'
                ? 'Property is built but waiting for tenants. Payouts begin once tenanted.'
                : property.type === 'rental' && (property.phase === 'construction' || property.phase === 'funding')
                ? 'Your investment funds the property. Once built and tenanted, you earn quarterly rental income.'
                : property.type === 'build_sell' && property.phase === 'construction'
                ? `Construction is ${property.constructionProgress ?? 0}% complete. Once finished, the property will be sold and you receive your investment back + profit.`
                : property.type === 'build_sell' && property.phase === 'funding'
                ? 'Your investment funds construction. Once built and sold, you receive your investment + profit share.'
                : property.type === 'build_sell' && property.phase === 'selling'
                ? 'Property is complete and being sold to end-buyers. Profits will be distributed once sold.'
                : property.type === 'land' && property.phase === 'holding'
                ? 'Land is appreciating in value. When sold, you receive your investment + profit from appreciation.'
                : property.type === 'land' && property.phase === 'selling'
                ? 'Land is being sold. Profits will be distributed to investors after the sale.'
                : 'Investment in progress.'}
            </Text>
            {property.type === 'build_sell' && property.constructionProgress !== undefined && property.constructionProgress > 0 && (
              <View style={{ marginTop: spacing.md }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
                  <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.caption, color: colors.textSecondary }}>
                    Construction
                  </Text>
                  <Text style={{ fontFamily: fonts.mono, fontSize: fontSize.caption, color: colors.textPrimary }}>
                    {property.constructionProgress}%
                  </Text>
                </View>
                <ProgressBar progress={property.constructionProgress / 100} height={6} />
              </View>
            )}
          </View>

          {/* How You Earn */}
          <View
            style={{
              marginTop: spacing.lg,
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              padding: spacing.lg,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.borderDefault,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
              <Info size={14} color={colors.textTertiary} strokeWidth={2} />
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary, marginLeft: spacing.xs }}>
                How You Earn
              </Text>
            </View>
            {property.type === 'rental' ? (
              <>
                <EarnStep number="1" text="You buy units to fund the property" colors={colors} />
                <EarnStep number="2" text="Property is built (if new) and tenanted" colors={colors} />
                <EarnStep number="3" text="Tenants pay rent every quarter" colors={colors} />
                <EarnStep number="4" text="You receive your share of rent to your bank" colors={colors} active={property.phase === 'renting'} />
              </>
            ) : property.type === 'build_sell' ? (
              <>
                <EarnStep number="1" text="You buy units to fund construction" colors={colors} />
                <EarnStep number="2" text="Developer builds the property" colors={colors} active={property.phase === 'construction'} />
                <EarnStep number="3" text="Finished property is sold to end-buyers" colors={colors} active={property.phase === 'selling'} />
                <EarnStep number="4" text="You get your investment back + profit share" colors={colors} />
              </>
            ) : (
              <>
                <EarnStep number="1" text="You buy units to co-own the land" colors={colors} />
                <EarnStep number="2" text="Land appreciates over time" colors={colors} active={property.phase === 'holding'} />
                <EarnStep number="3" text="Land is sold at higher market value" colors={colors} active={property.phase === 'selling'} />
                <EarnStep number="4" text="You get your investment back + appreciation profit" colors={colors} />
              </>
            )}
          </View>

          {/* Stats Grid */}
          <View
            style={{
              flexDirection: 'row',
              gap: spacing.sm,
              marginTop: spacing.lg,
            }}
          >
            <StatCard
              value={formatNaira(property.unitPrice)}
              label="Per Unit"
            />
            <StatCard
              value={yieldLabel}
              label={property.type === 'rental' ? 'Annual Yield' : 'Est. Return'}
              valueColor={brand.emerald}
            />
            <StatCard
              value={property.investorCount.toLocaleString()}
              label="Investors"
            />
          </View>

          {/* Detail Tabs */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: spacing['2xl'],
              borderBottomWidth: 1,
              borderBottomColor: colors.borderDefault,
            }}
          >
            {detailTabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  paddingVertical: spacing.md,
                  alignItems: 'center',
                  borderBottomWidth: 2,
                  borderBottomColor:
                    activeTab === tab.key ? brand.emerald : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      activeTab === tab.key ? fonts.semibold : fonts.regular,
                    fontSize: fontSize.bodySmall,
                    color:
                      activeTab === tab.key
                        ? brand.emerald
                        : colors.textTertiary,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={{ marginTop: spacing.xl }}>
            {activeTab === 'about' && (
              <View>
                <Text
                  style={{
                    fontFamily: fonts.semibold,
                    fontSize: fontSize.h4,
                    color: colors.textPrimary,
                    marginBottom: spacing.md,
                  }}
                >
                  About this Property
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: fontSize.body,
                    color: colors.textSecondary,
                    lineHeight: 22,
                  }}
                >
                  {property.description}
                </Text>

                {/* Key Details */}
                <View
                  style={{
                    marginTop: spacing.xl,
                    backgroundColor: colors.bgSecondary,
                    borderRadius: radius.lg,
                    padding: spacing.lg,
                    borderWidth: isDark ? 1 : 0,
                    borderColor: colors.borderDefault,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.semibold,
                      fontSize: fontSize.bodySmall,
                      color: colors.textPrimary,
                      marginBottom: spacing.md,
                    }}
                  >
                    Key Details
                  </Text>
                  {[
                    { label: 'Property Type', value: property.type === 'rental' ? 'Rental Income' : property.type === 'build_sell' ? 'Build & Sell' : 'Land Banking' },
                    { label: 'Total Value', value: formatNairaFull(property.totalValue) },
                    { label: 'Unit Price', value: formatNairaFull(property.unitPrice) },
                    { label: 'Total Units', value: property.totalUnits.toLocaleString() },
                    { label: 'Developer', value: property.developer.name },
                    ...(property.type === 'rental' ? [{ label: 'Annual Rent', value: formatNairaFull(property.annualRent || 0) }] : []),
                    ...(property.type === 'build_sell' ? [{ label: 'Timeline', value: `${property.timelineMonths} months` }] : []),
                    ...(property.type === 'land' ? [{ label: 'Total Area', value: `${(property.totalAreaSqm || 0).toLocaleString()} sqm` }] : []),
                  ].map((detail, idx) => (
                    <View
                      key={idx}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: spacing.sm,
                        borderBottomWidth: idx < 5 ? 1 : 0,
                        borderBottomColor: colors.borderSubtle,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: fonts.regular,
                          fontSize: fontSize.bodySmall,
                          color: colors.textTertiary,
                        }}
                      >
                        {detail.label}
                      </Text>
                      <Text
                        style={{
                          fontFamily: fonts.medium,
                          fontSize: fontSize.bodySmall,
                          color: colors.textPrimary,
                        }}
                      >
                        {detail.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {activeTab === 'financials' && (
              <View>
                {/* Financial Highlights */}
                <View
                  style={{
                    backgroundColor: colors.successBg,
                    borderRadius: radius.lg,
                    padding: spacing.lg,
                    borderWidth: 1,
                    borderColor: isDark ? 'rgba(0, 212, 170, 0.2)' : 'rgba(0, 212, 170, 0.15)',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.semibold,
                      fontSize: fontSize.h4,
                      color: colors.textPrimary,
                      marginBottom: spacing.md,
                    }}
                  >
                    Financial Highlights
                  </Text>
                  {property.type === 'rental' && (
                    <>
                      <FinancialRow label="Annual Rent" value={formatNairaFull(property.annualRent || 0)} colors={colors} />
                      <FinancialRow label="Rental Yield" value={`${property.rentYield}% per annum`} colors={colors} highlight />
                      <FinancialRow label="Payout Frequency" value="Quarterly" colors={colors} />
                      <FinancialRow label="Est. Per Unit/Quarter" value={formatNaira(Math.round((property.annualRent || 0) / 4 / property.totalUnits))} colors={colors} />
                    </>
                  )}
                  {property.type === 'build_sell' && (
                    <>
                      <FinancialRow label="Est. Profit" value={`~${property.estimatedProfit}%`} colors={colors} highlight />
                      <FinancialRow label="Timeline" value={`${property.timelineMonths} months`} colors={colors} />
                      <FinancialRow label="Exit Strategy" value="Property Sale" colors={colors} />
                      <FinancialRow label="Est. Return/Unit" value={formatNaira(Math.round(property.unitPrice * ((property.estimatedProfit || 0) / 100)))} colors={colors} />
                    </>
                  )}
                  {property.type === 'land' && (
                    <>
                      <FinancialRow label="Price/sqm" value={formatNaira(property.pricePerSqm || 0)} colors={colors} />
                      <FinancialRow label="Total Area" value={`${(property.totalAreaSqm || 0).toLocaleString()} sqm`} colors={colors} />
                      <FinancialRow label="Est. Appreciation" value="~15% per annum" colors={colors} highlight />
                    </>
                  )}
                </View>
              </View>
            )}

            {activeTab === 'documents' && (
              <View style={{ alignItems: 'center', paddingTop: spacing['3xl'] }}>
                <FileText size={40} color={colors.textTertiary} strokeWidth={1.2} />
                <Text
                  style={{
                    fontFamily: fonts.medium,
                    fontSize: fontSize.body,
                    color: colors.textTertiary,
                    marginTop: spacing.lg,
                    textAlign: 'center',
                  }}
                >
                  Documents will be available{'\n'}after you invest
                </Text>
              </View>
            )}
          </View>

          {/* You Might Like */}
          {similarProperties.length > 0 && (
            <View style={{ marginTop: spacing['3xl'] }}>
              <Text
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: fontSize.h4,
                  color: colors.textPrimary,
                  marginBottom: spacing.lg,
                }}
              >
                You Might Like
              </Text>
              {similarProperties.map((similar) => (
                <PropertyCard key={similar.id} property={similar} />
              ))}
            </View>
          )}
        </View>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.md,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.caption,
                color: colors.textTertiary,
              }}
            >
              Price per unit
            </Text>
            <Text
              style={{
                fontFamily: fonts.monoBold,
                fontSize: fontSize.h3,
                color: colors.textPrimary,
              }}
            >
              {formatNairaFull(property.unitPrice)}
            </Text>
          </View>
          <Button
            label="Invest Now"
            onPress={() => router.push(`/invest/${property.id}`)}
            size="lg"
            style={{ paddingHorizontal: 32 }}
          />
        </View>
      </View>
    </View>
  );
}

function EarnStep({
  number,
  text,
  colors,
  active,
}: {
  number: string;
  text: string;
  colors: any;
  active?: boolean;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: radius.full,
          backgroundColor: active ? brand.emerald : colors.bgTertiary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: spacing.sm,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: 11,
            color: active ? '#FFFFFF' : colors.textTertiary,
          }}
        >
          {number}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: active ? fonts.medium : fonts.regular,
          fontSize: fontSize.caption,
          color: active ? colors.textPrimary : colors.textSecondary,
          flex: 1,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

function FinancialRow({
  label,
  value,
  colors,
  highlight,
}: {
  label: string;
  value: string;
  colors: any;
  highlight?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.regular,
          fontSize: fontSize.bodySmall,
          color: colors.textSecondary,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fonts.semibold,
          fontSize: fontSize.bodySmall,
          color: highlight ? brand.emerald : colors.textPrimary,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
