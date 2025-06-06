'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  getAuth,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification as sendEmailVerificationFirebase,
  sendPasswordResetEmail,
  updatePassword as updatePasswordFirebase,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  isEmailVerified: boolean;
  sendEmailVerification: () => Promise<{ success: boolean; message: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    console.log('Firebase Auth initialized:', !!auth);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'No user');
      setUser(user);
      setLoading(false);
      
      if (user) {
        // Get the ID token
        const token = await user.getIdToken();
        // Set the token in a cookie
        Cookies.set('firebase-auth-token', token, { expires: 7 }); // Expires in 7 days
      } else {
        // Remove the token cookie if the user is not authenticated
        Cookies.remove('firebase-auth-token');
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign up with email:', email);
      const auth = getAuth();
      console.log('Auth object available:', !!auth);
      
      if (!auth) {
        return { 
          success: false, 
          message: 'Firebase Auth is not initialized properly. Check your Firebase configuration.' 
        };
      }
      
      console.log('Creating user with email and password...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', !!userCredential.user);
      
      if (!userCredential.user) {
        return { 
          success: false, 
          message: 'User was not created properly.' 
        };
      }
      
      // Send verification email
      console.log('Sending verification email...');
      await sendEmailVerificationFirebase(userCredential.user);
      console.log('Verification email sent');
      
      return { 
        success: true, 
        message: 'Account created successfully. Please check your email to verify your account.' 
      };
    } catch (error: any) {
      console.error('Error signing up:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // Provide more user-friendly error messages based on Firebase error codes
      let userMessage = 'Failed to create account';
      
      if (error.code === 'auth/email-already-in-use') {
        userMessage = 'This email is already registered. Please use a different email or try to sign in.';
      } else if (error.code === 'auth/invalid-email') {
        userMessage = 'The email address is not valid.';
      } else if (error.code === 'auth/operation-not-allowed') {
        userMessage = 'Email/password accounts are not enabled. Please contact support.';
      } else if (error.code === 'auth/weak-password') {
        userMessage = 'The password is too weak. Please use a stronger password.';
      } else if (error.code === 'auth/network-request-failed') {
        userMessage = 'A network error occurred. Please check your internet connection.';
      }
      
      return { 
        success: false, 
        message: userMessage 
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: 'Signed in successfully' };
    } catch (error: any) {
      console.error('Error signing in:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to sign in' 
      };
    }
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      Cookies.remove('firebase-auth-token');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const sendVerificationEmail = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      try {
        await sendEmailVerificationFirebase(currentUser);
        return { 
          success: true, 
          message: 'Verification email sent successfully. Please check your inbox.' 
        };
      } catch (error: any) {
        console.error('Error sending verification email:', error);
        return { 
          success: false, 
          message: error.message || 'Failed to send verification email' 
        };
      }
    }
    
    return { 
      success: false, 
      message: 'No user is currently signed in' 
    };
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      return { 
        success: true, 
        message: 'Password reset email sent successfully. Please check your inbox.' 
      };
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to send password reset email' 
      };
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      const auth = getAuth();
      if (user) {
        await updatePasswordFirebase(user, newPassword);
        return { 
          success: true, 
          message: 'Password updated successfully.' 
        };
      }
      return { 
        success: false, 
        message: 'No user is currently signed in.' 
      };
    } catch (error: any) {
      console.error('Error updating password:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to update password' 
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        return { 
          success: true, 
          message: 'Signed in with Google successfully' 
        };
      }
      
      return { 
        success: false, 
        message: 'Failed to sign in with Google' 
      };
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to sign in with Google' 
      };
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    sendVerificationEmail,
    resetPassword,
    isEmailVerified: user?.emailVerified || false,
    sendEmailVerification: sendVerificationEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseAuthProvider');
  }
  return context;
} 