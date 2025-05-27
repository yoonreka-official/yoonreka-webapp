import { css } from '@emotion/react'

import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import Flex from '~/components/display/Flex'
import StatusTag from '~/components/utils/StatusTag.tsx'
import useInvoices from '~/hooks/useInvoices.ts'
import { InvoiceState } from '~/types/invoice.type.ts'
import { formatDate, formatNumber } from '~/utils/format.util.ts'

import type { Invoice } from '~/types/invoice.type.ts'
import { InvoiceType } from '~/types/api'

interface Props {
  invoice: Invoice
}

const renderStatus = (state: InvoiceState) => {
  switch (state) {
    case InvoiceState.PAID:
      return <StatusTag status="info">납부 완료</StatusTag>
    case InvoiceState.PENDING:
      return <StatusTag status="default">납부 확인중</StatusTag>
    case InvoiceState.FAILED:
    default:
      return <StatusTag status="danger">미납</StatusTag>
  }
}

const getPriceLabel = (type: InvoiceType) => {
  switch (type) {
    case InvoiceType.Book:
      return '교재비'
    case InvoiceType.Lecture:
    default:
      return '월 회비'
  }
}

function InvoiceCard({ invoice }: Props) {
  const { handleSelectedInvoice } = useInvoices()

  return (
    <div css={styles.card}>
      <Flex items="center" justify="space-between" style={{ width: '100%' }}>
        <h1 css={styles.title}>{invoice.lecture?.title}</h1>

        {renderStatus(invoice.state)}
      </Flex>

      <ul css={styles.info}>
        {invoice.state === InvoiceState.FAILED && (
          <li>예정일: {formatDate(invoice.dueDate, 'YYYY.MM.DD')}</li>
        )}
        <li>
          {getPriceLabel(invoice.type)}: {formatNumber(invoice.price)}원
        </li>
      </ul>

      {invoice.state === InvoiceState.FAILED && (
        <ButtonPrimary
          css={styles.button}
          size="small"
          onClick={() => handleSelectedInvoice(invoice)}
        >
          납부 완료
        </ButtonPrimary>
      )}
    </div>
  )
}

const styles = {
  card: css`
    padding: 16px;
    margin-top: 8px;

    border-radius: 16px;
    background: var(--Font-00, #fff);
    /* card */
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
  `,

  title: css`
    overflow: hidden;
    color: var(--Font-90, #191a1c);
    text-overflow: ellipsis;
    /* Body/14/B */
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.2px;
  `,

  info: css`
    list-style: none;
    color: var(--Font-60, #6f7b8c);
    /* Caption/12/M */
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 150% */
    letter-spacing: -0.2px;

    li {
      margin-top: 4px;
    }
  `,

  button: css`
    margin-top: 12px;
  `,
}

export default InvoiceCard
