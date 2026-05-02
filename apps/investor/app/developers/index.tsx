import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search, ChevronDown } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { developers } from '../../lib/mock-data';
import { DeveloperCard } from '../../components/ui/DeveloperCard';

type SortOption = 'followers' | 'properties' | 'investors' | 'raised';

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: 'followers', label: 'Most Followed' },
  { key: 'properties', label: 'Most Properties' },
  { key: 'investors', label: 'Most Investors' },
  { key: 'raised', label: 'Highest Raised' },
];

export default function DevelopersDirectoryScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('followers');
  const [showSort, setShowSort] = useState(false);
  const [followingState, setFollowingState] = useState<Record<string, boolean>>(
    Object.fromEntries(developers.map((d) => [d.id, d.isFollowing ?? false]))
  );

  const filtered = useMemo(() => {
    let result = [...developers];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) => d.name.toLowerCase().includes(q) || d.bio.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'followers': return b.followerCount - a.followerCount;
        case 'properties': return b.propertiesListed - a.propertiesListed;
        case 'investors': return b.investorCount - a.investorCount;
        case 'raised': return b.totalRaised - a.totalRaised;
        default: return 0;
      }
    });

    return result;
  }, [search, sortBy]);

  const handleToggleFollow = (id: string) => {
    setFollowingState((prev) => ({ ...prev, [id]: !prev[id] }));
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
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: fontSize.h3,
            color: colors.textPrimary,
            marginLeft: spacing.md,
          }}
        >
          Developers
        </Text>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: spacing.screenPadding, marginBottom: spacing.md }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.md,
            borderWidth: 1,
            borderColor: colors.borderDefault,
          }}
        >
          <Search size={18} color={colors.textTertiary} strokeWidth={2} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search developers..."
            placeholderTextColor={colors.textTertiary}
            style={{
              flex: 1,
              fontFamily: fonts.regular,
              fontSize: fontSize.bodySmall,
              color: colors.textPrimary,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.sm,
            }}
          />
        </View>
      </View>

      {/* Sort */}
      <View style={{ paddingHorizontal: spacing.screenPadding, marginBottom: spacing.md }}>
        <TouchableOpacity
          onPress={() => setShowSort(!showSort)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.caption, color: colors.textTertiary }}>
            Sort: {SORT_OPTIONS.find((o) => o.key === sortBy)?.label}
          </Text>
          <ChevronDown size={14} color={colors.textTertiary} strokeWidth={2} />
        </TouchableOpacity>

        {showSort && (
          <View
            style={{
              marginTop: spacing.sm,
              backgroundColor: colors.cardBg,
              borderRadius: radius.lg,
              borderWidth: 1,
              borderColor: colors.borderDefault,
              overflow: 'hidden',
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => {
                  setSortBy(option.key);
                  setShowSort(false);
                }}
                style={{
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.lg,
                  backgroundColor: sortBy === option.key ? (isDark ? 'rgba(0,230,181,0.1)' : '#ECFDF5') : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontFamily: sortBy === option.key ? fonts.semibold : fonts.regular,
                    fontSize: fontSize.bodySmall,
                    color: sortBy === option.key ? brand.emerald : colors.textPrimary,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Developer List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* Featured badge for top developer */}
        {filtered.length > 0 && filtered[0].propertiesListed > 0 && (
          <View
            style={{
              backgroundColor: isDark ? 'rgba(0,230,181,0.08)' : '#F0FDF9',
              borderRadius: radius.md,
              paddingVertical: spacing.xs,
              paddingHorizontal: spacing.md,
              alignSelf: 'flex-start',
              marginBottom: spacing.sm,
            }}
          >
            <Text style={{ fontFamily: fonts.semibold, fontSize: 11, color: brand.emerald }}>
              Featured Developer
            </Text>
          </View>
        )}

        {filtered.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: spacing['5xl'] }}>
            <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.body, color: colors.textTertiary }}>
              No developers found
            </Text>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: spacing.xs }}>
              Try a different search term
            </Text>
          </View>
        ) : (
          filtered.map((dev) => (
            <DeveloperCard
              key={dev.id}
              developer={dev}
              isFollowing={followingState[dev.id] ?? false}
              onToggleFollow={handleToggleFollow}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
