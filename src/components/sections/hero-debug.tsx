"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step, unit = "", onChange }: SliderProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-[10px] text-stone-400 w-24 shrink-0 truncate">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1 accent-amber-500 cursor-pointer"
      />
      <span className="text-[10px] text-stone-300 w-14 text-right font-mono tabular-nums">
        {value.toFixed(step < 0.1 ? 2 : step < 1 ? 1 : 0)}{unit}
      </span>
    </div>
  );
}

const DEFAULTS = {
  blur: 1,
  contrast: 1.15,
  brightness: 1.1,
  saturate: 0.65,
  scale: 1.0,
  overlayOpacity: 0.1,
  gradientMode: "top-to-bottom" as "top-to-bottom" | "radial" | "uniform",
  noiseOpacity: 0.09,
  noiseFreq: 0.5,
  backdropBlur: 0,
  blendMode: "overlay" as string,
  showVideo: true,
  showOverlay: true,
  showNoise: true,
};

export function HeroDebugPanel({
  onValues,
}: {
  onValues: (v: typeof DEFAULTS) => void;
}) {
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [v, setV] = useState(DEFAULTS);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const [pos, setPos] = useState({ x: -1, y: -1 });

  // Only show on localhost or ?debug
  useEffect(() => {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const hasDebug = new URLSearchParams(window.location.search).has("debug") || window.location.hash === "#debug";
    if (isLocal || hasDebug) setShow(true);
  }, []);

  useEffect(() => {
    if (pos.x === -1) {
      setPos({ x: window.innerWidth - 340, y: Math.max(20, window.innerHeight - 560) });
    }
  }, [pos.x]);

  const update = useCallback(
    (patch: Partial<typeof DEFAULTS>) => {
      setV((prev) => {
        const next = { ...prev, ...patch };
        onValues(next);
        return next;
      });
    },
    [onValues]
  );

  useEffect(() => {
    onValues(v);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setV(DEFAULTS);
    onValues(DEFAULTS);
  };

  const copyCSS = () => {
    const overlayBg =
      v.gradientMode === "top-to-bottom"
        ? `linear-gradient(to bottom, rgba(0,0,0,${(v.overlayOpacity * 0.6).toFixed(2)}) 0%, rgba(0,0,0,${v.overlayOpacity.toFixed(2)}) 50%, rgba(0,0,0,${(v.overlayOpacity * 1.4).toFixed(2)}) 100%)`
        : v.gradientMode === "radial"
          ? `radial-gradient(ellipse at center, rgba(0,0,0,${(v.overlayOpacity * 0.5).toFixed(2)}) 0%, rgba(0,0,0,${v.overlayOpacity.toFixed(2)}) 100%)`
          : `rgba(0,0,0,${v.overlayOpacity.toFixed(2)})`;

    const css = `/* Video layer */
.hero-video {
  filter: blur(${v.blur}px) contrast(${v.contrast}) brightness(${v.brightness}) saturate(${v.saturate});
  transform: scale(${v.scale});
}

/* Gradient overlay */
.hero-overlay {
  background: ${overlayBg};${v.backdropBlur > 0 ? `\n  backdrop-filter: blur(${v.backdropBlur}px);` : ""}
}

/* Noise texture */
.hero-noise {
  opacity: ${v.noiseOpacity};
  mix-blend-mode: ${v.blendMode};
  /* baseFrequency: ${v.noiseFreq} */
}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "SELECT" || (e.target as HTMLElement).tagName === "BUTTON") return;
    dragRef.current = { dragging: true, offsetX: e.clientX - pos.x, offsetY: e.clientY - pos.y };
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.dragging) return;
      setPos({ x: e.clientX - dragRef.current.offsetX, y: e.clientY - dragRef.current.offsetY });
    };
    const onMouseUp = () => { dragRef.current.dragging = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={panelRef}
      onMouseDown={onMouseDown}
      style={{ left: pos.x, top: pos.y, zIndex: 9999 }}
      className="fixed select-none"
    >
      <div className="bg-stone-950/95 backdrop-blur-md border border-stone-700/50 rounded-lg shadow-2xl overflow-hidden"
        style={{ width: collapsed ? 180 : 310 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-stone-800 cursor-move">
          <span className="text-[11px] font-bold text-amber-500 tracking-wide">HERO DEBUG</span>
          <div className="flex gap-1">
            <button onClick={() => setCollapsed(!collapsed)} className="text-[10px] text-stone-500 hover:text-stone-300 px-1 cursor-pointer">
              {collapsed ? "+" : "-"}
            </button>
            <button onClick={() => setShow(false)} className="text-[10px] text-stone-500 hover:text-red-400 px-1 cursor-pointer">
              x
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="px-3 py-2 space-y-3 max-h-[70vh] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
            {/* Video filters */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Video</span>
                <label className="flex items-center gap-1 text-[9px] text-stone-500 cursor-pointer">
                  <input type="checkbox" checked={v.showVideo} onChange={(e) => update({ showVideo: e.target.checked })} className="w-3 h-3 cursor-pointer" />
                  show
                </label>
              </div>
              <div className="space-y-1">
                <Slider label="blur" value={v.blur} min={0} max={3} step={0.1} unit="px" onChange={(n) => update({ blur: n })} />
                <Slider label="contrast" value={v.contrast} min={0.8} max={1.3} step={0.05} onChange={(n) => update({ contrast: n })} />
                <Slider label="brightness" value={v.brightness} min={0.6} max={1.2} step={0.05} onChange={(n) => update({ brightness: n })} />
                <Slider label="saturate" value={v.saturate} min={0.5} max={1.5} step={0.05} onChange={(n) => update({ saturate: n })} />
                <Slider label="scale" value={v.scale} min={1.0} max={1.1} step={0.01} onChange={(n) => update({ scale: n })} />
              </div>
            </div>

            {/* Overlay */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Overlay</span>
                <label className="flex items-center gap-1 text-[9px] text-stone-500 cursor-pointer">
                  <input type="checkbox" checked={v.showOverlay} onChange={(e) => update({ showOverlay: e.target.checked })} className="w-3 h-3 cursor-pointer" />
                  show
                </label>
              </div>
              <div className="space-y-1">
                <Slider label="opacity" value={v.overlayOpacity} min={0} max={0.8} step={0.05} onChange={(n) => update({ overlayOpacity: n })} />
                <Slider label="backdrop blur" value={v.backdropBlur} min={0} max={5} step={0.5} unit="px" onChange={(n) => update({ backdropBlur: n })} />
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-stone-400 w-24 shrink-0">gradient</label>
                  <select
                    value={v.gradientMode}
                    onChange={(e) => update({ gradientMode: e.target.value as typeof v.gradientMode })}
                    className="flex-1 bg-stone-800 text-stone-300 text-[10px] rounded px-1 py-0.5 border border-stone-700 cursor-pointer"
                  >
                    <option value="top-to-bottom">top → bottom</option>
                    <option value="radial">radial center</option>
                    <option value="uniform">uniform</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Noise */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Noise</span>
                <label className="flex items-center gap-1 text-[9px] text-stone-500 cursor-pointer">
                  <input type="checkbox" checked={v.showNoise} onChange={(e) => update({ showNoise: e.target.checked })} className="w-3 h-3 cursor-pointer" />
                  show
                </label>
              </div>
              <div className="space-y-1">
                <Slider label="opacity" value={v.noiseOpacity} min={0} max={0.3} step={0.01} onChange={(n) => update({ noiseOpacity: n })} />
                <Slider label="baseFrequency" value={v.noiseFreq} min={0.4} max={1.2} step={0.05} onChange={(n) => update({ noiseFreq: n })} />
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-stone-400 w-24 shrink-0">blend mode</label>
                  <select
                    value={v.blendMode}
                    onChange={(e) => update({ blendMode: e.target.value })}
                    className="flex-1 bg-stone-800 text-stone-300 text-[10px] rounded px-1 py-0.5 border border-stone-700 cursor-pointer"
                  >
                    {["normal", "overlay", "soft-light", "multiply"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1 border-t border-stone-800">
              <button
                onClick={copyCSS}
                className="flex-1 text-[10px] font-medium py-1.5 rounded bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 transition-colors cursor-pointer"
              >
                {copied ? "Copied!" : "Copy CSS"}
              </button>
              <button
                onClick={reset}
                className="flex-1 text-[10px] font-medium py-1.5 rounded bg-stone-800 text-stone-400 hover:bg-stone-700 transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
