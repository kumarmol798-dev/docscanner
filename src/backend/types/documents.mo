import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type PageRotation = { #deg0; #deg90; #deg180; #deg270 };

  public type PageInternal = {
    id : Common.PageId;
    blob : Storage.ExternalBlob;
    rotation : PageRotation;
    ocrText : ?Text;
  };

  // Shared-safe page type for the public API
  public type Page = {
    id : Common.PageId;
    blob : Storage.ExternalBlob;
    rotation : PageRotation;
    ocrText : ?Text;
  };

  public type DocumentInternal = {
    id : Common.DocumentId;
    owner : Common.UserId;
    name : Text;
    pages : [PageInternal];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  // Shared-safe document type for the public API
  public type Document = {
    id : Common.DocumentId;
    owner : Common.UserId;
    name : Text;
    pages : [Page];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type DocumentSummary = {
    id : Common.DocumentId;
    name : Text;
    pageCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateDocumentRequest = {
    name : Text;
    pages : [PageInput];
  };

  public type PageInput = {
    blob : Storage.ExternalBlob;
    rotation : PageRotation;
    ocrText : ?Text;
  };

  public type UpdateDocumentNameRequest = {
    id : Common.DocumentId;
    name : Text;
  };

  public type ReorderPagesRequest = {
    documentId : Common.DocumentId;
    pageIds : [Common.PageId];
  };

  public type RotatePageRequest = {
    documentId : Common.DocumentId;
    pageId : Common.PageId;
    rotation : PageRotation;
  };

  public type AddPageRequest = {
    documentId : Common.DocumentId;
    page : PageInput;
    insertAtIndex : ?Nat;
  };
};
