import { SignUpForm } from "@/components/auth/SignUpForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Регистрация - N.Y_GROUP_PVL',
  description: 'Создайте учетную запись в N.Y_GROUP_PVL.',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
