import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Screen from '@/components/shared/Screen';
import Button from '@/components/shared/Button';
import { APP_CONFIG } from '@/constants/config';
import { BorderRadius, Colors, FontSize, Spacing } from '@/constants/theme';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';

const STEPS = [
  {
    eyebrow: 'WELCOME',
    title: `Build faster with ${APP_CONFIG.name}.`,
    body: APP_CONFIG.tagline,
    icon: '✦',
  },
  {
    eyebrow: 'READY TO EXTEND',
    title: 'The essentials are already connected.',
    body: 'Routing, authentication, persistent state, reusable components, and environment configuration are ready for your product.',
    icon: '⌘',
  },
  {
    eyebrow: 'MAKE IT YOURS',
    title: 'Replace the examples with your features.',
    body: 'Update the central configuration and theme, add your screens, then connect your own Supabase project.',
    icon: '→',
  },
] as const;

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const session = useAuthStore((state) => state.session);
  const item = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const finish = () => {
    completeOnboarding();
    router.replace(session ? '/(app)' : '/auth/login');
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        {!isLast && (
          <TouchableOpacity onPress={finish} accessibilityRole="button">
            <Text style={{ color: Colors.mutedForeground, fontSize: FontSize.sm }}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: BorderRadius.xl,
            backgroundColor: Colors.primaryLight,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.xl,
          }}
        >
          <Text style={{ color: Colors.primary, fontSize: 30, fontWeight: '700' }}>{item.icon}</Text>
        </View>

        <Text
          style={{
            color: Colors.primary,
            fontSize: FontSize.xs,
            fontWeight: '700',
            letterSpacing: 1.8,
            marginBottom: Spacing.sm,
          }}
        >
          {item.eyebrow}
        </Text>
        <Text
          style={{
            color: Colors.foreground,
            fontSize: 36,
            fontWeight: '700',
            lineHeight: 43,
            marginBottom: Spacing.md,
          }}
        >
          {item.title}
        </Text>
        <Text style={{ color: Colors.mutedForeground, fontSize: FontSize.md, lineHeight: 24 }}>
          {item.body}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, marginBottom: Spacing.lg }}>
        {STEPS.map((_, index) => (
          <View
            key={index}
            style={{
              height: 4,
              flex: 1,
              borderRadius: BorderRadius.full,
              backgroundColor: index <= step ? Colors.primary : Colors.border,
            }}
          />
        ))}
      </View>

      <Button
        label={isLast ? 'Get started' : 'Continue'}
        onPress={isLast ? finish : () => setStep((current) => current + 1)}
      />
    </Screen>
  );
}
