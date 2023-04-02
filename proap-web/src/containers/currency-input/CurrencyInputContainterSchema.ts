import { SolicitationFormValues } from '../solicitation/SolicitationFormSchema';
import { FormikErrors, FormikTouched } from 'formik';

export interface CurrencyCustomFormikFieldInterface {
  values: SolicitationFormValues;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  touched: FormikTouched<SolicitationFormValues>;
  errors: FormikErrors<SolicitationFormValues>;
  label: string;
  name: keyof SolicitationFormValues;
  required: boolean;
}
