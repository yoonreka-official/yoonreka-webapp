import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

import type {
  FileMetaBody,
  FileMetaResponse,
  PresignedUrlData,
} from '~/types/utils/file.type.ts'

export const getPresignedUrl = async () => {
  return appolo.mutate<{ generatePrivateFilePutObjectUrl: PresignedUrlData }>({
    mutation: gql`
      mutation UpdateUser {
        generatePrivateFilePutObjectUrl {
          key
          url
        }
      }
    `,
  })
}

export async function uploadPresignedUrl(
  url: string,
  file: File,
  onProgress?: (progress: number) => void,
) {
  const xhr = new XMLHttpRequest()
  return new Promise<void>((resolve, reject) => {
    xhr.open('PUT', url)
    xhr.upload.onprogress = (event) => {
      onProgress?.(event.loaded / event.total)
    }
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(new Error(`AWS에 이미지 업로드 중 실패: ${xhr.status}`))
        return
      }
      resolve()
    }
    xhr.send(file)
  })
}

export const updateFileMeta = async (body: FileMetaBody) => {
  return appolo.mutate<{ analyzePrivateFileMetadata: FileMetaResponse }>({
    mutation: gql`
      mutation AnalyzePrivateFileMetadata(
        $filename: String!
        $key: String!
        $mimeType: String!
        $size: Int!
      ) {
        analyzePrivateFileMetadata(
          filename: $filename
          key: $key
          mimeType: $mimeType
          size: $size
        ) {
          createdAt
          filename
          id
          key
          mimeType
          size
          updatedAt
          url
        }
      }
    `,
    variables: body,
  })
}
