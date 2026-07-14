import { useRef, useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  ImageBackground, Animated, Dimensions, StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors, FontFamily } from '@/constants/theme';
import StepHeader from '@/components/onboarding/StepHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL_STEPS = 3;

const INTERESTS = [
  { id: 'trekking',    label: '🏔️ Trekking' },
  { id: 'culture',     label: '🛕 Culture & temples' },
  { id: 'food',        label: '🍜 Food & cafés' },
  { id: 'wildlife',    label: '🐆 Wildlife safari' },
  { id: 'adventure',   label: '🪂 Adventure sports' },
  { id: 'spiritual',   label: '✳️ Spiritual retreats' },
  { id: 'villages',    label: '🏡 Hidden villages' },
  { id: 'photography', label: '📷 Photography' },
];

const PACE_OPTIONS = [
  { id: 'slow',     label: 'Slow & soulful' },
  { id: 'balanced', label: 'Balanced' },
  { id: 'packed',   label: 'Pack it in' },
];

const BUDGET_TIERS = [
  { id: 'budget',   label: '🎒 Budget',    sub: 'Hostels, dal bhat, local buses' },
  { id: 'midrange', label: '🏨 Mid-range', sub: 'Guesthouses, mix of eats & rides' },
  { id: 'comfort',  label: '✨ Comfort',   sub: 'Nice hotels, guided experiences' },
  { id: 'luxury',   label: '🛎️ Luxury',   sub: 'Boutique stays, private transfers' },
];

function StepView({ children, visible }: { children: React.ReactNode; visible: boolean }) {
  const translateX = useRef(new Animated.Value(visible ? 0 : SCREEN_WIDTH)).current;
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          damping: 22,
          stiffness: 130,
          mass: 0.8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: -SCREEN_WIDTH * 0.3,
          useNativeDriver: true,
          damping: 22,
          stiffness: 130,
          mass: 0.8,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start(() => setMounted(false));
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <Animated.View style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      opacity,
      transform: [{ translateX }],
    }}>
      {children}
    </Animated.View>
  );
}

