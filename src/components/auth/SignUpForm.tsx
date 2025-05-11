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
import { SignUpSchema, type SignUpFormData } from "@/types/auth";
import { signUpUser } from "@/services/authService";
import type { AuthError } from "firebase/auth";
import { AuthCard } from "./AuthCard";

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    setIsLoading(true);
    try {
      await signUpUser(data);
      toast({ title: "Успех", description: "Учетная запись успешно создана. Пожалуйста, войдите." });
      router.push("/auth/signin");
    } catch (error) {
      const authError = error as AuthError;
      let errorMessage = "Не удалось создать учетную запись. Пожалуйста, попробуйте еще раз.";
      if (authError.code === 'auth/email-already-in-use') {
        errorMessage = "Этот адрес электронной почты уже используется. Попробуйте войти.";
      }
      toast({
        title: "Ошибка регистрации",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Создать учетную запись"
      description="Присоединяйтесь к нам, чтобы управлять своими мероприятиями."
      footerContent={
        <p>
          Уже есть учетная запись?{" "}
          <Button variant="link" asChild className="px-0 text-accent">
            <Link href="/auth/signin">Войти</Link>
          </Button>
        </p>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
            {isLoading ? "Создание учетной записи..." : "Создать учетную запись"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
