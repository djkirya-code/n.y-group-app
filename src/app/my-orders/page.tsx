"use client";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { OrderCard } from "@/components/orders/OrderCard";
import type { Order } from "@/types/order";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, ShoppingCart } from "lucide-react"; // Added ShoppingCart for consistency
import type { Metadata } from 'next';

// Mock data for orders - replace with actual data fetching
const mockOrders: Order[] = [
  {
    id: "ORD001",
    eventType: "Свадебный банкет",
    eventDate: "2024-12-15",
    location: "Большой бальный зал",
    status: "Подтвержден",
    guestCount: 150,
  },
  {
    id: "ORD002",
    eventType: "Корпоративный гала-вечер",
    eventDate: "2024-11-20",
    location: "Городской конференц-центр",
    status: "Завершен",
    guestCount: 300,
  },
  {
    id: "ORD003",
    eventType: "Празднование дня рождения",
    eventDate: "2025-01-10",
    location: "Частная резиденция",
    status: "В ожидании",
    guestCount: 50,
  },
    {
    id: "ORD004",
    eventType: "Запуск продукта",
    eventDate: "2024-10-05",
    location: "Аудитория Технопарка",
    status: "Отменен",
    guestCount: 200,
  },
];


// export const metadata: Metadata = { // Cannot use metadata in client component
//   title: 'Мои заказы - NYG Events',
//   description: 'Просмотр ваших заказов на мероприятия в NYG Events.',
// };


export default function MyOrdersPage() {
  const { loading, isAuthenticated } = useAuthRedirect({
    redirectTo: '/auth/signin?next=/my-orders',
    condition: 'unauthenticated',
  });

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
     return (
      <div className="text-center py-10">
        <p>Перенаправление на страницу входа...</p>
      </div>
    );
  }

  // TODO: Fetch actual orders for the logged-in user
  const orders = mockOrders; // Using mock data for now

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-primary">Мои заказы мероприятий</h1>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/new-order">
            <PlusCircle className="mr-2 h-4 w-4" />
            Разместить новый заказ
          </Link>
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-muted-foreground/30 rounded-lg">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">Заказов пока нет</h2>
          <p className="text-muted-foreground mb-4">Вы еще не размещали заказы на мероприятия. Готовы спланировать что-то потрясающее?</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
