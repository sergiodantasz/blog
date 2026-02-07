import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatDayMonth(date: Date) {
  return format(date, 'dd/MM', { locale: enUS });
}

export function formatMonthDayYear(date: Date) {
  return format(date, 'MMMM do, yyyy', { locale: enUS });
}

export function formatDayMonthYear(date: Date) {
  return format(date, 'dd/MM/yyyy', { locale: enUS });
}
