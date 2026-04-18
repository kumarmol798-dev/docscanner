const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-BhBsJ0VG.js","assets/index-Bl6jr8gF.js","assets/index-BSt4oRYm.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, r as reactExports, u as useComposedRefs, j as jsxRuntimeExports, b as cn, _ as __vitePreload, Z as Zap, a as Badge, B as Button, S as Skeleton } from "./index-Bl6jr8gF.js";
import { C as Card, a as CardContent, U as Upload } from "./card-BjbisJIE.js";
import { a as Label, L as LoaderCircle } from "./label-Dwr1Xaaw.js";
import { u as usePrevious, S as Slider } from "./slider-DBlM_r0n.js";
import { d as useControllableState, P as Primitive, a as composeEventHandlers, c as createContextScope } from "./index-pyeuiCNz.js";
import { a as useSize } from "./index-DlD27myx.js";
import { F as FileText } from "./file-text-D9OB-Bw3.js";
import { C as CircleAlert } from "./circle-alert-Dt-1ADnV.js";
import { D as Download } from "./download-D7fXRKW1.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-CwanqHSK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const PRESETS = [
  {
    key: "standard",
    label: "Standard",
    description: "Good quality, decent size reduction",
    quality: 0.7,
    badge: "Balanced"
  },
  {
    key: "high",
    label: "High",
    description: "Smaller file, slight quality loss",
    quality: 0.5,
    badge: "Smaller"
  },
  {
    key: "maximum",
    label: "Maximum",
    description: "Smallest file, noticeable quality loss",
    quality: 0.3,
    badge: "Smallest"
  }
];
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
function reductionColor(ratio) {
  if (ratio >= 0.5) return "text-green-400";
  if (ratio >= 0.25) return "text-accent";
  return "text-primary";
}
function PdfCompressorPage() {
  const fileInputRef = reactExports.useRef(null);
  const [sourceFile, setSourceFile] = reactExports.useState(null);
  const [sourceName, setSourceName] = reactExports.useState("");
  const [sourceSize, setSourceSize] = reactExports.useState(0);
  const [preset, setPreset] = reactExports.useState("standard");
  const [advancedMode, setAdvancedMode] = reactExports.useState(false);
  const [manualQuality, setManualQuality] = reactExports.useState(0.7);
  const [manualScale, setManualScale] = reactExports.useState(1);
  const [status, setStatus] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const [progressLabel, setProgressLabel] = reactExports.useState("");
  const [outputBlob, setOutputBlob] = reactExports.useState(null);
  const [outputSize, setOutputSize] = reactExports.useState(0);
  const [outputUrl, setOutputUrl] = reactExports.useState(null);
  const effectiveQuality = advancedMode ? manualQuality : PRESETS.find((p) => p.key === preset).quality;
  const effectiveScale = advancedMode ? manualScale : 1;
  const handleFilePick = reactExports.useCallback(
    (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      setSourceFile(file);
      setSourceName(file.name.replace(/\.pdf$/i, ""));
      setSourceSize(file.size);
      setOutputBlob(null);
      setOutputSize(0);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(null);
      setStatus("idle");
      setProgress(0);
    },
    [outputUrl]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file || file.type !== "application/pdf") return;
      setSourceFile(file);
      setSourceName(file.name.replace(/\.pdf$/i, ""));
      setSourceSize(file.size);
      setOutputBlob(null);
      setOutputSize(0);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(null);
      setStatus("idle");
      setProgress(0);
    },
    [outputUrl]
  );
  const handleDragOver = (e) => e.preventDefault();
  const compress = reactExports.useCallback(async () => {
    if (!sourceFile) return;
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputBlob(null);
    setOutputUrl(null);
    setOutputSize(0);
    setStatus("parsing");
    setProgress(0);
    setProgressLabel("Loading PDF…");
    try {
      const pdfjsLib = await __vitePreload(() => import("./pdf-tOEo_aYO.js"), true ? [] : void 0);
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("/assets/pdf.worker-xSiVJ7U_.mjs", import.meta.url).toString();
      const arrayBuffer = await sourceFile.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdfDoc.numPages;
      setProgressLabel(`Loaded — ${numPages} page${numPages > 1 ? "s" : ""}`);
      setProgress(5);
      setStatus("compressing");
      const { jsPDF } = await __vitePreload(async () => {
        const { jsPDF: jsPDF2 } = await import("./jspdf.es.min-BhBsJ0VG.js").then((n) => n.j);
        return { jsPDF: jsPDF2 };
      }, true ? __vite__mapDeps([0,1,2]) : void 0);
      let pdf = null;
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        setProgressLabel(`Rendering page ${pageNum} of ${numPages}…`);
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: effectiveScale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        const jpegDataUrl = canvas.toDataURL("image/jpeg", effectiveQuality);
        if (pageNum === 1) {
          const isPortrait = canvas.height >= canvas.width;
          pdf = new jsPDF({
            orientation: isPortrait ? "portrait" : "landscape",
            unit: "px",
            hotfixes: ["px_scaling"]
          });
          const pW = pdf.internal.pageSize.getWidth();
          const pH = pdf.internal.pageSize.getHeight();
          const scale = Math.min(pW / canvas.width, pH / canvas.height);
          const dw = canvas.width * scale;
          const dh = canvas.height * scale;
          const dx = (pW - dw) / 2;
          const dy = (pH - dh) / 2;
          pdf.addImage(jpegDataUrl, "JPEG", dx, dy, dw, dh);
        } else {
          pdf.addPage();
          const pW = pdf.internal.pageSize.getWidth();
          const pH = pdf.internal.pageSize.getHeight();
          const scale = Math.min(pW / canvas.width, pH / canvas.height);
          const dw = canvas.width * scale;
          const dh = canvas.height * scale;
          const dx = (pW - dw) / 2;
          const dy = (pH - dh) / 2;
          pdf.addImage(jpegDataUrl, "JPEG", dx, dy, dw, dh);
        }
        setProgress(5 + Math.round(pageNum / numPages * 90));
      }
      setProgressLabel("Finalizing PDF…");
      setProgress(96);
      const outBlob = pdf.output("blob");
      const url = URL.createObjectURL(outBlob);
      setOutputBlob(outBlob);
      setOutputSize(outBlob.size);
      setOutputUrl(url);
      setProgress(100);
      setProgressLabel("Done!");
      setStatus("done");
    } catch (err) {
      console.error("Compression failed:", err);
      setProgressLabel("Compression failed");
      setStatus("error");
    }
  }, [sourceFile, effectiveQuality, effectiveScale, outputUrl]);
  const handleDownload = reactExports.useCallback(() => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `${sourceName}_compressed.pdf`;
    a.click();
  }, [outputUrl, sourceName]);
  const isRunning = status === "parsing" || status === "compressing";
  const reduction = outputSize > 0 ? (sourceSize - outputSize) / sourceSize : 0;
  const reductionPct = Math.round(reduction * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col bg-background",
      "data-ocid": "pdf_compressor.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground", children: "PDF Compressor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Reduce PDF file size entirely in your browser — nothing leaves your device" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "pdf_compressor.dropzone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onDrop: handleDrop,
                onDragOver: handleDragOver,
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                onKeyDown: (e) => {
                  var _a;
                  if (e.key === "Enter" || e.key === " ")
                    (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: "group w-full flex flex-col items-center justify-center gap-3 p-10 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                children: sourceFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-xs", children: sourceFile.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                      formatBytes(sourceSize),
                      " · Click to replace"
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/15 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-muted-foreground group-hover:text-primary transition-smooth" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Drop a PDF here or click to browse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Supports single or multi-page PDFs" })
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "application/pdf",
                className: "sr-only",
                onChange: handleFilePick,
                "data-ocid": "pdf_compressor.upload_button"
              }
            )
          ] }) }),
          sourceFile && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "pdf_compressor.settings_panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block", children: "Compression Preset" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: advancedMode,
                  onClick: () => setPreset(p.key),
                  "data-ocid": `pdf_compressor.preset_${p.key}`,
                  className: [
                    "relative rounded-lg border p-3 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    advancedMode ? "opacity-40 cursor-not-allowed border-border" : preset === p.key ? "border-primary bg-primary/10" : "border-border hover:border-primary/40 hover:bg-muted/40"
                  ].join(" "),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-medium text-sm text-foreground", children: p.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground mt-0.5 leading-snug", children: p.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: [
                          "absolute top-2 right-2 text-[10px] px-1.5 h-4",
                          !advancedMode && preset === p.key ? "bg-primary text-primary-foreground" : ""
                        ].join(" "),
                        children: p.badge
                      }
                    )
                  ]
                },
                p.key
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "advanced-toggle",
                    className: "font-medium text-sm",
                    children: "Advanced Mode"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Fine-tune quality and render scale" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  id: "advanced-toggle",
                  checked: advancedMode,
                  onCheckedChange: setAdvancedMode,
                  "data-ocid": "pdf_compressor.advanced_toggle"
                }
              )
            ] }),
            advancedMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border border-border rounded-lg p-4 bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "JPEG Quality" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono text-xs text-primary",
                      "data-ocid": "pdf_compressor.quality_value",
                      children: [
                        Math.round(manualQuality * 100),
                        "%"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    min: 10,
                    max: 100,
                    step: 1,
                    value: [Math.round(manualQuality * 100)],
                    onValueChange: ([v]) => setManualQuality(v / 100),
                    "data-ocid": "pdf_compressor.quality_slider"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10% (smallest)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100% (best)" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Render Scale" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono text-xs text-primary",
                      "data-ocid": "pdf_compressor.scale_value",
                      children: [
                        manualScale.toFixed(2),
                        "×"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    min: 50,
                    max: 200,
                    step: 5,
                    value: [Math.round(manualScale * 100)],
                    onValueChange: ([v]) => setManualScale(v / 100),
                    "data-ocid": "pdf_compressor.scale_slider"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0.5× (faster)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2.0× (sharper)" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Effective quality:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                  Math.round(effectiveQuality * 100),
                  "%"
                ] })
              ] }),
              advancedMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Scale:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                    effectiveScale.toFixed(2),
                    "×"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
                onClick: compress,
                disabled: isRunning,
                "data-ocid": "pdf_compressor.compress_button",
                children: isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Compressing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 mr-2" }),
                  "Compress PDF"
                ] })
              }
            )
          ] }) }),
          isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "pdf_compressor.progress_panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: progressLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-primary font-medium", children: [
                progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-primary transition-all duration-300 ease-out rounded-full",
                style: { width: `${progress}%` }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 pt-1", children: ["Parsing PDF", "Rendering pages", "Encoding JPEG"].map(
              (step, i) => {
                const stepThreshold = [0, 5, 50][i];
                const done = progress > stepThreshold + 10;
                const active = progress >= stepThreshold && !done;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: [
                      "flex items-center gap-1.5 text-xs rounded-md px-2 py-1",
                      done ? "text-primary" : active ? "text-foreground" : "text-muted-foreground"
                    ].join(" "),
                    children: [
                      done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 shrink-0" }) : active ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 shrink-0 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full border border-border shrink-0" }),
                      step
                    ]
                  },
                  step
                );
              }
            ) })
          ] }) }),
          isRunning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "pdf_compressor.loading_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-40" })
          ] }),
          status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-destructive/40",
              "data-ocid": "pdf_compressor.error_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-destructive text-sm", children: "Compression failed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "The PDF could not be processed. It may be password-protected or corrupt. Try a different file." })
                ] })
              ] })
            }
          ),
          status === "done" && outputBlob && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-primary/30",
              "data-ocid": "pdf_compressor.success_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Compression complete" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SizeCard,
                    {
                      label: "Original",
                      value: formatBytes(sourceSize),
                      sub: `${sourceName}.pdf`,
                      variant: "neutral"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `font-display text-2xl font-bold ${reductionColor(reduction)}`,
                        "data-ocid": "pdf_compressor.reduction_pct",
                        children: reductionPct > 0 ? `−${reductionPct}%` : `+${Math.abs(reductionPct)}%`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: reductionPct > 0 ? "reduction" : "increase" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SizeCard,
                    {
                      label: "Compressed",
                      value: formatBytes(outputSize),
                      sub: `${sourceName}_compressed.pdf`,
                      variant: reductionPct > 0 ? "success" : "warn"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Compressed size relative to original" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      (outputSize / sourceSize * 100).toFixed(1),
                      "% of original"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-primary rounded-full transition-all duration-700",
                      style: {
                        width: `${Math.min(100, outputSize / sourceSize * 100).toFixed(1)}%`
                      }
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
                    onClick: handleDownload,
                    "data-ocid": "pdf_compressor.download_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-2" }),
                      "Download compressed PDF"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setStatus("idle");
                      setOutputBlob(null);
                      setOutputSize(0);
                      if (outputUrl) URL.revokeObjectURL(outputUrl);
                      setOutputUrl(null);
                    },
                    className: "w-full text-xs text-muted-foreground hover:text-foreground transition-smooth flex items-center justify-center gap-1 py-1",
                    "data-ocid": "pdf_compressor.re_compress_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3" }),
                      "Adjust settings & re-compress",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3" })
                    ]
                  }
                )
              ] })
            }
          )
        ] }) })
      ]
    }
  );
}
function SizeCard({ label, value, sub, variant }) {
  const variantClass = variant === "success" ? "bg-primary/10 border-primary/25" : variant === "warn" ? "bg-accent/10 border-accent/25" : "bg-muted/30 border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border p-3 ${variantClass}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-foreground mt-0.5", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate mt-0.5", children: sub })
  ] });
}
export {
  PdfCompressorPage as default
};
