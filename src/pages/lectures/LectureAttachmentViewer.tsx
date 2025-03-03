import { css } from '@emotion/react';
import { useMemo, useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiSolidError } from 'react-icons/bi';
import { RiFullscreenExitFill, RiFullscreenFill } from 'react-icons/ri';
import { Document, Page, pdfjs } from 'react-pdf';

import CardBase from '~/components/cards/CardBase.tsx';
import Flex from '~/components/display/Flex.tsx';
import Caption from '~/components/typography/Caption.tsx';
import { COLORS } from '~/configs/theme.ts';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import useLectures from '~/hooks/useLectures.ts';

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function LectureAttachmentViewer() {
  const {
    state: { lesson },
  } = useLectures();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState<number>(1);

  const isDisabled = useMemo(() => {
    return !lesson?.attachment || !total;
  }, [total, lesson]);

  return (
    lesson && (
      <>
        <div css={styles.pdfViewerWrapper}>
          <div css={[styles.box, isFullScreen && styles.fullScreenMode]}>
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
                <div
                  css={styles.controlButton}
                  style={{ visibility: 'hidden' }}
                />

                <button
                  css={styles.controlButton}
                  disabled={isDisabled}
                  onClick={() => setIsFullScreen(!isFullScreen)}
                >
                  <RiFullscreenFill />
                </button>
              </Flex>
            </Flex>

            {isFullScreen && (
              <button
                css={styles.buttonFullScreen}
                style={{ position: 'fixed' }}
                onClick={() => setIsFullScreen(!isFullScreen)}
              >
                <RiFullscreenExitFill />
              </button>
            )}
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
    //height: 230px;
    //aspect-ratio: 1.65;
    padding: 16px;
    border-radius: 20px;
    background: var(--Font-10, #c3c3c3);
    //background: #fff;
    /* card */
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
    margin-bottom: 12px;
    overflow: auto;

    //transition: all 0.3s linear;
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
      background: var(--Font-10, #c3c3c3);
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
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    inset: 0;
    border-radius: 0;
  `,

  controller: css`
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-size: 12px;
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
