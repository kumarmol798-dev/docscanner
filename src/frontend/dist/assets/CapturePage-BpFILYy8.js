import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, a as Badge, Z as Zap, u as useComposedRefs, b as cn, d as useNavigate, e as useScanStore, f as ue } from "./index-Bl6jr8gF.js";
import { C as CircleAlert } from "./circle-alert-Dt-1ADnV.js";
import { C as Camera } from "./camera-C-ycLu9r.js";
import { L as LoaderCircle, a as Label } from "./label-Dwr1Xaaw.js";
import { P as Primitive, c as createContextScope, a as composeEventHandlers, u as useLayoutEffect2 } from "./index-pyeuiCNz.js";
import { P as Presence, u as useCallbackRef } from "./index-uRdBZryN.js";
import { u as useDirection } from "./index-DlD27myx.js";
import { c as clamp, S as Slider } from "./slider-DBlM_r0n.js";
import { F as FileText } from "./file-text-D9OB-Bw3.js";
import { X } from "./x-C9B0Jur7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 3v1", key: "1asbbs" }],
  ["path", { d: "M12 20v1", key: "1wcdkc" }],
  ["path", { d: "M3 12h1", key: "lp3yf2" }],
  ["path", { d: "M20 12h1", key: "1vloll" }],
  ["path", { d: "m18.364 5.636-.707.707", key: "1hakh0" }],
  ["path", { d: "m6.343 17.657-.707.707", key: "18m9nf" }],
  ["path", { d: "m5.636 5.636.707.707", key: "1xv1c5" }],
  ["path", { d: "m17.657 17.657.707.707", key: "vl76zb" }]
];
const SunMedium = createLucideIcon("sun-medium", __iconNode);
function EdgeOverlay({ isActive, className = "" }) {
  const canvasRef = reactExports.useRef(null);
  const animFrameRef = reactExports.useRef(0);
  const phaseRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    function drawCorner(x, y, dx, dy, size, alpha) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x + dx * size, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * size);
      ctx.strokeStyle = `oklch(0.6 0.18 200 / ${alpha})`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.stroke();
    }
    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!isActive) {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          animFrameRef.current = requestAnimationFrame(draw);
        }
        return;
      }
      phaseRef.current += 0.03;
      const pulse = 0.55 + 0.35 * Math.sin(phaseRef.current);
      const W = canvas.width;
      const H = canvas.height;
      const margin = 0.1;
      const x0 = W * margin;
      const y0 = H * margin;
      const x1 = W * (1 - margin);
      const y1 = H * (1 - margin);
      const cornerLen = Math.min(W, H) * 0.12;
      ctx.fillStyle = "oklch(0.1 0.01 240 / 0.35)";
      ctx.fillRect(0, 0, W, H);
      ctx.clearRect(x0, y0, x1 - x0, y1 - y0);
      ctx.fillStyle = "oklch(0.15 0.01 240 / 0.12)";
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      ctx.setLineDash([8, 5]);
      ctx.strokeStyle = `oklch(0.6 0.18 200 / ${pulse * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(x0, y0, x1 - x0, y1 - y0);
      ctx.stroke();
      ctx.setLineDash([]);
      drawCorner(x0, y0, 1, 1, cornerLen, pulse);
      drawCorner(x1, y0, -1, 1, cornerLen, pulse);
      drawCorner(x0, y1, 1, -1, cornerLen, pulse);
      drawCorner(x1, y1, -1, -1, cornerLen, pulse);
      const scanY = y0 + (y1 - y0) * (phaseRef.current * 0.4 % 1);
      const grad = ctx.createLinearGradient(x0, scanY - 10, x0, scanY + 10);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, `oklch(0.7 0.18 200 / ${pulse * 0.4})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(x0, scanY - 10, x1 - x0, 20);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    }
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!prefersReduced) {
      animFrameRef.current = requestAnimationFrame(draw);
    } else {
      draw();
    }
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [isActive]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: `absolute inset-0 w-full h-full pointer-events-none ${className}`
    }
  );
}
function CameraView({
  videoRef,
  canvasRef,
  isActive,
  isLoading,
  isSupported,
  error,
  quality,
  onStart
}) {
  const lightingLabel = quality.lighting === "good" ? "Good Light" : quality.lighting === "low-light" ? "Low Light" : "Checking...";
  const stabilityLabel = quality.stability === "good" ? "Stable" : quality.stability === "unstable" ? "Move Slower" : "Checking...";
  const lightingColor = quality.lighting === "good" ? "bg-primary/20 text-primary border-primary/30" : quality.lighting === "low-light" ? "bg-accent/20 text-accent border-accent/30" : "bg-muted text-muted-foreground border-border";
  const stabilityColor = quality.stability === "good" ? "bg-primary/20 text-primary border-primary/30" : quality.stability === "unstable" ? "bg-accent/20 text-accent border-accent/30" : "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full h-full bg-black rounded-xl overflow-hidden min-h-0",
      "data-ocid": "camera.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "video",
          {
            ref: videoRef,
            className: "w-full h-full object-cover",
            playsInline: true,
            muted: true,
            style: { display: isActive ? "block" : "none" },
            "aria-label": "Camera preview"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(EdgeOverlay, { isActive }),
        !isActive && !isLoading && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card/90", children: isSupported === false ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2 px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-destructive mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Camera not supported" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your browser doesn't support camera access. Try Chrome or Safari." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Tap to start camera" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Point at your document" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: onStart,
              className: "bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold transition-scan",
              "data-ocid": "camera.start_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 mr-2" }),
                "Start Camera"
              ]
            }
          )
        ] }) }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center bg-card/80",
            "data-ocid": "camera.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-display", children: "Starting camera…" })
            ] })
          }
        ),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card/90 px-6",
            "data-ocid": "camera.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-10 h-10 text-destructive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Camera error" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: error.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: onStart,
                  "data-ocid": "camera.retry_button",
                  className: "border-primary/30 text-primary hover:bg-primary/10",
                  children: "Retry"
                }
              )
            ]
          }
        ),
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute top-3 left-3 flex gap-2",
            "data-ocid": "camera.quality_badges",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `text-xs border transition-scan ${lightingColor}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SunMedium, { className: "w-3 h-3 mr-1" }),
                lightingLabel
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `text-xs border transition-scan ${stabilityColor}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 mr-1" }),
                stabilityLabel
              ] })
            ]
          }
        )
      ]
    }
  );
}
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var SCROLL_AREA_NAME = "ScrollArea";
var [createScrollAreaContext] = createContextScope(SCROLL_AREA_NAME);
var [ScrollAreaProvider, useScrollAreaContext] = createScrollAreaContext(SCROLL_AREA_NAME);
var ScrollArea$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeScrollArea,
      type = "hover",
      dir,
      scrollHideDelay = 600,
      ...scrollAreaProps
    } = props;
    const [scrollArea, setScrollArea] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const [content, setContent] = reactExports.useState(null);
    const [scrollbarX, setScrollbarX] = reactExports.useState(null);
    const [scrollbarY, setScrollbarY] = reactExports.useState(null);
    const [cornerWidth, setCornerWidth] = reactExports.useState(0);
    const [cornerHeight, setCornerHeight] = reactExports.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setScrollArea(node));
    const direction = useDirection(dir);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaProvider,
      {
        scope: __scopeScrollArea,
        type,
        dir: direction,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            ...scrollAreaProps,
            ref: composedRefs,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              ["--radix-scroll-area-corner-width"]: cornerWidth + "px",
              ["--radix-scroll-area-corner-height"]: cornerHeight + "px",
              ...props.style
            }
          }
        )
      }
    );
  }
);
ScrollArea$1.displayName = SCROLL_AREA_NAME;
var VIEWPORT_NAME = "ScrollAreaViewport";
var ScrollAreaViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, children, nonce, ...viewportProps } = props;
    const context = useScrollAreaContext(VIEWPORT_NAME, __scopeScrollArea);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onViewportChange);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...viewportProps,
          ref: composedRefs,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: context.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: context.scrollbarYEnabled ? "scroll" : "hidden",
            ...props.style
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: context.onContentChange, style: { minWidth: "100%", display: "table" }, children })
        }
      )
    ] });
  }
);
ScrollAreaViewport.displayName = VIEWPORT_NAME;
var SCROLLBAR_NAME = "ScrollAreaScrollbar";
var ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = SCROLLBAR_NAME;
var ScrollAreaScrollbarHover = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const scrollArea = context.scrollArea;
    let hideTimer = 0;
    if (scrollArea) {
      const handlePointerEnter = () => {
        window.clearTimeout(hideTimer);
        setVisible(true);
      };
      const handlePointerLeave = () => {
        hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
      };
      scrollArea.addEventListener("pointerenter", handlePointerEnter);
      scrollArea.addEventListener("pointerleave", handlePointerLeave);
      return () => {
        window.clearTimeout(hideTimer);
        scrollArea.removeEventListener("pointerenter", handlePointerEnter);
        scrollArea.removeEventListener("pointerleave", handlePointerLeave);
      };
    }
  }, [context.scrollArea, context.scrollHideDelay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarAuto,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarScroll = reactExports.forwardRef((props, forwardedRef) => {
  const { forceMount, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const isHorizontal = props.orientation === "horizontal";
  const debounceScrollEnd = useDebounceCallback(() => send("SCROLL_END"), 100);
  const [state, send] = useStateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  reactExports.useEffect(() => {
    if (state === "idle") {
      const hideTimer = window.setTimeout(() => send("HIDE"), context.scrollHideDelay);
      return () => window.clearTimeout(hideTimer);
    }
  }, [state, context.scrollHideDelay, send]);
  reactExports.useEffect(() => {
    const viewport = context.viewport;
    const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
    if (viewport) {
      let prevScrollPos = viewport[scrollDirection];
      const handleScroll = () => {
        const scrollPos = viewport[scrollDirection];
        const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
        if (hasScrollInDirectionChanged) {
          send("SCROLL");
          debounceScrollEnd();
        }
        prevScrollPos = scrollPos;
      };
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [context.viewport, isHorizontal, send, debounceScrollEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || state !== "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": state === "hidden" ? "hidden" : "visible",
      ...scrollbarProps,
      ref: forwardedRef,
      onPointerEnter: composeEventHandlers(props.onPointerEnter, () => send("POINTER_ENTER")),
      onPointerLeave: composeEventHandlers(props.onPointerLeave, () => send("POINTER_LEAVE"))
    }
  ) });
});
var ScrollAreaScrollbarAuto = reactExports.forwardRef((props, forwardedRef) => {
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const { forceMount, ...scrollbarProps } = props;
  const [visible, setVisible] = reactExports.useState(false);
  const isHorizontal = props.orientation === "horizontal";
  const handleResize = useDebounceCallback(() => {
    if (context.viewport) {
      const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
      const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
      setVisible(isHorizontal ? isOverflowX : isOverflowY);
    }
  }, 10);
  useResizeObserver(context.viewport, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || visible, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarVisible,
    {
      "data-state": visible ? "visible" : "hidden",
      ...scrollbarProps,
      ref: forwardedRef
    }
  ) });
});
var ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  const commonProps = {
    ...scrollbarProps,
    sizes,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => thumbRef.current = thumb,
    onThumbPointerUp: () => pointerOffsetRef.current = 0,
    onThumbPointerDown: (pointerPos) => pointerOffsetRef.current = pointerPos
  };
  function getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
  }
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
            thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset = getThumbOffsetFromScroll(scrollPos, sizes);
            thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
      }
    );
  }
  return null;
});
var ScrollAreaScrollbarX = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarXChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "horizontal",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        bottom: 0,
        left: context.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: context.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        ["--radix-scroll-area-thumb-width"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollLeft + event.deltaX;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollWidth,
            viewport: context.viewport.offsetWidth,
            scrollbar: {
              size: ref.current.clientWidth,
              paddingStart: toInt(computedStyle.paddingLeft),
              paddingEnd: toInt(computedStyle.paddingRight)
            }
          });
        }
      }
    }
  );
});
var ScrollAreaScrollbarY = reactExports.forwardRef((props, forwardedRef) => {
  const { sizes, onSizesChange, ...scrollbarProps } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, props.__scopeScrollArea);
  const [computedStyle, setComputedStyle] = reactExports.useState();
  const ref = reactExports.useRef(null);
  const composeRefs = useComposedRefs(forwardedRef, ref, context.onScrollbarYChange);
  reactExports.useEffect(() => {
    if (ref.current) setComputedStyle(getComputedStyle(ref.current));
  }, [ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbarImpl,
    {
      "data-orientation": "vertical",
      ...scrollbarProps,
      ref: composeRefs,
      sizes,
      style: {
        top: 0,
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        ["--radix-scroll-area-thumb-height"]: getThumbSize(sizes) + "px",
        ...props.style
      },
      onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
      onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
      onWheelScroll: (event, maxScrollPos) => {
        if (context.viewport) {
          const scrollPos = context.viewport.scrollTop + event.deltaY;
          props.onWheelScroll(scrollPos);
          if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
            event.preventDefault();
          }
        }
      },
      onResize: () => {
        if (ref.current && context.viewport && computedStyle) {
          onSizesChange({
            content: context.viewport.scrollHeight,
            viewport: context.viewport.offsetHeight,
            scrollbar: {
              size: ref.current.clientHeight,
              paddingStart: toInt(computedStyle.paddingTop),
              paddingEnd: toInt(computedStyle.paddingBottom)
            }
          });
        }
      }
    }
  );
});
var [ScrollbarProvider, useScrollbarContext] = createScrollAreaContext(SCROLLBAR_NAME);
var ScrollAreaScrollbarImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeScrollArea,
    sizes,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext(SCROLLBAR_NAME, __scopeScrollArea);
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useComposedRefs(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const viewport = context.viewport;
  const maxScrollPos = sizes.content - sizes.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebounceCallback(onResize, 10);
  function handleDragScroll(event) {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  }
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar == null ? void 0 : scrollbar.contains(element);
      if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      scope: __scopeScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: useCallbackRef(onThumbChange),
      onThumbPointerUp: useCallbackRef(onThumbPointerUp),
      onThumbPositionChange: handleThumbPositionChange,
      onThumbPointerDown: useCallbackRef(onThumbPointerDown),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          ...scrollbarProps,
          ref: composeRefs,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              if (context.viewport) context.viewport.style.scrollBehavior = "auto";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              element.releasePointerCapture(event.pointerId);
            }
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            if (context.viewport) context.viewport.style.scrollBehavior = "";
            rectRef.current = null;
          })
        }
      )
    }
  );
});
var THUMB_NAME = "ScrollAreaThumb";
var ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.__scopeScrollArea);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || scrollbarContext.hasThumb, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumbImpl, { ref: forwardedRef, ...thumbProps }) });
  }
);
var ScrollAreaThumbImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeScrollArea, style, ...thumbProps } = props;
    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = useScrollbarContext(THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange } = scrollbarContext;
    const composedRef = useComposedRefs(
      forwardedRef,
      (node) => scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.current) {
        removeUnlinkedScrollListenerRef.current();
        removeUnlinkedScrollListenerRef.current = void 0;
      }
    }, 100);
    reactExports.useEffect(() => {
      const viewport = scrollAreaContext.viewport;
      if (viewport) {
        const handleScroll = () => {
          debounceScrollEnd();
          if (!removeUnlinkedScrollListenerRef.current) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
            removeUnlinkedScrollListenerRef.current = listener;
            onThumbPositionChange();
          }
        };
        onThumbPositionChange();
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
    }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
        ...thumbProps,
        ref: composedRef,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...style
        },
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
          const thumb = event.target;
          const thumbRect = thumb.getBoundingClientRect();
          const x = event.clientX - thumbRect.left;
          const y = event.clientY - thumbRect.top;
          scrollbarContext.onThumbPointerDown({ x, y });
        }),
        onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
      }
    );
  }
);
ScrollAreaThumb.displayName = THUMB_NAME;
var CORNER_NAME = "ScrollAreaCorner";
var ScrollAreaCorner = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useScrollAreaContext(CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== "scroll" && hasBothScrollbarsVisible;
    return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaCornerImpl, { ...props, ref: forwardedRef }) : null;
  }
);
ScrollAreaCorner.displayName = CORNER_NAME;
var ScrollAreaCornerImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeScrollArea, ...cornerProps } = props;
  const context = useScrollAreaContext(CORNER_NAME, __scopeScrollArea);
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(context.scrollbarX, () => {
    var _a;
    const height2 = ((_a = context.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
    context.onCornerHeightChange(height2);
    setHeight(height2);
  });
  useResizeObserver(context.scrollbarY, () => {
    var _a;
    const width2 = ((_a = context.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
    context.onCornerWidthChange(width2);
    setWidth(width2);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      ...cornerProps,
      ref: forwardedRef,
      style: {
        width,
        height,
        position: "absolute",
        right: context.dir === "ltr" ? 0 : void 0,
        left: context.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...props.style
      }
    }
  ) : null;
});
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll(scrollPos, sizes, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
var addUnlinkedScrollListener = (node, handler = () => {
}) => {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) handler();
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
};
function useDebounceCallback(callback, delay) {
  const handleCallback = useCallbackRef(callback);
  const debounceTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => () => window.clearTimeout(debounceTimerRef.current), []);
  return reactExports.useCallback(() => {
    window.clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(handleCallback, delay);
  }, [handleCallback, delay]);
}
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useLayoutEffect2(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
  }, [element, handleResize]);
}
var Root = ScrollArea$1;
var Viewport = ScrollAreaViewport;
var Corner = ScrollAreaCorner;
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function CapturePageStrip({ pages, onRemove }) {
  const navigate = useNavigate();
  if (pages.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-28 flex items-center justify-center border-t border-border bg-card/60",
        "data-ocid": "capture.strip.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display", children: "Pages you capture will appear here" })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-t border-border bg-card/60 flex-shrink-0",
      "data-ocid": "capture.strip",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide", children: [
            pages.length,
            " page",
            pages.length !== 1 ? "s" : "",
            " captured"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => navigate({ to: "/review" }),
              size: "sm",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-sm transition-scan h-8 px-3",
              "data-ocid": "capture.next_review_button",
              children: [
                "Review",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 ml-1.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "w-full", "data-ocid": "capture.strip.scroll", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 px-4 pb-3", children: pages.map((page, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex-shrink-0 w-16 group",
            "data-ocid": `capture.strip.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] rounded-md overflow-hidden border border-border shadow-scan bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: page.imageDataUrl,
                  alt: `Page ${i + 1}`,
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-center text-[10px] text-muted-foreground mt-0.5 font-mono", children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `Remove page ${i + 1}`,
                  onClick: () => onRemove(page.id),
                  "data-ocid": `capture.strip.remove.${i + 1}`,
                  className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-scan shadow-scan hover:scale-110",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              )
            ]
          },
          page.id
        )) }) })
      ]
    }
  );
}
const FILTERS = [
  { id: "original", label: "Original" },
  { id: "bw", label: "B&W" },
  { id: "greyscale", label: "Greyscale" },
  { id: "enhanced", label: "Enhanced" }
];
function ImageEnhancer({
  page,
  onConfirm,
  onDiscard
}) {
  var _a;
  const [filter, setFilter] = reactExports.useState("original");
  const [brightness, setBrightness] = reactExports.useState(50);
  const [contrast, setContrast] = reactExports.useState(50);
  const [processing, setProcessing] = reactExports.useState(false);
  const canvasRef = reactExports.useRef(null);
  const previewRef = reactExports.useRef(null);
  const applyFilter = reactExports.useCallback(() => {
    const canvas = canvasRef.current;
    const preview = previewRef.current;
    if (!canvas || !preview) return;
    const ctx = canvas.getContext("2d");
    const pctx = preview.getContext("2d");
    if (!ctx || !pctx) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      preview.width = img.width;
      preview.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      const b = (brightness - 50) * 2;
      const c = (contrast - 50) / 50;
      for (let i = 0; i < d.length; i += 4) {
        let r = d[i];
        let g = d[i + 1];
        let bl = d[i + 2];
        if (filter === "bw") {
          const lum = 0.299 * r + 0.587 * g + 0.114 * bl;
          r = g = bl = lum > 128 ? 255 : 0;
        } else if (filter === "greyscale") {
          const grey = 0.299 * r + 0.587 * g + 0.114 * bl;
          r = g = bl = grey;
        } else if (filter === "enhanced") {
          const grey = 0.299 * r + 0.587 * g + 0.114 * bl;
          const boost = grey > 128 ? 1.15 : 0.85;
          r = Math.min(255, r * boost * 1.02);
          g = Math.min(255, g * boost);
          bl = Math.min(255, bl * boost * 0.96);
        }
        r = Math.min(255, Math.max(0, r + b));
        g = Math.min(255, Math.max(0, g + b));
        bl = Math.min(255, Math.max(0, bl + b));
        r = Math.min(255, Math.max(0, (r - 128) * (1 + c) + 128));
        g = Math.min(255, Math.max(0, (g - 128) * (1 + c) + 128));
        bl = Math.min(255, Math.max(0, (bl - 128) * (1 + c) + 128));
        d[i] = r;
        d[i + 1] = g;
        d[i + 2] = bl;
      }
      pctx.putImageData(imageData, 0, 0);
    };
    img.src = page.imageDataUrl;
  }, [page.imageDataUrl, filter, brightness, contrast]);
  reactExports.useEffect(() => {
    setProcessing(true);
    const t = setTimeout(() => {
      applyFilter();
      setProcessing(false);
    }, 120);
    return () => clearTimeout(t);
  }, [applyFilter]);
  function handleConfirm() {
    const preview = previewRef.current;
    if (!preview) {
      onConfirm(page);
      return;
    }
    const dataUrl = preview.toDataURL("image/jpeg", 0.92);
    onConfirm({ ...page, imageDataUrl: dataUrl });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full gap-4", "data-ocid": "enhancer.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide", children: "Filter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", "data-ocid": "enhancer.filter_tabs", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFilter(f.id),
          "data-ocid": `enhancer.filter.${f.id}`,
          className: `px-3 py-1.5 rounded-md text-sm font-display font-medium transition-scan border ${filter === f.id ? "bg-primary text-primary-foreground border-primary/50 shadow-scan" : "bg-muted text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"}`,
          children: f.label
        },
        f.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-display text-muted-foreground", children: "Brightness" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: brightness })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            min: 0,
            max: 100,
            step: 1,
            value: [brightness],
            onValueChange: ([v]) => setBrightness(v),
            "data-ocid": "enhancer.brightness_slider",
            className: "[&_.range-thumb]:bg-primary [&_[data-slot=range]]:bg-primary"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-display text-muted-foreground", children: "Contrast" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: contrast })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Slider,
          {
            min: 0,
            max: 100,
            step: 1,
            value: [contrast],
            onValueChange: ([v]) => setContrast(v),
            "data-ocid": "enhancer.contrast_slider",
            className: "[&_.range-thumb]:bg-primary [&_[data-slot=range]]:bg-primary"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative rounded-lg overflow-hidden bg-muted/40 border border-border min-h-0 flex items-center justify-center", children: [
      processing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 flex items-center justify-center bg-card/70 z-10",
          "data-ocid": "enhancer.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 text-primary animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-display", children: "Processing…" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "canvas",
        {
          ref: previewRef,
          className: "max-w-full max-h-full object-contain rounded",
          "aria-label": "Enhanced preview"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "hidden" }),
      filter !== "original" && !processing && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-2 right-2 bg-primary/20 text-primary border-primary/30 text-xs", children: (_a = FILTERS.find((f) => f.id === filter)) == null ? void 0 : _a.label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onDiscard,
          className: "flex-1 border-destructive/30 text-destructive hover:bg-destructive/10 font-display transition-scan",
          "data-ocid": "enhancer.discard_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-1.5" }),
            "Retake"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: handleConfirm,
          disabled: processing,
          className: "flex-2 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold transition-scan flex-1",
          "data-ocid": "enhancer.confirm_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-1.5" }),
            "Add Page"
          ]
        }
      )
    ] })
  ] });
}
function useCamera() {
  const videoRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const [isActive, setIsActive] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isSupported, setIsSupported] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [quality, setQuality] = reactExports.useState({
    lighting: "checking",
    stability: "checking"
  });
  const qualityIntervalRef = reactExports.useRef(
    null
  );
  const lastPixelSumRef = reactExports.useRef(0);
  const motionFramesRef = reactExports.useRef(0);
  const frameCountRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    var _a;
    setIsSupported(!!((_a = navigator.mediaDevices) == null ? void 0 : _a.getUserMedia));
  }, []);
  const analyzeQuality = reactExports.useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = 80;
    const h = 60;
    canvas.width = w;
    canvas.height = h;
    try {
      ctx.drawImage(video, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let pixelSum = 0;
      for (let i = 0; i < data.length; i += 16) {
        pixelSum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      const avgBrightness = pixelSum / (data.length / 16);
      const lighting = avgBrightness > 55 ? "good" : "low-light";
      const diff = Math.abs(pixelSum - lastPixelSumRef.current);
      lastPixelSumRef.current = pixelSum;
      if (diff > 5e3) {
        motionFramesRef.current = Math.min(motionFramesRef.current + 1, 5);
      } else {
        motionFramesRef.current = Math.max(motionFramesRef.current - 1, 0);
      }
      const stability = motionFramesRef.current >= 3 ? "unstable" : "good";
      frameCountRef.current += 1;
      if (frameCountRef.current > 2) {
        setQuality({ lighting, stability });
      }
    } catch {
    }
  }, []);
  const stopCamera = reactExports.useCallback(async () => {
    if (qualityIntervalRef.current) clearInterval(qualityIntervalRef.current);
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setQuality({ lighting: "checking", stability: "checking" });
  }, []);
  const startCamera = reactExports.useCallback(async () => {
    var _a;
    if (!((_a = navigator.mediaDevices) == null ? void 0 : _a.getUserMedia)) {
      setIsSupported(false);
      return false;
    }
    setIsLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      setIsLoading(false);
      frameCountRef.current = 0;
      motionFramesRef.current = 0;
      qualityIntervalRef.current = setInterval(analyzeQuality, 800);
      return true;
    } catch (err) {
      setIsLoading(false);
      const domErr = err;
      if (domErr.name === "NotAllowedError" || domErr.name === "PermissionDeniedError") {
        setError({
          type: "permission",
          message: "Camera permission denied. Please allow camera access in your browser settings."
        });
      } else if (domErr.name === "NotFoundError" || domErr.name === "DevicesNotFoundError") {
        setError({
          type: "not-found",
          message: "No camera found. Connect a camera and try again."
        });
      } else {
        setError({
          type: "unknown",
          message: "Could not start camera. Please try again."
        });
      }
      return false;
    }
  }, [analyzeQuality]);
  const capturePhoto = reactExports.useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isActive) return null;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0);
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          resolve(
            new File([blob], `scan-${Date.now()}.jpg`, { type: "image/jpeg" })
          );
        },
        "image/jpeg",
        0.92
      );
    });
  }, [isActive]);
  reactExports.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);
  return {
    isActive,
    isSupported,
    isLoading,
    error,
    quality,
    startCamera,
    stopCamera,
    capturePhoto,
    videoRef,
    canvasRef
  };
}
function CapturePage() {
  const { pages, addPage, removePage } = useScanStore();
  const [step, setStep] = reactExports.useState("preview");
  const [pendingPage, setPendingPage] = reactExports.useState(null);
  const {
    videoRef,
    canvasRef,
    isActive,
    isLoading,
    isSupported,
    error,
    quality,
    startCamera,
    capturePhoto
  } = useCamera();
  const handleCapture = reactExports.useCallback(async () => {
    if (!isActive) return;
    const file = await capturePhoto();
    if (!file) {
      ue.error("Could not capture photo. Try again.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a;
      const imageDataUrl = (_a = ev.target) == null ? void 0 : _a.result;
      const page = {
        id: `scan-${Date.now()}`,
        imageDataUrl,
        rotation: 0,
        file
      };
      setPendingPage(page);
      setStep("enhance");
    };
    reader.readAsDataURL(file);
  }, [isActive, capturePhoto]);
  const handleEnhancerConfirm = reactExports.useCallback(
    (updatedPage) => {
      addPage(updatedPage);
      setPendingPage(null);
      setStep("preview");
      ue.success("Page added to session");
    },
    [addPage]
  );
  const handleEnhancerDiscard = reactExports.useCallback(() => {
    setPendingPage(null);
    setStep("preview");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 flex flex-col min-h-0 overflow-hidden",
      "data-ocid": "capture.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex min-h-0 gap-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex flex-col min-h-0 transition-scan ${step === "enhance" ? "w-1/2 p-3" : "flex-1 p-3"}`,
              "data-ocid": "capture.camera_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CameraView,
                  {
                    videoRef,
                    canvasRef,
                    isActive,
                    isLoading,
                    isSupported,
                    error,
                    quality,
                    onStart: startCamera
                  }
                ) }),
                isActive && step === "preview" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 pt-3 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Capture document",
                    onClick: handleCapture,
                    "data-ocid": "capture.capture_button",
                    className: "w-16 h-16 rounded-full bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground flex items-center justify-center shadow-scan transition-scan border-4 border-primary/30",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/60 block" })
                  }
                ) })
              ]
            }
          ),
          step === "enhance" && pendingPage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-1/2 flex flex-col border-l border-border bg-card/40 p-4 min-h-0",
              "data-ocid": "capture.enhancer_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Adjust Image" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ImageEnhancer,
                  {
                    page: pendingPage,
                    onConfirm: handleEnhancerConfirm,
                    onDiscard: handleEnhancerDiscard
                  }
                ) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CapturePageStrip, { pages, onRemove: removePage })
      ]
    }
  );
}
export {
  CapturePage as default
};
