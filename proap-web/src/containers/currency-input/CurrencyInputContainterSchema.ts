import { SolicitationFormValues } from '../solicitation/SolicitationFormSchema';

export interface CurrencyCustomFormikFieldInterface {
  values: SolicitationFormValues;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  label: string;
  name: keyof SolicitationFormValues;
  required: boolean;
}
