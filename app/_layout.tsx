// @ts-ignore
import "../global.css";
import { Slot } from "expo-router";

export default function RootLayout() {
  return <Slot />;
}




// import "../global.css";
// import { useEffect } from "react";
// import { Slot } from "expo-router";
// import { supabase } from "../lib/supabase";
// import { useAuthStore } from "../stores/authStore";

// export default function RootLayout() {
//   const { setSession, setUser, clearAuth } = useAuthStore();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         if (session) {
//           setSession(session);
//           setUser(session.user);
//         } else {
//           clearAuth();
//         }
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   return <Slot />;
// }
