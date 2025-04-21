import { format, parse } from 'date-fns';

export const booleanToYesOrNo = (condition: boolean) =>
  condition ? 'Sim' : 'Não';

export const dateToLocalDate = (date: string) => {
  return Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T00:00:00`));
};

export const localDateToDate = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

export const formatDateToAPI = (dateStr: string): string | undefined => {
  if (!dateStr) return undefined;
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const date = parse(dateStr, 'yyyy-MM-dd', new Date());
      return format(date, 'dd-MM-yyyy');
    } else {
      const date = parse(dateStr, 'dd/MM/yyyy', new Date());
      return format(date, 'dd-MM-yyyy');
    }
  } catch (e) {
    console.error('Error formatting date:', e);
    return undefined;
  }
};
