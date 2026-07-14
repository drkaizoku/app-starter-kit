import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { ONBOARDING_STORAGE_KEY } from '@/constants/config';

type AppState = {
  hasCompletedOnboarding: boolean;
  hasHydrated: boolean;
  hydrate: () => Promise<void>;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  hasCompletedOnboarding: false,
  hasHydrated: false,
  hydrate: async () => {
    try {
      const storedValue = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
      set({ hasCompletedOnboarding: storedValue === 'true' });
    } catch (error) {
      console.warn('Unable to restore persisted app state.', error);
    } finally {
      set({ hasHydrated: true });
    }
  },
  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
    void AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
  },
  resetOnboarding: () => {
    set({ hasCompletedOnboarding: false });
    void AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY);
  },
  setHasHydrated: (hasHydrated) => set({ hasHydrated }),
}));
