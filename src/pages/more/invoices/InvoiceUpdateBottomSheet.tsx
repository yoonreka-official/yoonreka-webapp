import { useEffect, useState } from 'react'

import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import Flex from '~/components/display/Flex.tsx'
import FormBase, { FormItem, useForm } from '~/components/forms/FormBase.tsx'
import InputSegmented from '~/components/inputs/InputSegmented.tsx'
import InputText from '~/components/inputs/InputText.tsx'
import BottomSheet from '~/components/modals/BottomSheet.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import { COLORS } from '~/configs/theme.ts'
import useInvoices from '~/hooks/useInvoices.ts'
import { formatDate } from '~/utils/format.util.ts'
import rules from '~/utils/rules.util.ts'

import useAuth from '~/hooks/useAuth'
import { InvoiceMethod } from '~/types/api'
import type { InvoiceRequestBody } from '~/types/invoice.type.ts'

const MIDDLE_SCHOOL_INVOICE_METHODS: Array<{
  value: InvoiceMethod
  label: string
}> = [
  { value: InvoiceMethod.Card, label: '카드' },
  { value: InvoiceMethod.Transfer, label: '이체' },
  { value: InvoiceMethod.Seoulpay, label: '서울페이' },
]

const HIGHT_SCHOOL_INVOICE_METHODS: Array<{
  value: InvoiceMethod
  label: string
}> = [
  { value: InvoiceMethod.Megastudy, label: '메가스터디\n사이트 결제' },
  { value: InvoiceMethod.Visit, label: '방문 결제' },
  { value: InvoiceMethod.DayPay, label: '당일 결제' },
]

function InvoiceUpdateBottomSheet() {
  const {
    state: { isHighSchool },
  } = useAuth()
  const {
    state: { selected },
    handleUpdateInvoice,
    handleSelectedInvoice,
  } = useInvoices()

  const [form] = useForm<InvoiceRequestBody>()

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      handleSelectedInvoice(undefined)
      form.resetFields()
    }, 10)
  }

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({ lectureInvoiceId: selected.id })
      setIsOpen(true)
    }
  }, [selected, form])

  return (
    <BottomSheet
      title="납부 완료"
      footer={null}
      open={isOpen}
      rootClassName="autoHeight"
      onClose={() => handleClose()}
    >
      <Flex direction="column" gap={4} style={{ marginBottom: 20 }}>
        <Body color={COLORS.FONT['80']} size={16} weight="semibold">
          {selected?.lecture?.title} /{' '}
          {selected ? formatDate(selected?.dueDate, 'M월 D일') : null} 건
          납부하셨나요?
        </Body>

        <Caption color={COLORS.BG['04']} size={12} weight="medium">
          [완료]는 납부 완료 후 선택해주세요.
          <br />
          납부 확인까지 영업일 기준 평균 4~5일 소요돼요.
        </Caption>
      </Flex>

      <FormBase
        form={form}
        initialValues={{
          method: isHighSchool ? InvoiceMethod.Megastudy : InvoiceMethod.Card,
        }}
        onFinish={async (values) => {
          await handleUpdateInvoice(values)
          handleClose()
        }}
      >
        <FormItem name="lectureInvoiceId" hidden>
          <InputText type="hidden" />
        </FormItem>

        <FormItem label="납부 방법" name="method" rules={[rules.required]}>
          <InputSegmented
            options={
              isHighSchool
                ? HIGHT_SCHOOL_INVOICE_METHODS
                : MIDDLE_SCHOOL_INVOICE_METHODS
            }
            isInput
          />
        </FormItem>

        <FormItem label="납부 메모" name="userMemo">
          <InputText />
        </FormItem>

        <Flex
          direction="column"
          gap={16}
          items="center"
          style={{ paddingBottom: 12 }}
        >
          <ButtonPrimary htmlType="submit">작성 완료</ButtonPrimary>
        </Flex>
      </FormBase>
    </BottomSheet>
  )
}

export default InvoiceUpdateBottomSheet
