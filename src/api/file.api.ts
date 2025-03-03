import axios from 'axios';

import { getCookie } from '~/utils/cookie.util.ts';

import type { AttachmentFile } from '~/types/lectures.type.ts';

const FILE_ENDPOINT = `${import.meta.env.VITE_API_URL}/api/files`;

export const uploadFile = (file: File, isPublic = true) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('isPublic', isPublic ? 'true' : 'false');

  const accessToken = getCookie('accessToken');

  return axios.post<AttachmentFile>(FILE_ENDPOINT, formData, {
    headers: {
      /* eslint-disable @typescript-eslint/naming-convention */
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export function upload(
  file: File,
  isPublic?: boolean,
  onProgress?: (progress: number) => void,
): { abort: () => void; promise: Promise<AttachmentFile> } {
  const xhr = new XMLHttpRequest();

  return {
    abort() {
      xhr.abort();
    },
    promise: new Promise<AttachmentFile>((resolve, reject) => {
      xhr.open('POST', FILE_ENDPOINT);
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      }
      xhr.addEventListener('load', e => {
        // eslint-disable-next-line
        console.log(e);

        resolve(JSON.parse(xhr.responseText));
        // try {
        //   const file = JSON.parse(xhr.responseText);
        //   if (isFile(file)) {
        //     resolve(file);
        //     return;
        //   }
        //   reject(new SyntaxError('Invalid file format'));
        // } catch (e) {
        //   reject(new SyntaxError('JSON parsing error'));
        // }
      });
      xhr.upload.onprogress = (e: ProgressEvent) => {
        const progress = e.loaded / e.total;
        onProgress?.(progress);
      };

      xhr.addEventListener('error', () => {
        reject(new Error(xhr.statusText));
      });

      const formData = new FormData();

      formData.append('file', file);
      formData.append('isPublic', isPublic ? 'true' : 'false');

      xhr.send(formData);
    }),
  };
}
