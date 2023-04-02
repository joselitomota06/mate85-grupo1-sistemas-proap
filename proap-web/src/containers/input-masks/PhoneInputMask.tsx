import { IMaskInput } from 'react-imask';
import * as React from 'react';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
}

const PhoneInputMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMask(props: any, ref: any) {
    const { onChange, value, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00) 00000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
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

export { PhoneInputMask };
