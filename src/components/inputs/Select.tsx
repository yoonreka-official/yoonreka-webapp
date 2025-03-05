import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import IconArrowDown24 from '~/assets/svg/icon_arrow_down_24.svg?react';
import IconExpandRight24 from '~/assets/svg/icon_expand_right_24.svg?react';
import { useFormInstance } from '~/components/forms/FormBase.tsx';
import BottomSheet from '~/components/modals/BottomSheet.tsx';
import Body from '~/components/typography/Body.tsx';
import { COLORS } from '~/configs/theme.ts';

import type { SelectProps } from 'antd';

export interface SelectOption {
  label: string;
  value: string;
}

interface Props extends Omit<SelectProps, 'onChange'> {
  options?: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  value?: string;
  isInput?: boolean;
  onChange?: (value?: string, option?: SelectOption) => void;
}

function Select({
  id,
  className,
  options = [],
  defaultValue,
  value,
  placeholder = '선택하세요',
  isInput,
  onChange,
}: Props) {
  const form = useFormInstance();

  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<SelectOption | undefined>(
    options.find(option => option.value === defaultValue),
  );

  const setScroll = () => {
    const selectedElement = document.getElementById(
      `option-${selected?.value}`,
    );
    selectedElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setScroll();
  }, [isOpen]);

  useEffect(() => {
    if (!value) {
      // setSelected(undefined);
      return;
    }

    setSelected(options.find(option => option.value === value));
  }, [value, options]);

  useEffect(() => {
    console.log(form?.getFieldError(id));
  }, [form]);

  return (
    <>
      <button
        className={className}
        css={[
          styles.select,
          isInput && styles.inputStyle,
          isInput && isOpen && styles.open,
        ]}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {selected ? (
          <Body size={14} weight="semibold">
            {selected?.label}
          </Body>
        ) : (
          <Body color={COLORS.FONT['20']} size={14} weight="regular">
            {placeholder}
          </Body>
        )}

        <IconArrowDown24 height={20} width={20} />
      </button>

      <BottomSheet
        footer={null}
        open={isOpen}
        push={{ distance: 0 }}
        rootClassName="dialog"
        onClose={() => handleClose()}
        onConfirm={() => handleClose()}
      >
        <div css={styles.itemWrapper}>
          <ul>
            {options.map(option => (
              <li key={option.value}>
                <button
                  id={`option-${option.value}`}
                  css={[value === option.value && styles.selected]}
                  onClick={() => {
                    handleClose();
                    onChange?.(option.value, option);
                  }}
                >
                  {option.label}

                  <IconExpandRight24 />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </BottomSheet>
    </>
  );
}

const styles = {
  select: css`
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    gap: 4px;
    appearance: none;
    background: #fff;
    border: 1px solid #fff;
    line-height: 1;
    padding: 14px 16px;
    border-radius: 16px;
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);

    svg {
      path {
        stroke: ${COLORS.FONT['40']};
      }
    }
  `,
  open: css`
    border: 1px solid ${COLORS.POINT.PRIMARY};
    background: #fff;
  `,

  inputStyle: css`
    background: ${COLORS.BG.BACKGROUND};
    border: 1px solid ${COLORS.BG.BACKGROUND};
    box-shadow: none;
    border-radius: 12px;
    padding: 15px 16px;
  `,

  itemWrapper: css`
    position: relative;
    max-height: 311px;
    height: 100%;
    width: 100%;
    overflow-y: auto;

    ul {
      list-style: none;
    }

    li > button {
      display: flex;
      width: 100%;
      padding: 10px 12px;
      border-radius: 16px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      overflow: hidden;
      text-overflow: ellipsis;

      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px; /* 137.5% */
      letter-spacing: -0.2px;

      color: ${COLORS.FONT['90']};
    }
  `,

  selected: css`
    background: ${COLORS.BG.BACKGROUND_TEXT};
    color: ${COLORS.FONT['90']} !important;
    //font-weight: 600;
    border-radius: 8px;
  `,
};

export default Select;
