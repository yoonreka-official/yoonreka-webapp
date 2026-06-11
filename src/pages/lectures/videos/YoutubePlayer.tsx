import { css } from '@emotion/react'
import { useEffect, useRef } from 'react'

export interface VideoPlayerHandle {
  getCurrentTime: () => number
  seekTo: (seconds: number) => void
  play?: () => void
}

interface YoutubePlayerInstance {
  getCurrentTime: () => number
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  playVideo: () => void
  destroy: () => void
}

interface YoutubeNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      host?: string
      videoId: string
      width?: string
      height?: string
      playerVars?: Record<string, number | string>
      events?: {
        onReady?: () => void
        onStateChange?: (event: { data: number }) => void
      }
    },
  ) => YoutubePlayerInstance
  PlayerState: {
    ENDED: number
    PLAYING: number
    PAUSED: number
  }
}

declare global {
  interface Window {
    YT?: YoutubeNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YoutubeNamespace> | null = null

/**
 * YouTube IFrame Player API 스크립트를 1회만 로드합니다.
 */
const loadYoutubeApi = (): Promise<YoutubeNamespace> => {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT)
  }

  if (!apiPromise) {
    apiPromise = new Promise<YoutubeNamespace>((resolve) => {
      const previous = window.onYouTubeIframeAPIReady

      window.onYouTubeIframeAPIReady = () => {
        previous?.()

        if (window.YT) {
          resolve(window.YT)
        }
      }

      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.head.appendChild(script)
    })
  }

  return apiPromise
}

const TICK_INTERVAL_MS = 1_000

export interface YoutubePlayerProps {
  youtubeVideoId: string
  onReady?: (handle: VideoPlayerHandle) => void
  onPlay?: (position: number) => void
  onPause?: (position: number) => void
  onEnded?: (position: number) => void
  onTick?: (position: number) => void
}

/**
 * youtube-nocookie 기반 YouTube IFrame 플레이어.
 * 배속 등 재생 제어는 유튜브 플레이어 자체 기능을 사용합니다.
 */
function YoutubePlayer({
  youtubeVideoId,
  onReady,
  onPlay,
  onPause,
  onEnded,
  onTick,
}: YoutubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // ? 콜백 변경으로 플레이어가 재생성되지 않도록 ref 로 유지
  const callbacksRef = useRef({ onReady, onPlay, onPause, onEnded, onTick })
  callbacksRef.current = { onReady, onPlay, onPause, onEnded, onTick }

  useEffect(() => {
    let player: YoutubePlayerInstance | null = null
    let tickTimer: ReturnType<typeof setInterval> | null = null
    let isPlaying = false
    let destroyed = false

    const mountTarget = document.createElement('div')
    containerRef.current?.appendChild(mountTarget)

    loadYoutubeApi().then((YT) => {
      if (destroyed) return

      player = new YT.Player(mountTarget, {
        host: 'https://www.youtube-nocookie.com',
        videoId: youtubeVideoId,
        width: '100%',
        height: '100%',
        playerVars: {
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (destroyed || !player) return

            callbacksRef.current.onReady?.({
              getCurrentTime: () => player?.getCurrentTime() ?? 0,
              seekTo: (seconds) => {
                player?.seekTo(seconds, true)
              },
              play: () => {
                player?.playVideo()
              },
            })

            tickTimer = setInterval(() => {
              if (!player || !isPlaying) return
              callbacksRef.current.onTick?.(player.getCurrentTime())
            }, TICK_INTERVAL_MS)
          },

          onStateChange: ({ data }) => {
            if (destroyed || !player) return

            const position = player.getCurrentTime()

            if (data === YT.PlayerState.PLAYING) {
              isPlaying = true
              callbacksRef.current.onPlay?.(position)
              return
            }

            if (data === YT.PlayerState.PAUSED) {
              isPlaying = false
              callbacksRef.current.onPause?.(position)
              return
            }

            if (data === YT.PlayerState.ENDED) {
              isPlaying = false
              callbacksRef.current.onEnded?.(position)
            }
          },
        },
      })
    })

    return () => {
      destroyed = true

      if (tickTimer) {
        clearInterval(tickTimer)
      }

      try {
        player?.destroy()
      } catch (e) {
        console.error(e)
      }

      mountTarget.remove()
    }
  }, [youtubeVideoId])

  return <div ref={containerRef} css={styles.player} />
}

const styles = {
  player: css`
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    background: #000;

    iframe {
      width: 100%;
      height: 100%;
    }
  `,
}

export default YoutubePlayer
