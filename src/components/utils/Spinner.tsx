import { css } from '@emotion/react';

import type { CSSProperties } from 'react';

type Props = {
  fullScreen?: boolean;
  size?: CSSProperties['width'];
};

function Spinner({ fullScreen, size = 80 }: Props) {
  return (
    <div
      css={styles.spinnerWrapper(fullScreen)}
      style={{
        background: fullScreen ? 'rgba(255, 255, 255, 0.5)' : undefined,
        zIndex: 30000,
      }}
    >
      <div css={styles.spinner}>
        <svg
          fill="none"
          height="124"
          style={{
            height: size,
            width: size,
          }}
          viewBox="0 0 154 156"
          width="124"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="76.9126"
            cy="78"
            rx="56.2232"
            ry="57.0181"
            stroke="#1677ff"
            strokeOpacity="0.25"
            strokeWidth="14"
          />
          <path
            d="M76.5234 20.9833C91.4343 20.8786 105.776 26.7853 116.392 37.4039C127.009 48.0226 133.031 62.4834 133.134 77.6052"
            stroke="url(#paint0_linear_354_3449)"
            strokeDasharray="4 4"
            strokeLinecap="round"
            strokeWidth="14"
          />
          <defs>
            <linearGradient
              id="paint0_linear_354_3449"
              gradientUnits="userSpaceOnUse"
              x1="125.45"
              x2="27.6854"
              y1="106.776"
              y2="50.4202"
            >
              <stop stopColor="#1677ff" />
              <stop offset="0.755208" stopColor="#1677ff" stopOpacity="0.01" />
              <stop offset="1" stopColor="#1677ff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

const styles = {
  spinnerWrapper: (fullScreen?: boolean) => css`
    position: ${fullScreen ? 'fixed' : 'absolute'};
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  spinner: css`
    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
};

export default Spinner;
