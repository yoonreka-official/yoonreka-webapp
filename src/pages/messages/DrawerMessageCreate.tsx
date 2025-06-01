import { css } from '@emotion/react'
import { Drawer, type DrawerProps } from 'antd'
import { useCallback } from 'react'
import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import FormBase from '~/components/forms/FormBase'
import { COLORS } from '~/configs/theme'

import { useMutation } from '@apollo/client'
import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import Flex from '~/components/display/Flex.tsx'
import { FormItem, useForm } from '~/components/forms/FormBase.tsx'
import InputTextArea from '~/components/inputs/InputTextArea.tsx'
import Container from '~/layouts/Container'
import { CreateUserChatDocument } from '~/types/api'
import rules from '~/utils/rules.util.ts'

export interface FormDataMessage {
  message: string
}

export interface DrawerMessageCreateProps extends Omit<DrawerProps, 'onClose'> {
  onClose?: () => void
}

export function DrawerMessageCreate({
  open,
  onClose,
  ...props
}: DrawerMessageCreateProps) {
  const [createUserChat] = useMutation(CreateUserChatDocument)
  const [form] = useForm<FormDataMessage>()

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const handleCreateMessage = useCallback(async (values: FormDataMessage) => {
    await createUserChat({
      variables: {
        input: {
          message: values.message,
        },
      },
    })
    form.resetFields()
  }, [])

  return (
    <Drawer
      getContainer={false}
      closable={false}
      css={styles.drawer}
      open={open}
      placement="right"
      push={{ distance: 0 }}
      rootClassName="drawerNotificationsRoot"
      width="100%"
      {...props}
      onClose={() => handleClose()}
    >
      <header css={styles.header}>
        <div css={styles.titleBar}>
          <button onClick={() => handleClose()}>
            <IconExpandLeft24 />
          </button>
          <h1>메시지 작성</h1>
        </div>
      </header>

      <Container css={styles.container}>
        <FormBase
          form={form}
          initialValues={{}}
          onFinish={async (values) => {
            await handleCreateMessage(values)
            handleClose()
          }}
        >
          <Flex
            direction="column"
            gap={16}
            justify="space-between"
            style={{ minHeight: 'calc(100vh - 76px)' }}
          >
            <section>
              <FormItem label="내용" name="message" rules={[rules.required]}>
                <InputTextArea
                  placeholder={
                    '내용을 입력해 주세요.\n*현재 화면에서는 작성 중인 내용이 자동 저장되지 않습니다. 긴 문장은 다른 곳에서 작성 후 복사해 주세요.'
                  }
                />
              </FormItem>
            </section>

            <Flex
              direction="column"
              gap={16}
              items="center"
              style={{ paddingBottom: 12 }}
            >
              <ButtonPrimary htmlType="submit">작성 완료</ButtonPrimary>
            </Flex>
          </Flex>
        </FormBase>
      </Container>
    </Drawer>
  )
}

const styles = {
  drawer: css`
    position: relative;

    .ant-drawer-body {
      padding: 0;
      background: ${COLORS.BG.BACKGROUND};
    }
  `,

  header: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  `,

  titleBar: css`
    display: flex;
    align-items: center;
    padding: 15px 14px;
    background: #fff;

    button {
      display: flex;
    }

    h1 {
      color: #111827;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 26px; /* 130% */
      letter-spacing: -0.5px;
    }
  `,

  container: css`
    padding: 64px 14px 12px;
    background: #fff;
  `,
}
