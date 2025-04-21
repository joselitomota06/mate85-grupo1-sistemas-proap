export const formatNumberToBRL = (value: number): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return 'R$ 0,00';
  }
  return `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
