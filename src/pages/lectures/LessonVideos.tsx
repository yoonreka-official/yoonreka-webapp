import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { BiChevronLeft, BiChevronRight, BiPlayCircle, BiSolidFolder } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import CardBase from '~/components/cards/CardBase.tsx'
import Flex from '~/components/display/Flex.tsx'
import Body from '~/components/typography/Body.tsx'
import Caption from '~/components/typography/Caption.tsx'
import NoData from '~/components/utils/NoData.tsx'
import StatusTag from '~/components/utils/StatusTag.tsx'
import { COLORS } from '~/configs/theme.ts'
import useAuth from '~/hooks/useAuth.tsx'
import { GetMyLessonVideosDocument } from '~/types/api'
import { formatSeconds } from '~/utils/video.util.ts'

import 'dayjs/locale/ko'

import type {
  MyLessonVideos_LessonVideoFragment,
  MyLessonVideos_LessonVideoProgressFragment,
} from '~/types/api'

dayjs.locale('ko')

interface VideoGroup {
  key: string
  label: string
  date?: string
  videos: MyLessonVideos_LessonVideoFragment[]
}

function LessonVideos() {
  const {
    state: { authUser },
  } = useAuth()

  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(
    null,
  )

  const lectures = authUser?.lectures ?? []

  if (!selectedLectureId) {
    if (lectures.length === 0) {
      return (
        <NoData
          description={
            <Body color={COLORS.FONT['30']} size={14}>
              수강중인 강의가 없습니다.
            </Body>
          }
          disableWrapper
        />
      )
    }

    return (
      <Flex direction="column" gap={8}>
        {lectures.map((lecture) => (
          <button
            key={lecture.id}
            css={styles.folderCard}
            type="button"
            onClick={() => setSelectedLectureId(lecture.id)}
          >
            <Flex gap={10} items="center">
              <BiSolidFolder color={COLORS.POINT.SECONDARY} size={24} />

              <Body size={14} weight="semibold">
                {lecture.title}
              </Body>
            </Flex>

            <BiChevronRight color={COLORS.FONT['20']} size={20} />
          </button>
        ))}
      </Flex>
    )
  }

  return (
    <LectureVideoList
      lectureId={selectedLectureId}
      onBack={() => setSelectedLectureId(null)}
    />
  )
}

interface LectureVideoListProps {
  lectureId: string
  onBack: () => void
}

function LectureVideoList({ lectureId, onBack }: LectureVideoListProps) {
  const navigate = useNavigate()

  const { data, loading } = useQuery(GetMyLessonVideosDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { lectureId },
  })

  const progressMap = useMemo(() => {
    const map = new Map<string, MyLessonVideos_LessonVideoProgressFragment>()
    data?.progresses.forEach((progress) => {
      map.set(progress.lessonVideoId, progress)
    })
    return map
  }, [data])

  const groups = useMemo<VideoGroup[]>(() => {
    const videos = data?.lessonVideos ?? []
    const lessons = data?.lecture?.lessons ?? []

    const lessonDateMap = new Map<string, string>()
    lessons.forEach((lesson) => {
      lessonDateMap.set(lesson.id, lesson.date)
    })

    const grouped = new Map<string, MyLessonVideos_LessonVideoFragment[]>()
    videos.forEach((video) => {
      const list = grouped.get(video.lessonId) ?? []
      list.push(video)
      grouped.set(video.lessonId, list)
    })

    return Array.from(grouped.entries())
      .map(([lessonId, list]) => {
        const date = lessonDateMap.get(lessonId)

        return {
          key: lessonId,
          label: date ? dayjs(date).format('YYYY.MM.DD ddd') : '기타 영상',
          date,
          videos: list,
        }
      })
      .sort((a, b) => {
        if (!a.date) return 1
        if (!b.date) return -1
        return dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
      })
  }, [data])

  return (
    <Flex direction="column" gap={8}>
      <Flex gap={4} items="center">
        <button css={styles.backButton} type="button" onClick={onBack}>
          <BiChevronLeft size={22} />
        </button>

        <Body size={16} weight="bold">
          {data?.lecture?.title ?? '강의영상'}
        </Body>
      </Flex>

      {!loading && groups.length === 0 && (
        <NoData
          description={
            <Body color={COLORS.FONT['30']} size={14}>
              등록된 강의영상이 없습니다.
            </Body>
          }
          disableWrapper
        />
      )}

      {groups.map((group) => (
        <CardBase key={group.key}>
          <Caption
            className="mb-2"
            color={COLORS.FONT['60']}
            size={12}
            weight="bold"
          >
            {group.label}
          </Caption>

          <Flex direction="column" gap={8}>
            {group.videos.map((video) => {
              const progress = progressMap.get(video.id)
              const ratio = Math.min(
                Math.max(progress?.progressRatio ?? 0, 0),
                1,
              )
              const duration = formatSeconds(video.durationSeconds)

              return (
                <button
                  key={video.id}
                  css={styles.videoRow}
                  type="button"
                  onClick={() => {
                    navigate(
                      `/lectures/videos/${video.id}?lectureId=${lectureId}`,
                    )
                  }}
                >
                  <Flex gap={10} items="center">
                    <BiPlayCircle
                      color={COLORS.POINT.PRIMARY}
                      css={styles.playIcon}
                      size={24}
                    />

                    <Flex direction="column" flex={1} gap={4}>
                      <Flex gap={8} items="center" justify="space-between">
                        <Body className="text-left" size={14} weight="semibold">
                          {video.title}
                        </Body>

                        {progress?.isCompleted && (
                          <StatusTag status="success">완료</StatusTag>
                        )}
                      </Flex>

                      <Flex gap={8} items="center">
                        <div css={styles.progressBar}>
                          <div
                            css={styles.progressFill}
                            style={{ width: `${Math.round(ratio * 100)}%` }}
                          />
                        </div>

                        <Caption color={COLORS.FONT['30']} size={10}>
                          {Math.round(ratio * 100)}%
                        </Caption>
                      </Flex>

                      <Flex gap={8} items="center">
                        {duration && (
                          <Caption color={COLORS.FONT['30']} size={10}>
                            영상 길이 {duration}
                          </Caption>
                        )}

                        {progress && progress.watchedSeconds > 0 && (
                          <Caption color={COLORS.FONT['30']} size={10}>
                            시청 {formatSeconds(progress.watchedSeconds)}
                          </Caption>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                </button>
              )
            })}
          </Flex>
        </CardBase>
      ))}
    </Flex>
  )
}

const styles = {
  folderCard: css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 16px 14px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0px 4px 20px 0px rgba(206, 218, 241, 0.4);
    text-align: left;
  `,

  backButton: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: ${COLORS.FONT['60']};
  `,

  videoRow: css`
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    border-radius: 12px;
    background: ${COLORS.BG.BACKGROUND};
  `,

  playIcon: css`
    flex-shrink: 0;
  `,

  progressBar: css`
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: ${COLORS.BG['03']};
    overflow: hidden;
  `,

  progressFill: css`
    height: 100%;
    border-radius: 3px;
    background: ${COLORS.POINT.PRIMARY};
    transition: width 0.2s ease;
  `,
}

export default LessonVideos
