import * as yup from 'yup';

export interface BudgetFormValues {
  budget: number;
  year: number;
}

export const INITIAL_FORM_VALUES: BudgetFormValues = {
  budget: 0,
  year: new Date().getFullYear(),
};

export const budgetFormSchema = yup.object().shape({
  budget: yup
    .number()
    .required('Valor do orçamento é obrigatório')
    .positive('Valor do orçamento deve ser positivo')
    .min(1, 'Orçamento deve ser maior que zero'),
  year: yup
    .number()
    .required('Ano é obrigatório')
    .integer('Ano deve ser um número inteiro')
    .min(2000, 'Ano deve ser maior ou igual a 2000')
    .max(2100, 'Ano deve ser menor ou igual a 2100'),
});
