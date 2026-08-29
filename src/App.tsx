import { useState, useRef, useCallback, useEffect, MouseEvent as ReactMouseEvent, FormEvent } from "react";

const assetPathPrefix = "/assets";
const imgHero = `${assetPathPrefix}/dd176.png`;
const imgCorner = `${assetPathPrefix}/6de3d.png`;
const imgFashion1 = `${assetPathPrefix}/b791c.png`;
const imgFashion2 = `${assetPathPrefix}/eb33f.png`;
const imgEcomm1 = `${assetPathPrefix}/7e853.png`;
const imgEcomm2 = `${assetPathPrefix}/0734a.png`;
const imgArt1 = `${assetPathPrefix}/327bb.png`;
const imgArt2 = `${assetPathPrefix}/935d3.png`;
const imgLogo = `${assetPathPrefix}/ab517.svg`;

/* ── Submit Success overlay ── */
const LOG_LINES = [
  { delay: 0,    text: "INTAKE_PROTOCOL // BRIEF RECEIVED",          accent: false, green: false },
  { delay: 400,  text: "SYS: PARSING PARAMETERS...",                  accent: false, green: false },
  { delay: 900,  text: "ART_DIRECTOR_CORE // ANALYZING BRIEF",        accent: false, green: false },
  { delay: 1400, text: "ENGAGEMENT FORMAT // LOCKED",                  accent: true,  green: false },
  { delay: 1900, text: "SPEC_SHEET GENERATION // QUEUED",              accent: false, green: false },
  { delay: 2500, text: "CLIENT_PROFILE // CREATED & INDEXED",          accent: false, green: false },
  { delay: 3100, text: "OUTBOUND_CONTACT // SCHEDULED <24H",           accent: true,  green: true  },
  { delay: 3700, text: "SYS://STANDBY — WE'LL REACH YOU SHORTLY.",    accent: true,  green: true  },
];

