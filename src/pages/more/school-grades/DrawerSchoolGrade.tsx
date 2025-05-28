import { css } from '@emotion/react'
import { Drawer } from 'antd'
import { useEffect } from 'react'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import Flex from '~/components/display/Flex.tsx'
import FormBase, { FormItem, useForm } from '~/components/forms/FormBase.tsx'
import InputFile from '~/components/inputs/InputFile.tsx'
import InputNumeric from '~/components/inputs/InputNumeric.tsx'
import Select from '~/components/inputs/Select.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import useSchoolGrades from '~/hooks/useSchoolGrades.ts'
import Container from '~/layouts/Container.tsx'
import SelectSchool from '~/pages/more/school-grades/SelectSchool.tsx'
import {
  type SchoolGradeBody,
  SchoolGradeType,
} from '~/types/school-grades.type.ts'
import rules from '~/utils/rules.util.ts'

import type { DrawerProps } from 'antd'

interface Props extends Omit<DrawerProps, 'onClose'> {
  onClose?: () => void
}

const TYPES: Array<{ value: SchoolGradeType; label: string }> = [
  { value: SchoolGradeType.MIDTERM, label: '중간고사' },
  { value: SchoolGradeType.FINAL, label: '기말고사' },
  { value: SchoolGradeType.MOCK, label: '모의고사' },
]

function DrawerSchoolGrade({ children, title, onClose, ...props }: Props) {
  const [form] = useForm<SchoolGradeBody>()

  const {
    state: { selected },
    handleCreate,
    handleUpdate,
    handleSelected,
  } = useSchoolGrades()

  const handleClose = () => {
    onClose?.()
    form.resetFields()
    handleSelected(undefined)
  }

  useEffect(() => {
    if (selected) {
      const { attachment, school, ...values } = selected
      form.setFieldsValue({ ...values })
    }
  }, [selected])

  return (
    <Drawer
      getContainer={false}
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
          <h1>성적 등록</h1>
        </div>
      </header>

      <Container css={styles.container}>
        <FormBase
          form={form}
          initialValues={{}}
          onFinish={async (values) => {
            if (selected) {
              await handleUpdate({ id: selected.id, ...values })
            } else {
              await handleCreate(values)
            }

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
              <FormItem label="학교" name="schoolId" rules={[rules.required]}>
                <SelectSchool
                  placeholder="학교명을 입력해주세요.(ex.청원고등학교)"
                  school={selected?.school}
                />
              </FormItem>

              <Flex gap={8}>
                <FormItem
                  label="학년"
                  name="grade"
                  css={styles.formItem}
                  rules={[rules.required]}
                >
                  <InputNumeric placeholder="학년" />
                </FormItem>

                <FormItem
                  label="학기"
                  name="term"
                  css={styles.formItem}
                  rules={[rules.required]}
                >
                  <InputNumeric placeholder="학기" />
                </FormItem>
              </Flex>

              <FormItem label="종류" name="type" rules={[rules.required]}>
                <Select
                  placeholder="종류를 선택해주세요"
                  options={TYPES}
                  isInput
                />
              </FormItem>

              <Flex gap={8}>
                <FormItem
                  label="등급"
                  name="level"
                  css={styles.formItem}
                  rules={[rules.required]}
                >
                  <InputNumeric placeholder="단위: 등급" />
                </FormItem>

                <FormItem
                  label="점수"
                  name="score"
                  css={styles.formItem}
                  rules={[rules.required]}
                >
                  <InputNumeric placeholder="단위: 점" />
                </FormItem>

                <FormItem
                  label="백분위"
                  name="percentage"
                  css={styles.formItem}
                >
                  <InputNumeric placeholder="단위: %" />
                </FormItem>
              </Flex>

              <Flex gap={8}>
                <FormItem
                  label="석차"
                  name="rank"
                  css={styles.formItem}
                  rules={[rules.required]}
                >
                  <InputNumeric placeholder="자신의 등수" />
                </FormItem>

                <FormItem
                  label=" "
                  name="totalCount"
                  css={styles.formItem}
                  required={false}
                  rules={[rules.required]}
                >
                  <InputNumeric placeholder="전체 인원수" />
                </FormItem>
              </Flex>

              <FormItem
                label="성적표 이미지"
                name="fileId"
                rules={[rules.required]}
              >
                <InputFile
                  placeholder="PNG 또는 JPG만 업로드 가능해요."
                  accept="image/png, image/jpeg"
                  attachment={selected?.attachment}
                />
              </FormItem>

              <Caption
                color={COLORS.BG['04']}
                css={css`
                  margin-top: -24px;
                `}
                size={12}
                weight="medium"
              >
                *성적표 이미지는 리로스쿨 or 종이성적표 사진을 첨부해 주세요.
              </Caption>
            </section>

            <Flex
              direction="column"
              gap={16}
              items="center"
              style={{ paddingBottom: 12 }}
            >
              <ButtonPrimary htmlType="submit">
                {selected ? '수정 완료' : '작성하기'}
              </ButtonPrimary>
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

  formItem: css`
    flex: 1;
  `,
}

export default DrawerSchoolGrade
