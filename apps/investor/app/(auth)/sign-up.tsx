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
import { User, Mail, Phone, Lock, Eye, EyeOff, Check } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { useAuth } from '../../lib/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';

export default function SignUpScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Invalid phone number';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await signUp({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      router.push('/(auth)/otp-verification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allFilled =
    form.fullName && form.email && form.phone && form.password && form.confirmPassword;

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
        <View style={{ marginTop: insets.top + spacing['4xl'] }}>
          <Text
            style={{
              fontFamily: fonts.bold,
              fontSize: fontSize.h1,
              color: colors.textPrimary,
            }}
          >
            Create Account
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
            Join thousands of Nigerians building wealth through real estate
          </Text>
        </View>

        {/* Form */}
        <View style={{ marginTop: spacing['3xl'], gap: spacing.lg }}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={(v) => updateField('fullName', v)}
            placeholder="Muhammad Sada Yusuf"
            autoCapitalize="words"
            leftIcon={<User size={20} color={colors.textTertiary} strokeWidth={1.8} />}
            error={errors.fullName}
          />
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={colors.textTertiary} strokeWidth={1.8} />}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            value={form.phone}
            onChangeText={(v) => updateField('phone', v)}
            placeholder="+234 801 234 5678"
            keyboardType="phone-pad"
            leftIcon={<Phone size={20} color={colors.textTertiary} strokeWidth={1.8} />}
            error={errors.phone}
          />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(v) => updateField('password', v)}
            placeholder="Min. 8 characters"
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
          <Input
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(v) => updateField('confirmPassword', v)}
            placeholder="Re-enter password"
            secureTextEntry={!showConfirm}
            autoCapitalize="none"
            leftIcon={<Lock size={20} color={colors.textTertiary} strokeWidth={1.8} />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? (
                  <EyeOff size={20} color={colors.textTertiary} strokeWidth={1.8} />
                ) : (
                  <Eye size={20} color={colors.textTertiary} strokeWidth={1.8} />
                )}
              </TouchableOpacity>
            }
            error={errors.confirmPassword}
          />
        </View>

        {/* Terms */}
        <TouchableOpacity
          onPress={() => setTermsAccepted(!termsAccepted)}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: spacing.xl,
            gap: spacing.md,
          }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: radius.sm,
              borderWidth: 1.5,
              borderColor: termsAccepted ? brand.emerald : colors.borderDefault,
              backgroundColor: termsAccepted ? brand.emerald : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 1,
            }}
          >
            {termsAccepted && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
          </View>
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.regular,
              fontSize: fontSize.bodySmall,
              color: colors.textSecondary,
              lineHeight: 20,
            }}
          >
            I agree to the{' '}
            <Text style={{ color: brand.emerald, fontFamily: fonts.medium }}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={{ color: brand.emerald, fontFamily: fonts.medium }}>
              Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <View style={{ marginTop: spacing['2xl'] }}>
          <Button
            label="Create Account"
            onPress={handleSignUp}
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={!allFilled || !termsAccepted}
          />
        </View>

        {/* Sign In link */}
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
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/(auth)/sign-in')}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
