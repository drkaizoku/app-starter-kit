import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import AuthScreen from '@/components/auth/AuthScreen';
import Button from '@/components/shared/Button';
import ConfigNotice from '@/components/shared/ConfigNotice';
import Input from '@/components/shared/Input';
import { Colors, FontSize } from '@/constants/theme';
import { getErrorMessage } from '@/lib/errors';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type Errors = Partial<Record<'name' | 'email' | 'password' | 'confirmPassword' | 'form', string>>;

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    if (password.length < 8) next.password = 'Use at least 8 characters.';
    if (password !== confirmPassword) next.confirmPassword = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignup = async () => {
    if (!supabase || !validate()) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: name.trim() } },
      });
      if (error) throw error;

      if (data.session) router.replace('/(app)');
      else {
        Alert.alert('Check your inbox', 'Confirm your email address, then sign in.');
        router.replace('/auth/login');
      }
    } catch (cause) {
      setErrors((current) => ({ ...current, form: getErrorMessage(cause, 'Unable to create account.') }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      eyebrow="GET STARTED"
      title="Create your account."
      description="Start with email authentication, then extend the profile for your product."
      footer={
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
          <Text style={{ color: Colors.mutedForeground, fontSize: FontSize.sm }}>Already registered?</Text>
          <TouchableOpacity onPress={() => router.replace('/auth/login')}>
            <Text style={{ color: Colors.primary, fontSize: FontSize.sm, fontWeight: '600' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      }
    >
      {!isSupabaseConfigured && <ConfigNotice />}
      <Input label="Name" placeholder="Your name" value={name} onChangeText={setName} error={errors.name} />
      <Input
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
      />
      <Input
        label="Password"
        placeholder="At least 8 characters"
        secureTextEntry
        autoComplete="new-password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
      />
      <Input
        label="Confirm password"
        placeholder="Repeat your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={errors.confirmPassword ?? errors.form}
      />
      <Button
        label="Create account"
        onPress={handleSignup}
        loading={loading}
        disabled={!isSupabaseConfigured || !name || !email || !password || !confirmPassword}
        style={{ marginTop: 8 }}
      />
    </AuthScreen>
  );
}
