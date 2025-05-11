"use client";
import { OrderForm } from "@/components/orders/OrderForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from 'next';

// export const metadata: Metadata = { // Cannot use metadata in client component
//   title: 'Новый заказ мероприятия - NYG Events',
//   description: 'Отправьте новый запрос на заказ мероприятия в NYG Events.',
// };


export default function NewOrderPage() {
  const { loading, isAuthenticated } = useAuthRedirect({
    redirectTo: '/auth/signin?next=/new-order',
    condition: 'unauthenticated',
  });

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-6 pt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // This will typically not be shown due to router.push in useAuthRedirect
    // but acts as a fallback or if redirection is slow.
    return (
      <div className="text-center py-10">
        <p>Перенаправление на страницу входа...</p>
      </div>
    );
  }
  
  return <OrderForm />;
}
