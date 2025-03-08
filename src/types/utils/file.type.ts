export interface PresignedUrlData {
  key: string;
  url: string;
}

export interface FileMetaBody {
  filename: string;
  key: string;
  mimeType: string;
  size: number;
}

export interface FileMetaResponse {
  createdAt: number;
  filename: string;
  id: string;
  key: string;
  mimeType: string;
  size: number;
  updatedAt: number;
  url: string;
}
