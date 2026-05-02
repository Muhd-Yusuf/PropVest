import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { useAuth } from '../../lib/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { sendPasswordReset } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email address');
      return;
    }
    setError('');
    setIsSending(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } finally {
      setIsSending(false);
    }
  };

  if (sent) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgPrimary,
          paddingHorizontal: spacing.screenPadding,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.successBg,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing['2xl'],
          }}
        >
          <CheckCircle size={48} color={brand.emerald} strokeWidth={1.5} />
        </View>
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: fontSize.h2,
            color: colors.textPrimary,
            textAlign: 'center',
          }}
        >
          Check Your Email
        </Text>
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: fontSize.body,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: spacing.md,
            lineHeight: 22,
            paddingHorizontal: spacing.xl,
          }}
        >
          We've sent a password reset link to{' '}
          <Text style={{ fontFamily: fonts.semibold, color: colors.textPrimary }}>
            {email}
          </Text>
        </Text>
        <View style={{ marginTop: spacing['3xl'], alignSelf: 'stretch' }}>
          <Button
            label="Back to Sign In"
            onPress={() => router.replace('/(auth)/sign-in')}
            variant="secondary"
            size="lg"
            fullWidth
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1, paddingHorizontal: spacing.screenPadding }}>
        {/* Back */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: insets.top + spacing.md,
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

        {/* Header */}
        <View style={{ marginTop: spacing['3xl'] }}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSize.h1,
              color: colors.textPrimary,
            }}
          >
            Reset Password
          </Text>
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.body,
              color: colors.textSecondary,
              marginTop: spacing.sm,
              lineHeight: 22,
            }}
          >
            Enter your email address and we'll send you a link to reset your password.
          </Text>
        </View>

        {/* Input */}
        <View style={{ marginTop: spacing['3xl'] }}>
          <Input
            label="Email Address"
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              if (error) setError('');
            }}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={colors.textTertiary} strokeWidth={1.8} />}
            error={error}
          />
        </View>

        {/* Submit */}
        <View style={{ marginTop: spacing['2xl'] }}>
          <Button
            label="Send Reset Link"
            onPress={handleReset}
            variant="primary"
            size="lg"
            fullWidth
            loading={isSending}
          />
        </View>

        {/* Back link */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: spacing.xl,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: fontSize.bodySmall,
              color: colors.textTertiary,
            }}
          >
            Remember your password?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
