import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Shield, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { platformConfig } from '../../lib/platform-config';

type LegalTab = 'terms' | 'privacy' | 'risks';

export default function LegalScreen() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<LegalTab>('terms');

  const tabs: { key: LegalTab; label: string; icon: any }[] = [
    { key: 'terms', label: 'Terms', icon: FileText },
    { key: 'privacy', label: 'Privacy', icon: Shield },
    { key: 'risks', label: 'Risks', icon: AlertTriangle },
  ];

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
          Legal
        </Text>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', paddingHorizontal: spacing.screenPadding, gap: spacing.sm, marginBottom: spacing.lg }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                paddingVertical: spacing.md,
                borderRadius: radius.lg,
                backgroundColor: active ? brand.emerald : colors.bgSecondary,
                borderWidth: active ? 0 : 1,
                borderColor: colors.borderDefault,
              }}
            >
              <Icon size={14} color={active ? '#FFFFFF' : colors.textTertiary} strokeWidth={2} />
              <Text style={{ fontFamily: active ? fonts.semibold : fonts.regular, fontSize: fontSize.caption, color: active ? '#FFFFFF' : colors.textSecondary }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, paddingTop: 0, paddingBottom: insets.bottom + 20 }}
      >
        {activeTab === 'terms' && (
          <LegalContent
            title="Terms of Service"
            colors={colors}
            sections={[
              { heading: '1. Acceptance', body: 'By using PropVest, you agree to these terms. PropVest is a fractional real estate investment platform operating in Nigeria.' },
              { heading: '2. Investment Model', body: `Investments are made via Paystack Split Payments. ${100 - platformConfig.platformFeePercent}% goes directly to the developer, ${platformConfig.platformFeePercent}% is the platform fee. PropVest does not hold investor funds.` },
              { heading: '3. Returns', body: 'Returns are not guaranteed. Rental income depends on occupancy. Build & sell returns depend on market conditions. Land appreciation varies by location.' },
              { heading: '4. Secondary Market', body: `Units can be traded on the secondary market. A ${platformConfig.p2pTradingFeePercent}% trading fee (max ₦${platformConfig.p2pTradingFeeCap.toLocaleString()}) applies. PropVest does not guarantee liquidity.` },
              { heading: '5. KYC Requirements', body: 'All investors must complete bank verification (Tier 1) before investing. Higher tiers unlock higher investment limits.' },
            ]}
          />
        )}
        {activeTab === 'privacy' && (
          <LegalContent
            title="Privacy Policy"
            colors={colors}
            sections={[
              { heading: 'Data Collection', body: 'We collect your name, email, phone number, bank details, and BVN (for KYC). We do not sell your data to third parties.' },
              { heading: 'Data Usage', body: 'Your data is used for identity verification, payment processing, and communication about your investments.' },
              { heading: 'Security', body: 'All data is encrypted in transit and at rest. Bank details are tokenized via Paystack. We follow NDPR guidelines.' },
              { heading: 'Third Parties', body: 'We share data with Paystack (payments), identity verification providers, and as required by law.' },
            ]}
          />
        )}
        {activeTab === 'risks' && (
          <LegalContent
            title="Investment Risks"
            colors={colors}
            sections={[
              { heading: 'Capital Risk', body: 'Your investment may lose value. Property values can decrease due to market conditions, regulatory changes, or economic factors.' },
              { heading: 'Liquidity Risk', body: 'Real estate is inherently illiquid. While the secondary market exists, there is no guarantee you can sell your units at your desired price.' },
              { heading: 'Developer Risk', body: 'Build & sell projects depend on developer execution. Delays, cost overruns, or developer default could affect returns.' },
              { heading: 'Regulatory Risk', body: 'Changes in Nigerian property law, tax regulations, or SEC guidelines could impact the platform and your investments.' },
            ]}
          />
        )}
      </ScrollView>
    </View>
  );
}

function LegalContent({ title, sections, colors }: { title: string; sections: { heading: string; body: string }[]; colors: any }) {
  return (
    <View>
      <Text style={{ fontFamily: fonts.bold, fontSize: fontSize.h2, color: colors.textPrimary, marginBottom: spacing.xl }}>
        {title}
      </Text>
      {sections.map((s, idx) => (
        <View key={idx} style={{ marginBottom: spacing.xl }}>
          <Text style={{ fontFamily: fonts.semibold, fontSize: fontSize.body, color: colors.textPrimary, marginBottom: spacing.sm }}>
            {s.heading}
          </Text>
          <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.bodySmall, color: colors.textSecondary, lineHeight: 20 }}>
            {s.body}
          </Text>
        </View>
      ))}
    </View>
  );
}
