import { SignInForm } from "@/components/auth/SignInForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вход - N.Y_GROUP_PVL',
  description: 'Войдите в свою учетную запись N.Y_GROUP_PVL.',
};

export default function SignInPage() {
  return <SignInForm />;
}
