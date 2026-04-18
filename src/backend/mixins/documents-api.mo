import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/documents";
import DocumentsLib "../lib/documents";

mixin (
  accessControlState : AccessControl.AccessControlState,
  docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
) {
  var _nextDocId : Nat = 0;
  var _nextPageId : Nat = 0;

  /// Create a new document with one or more pages
  public shared ({ caller }) func createDocument(req : Types.CreateDocumentRequest) : async Types.Document {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let (doc, pagesCreated) = DocumentsLib.createDocument(docs, _nextDocId, _nextPageId, caller, req);
    _nextDocId += 1;
    _nextPageId += pagesCreated;
    doc.toPublicDocument();
  };

  /// Get a single document with all pages
  public query ({ caller }) func getDocument(docId : Common.DocumentId) : async ?Types.Document {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.getDocument(docs, caller, docId);
  };

  /// List all documents for the authenticated user (summaries only)
  public query ({ caller }) func listDocuments() : async [Types.DocumentSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.listDocuments(docs, caller);
  };

  /// Search documents by name or OCR text
  public query ({ caller }) func searchDocuments(searchTerm : Text) : async [Types.DocumentSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.searchDocuments(docs, caller, searchTerm);
  };

  /// Rename a document
  public shared ({ caller }) func updateDocumentName(req : Types.UpdateDocumentNameRequest) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.updateDocumentName(docs, caller, req);
  };

  /// Delete a document and all its pages
  public shared ({ caller }) func deleteDocument(docId : Common.DocumentId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.deleteDocument(docs, caller, docId);
  };

  /// Add a page to an existing document at optional position
  public shared ({ caller }) func addPage(req : Types.AddPageRequest) : async Common.PageId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let newPageId = DocumentsLib.addPage(docs, _nextPageId, caller, req);
    _nextPageId += 1;
    newPageId;
  };

  /// Remove a page from a document
  public shared ({ caller }) func deletePage(docId : Common.DocumentId, pageId : Common.PageId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.deletePage(docs, caller, docId, pageId);
  };

  /// Reorder pages within a document
  public shared ({ caller }) func reorderPages(req : Types.ReorderPagesRequest) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.reorderPages(docs, caller, req);
  };

  /// Rotate a page within a document
  public shared ({ caller }) func rotatePage(req : Types.RotatePageRequest) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.rotatePage(docs, caller, req);
  };

  /// Save extracted OCR text for a page
  public shared ({ caller }) func saveOcrText(docId : Common.DocumentId, pageId : Common.PageId, ocrText : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    DocumentsLib.saveOcrText(docs, caller, docId, pageId, ocrText);
  };
};
