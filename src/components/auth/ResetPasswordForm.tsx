"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ResetPasswordSchema, type ResetPasswordFormData } from "@/types/auth";
import { resetUserPassword } from "@/services/authService";
import type { AuthError } from "firebase/auth";
import { AuthCard } from "./AuthCard";

export function ResetPasswordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setIsLoading(true);
    setEmailSent(false);
    try {
      await resetUserPassword(data);
      toast({ title: "Успех", description: "Письмо для сброса пароля отправлено. Пожалуйста, проверьте ваш почтовый ящик." });
      setEmailSent(true);
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = "Не удалось отправить письмо для сброса пароля. Пожалуйста, попробуйте еще раз.";
      if (authError.code === 'auth/user-not-found') {
        errorMessage = "Пользователь с таким адресом электронной почты не найден.";
      }
      toast({
        title: "Ошибка",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Сброс пароля"
      description="Введите ваш email, чтобы получить ссылку для сброса пароля."
      footerContent={
        <Button variant="link" asChild className="px-0 text-sm text-muted-foreground">
          <Link href="/auth/signin">Вернуться ко входу</Link>
        </Button>
      }
    >
      {emailSent ? (
        <div className="text-center space-y-2">
          <p className="text-foreground">Ссылка для сброса пароля отправлена на ваш адрес электронной почты. Пожалуйста, проверьте папку "Входящие" (и "Спам").</p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Электронная почта</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="vy@primer.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? "Отправка..." : "Отправить ссылку для сброса"}
            </Button>
          </form>
        </Form>
      )}
    </AuthCard>
  );
}
