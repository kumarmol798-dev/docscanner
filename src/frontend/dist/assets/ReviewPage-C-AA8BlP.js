const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-BhBsJ0VG.js","assets/index-Bl6jr8gF.js","assets/index-BSt4oRYm.css","assets/index-Csos93_D.js"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, _ as __vitePreload, a as Badge, B as Button, S as Skeleton, f as ue, e as useScanStore, d as useNavigate, F as FileImage, L as Library } from "./index-Bl6jr8gF.js";
import { R as Root$1, C as Content, a as Close, T as Title, D as Description, P as Portal, O as Overlay, b as RotateCcw, c as Trash2, u as useCreateDocument, I as Input, E as ExternalBlob, d as PageRotation } from "./index-Cq9LpzOZ.js";
import { P as Primitive, L as LoaderCircle, a as Label } from "./label-Dwr1Xaaw.js";
import { X } from "./x-C9B0Jur7.js";
import { F as FileText } from "./file-text-D9OB-Bw3.js";
import { C as CircleAlert } from "./circle-alert-Dt-1ADnV.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-CwanqHSK.js";
import { A as ArrowUp, a as ArrowDown } from "./arrow-up-BaOgKoGj.js";
import { D as Download } from "./download-D7fXRKW1.js";
import "./index-pyeuiCNz.js";
import "./index-uRdBZryN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }]
];
const FilePlus = createLucideIcon("file-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
];
const RotateCw = createLucideIcon("rotate-cw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 8h8", key: "1jbsf9" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }],
  ["path", { d: "M7 16h6", key: "1vyc9m" }]
];
const ScanText = createLucideIcon("scan-text", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function useExport() {
  const [pdfStatus, setPdfStatus] = reactExports.useState("idle");
  const [imgStatus, setImgStatus] = reactExports.useState("idle");
  const exportPdf = reactExports.useCallback(
    async (pages, documentName) => {
      if (pages.length === 0) return;
      setPdfStatus("generating");
      try {
        const { jsPDF } = await __vitePreload(async () => {
          const { jsPDF: jsPDF2 } = await import("./jspdf.es.min-BhBsJ0VG.js").then((n) => n.j);
          return { jsPDF: jsPDF2 };
        }, true ? __vite__mapDeps([0,1,2]) : void 0);
        const loadImage = (src) => new Promise((res, rej) => {
          const img = new Image();
          img.onload = () => res(img);
          img.onerror = rej;
          img.src = src;
        });
        const first = await loadImage(pages[0].imageDataUrl);
        const isPortrait = first.naturalHeight >= first.naturalWidth;
        const orientation = isPortrait ? "portrait" : "landscape";
        const pdf = new jsPDF({
          orientation,
          unit: "px",
          hotfixes: ["px_scaling"]
        });
        for (let i = 0; i < pages.length; i++) {
          if (i > 0) pdf.addPage();
          const img = await loadImage(pages[i].imageDataUrl);
          const { naturalWidth: w, naturalHeight: h } = img;
          const pW = pdf.internal.pageSize.getWidth();
          const pH = pdf.internal.pageSize.getHeight();
          const scale = Math.min(pW / w, pH / h);
          const dw = w * scale;
          const dh = h * scale;
          const dx = (pW - dw) / 2;
          const dy = (pH - dh) / 2;
          if (pages[i].rotation !== 0) {
            const canvas = document.createElement("canvas");
            const rot = pages[i].rotation;
            const swapped = rot === 90 || rot === 270;
            canvas.width = swapped ? h : w;
            canvas.height = swapped ? w : h;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.translate(canvas.width / 2, canvas.height / 2);
              ctx.rotate(rot * Math.PI / 180);
              ctx.drawImage(img, -w / 2, -h / 2);
            }
            pdf.addImage(
              canvas.toDataURL("image/jpeg", 0.9),
              "JPEG",
              dx,
              dy,
              dw,
              dh
            );
          } else {
            pdf.addImage(pages[i].imageDataUrl, "JPEG", dx, dy, dw, dh);
          }
        }
        const fileName = `${documentName || "document"}.pdf`;
        pdf.save(fileName);
        setPdfStatus("done");
        setTimeout(() => setPdfStatus("idle"), 2e3);
      } catch {
        setPdfStatus("error");
        setTimeout(() => setPdfStatus("idle"), 3e3);
      }
    },
    []
  );
  const exportImage = reactExports.useCallback(
    async (page, documentName) => {
      setImgStatus("generating");
      try {
        const canvas = document.createElement("canvas");
        const img = await new Promise((res, rej) => {
          const el = new Image();
          el.onload = () => res(el);
          el.onerror = rej;
          el.src = page.imageDataUrl;
        });
        const rot = page.rotation;
        const swapped = rot === 90 || rot === 270;
        canvas.width = swapped ? img.naturalHeight : img.naturalWidth;
        canvas.height = swapped ? img.naturalWidth : img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(rot * Math.PI / 180);
          ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        }
        const blob = await new Promise(
          (res) => canvas.toBlob(res, "image/jpeg", 0.92)
        );
        if (!blob) throw new Error("Failed to generate image");
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${documentName || "page_1"}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        setImgStatus("done");
        setTimeout(() => setImgStatus("idle"), 2e3);
      } catch {
        setImgStatus("error");
        setTimeout(() => setImgStatus("idle"), 3e3);
      }
    },
    []
  );
  return { exportPdf, exportImage, pdfStatus, imgStatus };
}
function useOcr() {
  const [store, setStore] = reactExports.useState({});
  const workerRef = reactExports.useRef(null);
  const getState = reactExports.useCallback(
    (pageId) => store[pageId] ?? { status: "idle", text: "", confidence: 0 },
    [store]
  );
  const runOcr = reactExports.useCallback(async (pageId, imageDataUrl) => {
    setStore((prev) => ({
      ...prev,
      [pageId]: { status: "loading", text: "", confidence: 0 }
    }));
    try {
      const { createWorker } = await __vitePreload(async () => {
        const { createWorker: createWorker2 } = await import("./index-Csos93_D.js").then((n) => n.i);
        return { createWorker: createWorker2 };
      }, true ? __vite__mapDeps([3,1,2]) : void 0);
      if (!workerRef.current) {
        workerRef.current = await createWorker("eng", 1, {
          logger: () => {
          }
        });
      }
      const worker = workerRef.current;
      if (!worker) throw new Error("Worker not initialized");
      const { data } = await worker.recognize(imageDataUrl);
      setStore((prev) => ({
        ...prev,
        [pageId]: {
          status: "done",
          text: data.text.trim(),
          confidence: Math.round(data.confidence)
        }
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "OCR failed";
      setStore((prev) => ({
        ...prev,
        [pageId]: { status: "error", text: "", confidence: 0, error: msg }
      }));
    }
  }, []);
  const clearOcr = reactExports.useCallback((pageId) => {
    setStore((prev) => {
      const next = { ...prev };
      delete next[pageId];
      return next;
    });
  }, []);
  return { getState, runOcr, clearOcr };
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function OcrPanel({
  pageId,
  pageIndex,
  state,
  onRunOcr
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  function handleCopy() {
    if (!state.text) return;
    navigator.clipboard.writeText(state.text).then(() => {
      ue.success("Text copied to clipboard");
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-t border-border bg-background/40 rounded-b-lg",
      "data-ocid": `review.ocr_panel.${pageIndex}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3 text-muted-foreground flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display font-medium text-muted-foreground truncate", children: "OCR" }),
            state.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "text-[10px] px-1 py-0 h-4 bg-primary/15 text-primary flex-shrink-0",
                children: [
                  state.confidence,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            state.status === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-6 text-xs px-2 text-primary hover:text-primary hover:bg-primary/10",
                onClick: () => onRunOcr(pageId),
                "data-ocid": `review.ocr_run.${pageIndex}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScanText, { className: "w-3 h-3 mr-1" }),
                  "Extract"
                ]
              }
            ),
            state.status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs text-muted-foreground animate-pulse",
                "data-ocid": `review.ocr_loading.${pageIndex}`,
                children: "Scanning…"
              }
            ),
            state.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs text-destructive flex items-center gap-1",
                "data-ocid": `review.ocr_error.${pageIndex}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                  "Failed"
                ]
              }
            ),
            state.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-6 w-6",
                  onClick: handleCopy,
                  "aria-label": "Copy extracted text",
                  "data-ocid": `review.ocr_copy.${pageIndex}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-6 w-6",
                  onClick: () => setExpanded((x) => !x),
                  "aria-label": expanded ? "Collapse OCR text" : "Expand OCR text",
                  "data-ocid": `review.ocr_toggle.${pageIndex}`,
                  children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                }
              )
            ] })
          ] })
        ] }),
        state.status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-3 pb-3 space-y-1.5",
            "data-ocid": `review.ocr_skeleton.${pageIndex}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-4/5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-3/5" })
            ]
          }
        ),
        state.status === "done" && expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", "data-ocid": `review.ocr_text.${pageIndex}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs font-mono text-foreground/80 leading-relaxed whitespace-pre-wrap break-words max-h-40 overflow-y-auto bg-secondary/40 rounded p-2 border border-border/50 scrollbar-thin", children: state.text || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "No text detected" }) }) })
      ]
    }
  );
}
function PageCard({
  page,
  index,
  total,
  ocrState,
  onMoveUp,
  onMoveDown,
  onRotateCw,
  onRotateCcw,
  onDelete,
  onRunOcr
}) {
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-lg overflow-hidden flex flex-col shadow-scan transition-smooth hover:border-primary/40 hover:shadow-scan",
        "data-ocid": `review.page_card.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden bg-muted/30 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: page.imageDataUrl,
                alt: `Page ${index + 1}`,
                className: "w-full h-full object-contain transition-scan",
                style: { transform: `rotate(${page.rotation}deg)` },
                draggable: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "bg-background/80 text-foreground backdrop-blur-sm text-xs font-mono px-1.5",
                children: index + 1
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-scan pointer-events-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-1.5 bg-card flex items-center justify-between gap-1 border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-foreground disabled:opacity-30",
                  disabled: index === 0,
                  onClick: onMoveUp,
                  "aria-label": "Move page up",
                  "data-ocid": `review.move_up.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-foreground disabled:opacity-30",
                  disabled: index === total - 1,
                  onClick: onMoveDown,
                  "aria-label": "Move page down",
                  "data-ocid": `review.move_down.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-primary",
                  onClick: onRotateCcw,
                  "aria-label": "Rotate counterclockwise",
                  "data-ocid": `review.rotate_ccw.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 text-muted-foreground hover:text-primary",
                  onClick: onRotateCw,
                  "aria-label": "Rotate clockwise",
                  "data-ocid": `review.rotate_cw.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                onClick: () => setConfirmOpen(true),
                "aria-label": "Delete page",
                "data-ocid": `review.delete_button.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OcrPanel,
            {
              pageId: page.id,
              pageIndex: index + 1,
              state: ocrState,
              onRunOcr
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: confirmOpen, onOpenChange: setConfirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "bg-card border-border max-w-sm",
        "data-ocid": `review.delete_dialog.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
              "Delete page ",
              index + 1,
              "?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-muted-foreground", children: "This page will be removed from the current scan session. This cannot be undone." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setConfirmOpen(false),
                "data-ocid": `review.delete_cancel.${index + 1}`,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "destructive",
                onClick: () => {
                  onDelete();
                  setConfirmOpen(false);
                },
                "data-ocid": `review.delete_confirm.${index + 1}`,
                children: "Delete"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
function defaultDocName() {
  const d = /* @__PURE__ */ new Date();
  return `Scan ${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}
function toBackendRotation(rotation) {
  switch (rotation) {
    case 0:
      return PageRotation.deg0;
    case 90:
      return PageRotation.deg90;
    case 180:
      return PageRotation.deg180;
    case 270:
      return PageRotation.deg270;
    default:
      return PageRotation.deg0;
  }
}
async function dataUrlToExternalBlob(dataUrl) {
  const res = await fetch(dataUrl);
  const arrayBuffer = await res.arrayBuffer();
  return ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
}
function ReviewPage() {
  const {
    pages,
    documentName,
    setDocumentName,
    removePage,
    rotatePage,
    reorderPages,
    clearSession
  } = useScanStore();
  const navigate = useNavigate();
  const { getState, runOcr } = useOcr();
  const { exportPdf, exportImage, pdfStatus, imgStatus } = useExport();
  const createDocument = useCreateDocument();
  reactExports.useEffect(() => {
    if (!documentName) {
      setDocumentName(defaultDocName());
    }
  }, [documentName, setDocumentName]);
  function rotateCw(id, current) {
    rotatePage(id, (current + 90) % 360);
  }
  function rotateCcw(id, current) {
    rotatePage(id, (current + 270) % 360);
  }
  async function handleSave() {
    if (!documentName.trim()) {
      ue.error("Please enter a document name");
      return;
    }
    if (pages.length === 0) {
      ue.error("No pages to save");
      return;
    }
    try {
      const pageInputs = await Promise.all(
        pages.map(async (p) => {
          const blob = await dataUrlToExternalBlob(p.imageDataUrl);
          const ocrState = getState(p.id);
          return {
            rotation: toBackendRotation(p.rotation),
            blob,
            ocrText: ocrState.status === "done" ? ocrState.text : void 0
          };
        })
      );
      await createDocument.mutateAsync({
        name: documentName.trim(),
        pages: pageInputs
      });
      ue.success(`"${documentName}" saved to library`);
      clearSession();
      navigate({ to: "/library" });
    } catch {
      ue.error("Failed to save document. Please try again.");
    }
  }
  function handleExportPdf() {
    if (!documentName.trim()) {
      ue.error("Please enter a document name first");
      return;
    }
    exportPdf(pages, documentName).then(() => {
      if (pdfStatus !== "error") ue.success("PDF downloaded");
    });
  }
  function handleExportImage() {
    if (pages.length === 0) return;
    exportImage(pages[0], documentName).then(() => {
      if (imgStatus !== "error") ue.success("Image downloaded");
    });
  }
  function handleRunOcrAll() {
    for (const page of pages) {
      const state = getState(page.id);
      if (state.status === "idle") {
        runOcr(page.id, page.imageDataUrl);
      }
    }
    ue.info("Running OCR on all pages…");
  }
  if (pages.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 flex flex-col items-center justify-center gap-6 p-8",
        "data-ocid": "review.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilePlus, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "No pages yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Scan at least one document page before reviewing." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => navigate({ to: "/capture" }),
              className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display",
              "data-ocid": "review.go_capture_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                "Go to Capture"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col", "data-ocid": "review.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-20 bg-card border-b border-border px-4 py-3 shadow-scan", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => navigate({ to: "/capture" }),
            className: "text-muted-foreground hover:text-foreground font-display",
            "data-ocid": "review.back_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-1.5" }),
              "Add pages"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold text-foreground", children: "Review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "bg-primary/15 text-primary text-xs font-mono",
              children: [
                pages.length,
                " ",
                pages.length === 1 ? "page" : "pages"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleRunOcrAll,
            className: "font-display text-xs border-border hover:border-primary/50 hover:text-primary",
            "data-ocid": "review.ocr_all_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ScanText, { className: "w-3.5 h-3.5 mr-1.5" }),
              "OCR All"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleExportImage,
            disabled: imgStatus === "generating",
            className: "font-display text-xs border-border hover:border-accent/60 hover:text-accent",
            "data-ocid": "review.export_image_button",
            children: [
              imgStatus === "generating" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Save as JPEG"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleExportPdf,
            disabled: pdfStatus === "generating",
            className: "font-display text-xs border-border hover:border-accent/60 hover:text-accent",
            "data-ocid": "review.export_pdf_button",
            children: [
              pdfStatus === "generating" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Export PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleSave,
            disabled: createDocument.isPending,
            className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-xs shadow-scan",
            "data-ocid": "review.save_button",
            children: [
              createDocument.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Save to Library"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-6 px-4 py-5 max-w-6xl mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3",
          "data-ocid": "review.name_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "doc-name",
                  className: "font-display text-sm font-semibold text-foreground cursor-pointer",
                  children: "Document name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "doc-name",
                value: documentName,
                onChange: (e) => setDocumentName(e.target.value),
                placeholder: "e.g. Invoice_Oct_2025",
                className: "bg-background font-mono text-sm border-input focus-visible:ring-primary max-w-sm",
                "data-ocid": "review.name_input"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold text-foreground", children: "Pages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Reorder, rotate, or remove pages before saving" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3",
            "data-ocid": "review.pages_list",
            children: pages.map((page, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PageCard,
              {
                page,
                index: i,
                total: pages.length,
                ocrState: getState(page.id),
                onMoveUp: () => reorderPages(i, i - 1),
                onMoveDown: () => reorderPages(i, i + 1),
                onRotateCw: () => rotateCw(page.id, page.rotation),
                onRotateCcw: () => rotateCcw(page.id, page.rotation),
                onDelete: () => removePage(page.id),
                onRunOcr: (id) => runOcr(id, page.imageDataUrl)
              },
              page.id
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "sticky bottom-0 z-20 bg-card/95 backdrop-blur-sm border-t border-border px-4 py-3",
        "data-ocid": "review.action_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            pdfStatus === "generating" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs text-muted-foreground",
                "data-ocid": "review.pdf_loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin text-primary" }),
                  "Generating PDF…"
                ]
              }
            ),
            pdfStatus === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs text-primary font-display",
                "data-ocid": "review.pdf_success_state",
                children: "✓ PDF downloaded"
              }
            ),
            pdfStatus === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs text-destructive",
                "data-ocid": "review.pdf_error_state",
                children: "PDF generation failed — try again"
              }
            ),
            imgStatus === "generating" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center gap-2 text-xs text-muted-foreground",
                "data-ocid": "review.img_loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-20" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground hidden sm:block", children: [
              pages.length,
              " page",
              pages.length !== 1 ? "s" : "",
              " ready"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: handleSave,
                disabled: createDocument.isPending,
                className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold shadow-scan",
                "data-ocid": "review.save_primary_button",
                children: [
                  createDocument.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
                  "Save to Library"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ReviewPage as default
};
