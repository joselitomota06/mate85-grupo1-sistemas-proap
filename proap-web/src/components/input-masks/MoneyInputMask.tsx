import { IMaskInput } from 'react-imask';
import * as React from 'react';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
}

const MoneyInputMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMask(props: any, ref: any) {
    const { onChange, value, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="R\$ 0[0][0][0][0]\,00"
        defaultValue={value}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export { MoneyInputMask };
