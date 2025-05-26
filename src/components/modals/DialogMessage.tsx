import { useState } from 'react'

import BottomSheet from '~/components/modals/BottomSheet.tsx'
import Body from '~/components/typography/Body.tsx'
import { COLORS } from '~/configs/theme.ts'

import type { BottomSheetProps } from '~/components/modals/BottomSheet.tsx'

export interface DialogMessageProps extends Omit<BottomSheetProps, 'open'> {
  onConfirm?: () => void
}

function DialogMessage({ children, onConfirm, ...props }: DialogMessageProps) {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      onConfirm?.()
    }, 400)
  }

  return (
    <BottomSheet
      open={open}
      rootClassName="dialog"
      {...props}
      onClose={handleClose}
      onConfirm={handleClose}
    >
      <Body color={COLORS.FONT['70']} size={14}>
        {children}
      </Body>
    </BottomSheet>
  )
}

export default DialogMessage
