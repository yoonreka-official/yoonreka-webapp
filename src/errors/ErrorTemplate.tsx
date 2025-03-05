import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Image404 from '~/assets/images/error/img_404.png';
import Image500 from '~/assets/images/error/img_500.png';
import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react';
import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx';
import Flex from '~/components/display/Flex.tsx';
import Body from '~/components/typography/Body.tsx';
import { COLORS } from '~/configs/theme.ts';

export interface ErrorTemplateProps {
  message?: string;
  status?: number | string;
}

function ErrorTemplate({ status, message }: ErrorTemplateProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleGoToHome = () => {
    navigate('/', { replace: true });
  };

  const renderErrorInfo = () => {
    switch (status) {
      case 404:
        return (
          <Flex direction="column" items="center" justify="center">
            <img alt={message} css={styles.icon} src={Image404} />
            <Body css={styles.errorTitle} size={16} weight="bold">
              404 오류
            </Body>
            <Body
              color={COLORS.FONT['30']}
              css={styles.errorDetail}
              size={14}
              weight="semibold"
            >
              이런!..
              <br />
              찾을 수 없는 페이지예요.
            </Body>
          </Flex>
        );
      case 500:
      default:
        return (
          <Flex direction="column" items="center" justify="center">
            <img alt={message} css={styles.icon} src={Image500} />
            <Body css={styles.errorTitle} size={16} weight="bold">
              서버 오류
            </Body>
            <Body
              color={COLORS.FONT['30']}
              css={styles.errorDetail}
              size={14}
              weight="semibold"
            >
              앱이 잠깐 쉬고 있어요.
              <br />
              잠시 후 다시 이용해 주세요!
            </Body>
          </Flex>
        );
    }
  };

  return (
    <div css={styles.errorPage}>
      <header css={styles.header}>
        <div css={styles.titleBar}>
          <button onClick={() => handleClose()}>
            <IconExpandLeft24 />
          </button>
        </div>
      </header>

      <Flex
        css={styles.content}
        direction="column"
        items="center"
        justify="center"
      >
        {renderErrorInfo()}

        <ButtonPrimary
          block={false}
          css={styles.homeButton}
          onClick={() => handleGoToHome()}
        >
          홈으로 돌아가기
        </ButtonPrimary>
      </Flex>
    </div>
  );
}

const styles = {
  errorPage: css`
    padding-top: 54px;
  `,

  header: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  `,

  titleBar: css`
    display: flex;
    align-items: center;
    padding: 15px 14px;
    background: #fff;

    button {
      display: flex;
    }

    h1 {
      color: #111827;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 26px; /* 130% */
      letter-spacing: -0.5px;
    }
  `,

  content: css`
    margin-top: 160px;
  `,

  icon: css`
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  `,

  errorTitle: css`
    margin-bottom: 12px;
  `,

  errorDetail: css`
    margin-bottom: 60px;
    text-align: center;
  `,

  homeButton: css`
    border-radius: 8px;
    padding: 8px 12px;
    height: 36px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 142.857% */
    letter-spacing: -0.4px;
  `,
};

export default ErrorTemplate;
