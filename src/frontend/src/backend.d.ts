import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface DocumentSummary {
    id: DocumentId;
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pageCount: bigint;
}
export type Timestamp = bigint;
export interface ReorderPagesRequest {
    pageIds: Array<PageId>;
    documentId: DocumentId;
}
export interface Document {
    id: DocumentId;
    owner: UserId;
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pages: Array<Page>;
}
export interface RotatePageRequest {
    rotation: PageRotation;
    documentId: DocumentId;
    pageId: PageId;
}
export type UserId = Principal;
export interface Page {
    id: PageId;
    rotation: PageRotation;
    blob: ExternalBlob;
    ocrText?: string;
}
export type DocumentId = bigint;
export interface PageInput {
    rotation: PageRotation;
    blob: ExternalBlob;
    ocrText?: string;
}
export interface CreateDocumentRequest {
    name: string;
    pages: Array<PageInput>;
}
export interface AddPageRequest {
    page: PageInput;
    documentId: DocumentId;
    insertAtIndex?: bigint;
}
export type PageId = bigint;
export interface UpdateDocumentNameRequest {
    id: DocumentId;
    name: string;
}
export interface UserProfile {
    name: string;
}
export enum PageRotation {
    deg0 = "deg0",
    deg180 = "deg180",
    deg270 = "deg270",
    deg90 = "deg90"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPage(req: AddPageRequest): Promise<PageId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createDocument(req: CreateDocumentRequest): Promise<Document>;
    deleteDocument(docId: DocumentId): Promise<void>;
    deletePage(docId: DocumentId, pageId: PageId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDocument(docId: DocumentId): Promise<Document | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listDocuments(): Promise<Array<DocumentSummary>>;
    reorderPages(req: ReorderPagesRequest): Promise<void>;
    rotatePage(req: RotatePageRequest): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveOcrText(docId: DocumentId, pageId: PageId, ocrText: string): Promise<void>;
    searchDocuments(searchTerm: string): Promise<Array<DocumentSummary>>;
    updateDocumentName(req: UpdateDocumentNameRequest): Promise<void>;
}
