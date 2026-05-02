import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search, SlidersHorizontal, Plus } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { marketListings } from '../../lib/mock-data';
import { MarketListingCard } from '../../components/MarketListingCard';
import { PropertyType } from '../../lib/types';

type FilterTab = 'all' | PropertyType;

export default function MarketScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filters: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'rental', label: 'Rental' },
    { key: 'build_sell', label: 'Build & Sell' },
    { key: 'land', label: 'Land' },
  ];

  const filtered = marketListings.filter((listing) => {
    const matchesSearch = listing.propertyName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'all' || listing.propertyType === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            Marketplace
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/market/my-listings')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: brand.emerald,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: radius.md,
            gap: 4,
          }}
        >
          <Plus size={14} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.caption, color: '#FFFFFF' }}>Sell</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: spacing.screenPadding }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.md,
            borderWidth: 1,
            borderColor: colors.borderDefault,
            height: 44,
          }}
        >
          <Search size={18} color={colors.textTertiary} strokeWidth={2} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search listings..."
            placeholderTextColor={colors.textTertiary}
            style={{
              flex: 1,
              fontFamily: fonts.regular,
              fontSize: fontSize.body,
              color: colors.textPrimary,
              marginLeft: spacing.sm,
            }}
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.screenPadding,
          paddingVertical: spacing.lg,
          gap: spacing.sm,
        }}
      >
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            onPress={() => setActiveFilter(f.key)}
            style={{
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
              borderRadius: radius.full,
              backgroundColor: activeFilter === f.key ? brand.emerald : colors.bgSecondary,
              borderWidth: activeFilter === f.key ? 0 : 1,
              borderColor: colors.borderDefault,
            }}
          >
            <Text
              style={{
                fontFamily: activeFilter === f.key ? fonts.semibold : fonts.regular,
                fontSize: fontSize.bodySmall,
                color: activeFilter === f.key ? '#FFFFFF' : colors.textSecondary,
              }}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, gap: spacing.md, paddingTop: 0, paddingBottom: insets.bottom + 20 }}
      >
        <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
          {filtered.length} listing{filtered.length !== 1 ? 's' : ''} available
        </Text>
        {filtered.map((listing) => (
          <MarketListingCard
            key={listing.id}
            listing={listing}
            onPress={() => router.push(`/market/buy/${listing.id}`)}
          />
        ))}
        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingTop: spacing['4xl'] }}>
            <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.body, color: colors.textTertiary }}>
              No listings found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
