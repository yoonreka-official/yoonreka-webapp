import type { Nullable } from '~/types/utils/nullable.type.ts'

/**
 * 초 단위 값을 분:초(또는 시:분:초) 라벨로 변환합니다. (예: 272 → 4:32)
 */
export const formatSeconds = (value?: Nullable<number>) => {
  if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
    return undefined
  }

  const total = Math.floor(value)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60

  const pad = (n: number) => String(n).padStart(2, '0')

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`
  }

  return `${minutes}:${pad(seconds)}`
}
