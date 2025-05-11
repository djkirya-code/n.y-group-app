"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { SignInSchema, type SignInFormData } from "@/types/auth";
import { signInUser } from "@/services/authService";
import type { AuthError } from "firebase/auth";
import { AuthCard } from "./AuthCard";

export function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true);
    try {
      await signInUser(data);
      toast({ title: "Успех", description: "Вход выполнен успешно." });
      router.push("/"); // Redirect to dashboard or home
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = "Не удалось войти. Пожалуйста, попробуйте еще раз.";
      if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
        errorMessage = "Неверный адрес электронной почты или пароль.";
      }
      toast({
        title: "Ошибка входа",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="С возвращением"
      description="Войдите, чтобы получить доступ к своей учетной записи."
      footerContent={
        <>
          <p>
            У вас нет учетной записи?{" "}
            <Button variant="link" asChild className="px-0 text-accent">
              <Link href="/auth/signup">Зарегистрироваться</Link>
            </Button>
          </p>
          <Button variant="link" asChild className="px-0 text-sm text-muted-foreground">
            <Link href="/auth/reset-password">Забыли пароль?</Link>
          </Button>
        </>
      }
    >
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
