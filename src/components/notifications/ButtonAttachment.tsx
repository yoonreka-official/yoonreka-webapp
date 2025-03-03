import { css } from '@emotion/react';
import download from 'downloadjs';

import IconDownload from '~/assets/svg/icon_download.svg?react';
import IconPdf from '~/assets/svg/icon_pdf.svg?react';
import Flex from '~/components/display/Flex.tsx';
import { COLORS } from '~/configs/theme.ts';

import type { AttachmentFile } from '~/types/lectures.type.ts';

interface Props {
  attachment: AttachmentFile;
}

function ButtonAttachment({ attachment }: Props) {
  return (
    <button
      css={styles.fileButton}
      onClick={() => {
        download(attachment.url);
      }}
    >
      <Flex css={styles.fileCard} items="center" justify="space-between">
        <IconPdf />

        <div>
          <span>{attachment.filename}</span>
          <br />
          <span style={{ color: '#96989b' }}>
            {attachment.mimeType.split('/')[1].toUpperCase()}
          </span>
        </div>

        <IconDownload />
      </Flex>
    </button>
  );
}

const styles = {
  fileButton: css`
    display: block;
    width: 100%;
    appearance: none;
    text-align: left;
  `,

  fileCard: css`
    display: flex;
    padding: 12px;
    align-items: center;
    gap: 8px;
    align-self: stretch;

    margin-top: 10px;

    border-radius: 10px;
    background: ${COLORS.BG.BACKGROUND};

    svg {
      flex-shrink: 0;
    }

    div {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    span {
      width: 100%;
      overflow: hidden;
      color: ${COLORS.FONT['90']};
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 166.667% */
      letter-spacing: -0.2px;

      & span {
        color: ${COLORS.FONT['40']};
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
      }
    }
  `,
};

export default ButtonAttachment;
