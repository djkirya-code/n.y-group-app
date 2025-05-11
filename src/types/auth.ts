import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email({ message: "Неверный адрес электронной почты." }),
  password: z.string().min(6, { message: "Пароль должен содержать не менее 6 символов." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают.",
  path: ["confirmPassword"], // path of error
});
export type SignUpFormData = z.infer<typeof SignUpSchema>;


export const SignInSchema = z.object({
  email: z.string().email({ message: "Неверный адрес электронной почты." }),
  password: z.string().min(1, { message: "Пароль обязателен." }),
});
export type SignInFormData = z.infer<typeof SignInSchema>;


export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Неверный адрес электронной почты." }),
});
export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;
