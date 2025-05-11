import { z } from "zod";
import type { LucideIcon } from "lucide-react";

export const EventOrderSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Неверный формат номера телефона." }),
  eventType: z.string().min(3, { message: "Необходимо указать тип мероприятия." }),
  location: z.string().min(5, { message: "Местоположение должно содержать не менее 5 символов." }),
  guestCount: z.coerce.number().int().min(1, { message: "Количество гостей должно быть не менее 1." }),
  eventDate: z.date({ required_error: "Дата мероприятия обязательна."}),
  additionalRequests: z.string().optional(),
});

export type EventOrderFormData = z.infer<typeof EventOrderSchema>;

// Keep Order status in English for backend/data consistency, translate in UI (OrderCard)
export type OrderStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";


export interface Order {
  id: string;
  eventType: string;
  eventDate: string; // Or Date object, format for display
  location: string;
  status: OrderStatus; 
  guestCount: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string; // e.g., "$100/hour", "Starting from $500"
  category: string;
  icon?: LucideIcon; // Optional: if using icons from lucide-react
}
