export const booleanToYesOrNo = (condition: boolean) =>
  condition ? 'Sim' : 'Não'

export const dateToLocalDate = (date: Date) =>
  Intl.DateTimeFormat('pt-BR').format(date)
