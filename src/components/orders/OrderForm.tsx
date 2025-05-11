"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ru } from 'date-fns/locale'; // Import Russian locale for date-fns
import { cn } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { EventOrderSchema, type EventOrderFormData } from "@/types/order";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const eventTypes = ["Свадьба", "Корпоративное мероприятие", "День рождения", "Годовщина", "Конференция", "Другое"];

export function OrderForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EventOrderFormData>({
    resolver: zodResolver(EventOrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      eventType: "",
      location: "",
      guestCount: 1,
      eventDate: undefined,
      additionalRequests: "",
    },
  });

  async function onSubmit(data: EventOrderFormData) {
    setIsLoading(true);
    console.log("Event Order Data:", data);
    // Here you would typically send the data to your backend/API
    // For now, we'll simulate an API call and show a toast
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Заказ отправлен!",
      description: "Ваш запрос на организацию мероприятия получен. Мы свяжемся с вами в ближайшее время.",
    });
    form.reset(); // Reset form after successful submission
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Запросить организацию мероприятия</CardTitle>
        <CardDescription>Заполните форму ниже, и наша команда свяжется с вами.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Полное имя</FormLabel>
                    <FormControl>
                      <Input placeholder="например, Иван Иванов" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Номер телефона</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="например, +79001234567" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип мероприятия</FormLabel>
                  <FormControl>
                    <Input placeholder="например, Свадьба, Корпоративный семинар" {...field} list="event-types" disabled={isLoading} />
                  </FormControl>
                  <datalist id="event-types">
                    {eventTypes.map(type => <option key={type} value={type} />)}
                  </datalist>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Предпочитаемая дата мероприятия</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isLoading}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP", { locale: ru }) : <span>Выберите дату</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || isLoading}
                        initialFocus
                        locale={ru} // Add locale to Calendar component
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Место проведения мероприятия / Площадка</FormLabel>
                  <FormControl>
                    <Input placeholder="например, Мэрия, Большой бальный зал" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Примерное количество гостей</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="например, 150" {...field} onChange={e => field.onChange(parseInt(e.target.value,10))} disabled={isLoading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="additionalRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дополнительные пожелания (необязательно)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Любые особые требования или примечания..."
                        className="resize-none"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
              {isLoading ? "Отправка запроса..." : "Отправить запрос на мероприятие"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
