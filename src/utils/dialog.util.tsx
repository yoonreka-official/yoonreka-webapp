import ReactDOM from 'react-dom/client'

import DialogConfirm from '~/components/modals/DialogConfirm.tsx'
import DialogMessage from '~/components/modals/DialogMessage.tsx'

import type { ReactNode } from 'react'
import type { Root } from 'react-dom/client'

import type { BottomSheetProps } from '~/components/modals/BottomSheet.tsx'
import type { DialogMessageProps } from '~/components/modals/DialogConfirm.tsx'

export const DIALOG_DOM_ID = '__dialog__'

const message = ({
  title,
  content,
  confirmLabel,
}: Omit<BottomSheetProps, 'children'> & {
  content: ReactNode
}): Promise<void> => {
  const place = document.getElementById(DIALOG_DOM_ID)

  let dialogResolver: (() => void) | null = null

  const open = () => {
    if (place) {
      const root = ReactDOM.createRoot(place)
      root.render(
        <DialogMessage
          title={title}
          confirmLabel={confirmLabel}
          onConfirm={() => handleClose(root)}
        >
          {content}
        </DialogMessage>,
      )
    }

    return new Promise<void>((resolve) => {
      dialogResolver = resolve
    })
  }

  const handleClose = (root: Root) => {
    root.unmount()

    if (dialogResolver) {
      dialogResolver()
    }
  }

  return open()
}

const confirm = ({
  title,
  content,
  danger,
}: Omit<DialogMessageProps, 'children'> & {
  content: ReactNode
  danger?: boolean
}) => {
  const place = document.getElementById(DIALOG_DOM_ID)

  let confirmResolver: ((value: boolean) => void) | null = null

  const open = () => {
    if (place) {
      const root = ReactDOM.createRoot(place)
      root.render(
        <DialogConfirm
          title={title}
          danger={danger}
          onClose={() => handleCancel(root)}
          onConfirm={() => handleConfirm(root)}
        >
          {content}
        </DialogConfirm>,
      )
    }

    return new Promise<boolean>((resolve) => {
      confirmResolver = resolve
    })
  }

  const handleClose = (root: Root) => {
    root.unmount()
  }

  const handleConfirm = (root: Root) => {
    if (confirmResolver) {
      confirmResolver(true)
    }
    handleClose(root)
  }

  const handleCancel = (root: Root) => {
    if (confirmResolver) {
      confirmResolver(false)
    }
    handleClose(root)
  }

  return open()
}

const dialog = { message, confirm }

export default dialog
