import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily } from '@/constants/theme';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';

type State = 'idle' | 'sent';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<State>('idle');

  const handleReset = async () => {
    if (!email) return;
    // auth logic coming soon
  };

  if (state === 'sent') {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, paddingHorizontal: 24, justifyContent: 'center' }}>
        <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 24 }}>📬</Text>

        <Text style={{
          fontFamily: FontFamily.heading,
          fontSize: 32,
          color: Colors.foreground,
          lineHeight: 40,
          textAlign: 'center',
          marginBottom: 12,
        }}>
          Check your inbox
        </Text>

        <Text style={{
          fontFamily: FontFamily.body,
          fontSize: 15,
          color: Colors.mutedForeground,
          lineHeight: 22,
          textAlign: 'center',
          marginBottom: 40,
        }}>
          We sent a password reset link to{'\n'}
          <Text style={{ color: Colors.foreground, fontFamily: FontFamily.label }}>{email}</Text>
        </Text>

        <Button label="Back to sign in" onPress={() => router.back()} />

        <TouchableOpacity onPress={handleReset} style={{ marginTop: 16, alignItems: 'center' }}>
          <Text style={{
            fontFamily: FontFamily.body,
            fontSize: 13,
            color: Colors.mutedForeground,
            textDecorationLine: 'underline',
          }}>
            Resend email
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        {/* Back */}
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 32 }}>
          <Text style={{ fontFamily: FontFamily.body, fontSize: 15, color: Colors.mutedForeground }}>
            ← Back
          </Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={{
          fontFamily: FontFamily.label,
          fontSize: 11,
          color: Colors.mutedForeground,
          letterSpacing: 2,
          marginBottom: 10,
        }}>
          FORGOT PASSWORD
        </Text>

        <Text style={{
          fontFamily: FontFamily.heading,
          fontSize: 36,
          color: Colors.foreground,
          lineHeight: 44,
          marginBottom: 10,
        }}>
          Reset your{'\n'}password.
        </Text>

        <Text style={{
          fontFamily: FontFamily.body,
          fontSize: 15,
          color: Colors.mutedForeground,
          lineHeight: 22,
          marginBottom: 36,
        }}>
          Enter your email and we'll send you a reset link.
        </Text>

        <Input
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Button
          label="Send reset link"
          onPress={handleReset}
          loading={loading}
          disabled={!email}
          style={{ marginTop: 8 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}