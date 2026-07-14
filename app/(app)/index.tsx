import { Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Screen from '@/components/shared/Screen';
import { APP_CONFIG } from '@/constants/config';
import { BorderRadius, Colors, FontSize, Shadow, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';

const STARTER_FEATURES = [
  ['File-based routing', 'Public, authentication, onboarding, and protected route groups.'],
  ['Supabase authentication', 'Email sign-up, sign-in, session restoration, and password recovery.'],
  ['Reusable foundation', 'Theme tokens, form controls, layout primitives, and persistent app state.'],
] as const;

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  return (
    <Screen scroll>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.mutedForeground, fontSize: FontSize.sm }}>Welcome back</Text>
          <Text style={{ color: Colors.foreground, fontSize: 28, fontWeight: '700', marginTop: 2 }}>
            {name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          style={{
            width: 44,
            height: 44,
            borderRadius: BorderRadius.full,
            backgroundColor: Colors.secondary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>⚙</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: Colors.primary,
          borderRadius: BorderRadius.xl,
          padding: Spacing.lg,
          marginTop: Spacing.xl,
          ...Shadow.cta,
        }}
      >
        <Text style={{ color: Colors.primaryForeground, fontSize: FontSize.xs, fontWeight: '700', letterSpacing: 1.5 }}>
          YOUR STARTING POINT
        </Text>
        <Text style={{ color: Colors.primaryForeground, fontSize: 28, fontWeight: '700', lineHeight: 34, marginTop: 10 }}>
          {APP_CONFIG.name} is ready for your product.
        </Text>
        <Text style={{ color: '#DBEAFE', fontSize: FontSize.md, lineHeight: 22, marginTop: 10 }}>
          Replace this example screen with your first real feature.
        </Text>
      </View>

      <Text style={{ color: Colors.foreground, fontSize: FontSize.lg, fontWeight: '700', marginTop: Spacing.xl, marginBottom: Spacing.md }}>
        Included foundation
      </Text>
      {STARTER_FEATURES.map(([title, description]) => (
        <View
          key={title}
          style={{
            backgroundColor: Colors.card,
            borderColor: Colors.border,
            borderWidth: 1,
            borderRadius: BorderRadius.lg,
            padding: Spacing.md,
            marginBottom: Spacing.sm,
          }}
        >
          <Text style={{ color: Colors.foreground, fontSize: FontSize.md, fontWeight: '600' }}>{title}</Text>
          <Text style={{ color: Colors.mutedForeground, fontSize: FontSize.sm, lineHeight: 20, marginTop: 5 }}>
            {description}
          </Text>
        </View>
      ))}
    </Screen>
  );
}
