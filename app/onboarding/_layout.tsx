import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
        gestureEnabled: true,         // swipe back enabled
        gestureDirection: 'horizontal',
      }}
    />
  );
}