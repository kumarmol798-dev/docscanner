export type UserId = string; // Principal serialized
export type Timestamp = bigint;
export type DocumentId = bigint;
export type PageId = bigint;

export type PageRotation = 0 | 90 | 180 | 270;

export interface Page {
  id: PageId;
  imageUrl: string; // resolved from ExternalBlob
  rotation: PageRotation;
  ocrText?: string;
}

export interface Document {
  id: DocumentId;
  owner: UserId;
  name: string;
  pages: Page[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DocumentSummary {
  id: DocumentId;
  name: string;
  pageCount: bigint;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ScanPage {
  id: string; // local ephemeral ID before save
  imageDataUrl: string;
  rotation: PageRotation;
  file?: File;
}

export interface ScanSession {
  documentName: string;
  pages: ScanPage[];
}
