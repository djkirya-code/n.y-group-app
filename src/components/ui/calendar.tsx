"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, type DateFormatter } from "react-day-picker"
import { ru } from 'date-fns/locale'; // Import Russian locale

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = ru, // Default to Russian locale
  ...props
}: CalendarProps) {

  const formatWeekdayName: DateFormatter = (date) => {
    // Short day name, e.g., "Пн"
    return locale.localize?.day(date.getDay(), { width: 'short' }) || '';
  };
  
  const formatCaption: DateFormatter = (date) => {
    // Full month name and year, e.g., "Январь 2023"
     const month = locale.localize?.month(date.getMonth(), { width: 'wide' }) || '';
     return `${month.charAt(0).toUpperCase() + month.slice(1)} ${date.getFullYear()}`;
  };


  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30", // Adjusted opacity for outside selected days
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className: c, ...p }) => (
          <ChevronLeft className={cn("h-4 w-4", c)} {...p} aria-label="Предыдущий месяц" />
        ),
        IconRight: ({ className: c, ...p }) => (
          <ChevronRight className={cn("h-4 w-4", c)} {...p} aria-label="Следующий месяц" />
        ),
      }}
      formatters={{ formatWeekdayName, formatCaption }}
      locale={locale}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
