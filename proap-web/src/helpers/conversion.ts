export const booleanToYesOrNo = (condition: boolean) =>
  condition ? "Sim" : "Não";

export const dateToLocalDate = (date: Date) =>
  Intl.DateTimeFormat("pt-BR").format(date);

export const localDateToDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};
