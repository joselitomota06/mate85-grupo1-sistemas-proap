export const booleanToYesOrNo = (condition: boolean) =>
  condition ? 'Sim' : 'Não';

export const dateToLocalDate = (date: string) =>
  Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T00:00:00`));

export const localDateToDate = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};
