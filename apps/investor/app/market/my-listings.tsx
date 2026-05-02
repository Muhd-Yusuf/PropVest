import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Tag, Trash2, Edit3, CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand, shadows } from '../../lib/theme';
import { formatNairaFull } from '../../lib/format';
import { Button } from '../../components/ui/Button';
import { PropertyBadge } from '../../components/ui/Badge';
import { myListings as mockListings } from '../../lib/mock-data';

type FilterTab = 'active' | 'sold' | 'all';

export default function MyListingsScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [listings, setListings] = useState(mockListings);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');

  const filteredListings = activeFilter === 'all'
    ? listings
    : listings.filter((l) => l.status === activeFilter);

  const handleCancel = (listingId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Cancel Listing', 'Are you sure? Your units will return to your portfolio.', [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Cancel Listing',
        style: 'destructive',
        onPress: () => {
          setListings((prev) => prev.filter((l) => l.id !== listingId));
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Alert.alert('Listing Cancelled', 'Your units have been returned to your portfolio.');
        },
      },
    ]);
  };

  const handleEditPrice = (listingId: string, currentPrice: number) => {
    setEditingId(listingId);
    setEditPrice(currentPrice.toString());
  };

  const handleSavePrice = (listingId: string) => {
    const price = parseInt(editPrice, 10);
    if (!price || price <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price.');
      return;
    }
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, askingPrice: price } : l))
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setEditingId(null);
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
            My Listings
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/market/sell')}
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
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.caption, color: '#FFFFFF' }}>New</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.screenPadding, gap: spacing.sm, marginBottom: spacing.md }}>
        {(['all', 'active', 'sold'] as FilterTab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveFilter(tab)}
            style={{
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.sm,
              borderRadius: radius.full,
              backgroundColor: activeFilter === tab ? brand.emerald : colors.bgSecondary,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.caption,
                color: activeFilter === tab ? '#FFFFFF' : colors.textTertiary,
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 20 }}
      >
        {filteredListings.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: spacing['5xl'] }}>
            <Tag size={48} color={colors.textTertiary} strokeWidth={1} />
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: fontSize.body,
                color: colors.textTertiary,
                marginTop: spacing.xl,
                textAlign: 'center',
              }}
            >
              No active listings
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: fontSize.caption,
                color: colors.textTertiary,
                marginTop: spacing.xs,
                textAlign: 'center',
              }}
            >
              Sell units from your portfolio on the marketplace
            </Text>
            <View style={{ marginTop: spacing.xl }}>
              <Button label="Sell Units" onPress={() => router.push('/market/sell')} />
            </View>
          </View>
        ) : (
          filteredListings.map((listing) => {
            const gainPercent = ((listing.askingPrice - listing.originalPrice) / listing.originalPrice) * 100;
            return (
              <View
                key={listing.id}
                style={{
                  backgroundColor: colors.cardBg,
                  borderRadius: radius.xl,
                  padding: spacing.lg,
                  marginBottom: spacing.md,
                  borderWidth: isDark ? 1 : 0,
                  borderColor: colors.cardBorder,
                  ...(!isDark && shadows.sm),
                }}
              >
                {/* Property Name + Badge */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1, marginRight: spacing.md }}>
                    <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary }} numberOfLines={1}>
                      {listing.propertyName}
                    </Text>
                    <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary, marginTop: 2 }}>
                      {listing.units} units · Listed {listing.listedAt}
                    </Text>
                  </View>
                  <PropertyBadge type={listing.propertyType} />
                </View>

                {/* Sold Listing Variant */}
                {listing.status === 'sold' ? (
                  <View style={{ marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.borderSubtle }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                      <CheckCircle2 size={16} color={colors.success} strokeWidth={2} />
                      <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.bodySmall, color: colors.success }}>
                        Sold to {listing.buyerName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md }}>
                      <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
                        Net Received
                      </Text>
                      <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.body, color: brand.emerald }}>
                        {formatNairaFull(listing.netReceived || 0)}
                      </Text>
                    </View>
                    {listing.tradeId && (
                      <TouchableOpacity
                        onPress={() => router.push(`/market/trade/${listing.tradeId}` as any)}
                        style={{
                          marginTop: spacing.md,
                          paddingVertical: spacing.md,
                          borderRadius: radius.lg,
                          backgroundColor: colors.bgPrimary,
                          borderWidth: 1,
                          borderColor: colors.borderDefault,
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
                          View Trade Details
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : editingId === listing.id ? (
                  /* Inline Price Editor */
                  <View style={{ marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.borderSubtle }}>
                    <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary, marginBottom: spacing.sm }}>
                      New Price per Unit
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgPrimary, borderRadius: radius.lg, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: brand.emerald, height: 44 }}>
                      <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.body, color: colors.textTertiary }}>N</Text>
                      <TextInput
                        value={editPrice}
                        onChangeText={setEditPrice}
                        keyboardType="numeric"
                        autoFocus
                        style={{ flex: 1, fontFamily: fonts.monoBold, fontSize: fontSize.body, color: colors.textPrimary, marginLeft: spacing.xs }}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
                      <TouchableOpacity
                        onPress={() => setEditingId(null)}
                        style={{ flex: 1, paddingVertical: spacing.md, borderRadius: radius.lg, backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.borderDefault, alignItems: 'center' }}
                      >
                        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textSecondary }}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSavePrice(listing.id)}
                        style={{ flex: 1, paddingVertical: spacing.md, borderRadius: radius.lg, backgroundColor: brand.emerald, alignItems: 'center' }}
                      >
                        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: '#FFFFFF' }}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  /* Active Listing — Price + Actions */
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: spacing.lg,
                        paddingTop: spacing.md,
                        borderTopWidth: 1,
                        borderTopColor: colors.borderSubtle,
                      }}
                    >
                      <View>
                        <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
                          Asking Price
                        </Text>
                        <Text style={{ fontFamily: fonts.monoBold, fontSize: fontSize.body, color: colors.textPrimary, marginTop: 2 }}>
                          {formatNairaFull(listing.askingPrice)}/unit
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.overline, color: colors.textTertiary }}>
                          Gain
                        </Text>
                        <Text
                          style={{
                            fontFamily: fonts.semibold,
                            fontSize: fontSize.body,
                            color: gainPercent >= 0 ? brand.emerald : colors.error,
                            marginTop: 2,
                          }}
                        >
                          {gainPercent >= 0 ? '+' : ''}{gainPercent.toFixed(0)}%
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg }}>
                      <TouchableOpacity
                        onPress={() => handleCancel(listing.id)}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: spacing.md,
                          borderRadius: radius.lg,
                          backgroundColor: colors.errorBg,
                          gap: spacing.xs,
                        }}
                      >
                        <Trash2 size={16} color={colors.error} strokeWidth={2} />
                        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.error }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleEditPrice(listing.id, listing.askingPrice)}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: spacing.md,
                          borderRadius: radius.lg,
                          backgroundColor: colors.bgSecondary,
                          borderWidth: 1,
                          borderColor: colors.borderDefault,
                          gap: spacing.xs,
                        }}
                      >
                        <Edit3 size={16} color={colors.textSecondary} strokeWidth={2} />
                        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textSecondary }}>
                          Edit Price
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        fontSize: fontSize.overline,
                        color: colors.textTertiary,
                        textAlign: 'center',
                        marginTop: spacing.md,
                      }}
                    >
                      {listing.views} views
                    </Text>
                  </>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
