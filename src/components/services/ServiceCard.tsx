import type { ServiceItem } from "@/types/order"; // Reusing order types, can be split
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react"; // Using Tag as a generic icon for price
import Link from "next/link";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon || Tag;

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <IconComponent className="w-8 h-8 text-accent" />
          <CardTitle className="text-xl">{service.name}</CardTitle>
        </div>
        <CardDescription>{service.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{service.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t mt-auto">
        <p className="text-lg font-semibold text-primary mb-2 sm:mb-0">{service.price}</p>
        <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <Link href="/new-order">Узнать больше</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
