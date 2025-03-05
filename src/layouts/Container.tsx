import { css } from '@emotion/react';

import type { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
}

function Container({ children, className }: Props) {
  return (
    <div className={className} css={style}>
      {children}
    </div>
  );
}

const style = css`
  display: flex;
  flex-direction: column;
  padding: 8px 14px;
  //height: 100%;
  min-height: 100%;
`;

export default Container;
