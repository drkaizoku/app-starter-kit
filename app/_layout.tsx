import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';

export default function RootLayout() {
  const { setSession, setInitialized } = useAuthStore();

  useEffect(() => {
    if (!supabase) {
      setInitialized(true);
      return;
    }

    const bootstrapTimeout = setTimeout(() => setInitialized(true), 2000);

    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .finally(() => {
        clearTimeout(bootstrapTimeout);
        setInitialized(true);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setInitialized(true);
    });

    return () => {
      clearTimeout(bootstrapTimeout);
      data.subscription.unsubscribe();
    };
  }, [setInitialized, setSession]);

  useEffect(() => {
    void useAppStore.getState().hydrate();

    const hydrationTimeout = setTimeout(() => {
      const appState = useAppStore.getState();
      if (!appState.hasHydrated) {
        console.warn('Persistent app state did not hydrate in time; continuing with defaults.');
        appState.setHasHydrated(true);
      }
    }, 1500);

    return () => clearTimeout(hydrationTimeout);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      />
    </>
  );
}
