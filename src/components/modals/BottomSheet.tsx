import { css } from '@emotion/react';
import { Drawer } from 'antd';

import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx';
import Body from '~/components/typography/Body.tsx';
import { COLORS } from '~/configs/theme.ts';

import type { DrawerProps } from 'antd';
import type { ReactNode } from 'react';

export interface BottomSheetProps
  extends Omit<DrawerProps, 'placement' | 'onClose'> {
  confirmLabel?: string;
  footer?: ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}

function BottomSheet({
  children,
  title,
  footer,
  confirmLabel,
  rootClassName,
  onClose,
  onConfirm,
  ...props
}: BottomSheetProps) {
  return (
    <Drawer
      closable={false}
      css={styles.bottomSheet}
      placement="bottom"
      rootClassName={['bottomSheetRoot', rootClassName].join(' ')}
      {...props}
      onClose={onClose}
    >
      <header css={styles.header}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          css={styles.handleButton}
          onClick={() => onClose?.()}
          onTouchMove={() => onClose?.()}
        >
          <span css={styles.handle} />
        </button>

        {title && (
          <div>
            <Body size={18} weight="bold">
              {title}
            </Body>
          </div>
        )}
      </header>

      <div className="autoHeightBody" css={styles.body}>
        {children}
      </div>

      {typeof footer === 'undefined' ? (
        <footer css={styles.footer}>
          <ButtonPrimary onClick={() => onConfirm?.()}>확인</ButtonPrimary>
        </footer>
      ) : (
        footer
      )}
    </Drawer>
  );
}

const styles = {
  bottomSheet: css`
    border-radius: 16px;
  `,

  header: css`
    padding-bottom: 4px;
  `,

  handleButton: css`
    flex-shrink: 0;
    padding: 10px 0;
    margin-bottom: 24px;
    display: block;
    width: 100%;
    appearance: none;
    border: none;
    background: none;
  `,

  handle: css`
    width: 64px;
    height: 4px;
    border-radius: 4px;
    background: ${COLORS.BG['03']};
    margin: 0 auto;
    display: block;
  `,

  body: css`
    height: 100%;
    max-height: 311px;
    overflow-y: hidden;
  `,

  footer: css`
    flex-shrink: 0;
    padding-top: 32px;
  `,
};

export default BottomSheet;
