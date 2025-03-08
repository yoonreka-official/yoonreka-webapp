import { Input } from 'antd';
import isInt from 'validator/es/lib/isInt';

import IconClear20 from '~/assets/svg/icon_clear_20.svg?react';
import { useFormInstance } from '~/components/forms/FormBase.tsx';
import { clearIcon, textInputStyle } from '~/components/inputs/InputText.tsx';

import type { InputProps } from 'antd';

const ALLOW_KEYS = [
  'Backspace',
  'Tab',
  'Shift',
  'Enter',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Control',
  'Meta',
  // '.',
];

export interface InputNumericProps
  extends Omit<InputProps, 'size' | 'status' | 'inputMode' | 'onChange'> {
  onChange?: (value?: number) => void;
}

function InputNumeric({
  id,
  value,
  allowClear = true,
  onKeyDown,
  onChange,
  ...props
}: InputNumericProps) {
  const form = useFormInstance();

  return (
    <Input
      value={value}
      css={textInputStyle}
      inputMode="decimal"
      suffix={
        allowClear && value ? (
          <IconClear20 css={clearIcon} onClick={() => form.resetFields([id])} />
        ) : undefined
      }
      onChange={e => {
        if (!e.target.value) {
          onChange?.(undefined);
          return;
        }
        onChange?.(Number(e.target.value));
      }}
      onKeyDown={event => {
        if (ALLOW_KEYS.includes(event.key)) {
          return;
        }

        if (!isInt(event.key)) {
          event.preventDefault();
          return;
        }

        onKeyDown?.(event);
      }}
      {...props}
    />
  );
}

export default InputNumeric;
