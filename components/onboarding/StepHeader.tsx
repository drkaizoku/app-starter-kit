import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Colors, FontFamily } from '@/constants/theme';

type StepHeaderProps = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  light?: boolean; // for rendering on dark/image backgrounds
};

function AnimatedDot({ active }: { active: boolean }) {
  const width = useRef(new Animated.Value(active ? 24 : 8)).current;

  useEffect(() => {
    Animated.spring(width, {
      toValue: active ? 24 : 8,
      useNativeDriver: false,
      damping: 15,
      stiffness: 120,
    }).start();
  }, [active]);

  return (
    <Animated.View
      style={{
        height: 4,
        width,
        borderRadius: 9999,
        backgroundColor: active ? Colors.primary : Colors.primaryMuted,
      }}
    />
  );
}

export default function StepHeader({ currentStep, totalSteps, onBack, light }: StepHeaderProps) {
  const textColor = light ? 'rgba(255,255,255,0.85)' : Colors.mutedForeground;
  const btnBg = light ? 'rgba(255,255,255,0.2)' : Colors.secondary;
  const arrowColor = light ? '#fff' : Colors.foreground;

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingTop: 56,
      paddingBottom: 16,
    }}>
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.8}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: btnBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: arrowColor }}>←</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <AnimatedDot key={i} active={i + 1 === currentStep} />
        ))}
      </View>

      <Text style={{
        fontFamily: FontFamily.body,
        fontSize: 13,
        color: textColor,
      }}>
        {currentStep} / {totalSteps}
      </Text>
    </View>
  );
}