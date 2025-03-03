import { css } from '@emotion/react';

import CardBase from '~/components/cards/CardBase.tsx';
import Flex from '~/components/display/Flex.tsx';

import type { CSSProperties, ReactNode } from 'react';

export interface NoDataProps {
  description?: ReactNode;
  footer?: ReactNode;
  height?: CSSProperties['height'];
  disableWrapper?: boolean;
}

function NoData({
  description,
  height = '95%',
  footer,
  disableWrapper,
}: NoDataProps) {
  return !disableWrapper ? (
    <CardBase
      css={css`
        height: ${height};
      `}
    >
      <NoDataInner description={description} footer={footer} />
    </CardBase>
  ) : (
    <Flex
      css={css`
        width: 100%;
        height: ${height};
      `}
    >
      <NoDataInner description={description} footer={footer} />
    </Flex>
  );
}

function NoDataInner({
  description,
  footer,
}: Pick<NoDataProps, 'description' | 'footer'>) {
  return (
    <Flex
      direction="column"
      items="center"
      justify="center"
      style={{ width: '100%', height: '100%' }}
    >
      <div>{description}</div>

      {footer && <div>{footer}</div>}
    </Flex>
  );
}

export default NoData;
