
"use client";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuthContext } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

// export const metadata: Metadata = { // Cannot use metadata in client component
//   title: 'Панель администратора - N.Y_GROUP_PVL',
//   description: 'Панель администратора для управления N.Y_GROUP_PVL.',
// };

export default function AdminDashboardPage() {
  const { isAdmin, loading: authLoading } = useAuthContext();
  
  // Standard auth redirect for non-authenticated users trying to access any protected page
  const { loading: redirectLoading } = useAuthRedirect({
    redirectTo: '/auth/signin?next=/admin/dashboard',
    condition: 'unauthenticated',
  });

  // Additional check for admin role specifically
  const routerIsPushing = redirectLoading || (authLoading && !isAdmin);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      // If auth is resolved and user is not admin, redirect to home
      // This handles cases where a non-admin authenticated user tries to access /admin/*
      const { push } = require('next/navigation').useRouter(); // Local import to avoid server component errors
      push('/'); 
    }
  }, [authLoading, isAdmin]);


  if (authLoading || routerIsPushing) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-1/3" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    // This should ideally not be reached if redirection logic is effective
    return (
        <div className="text-center py-10">
            <p>У вас нет доступа к этой странице. Перенаправление...</p>
        </div>
    );
  }
  

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Панель Администратора</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать, Администратор!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Это защищенная область для управления приложением N.Y_GROUP_PVL.
            Здесь вы сможете управлять пользователями, заказами, услугами и другим контентом.
          </p>
          {/* Placeholder for admin functionalities */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {title: "Управление Заказами", description: "Просмотр и обновление статусов заказов."},
              {title: "Пользователи Системы", description: "Управление учетными записями пользователей."},
              {title: "Редактирование Услуг", description: "Добавление или изменение доступных услуг."},
            ].map(item => (
                 <Card key={item.title} className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                 </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Need to import useEffect for the additional admin check redirection
import { useEffect } from 'react';
