import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CreateDocumentRequest,
  Document,
  DocumentSummary,
  UpdateDocumentNameRequest,
} from "../backend";

export function useDocuments(searchQuery?: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DocumentSummary[]>({
    queryKey: ["documents", searchQuery ?? ""],
    queryFn: async () => {
      if (!actor) return [];
      if (searchQuery?.trim()) {
        return actor.searchDocuments(searchQuery.trim());
      }
      return actor.listDocuments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetDocument(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Document | null>({
    queryKey: ["document", String(id)],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getDocument(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateDocumentRequest) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createDocument(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDeleteDocument() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteDocument(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useUpdateDocumentName() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpdateDocumentNameRequest) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateDocumentName(req);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}
