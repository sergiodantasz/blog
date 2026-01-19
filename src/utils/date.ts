import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDayMonth(date: Date) {
  return format(date, 'dd/MM', { locale: ptBR });
}
