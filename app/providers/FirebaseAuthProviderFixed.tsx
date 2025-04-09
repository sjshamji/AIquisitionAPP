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
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<{ success: boolean; message: string }>;
  resetPassword: () => Promise<{ success: boolean; message: string }>;
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send verification email
      await sendEmailVerificationFirebase(userCredential.user);
      
      return { 
        success: true, 
        message: 'Account created successfully. Please check your email to verify your account.' 
      };
    } catch (error: any) {
      console.error('Error signing up:', error);
      return { 
        success: false, 
        message: error.message || 'Failed to create account' 
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

  const resetPassword = async (): Promise<{ success: boolean; message: string }> => {
    try {
      const auth = getAuth();
      if (user?.email) {
        await sendPasswordResetEmail(auth, user.email);
        return { 
          success: true, 
          message: 'Password reset email sent successfully. Please check your inbox.' 
        };
      }
      return { 
        success: false, 
        message: 'No email address found for the current user.' 
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

  const sendEmailVerification = async () => {
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

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
    sendVerificationEmail,
    resetPassword,
    isEmailVerified: user?.emailVerified || false,
    sendEmailVerification,
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