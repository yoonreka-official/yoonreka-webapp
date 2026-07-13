import { useMutation } from '@apollo/client'
import { useCallback, useEffect, useRef } from 'react'

import { UpsertMyLessonVideoProgressDocument } from '~/types/api'

/** 재생 중 진도 전송 주기 (ms) */
const HEARTBEAT_INTERVAL_MS = 10_000

/** 이 값보다 짧은 시청 구간은 전송하지 않습니다. (초) */
const MIN_SEGMENT_SECONDS = 0.5

/** 폴링(tick) 기준, 이 값 이상 위치가 점프하면 탐색(seek)으로 간주합니다. (초) */
const SEEK_JUMP_THRESHOLD_SECONDS = 3

/**
 * 강의 영상 시청 진도 heartbeat 훅.
 *
 * - 재생 중 10초마다 + pause/seek/페이지 이탈 시 upsertMyLessonVideoProgress 전송
 * - segment 는 "직전 전송 이후" 시청한 구간만 포함 (서버에서 병합/진도율 계산)
 */
const useLessonVideoProgress = (videoId?: string) => {
  const [upsertProgress] = useMutation(UpsertMyLessonVideoProgressDocument)

  const positionRef = useRef(0)
  const segmentStartRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)
  const hasPlayedRef = useRef(false)
  const lastSentPositionRef = useRef<number | null>(null)
  const lastSentAtRef = useRef(0)
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sendQueueRef = useRef<Promise<void>>(Promise.resolve())

  const send = useCallback(
    (position: number, segment?: { s: number; e: number }) => {
      if (!videoId) return

      const lastPositionSeconds = Math.max(0, Math.floor(position))

      // ? 위치만 갱신하는 전송은 중복/과도한 호출(연속 탐색 등) 방지
      if (!segment) {
        if (lastSentPositionRef.current === lastPositionSeconds) return
        if (Date.now() - lastSentAtRef.current < 1000) return
      }

      lastSentPositionRef.current = lastPositionSeconds
      lastSentAtRef.current = Date.now()

      const request = async () => {
        await upsertProgress({
          context: {
            fetchOptions: { keepalive: true },
          },
          variables: {
            input: {
              lessonVideoId: videoId,
              lastPositionSeconds,
              segment,
            },
          },
        })
      }

      // ? heartbeat/pause 순서를 보존하고 일시적인 네트워크 실패는 한 번 재시도
      sendQueueRef.current = sendQueueRef.current
        .then(async () => {
          try {
            await request()
          } catch {
            await request()
          }
        })
        .catch((e) => {
          if (lastSentPositionRef.current === lastPositionSeconds) {
            lastSentPositionRef.current = null
            lastSentAtRef.current = 0
          }
          console.error('upsertMyLessonVideoProgress 실패', e)
        })
    },
    [videoId, upsertProgress],
  )

  /**
   * 직전 전송 이후 구간을 segment 로 전송하고, 구간 시작점을 리셋합니다.
   */
  const flush = useCallback(
    (position: number) => {
      if (!hasPlayedRef.current) return

      const start = segmentStartRef.current
      const segment =
        start !== null && position - start >= MIN_SEGMENT_SECONDS
          ? { s: start, e: position }
          : undefined

      send(position, segment)

      segmentStartRef.current = isPlayingRef.current ? position : null
    },
    [send],
  )

  const stopHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current)
      heartbeatRef.current = null
    }
  }, [])

  const startHeartbeat = useCallback(() => {
    stopHeartbeat()

    heartbeatRef.current = setInterval(() => {
      flush(positionRef.current)
    }, HEARTBEAT_INTERVAL_MS)
  }, [flush, stopHeartbeat])

  /** timeupdate / 폴링 등으로 최신 재생 위치를 갱신 (HTML5 video 용) */
  const updatePosition = useCallback((position: number) => {
    positionRef.current = position
  }, [])

  const handlePlay = useCallback(
    (position: number) => {
      hasPlayedRef.current = true

      // ? 재생 중 탐색 직후 다시 PLAYING 이 되는 경우(유튜브) — 미전송 구간 먼저 전송
      if (isPlayingRef.current && segmentStartRef.current !== null) {
        flush(positionRef.current)
      }

      isPlayingRef.current = true
      positionRef.current = position
      segmentStartRef.current = position

      startHeartbeat()
    },
    [flush, startHeartbeat],
  )

  const handlePause = useCallback(
    (position: number) => {
      positionRef.current = position

      flush(position)

      isPlayingRef.current = false
      segmentStartRef.current = null

      stopHeartbeat()
    },
    [flush, stopHeartbeat],
  )

  const handleEnded = useCallback(
    (position: number) => {
      handlePause(position)
    },
    [handlePause],
  )

  /** 탐색(seek) — 직전 위치까지의 구간을 전송하고 새 위치에서 구간을 다시 시작 */
  const handleSeek = useCallback(
    (to: number) => {
      const from = positionRef.current

      if (hasPlayedRef.current) {
        const start = segmentStartRef.current
        const segment =
          start !== null && from - start >= MIN_SEGMENT_SECONDS
            ? { s: start, e: from }
            : undefined

        send(to, segment)
      }

      positionRef.current = to
      segmentStartRef.current = isPlayingRef.current ? to : null
    },
    [send],
  )

  /** 유튜브 플레이어 폴링 — 위치 점프를 탐색으로 간주 */
  const handleTick = useCallback(
    (position: number) => {
      if (
        isPlayingRef.current &&
        Math.abs(position - positionRef.current) > SEEK_JUMP_THRESHOLD_SECONDS
      ) {
        handleSeek(position)
        return
      }

      positionRef.current = position
    },
    [handleSeek],
  )

  // ? 페이지 이탈(탭 전환/닫기/unmount) 시 남은 구간 전송
  useEffect(() => {
    const flushOnLeave = () => {
      flush(positionRef.current)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushOnLeave()
      }
    }

    window.addEventListener('pagehide', flushOnLeave)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('pagehide', flushOnLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      stopHeartbeat()
      flushOnLeave()
    }
  }, [flush, stopHeartbeat])

  return {
    updatePosition,
    handlePlay,
    handlePause,
    handleEnded,
    handleSeek,
    handleTick,
  }
}

export default useLessonVideoProgress
