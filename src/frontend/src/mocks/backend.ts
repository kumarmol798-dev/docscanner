import type { backendInterface } from "../backend.d";
import { PageRotation, UserRole } from "../backend";

export const mockBackend: backendInterface = {
  addPage: async () => BigInt(1),
  assignCallerUserRole: async () => undefined,
  createDocument: async () => ({
    id: BigInt(1),
    owner: {} as any,
    name: "Sample Document",
    createdAt: BigInt(Date.now()) * 1_000_000n,
    updatedAt: BigInt(Date.now()) * 1_000_000n,
    pages: [],
  }),
  deleteDocument: async () => undefined,
  deletePage: async () => undefined,
  getCallerUserProfile: async () => ({ name: "Test User" }),
  getCallerUserRole: async () => UserRole.user,
  getDocument: async () => null,
  getUserProfile: async () => ({ name: "Test User" }),
  isCallerAdmin: async () => false,
  listDocuments: async () => [
    {
      id: BigInt(1),
      name: "Invoice_001.pdf",
      pageCount: BigInt(2),
      createdAt: BigInt(Date.now() - 2 * 60 * 60 * 1000) * 1_000_000n,
      updatedAt: BigInt(Date.now() - 2 * 60 * 60 * 1000) * 1_000_000n,
    },
    {
      id: BigInt(2),
      name: "Contract_Aug.pdf",
      pageCount: BigInt(5),
      createdAt: BigInt(Date.now() - 26 * 60 * 60 * 1000) * 1_000_000n,
      updatedAt: BigInt(Date.now() - 26 * 60 * 60 * 1000) * 1_000_000n,
    },
    {
      id: BigInt(3),
      name: "Contract_002.pdf",
      pageCount: BigInt(3),
      createdAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * 1_000_000n,
      updatedAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * 1_000_000n,
    },
  ],
  reorderPages: async () => undefined,
  rotatePage: async () => undefined,
  saveCallerUserProfile: async () => undefined,
  saveOcrText: async () => undefined,
  searchDocuments: async () => [],
  updateDocumentName: async () => undefined,
};
