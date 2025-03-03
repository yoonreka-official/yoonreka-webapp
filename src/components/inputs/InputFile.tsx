import { css } from '@emotion/react';
import { Input } from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useEffect, useRef, useState } from 'react';

import { uploadFile } from '~/api/file.api.ts';
import ButtonPrimary from '~/components/buttons/ButtonPrimary.tsx';
import Flex from '~/components/display/Flex.tsx';
import InputText from '~/components/inputs/InputText.tsx';

import type { InputRef } from 'antd';
import type { InputProps } from 'antd/es/input/Input';

export interface InputFileProps extends Omit<InputProps, 'name' | 'onChange'> {
  allowClear?: boolean;
  disableDownload?: boolean;
  files?: File | string;
  name?: string;
  onChange?: (value: string) => void;
}

function InputFile({
  value,
  onChange,
  id,
  className,
  disableDownload,
  style,
  placeholder = '파일을 선택하세요',
  files,
  ...props
}: InputFileProps) {
  const ref = useRef<InputRef>(null);

  const form = useFormInstance();

  const [internalValue, setInternalValue] = useState<string>();

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) {
  //     setValue(null);
  //     return;
  //   }
  //
  //   return handleUpload(file);
  // };

  const openFileBrowser = () => {
    ref.current?.input?.click();
  };

  const handleUpload = async (file: File) => {
    try {
      const { data } = await uploadFile(file, false);
      setInternalValue(data.filename);
      onChange?.(data.id);
    } catch (e) {
      console.log(e);
    }
  };

  const setValue = (value: File | null) => {
    setInternalValue(value?.name);
  };

  const reset = () => {
    setInternalValue(undefined);
    form.resetFields([id]);
  };

  useEffect(() => {
    if (!files) return;
    if (typeof files === 'string') {
      const split = files.split('/');
      const fileName = split[split.length - 1];
      setInternalValue(fileName);
    }
  }, [files]);

  return (
    <>
      <Flex gap={8} items="center">
        <InputText
          value={internalValue}
          placeholder={placeholder}
          className={className}
          style={style}
          readOnly
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

      <Input
        css={styles.invisibleInput}
        ref={ref}
        type="file"
        hidden
        onChange={event => {
          const file = event.target.files?.[0];
          if (!file) {
            setValue(null);
            return;
          }

          return handleUpload(file);
        }}
        {...props}
      />
    </>
  );
}

const styles = {
  invisibleInput: css`
    visibility: hidden;
    width: 0;
    height: 0;
    padding: 0;
    margin-bottom: -24px;
  `,

  button: css`
    border-radius: 12px;
    font-size: 14px;
    //width: auto !important;
    padding: 0 10px;
  `,
};

export default InputFile;
