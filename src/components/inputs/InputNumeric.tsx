import { Input } from 'antd'
import isInt from 'validator/es/lib/isInt'

import IconClear20 from '~/assets/svg/icon_clear_20.svg?react'
import { useFormInstance } from '~/components/forms/FormBase.tsx'
import { clearIcon, textInputStyle } from '~/components/inputs/InputText.tsx'

import type { InputProps } from 'antd'

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
]

export interface InputNumericProps
  extends Omit<InputProps, 'size' | 'status' | 'inputMode' | 'onChange'> {
  onChange?: (value?: number) => void
}

function InputNumeric({
  id,
  value,
  allowClear = true,
  onKeyDown,
  onChange,
  ...props
}: InputNumericProps) {
  const form = useFormInstance()

  return (
    <Input
      value={value}
      css={textInputStyle}
      inputMode="numeric"
      pattern="[0-9]*"
      suffix={
        allowClear && typeof value !== 'undefined' && value !== '' ? (
          <IconClear20 css={clearIcon} onClick={() => form.resetFields([id])} />
        ) : undefined
      }
      type="tel"
      onChange={(e) => {
        if (!e.target.value) {
          onChange?.(undefined)
          return
        }

        if (Number.isNaN(Number(e.target.value))) {
          return
        }

        onChange?.(Number(e.target.value))
      }}
      onKeyDown={(event) => {
        if (ALLOW_KEYS.includes(event.key)) {
          console.log(1)
          return
        }

        if (!isInt(event.key)) {
          console.log(2)
          event.preventDefault()
          return
        }
        console.log(3)
        onKeyDown?.(event)
      }}
      {...props}
    />
  )
}

export default InputNumeric
