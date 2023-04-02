import React, { useEffect, useState } from 'react';
import { MoneyInputMask } from '../../components/input-masks/MoneyInputMask';
import { StyledTextField } from './CurrencyInputContainer.style';
import { CurrencyCustomFormikFieldInterface } from './CurrencyInputContainterSchema';

const CurrencyCustomFormikField = ({
  values,
  setFieldValue,
  touched,
  errors,
  label,
  name,
  required,
}: CurrencyCustomFormikFieldInterface) => {
  const [valorWithoutMask, setValorWithoutMask] = useState(values[name]);

  const handleInputChange = (event: any) => {
    let valorWithoutMask: number | undefined = parseFloat(
      event.target.value.replace(/[\R\$' ']/g, '').replace(',', '.')
    );

    valorWithoutMask = isNaN(valorWithoutMask) ? undefined : valorWithoutMask;

    setValorWithoutMask(valorWithoutMask);
    setFieldValue(name, valorWithoutMask);
  };

  useEffect(() => {
    console.log(valorWithoutMask);
  });

  return (
    <StyledTextField
      label={label}
      name={name}
      required={required}
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      onChange={handleInputChange}
      value={valorWithoutMask}
      InputProps={{
        inputComponent: MoneyInputMask as any,
      }}
      variant="standard"
    />
  );
};

export { CurrencyCustomFormikField };
