import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { properties } from '../../lib/mock-data';
import { PropertyCard } from '../../components/PropertyCard';
import { PropertyType } from '../../lib/types';

type FilterTab = 'all' | PropertyType;

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'rental', label: 'Rental' },
  { key: 'build_sell', label: 'Build & Sell' },
  { key: 'land', label: 'Land' },
];

export default function ExploreScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = properties.filter((p) => {
    const matchesTab = activeTab === 'all' || p.type === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.developer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + spacing.md,
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: spacing.md,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSize.h2,
            color: colors.textPrimary,
          }}
        >
          Explore
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.bodySmall,
            color: colors.textTertiary,
            marginTop: 2,
          }}
        >
          Discover investment opportunities
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: spacing.screenPadding,
          marginBottom: spacing.lg,
          gap: spacing.sm,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.borderDefault,
            paddingHorizontal: spacing.md,
            height: 44,
          }}
        >
          <Search size={18} color={colors.textTertiary} strokeWidth={1.8} />
          <TextInput
            placeholder="Search properties..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              flex: 1,
              marginLeft: spacing.sm,
              fontFamily: fonts.regular,
              fontSize: fontSize.body,
              color: colors.textPrimary,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            borderRadius: radius.lg,
            backgroundColor: colors.bgSecondary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.borderDefault,
          }}
        >
          <SlidersHorizontal size={18} color={colors.textSecondary} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      {/* Developer Directory Link */}
      <TouchableOpacity
        onPress={() => router.push('/developers')}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: isDark ? 'rgba(0, 230, 181, 0.08)' : '#F0FDF9',
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          marginHorizontal: spacing.screenPadding,
          marginBottom: spacing.md,
          borderWidth: 1,
          borderColor: isDark ? 'rgba(0, 230, 181, 0.15)' : 'rgba(0, 230, 181, 0.2)',
        }}
      >
        <View>
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: brand.emerald }}>
            Browse Developers
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
            Discover property partners
          </Text>
        </View>
        <ChevronRight size={18} color={brand.emerald} strokeWidth={2} />
      </TouchableOpacity>

      {/* Filter Tabs */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: spacing.screenPadding,
          marginBottom: spacing.lg,
          gap: spacing.sm,
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.sm,
                borderRadius: radius.full,
                backgroundColor: isActive
                  ? brand.emerald
                  : colors.bgSecondary,
                borderWidth: isActive ? 0 : 1,
                borderColor: colors.borderDefault,
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: fontSize.bodySmall,
                  color: isActive ? '#FFFFFF' : colors.textSecondary,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Results count */}
      <View style={{ paddingHorizontal: spacing.screenPadding, marginBottom: spacing.md }}>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.caption,
            color: colors.textTertiary,
          }}
        >
          {filteredProperties.length} properties found
        </Text>
      </View>

      {/* Property List */}
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: insets.bottom + 20,
          gap: spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PropertyCard property={item} />}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: spacing['5xl'] }}>
            <Search size={40} color={colors.textTertiary} strokeWidth={1.2} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: fontSize.body,
                color: colors.textTertiary,
                marginTop: spacing.lg,
              }}
            >
              No properties found
            </Text>
          </View>
        }
      />
    </View>
  );
}