export default function OnboardingIndex() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPace, setSelectedPace] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [minDays, setMinDays] = useState(5);
  const [maxDays, setMaxDays] = useState(14);

  const goToStep = (step: number) => setCurrentStep(step);

  const handleBack = () => {
    if (currentStep === 1) router.back();
    else goToStep(currentStep - 1);
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const step2CanContinue = selectedInterests.length > 0 && selectedPace !== null;
  const step3CanContinue = budget !== null;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* STEP 1 */}
      <StepView visible={currentStep === 1}>
        <ImageBackground
          source={require('@/assets/welcomescreen.jpeg')}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(26,46,38,0.45)', 'transparent', 'rgba(26,46,38,0.92)']}
            locations={[0, 0.3, 1]}
            style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 48 }}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 64,
            }}>
              <Text style={{
                fontFamily: FontFamily.heading,
                fontSize: 24,
                color: Colors.primaryForeground,
                opacity: 0.9,
              }}>Yatra</Text>
              <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
                <Text style={{
                  fontFamily: FontFamily.label,
                  fontSize: 12,
                  color: Colors.primaryForeground,
                  opacity: 0.7,
                  letterSpacing: 2,
                }}>SKIP</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 8 }}>
              <View style={{ width: 28, height: 1, backgroundColor: Colors.primaryForeground, opacity: 0.5 }} />
              <Text style={{
                fontFamily: FontFamily.label,
                fontSize: 11,
                color: Colors.primaryForeground,
                opacity: 0.7,
                letterSpacing: 2.5,
              }}>WELCOME TO NEPAL</Text>
            </View>

            <View style={{ flex: 1 }} />

            <Text style={{
              fontFamily: FontFamily.heading,
              fontSize: 50,
              color: Colors.primaryForeground,
              lineHeight: 58,
              marginBottom: 20,
            }}>Wander where the mountains breathe.</Text>

            <Text style={{
              fontFamily: FontFamily.body,
              fontSize: 16,
              color: Colors.primaryForeground,
              opacity: 0.8,
              lineHeight: 26,
              marginBottom: 36,
            }}>
              AI-crafted itineraries, traveler communities, and quiet local discoveries — from Kathmandu valleys to Annapurna trails.
            </Text>

            <TouchableOpacity
              onPress={() => goToStep(2)}
              activeOpacity={0.9}
              style={{
                backgroundColor: Colors.background,
                borderRadius: 9999,
                paddingVertical: 20,
                alignItems: 'center',
                shadowColor: '#1A2E26',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.25,
                shadowRadius: 40,
                elevation: 8,
              }}
            >
              <Text style={{
                fontFamily: FontFamily.label,
                fontSize: 17,
                color: Colors.foreground,
              }}>Begin the journey  →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </StepView>

      {/* STEP 2 */}
      <StepView visible={currentStep === 2}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('@/assets/prefscreen.jpeg')}
            style={{ height: 220 }}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', Colors.background]}
              locations={[0.5, 1]}
              style={{ flex: 1 }}
            >
              <StepHeader currentStep={2} totalSteps={TOTAL_STEPS} onBack={handleBack} />
            </LinearGradient>
          </ImageBackground>

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={{
              fontFamily: FontFamily.label,
              fontSize: 11,
              color: Colors.mutedForeground,
              letterSpacing: 2,
              marginBottom: 10,
            }}>TELL US ABOUT YOU</Text>

            <Text style={{
              fontFamily: FontFamily.heading,
              fontSize: 32,
              color: Colors.foreground,
              lineHeight: 40,
              marginBottom: 8,
            }}>What kind of journey calls to you?</Text>

            <Text style={{
              fontFamily: FontFamily.body,
              fontSize: 15,
              color: Colors.mutedForeground,
              lineHeight: 22,
              marginBottom: 28,
            }}>Pick a few — your AI guide will shape Nepal around them.</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
              {INTERESTS.map(item => {
                const active = selectedInterests.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => toggleInterest(item.id)}
                    activeOpacity={0.8}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 9999,
                      backgroundColor: active ? Colors.primary : Colors.card,
                      borderWidth: 1,
                      borderColor: active ? Colors.primary : Colors.border,
                    }}
                  >
                    <Text style={{
                      fontFamily: FontFamily.body,
                      fontSize: 14,
                      color: active ? Colors.primaryForeground : Colors.foreground,
                    }}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={{
              fontFamily: FontFamily.subheading,
              fontSize: 20,
              color: Colors.foreground,
              marginBottom: 16,
            }}>Your pace</Text>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              {PACE_OPTIONS.map(option => {
                const active = selectedPace === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => setSelectedPace(option.id)}
                    activeOpacity={0.8}
                    style={{
                      flex: 1,
                      paddingVertical: 14,
                      borderRadius: 9999,
                      alignItems: 'center',
                      backgroundColor: active ? Colors.primaryLight : Colors.card,
                      borderWidth: 1,
                      borderColor: active ? Colors.primary : Colors.border,
                    }}
                  >
                    <Text style={{
                      fontFamily: FontFamily.body,
                      fontSize: 13,
                      color: active ? Colors.primary : Colors.mutedForeground,
                    }}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            paddingHorizontal: 24,
            paddingBottom: 48,
            paddingTop: 16,
            backgroundColor: Colors.backgroundOverlay,
            borderTopWidth: 1,
            borderTopColor: Colors.borderMuted,
          }}>
            <TouchableOpacity
              onPress={() => goToStep(3)}
              disabled={!step2CanContinue}
              activeOpacity={0.9}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 9999,
                paddingVertical: 18,
                alignItems: 'center',
                opacity: step2CanContinue ? 1 : 0.4,
              }}
            >
              <Text style={{
                fontFamily: FontFamily.label,
                fontSize: 16,
                color: Colors.primaryForeground,
              }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </StepView>

      {/* STEP 3 */}
      <StepView visible={currentStep === 3}>
        <View style={{ flex: 1 }}>
          <StepHeader currentStep={3} totalSteps={TOTAL_STEPS} onBack={handleBack} />

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={{
              fontFamily: FontFamily.label,
              fontSize: 11,
              color: Colors.mutedForeground,
              letterSpacing: 2,
              marginBottom: 10,
              marginTop: 8,
            }}>ALMOST THERE</Text>

            <Text style={{
              fontFamily: FontFamily.heading,
              fontSize: 32,
              color: Colors.foreground,
              lineHeight: 40,
              marginBottom: 8,
            }}>How do you like to travel?</Text>

            <Text style={{
              fontFamily: FontFamily.body,
              fontSize: 15,
              color: Colors.mutedForeground,
              lineHeight: 22,
              marginBottom: 32,
            }}>This helps us suggest stays, food, and experiences that fit your style.</Text>

            <Text style={{
              fontFamily: FontFamily.subheading,
              fontSize: 20,
              color: Colors.foreground,
              marginBottom: 14,
            }}>Your budget</Text>

            <View style={{ gap: 10, marginBottom: 36 }}>
              {BUDGET_TIERS.map(tier => {
                const active = budget === tier.id;
                return (
                  <TouchableOpacity
                    key={tier.id}
                    onPress={() => setBudget(tier.id)}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      borderRadius: 16,
                      backgroundColor: active ? Colors.primaryLight : Colors.card,
                      borderWidth: 1,
                      borderColor: active ? Colors.primary : Colors.border,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontFamily: FontFamily.body,
                        fontSize: 15,
                        color: active ? Colors.primary : Colors.foreground,
                        marginBottom: 2,
                      }}>{tier.label}</Text>
                      <Text style={{
                        fontFamily: FontFamily.body,
                        fontSize: 12,
                        color: Colors.mutedForeground,
                      }}>{tier.sub}</Text>
                    </View>
                    {active && (
                      <View style={{
                        width: 20, height: 20,
                        borderRadius: 10,
                        backgroundColor: Colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Text style={{ color: Colors.primaryForeground, fontSize: 11 }}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={{
              fontFamily: FontFamily.subheading,
              fontSize: 20,
              color: Colors.foreground,
              marginBottom: 6,
            }}>Trip duration</Text>

            <Text style={{
              fontFamily: FontFamily.body,
              fontSize: 15,
              color: Colors.mutedForeground,
              marginBottom: 24,
            }}>How long do you usually travel?</Text>

            <View style={{
              alignItems: 'center',
              marginBottom: 28,
              paddingVertical: 16,
              borderRadius: 16,
              backgroundColor: Colors.card,
              borderWidth: 1,
              borderColor: Colors.border,
            }}>
              <Text style={{
                fontFamily: FontFamily.heading,
                fontSize: 36,
                color: Colors.primary,
                letterSpacing: -0.5,
              }}>{minDays} – {maxDays}</Text>
              <Text style={{
                fontFamily: FontFamily.body,
                fontSize: 13,
                color: Colors.mutedForeground,
                marginTop: 2,
              }}>days</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontFamily: FontFamily.body, fontSize: 13, color: Colors.mutedForeground }}>Minimum</Text>
                <Text style={{ fontFamily: FontFamily.label, fontSize: 13, color: Colors.foreground }}>{minDays} days</Text>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={maxDays - 1}
                step={1}
                value={minDays}
                onValueChange={val => setMinDays(val)}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.border}
                thumbTintColor={Colors.primary}
              />
            </View>

            <View style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontFamily: FontFamily.body, fontSize: 13, color: Colors.mutedForeground }}>Maximum</Text>
                <Text style={{ fontFamily: FontFamily.label, fontSize: 13, color: Colors.foreground }}>{maxDays} days</Text>
              </View>
              <Slider
                minimumValue={minDays + 1}
                maximumValue={30}
                step={1}
                value={maxDays}
                onValueChange={val => setMaxDays(val)}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.border}
                thumbTintColor={Colors.primary}
              />
            </View>
          </ScrollView>

          <View style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            paddingHorizontal: 24,
            paddingBottom: 48,
            paddingTop: 16,
            backgroundColor: Colors.backgroundOverlay,
            borderTopWidth: 1,
            borderTopColor: Colors.borderMuted,
          }}>
            <TouchableOpacity
              onPress={() => router.push('/auth/login')}
              disabled={!step3CanContinue}
              activeOpacity={0.9}
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 9999,
                paddingVertical: 18,
                alignItems: 'center',
                opacity: step3CanContinue ? 1 : 0.4,
              }}
            >
              <Text style={{
                fontFamily: FontFamily.label,
                fontSize: 16,
                color: Colors.primaryForeground,
              }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </StepView>
    </View>
  );
}