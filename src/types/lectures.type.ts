import type { Nullable } from '~/types/utils/nullable.type.ts';

export interface LectureDetailLesson {
  id: string;
  date: string;
  attachment: Nullable<AttachmentFile>;
}

export interface AttachmentFile {
  id: string;
  mimeType: string;
  size: string;
  url: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
}

export interface LectureDetail {
  id: string;
  title: string;
  lessons: LectureDetailLesson[];
}
