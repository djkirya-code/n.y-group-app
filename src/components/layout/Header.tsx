
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { signOutUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/icons/Logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UserCircle, LogOut, ListOrdered, HomeIcon, Info, CalendarPlus, ShieldCheck } from "lucide-react"; // Added ShieldCheck for Admin
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


const navLinks = [
  { href: "/", label: "Главная", icon: HomeIcon, protected: false },
  { href: "/pricelist", label: "Прайс-лист", icon: Info, protected: false },
  { href: "/my-orders", label: "Мои заказы", icon: ListOrdered, protected: true },
  { href: "/new-order", label: "Новый заказ", icon: CalendarPlus, protected: true },
];

export function Header() {
  const { user, isAuthenticated, isAdmin } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push("/"); // Redirect to home page after sign out
    } catch (error) {
      console.error("Sign out error", error);
      // Optionally, show an error toast
    }
  };

  const NavLinksContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => {
        if (link.protected && !isAuthenticated) return null;
        return (
          <Button
            key={link.href}
            variant="ghost"
            asChild
            className={cn(
              "justify-start text-sm font-medium",
              pathname === link.href ? "bg-accent text-accent-foreground" : "hover:bg-accent/80",
              isMobile ? "w-full text-left py-3 px-4" : ""
            )}
          >
            <Link href={link.href} className="flex items-center gap-2">
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLinksContent />
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "Пользователь"} />
                    <AvatarFallback>{user.email?.[0].toUpperCase() || 'П'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{user.displayName || "Пользователь"}</p>
                      {isAdmin && <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0.5 bg-primary/10 text-primary">Админ</Badge>}
                    </div>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span>Панель Админа</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => router.push('/my-orders')}>
                  <ListOrdered className="mr-2 h-4 w-4" />
                  <span>Мои заказы</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/auth/signin">Войти</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/auth/signup">Регистрация</Link>
              </Button>
            </div>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                    <SheetHeader className="p-6 border-b">
                        <SheetTitle className="sr-only">Главное меню</SheetTitle>
                        <Link href="/" className="flex items-center gap-2">
                            <Logo className="h-8 w-auto" />
                        </Link>
                    </SheetHeader>
                    <nav className="flex-grow p-6 flex flex-col gap-2">
                        <NavLinksContent isMobile />
                    </nav>
                    {!isAuthenticated && (
                         <div className="p-6 border-t flex flex-col gap-2">
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/auth/signin">Войти</Link>
                            </Button>
                            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                                <Link href="/auth/signup">Регистрация</Link>
                            </Button>
                        </div>
                    )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

