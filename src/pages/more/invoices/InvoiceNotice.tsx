import { css } from '@emotion/react'
import useAuth from '~/hooks/useAuth'

import useInvoices from '~/hooks/useInvoices.ts'
import { InvoiceType } from '~/types/api'

function InvoiceNotice() {
  const {
    state: { isHighSchool },
  } = useAuth()

  const {
    state: { invoiceType },
  } = useInvoices()

  return (
    <div css={styles.noticeBox}>
      <h1 css={styles.title}>계좌이체 💡</h1>

      {invoiceType === InvoiceType.Lecture ? (
        <ul css={styles.content}>
          {isHighSchool ? (
            <li>고등부 문의: 메가스터디 중계 러셀 02) 6316-1010</li>
          ) : (
            <li>중등부: 신한은행 윤레카 ENLGISH 110-551-775941</li>
          )}
        </ul>
      ) : (
        <ul css={styles.content}>
          <li>신한은행 윤레카 ENLGISH 110-551-775941</li>
        </ul>
      )}
    </div>
  )
}

const styles = {
  noticeBox: css`
    display: flex;
    padding: 16px;
    margin-top: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;

    border-radius: 20px;
    border: 1.5px solid var(--Point-Primary, #388afd);
    background: var(--Font-00, #fff);
    /* card */
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);

    transition: all 0.4s ease-in-out;
  `,

  title: css`
    color: var(--Point-Primary, #388afd);
    /* Body/14/B */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.2px;
  `,

  content: css`
    list-style: none;
    color: var(--Font-60, #6f7b8c);
    /* Body/14/M */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.2px;
  `,
}

export default InvoiceNotice
