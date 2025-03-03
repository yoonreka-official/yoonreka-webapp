import { Input } from 'antd';
import isInt from 'validator/es/lib/isInt';

import { textInputStyle } from '~/components/inputs/InputText.tsx';

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
  '.',
];

export interface InputNumericProps
  extends Omit<InputProps, 'size' | 'status' | 'inputMode' | 'onChange'> {
  onChange?: (value?: number) => void;
}

function InputNumeric({ onKeyDown, onChange, ...props }: InputNumericProps) {
  return (
    <Input
      css={textInputStyle}
      inputMode="decimal"
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
        }

        onKeyDown?.(event);
      }}
      {...props}
    />
  );
}

export default InputNumeric;
