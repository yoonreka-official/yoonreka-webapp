import { css } from '@emotion/react'
import { useState } from 'react'

import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import ButtonSecondary from '~/components/buttons/ButtonSecondary.tsx'
import Flex from '~/components/display/Flex.tsx'
import BottomSheet from '~/components/modals/BottomSheet.tsx'
import Body from '~/components/typography/Body.tsx'
import { COLORS } from '~/configs/theme.ts'

import type { BottomSheetProps } from '~/components/modals/BottomSheet.tsx'

export interface DialogMessageProps extends Omit<BottomSheetProps, 'open'> {
  danger?: boolean
  onConfirm?: () => void
  onClose?: () => void
}

function DialogConfirm({
  children,
  danger,
  onConfirm,
  onClose,
  ...props
}: DialogMessageProps) {
  const [open, setOpen] = useState(true)

  const handleClose = (isConfirm?: boolean) => {
    setOpen(false)
    setTimeout(() => {
      if (isConfirm) {
        onConfirm?.()
      } else {
        onClose?.()
      }
    }, 100)
  }

  return (
    <BottomSheet
      open={open}
      rootClassName="dialog"
      {...props}
      footer={
        <Flex css={styles.footer} gap={8}>
          <ButtonPrimary
            css={[styles.button, danger && styles.danger]}
            onClick={() => {
              handleClose(true)
            }}
          >
            확인
          </ButtonPrimary>
          <ButtonSecondary
            css={styles.button}
            style={{ height: 50 }}
            onClick={() => {
              handleClose()
            }}
          >
            취소
          </ButtonSecondary>
        </Flex>
      }
      onClose={() => {
        handleClose()
      }}
    >
      <Body color={COLORS.FONT['70']} size={14}>
        {children}
      </Body>
    </BottomSheet>
  )
}

const styles = {
  footer: css`
    flex-shrink: 0;
    padding-top: 32px;
  `,

  button: css`
    flex: 1;
    border-radius: 12px;
    height: 52px;

    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 137.5% */
    letter-spacing: -0.2px;
  `,

  danger: css`
    background: ${COLORS.STATUS['01']};
    border-color: ${COLORS.STATUS['01']};
  `,
}

export default DialogConfirm
