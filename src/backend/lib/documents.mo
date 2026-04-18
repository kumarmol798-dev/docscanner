import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/documents";

module {
  func requireOwner(doc : Types.DocumentInternal, caller : Common.UserId) {
    if (not Principal.equal(doc.owner, caller)) {
      Runtime.trap("Unauthorized: not the document owner");
    };
  };

  public func toPublicDocument(self : Types.DocumentInternal) : Types.Document {
    {
      self with
      pages = self.pages.map<Types.PageInternal, Types.Page>(
        func(p) { p },
      );
    };
  };

  // Returns the created document and the count of pages created (so the caller can advance its page ID counter)
  public func createDocument(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    nextId : Nat,
    firstPageId : Nat,
    owner : Common.UserId,
    req : Types.CreateDocumentRequest,
  ) : (Types.DocumentInternal, Nat) {
    let now = Time.now();
    var pageId = firstPageId;
    let pages = req.pages.map(
      func(p) {
        let id = pageId;
        pageId += 1;
        { id; blob = p.blob; rotation = p.rotation; ocrText = p.ocrText };
      },
    );
    let doc : Types.DocumentInternal = {
      id = nextId;
      owner;
      name = req.name;
      pages;
      createdAt = now;
      updatedAt = now;
    };
    docs.add(nextId, doc);
    // Return how many pages were created so caller can advance its page ID counter
    (doc, req.pages.size());
  };

  public func getDocument(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    docId : Common.DocumentId,
  ) : ?Types.Document {
    switch (docs.get(docId)) {
      case null null;
      case (?doc) {
        if (not Principal.equal(doc.owner, caller)) { null } else {
          ?toPublicDocument(doc);
        };
      };
    };
  };

  public func listDocuments(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
  ) : [Types.DocumentSummary] {
    let result = List.empty<Types.DocumentSummary>();
    for ((_, doc) in docs.entries()) {
      if (Principal.equal(doc.owner, caller)) {
        result.add({
          id = doc.id;
          name = doc.name;
          pageCount = doc.pages.size();
          createdAt = doc.createdAt;
          updatedAt = doc.updatedAt;
        });
      };
    };
    result.toArray();
  };

  public func searchDocuments(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    searchTerm : Text,
  ) : [Types.DocumentSummary] {
    let lower = searchTerm.toLower();
    let result = List.empty<Types.DocumentSummary>();
    for ((_, doc) in docs.entries()) {
      if (Principal.equal(doc.owner, caller)) {
        let nameMatch = doc.name.toLower().contains(#text lower);
        let ocrMatch = doc.pages.any(
          func(p) {
            switch (p.ocrText) {
              case null false;
              case (?t) t.toLower().contains(#text lower);
            };
          },
        );
        if (nameMatch or ocrMatch) {
          result.add({
            id = doc.id;
            name = doc.name;
            pageCount = doc.pages.size();
            createdAt = doc.createdAt;
            updatedAt = doc.updatedAt;
          });
        };
      };
    };
    result.toArray();
  };

  public func updateDocumentName(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    req : Types.UpdateDocumentNameRequest,
  ) : () {
    let doc = switch (docs.get(req.id)) {
      case null { Runtime.trap("Document not found") };
      case (?d) d;
    };
    requireOwner(doc, caller);
    docs.add(req.id, { doc with name = req.name; updatedAt = Time.now() });
  };

  public func deleteDocument(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    docId : Common.DocumentId,
  ) : () {
    let doc = switch (docs.get(docId)) {
      case null { Runtime.trap("Document not found") };
      case (?d) d;
    };
    requireOwner(doc, caller);
    docs.remove(docId);
  };

  public func addPage(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    nextPageId : Nat,
    caller : Common.UserId,
    req : Types.AddPageRequest,
  ) : Nat {
    let doc = switch (docs.get(req.documentId)) {
      case null { Runtime.trap("Document not found") };
      case (?d) d;
    };
    requireOwner(doc, caller);
    let newPage : Types.PageInternal = {
      id = nextPageId;
      blob = req.page.blob;
      rotation = req.page.rotation;
      ocrText = req.page.ocrText;
    };
    let updatedPages = switch (req.insertAtIndex) {
      case null {
        // append at end
        doc.pages.concat([newPage]);
      };
      case (?idx) {
        let before = doc.pages.sliceToArray(0, idx.toInt());
        let after = doc.pages.sliceToArray(idx.toInt(), doc.pages.size().toInt());
        before.concat([newPage]).concat(after);
      };
    };
    docs.add(req.documentId, { doc with pages = updatedPages; updatedAt = Time.now() });
    nextPageId;
  };

  public func deletePage(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    docId : Common.DocumentId,
    pageId : Common.PageId,
  ) : () {
    let doc = switch (docs.get(docId)) {
      case null { Runtime.trap("Document not found") };
      case (?d) d;
    };
    requireOwner(doc, caller);
    let updatedPages = doc.pages.filter(func(p) { p.id != pageId });
    docs.add(docId, { doc with pages = updatedPages; updatedAt = Time.now() });
  };

  public func reorderPages(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    req : Types.ReorderPagesRequest,
  ) : () {
    let doc = switch (docs.get(req.documentId)) {
      case null { Runtime.trap("Document not found") };
      case (?d) d;
    };
    requireOwner(doc, caller);
    // Build reordered pages array by looking up each pageId in order
    let reordered = req.pageIds.map(
      func(pid) {
        switch (doc.pages.find(func(p) { p.id == pid })) {
          case null { Runtime.trap("Page not found: " # pid.toText()) };
          case (?p) p;
        };
      },
    );
    docs.add(req.documentId, { doc with pages = reordered; updatedAt = Time.now() });
  };

  public func rotatePage(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    req : Types.RotatePageRequest,
  ) : () {
    let doc = switch (docs.get(req.documentId)) {
      case null { Runtime.trap("Document not found") };
      case (?d) d;
    };
    requireOwner(doc, caller);
    let updatedPages = doc.pages.map(
      func(p) {
        if (p.id == req.pageId) { { p with rotation = req.rotation } } else { p };
      },
    );
    docs.add(req.documentId, { doc with pages = updatedPages; updatedAt = Time.now() });
  };

  public func saveOcrText(
    docs : Map.Map<Common.DocumentId, Types.DocumentInternal>,
    caller : Common.UserId,
    docId : Common.DocumentId,
    pageId : Common.PageId,
    ocrText : Text,
  ) : () {
    let doc = switch (docs.get(docId)) {
      case null { Runtime.trap("Document not found") };
      case (?d) d;
    };
    requireOwner(doc, caller);
    let updatedPages = doc.pages.map(
      func(p) {
        if (p.id == pageId) { { p with ocrText = ?ocrText } } else { p };
      },
    );
    docs.add(docId, { doc with pages = updatedPages; updatedAt = Time.now() });
  };
};
