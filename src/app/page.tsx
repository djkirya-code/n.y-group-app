import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, PartyPopper, Users, MapPin } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: PartyPopper,
      title: "Разнообразные типы мероприятий",
      description: "От корпоративных встреч до роскошных свадеб, мы удовлетворяем все ваши потребности в мероприятиях с креативностью и точностью.",
    },
    {
      icon: Users,
      title: "Команда экспертов",
      description: "Наши опытные планировщики и координаторы гарантируют, что каждая деталь будет идеальной, обеспечивая вам беззаботный опыт.",
    },
    {
      icon: MapPin,
      title: "Лучшие локации",
      description: "Доступ к широкому спектру потрясающих площадок и локаций, адаптированных к теме вашего мероприятия и количеству гостей.",
    },
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <Image
          src="https://picsum.photos/1200/800?grayscale"
          alt="Элегантная организация мероприятия"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 opacity-20"
          data-ai-hint="event background"
          priority
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            N.Y_GROUP_PVL
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto">
            Создаем незабываемые моменты, специально для вас.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md">
              <Link href="/new-order">Планировать мероприятие</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/pricelist">Наши услуги</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Organization Info Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            О N.Y_GROUP_PVL
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            В N.Y_GROUP_PVL мы стремимся превратить ваши мечты в впечатляющую реальность. Обладая многолетним опытом в организации мероприятий, мы специализируемся на создании индивидуальных событий, отражающих ваш уникальный стиль и цели.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <feature.icon className="w-10 h-10 text-accent" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Overview (Optional, links to Pricelist) */}
      <section className="container mx-auto px-4 text-center">
         <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-3">
            Наши обязательства
          </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Мы предлагаем полный комплекс услуг, чтобы ваше мероприятие прошло безупречно. Ознакомьтесь с нашими предложениями, и позвольте нам позаботиться о деталях.
        </p>
        <Button size="lg" variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <Link href="/pricelist">Ознакомиться с прайс-листом</Link>
        </Button>
      </section>
    </div>
  );
}
