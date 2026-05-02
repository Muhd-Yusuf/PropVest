import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useTheme } from '../../lib/ThemeContext';
import { useAuth } from '../../lib/AuthContext';
import { fonts, fontSize, spacing, radius, brand } from '../../lib/theme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function AccountScreen() {
  const { colors } = useTheme();
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled && result.assets[0].base64) {
      const uri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      await updateProfile({ profilePicture: uri });
    }
  };

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
          Account
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.screenPadding, gap: spacing.lg, paddingBottom: insets.bottom + 20 }}
      >
        {/* Profile Picture */}
        <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.8}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.bgSecondary,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: spacing.sm,
            }}
          >
            {user?.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            ) : (
              <Camera size={28} color={colors.textTertiary} strokeWidth={1.5} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ fontFamily: fonts.medium, fontSize: fontSize.bodySmall, color: brand.emerald }}>
              Change Photo
            </Text>
          </TouchableOpacity>
          {user?.profilePicture && (
            <TouchableOpacity onPress={() => updateProfile({ profilePicture: undefined })}>
              <Text style={{ fontFamily: fonts.regular, fontSize: fontSize.caption, color: colors.error, marginTop: 4 }}>
                Remove
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Input label="Full Name" value={user?.fullName ?? ''} onChangeText={() => {}} />
        <Input label="Email" value={user?.email ?? ''} onChangeText={() => {}} editable={false} />
        <Input label="Phone" value={user?.phone ?? ''} onChangeText={() => {}} keyboardType="phone-pad" />
        <View style={{ marginTop: spacing.md }}>
          <Button label="Save Changes" onPress={() => router.back()} fullWidth />
        </View>
      </ScrollView>
    </View>
  );
}
