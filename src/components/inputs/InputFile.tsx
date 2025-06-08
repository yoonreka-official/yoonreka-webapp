import { css } from '@emotion/react'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { useEffect, useRef, useState } from 'react'

import {
  getPresignedUrl,
  updateFileMeta,
  uploadPresignedUrl,
} from '~/api/file.api.ts'
import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx'
import Flex from '~/components/display/Flex.tsx'
import InputText from '~/components/inputs/InputText.tsx'

import type { InputProps } from 'antd/es/input/Input'

import type { AttachmentFile } from '~/types/lectures.type.ts'
import type { Nullable } from '~/types/utils/nullable.type.ts'

export interface InputFileProps extends Omit<InputProps, 'name' | 'onChange'> {
  // allowClear?: boolean;
  attachment?: Nullable<AttachmentFile>
  onChange?: (value: string) => void
}

function InputFile({
  value,
  attachment,
  onChange,
  id,
  placeholder = '파일을 선택하세요',
  accept,
  ...props
}: InputFileProps) {
  const ref = useRef<HTMLInputElement>(null)

  const form = useFormInstance()

  const [internalValue, setInternalValue] = useState<string>()

  const openFileBrowser = () => {
    ref.current?.click()
  }

  const handleUpload = async (file: File) => {
    /*
      1. generatePrivateFilePutObjectUrl 뮤테이션
      2. presigned url 로 파일 업로드
      3. analyzePrivateFileMetadata 뮤테이션
     */
    try {
      const { data: presignedData } = await getPresignedUrl()

      if (!presignedData) return

      const { url: presignedUrl, key } =
        presignedData.generatePrivateFilePutObjectUrl

      console.log(presignedUrl, key)
      await uploadPresignedUrl(presignedUrl, file)
      const { data } = await updateFileMeta({
        key,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
      })
      console.log(data)
      if (!data) return

      setInternalValue(data.analyzePrivateFileMetadata.filename)
      onChange?.(data.analyzePrivateFileMetadata.id)
    } catch (e) {
      console.log(e)
    }
  }

  const setValue = (value: File | null) => {
    setInternalValue(value?.name)
  }

  const reset = () => {
    setInternalValue(undefined)
    form.resetFields([id])
  }

  useEffect(() => {
    if (attachment) {
      setInternalValue(attachment.filename)
      onChange?.(attachment.id)
    }
  }, [attachment])

  return (
    <>
      <Flex gap={8} items="center">
        <InputText
          value={internalValue}
          placeholder={placeholder}
          readOnly
          allowClear={false}
          {...props}
          onClick={() => !internalValue && openFileBrowser()}
        />
        {internalValue ? (
          <ButtonPrimary
            block={false}
            css={styles.button}
            htmlType="button"
            onClick={() => reset()}
          >
            삭제
          </ButtonPrimary>
        ) : (
          <ButtonPrimary
            block={false}
            css={styles.button}
            htmlType="button"
            onClick={() => openFileBrowser()}
          >
            이미지 첨부
          </ButtonPrimary>
        )}
      </Flex>

      <input
        accept={accept}
        css={styles.invisibleInput}
        ref={ref}
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (!file) {
            setValue(null)
            return
          }

          return handleUpload(file)
        }}
      />
    </>
  )
}

const styles = {
  invisibleInput: css`
    visibility: hidden;
    width: 0;
    height: 0;
    padding: 0;
  `,

  button: css`
    border-radius: 12px;
    font-size: 14px;
    //width: auto !important;
    padding: 0 10px;
  `,
}

export default InputFile
