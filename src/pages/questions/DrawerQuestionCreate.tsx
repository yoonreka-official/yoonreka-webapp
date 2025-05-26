import { css } from '@emotion/react'
import { Drawer } from 'antd'
import { useEffect } from 'react'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import Flex from '~/components/display/Flex.tsx'
import FormBase, {
  FormItem,
  useForm,
  useWatch,
} from '~/components/forms/FormBase.tsx'
import InputSegmented from '~/components/inputs/InputSegmented.tsx'
import InputText from '~/components/inputs/InputText.tsx'
import InputTextArea from '~/components/inputs/InputTextArea.tsx'
import Select from '~/components/inputs/Select.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import useQuestions from '~/hooks/useQuestions.ts'
import Container from '~/layouts/Container.tsx'
import { QuestionUser } from '~/types/question.type.ts'
import rules from '~/utils/rules.util.ts'

import type { DrawerProps } from 'antd'

import type { QuestionBody } from '~/types/question.type.ts'

interface Props extends Omit<DrawerProps, 'onClose'> {
  onClose?: () => void
}

const TYPES: Array<{ value: QuestionUser; label: string }> = [
  { value: QuestionUser.STUDENT, label: '학생이에요' },
  { value: QuestionUser.PARENT, label: '학무모예요' },
]

function DrawerQuestionCreate({ children, title, onClose, ...props }: Props) {
  const [form] = useForm<QuestionBody>()

  const type = useWatch('who', form)

  const {
    state: { authUser },
  } = useAuth()

  const {
    state: { selectedUserType, selectedLectureId },
    handleCreateQuestion,
  } = useQuestions()

  const handleClose = () => {
    onClose?.()
    form.resetFields()
  }

  useEffect(() => {
    // ? 질문하기 목록에서 선택한 사용자 유형 자동 선택 - 학생/학부모
    form.setFieldValue('who', selectedUserType)

    // ? 선택한 강의 자동선택
    if (selectedLectureId) {
      form.setFieldValue('lectureId', selectedLectureId)
    }
  }, [selectedUserType, selectedLectureId])

  return (
    <Drawer
      closable={false}
      css={styles.drawer}
      placement="right"
      push={{ distance: 0 }}
      rootClassName="drawerNotificationsRoot"
      width="100%"
      {...props}
      onClose={handleClose}
    >
      <header css={styles.header}>
        <div css={styles.titleBar}>
          <button onClick={() => handleClose()}>
            <IconExpandLeft24 />
          </button>
          <h1>질문하기</h1>
        </div>
      </header>

      <Container css={styles.container}>
        <FormBase
          form={form}
          initialValues={{
            who: QuestionUser.STUDENT,
          }}
          onFinish={async (values) => {
            await handleCreateQuestion(values)
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
              <FormItem name="who" rules={[rules.required]}>
                <InputSegmented options={TYPES} />
              </FormItem>

              <FormItem label="수업" name="lectureId" rules={[rules.required]}>
                <Select
                  placeholder="수강중인 수업을 선택해주세요."
                  options={authUser?.lectures.map((item) => ({
                    label: item.title,
                    value: item.id,
                  }))}
                  isInput
                />
              </FormItem>

              <FormItem label="제목" name="title" rules={[rules.required]}>
                <InputText placeholder="제목을 입력해주세요." />
              </FormItem>

              {type === QuestionUser.STUDENT && (
                <FormItem label="문제" name="bookInfo">
                  <InputText placeholder="문제집 이름, 페이지, 번호를 적어주세요. (없으면 빈칸)" />
                </FormItem>
              )}

              <FormItem
                label="내용"
                name="description"
                rules={[rules.required]}
              >
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
    background: #fff;
    z-index: 100;
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

export default DrawerQuestionCreate
