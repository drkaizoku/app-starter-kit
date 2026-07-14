import { TouchableOpacity, Text, Image, ViewStyle } from 'react-native';
import { Colors, FontFamily, FontSize, BorderRadius } from '@/constants/theme';

type SocialProvider = 'google' | 'apple';

type SocialButtonProps = {
  provider: SocialProvider;
  onPress: () => void;
  style?: ViewStyle;
};

const config: Record<SocialProvider, { label: string; bg: string; border: string; text: string; icon: string }> = {
  google: {
    label: 'Continue with Google',
    bg: Colors.card,
    border: Colors.border,
    text: Colors.foreground,
    icon: 'G',
  },
  apple: {
    label: 'Continue with Apple',
    bg: Colors.foreground,
    border: Colors.foreground,
    text: Colors.background,
    icon: '',
  },
};

export default function SocialButton({ provider, onPress, style }: SocialButtonProps) {
  const c = config[provider];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        {
          backgroundColor: c.bg,
          borderWidth: 1,
          borderColor: c.border,
          borderRadius: BorderRadius.full,
          paddingVertical: 18,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: 18, color: c.text }}>{c.icon}</Text>
      <Text style={{
        fontFamily: FontFamily.label,
        fontSize: FontSize.md,
        color: c.text,
      }}>
        {c.label}
      </Text>
    </TouchableOpacity>
  );
}