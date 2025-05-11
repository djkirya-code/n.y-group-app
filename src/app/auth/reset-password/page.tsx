import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сброс пароля - N.Y_GROUP_PVL',
  description: 'Сбросьте пароль вашей учетной записи N.Y_GROUP_PVL.',
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
