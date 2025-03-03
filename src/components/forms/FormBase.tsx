import { css } from '@emotion/react';
import { Form } from 'antd';

import IconInput20 from '~/assets/svg/icon_input_20.svg?react';
import { COLORS } from '~/configs/theme.ts';

import type { FormItemProps, FormProps } from 'antd';
import type { ReactNode } from 'react';

export interface BaseFormProps<FormValues>
  extends Omit<FormProps<FormValues>, 'children'> {
  children?: ReactNode;
}

function FormBase<FormValues>({
  children,
  colon = false,
  layout = 'vertical',
  ...props
}: BaseFormProps<FormValues>) {
  return (
    <Form
      colon={colon}
      feedbackIcons={() => ({
        error: <IconInput20 />,
        // eslint-disable-next-line react/jsx-no-useless-fragment
        warning: <></>,
        // eslint-disable-next-line react/jsx-no-useless-fragment
        success: <></>,
      })}
      layout={layout}
      {...props}
    >
      {children}
    </Form>
  );
}

export function FormItem({ children, ...props }: FormItemProps) {
  return (
    <Form.Item css={formItemStyle} hasFeedback {...props}>
      {children}
    </Form.Item>
  );
}

const formItemStyle = css`
  //background: red;

  .ant-form-item-label > label {
    color: ${COLORS.FONT['90']};
    /* Caption/12/B */
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;
    padding-left: 8px;

    &.ant-form-item-required:not(
        .ant-form-item-required-mark-optional
      )::before {
      color: ${COLORS.POINT.PRIMARY};

      position: absolute;
      right: 1px;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 142.857% */
      letter-spacing: -0.2px;
    }
  }

  .ant-form-item-explain-error {
    padding-left: 8px;
    color: ${COLORS.TAG.RED};
    /* Caption/12/SB */
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;
  }
`;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const { useForm, useWatch, useFormInstance } = Form;
export default FormBase;
