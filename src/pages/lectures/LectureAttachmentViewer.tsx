import { css } from '@emotion/react';
import { useMemo, useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiSolidError } from 'react-icons/bi';
import { LuRotateCw } from 'react-icons/lu';
import { RiFullscreenExitFill, RiFullscreenFill } from 'react-icons/ri';
import { Document, Page, pdfjs } from 'react-pdf';

import CardBase from '~/components/cards/CardBase.tsx';
import Flex from '~/components/display/Flex.tsx';
import Caption from '~/components/typography/Caption.tsx';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { COLORS } from '~/configs/theme.ts';
import useLectures from '~/hooks/useLectures.ts';

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type FullScreenDirection = 'left' | 'right';

function LectureAttachmentViewer() {
  const {
    state: { lesson },
  } = useLectures();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [direction, setDirection] = useState<FullScreenDirection>('left');
  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState<number>(1);

  const isDisabled = useMemo(() => {
    return !lesson?.attachment || !total;
  }, [total, lesson]);

  return (
    lesson && (
      <>
        <div css={styles.pdfViewerWrapper}>
          <div
            css={[
              styles.box,
              ...(isFullScreen
                ? [
                    styles.fullScreenMode,
                    direction === 'left'
                      ? styles.fullScreenLeft
                      : styles.fullScreenRight,
                  ]
                : []),
            ]}
          >
            <Document
              error={
                <Flex direction="column" gap={2} items="center">
                  <BiSolidError color={COLORS.STATUS['03']} size={28} />
                  <Caption color={COLORS.FONT['50']}>
                    자료를 불러오는데 실패했습니다.
                  </Caption>
                </Flex>
              }
              file={lesson.attachment?.url}
              loading={
                <Flex direction="column" gap={2} items="center">
                  <Caption color={COLORS.FONT['50']}>자료 불러오는중..</Caption>
                </Flex>
              }
              noData={
                <Caption color={COLORS.FONT['50']}>
                  수업 자료가 아직 등록되지 않았습니다.
                </Caption>
              }
              onLoadError={() => {
                setTotal(undefined);
                setPage(1);
              }}
              onLoadSuccess={({ numPages }) => {
                setTotal(numPages);
              }}
            >
              <Page
                loading={isFullScreen && <div css={styles.pageLoader} />}
                pageNumber={page}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>

            <Flex
              css={styles.controller}
              items="center"
              justify="space-between"
            >
              <Flex gap={4}>
                <button
                  css={styles.controlButton}
                  disabled={isDisabled || page === 1}
                  onClick={() => {
                    if (page === 1) return;
                    setPage(page - 1);
                  }}
                >
                  <BiChevronLeft />
                </button>
                <button
                  css={styles.controlButton}
                  disabled={isDisabled || page === total}
                  onClick={() => {
                    if (page === total) return;
                    setPage(page + 1);
                  }}
                >
                  <BiChevronRight />
                </button>
              </Flex>

              {!isDisabled && (
                <span>
                  {page}/{total}
                </span>
              )}

              <Flex gap={4}>
                {isFullScreen ? (
                  <button
                    css={styles.controlButton}
                    disabled={isDisabled}
                    onClick={() =>
                      setDirection(direction === 'left' ? 'right' : 'left')
                    }
                  >
                    <LuRotateCw />
                  </button>
                ) : (
                  <div
                    css={styles.controlButton}
                    style={{ visibility: 'hidden' }}
                  />
                )}

                <button
                  css={styles.controlButton}
                  disabled={isDisabled}
                  onClick={() => setIsFullScreen(!isFullScreen)}
                >
                  {isFullScreen ? (
                    <RiFullscreenExitFill />
                  ) : (
                    <RiFullscreenFill />
                  )}
                </button>
              </Flex>
            </Flex>
          </div>
        </div>

        <CardBase>
          <header css={styles.dailyInfoHeader}>
            <Caption color={COLORS.POINT.PRIMARY} weight="bold">
              💡 Tip!
            </Caption>
          </header>
          <Caption color="#9A9A9A" size={12} weight="medium">
            썸네일 또는 전체보기 아이콘 선택 후 기기 화면을 가로로 돌려보면 학습
            자료를 자세히 확인할 수 있어요 :)
          </Caption>
        </CardBase>
      </>
    )
  );
}

const styles = {
  box: css`
    position: relative;
    border-radius: 20px;
    background: ${COLORS.FONT['10']};

    /* card */
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
    margin-bottom: 12px;
    overflow: auto;

    .react-pdf__Document {
      min-height: 186px;
      background: #fff;

      .react-pdf__message {
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 186px;
      }

      .react-pdf__Page {
        .react-pdf__Page__canvas {
          width: 100% !important;
          height: auto !important;
        }
      }
    }

    .PdfViewer-module_article__smGeF {
      padding: 0;
      background: ${COLORS.FONT['10']};
      //transform: translateY(-600px);

      .PdfViewer-module_document__RBXeV {
        //box-shadow: none;
        //border-top: 1px solid red;

        & .PdfViewer-module_document__RBXeV {
          //margin-top: 0;
        }
      }
    }
  `,

  pdfViewerWrapper: css`
    position: relative;
  `,

  fullScreenMode: css`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10000;
    border-radius: 0;
    width: 100vh;
    height: 100vw;

    .react-pdf__Document {
      height: calc(100vw - 32px) !important;

      .react-pdf__Page {
        min-width: 100%;
        height: calc(100vw - 32px) !important;
        background-color: rgba(0, 0, 0, 0.7) !important;

        .react-pdf__Page__canvas {
          margin: auto;
          width: auto !important;
          height: calc(100vw - 32px) !important;
        }
      }
    }
  `,

  fullScreenLeft: css`
    transform: rotate(-90deg);
    transform-origin: top left;
    left: 0;
    top: 100%;
  `,

  fullScreenRight: css`
    transform: rotate(-270deg);
    transform-origin: top right;
    right: 0;
    top: 100%;
  `,

  pageLoader: css`
    width: 100%;
    height: calc(100vw - 32px) !important;
    background-color: rgba(0, 0, 0, 0.7) !important;
  `,

  controller: css`
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 12px;
    padding: 0 20px;
  `,

  controlButton: css`
    display: flex;
    width: 32px;
    height: 32px;
    //border-radius: 50%;
    justify-content: center;
    align-items: center;
    line-height: 1;
    color: #fff;
    font-weight: 700;
    font-size: 18px;

    &:disabled {
      color: #666;
    }
  `,

  buttonFullScreen: css`
    position: absolute;
    bottom: 6px;
    right: 6px;
    display: flex;
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    line-height: 1;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
  `,

  dailyInfoHeader: css`
    border-bottom: 1px solid ${COLORS.BG['01']};
    padding-bottom: 4px;
    margin-bottom: 10px;
  `,
};

export default LectureAttachmentViewer;
