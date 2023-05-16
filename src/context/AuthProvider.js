import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const passwordReset = (email) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });

const updatePassword = (updatedPassword) =>
  supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user);
      console.log("getSession", session);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", session);
      if (_event === "SIGNED_IN") {
        console.log("SIGNED_IN");
        setSession(session);
        setUser(session.user);
      } else if (_event === "SIGNED_OUT") {
        console.log("SIGNED_OUT");
        setSession(null);
        setUser(null);
      }
    });

    setLoading(false);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        supabase,
        session,
        user,
        signIn,
        signOut,
        passwordReset,
        updatePassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
