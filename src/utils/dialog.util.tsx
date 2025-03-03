import ReactDOM from 'react-dom/client';

import DialogMessage from '~/components/modals/DialogMessage.tsx';

import type { ReactNode } from 'react';
import type { Root } from 'react-dom/client';

import type { BottomSheetProps } from '~/components/modals/BottomSheet.tsx';

export const DIALOG_DOM_ID = '__dialog__';

const message = ({
  title,
  content,
  confirmLabel,
}: Omit<BottomSheetProps, 'children'> & {
  content: ReactNode;
}): Promise<void> => {
  const place = document.getElementById(DIALOG_DOM_ID);

  let dialogResolver: (() => void) | null = null;

  const open = () => {
    if (place) {
      const root = ReactDOM.createRoot(place);
      root.render(
        <DialogMessage
          title={title}
          confirmLabel={confirmLabel}
          onConfirm={() => handleClose(root)}
        >
          {content}
        </DialogMessage>,
      );
    }

    return new Promise<void>(resolve => {
      dialogResolver = resolve;
    });
  };

  const handleClose = (root: Root) => {
    root.unmount();

    if (dialogResolver) {
      dialogResolver();
    }
  };

  return open();
};

// const confirm = ({
//   title,
//   content,
//   confirmLabel,
//   cancelLabel,
// }: Omit<ConfirmProps, 'children'> & { content: React.ReactNode }) => {
//   const place = document.getElementById(DIALOG_DOM_ID);
//
//   let confirmResolver: ((value: boolean) => void) | null = null;
//
//   const open = () => {
//     if (place) {
//       const root = ReactDOM.createRoot(place);
//       root.render(
//         <ConfirmDialog
//           title={title}
//           cancelLabel={cancelLabel}
//           confirmLabel={confirmLabel}
//           onCancel={() => handleCancel(root)}
//           onConfirm={() => handleConfirm(root)}
//         >
//           <Body>{content}</Body>
//         </ConfirmDialog>,
//       );
//     }
//
//     return new Promise<boolean>(resolve => {
//       confirmResolver = resolve;
//     });
//   };
//
//   const handleClose = (root: Root) => {
//     root.unmount();
//   };
//
//   const handleConfirm = (root: Root) => {
//     if (confirmResolver) {
//       confirmResolver(true);
//     }
//     handleClose(root);
//   };
//
//   const handleCancel = (root: Root) => {
//     if (confirmResolver) {
//       confirmResolver(false);
//     }
//     handleClose(root);
//   };
//
//   return open();
// };

const dialog = { message };

export default dialog;
