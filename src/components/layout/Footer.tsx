export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} N.Y_GROUP_PVL. Все права защищены.</p>
        <p className="mt-1">Ваш главный партнер по планированию мероприятий.</p>
      </div>
    </footer>
  );
}
