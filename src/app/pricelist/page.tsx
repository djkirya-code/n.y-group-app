import { ServiceCard } from "@/components/services/ServiceCard";
import type { ServiceItem } from "@/types/order";
import { 
  Sparkles, Briefcase,
  Music, Camera, Disc3, Mic2, Video, Aperture, MailCheck, UserRound, Heart,
  Settings2, CodeXml, Headphones, WandSparkles, Music4, Instagram, MessageCircle, MapPin, Users
} from "lucide-react";
import type { Metadata } from 'next';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Прайс-лист - N.Y_GROUP_PVL',
  description: 'Ознакомьтесь с нашими услугами и ценами на мероприятия в N.Y_GROUP_PVL.',
};

const mockServices: ServiceItem[] = [
  {
    id: "SVC001",
    name: "Полное планирование свадьбы",
    description: "Комплексное планирование от концепции до реализации, включая управление поставщиками, выбор места проведения и координацию в день мероприятия.",
    price: "От 5,000 у.е.",
    category: "Организация мероприятий",
    icon: Sparkles,
  },
  {
    id: "SVC002",
    name: "Организация корпоративных мероприятий",
    description: "Полное управление конференциями, семинарами, запусками продуктов и корпоративными вечеринками. Включает аудио/видео оборудование, логистику и брендинг.",
    price: "Индивидуальный расчет",
    category: "Организация мероприятий",
    icon: Briefcase,
  },
  {
    id: "SVC005",
    name: "Заказ развлекательных услуг",
    description: "Живые группы, ди-джеи, ведущие и другие артисты для создания незабываемой атмосферы на вашем мероприятии.",
    price: "Зависит от исполнителя",
    category: "Развлечения и Ведущие",
    icon: Music,
  },
  {
    id: "SVC006",
    name: "Комплексная фото- и видеосъемка",
    description: "Запечатлейте ваши драгоценные моменты с нашей профессиональной командой фотографов и видеографов.",
    price: "Пакеты от 1,500 у.е.",
    category: "Фото и Видео Услуги",
    icon: Camera,
  },
  {
    id: "SVC007",
    name: "Диджей (DJ) / Звукооператор",
    description: "Профессиональное музыкальное сопровождение и звукорежиссура для вашего мероприятия.",
    price: "По запросу",
    category: "Развлечения и Ведущие",
    icon: Disc3,
  },
  {
    id: "SVC008",
    name: "Ведущий / Тамада",
    description: "Харизматичные ведущие и тамады для создания праздничной атмосферы и проведения программы.",
    price: "По запросу",
    category: "Развлечения и Ведущие",
    icon: Mic2,
  },
  {
    id: "SVC009",
    name: "Мобилограф / Различная видеосъемка",
    description: "Съемка мероприятий, социальных роликов, обзоров. Качественная видеофиксация ваших моментов.",
    price: "По запросу",
    category: "Фото и Видео Услуги",
    icon: Video,
  },
  {
    id: "SVC010",
    name: "Фотограф / Моментальное фото",
    description: "Услуги профессионального фотографа, моментальная печать фотографий на мероприятии.",
    price: "По запросу",
    category: "Фото и Видео Услуги",
    icon: Aperture,
  },
  {
    id: "SVC011",
    name: "Изготовление электронных пригласительных",
    description: "Создание стильных и современных электронных пригласительных для вашего события.",
    price: "По запросу",
    category: "Специальные Услуги",
    icon: MailCheck,
  },
  {
    id: "SVC012",
    name: "Вокалистка / Певица",
    description: "Профессиональное вокальное исполнение с разнообразным репертуаром композиций.",
    price: "По запросу",
    category: "Развлечения и Ведущие",
    icon: UserRound,
  },
  {
    id: "SVC013",
    name: "Вывод невесты / Проводы невесты",
    description: "Организация и проведение традиционных и современных обрядов вывода и проводов невесты.",
    price: "По запросу",
    category: "Специальные Услуги",
    icon: Heart,
  },
  {
    id: "SVC014",
    name: "Установка и подключение звукового оборудования",
    description: "Профессиональная установка, настройка и подключение различного звукового оборудования.",
    price: "По запросу",
    category: "Техническое Обеспечение и Аренда",
    icon: Settings2,
  },
  {
    id: "SVC015",
    name: "Услуги программистов (создание сайтов)",
    description: "Разработка веб-сайтов для бизнеса или личного пользования, от лендингов до интернет-магазинов.",
    price: "По запросу",
    category: "Специальные Услуги",
    icon: CodeXml,
  },
  {
    id: "SVC016",
    name: "Аренда музыкальной аппаратуры / DJ контроллера",
    description: "Предоставление в аренду профессиональной музыкальной аппаратуры и DJ-контроллеров.",
    price: "По запросу",
    category: "Техническое Обеспечение и Аренда",
    icon: Headphones,
  },
  {
    id: "SVC017",
    name: "Проведение и оформление мероприятий",
    description: "Комплексное проведение и тематическое оформление свадеб, дней рождения, выпускных, открытий, юбилеев и различных мероприятий.",
    price: "По запросу",
    category: "Организация мероприятий",
    icon: WandSparkles,
  },
  {
    id: "SVC018",
    name: "Музыкальное сопровождение мероприятия",
    description: "Полное музыкальное сопровождение вашего мероприятия, включая DJ-сеты или живую музыку.",
    price: "По запросу",
    category: "Развлечения и Ведущие",
    icon: Music4,
  },
];

export default function PricelistPage() {
  const services = mockServices;
  const categories = Array.from(new Set(services.map(s => s.category))).sort();

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-3">Наши услуги и прайс-лист</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Творческая организация «N.Y_GROUP_PVL» рада ознакомить вас со своими услугами! 
          Откройте для себя спектр предложений, разработанных для того, чтобы ваше мероприятие было идеальным. 
          Цены являются ориентировочными и могут варьироваться в зависимости от конкретных требований.
        </p>
      </div>

      {categories.map(category => (
        <section key={category}>
          <h2 className="text-2xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent/50">{category}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.filter(s => s.category === category).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      ))}
      
      <section className="text-center mt-12 p-8 bg-secondary/50 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-primary mb-6">Дополнительная информация</h3>
        <div className="space-y-3 text-muted-foreground max-w-xl mx-auto">
          <p className="flex items-center justify-center gap-2">
            <Instagram className="h-5 w-5 text-accent" />
            <span>Действуют различные акции и конкурсы, с которыми можно ознакомиться на нашей instagram странице: <a href="https://instagram.com/n.y_group_pvl" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">@n.y_group_pvl</a></span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            <span>Наша главная фишка работы - индивидуальный подход к каждому клиенту.</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            <span>г.Павлодар, также выезжаем по области.</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <MessageCircle className="h-5 w-5 text-accent" />
            <span>Свяжитесь с нами по номеру WhatsApp: <a href="https://wa.me/77066857182" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">8-706-685-7182</a> (наш менеджер с радостью вас проконсультирует).</span>
          </p>
        </div>
      </section>

      <section className="text-center mt-12 p-8 bg-background rounded-lg border border-border">
        <h3 className="text-2xl font-semibold text-primary mb-4">Готовы спланировать ваше мероприятие?</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Свяжитесь с нами для индивидуальной консультации и расчета стоимости. Мы рады помочь вам создать незабываемые впечатления.
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/new-order">Получить индивидуальный расчет</Link>
        </Button>
      </section>
    </div>
  );
}
