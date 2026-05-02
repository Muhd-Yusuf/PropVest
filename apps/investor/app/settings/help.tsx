import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown, ChevronUp, Mail, MessageCircle } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { faqs } from '../../lib/mock-data';
import { Button } from '../../components/ui/Button';

export default function HelpScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
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
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h3, color: colors.textPrimary, marginLeft: spacing.md }}>
          Help & Support
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingBottom: insets.bottom + 20 }}
      >
        {/* FAQ */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
          Frequently Asked Questions
        </Text>

        {faqs.map((faq, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.bgSecondary,
              borderRadius: radius.lg,
              padding: spacing.lg,
              marginBottom: spacing.sm,
              borderWidth: isDark ? 1 : 0,
              borderColor: colors.borderDefault,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary, flex: 1, marginRight: spacing.md }}>
                {faq.question}
              </Text>
              {expandedIdx === idx ? (
                <ChevronUp size={18} color={colors.textTertiary} strokeWidth={2} />
              ) : (
                <ChevronDown size={18} color={colors.textTertiary} strokeWidth={2} />
              )}
            </View>
            {expandedIdx === idx && (
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, marginTop: spacing.md, lineHeight: 20 }}>
                {faq.answer}
              </Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Contact */}
        <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.h4, color: colors.textPrimary, marginTop: spacing['2xl'], marginBottom: spacing.lg }}>
          Contact Us
        </Text>

        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:support@propvest.ng')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            padding: spacing.lg,
            marginBottom: spacing.sm,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <Mail size={20} color={brand.emerald} strokeWidth={1.5} />
          <View style={{ marginLeft: spacing.md }}>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
              Email Support
            </Text>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
              support@propvest.ng
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://wa.me/2348123456789')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.bgSecondary,
            borderRadius: radius.lg,
            padding: spacing.lg,
            borderWidth: isDark ? 1 : 0,
            borderColor: colors.borderDefault,
          }}
        >
          <MessageCircle size={20} color={brand.emerald} strokeWidth={1.5} />
          <View style={{ marginLeft: spacing.md }}>
            <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.bodySmall, color: colors.textPrimary }}>
              WhatsApp
            </Text>
            <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.textTertiary }}>
              Chat with us on WhatsApp
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
