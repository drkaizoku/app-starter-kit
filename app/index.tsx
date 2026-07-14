import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Index() {
useEffect(() => {
  const test = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, post_type, visibility')
      .eq('visibility', 'public');
    console.log('posts:', data, error);
  };
  test();
}, []);

  return <Redirect href="/onboarding/welcome" />;
}