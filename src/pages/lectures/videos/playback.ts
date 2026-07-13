export type UploadPlaybackMode = 'hls' | 'loading' | 'mp4'

interface GetUploadPlaybackModeOptions {
  forceMp4Fallback: boolean
  hlsDocumentCount: number
  hlsDocumentsPending: boolean
  hlsPlaylistText?: string | null
}

export function getUploadPlaybackMode({
  forceMp4Fallback,
  hlsDocumentCount,
  hlsDocumentsPending,
  hlsPlaylistText,
}: GetUploadPlaybackModeOptions): UploadPlaybackMode {
  if (forceMp4Fallback) return 'mp4'
  if (hlsPlaylistText || hlsDocumentCount > 0) return 'hls'
  if (hlsDocumentsPending) return 'loading'
  return 'mp4'
}
