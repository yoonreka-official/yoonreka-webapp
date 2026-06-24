import { gql, useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import Hls from 'hls.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BiDownload } from 'react-icons/bi'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import IconExpandLeft24 from '~/assets/svg/icon_expand_left_24.svg?react'
import CardBase from '~/components/cards/CardBase.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import Headline from '~/components/typography/Headline.tsx'
import NoData from '~/components/utils/NoData.tsx'
import { COLORS } from '~/configs/theme.ts'
import useLoading from '~/hooks/useLoading.ts'
import Container from '~/layouts/Container.tsx'
import ScreenBase from '~/layouts/ScreenBase.tsx'
import YoutubePlayer from '~/pages/lectures/videos/YoutubePlayer.tsx'
import useLessonVideoProgress from '~/pages/lectures/videos/useLessonVideoProgress.ts'
import {
  GetMyLessonVideoDocument,
  GetMyLessonVideoProgressesDocument,
  LessonVideoSourceType,
} from '~/types/api'
import { native } from '~/utils/app.util.ts'
import { formatSeconds } from '~/utils/video.util.ts'

import type { VideoPlayerHandle } from '~/pages/lectures/videos/YoutubePlayer.tsx'

const PLAYBACK_RATES = [1, 1.25, 1.5, 2]

/** 이어보기 최소 위치 (초) — 이보다 짧으면 처음부터 재생 */
const RESUME_MIN_SECONDS = 5

const GET_MY_LESSON_VIDEO_HLS_DOCUMENTS = gql`
  query GetMyLessonVideoHlsDocuments($id: ID!) {
    lessonVideo: myLessonVideo(id: $id) {
      id
      hlsPlaylistDocuments {
        path
        text
        isMaster
      }
    }
  }
`

interface HlsPlaylistDocument {
  path: string
  text: string
  isMaster: boolean
}

interface GetMyLessonVideoHlsDocumentsQuery {
  lessonVideo: {
    id: string
    hlsPlaylistDocuments: HlsPlaylistDocument[] | null
  } | null
}

function LessonVideoPage() {
  const navigate = useNavigate()

  const { videoId } = useParams<{ videoId: string }>()
  const [params] = useSearchParams()
  const lectureId = params.get('lectureId')

  const { data, loading } = useQuery(GetMyLessonVideoDocument, {
    skip: !videoId,
    variables: { id: videoId as string },
  })

  // ? 이어보기용 기존 진도 조회 (목록에서 lectureId 와 함께 진입한 경우)
  const { data: progressData } = useQuery(GetMyLessonVideoProgressesDocument, {
    fetchPolicy: 'network-only',
    skip: !lectureId,
    variables: { lectureId: lectureId as string },
  })

  const video = data?.lessonVideo
  const { data: hlsDocumentsData } =
    useQuery<GetMyLessonVideoHlsDocumentsQuery>(
      GET_MY_LESSON_VIDEO_HLS_DOCUMENTS,
      {
        skip:
          !videoId ||
          !video ||
          video.sourceType !== LessonVideoSourceType.Upload ||
          Boolean(video.hlsPlaylistText),
        variables: { id: videoId as string },
      },
    )
  const hlsPlaylistDocuments = useMemo(
    () => hlsDocumentsData?.lessonVideo?.hlsPlaylistDocuments ?? [],
    [hlsDocumentsData],
  )

  const progress = useLessonVideoProgress(videoId)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerHandleRef = useRef<VideoPlayerHandle | null>(null)
  const [playerReady, setPlayerReady] = useState(false)

  const resumedRef = useRef(false)
  const [resumeNotice, setResumeNotice] = useState<string | null>(null)

  const [playbackRate, setPlaybackRate] = useState(1)

  useLoading(loading)

  useEffect(() => {
    resumedRef.current = false
    playerHandleRef.current = null
    setPlayerReady(false)
  }, [video?.id])

  useEffect(() => {
    const element = videoRef.current
    const currentVideo = video
    if (
      !element ||
      !currentVideo ||
      (!currentVideo.hlsPlaylistText && hlsPlaylistDocuments.length === 0) ||
      currentVideo.sourceType !== LessonVideoSourceType.Upload
    ) {
      return
    }

    const playlistResource =
      hlsPlaylistDocuments.length > 0
        ? createHlsPlaylistResource(hlsPlaylistDocuments)
        : createHlsPlaylistResource([
            {
              path: 'index.m3u8',
              text: currentVideo.hlsPlaylistText ?? '',
              isMaster: true,
            },
          ])

    if (element.canPlayType('application/vnd.apple.mpegurl')) {
      element.src = playlistResource.url
      return () => {
        playlistResource.revoke()
      }
    }

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(playlistResource.url)
      hls.attachMedia(element)
      return () => {
        hls.destroy()
        playlistResource.revoke()
      }
    }

    if (currentVideo.attachment?.url) {
      element.src = currentVideo.attachment.url
    }
    playlistResource.revoke()
  }, [hlsPlaylistDocuments, video])

  const lastPositionSeconds = useMemo(() => {
    if (!videoId) return 0

    return (
      progressData?.progresses.find((item) => item.lessonVideoId === videoId)
        ?.lastPositionSeconds ?? 0
    )
  }, [progressData, videoId])

  // ? 플레이어 준비 + 진도 조회 완료 시 이어보기
  useEffect(() => {
    if (resumedRef.current || !playerReady || !video) return

    // ? 목록에서 진입하지 않아 진도를 조회할 수 없으면 처음부터 재생
    if (!lectureId) {
      resumedRef.current = true
      return
    }

    if (!progressData) return

    resumedRef.current = true

    const duration = video.durationSeconds ?? Number.POSITIVE_INFINITY

    if (
      lastPositionSeconds > RESUME_MIN_SECONDS &&
      lastPositionSeconds < duration - RESUME_MIN_SECONDS
    ) {
      playerHandleRef.current?.seekTo(lastPositionSeconds)
      setResumeNotice(
        `${formatSeconds(lastPositionSeconds)}부터 이어보기를 시작해요.`,
      )
    }
  }, [playerReady, progressData, lectureId, lastPositionSeconds, video])

  // ? 이어보기 안내 자동 숨김
  useEffect(() => {
    if (!resumeNotice) return

    const timer = setTimeout(() => {
      setResumeNotice(null)
    }, 4000)

    return () => clearTimeout(timer)
  }, [resumeNotice])

  const handleChapterClick = (seconds: number) => {
    playerHandleRef.current?.seekTo(seconds)
    playerHandleRef.current?.play?.()
  }

  const attachments = useMemo(
    () =>
      (video?.materials ?? []).flatMap((material) =>
        material.attachments.map((attachment) => ({
          key: `${material.id}-${attachment.id}`,
          materialTitle: material.title,
          ...attachment,
        })),
      ),
    [video],
  )

  return (
    <ScreenBase
      header={
        <header css={styles.header}>
          <Flex gap={6} items="center">
            <button
              css={styles.backButton}
              type="button"
              onClick={() => navigate(-1)}
            >
              <IconExpandLeft24 />
            </button>

            <Headline>강의영상</Headline>
          </Flex>
        </header>
      }
    >
      <Container>
        {!loading && !video && (
          <NoData
            description={
              <Body color={COLORS.FONT['30']} size={14}>
                영상을 불러올 수 없습니다.
              </Body>
            }
          />
        )}

        {video && (
          <Flex direction="column" gap={10}>
            <div css={styles.playerWrapper}>
              {video.sourceType === LessonVideoSourceType.Upload && (
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  css={styles.video}
                  preload="metadata"
                  src={
                    video.hlsPlaylistText || hlsPlaylistDocuments.length > 0
                      ? undefined
                      : video.attachment?.url
                  }
                  onEnded={(e) => {
                    progress.handleEnded(e.currentTarget.currentTime)
                  }}
                  onLoadedMetadata={(e) => {
                    const element = e.currentTarget

                    playerHandleRef.current = {
                      getCurrentTime: () => element.currentTime,
                      seekTo: (seconds) => {
                        element.currentTime = seconds
                      },
                      play: () => {
                        element.play().catch(() => undefined)
                      },
                    }

                    setPlayerReady(true)
                  }}
                  onPause={(e) => {
                    progress.handlePause(e.currentTarget.currentTime)
                  }}
                  onPlay={(e) => {
                    progress.handlePlay(e.currentTarget.currentTime)
                  }}
                  onSeeking={(e) => {
                    progress.handleSeek(e.currentTarget.currentTime)
                  }}
                  onTimeUpdate={(e) => {
                    progress.updatePosition(e.currentTarget.currentTime)
                  }}
                />
              )}

              {video.sourceType === LessonVideoSourceType.Youtube &&
                (video.youtubeVideoId ? (
                  <YoutubePlayer
                    youtubeVideoId={video.youtubeVideoId}
                    onEnded={progress.handleEnded}
                    onPause={progress.handlePause}
                    onPlay={progress.handlePlay}
                    onReady={(handle) => {
                      playerHandleRef.current = handle
                      setPlayerReady(true)
                    }}
                    onTick={progress.handleTick}
                  />
                ) : (
                  <NoData
                    description={
                      <Body color={COLORS.FONT['30']} size={14}>
                        유튜브 영상 정보가 없습니다.
                      </Body>
                    }
                  />
                ))}

              {resumeNotice && (
                <div css={styles.resumeNotice}>
                  <Caption color="#fff" size={12} weight="medium">
                    {resumeNotice}
                  </Caption>
                </div>
              )}
            </div>

            {video.sourceType === LessonVideoSourceType.Youtube &&
              native.enabled() && (
                <Caption color={COLORS.FONT['30']} size={12}>
                  앱에서는 외부 플레이어로 열릴 수 있어요.
                </Caption>
              )}

            <CardBase css={styles.noMarginCard}>
              <Flex direction="column" gap={4}>
                <Body size={16} weight="bold">
                  {video.title}
                </Body>

                {video.durationSeconds != null && (
                  <Caption color={COLORS.FONT['30']} size={12}>
                    영상 길이 {formatSeconds(video.durationSeconds)}
                  </Caption>
                )}

                {video.memo && (
                  <Caption color={COLORS.FONT['50']} size={12}>
                    {video.memo}
                  </Caption>
                )}
              </Flex>
            </CardBase>

            {video.sourceType === LessonVideoSourceType.Upload && (
              <CardBase css={styles.noMarginCard}>
                <Caption
                  className="mb-2"
                  color={COLORS.FONT['60']}
                  size={12}
                  weight="bold"
                >
                  배속
                </Caption>

                <Flex gap={8}>
                  {PLAYBACK_RATES.map((rate) => (
                    <button
                      key={rate}
                      css={styles.rateButton(rate === playbackRate)}
                      type="button"
                      onClick={() => {
                        setPlaybackRate(rate)

                        if (videoRef.current) {
                          videoRef.current.playbackRate = rate
                        }
                      }}
                    >
                      {rate}x
                    </button>
                  ))}
                </Flex>
              </CardBase>
            )}

            {(video.chapters?.length ?? 0) > 0 && (
              <CardBase css={styles.noMarginCard}>
                <Caption
                  className="mb-2"
                  color={COLORS.FONT['60']}
                  size={12}
                  weight="bold"
                >
                  타임스탬프
                </Caption>

                <div css={styles.chapterGrid}>
                  {video.chapters?.map((chapter) => (
                    <button
                      key={`${chapter.seconds}-${chapter.label}`}
                      css={styles.chapterButton}
                      type="button"
                      onClick={() => handleChapterClick(chapter.seconds)}
                    >
                      <span css={styles.chapterTime}>
                        {formatSeconds(chapter.seconds)}
                      </span>

                      <span css={styles.chapterLabel}>{chapter.label}</span>
                    </button>
                  ))}
                </div>
              </CardBase>
            )}

            {attachments.length > 0 && (
              <CardBase css={styles.noMarginCard}>
                <Caption
                  className="mb-2"
                  color={COLORS.FONT['60']}
                  size={12}
                  weight="bold"
                >
                  수업 자료 다운로드
                </Caption>

                <Flex direction="column" gap={8}>
                  {attachments.map((attachment) => (
                    <a
                      key={attachment.key}
                      css={styles.attachmentRow}
                      download={attachment.filename ?? undefined}
                      href={attachment.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Flex direction="column" flex={1} gap={2}>
                        <Body size={14} weight="semibold">
                          {attachment.filename ?? attachment.materialTitle}
                        </Body>

                        <Caption color={COLORS.FONT['30']} size={10}>
                          {attachment.materialTitle}
                        </Caption>
                      </Flex>

                      <BiDownload color={COLORS.POINT.PRIMARY} size={20} />
                    </a>
                  ))}
                </Flex>
              </CardBase>
            )}
          </Flex>
        )}
      </Container>
    </ScreenBase>
  )
}

function createHlsPlaylistResource(documents: HlsPlaylistDocument[]) {
  const objectUrls: string[] = []
  const masterDocument =
    documents.find((document) => document.isMaster) ?? documents[0]
  const childDocuments = documents.filter(
    (document) => document.path !== masterDocument.path,
  )
  const childUrlByPath = new Map(
    childDocuments.map((document) => {
      const url = URL.createObjectURL(
        new Blob([document.text], {
          type: 'application/vnd.apple.mpegurl',
        }),
      )
      objectUrls.push(url)
      return [document.path, url] as const
    }),
  )
  const masterText = replaceHlsPlaylistUris(masterDocument.text, (uri) => {
    const resolvedPath = resolveHlsRelativeUri(masterDocument.path, uri)
    return (resolvedPath && childUrlByPath.get(resolvedPath)) || uri
  })
  const masterUrl = URL.createObjectURL(
    new Blob([masterText], {
      type: 'application/vnd.apple.mpegurl',
    }),
  )
  objectUrls.push(masterUrl)

  return {
    url: masterUrl,
    revoke: () => objectUrls.forEach((url) => URL.revokeObjectURL(url)),
  }
}

function replaceHlsPlaylistUris(
  playlistText: string,
  mapper: (uri: string) => string,
) {
  return playlistText
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) {
        return line
      }
      return mapper(trimmed)
    })
    .join('\n')
}

