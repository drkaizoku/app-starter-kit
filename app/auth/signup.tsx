import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily } from '@/constants/theme';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import SocialButton from '@/components/shared/SocialButton';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName) e.fullName = 'Name is required';
    if (!email) e.email = 'Email is required';
    if (!password) e.password = 'Password is required';
    if (password.length < 6) e.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    // auth logic coming soon
  };

  const handleGoogle = async () => {
    // google auth coming soon
  };

  const canSubmit = fullName && email && password && confirmPassword;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 48, paddingTop: 80 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <Text style={{
          fontFamily: FontFamily.label,
          fontSize: 11,
          color: Colors.mutedForeground,
          letterSpacing: 2,
          marginBottom: 10,
        }}>
          GET STARTED
        </Text>

        <Text style={{
          fontFamily: FontFamily.heading,
          fontSize: 36,
          color: Colors.foreground,
          lineHeight: 44,
          marginBottom: 10,
        }}>
          Create your{'\n'}account.
        </Text>

        <Text style={{
          fontFamily: FontFamily.body,
          fontSize: 15,
          color: Colors.mutedForeground,
          lineHeight: 22,
          marginBottom: 36,
        }}>
          Join thousands of travelers exploring Nepal.
        </Text>

        {/* Social */}
        <SocialButton provider="google" onPress={handleGoogle} style={{ marginBottom: 24 }} />

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.border }} />
          <Text style={{ fontFamily: FontFamily.label, fontSize: 11, color: Colors.mutedForeground, letterSpacing: 1.5 }}>
            OR WITH EMAIL
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.border }} />
        </View>

        {/* Inputs */}
        <Input
          label="Full Name"
          placeholder="Your name"
          autoCapitalize="words"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />
        <Input
          label="Confirm Password"
          placeholder="••••••••"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
        />

        {/* Signup button */}
        <Button
          label="Create account"
          onPress={handleSignup}
          loading={loading}
          disabled={!canSubmit}
          style={{ marginTop: 8, marginBottom: 20 }}
        />

        {/* Login link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
          <Text style={{ fontFamily: FontFamily.body, fontSize: 13, color: Colors.mutedForeground }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{
              fontFamily: FontFamily.label,
              fontSize: 13,
              color: Colors.foreground,
              textDecorationLine: 'underline',
            }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={{
          fontFamily: FontFamily.body,
          fontSize: 12,
          color: Colors.mutedForeground,
          textAlign: 'center',
          lineHeight: 18,
          marginTop: 24,
        }}>
          By continuing you agree to our{' '}
          <Text style={{ color: Colors.foreground, textDecorationLine: 'underline' }}>Terms</Text>
          {' '}&{' '}
          <Text style={{ color: Colors.foreground, textDecorationLine: 'underline' }}>Privacy</Text>.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}