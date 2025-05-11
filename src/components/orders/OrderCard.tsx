import type { Order } from "@/types/order";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPinIcon, Users, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface OrderCardProps {
  order: Order;
}

// Helper function to translate status (can be moved to a utils file or kept here if small)
const translateStatus = (status: Order["status"]): string => {
  switch (status) {
    case "Confirmed":
      return "Подтвержден";
    case "Completed":
      return "Завершен";
    case "Pending":
      return "В ожидании";
    case "Cancelled":
      return "Отменен";
    default:
      return status;
  }
};


export function OrderCard({ order }: OrderCardProps) {
  const getStatusVariant = (status: Order["status"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "Confirmed": // "Подтвержден"
        return "default"; 
      case "Completed": // "Завершен"
        return "secondary";
      case "Pending": // "В ожидании"
        return "outline"; 
      case "Cancelled": // "Отменен"
        return "destructive";
      default:
        return "outline";
    }
  };

 const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Confirmed":
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };


  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{order.eventType}</CardTitle>
            <CardDescription>ID заказа: {order.id}</CardDescription>
          </div>
          <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
            {getStatusIcon(order.status)}
            {translateStatus(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>Дата: {order.eventDate}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPinIcon className="mr-2 h-4 w-4" />
          <span>Местоположение: {order.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span>Гости: {order.guestCount}</span>
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button variant="outline" size="sm">Посмотреть детали</Button>
      </CardFooter> */}
    </Card>
  );
}
