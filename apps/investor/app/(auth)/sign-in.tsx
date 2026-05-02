import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { useAuth } from '../../lib/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { fonts, fontSize, spacing, brand } from '../../lib/theme';

export default function SignInScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    const e: Record<string, string> = {};
    if (!emailOrPhone.trim()) e.emailOrPhone = 'Email or phone is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setIsSubmitting(true);
    try {
      await signIn({ emailOrPhone, password });
      router.replace('/(tabs)');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.screenPadding,
          paddingBottom: insets.bottom + spacing['3xl'],
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={{ marginTop: insets.top + spacing['5xl'] }}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSize.h1,
              color: colors.textPrimary,
            }}
          >
            Welcome Back
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
            Sign in to manage your investments
          </Text>
        </View>

        {/* Form */}
        <View style={{ marginTop: spacing['4xl'], gap: spacing.lg }}>
          <Input
            label="Email or Phone"
            value={emailOrPhone}
            onChangeText={(v) => {
              setEmailOrPhone(v);
              if (errors.emailOrPhone) setErrors((p) => ({ ...p, emailOrPhone: '' }));
            }}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={colors.textTertiary} strokeWidth={1.8} />}
            error={errors.emailOrPhone}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              if (errors.password) setErrors((p) => ({ ...p, password: '' }));
            }}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            leftIcon={<Lock size={20} color={colors.textTertiary} strokeWidth={1.8} />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color={colors.textTertiary} strokeWidth={1.8} />
                ) : (
                  <Eye size={20} color={colors.textTertiary} strokeWidth={1.8} />
                )}
              </TouchableOpacity>
            }
            error={errors.password}
          />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/forgot-password')}
          style={{ alignSelf: 'flex-end', marginTop: spacing.md }}
        >
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: fontSize.bodySmall,
              color: brand.emerald,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <View style={{ marginTop: spacing['3xl'] }}>
          <Button
            label="Sign In"
            onPress={handleSignIn}
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
          />
        </View>

        {/* Sign Up link */}
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
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/sign-up')}>
            <Text
              style={{
                fontFamily: fonts.semibold,
                fontSize: fontSize.bodySmall,
                color: brand.emerald,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
