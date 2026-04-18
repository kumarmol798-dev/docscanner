import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, F as FileImage, a as Badge, B as Button } from "./index-Bl6jr8gF.js";
import { U as Upload, C as Card } from "./card-BjbisJIE.js";
import { P as Primitive, a as Label, L as LoaderCircle } from "./label-Dwr1Xaaw.js";
import { S as Slider } from "./slider-DBlM_r0n.js";
import { E } from "./jspdf.es.min-BhBsJ0VG.js";
import { A as ArrowUp, a as ArrowDown } from "./arrow-up-BaOgKoGj.js";
import { X } from "./x-C9B0Jur7.js";
import { D as Download } from "./download-D7fXRKW1.js";
import "./index-pyeuiCNz.js";
import "./index-DlD27myx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const PAGE_SIZES = [
  { value: "a4", label: "A4 (210 × 297 mm)" },
  { value: "letter", label: "Letter (8.5 × 11 in)" },
  { value: "fit", label: "Fit to Image" }
];
const PAGE_DIMS = {
  a4: { w: 595.28, h: 841.89 },
  letter: { w: 612, h: 792 },
  fit: { w: 0, h: 0 }
};
function ImageToPdfPage() {
  const [images, setImages] = reactExports.useState([]);
  const [pageSize, setPageSize] = reactExports.useState("a4");
  const [orientation, setOrientation] = reactExports.useState("portrait");
  const [margin, setMargin] = reactExports.useState(20);
  const [progress, setProgress] = reactExports.useState(0);
  const [isConverting, setIsConverting] = reactExports.useState(false);
  const [pdfBlob, setPdfBlob] = reactExports.useState(null);
  const [dragOverIndex, setDragOverIndex] = reactExports.useState(null);
  const [dragIndex, setDragIndex] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const readFileAsDataUrl = reactExports.useCallback(
    (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }),
    []
  );
  const addFiles = reactExports.useCallback(
    async (files) => {
      const valid = files.filter(
        (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type)
      );
      const items = await Promise.all(
        valid.map(async (file) => ({
          id: `${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          dataUrl: await readFileAsDataUrl(file)
        }))
      );
      setImages((prev) => [...prev, ...items]);
      setPdfBlob(null);
    },
    [readFileAsDataUrl]
  );
  const handleFileInput = (e) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  };
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
  };
  const handleDragOver = (e) => e.preventDefault();
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPdfBlob(null);
  };
  const moveImage = (from, to) => {
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
    setPdfBlob(null);
  };
  const handleItemDragStart = (idx) => setDragIndex(idx);
  const handleItemDragEnter = (idx) => setDragOverIndex(idx);
  const handleItemDragEnd = () => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      moveImage(dragIndex, dragOverIndex);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };
  const loadImage = (dataUrl) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
  const convertToPdf = async () => {
    if (!images.length) return;
    setIsConverting(true);
    setProgress(0);
    setPdfBlob(null);
    const doc = new E({
      orientation: "p",
      unit: "pt",
      hotfixes: ["px_scaling"]
    });
    doc.deletePage(1);
    for (let i = 0; i < images.length; i++) {
      const img = await loadImage(images[i].dataUrl);
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      let pageW;
      let pageH;
      if (pageSize === "fit") {
        pageW = imgW;
        pageH = imgH;
      } else {
        const dims = PAGE_DIMS[pageSize];
        pageW = orientation === "portrait" ? dims.w : dims.h;
        pageH = orientation === "portrait" ? dims.h : dims.w;
      }
      doc.addPage([pageW, pageH], "p");
      const availW = pageW - margin * 2;
      const availH = pageH - margin * 2;
      const scaleX = availW / imgW;
      const scaleY = availH / imgH;
      const scale = Math.min(scaleX, scaleY, 1);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const x = margin + (availW - drawW) / 2;
      const y = margin + (availH - drawH) / 2;
      const ext = images[i].file.type === "image/png" ? "PNG" : "JPEG";
      doc.addImage(images[i].dataUrl, ext, x, y, drawW, drawH);
      setProgress(Math.round((i + 1) / images.length * 100));
    }
    const blob = doc.output("blob");
    setPdfBlob(blob);
    setIsConverting(false);
  };
  const downloadPdf = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };
  const isEmpty = images.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col bg-background min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-display font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-5 h-5 text-primary" }),
          "Image to PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Convert JPG, PNG, or WebP images into a single PDF — fully client-side" })
      ] }),
      images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "font-mono text-xs", children: [
        images.length,
        " ",
        images.length === 1 ? "image" : "images"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "image_to_pdf.dropzone",
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          onKeyDown: (e) => {
            var _a;
            if (e.key === "Enter" || e.key === " ")
              (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          onDrop: handleDrop,
          onDragOver: handleDragOver,
          className: "w-full border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer transition-smooth hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-10 h-10 mx-auto text-muted-foreground mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "Drop images here or click to browse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "JPG, PNG, WebP supported · Multiple files at once" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/jpeg,image/png,image/webp",
                multiple: true,
                className: "hidden",
                onChange: handleFileInput,
                "data-ocid": "image_to_pdf.upload_button"
              }
            )
          ]
        }
      ),
      !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3", children: "Images · drag to reorder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
            "data-ocid": "image_to_pdf.list",
            children: [
              images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  draggable: true,
                  onDragStart: () => handleItemDragStart(idx),
                  onDragEnter: () => handleItemDragEnter(idx),
                  onDragEnd: handleItemDragEnd,
                  "data-ocid": `image_to_pdf.item.${idx + 1}`,
                  className: `relative group overflow-hidden transition-smooth cursor-grab active:cursor-grabbing ${dragOverIndex === idx ? "ring-2 ring-primary scale-95" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: img.dataUrl,
                        alt: img.name,
                        className: "w-full h-full object-cover"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-1 p-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-medium text-center truncate w-full px-1 text-center", children: img.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => moveImage(idx, Math.max(0, idx - 1)),
                            disabled: idx === 0,
                            "aria-label": "Move up",
                            "data-ocid": `image_to_pdf.item.${idx + 1}.move_up`,
                            className: "p-1 rounded bg-card hover:bg-secondary disabled:opacity-30 transition-colors",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3.5 h-3.5" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => moveImage(idx, Math.min(images.length - 1, idx + 1)),
                            disabled: idx === images.length - 1,
                            "aria-label": "Move down",
                            "data-ocid": `image_to_pdf.item.${idx + 1}.move_down`,
                            className: "p-1 rounded bg-card hover:bg-secondary disabled:opacity-30 transition-colors",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3.5 h-3.5" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeImage(img.id),
                            "aria-label": "Remove image",
                            "data-ocid": `image_to_pdf.delete_button.${idx + 1}`,
                            className: "p-1 rounded bg-destructive/20 hover:bg-destructive/40 transition-colors",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-destructive" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 left-1.5 bg-background/80 rounded px-1.5 py-0.5 text-xs font-mono text-foreground", children: idx + 1 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 right-1.5 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-3.5 h-3.5" }) })
                  ]
                },
                img.id
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                  },
                  "data-ocid": "image_to_pdf.add_more_button",
                  className: "aspect-[3/4] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/60 hover:text-primary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Add more" })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-5 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "PDF Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-muted-foreground", children: "Page Size" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PAGE_SIZES.map((ps) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `image_to_pdf.page_size.${ps.value}`,
                onClick: () => {
                  setPageSize(ps.value);
                  setPdfBlob(null);
                },
                className: `px-3 py-1.5 rounded-lg text-sm font-medium border transition-smooth ${pageSize === ps.value ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:bg-secondary"}`,
                children: ps.label
              },
              ps.value
            )) })
          ] }),
          pageSize !== "fit" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-muted-foreground", children: "Orientation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["portrait", "landscape"].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `image_to_pdf.orientation.${o}`,
                onClick: () => {
                  setOrientation(o);
                  setPdfBlob(null);
                },
                className: `flex-1 py-1.5 rounded-lg text-sm font-medium border capitalize transition-smooth ${orientation === o ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground hover:bg-secondary"}`,
                children: o
              },
              o
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-muted-foreground", children: "Margin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary", children: [
                margin,
                " pt"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Slider,
              {
                min: 0,
                max: 72,
                step: 4,
                value: [margin],
                onValueChange: ([v]) => {
                  setMargin(v);
                  setPdfBlob(null);
                },
                "data-ocid": "image_to_pdf.margin_slider",
                className: "w-full"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "None" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Wide (72 pt)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 flex flex-col justify-between bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Export" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              images.length,
              " ",
              images.length === 1 ? "page" : "pages",
              " ·",
              " ",
              pageSize.toUpperCase(),
              pageSize !== "fit" && ` · ${orientation}`,
              margin > 0 && ` · ${margin} pt margin`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-6", children: [
            isConverting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "space-y-1.5",
                "data-ocid": "image_to_pdf.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Generating PDF…" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                      progress,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "h-2" })
                ]
              }
            ),
            pdfBlob && !isConverting && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-sm text-primary",
                "data-ocid": "image_to_pdf.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "PDF ready · ",
                    (pdfBlob.size / 1024).toFixed(0),
                    " KB"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: convertToPdf,
                disabled: isConverting || images.length === 0,
                "data-ocid": "image_to_pdf.convert_button",
                className: "w-full",
                size: "lg",
                children: isConverting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Converting…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-4 h-4 mr-2" }),
                  "Convert to PDF"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: downloadPdf,
                disabled: !pdfBlob,
                variant: "outline",
                "data-ocid": "image_to_pdf.download_button",
                className: "w-full",
                size: "lg",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                  "Download PDF"
                ]
              }
            )
          ] })
        ] })
      ] }),
      isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 space-y-4",
          "data-ocid": "image_to_pdf.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-8 h-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No images yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Upload some images above to get started. Supports JPG, PNG, and WebP." })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  ImageToPdfPage as default
};
