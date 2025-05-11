
import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Logo } from '@/components/icons/Logo';
import Link from 'next/link';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footerContent?: ReactNode;
}

export function AuthCard({ title, description, children, footerContent }: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mx-auto mb-4">
            <Logo />
          </Link>
          <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {footerContent && (
          <CardFooter className="flex flex-col items-center text-sm">
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
