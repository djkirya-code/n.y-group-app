
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
  type AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { SignInFormData, SignUpFormData, ResetPasswordFormData } from "@/types/auth";

export const signUpUser = async ({ email, password }: SignUpFormData): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // console.error("Error signing up:", error);
    throw error as AuthError;
  }
};

export const signInUser = async ({ email, password }: SignInFormData): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // console.error("Error signing in:", error);
    throw error as AuthError;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    // console.error("Error signing out:", error);
    throw error as AuthError;
  }
};

export const resetUserPassword = async ({ email }: ResetPasswordFormData): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    // console.error("Error sending password reset email:", error);
    throw error as AuthError;
  }
};

export const onAuthUserChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