function resolveHlsRelativeUri(playlistPath: string, uri: string) {
  const trimmed = uri.trim()
  if (!trimmed || trimmed.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return null
  }
  if (trimmed.split('/').includes('..')) {
    return null
  }
  const baseSegments = playlistPath.split('/').slice(0, -1)
  const segments = [...baseSegments, ...trimmed.split('/')].filter(Boolean)
  const resolvedSegments: string[] = []
  for (const segment of segments) {
    if (segment === '.') {
      continue
    }
    if (segment === '..') {
      if (resolvedSegments.length === 0) {
        return null
      }
      resolvedSegments.pop()
      continue
    }
    resolvedSegments.push(segment)
  }
  return resolvedSegments.join('/')
}

const styles = {
  header: css`
    background: #fff;
    padding: 15px 14px 13px;
    border-bottom: 1px solid ${COLORS.BG['03']};
  `,

  backButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
  `,

  playerWrapper: css`
    position: relative;
  `,

  video: css`
    width: 100%;
    max-height: 60vh;
    border-radius: 16px;
    background: #000;
  `,

  resumeNotice: css`
    position: absolute;
    left: 10px;
    bottom: 10px;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.75);
    pointer-events: none;
  `,

  noMarginCard: css`
    margin-bottom: 0;
  `,

  rateButton: (active: boolean) => css`
    flex: 1;
    padding: 8px 0;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.2px;
    color: ${active ? '#fff' : COLORS.FONT['60']};
    background: ${active ? COLORS.POINT.PRIMARY : COLORS.BG.BACKGROUND};
  `,

  chapterGrid: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  `,

  chapterButton: css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 10px;
    border-radius: 10px;
    background: ${COLORS.BG.BACKGROUND};
    text-align: left;
    overflow: hidden;
  `,

  chapterTime: css`
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.2px;
    color: ${COLORS.POINT.PRIMARY};
  `,

  chapterLabel: css`
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.2px;
    color: ${COLORS.FONT['80']};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  attachmentRow: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: ${COLORS.BG.BACKGROUND};
  `,
}

export default LessonVideoPage
