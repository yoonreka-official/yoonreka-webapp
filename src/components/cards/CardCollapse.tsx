import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import IconArrowDown24 from '~/assets/svg/icon_arrow_down_24.svg?react';
import CardBase from '~/components/cards/CardBase.tsx';
import Flex from '~/components/display/Flex.tsx';
import Body from '~/components/typography/Body.tsx';
import { COLORS } from '~/configs/theme.ts';

import type { ReactNode } from 'react';

import type { CardBaseProps } from '~/components/cards/CardBase.tsx';

export interface CardCollapseProps extends CardBaseProps {
  id?: string;
  title?: ReactNode;
  value?: boolean;
  onChange?: (open: boolean) => void;
}

function CardCollapse({
  id,
  title,
  children,
  className,
  value,
  onChange,
}: CardCollapseProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
    onChange?.(!open);
  };

  useEffect(() => {
    if (value) {
      setOpen(value);
    }

    return () => {
      setOpen(false);
    };
  }, [value]);

  return (
    <CardBase id={id} className={className} css={styles.cardCollapse}>
      <header css={styles.header} onClick={() => toggle()}>
        <Flex gap={4} items="center" justify="space-between">
          <Body size={14} weight="semibold">
            {title}
          </Body>

          <button css={styles.buttonOpen} onClick={() => toggle()}>
            <IconArrowDown24 />
          </button>
        </Flex>
      </header>

      <div css={[styles.bodyWrapper, open && styles.open]}>
        <div css={styles.body}>{children}</div>
      </div>
    </CardBase>
  );
}

const styles = {
  cardCollapse: css`
    //background: red;
  `,

  header: css``,

  buttonOpen: css`
    svg > path {
      stroke: #b4cdef;
    }
  `,

  bodyWrapper: css`
    overflow: hidden;
    will-change: max-height;
    max-height: 0;
    transition: max-height 0.4s ease-in-out;
  `,

  open: css`
    max-height: 1000px;
  `,

  body: css`
    border-top: 1px solid ${COLORS.BG['01']};
    padding-top: 12px;
    margin-top: 10px;
    white-space: pre-line;
  `,
};

export default CardCollapse;
