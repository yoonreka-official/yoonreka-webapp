import assert from 'node:assert/strict'
import test from 'node:test'

import { getUploadPlaybackMode } from './playback.ts'

test('HLS 문서 조회가 끝나기 전에는 MP4를 선택하지 않는다', () => {
  assert.equal(
    getUploadPlaybackMode({
      forceMp4Fallback: false,
      hlsDocumentCount: 0,
      hlsDocumentsPending: true,
      hlsPlaylistText: null,
    }),
    'loading',
  )
})

test('HLS 문서 또는 단일 playlist가 준비되면 HLS를 선택한다', () => {
  assert.equal(
    getUploadPlaybackMode({
      forceMp4Fallback: false,
      hlsDocumentCount: 1,
      hlsDocumentsPending: false,
      hlsPlaylistText: null,
    }),
    'hls',
  )
  assert.equal(
    getUploadPlaybackMode({
      forceMp4Fallback: false,
      hlsDocumentCount: 0,
      hlsDocumentsPending: false,
      hlsPlaylistText: '#EXTM3U',
    }),
    'hls',
  )
})

test('HLS 복구가 실패하면 MP4 fallback을 우선한다', () => {
  assert.equal(
    getUploadPlaybackMode({
      forceMp4Fallback: true,
      hlsDocumentCount: 1,
      hlsDocumentsPending: false,
      hlsPlaylistText: '#EXTM3U',
    }),
    'mp4',
  )
})
