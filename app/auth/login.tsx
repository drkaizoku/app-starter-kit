import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily } from '@/constants/theme';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import SocialButton from '@/components/shared/SocialButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // auth logic coming soon
  };

  const handleGoogle = async () => {
    // google auth coming soon
  };

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
          WELCOME BACK
        </Text>

        <Text style={{
          fontFamily: FontFamily.heading,
          fontSize: 36,
          color: Colors.foreground,
          lineHeight: 44,
          marginBottom: 10,
        }}>
          Sign in to{'\n'}your journey.
        </Text>

        <Text style={{
          fontFamily: FontFamily.body,
          fontSize: 15,
          color: Colors.mutedForeground,
          lineHeight: 22,
          marginBottom: 36,
        }}>
          Continue where you left off.
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
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={error ?? undefined}
        />

        {/* Forgot password */}
        <TouchableOpacity
          onPress={() => router.push('/auth/forgot-password')}
          style={{ alignSelf: 'flex-end', marginBottom: 24, marginTop: -8 }}
        >
          <Text style={{
            fontFamily: FontFamily.body,
            fontSize: 13,
            color: Colors.mutedForeground,
            textDecorationLine: 'underline',
          }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Login button */}
        <Button
          label="Sign in"
          onPress={handleLogin}
          loading={loading}
          disabled={!email || !password}
          style={{ marginBottom: 20 }}
        />

        {/* Sign up link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
          <Text style={{ fontFamily: FontFamily.body, fontSize: 13, color: Colors.mutedForeground }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/signup')}>
            <Text style={{
              fontFamily: FontFamily.label,
              fontSize: 13,
              color: Colors.foreground,
              textDecorationLine: 'underline',
            }}>
              Sign up
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