function SubmitSuccess({ plan, onReset }: { plan: string | null; onReset: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    LOG_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleCount(i + 1), line.delay);
    });
    const start = Date.now();
    const totalDuration = 4200;
    const raf = () => {
      const p = Math.min((Date.now() - start) / totalDuration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 py-4">
      {/* Terminal window */}
      <div className="border border-[rgba(26,26,26,0.24)] rounded-[2px] overflow-hidden">
        {/* Title bar */}
        <div className="bg-[#1a1a1a] flex items-center justify-between px-4 py-2">
          <div className="flex gap-1.5 items-center">
            <div className="size-2.5 rounded-full bg-[#ff4800]" />
            <div className="size-2.5 rounded-full bg-[#70706b]" />
            <div className="size-2.5 rounded-full bg-[#70706b]" />
          </div>
          <span className="font-['Geist_Mono',monospace] text-white/40 text-[9px] tracking-widest">
            AFONI_SYS // INTAKE_TERMINAL v4.2
          </span>
          <div className="flex gap-1.5 items-center">
            <div className="bg-[#22c55e] opacity-70 rounded-full size-[6px]" />
            <span className="font-['Geist_Mono',monospace] text-[#22c55e]/70 text-[9px]">ONLINE</span>
          </div>
        </div>

        {/* Log body */}
        <div className="bg-[#0d0d0d] px-6 py-5 flex flex-col gap-2 min-h-[200px]">
          {plan && (
            <p className="font-['Geist_Mono',monospace] text-white/30 text-[9px] mb-1">
              $ EXECUTE intake --format="{plan}" --priority=high
            </p>
          )}
          {LOG_LINES.slice(0, visibleCount).map((line, i) => (
            <div key={i} className="flex gap-3 items-start" style={{ animation: "slideIn 0.25s ease-out" }}>
              <span className="font-['Geist_Mono',monospace] text-[#ff4800]/60 text-[9px] shrink-0 mt-px">▶</span>
              <span
                className={`font-['Geist_Mono',monospace] text-[10px] leading-[16px] ${
                  line.green ? "text-[#22c55e]" : line.accent ? "text-white/70" : "text-white/70"
                }`}
              >
                {line.text}
              </span>
            </div>
          ))}
          {visibleCount < LOG_LINES.length && (
            <div className="flex gap-3 items-center">
              <span className="font-['Geist_Mono',monospace] text-[#ff4800]/60 text-[9px]">▶</span>
              <span
                className="font-['Geist_Mono',monospace] text-white/40 text-[10px]"
                style={{ opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}
              >
                █
              </span>
            </div>
          )}
          {visibleCount >= LOG_LINES.length && (
            <div className="flex gap-3 items-center mt-1">
              <span className="font-['Geist_Mono',monospace] text-[#22c55e]/80 text-[9px]">$</span>
              <span
                className="font-['Geist_Mono',monospace] text-[#22c55e]/60 text-[10px]"
                style={{ opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}
              >
                █
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="bg-[#111] h-[3px] w-full">
          <div
            className="h-full bg-[#ff4800] transition-none"
            style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
          />
        </div>
      </div>

      {/* Bottom message */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{ opacity: visibleCount >= LOG_LINES.length ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <div className="flex flex-col gap-1">
          <p className="theme-text font-['Outfit',sans-serif] font-extrabold text-[22px] leading-tight">
            Brief received. We're on it.
          </p>
          <p className="theme-muted font-['Geist_Mono',monospace] text-[10px]">
            RESPONSE WINDOW // &lt;24H — CHECK YOUR INBOX
          </p>
        </div>
        <button
          onClick={onReset}
          className="font-['Geist_Mono',monospace] text-[#ff4800] text-[11px] tracking-[0.5px] border border-[#ff4800] px-5 py-3 rounded-[2px] hover:bg-[#ff4800] hover:text-[#0d0d0d] transition-all shrink-0"
        >
          [ SUBMIT ANOTHER → ]
        </button>
      </div>
    </div>
  );
}

/* ── Lightbox ── */
function Lightbox({ src, code, onClose }: { src: string; code: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[92vw] max-h-[88vh] flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt=""
          className="max-w-full max-h-[82vh] object-contain rounded-[2px] select-none"
          draggable={false}
        />
        <div className="flex items-center justify-between">
          <span className="font-['Geist_Mono',monospace] text-white/60 text-[10px]">{code}</span>
          <button
            onClick={onClose}
            className="font-['Geist_Mono',monospace] text-[#ff4800] text-[11px] tracking-[0.5px] hover:text-white transition-colors"
          >
            [ CLOSE × ]
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Project form modal ── */
function ProjectModal({ onClose }: { onClose: () => void }) {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", brief: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; brief?: string }>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const validate = () => {
    const e: typeof errors = {};
    if (!formData.name.trim()) e.name = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Valid email required";
    if (!formData.brief.trim()) e.brief = "Required";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1400);
  };

  const inputCls = (err?: string) =>
    `w-full bg-transparent border-b py-3 font-['Outfit',sans-serif] text-[14px] theme-text outline-none transition-colors ${
      err ? "border-red-400" : "theme-border focus:border-[#ff4800]"
    }`;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(13,13,13,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="theme-bg w-full max-w-[720px] rounded-[2px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.4)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalIn 0.28s cubic-bezier(0.34,1.2,0.64,1)" }}
      >
        {/* Header */}
        <div className="bg-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#ff4800] w-1 h-4 rounded-full" />
            <span className="font-['Outfit',sans-serif] font-extrabold text-white text-[17px]">Start a Project</span>
            <span className="font-['Geist_Mono',monospace] text-white/30 text-[9px] hidden sm:block">// INTAKE PROTOCOL</span>
          </div>
          <button
            onClick={onClose}
            className="font-['Geist_Mono',monospace] text-white/40 text-[11px] hover:text-[#ff4800] transition-colors tracking-[0.5px]"
          >
            [ ESC / CLOSE × ]
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 flex flex-col gap-5">
          {formState === "sent" ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="bg-[#ff4800] rounded-full p-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 7" stroke="#0d0d0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-['Outfit',sans-serif] font-extrabold theme-text text-[22px]">Brief received. We're on it.</p>
              <p className="font-['Geist_Mono',monospace] theme-muted text-[10px]">RESPONSE WINDOW // &lt;24H — CHECK YOUR INBOX</p>
              <button
                onClick={onClose}
                className="mt-2 font-['Geist_Mono',monospace] text-[#ff4800] text-[11px] border border-[#ff4800] px-6 py-3 rounded-[2px] hover:bg-[#ff4800] hover:text-[#0d0d0d] transition-all"
              >
                [ CLOSE × ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Geist_Mono',monospace] font-semibold theme-muted text-[9px] tracking-[0.5px]">NAME / ORGANIZATION</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Your name or company..."
                    className={inputCls(errors.name)}
                  />
                  {errors.name && <span className="font-['Geist_Mono',monospace] text-red-500 text-[9px]">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Geist_Mono',monospace] font-semibold theme-muted text-[9px] tracking-[0.5px]">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    placeholder="you@company.com"
                    className={inputCls(errors.email)}
                  />
                  {errors.email && <span className="font-['Geist_Mono',monospace] text-red-500 text-[9px]">{errors.email}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-['Geist_Mono',monospace] font-semibold theme-muted text-[9px] tracking-[0.5px]">PROJECT BRIEF</label>
                <textarea
                  rows={4}
                  value={formData.brief}
                  onChange={(e) => setFormData((d) => ({ ...d, brief: e.target.value }))}
                  placeholder="Describe your concept — product, mood, references, deliverables, deadline..."
                  className={`${inputCls(errors.brief)} resize-none`}
                />
                {errors.brief && <span className="font-['Geist_Mono',monospace] text-red-500 text-[9px]">{errors.brief}</span>}
              </div>
              <div className="flex flex-col items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full bg-[#ff4800] text-[#0d0d0d] font-['Geist_Mono',monospace] font-bold text-[14px] tracking-[1px] py-5 rounded-[2px] hover:bg-[#e03e00] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] transition-all shadow-[0_4px_24px_rgba(255,72,0,0.35)] hover:shadow-[0_6px_32px_rgba(255,72,0,0.5)]"
                >
                  {formState === "sending" ? "SENDING..." : "INITIATE_PROJECT →"}
                </button>
                <span className="font-['Geist_Mono',monospace] theme-muted text-[9px]">No commitment required.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Parallax tilt hook ── */
function useParallaxTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ rx: -dy * 5, ry: dx * 5 });
  }, []);

  const onMouseLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), []);

  const style = {
    transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
    transition: "transform 0.15s ease-out",
    transformStyle: "preserve-3d" as const,
  };

  return { ref, style, onMouseMove, onMouseLeave };
}

/* ── Gallery card ── */
function GalleryCard({ src, code, index, title, height = 280 }: { src: string; code: string; index: string; title: string; height?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [imgShift, setImgShift] = useState({ x: 0, y: 0 });
  const [lightbox, setLightbox] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTransform(`perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`);
    setImgShift({ x: dx * 14, y: dy * 14 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg)");
    setImgShift({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setLightbox(true)}
        style={{ transform, transition: "transform 0.12s ease-out", transformStyle: "preserve-3d", height }}
        className="relative overflow-hidden rounded-[2px] cursor-zoom-in group"
      >
        {/* Image */}
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            transform: `translate(${imgShift.x}px, ${imgShift.y}px) scale(1.1)`,
            transition: "transform 0.15s ease-out",
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Dark overlay — deepens on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{ background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)" : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.1) 100%)" }}
        />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-['Geist_Mono',monospace] text-white/50 text-[9px] tracking-wider">{index}</span>
            <span
              className="font-['Outfit',sans-serif] font-extrabold text-white leading-tight transition-all duration-200"
              style={{ fontSize: "clamp(13px, 1.3vw, 17px)" }}
            >
              {title}
            </span>
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 border border-white/30 rounded-[2px] shrink-0 transition-all duration-200"
            style={{ background: hovered ? "#ff4800" : "rgba(255,255,255,0.08)", borderColor: hovered ? "#ff4800" : "rgba(255,255,255,0.3)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5l7-7M9.5 9.5V2.5H2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      {lightbox && <Lightbox src={src} code={code} onClose={() => setLightbox(false)} />}
    </>
  );
}

/* ── Video Hero Player ── */
// Replace src values with your own video URLs or local /assets/*.mp4 files
const VIDEOS = [
  {
    src: null,
    poster: imgHero,
    label: "CAMPAIGN_001",
    meta: "CAM: HASSELBLAD H6D-100C",
    optics: "OPTICS: HC 80mm f/2.2 // AI SIMULATION v0.98b",
    coord: "SYS_COORD // X: 240 / Y: 118",
    state: "RENDER STATE: v4.2 // FINAL",
  },
  {
    src: null,
    poster: imgFashion1,
    label: "CAMPAIGN_002",
    meta: "CAM: PHASE ONE XF IQ4",
    optics: "OPTICS: 80mm f/2.8 // AI SIMULATION v0.99a",
    coord: "SYS_COORD // X: 312 / Y: 204",
    state: "RENDER STATE: v4.3 // FINAL",
  },
  {
    src: null,
    poster: imgArt1,
    label: "CAMPAIGN_003",
    meta: "CAM: ARRI ALEXA 35",
    optics: "OPTICS: ZEISS 50mm T1.5 // AI SIMULATION v1.0",
    coord: "SYS_COORD // X: 180 / Y: 96",
    state: "RENDER STATE: v4.4 // FINAL",
  },
];

function VideoHero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = VIDEOS[index];
  const hasSource = !!current.src;

  const goTo = (next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setProgress(0);
    setHasError(false);
    setPlaying(false);
    setTimeout(() => {
      setIndex(next);
      setTransitioning(false);
    }, 320);
  };

  const prev = () => goTo((index - 1 + VIDEOS.length) % VIDEOS.length);
  const next = () => goTo((index + 1) % VIDEOS.length);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v || !hasSource || hasError) return;
    playing ? v.pause() : v.play().catch(() => setHasError(true));
    setPlaying(!playing);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasSource) return;
    v.currentTime = 0;
    setPlaying(false);
  }, [index]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress(v.duration ? v.currentTime / v.duration : 0);
    const onEnd = () => goTo((index + 1) % VIDEOS.length);
    const onErr = () => { setHasError(true); setPlaying(false); };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    v.addEventListener("error", onErr);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("error", onErr);
    };
  }, [index]);

  const seekTo = (e: ReactMouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !hasSource || hasError) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  return (
    <div
      className="relative rounded-[2px] overflow-hidden w-full group"
      style={{ height: "clamp(240px, 33vw, 480px)" }}
    >
      {/* Poster / fallback image — always rendered beneath */}
      <img
        src={current.poster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover rounded-[2px] pointer-events-none"
        style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.32s ease" }}
      />

      {/* Video — rendered only when a src exists */}
      {hasSource && !hasError && (
        <video
          key={current.src}
          ref={videoRef}
          src={current.src ?? undefined}
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-[2px]"
          style={{ opacity: transitioning ? 0 : 1, transition: "opacity 0.32s ease" }}
          onError={() => { setHasError(true); setPlaying(false); }}
        />
      )}

      {/* "Awaiting upload" badge — shown when no src or error */}
      {(!hasSource || hasError) && !transitioning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[rgba(13,13,13,0.65)] border border-white/15 rounded-[2px] px-4 py-2 flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v5M3.5 3.5L6 1l2.5 2.5" stroke="#ff4800" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 8.5v1A1 1 0 002.5 10.5h7a1 1 0 001-1v-1" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="font-['Geist_Mono',monospace] text-white/60 text-[9px] tracking-[0.5px]">AWAITING VIDEO SOURCE</span>
          </div>
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-[2px]" />

      {/* Corner markers */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/60" />
      <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/60" />
      <div className="absolute bottom-[48px] left-2 w-3 h-3 border-l border-b border-white/60" />
      <div className="absolute bottom-[48px] right-2 w-3 h-3 border-r border-b border-white/60" />

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <div className="bg-[rgba(26,26,26,0.8)] border border-white/20 px-2 py-1 rounded-[2px]">
          <span className="font-['Geist_Mono',monospace] text-white text-[9px]">[{current.state}]</span>
        </div>
        <div className="flex gap-3 items-center">
          {/* Slide counter */}
          <div className="bg-[rgba(26,26,26,0.7)] border border-white/10 px-2 py-1 rounded-[2px] flex gap-1.5 items-center">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === index ? "bg-[#ff4800] w-4 h-1.5" : "bg-white/40 size-1.5 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <span className="font-['Geist_Mono',monospace] text-[#ff4d00] text-[10px]">{current.label}</span>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[rgba(26,26,26,0.7)] border border-white/20 rounded-[2px] w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff4800] hover:border-[#ff4800]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[rgba(26,26,26,0.7)] border border-white/20 rounded-[2px] w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff4800] hover:border-[#ff4800]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Bottom meta */}
      <div className="absolute bottom-[48px] left-4 right-4 flex items-end justify-between pb-2">
        <div className="flex flex-col gap-0.5">
          <span className="font-['Geist_Mono',monospace] font-semibold text-white text-[11px]">{current.meta}</span>
          <span className="font-['Geist_Mono',monospace] text-white/70 text-[9px]">{current.optics}</span>
        </div>
        <span className="font-['Geist_Mono',monospace] text-white text-[10px]">{current.coord}</span>
      </div>

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[rgba(13,13,13,0.85)] border-t border-white/10 px-4 h-[44px] flex items-center gap-3">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center size-7 rounded-[2px] border border-white/20 hover:border-[#ff4800] transition-colors shrink-0"
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1.5" y="1" width="2.5" height="8" rx="0.5" fill="white"/>
              <rect x="6" y="1" width="2.5" height="8" rx="0.5" fill="white"/>
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 1.5l7 3.5-7 3.5V1.5Z" fill="white"/>
            </svg>
          )}
        </button>

        {/* Progress bar */}
        <div
          className="flex-1 h-[3px] bg-white/20 rounded-full cursor-pointer relative"
          onClick={seekTo}
        >
          <div
            className="absolute left-0 top-0 h-full bg-[#ff4800] rounded-full transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Mute */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center justify-center size-7 rounded-[2px] border border-white/20 hover:border-[#ff4800] transition-colors shrink-0"
        >
          {muted ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4H4.5L7.5 1.5v9L4.5 8H2V4Z" stroke="white/50" fill="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
              <path d="M9 4.5l2 3M11 4.5l-2 3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4H4.5L7.5 1.5v9L4.5 8H2V4Z" stroke="white" fill="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
              <path d="M9.5 4.5c.8.5 1.2 1.2 1.2 1.5s-.4 1-.8 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          )}
        </button>

        {/* Index label */}
        <span className="font-['Geist_Mono',monospace] text-white/40 text-[9px] shrink-0 hidden sm:block">
          {String(index + 1).padStart(2, "0")} / {String(VIDEOS.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}


/* ── Service card with parallax ── */
function ServiceCard({ num, type, title, desc, features, isSelected, justAdded, onAdd }: {
  num: string; type: string; title: string; desc: string; features: string[];
  isSelected: boolean; justAdded: boolean; onAdd: () => void;
}) {
  const { ref, style: tiltStyle, onMouseMove, onMouseLeave } = useParallaxTilt();

  return (
    <div
      ref={ref}
      onClick={onAdd}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        ...tiltStyle,
        boxShadow: isSelected ? "0 0 0 2px #ff4800" : undefined,
        transform: justAdded
          ? "perspective(900px) translateY(-4px)"
          : tiltStyle.transform,
        transition: justAdded
          ? "box-shadow 0.2s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background-color 0.45s, border-color 0.45s"
          : tiltStyle.transition + ", box-shadow 0.2s, background-color 0.45s, border-color 0.45s",
        backgroundColor: "var(--bg-alt)",
        borderColor: isSelected ? "#ff4800" : "var(--border)",
      }}
      className="relative rounded-[2px] flex flex-col gap-6 p-8 cursor-pointer border"
    >
      {isSelected && (
        <div className="absolute top-3 right-3 bg-[#ff4800] text-[#0d0d0d] font-['Geist_Mono',monospace] font-bold text-[9px] px-2 py-0.5 rounded-[2px] tracking-[0.5px]">
          SELECTED ✓
        </div>
      )}
      {justAdded && (
        <div className="absolute inset-0 rounded-[2px] bg-[#ff4800]/10 pointer-events-none" style={{ animation: "fadeOut 1.8s forwards" }} />
      )}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Geist_Mono',monospace] font-bold text-[#ff4d00] text-[14px]">{num}</span>
          <span className="theme-muted font-['Geist_Mono',monospace] text-[9px]">{type}</span>
        </div>
        <h3 className="theme-text font-['Outfit',sans-serif] font-extrabold text-[22px] leading-[33px]">{title}</h3>
      </div>
      <div className="theme-border h-px w-full border-t" />
      <div className="flex flex-col gap-4 flex-1">
        <p className="theme-muted font-['Outfit',sans-serif] text-[14px] leading-[21px]">{desc}</p>
        <div className="flex flex-col gap-2">
          {features.map((f) => (
            <div key={f} className="flex gap-2.5 items-center">
              <div className="rounded-[2px] size-1 shrink-0 bg-[#ff4800]" />
              <span className="theme-text font-['Geist_Mono',monospace] text-[10px]">{f}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div />
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(); }}
          className="font-['Geist_Mono',monospace] text-[#ff4800] text-[14px] tracking-[0.5px] py-1 hover:text-[#e03e00] active:scale-95 transition-colors"
        >
          {isSelected ? "[ REMOVE − ]" : "[ ENQUIRE → ]"}
        </button>
      </div>
    </div>
  );
}

type FormState = "idle" | "sending" | "sent" | "error";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Visit our studio",
    desc: "Land on the site — explore the vibe, the aesthetic, the way we think.",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 9.5L10 3l7 6.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.5 8v8.5h3.25V12.5h2.5v4H14.5V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: "02",
    title: "Know us & our work",
    desc: "Dive into our portfolio, campaigns, and creative approach.",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="10" height="12" rx="1" stroke={color} strokeWidth="1.5"/>
        <path d="M12 6.5l5 3.5-5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: "03",
    title: "Pick a format",
    desc: "Single project, retainer, or enterprise — choose what fits your scope.",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="9" y="3" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="2" y="12" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="9" y="12" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
        <path d="M16.5 5.5h-2M15.5 4.5v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 14.5h3M15.5 13v3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: "04",
    title: "Send the brief",
    desc: "Fill the form — we'll reach out within 24h with a plan and pricing.",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2.5 5.5l7.5 5 7.5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="4" width="16" height="12" rx="1.5" stroke={color} strokeWidth="1.5"/>
        <path d="M7 11l2.5 2L13 9" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [addedPlan, setAddedPlan] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", brief: "" });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; brief?: string }>({});
  const [activeStep, setActiveStep] = useState(0);

  const refAbout = useRef<HTMLElement>(null);
  const refService = useRef<HTMLElement>(null);
  const refContact = useRef<HTMLElement>(null);
  const refAboutHeading = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = refAboutHeading.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveStep(s => Math.max(s, 1)); },
      { threshold: 1.0, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = refService.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveStep(s => Math.max(s, 2)); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);


  const sectionRefs = {
    capabilities: refAbout,
    works: refService,
    contact: refContact,
  };

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const validate = () => {
    const errors: typeof formErrors = {};
    if (!formData.name.trim()) errors.name = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Valid email required";
    if (!formData.brief.trim()) errors.brief = "Required";
    return errors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setFormState("sending");
    setTimeout(() => {
      setFormState("sent");
      setFormData({ name: "", email: "", brief: "" });
      setActiveStep(3);
    }, 1400);
  };

  const inputBase =
    "w-full bg-transparent border-b py-[10px] font-['Outfit',sans-serif] text-[14px] outline-none focus:border-[#ff4800] transition-colors theme-text";

  return (
    <div data-theme={darkMode ? "dark" : "light"} className="theme-root min-h-screen w-full font-['Geist_Mono',monospace]">
      {/* Header */}
      <header className="theme-bg theme-border-s border-b sticky top-0 z-50">
        <div className="flex h-[78px] items-center justify-between px-9 md:px-[72px] max-w-[1440px] mx-auto w-full">
          <div className="h-[78px] w-[180px] relative flex items-center">
            <img src={imgLogo} alt="AFONI STUDIO" className="h-[117px] w-[207px] object-contain" style={{ filter: darkMode ? "invert(1)" : "none", transition: "filter 0.45s" }} />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-12 items-center">
            <div className="flex gap-3 items-center">
              <div className="bg-[#22c55e] opacity-60 rounded-full size-[9px]" />
              <span className="theme-text font-semibold text-[15px] tracking-wide">SYS://ONLINE</span>
              {/* Theme toggle */}
              <button
                onClick={() => setDarkMode(d => !d)}
                className="ml-2 flex items-center gap-1.5 px-2.5 py-1 cursor-pointer hover:text-[#e03e00] active:scale-95 transition-all"
              >
                <span
                  className="inline-block"
                  style={{ transform: darkMode ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}
                >
                  {darkMode ? (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="5.5" cy="5.5" r="2.5" stroke="#ff4800" strokeWidth="1.2"/>
                      <path d="M5.5 1v1M5.5 9v1M1 5.5h1M9 5.5h1M2.5 2.5l.7.7M7.8 7.8l.7.7M2.5 8.5l.7-.7M7.8 3.2l.7-.7" stroke="#ff4800" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M9 6.5A4 4 0 014.5 2a4 4 0 100 8 4 4 0 004.5-3.5z" stroke="#ff4800" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
                <span className="font-['Geist_Mono',monospace] text-[#ff4800] text-[11px] tracking-[0.5px]">
                  {darkMode ? "[ LIGHT ]" : "[ DARK ]"}
                </span>
              </button>
            </div>
            <nav className="flex gap-7 items-center">
              {(["capabilities", "works", "contact"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => scrollTo(sectionRefs[key])}
                  className="font-medium text-[16px] uppercase tracking-wide cursor-pointer transition-all active:scale-95"
                  style={{ color: "var(--text)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#ff4800")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
                >
                  {key === "capabilities" ? "ABOUT US" : key === "works" ? "SERVICE" : "CONTACT"}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-3"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className={`block w-7 h-0.5 theme-bg-dark transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-7 h-0.5 theme-bg-dark transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-7 h-0.5 theme-bg-dark transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden theme-bg theme-border-s border-t px-9 py-6 flex flex-col gap-5">
            {(["capabilities", "works", "contact"] as const).map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(sectionRefs[key])}
                className="text-left font-medium text-[18px] uppercase tracking-wide transition-all active:scale-95"
                style={{ color: "var(--text)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ff4800")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text)")}
              >
                {key === "capabilities" ? "ABOUT US" : key === "works" ? "SERVICE" : "CONTACT"}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="theme-border border-b flex flex-col gap-6 items-end justify-center pb-10 pt-5 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex gap-3 items-center flex-wrap">
              <span className="font-['Geist_Mono',monospace] font-normal text-[#70706b] text-[10px]">[LOC: BERLIN.DE]</span>
              <span className="font-['Geist_Mono',monospace] font-normal text-[#70706b] text-[10px]">[EST: 2025]</span>
              <span className="font-['Geist_Mono',monospace] font-normal text-[#ff4d00] text-[10px]">[REF // 001-A]</span>
            </div>
            <h1 className="theme-text font-['Outfit',sans-serif] font-extrabold text-3xl md:text-5xl leading-tight">
              <span className="text-[#ff4800]">IDEAS</span> INTO<br />VISUALS.
            </h1>
          </div>
        </div>

        {/* Hero video player */}
        <VideoHero />

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#ff4800] text-[#0d0d0d] font-['Geist_Mono',monospace] font-bold text-[14px] tracking-[1px] px-10 py-5 rounded-[2px] cursor-pointer hover:bg-[#e03e00] active:scale-[0.97] transition-all shadow-[0_4px_24px_rgba(255,72,0,0.35)] hover:shadow-[0_6px_32px_rgba(255,72,0,0.5)]"
        >
          INITIATE_PROJECT
        </button>
      </section>

      {/* About + Works — unified */}
      <section
        ref={refAbout as React.RefObject<HTMLDivElement>}
        className="theme-border border-b max-w-[1440px] mx-auto w-full"
      >
        <div className="px-6 md:px-12 py-10 flex flex-col gap-10">

          {/* ── About strip: 3 columns ── */}
          <div ref={refAboutHeading} className="flex flex-col gap-2 mb-2">
            <span className="theme-text font-['Geist_Mono',monospace] font-bold text-[10px] tracking-widest">ABOUT US //</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16 items-start">
            {/* Col 1 — headline */}
            <div className="flex flex-col gap-4">
              <h2 className="theme-text font-['Outfit',sans-serif] font-extrabold text-[36px] md:text-[44px] leading-[1.05]">
                We turn ideas into powerful visuals.
              </h2>
              <div className="w-8 h-[2px] bg-[#ff4800]" />
            </div>

            {/* Col 2 — description */}
            <div className="flex flex-col gap-4">
              <p className="theme-text font-['Outfit',sans-serif] text-[14px] leading-[22px]">
                AFONI is a Berlin-based visual production studio. We work with brands, creative teams and international clients to create campaign imagery, product visuals and motion.
              </p>
              <p className="theme-text font-['Outfit',sans-serif] text-[14px] leading-[22px]">
                We combine art direction, generative technology and visual craft to bring ideas to life.
              </p>
              <p className="theme-text font-['Outfit',sans-serif] text-[14px] leading-[22px]">
                From the first concept to the final frame, we stay close to the vision.
              </p>
            </div>

          </div>

          {/* Gallery label row */}
          <div className="theme-border-s flex items-center justify-between pt-2 border-t">
            <span className="theme-text font-['Geist_Mono',monospace] font-bold text-[10px] tracking-widest">SELECTED WORKS //</span>
            <button
              onClick={() => setShowAllWorks(v => !v)}
              className="font-['Geist_Mono',monospace] text-[#ff4800] text-[11px] tracking-[0.5px] px-4 py-2 cursor-pointer hover:text-[#e03e00] active:scale-95 transition-all"
            >
              {showAllWorks ? "[ HIDE WORKS ↑ ]" : "[ VIEW ALL WORKS → ]"}
            </button>
          </div>

          {/* Gallery row 1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
            {[
              { src: imgFashion1, code: "[FSHN_001]", index: "[01]", title: "FASHION /\nEDITORIAL" },
              { src: imgFashion2, code: "[FSHN_002]", index: "[02]", title: "BEAUTY /\nPORTRAIT"   },
              { src: imgEcomm1,   code: "[ECOMM_001]", index: "[03]", title: "PRODUCT /\nE-COMM"   },
              { src: imgEcomm2,   code: "[ECOMM_002]", index: "[04]", title: "LIFESTYLE /\nBRAND"  },
            ].map(({ src, code, index, title }) => (
              <GalleryCard key={code} src={src} code={code} index={index} title={title} height={280} />
            ))}
          </div>

          {/* Gallery row 2 — collapsible */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: showAllWorks ? "1fr" : "0fr",
              transition: "grid-template-rows 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full pt-2">
                {[
                  { src: imgArt1,     code: "[ARTD_001]",  index: "[05]", title: "ART /\nDIRECTION"   },
                  { src: imgArt2,     code: "[ARTD_002]",  index: "[06]", title: "CAMPAIGN /\nLUXURY"  },
                  { src: imgFashion2, code: "[FSHN_003]",  index: "[07]", title: "CULTURE /\nIDENTITY" },
                  { src: imgEcomm1,   code: "[ECOMM_003]", index: "[08]", title: "STUDIO /\nPRODUCTION"},
                ].map(({ src, code, index, title }) => (
                  <GalleryCard key={code} src={src} code={code} index={index} title={title} height={280} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={refService as React.RefObject<HTMLDivElement>} className="theme-border border-b flex flex-col gap-10 items-start px-6 md:px-12 py-16 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <span className="theme-text font-['Geist_Mono',monospace] font-bold text-[12px]">SERVICE FORMATS //</span>
            {selectedPlan && (
              <span className="font-['Geist_Mono',monospace] text-[10px] text-[#ff4800] animate-pulse">
                [{selectedPlan} — ADDED TO CLIENT PROFILE]
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            {
              num: "[01]",
              type: "ENGAGEMENT_TYPE_A",
              title: "SINGLE PROJECT",
              desc: "One-off campaign or production. Fixed scope, fixed deliverables. Ideal for product launches, seasonal editorials, and brand shoots.",
              features: ["Defined brief + deliverables", "2 rounds of revision", "48-72hr turnaround"],
              priceLabel: "STARTING FROM",
              price: "$5,000",
              priceSuffix: "",
            },
            {
              num: "[02]",
              type: "ENGAGEMENT_TYPE_B",
              title: "RETAINER",
              desc: "Ongoing visual production partnership. Monthly allocation of renders, revisions, and dedicated art direction hours. Maximum consistency, maximum velocity.",
              features: ["Monthly render allocation", "Dedicated art director", "Priority 24hr turnaround"],
              priceLabel: "STARTING FROM",
              price: "$12,000",
              priceSuffix: "/mo",
            },
            {
              num: "[03]",
              type: "ENGAGEMENT_TYPE_C",
              title: "ENTERPRISE",
              desc: "Full-spectrum AI visual pipeline integration. Custom model training, brand-locked generation, and a dedicated art director embedded in your workflow.",
              features: ["Custom model training", "Brand-locked generation", "Embedded art director"],
              priceLabel: "PRICING",
              price: "CUSTOM",
              priceSuffix: "",
            },
          ].map(({ num, type, title, desc, features, priceLabel, price, priceSuffix }) => {
            const isSelected = selectedPlan === title;
            const justAdded = addedPlan === title;

            const handleAdd = () => {
              if (isSelected) {
                setSelectedPlan(null);
                setAddedPlan(null);
                return;
              }
              setSelectedPlan(title);
              setAddedPlan(title);
              setTimeout(() => setAddedPlan(null), 1800);
              scrollTo(sectionRefs.contact);
            };

            return (
              <ServiceCard
                key={num}
                num={num} type={type} title={title} desc={desc} features={features}
                isSelected={isSelected} justAdded={justAdded} onAdd={handleAdd}
              />
            );
          })}
        </div>
      </section>

      {modalOpen && <ProjectModal onClose={() => setModalOpen(false)} />}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          60% { opacity: 0.4; }
          100% { opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepComplete {
          0%   { transform: scale(1); }
          45%  { transform: scale(1.18); box-shadow: 0 0 12px rgba(34,197,94,0.5); }
          75%  { transform: scale(0.93); }
          100% { transform: scale(1); }
        }
        @keyframes pulseGreen {
          0%, 100% { opacity: 0.7; box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%       { opacity: 1;   box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        @keyframes scanDown {
          0%   { top: 0%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Contact / Start a Project */}
      <section
        ref={refContact as React.RefObject<HTMLDivElement>}
        className="theme-border border-b flex flex-col gap-0 max-w-[1440px] mx-auto w-full"
      >
        {/* Section header — full width accent bar */}
        <div className="bg-[#1a1a1a] px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#ff4800] w-1 h-5 rounded-full" />
            <span className="font-['Outfit',sans-serif] font-extrabold text-white text-[22px] tracking-tight">
              Start a Project
            </span>
            <span className="font-['Geist_Mono',monospace] text-white/30 text-[10px] hidden md:block">// INTAKE PROTOCOL</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <div className="bg-[#22c55e] opacity-70 rounded-full size-[6px]" />
            <span className="font-['Geist_Mono',monospace] text-white/50 text-[9px]">SYS://READY</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full">

          {/* LEFT — How it works sidebar */}
          <div className="theme-bg-alt theme-border-s border-r px-8 py-10 flex flex-col gap-6 lg:w-[300px] shrink-0 relative overflow-hidden">
            {/* Scan line animation on completion */}
            {activeStep >= 3 && (
              <div
                className="absolute inset-x-0 top-0 h-[2px] pointer-events-none z-10"
                style={{ animation: "scanDown 0.7s ease-in-out forwards", background: "linear-gradient(90deg, transparent, #22c55e, transparent)" }}
              />
            )}

            <div className="flex flex-col gap-1">
              <span className="theme-text font-['Geist_Mono',monospace] font-bold text-[11px] tracking-[0.5px]">HOW IT WORKS</span>
              <div
                className="h-[2px] w-8 transition-colors duration-700"
                style={{ background: activeStep >= 3 ? "#22c55e" : "#ff4800" }}
              />
            </div>

            {/* Completion badge */}
            {activeStep >= 3 && (
              <div
                className="flex items-center gap-2 rounded-[2px] px-3 py-2 border"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  borderColor: "rgba(34,197,94,0.35)",
                  animation: "slideIn 0.4s ease-out",
                }}
              >
                <div className="rounded-full size-[6px] bg-[#22c55e]" style={{ animation: "pulseGreen 1.6s ease-in-out infinite" }} />
                <span className="font-['Geist_Mono',monospace] text-[#22c55e] text-[9px] tracking-wider">BRIEF_TRANSMITTED ✓</span>
              </div>
            )}

            {/* Steps with connector lines */}
            <div className="flex flex-col">
              {HOW_IT_WORKS.map(({ step, title, desc, icon }, i) => {
                const isComplete = i < activeStep;
                const isCurrent = i === activeStep;
                const isFuture = i > activeStep;
                const lineActive = i + 1 <= activeStep;
                const isDone = activeStep >= HOW_IT_WORKS.length - 1;

                const iconColor = isDone
                  ? "#22c55e"
                  : isComplete || isCurrent
                  ? "#ff4800"
                  : "rgba(112,112,107,0.28)";
                const borderColor = isDone
                  ? "rgba(34,197,94,0.5)"
                  : isComplete || isCurrent
                  ? "rgba(255,72,0,0.55)"
                  : "var(--border-soft)";
                const bgColor = isDone
                  ? "rgba(34,197,94,0.07)"
                  : isComplete || isCurrent
                  ? "rgba(255,72,0,0.07)"
                  : "var(--bg)";

                return (
                  <div key={step} className="flex gap-4 items-stretch">
                    {/* Left: icon + number + connector */}
                    <div className="flex flex-col items-center shrink-0 w-9">
                      <div
                        className="border rounded-[4px] p-2 flex items-center justify-center size-9 transition-all duration-500"
                        style={{
                          borderColor,
                          background: bgColor,
                          animation: isDone ? `stepComplete 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.11}s both` : undefined,
                        }}
                      >
                        {icon(iconColor)}
                      </div>
                      <span
                        className="font-['Geist_Mono',monospace] text-[8px] font-bold mt-0.5 transition-colors duration-500"
                        style={{ color: iconColor }}
                      >
                        {step}
                      </span>
                      {/* Connector line */}
                      {i < HOW_IT_WORKS.length - 1 && (
                        <div
                          className="flex-1 w-[2px] my-1 rounded-full overflow-hidden"
                          style={{ minHeight: "18px", background: "rgba(112,112,107,0.12)" }}
                        >
                          <div
                            style={{
                              height: lineActive ? "100%" : "0%",
                              background: isDone ? "#22c55e" : "#ff4800",
                              borderRadius: "9999px",
                              transition: `height 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 0.14}s, background-color 0.5s ease`,
                              boxShadow: lineActive ? (isDone ? "0 0 5px rgba(34,197,94,0.5)" : "0 0 5px rgba(255,72,0,0.35)") : "none",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Right: text */}
                    <div
                      className="flex flex-col gap-0.5 pt-0.5 pb-7 transition-opacity duration-500"
                      style={{ opacity: isFuture ? 0.3 : 1 }}
                    >
                      <span className="theme-text font-['Outfit',sans-serif] font-extrabold text-[13px] leading-tight">{title}</span>
                      <span className="theme-muted font-['Outfit',sans-serif] text-[12px] leading-[17px]">{desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Response promise */}
            <div
              className="theme-bg border rounded-[2px] px-4 py-3 flex gap-3 items-center transition-all duration-700"
              style={{ borderColor: activeStep >= 3 ? "rgba(34,197,94,0.35)" : "var(--border-soft)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5Z" stroke="#22c55e" strokeWidth="1.2"/>
                <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="theme-text font-['Geist_Mono',monospace] text-[9px] leading-[14px]">
                Response guaranteed within <span className="text-[#ff4800] font-bold">24 hours</span> on business days.
              </span>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="flex-1 px-8 md:px-12 py-10 flex flex-col gap-6">

            {/* Selected plan confirmation */}
            {selectedPlan && (
              <div className="flex items-stretch rounded-[2px] overflow-hidden border border-[#ff4800]">
                <div className="bg-[#ff4800] px-3 flex items-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 3" stroke="#0d0d0d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="theme-bg flex items-center justify-between flex-1 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <span className="theme-muted font-['Geist_Mono',monospace] text-[9px]">FORMAT SELECTED</span>
                    <span className="theme-text font-['Outfit',sans-serif] font-extrabold text-[13px]">{selectedPlan}</span>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="font-['Geist_Mono',monospace] text-[#70706b] text-[9px] hover:text-[#ff4800] transition-colors"
                  >
                    [ CLEAR × ]
                  </button>
                </div>
              </div>
            )}

            {formState === "sent" ? (
              <SubmitSuccess
                plan={selectedPlan}
                onReset={() => {
                  setFormState("idle");
                  setFormData({ name: "", email: "", brief: "" });
                  setSelectedPlan(null);
                }}
              />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="theme-muted font-['Geist_Mono',monospace] font-semibold text-[9px] tracking-[0.5px]">
                      NAME / ORGANIZATION
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                      placeholder="Your name or company..."
                      className={`${inputBase} ${formErrors.name ? "border-red-400" : ""}`}
                    />
                    {formErrors.name && (
                      <span className="font-['Geist_Mono',monospace] text-red-500 text-[9px]">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="theme-muted font-['Geist_Mono',monospace] font-semibold text-[9px] tracking-[0.5px]">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      placeholder="you@company.com"
                      className={`${inputBase} ${formErrors.email ? "border-red-400" : ""}`}
                    />
                    {formErrors.email && (
                      <span className="font-['Geist_Mono',monospace] text-red-500 text-[9px]">{formErrors.email}</span>
                    )}
                  </div>
                </div>

                {/* Brief */}
                <div className="flex flex-col gap-1.5">
                  <label className="theme-muted font-['Geist_Mono',monospace] font-semibold text-[9px] tracking-[0.5px]">
                    PROJECT BRIEF
                  </label>
                  <textarea
                    rows={4}
                    value={formData.brief}
                    onChange={(e) => setFormData((d) => ({ ...d, brief: e.target.value }))}
                    placeholder="Describe your concept — product, mood, references, deliverables, deadline..."
                    className={`${inputBase} resize-none ${formErrors.brief ? "border-red-400" : ""}`}
                  />
                  {formErrors.brief && (
                    <span className="font-['Geist_Mono',monospace] text-red-500 text-[9px]">{formErrors.brief}</span>
                  )}
                </div>

                <div className="flex flex-col items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full bg-[#ff4800] text-[#0d0d0d] font-['Geist_Mono',monospace] font-bold text-[14px] tracking-[1px] px-10 py-5 rounded-[2px] cursor-pointer hover:bg-[#e03e00] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] transition-all shadow-[0_4px_24px_rgba(255,72,0,0.35)] hover:shadow-[0_6px_32px_rgba(255,72,0,0.5)]"
                  >
                    {formState === "sending" ? "SENDING..." : "INITIATE_PROJECT →"}
                  </button>
                  <span className="font-['Geist_Mono',monospace] text-[#70706b] text-[9px]">
                    No commitment required.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between px-6 md:px-12 py-6 max-w-[1440px] mx-auto w-full">
        <span className="theme-text font-['Geist_Mono',monospace] text-[11px]">
          © 2026 AFONI STUDIO // ALL RIGHTS RESERVED.
        </span>
        <nav className="flex gap-5 items-center">
          {[
            { label: "INSTAGRAM", href: "https://www.instagram.com/afoni.studio/" },
            { label: "BEHANCE", href: "https://behance.net" },
            { label: "LINKEDIN", href: "https://www.linkedin.com/company/afoni-studio/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacAkygec980oHuNR6DPMqNJg0o-oIEsPqAWj4q1tLr8J-jR-M8VS8QCwIkm0Q_aem_b4-9vhrSDfwjviBrjWsgHw" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-text font-['Geist_Mono',monospace] font-medium text-[11px] hover:text-[#ff4800] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
