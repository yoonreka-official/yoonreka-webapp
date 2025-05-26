import { css } from '@emotion/react'

import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import Flex from '~/components/display/Flex.tsx'
import FormBase, { FormItem, useForm } from '~/components/forms/FormBase.tsx'
import Checkbox from '~/components/inputs/Checkbox.tsx'
import InputPassword from '~/components/inputs/InputPassword.tsx'
import InputText from '~/components/inputs/InputText.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import dialog from '~/utils/dialog.util.tsx'
import rules from '~/utils/rules.util.ts'

import type { LoginInput } from '~/types/auth.type.ts'

function LoginForm() {
  const [form] = useForm<LoginInput>()

  const { handleLogin } = useAuth()

  return (
    <FormBase form={form} onFinish={handleLogin}>
      <FormItem label="핸드폰 번호" name="phone" rules={[rules.required]}>
        <InputText />
      </FormItem>

      <FormItem label="비밀번호" name="password" rules={[rules.required]}>
        <InputPassword type="password" />
      </FormItem>

      <FormItem name="checked">
        <Checkbox>로그인 상태 유지</Checkbox>
      </FormItem>

      <Flex direction="column" gap={16} items="center">
        <ButtonPrimary htmlType="submit">로그인</ButtonPrimary>

        <button
          css={styles.signUp}
          type="button"
          onClick={() =>
            dialog.message({
              title: '회원가입',
              content: '선생님께 문의해주세요.',
            })
          }
        >
          회원이 아니신가요? <span>회원가입</span>
        </button>
      </Flex>
    </FormBase>
  )
}

const styles = {
  signUp: css`
    color: ${COLORS.FONT['30']};
    text-align: center;
    /* Caption/12/M */
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;

    span {
      color: ${COLORS.POINT.PRIMARY};
    }
  `,
}

export default LoginForm
