import { useState, useEffect, useRef } from "react";
import {
  Terminal, X, Send, ChevronUp, Zap, Code2, Brain,
  MapPin, Mail, Phone, Award, Clock, Briefcase, User,
  MessageSquare, Command, Search, Download, TrendingUp,
  Layers, ArrowRight, Check, ChevronRight, Cpu, Sparkles,
  Menu, ExternalLink, Star, FileText
} from "lucide-react";
import ph from "./assets/ph.png"
import { FaReact } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
const GithubIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const LinkedinIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const C = {
  bg: "#06060f",
  surface: "rgba(255,255,255,0.03)",
  surfaceHover: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.18)",
  blue: "#4f8ef7",
  purple: "#b06ef3",
  cyan: "#22d3ee",
  green: "#10b981",
  amber: "#f59e0b",
  coral: "#ff6b6b",
  text: "#eef2ff",
  muted: "#64748b",
  dim: "#1e2235",
};
const GS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${C.bg}; color: ${C.text}; font-family: 'Outfit', sans-serif; overflow-x: hidden; cursor: none; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(${C.purple}, ${C.blue}); border-radius: 2px; }

  .mono { font-family: 'JetBrains Mono', monospace; }

  /* ── Noise overlay ── */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
  }

  /* ── Progress bar ── */
  .progress-bar { position: fixed; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, ${C.blue}, ${C.purple}, ${C.cyan}); z-index: 999; transition: width 0.15s; }

  /* ── Grid pattern ── */
  .dot-grid {
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* ── Glass ── */
  .glass {
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid ${C.border};
    transition: border-color .25s, background .25s, transform .2s, box-shadow .25s;
  }
  .glass:hover {
    border-color: rgba(255,255,255,0.13);
    background: rgba(255,255,255,0.05);
  }

  /* ── Glow card ── */
  .glow-card {
    position: relative;
    transition: transform .22s ease, box-shadow .22s ease;
  }
  .glow-card::before {
    content: '';
    position: absolute; inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, transparent, rgba(176,110,243,0), rgba(79,142,247,0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
  }
  .glow-card:hover::before { opacity: 1; background: linear-gradient(135deg, ${C.blue}55, ${C.purple}55, ${C.cyan}33); }
  .glow-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 40px rgba(79,142,247,.1); }

  /* ── Animations ── */
  @keyframes blob { 0%,100%{transform:translate(0,0)scale(1)}33%{transform:translate(40px,-40px)scale(1.08)}66%{transform:translate(-30px,20px)scale(0.94)} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.2)} }
  @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)} }
  @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(2deg)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0}to{opacity:1} }
  @keyframes slideLeft { from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)} }
  @keyframes neonPulse { 0%,100%{box-shadow:0 0 16px rgba(176,110,243,.4),0 0 36px rgba(176,110,243,.15)}50%{box-shadow:0 0 28px rgba(176,110,243,.75),0 0 60px rgba(176,110,243,.35),0 0 100px rgba(79,142,247,.15)} }
  @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
  @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
  @keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
  @keyframes orbitSpin { from{transform:rotate(0deg) translateX(80px) rotate(0deg)}to{transform:rotate(360deg) translateX(80px) rotate(-360deg)} }
  @keyframes borderGlow { 0%,100%{border-color:rgba(79,142,247,.3)}50%{border-color:rgba(176,110,243,.6)} }
  @keyframes countUp { from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)} }
  @keyframes scanline { 0%{transform:translateY(-100%)}100%{transform:translateY(100vh)} }
  @keyframes particleFloat {
    0%{transform:translateY(0) translateX(0);opacity:0}
    10%{opacity:1}
    90%{opacity:0.6}
    100%{transform:translateY(-120px) translateX(40px);opacity:0}
  }
  @keyframes ringPulse { 0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.06);opacity:.2} }
  @keyframes gradientBorder {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }

  .tilt-card { transition: transform .2s ease, box-shadow .2s ease; transform-style: preserve-3d; will-change: transform; }

  /* ── Nav ── */
  .nav-link { position:relative; color:${C.muted}; transition:color .2s; text-decoration:none; font-size:13.5px; font-weight:600; letter-spacing:.02em; }
  .nav-link:hover { color:${C.text}; }
  .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1.5px; background:linear-gradient(90deg,${C.blue},${C.purple}); transition:width .3s; border-radius:2px; }
  .nav-link:hover::after { width:100%; }

  /* ── Buttons ── */
  .btn-p {
    background: linear-gradient(135deg,${C.blue},${C.purple});
    border: none; color: #fff; padding: 13px 32px; border-radius: 12px;
    font-size: 14px; font-weight: 700; font-family: 'Outfit',sans-serif;
    cursor: pointer; transition: all .22s; letter-spacing: .03em;
    position: relative; overflow: hidden;
  }
  .btn-p::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg,${C.purple},${C.cyan});
    opacity:0; transition:opacity .3s;
  }
  .btn-p:hover::before { opacity:1; }
  .btn-p:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(79,142,247,.45),0 0 0 1px rgba(79,142,247,.25); }
  .btn-p:active { transform:translateY(-1px); }
  .btn-p span { position:relative; z-index:1; }

  .btn-s {
    background: transparent; border: 1px solid ${C.border}; color: ${C.text};
    padding: 13px 32px; border-radius: 12px; font-size: 14px; font-weight: 600;
    font-family: 'Outfit',sans-serif; cursor: pointer; transition: all .22s; letter-spacing:.02em;
  }
  .btn-s:hover { border-color: ${C.borderHover}; background: rgba(255,255,255,.06); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.3); }

  /* ── Tags ── */
  .tag { font-size: 11px; font-weight: 700; padding: 4px 11px; border-radius: 20px; letter-spacing: .04em; }
  .tag-blue { background: rgba(79,142,247,.12); border: 1px solid rgba(79,142,247,.28); color: ${C.blue}; }
  .tag-purple { background: rgba(176,110,243,.1); border: 1px solid rgba(176,110,243,.26); color: ${C.purple}; }
  .tag-muted { background: rgba(255,255,255,.04); border: 1px solid ${C.border}; color: ${C.muted}; transition: all .2s; }
  .tag-muted:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.12); color: ${C.text}; }
  .tag-cyan { background: rgba(34,211,238,.1); border: 1px solid rgba(34,211,238,.25); color: ${C.cyan}; }

  /* ── Section labels ── */
  .sec-label { font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: ${C.purple}; margin-bottom: 14px; font-family: 'JetBrains Mono',monospace; display: flex; align-items: center; gap: 10px; }
  .sec-label::before { content:''; width:24px; height:1.5px; background:${C.purple}; border-radius:2px; }
  .sec-title { font-size: clamp(30px,5vw,58px); font-weight: 900; line-height: 1.05; letter-spacing: -.025em; }
  .grad { background: linear-gradient(135deg,${C.blue},${C.purple},${C.cyan}); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .grad-shimmer { background: linear-gradient(90deg,${C.blue},${C.purple},${C.cyan},${C.blue}); background-size:200% auto; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; animation:shimmer 4s linear infinite; }
  .grad-warm { background: linear-gradient(135deg,${C.amber},${C.coral}); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  /* ── Skill bar ── */
  .s-track { height: 5px; background: rgba(255,255,255,.06); border-radius: 4px; overflow: hidden; position: relative; }
  .s-fill { height: 100%; border-radius: 4px; transition: width 1.8s cubic-bezier(.4,0,.2,1); position: relative; }
  .s-fill::after { content:''; position:absolute; top:0; left:0; right:0; bottom:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent); animation: shimmer 2.5s linear infinite; background-size: 200% auto; }

  /* ── Timeline ── */
  .tl-line { position:absolute; left:16px; top:0; bottom:0; width:1.5px; background: linear-gradient(180deg,transparent 0%,${C.purple} 15%,${C.blue} 75%,transparent 100%); }

  /* ── Badges ── */
  .badge-ai { background: linear-gradient(135deg,${C.purple},${C.blue}); font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 20px; color:#fff; letter-spacing:.8px; text-transform:uppercase; animation: neonPulse 2s infinite; }
  .badge-hot { background: linear-gradient(135deg,${C.amber},#ef4444); font-size:9px; font-weight:800; padding:2px 8px; border-radius:20px; color:#fff; letter-spacing:.6px; text-transform:uppercase; }

  /* ── Form ── */
  .field-wrap { position:relative; }
  .field {
    background: rgba(255,255,255,.04) !important; border: 1px solid ${C.border} !important;
    color: ${C.text} !important; border-radius: 12px !important; padding: 14px 18px !important;
    font-family: 'Outfit',sans-serif !important; font-size: 14px !important; outline: none !important;
    transition: border-color .25s, background .25s, box-shadow .25s !important; width: 100% !important;
  }
  .field:focus { border-color: ${C.blue} !important; background: rgba(79,142,247,.06) !important; box-shadow: 0 0 0 3px rgba(79,142,247,.12) !important; }
  .field::placeholder { color: ${C.muted} !important; }

  /* ── Mobile nav ── */
  .mobile-menu { position:fixed; inset:0; background:rgba(6,6,15,.97); backdrop-filter:blur(24px); z-index:200; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:32px; animation:fadeIn .2s ease; }
  .mobile-link { font-size:28px; font-weight:800; color:${C.muted}; text-decoration:none; transition:color .2s; }
  .mobile-link:hover { color:${C.text}; }

  /* ── Section divider ── */
  .sec-divider { height: 1px; background: linear-gradient(90deg, transparent, ${C.border}, transparent); margin: 0 auto; max-width: 1200px; }

  /* ── Number highlight ── */
  .num-badge {
    font-size: 10px; font-weight: 800; font-family: 'JetBrains Mono',monospace;
    color: ${C.muted}; letter-spacing: .05em;
    background: rgba(255,255,255,.04); border: 1px solid ${C.border};
    padding: 2px 8px; border-radius: 6px;
  }

  /* ── Responsive ── */
  @media(max-width:768px) {
    .desktop-nav { display:none !important; }
    .mobile-btn { display:flex !important; }
    .contact-grid { }
    .hero-stats { gap:24px !important; flex-wrap:wrap !important; }
    .bento-wide { grid-column: span 12 !important; }
    .bento-half { grid-column: span 12 !important; }
    .bento-third { grid-column: span 12 !important; }
  }
  @media(min-width:769px) {
    .mobile-btn { display:none !important; }
    .bento-wide { grid-column: span 8; }
    .bento-half { grid-column: span 4; }
    .bento-third { grid-column: span 4; }
  }
`;
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), rp = useRef({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  useEffect(() => {
    const mv = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) dot.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
    };
    const dn = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    let raf;
    const loop = () => {
      rp.current.x += (pos.current.x - rp.current.x) * 0.12;
      rp.current.y += (pos.current.y - rp.current.y) * 0.12;
      if (ring.current) ring.current.style.transform = `translate(${rp.current.x - 20}px,${rp.current.y - 20}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mousedown", dn); window.removeEventListener("mouseup", up); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 8, height: 8, background: C.blue, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, top: 0, left: 0, boxShadow: `0 0 12px ${C.blue}, 0 0 24px ${C.blue}60`, transition: "transform 0.05s" }} />
      <div ref={ring} style={{ position: "fixed", width: 40, height: 40, border: `1.5px solid rgba(176,110,243,${clicking ? '.9' : '.45'})`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, top: 0, left: 0, transition: "border-color .2s, transform 0.05s", transform: clicking ? "scale(0.8)" : "scale(1)" }} />
    </>
  );
}
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setW((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="progress-bar" style={{ width: `${w}%` }} />;
}
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: Math.random() > .7 ? 3 : 2,
    color: [C.blue, C.purple, C.cyan][Math.floor(Math.random() * 3)],
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", bottom: 0, left: p.left,
          width: p.size, height: p.size, borderRadius: "50%",
          background: p.color, boxShadow: `0 0 6px ${p.color}`,
          animation: `particleFloat ${p.duration} ${p.delay} infinite ease-out`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
}
function Blobs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[
        { c: "rgba(79,142,247,.12)", x: "5%", y: "15%", s: 600, d: "0s" },
        { c: "rgba(176,110,243,.10)", x: "65%", y: "40%", s: 700, d: "-6s" },
        { c: "rgba(34,211,238,.07)", x: "35%", y: "75%", s: 480, d: "-3s" },
        { c: "rgba(176,110,243,.07)", x: "80%", y: "10%", s: 350, d: "-9s" },
        { c: "rgba(245,158,11,.05)", x: "20%", y: "60%", s: 300, d: "-4s" },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute", left: b.x, top: b.y, width: b.s, height: b.s,
          background: `radial-gradient(circle, ${b.c}, transparent 70%)`,
          borderRadius: "50%", animation: `blob 16s ease-in-out infinite`,
          animationDelay: b.d, filter: "blur(60px)"
        }} />
      ))}
    </div>
  );
}
function Navbar({ onTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Skills", "Experience", "Projects", "Certs", "Contact"];
  const goto = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };
  return (
    <>
      {mobileOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: C.muted, cursor: "pointer" }}>
            <X size={24} />
          </button>
          {links.map(l => <a key={l} onClick={() => goto(l.toLowerCase())} className="mobile-link" href={`#${l.toLowerCase()}`}>{l}</a>)}
        </div>
      )}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 0",
        background: scrolled ? "rgba(6,6,15,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .35s",
      }}>
        {scrolled && <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.purple}40, ${C.blue}40, transparent)` }} />}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg,${C.blue},${C.purple})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px rgba(79,142,247,.45)` }}>
              <Cpu size={15} color="white" />
            </div>
            <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: "-.02em" }} className="mono">AKR<span style={{ color: C.blue }}>.</span></span>
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: 34, alignItems: "center" }}>
            {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="mobile-btn" onClick={() => setMobileOpen(true)} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 10px", color: C.muted, cursor: "pointer", display: "none", alignItems: "center" }}>
              <Menu size={14} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
function TypeWriter({ texts }) {
  const [idx, setIdx] = useState(0), [shown, setShown] = useState(""), [del, setDel] = useState(false);
  useEffect(() => {
    const t = texts[idx], spd = del ? 30 : 70;
    const id = setTimeout(() => {
      if (!del && shown.length < t.length) setShown(t.slice(0, shown.length + 1));
      else if (!del) setTimeout(() => setDel(true), 2200);
      else if (shown.length > 0) setShown(shown.slice(0, -1));
      else { setDel(false); setIdx(i => (i + 1) % texts.length); }
    }, spd);
    return () => clearTimeout(id);
  }, [shown, del, idx, texts]);
  return <span>{shown}<span style={{ animation: "blink 1s infinite", color: C.blue }}>█</span></span>;
}
function Hero({ onResumeUpdate }) {
  const [hasResume, setHasResume] = useState(false);
  const handleResumeAction = () => {
    const link = document.createElement('a');
    link.href = '/Abhishek_resume.pdf';
    link.download = 'Abhishek_resume.pdf';
    link.click();
  };
  return (
    <>
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "0 28px", overflow: "hidden" }}>
        <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
        <Particles />
        <div style={{ position: "absolute", right: "6%", top: "18%", width: 440, height: 440, borderRadius: "50%", border: `1px solid rgba(176,110,243,.12)`, animation: "ringPulse 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", right: "10%", top: "22%", width: 310, height: 310, borderRadius: "50%", border: `1px solid rgba(79,142,247,.1)`, animation: "ringPulse 6s ease-in-out infinite", animationDelay: "2s" }} />
        <div style={{ position: "absolute", right: "16%", top: "28%", width: 180, height: 180, borderRadius: "50%", border: `1px dashed rgba(34,211,238,.08)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: 110, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", justifyContent: "space-between" }}>

            <div style={{ flex: 1, minWidth: "280px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 40, background: "rgba(16,185,129,.07)", border: "1px solid rgba(16,185,129,.22)", marginBottom: 30, animation: "fadeUp .6s ease forwards" }}>
                <div style={{ width: 7, height: 7, background: C.green, borderRadius: "50%", animation: "pulse 2s infinite", boxShadow: `0 0 8px ${C.green}` }} />
                <span style={{ fontSize: 12, color: C.green, fontWeight: 600, letterSpacing: ".02em" }}>Open to opportunities · Madurai, India</span>
              </div>
              <div style={{ fontSize: 12, color: C.purple, letterSpacing: "4px", fontWeight: 700, textTransform: "uppercase", marginBottom: 18, animation: "fadeUp .6s ease .1s both", display: "flex", alignItems: "center", gap: 10 }} className="mono">
                <span style={{ display: "inline-block", width: 20, height: 1.5, background: C.purple, borderRadius: 2 }} />
                Full Stack Developer
              </div>
              <h1 style={{ fontSize: "clamp(52px,8.5vw,98px)", fontWeight: 900, lineHeight: 0.96, letterSpacing: "-.035em", marginBottom: 22, animation: "fadeUp .6s ease .2s both" }}>
                <span style={{ display: "block" }}>Abhishek</span>
                <span className="grad-shimmer" style={{ display: "block" }}>Kumar R</span>
              </h1>
              <div style={{ fontSize: "clamp(15px,2vw,21px)", color: C.muted, marginBottom: 42, height: 36, animation: "fadeUp .6s ease .3s both" }} className="mono">
                <TypeWriter texts={["Building Scalable Web Apps", "AI-Powered Solutions", "MERN Stack Expert", "Claude API Integration"]} />
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 64, animation: "fadeUp .6s ease .4s both" }}>
                <button className="btn-p" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    View Projects <ArrowRight size={14} />
                  </span>
                </button>
                <button className="btn-s" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Get In Touch
                </button>
                <button className="btn-s"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                  onClick={handleResumeAction}>
                  <Download size={14} />
                  Download Resume
                </button>
              </div>
              <div className="hero-stats" style={{ display: "flex", gap: 44, paddingTop: 36, borderTop: `1px solid ${C.border}`, animation: "fadeUp .6s ease .5s both" }}>
{[["1+", "Years Exp", C.blue], ["6", "Projects", C.purple], ["6", "AI/Cloud Certs", C.cyan], ["100%", "Passion", C.green]].map(([n, l, color]) => (
                  <div key={l}>
                    <div style={{ fontSize: "clamp(22px,2.8vw,40px)", fontWeight: 900, letterSpacing: "-.03em", color, lineHeight: 1, textShadow: `0 0 30px ${color}60` }}>{n}</div>
                    <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6, fontWeight: 600, letterSpacing: ".02em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "280px", display: "flex", justifyContent: "center", animation: "fadeUp .6s ease .3s both" }}>
              <div style={{ position: "relative", width: 360, height: 360 }}>
                <div style={{ position: "absolute", inset: -30, animation: "spin 12s linear infinite", pointerEvents: "none" }}>
                  <div style={{ width: 10, height: 10, background: C.blue, borderRadius: "50%", boxShadow: `0 0 12px ${C.blue}`, marginLeft: "auto", marginRight: "50%", transform: "translateX(195px)", opacity: .8 }} />
                </div>
                <div style={{ position: "absolute", inset: -50, animation: "spin 20s linear infinite reverse", pointerEvents: "none" }}>
                  <div style={{ width: 6, height: 6, background: C.purple, borderRadius: "50%", boxShadow: `0 0 10px ${C.purple}`, marginTop: "50%", transform: "translateY(-215px) translateX(215px)", opacity: .7 }} />
                </div>
                <div style={{ width: 360, height: 360, borderRadius: "50%", background: `conic-gradient(${C.blue}, ${C.purple}, ${C.cyan}, ${C.blue})`, padding: "3px", animation: "floatSlow 7s ease-in-out infinite", boxShadow: `0 0 60px rgba(79,142,247,.25)` }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: C.bg }}>
                    <img
                      src={ph}
                      alt="Abhishek Kumar R"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`, position: "absolute", top: 0 }}>
                      <span style={{ fontSize: "80px" }}>👨‍💻</span>
                    </div>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: 10, right: -20, padding: "10px 18px", background: "rgba(10,10,24,.95)", border: `1px solid ${C.border}`, borderRadius: 14, backdropFilter: "blur(16px)", animation: "float 5s ease-in-out infinite", boxShadow: "0 8px 30px rgba(0,0,0,.5)" }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>Current Role</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.blue }}>Full Stack Dev</div>
                </div>
                <div style={{ position: "absolute", top: 20, left: -20, padding: "10px 16px", background: "rgba(10,10,24,.95)", border: `1px solid rgba(176,110,243,.25)`, borderRadius: 14, backdropFilter: "blur(16px)", animation: "float 4s ease-in-out infinite", animationDelay: "1.5s", boxShadow: "0 8px 30px rgba(176,110,243,.2)" }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Tech Stack</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", maxWidth: 140 }}>
                    {["MERN Stack"].map((t, i) => (
                      <span key={t} style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, background: [
                          "rgba(16,185,129,.15)", "rgba(79,142,247,.15)", "rgba(34,211,238,.15)", "rgba(176,110,243,.15)"
                        ][i], color: [C.green, C.blue, C.cyan, C.purple][i], border: `1px solid ${["rgba(16,185,129,.3)", "rgba(79,142,247,.3)", "rgba(34,211,238,.3)", "rgba(176,110,243,.3)"][i]}`
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section></>
  );
}
function BentoAbout() {
  const code = `const stack = {
  frontend: ["React","JS","Tailwind"],
  backend:  ["Node","Express","Django"],
  database: ["MongoDB","PostgreSQL"],
  ai:       ["Claude API","MCP","Bedrock"],
  auth:     ["JWT","OAuth2","RBAC"]
};`;
  return (
    <section id="about" style={{ padding: "68px 28px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="sec-label">About Me</div>
        <h2 className="sec-title" style={{ marginBottom: 56 }}>The Dev<br /><span className="grad">Behind the Code</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}>
          <div className="glass glow-card bento-wide" style={{ borderRadius: 22, padding: 34, borderLeft: `3px solid ${C.blue}40` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: `rgba(79,142,247,.15)`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid rgba(79,142,247,.2)` }}><User size={16} color={C.blue} /></div>
              <span style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase" }}>Bio</span>
            </div>
            <p style={{ fontSize: 15.5, lineHeight: 1.9, color: "rgba(238,242,255,.75)", marginBottom: 22 }}>
              Full Stack Developer with <strong style={{ color: C.text }}>1+ year of hands-on experience</strong> based in <strong style={{ color: C.text }}>Madurai, India</strong>, building and shipping production-grade apps with the <strong style={{ color: C.blue }}>MERN stack</strong>. Shipped live products including an <strong style={{ color: C.text }}>Instagram DM automation platform (NanoDM)</strong> using the Meta Graph API and a full-stack <strong style={{ color: C.text }}>e-commerce platform</strong> for Aqua Tech RO System. Currently expanding into AI-powered development — certified in the <strong style={{ color: C.purple }}>Claude API</strong>, <strong style={{ color: C.purple }}>Model Context Protocol (MCP)</strong>, and <strong style={{ color: C.purple }}>AWS Generative AI / Amazon Bedrock</strong>. Currently shipping scalable products at <strong style={{ color: C.text }}>Hurryep Technologies</strong>.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["MERN Stack", "AI Integration", "Claude API", "MCP", "AWS Bedrock", "Full Stack", "REST APIs"].map(tag => (
                <span key={tag} className="tag tag-blue">{tag}</span>
              ))}
            </div>
          </div>
          <div className="glass glow-card bento-half" style={{ borderRadius: 22, padding: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(176,110,243,.14), transparent 65%)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, position: "relative" }}>
              <MapPin size={15} color={C.purple} />
              <span style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase" }}>Location</span>
            </div>
            <div style={{ position: "relative", textAlign: "center", paddingTop: 12 }}>
              <div style={{ fontSize: 42, marginBottom: 10 }}>📍</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.02em" }}>Madurai</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 5 }}>Tamil Nadu, India</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 18, padding: "7px 16px", borderRadius: 20, background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.25)" }}>
                <div style={{ width: 6, height: 6, background: C.green, borderRadius: "50%", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>Remote-friendly</span>
              </div>
            </div>
          </div>
          <div className="glass glow-card bento-wide" style={{ borderRadius: 22, padding: 28, borderLeft: `3px solid ${C.purple}40` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(176,110,243,.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(176,110,243,.2)" }}>🎓</div>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Education</span>
            </div>
            <div style={{ padding: 20, borderRadius: 14, background: "rgba(99,102,241,.08)", border: "1px solid rgba(99,102,241,.18)" }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>Bachelor of Computer Applications (BCA)</h3>
              <p style={{ fontSize: 13.5, color: C.muted }}>Kalasalingam Academy of Research and Education</p>
              <div style={{ display: "flex", gap: 20, marginTop: 12, flexWrap: "wrap" }}>
                {[["🎓", "Graduated: May 2024"], ["📊", "CGPA: 6.8"], ["📍", "Krishnankoil, Virudhunagar"]].map(([ico, txt]) => (
                  <span key={txt} style={{ fontSize: 12, color: C.text, display: "flex", alignItems: "center", gap: 5 }}>{ico} {txt}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="glass bento-half" style={{ borderRadius: 22, padding: 24, background: "rgba(0,0,0,.3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ef4444", "#f59e0b", "#10b981"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
              </div>
              <span style={{ fontSize: 11, color: C.muted, marginLeft: 4 }} className="mono">stack.js</span>
            </div>
            <pre style={{ fontSize: 10.5, lineHeight: 1.85, overflowX: "auto", fontFamily: "JetBrains Mono, monospace" }}>
              {code.split("\n").map((line, i) => {
                const html = line
                  .replace(/(const|=)/g, `<span style="color:${C.purple}">$1</span>`)
                  .replace(/("[^"]*")/g, `<span style="color:${C.green}">$1</span>`)
                  .replace(/(stack)/g, `<span style="color:${C.blue}">$1</span>`);
                return <span key={i} dangerouslySetInnerHTML={{ __html: html + "\n" }} />;
              })}
            </pre>
          </div>
          {[
            { icon: "🚀", title: "Ships Live Products", desc: "NanoDM & Aqua Tech RO System — both live in production", color: C.green },
            { icon: "⚡", title: "Fast Learner", desc: "Picked up Claude API, MCP & AWS Bedrock in weeks, shipped to production", color: C.amber },
            { icon: "🎯", title: "Impact Focused", desc: "Every project tied to measurable business outcomes", color: C.blue },
            { icon: "🤝", title: "Team Player", desc: "Collaborative, clear communication, reliable delivery", color: C.purple },
          ].map((f, i) => (
            <div key={i} className="glass glow-card bento-third" style={{ borderRadius: 18, padding: 26, borderTop: `2px solid ${f.color}30` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 8, letterSpacing: "-.01em" }}>{f.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const SKILLS = {
  Frontend: [
    { n: "React.js", v: 92 }, { n: "JavaScript (ES2024)", v: 90 },
    { n: "Tailwind CSS", v: 88 }, { n: "HTML / CSS", v: 95 }, { n: "Ant Design", v: 80 },
  ],
  "Backend & DB": [
    { n: "Node.js", v: 88 }, { n: "Express.js", v: 87 },
    { n: "Python / Django", v: 78 }, { n: "MongoDB", v: 85 }, { n: "SQL", v: 76 },
  ],
  "AI / Emerging": [
    { n: "Claude API Integration", v: 90, badge: "ai" },
    { n: "Model Context Protocol (MCP)", v: 86, badge: "ai" },
    { n: "Prompt Engineering", v: 88, badge: "hot" },
    { n: "Amazon Bedrock", v: 80, badge: "ai" },
  ],
  "Tools & Integrations": [
    { n: "Git / GitHub", v: 88 },
    { n: "Postman", v: 85 },
    { n: "Meta Graph API", v: 80, badge: "hot" },
    { n: "Multer (File Uploads)", v: 78 },
  ],
};
const SKILL_COLORS = {
  Frontend: [C.blue, C.cyan],
  "Backend & DB": [C.purple, C.blue],
  "AI / Emerging": [C.purple, C.cyan],
  "Tools & Integrations": [C.cyan, C.blue],
};
function Skills() {
  const [tab, setTab] = useState("Frontend");
  const [anim, setAnim] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnim(true); }, { threshold: .2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const switchTab = (t) => { setAnim(false); setTab(t); setTimeout(() => setAnim(true), 80); };
  const [c1, c2] = SKILL_COLORS[tab];
  return (
    <section id="skills" ref={ref} style={{ padding: "68px 28px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="sec-label">Technical Arsenal</div>
        <h2 className="sec-title" style={{ marginBottom: 50 }}>Skills &<br /><span className="grad">Technologies</span></h2>
        <div style={{ display: "flex", gap: 3, marginBottom: 42, background: "rgba(255,255,255,.025)", borderRadius: 14, padding: 4, border: `1px solid ${C.border}`, width: "fit-content" }}>
          {Object.keys(SKILLS).map(cat => (
            <button key={cat} onClick={() => switchTab(cat)} style={{
              padding: "9px 22px", borderRadius: 11, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 700, fontFamily: "Outfit", letterSpacing: ".01em",
              background: tab === cat ? `linear-gradient(135deg, ${SKILL_COLORS[cat][0]}, ${SKILL_COLORS[cat][1]})` : "transparent",
              color: tab === cat ? "#fff" : C.muted, transition: "all .25s",
              boxShadow: tab === cat ? `0 4px 16px ${SKILL_COLORS[cat][0]}40` : "none",
            }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
          {SKILLS[tab].map((sk, i) => (
            <div key={sk.n} className="glass glow-card" style={{ borderRadius: 16, padding: 24, animation: `fadeUp .4s ease ${i * .1}s both` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 9 }}>
                  {sk.n}
                  {sk.badge === "ai" && <span className="badge-ai">NEW</span>}
                  {sk.badge === "hot" && <span className="badge-hot">🔥</span>}
                </span>
                <span style={{ fontSize: 14, fontWeight: 800, color: sk.badge ? C.purple : C.blue, fontFamily: "JetBrains Mono" }}>{sk.v}%</span>
              </div>
              <div className="s-track">
                <div className="s-fill" style={{
                  width: anim ? `${sk.v}%` : "0%",
                  background: sk.badge ? `linear-gradient(90deg,${C.purple},${C.blue})` : `linear-gradient(90deg,${c1},${c2})`,
                  transitionDelay: `${i * .14}s`,
                  boxShadow: `0 0 8px ${sk.badge ? C.purple : c1}60`,
                }} />
              </div>
            </div>
          ))}
        </div>
       <div style={{ marginTop: 44, padding: "26px 30px", borderRadius: 18, background: "rgba(255,255,255,.03)", border: `1px solid ${C.border}` }}>
  <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }} className="mono">
    <span style={{ display: "inline-block", width: 16, height: 1.5, background: C.muted }} />
    Also familiar with
  </div>
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
    {["React Router", "Redux", "Mongoose", "Multer", "Axios", "JWT", "OAuth 2.0", "RBAC", "REST APIs", "Git", "Docker (basics)", "Figma"].map(t => (
      <span
        key={t}
        style={{
          cursor: "default",
          fontSize: 12.5,
          fontWeight: 600,
          padding: "7px 14px",
          borderRadius: 20,
          color: "#cfd3dc",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.12)",
        }}
      >
        {t}
      </span>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}
const EXP = [
  {
    title: "Full Stack Developer",
    company: "Hurryep Technologies",
    period: "Mar 2026 – Present",
    current: true,
    color: C.blue,
    points: [
      "Built and shipped production-grade web applications end-to-end using the MERN stack (MongoDB, Express.js, React.js, Node.js)",
      "Architected scalable, secure backend modules powering internal SEO service products",
      "Engineered RESTful APIs with JWT authentication, OAuth login, and role-based access control (RBAC) to secure multi-tier user access",
      "Optimized application performance and streamlined development workflows, reducing load times and improving reliability",
    ],
  },
  {
    title: "Full Stack Developer Intern",
    company: "Hurryep Technologies",
    period: "Jul 2025 – Feb 2026",
    current: false,
    color: C.purple,
    points: [
      "Contributed to full-stack feature development across the MERN stack under senior developer mentorship",
      "Built and integrated REST APIs with responsive React.js frontends, accelerating feature delivery",
      "Debugged production issues and improved UI responsiveness across key modules",
      "Collaborated cross-functionally with the team to translate real-time project requirements into working features",
    ],
  },
];
function Experience() {
  return (
    <section id="experience" style={{ padding: "68px 28px", position: "relative" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div className="sec-label">Career Path</div>
        <h2 className="sec-title" style={{ marginBottom: 60 }}>Work<br /><span className="grad">Experience</span></h2>
        <div style={{ position: "relative", paddingLeft: 56 }}>
          <div className="tl-line" />
          {EXP.map((e, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 28 }}>
              <div style={{
                position: "absolute", left: -46, top: 8, width: 18, height: 18, borderRadius: "50%",
                background: e.current ? `linear-gradient(135deg,${C.blue},${C.purple})` : "rgba(255,255,255,.06)",
                border: `2.5px solid ${e.current ? C.blue : C.dim}`,
                boxShadow: e.current ? `0 0 0 5px rgba(79,142,247,.15), 0 0 20px rgba(79,142,247,.5)` : "none",
                transition: "all .3s",
              }} />
              {e.current && <div style={{ position: "absolute", left: -55, top: -1, width: 36, height: 36, borderRadius: "50%", border: `1px solid rgba(79,142,247,.2)`, animation: "ringPulse 3s ease-in-out infinite" }} />}

              <div className="glass glow-card" style={{ borderRadius: 20, padding: 32, animation: `fadeUp .6s ease ${i * .2}s both`, borderLeft: `3px solid ${e.color}40` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-.015em" }}>{e.title}</h3>
                    <div style={{ fontSize: 14, color: e.color, fontWeight: 700, marginTop: 5, display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: e.color, boxShadow: `0 0 6px ${e.color}` }} />
                      {e.company}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    {e.current && <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.28)", color: C.green, fontWeight: 700 }}>● Current</span>}
                    <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} /> {e.period}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {e.points.map((p, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(238,242,255,.72)", lineHeight: 1.7 }}>
                      <ChevronRight size={14} style={{ flexShrink: 0, marginTop: 4, color: e.color }} /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const PROJECTS = [
 { title: "NanoDM — Instagram DM Automation", desc: "Built a live Instagram DM automation platform using the Meta Graph API to automate and manage direct messages at scale, with backend API integration using Node.js and Express.", tags: ["React", "Node.js", "Express", "Meta Graph API"], color: C.purple, impact: "Automated Instagram engagement", icon: "💬", live: "https://nanodm.com" },
  { title: "Aqua Tech RO System Website", desc: "Independently designed and developed the official website for Aqua Tech RO System — full SEO, performance optimization and content management.", tags: ["MERN", "SEO", "MongoDB"], color: C.cyan, impact: "3× organic traffic growth", icon: "💧", live: "https://www.aquatechrosystem.in/" },
  {
    title: "Custom CRM System",
    desc: "Developed a full-stack CRM system with role-based access control (CEO/Master/Employee), secure JWT and OAuth authentication, and responsive dashboards tailored to each role. Built RESTful APIs for lead and employee management with optimized performance.",
    tags: ["MERN", "JWT", "OAuth", "RBAC"],
    color: C.blue,
    impact: "Multi-level role-based access",
    icon: "🗂️"
  },
  { title: "Global Suggest (SEO Tool)", desc: "SEO tool with scalable MERN architecture including admin dashboard, multi-level auth and detailed analytics dashboard.", tags: ["MERN", "JWT", "OAuth", "RBAC"], color: C.blue, impact: "99.9% system uptime", icon: "📊", live: "https://globalsuggest.com/" },
  {
    title: "Thunder Bike Garage",
    desc: "Developed a dynamic and responsive web application to showcase premium bikes with detailed specifications and visuals. Implemented features like clickable bike cards, individual detail pages, backend-integrated registration forms, image uploads using Multer, and robust form validation.",
    tags: ["React", "Node.js", "Multer"],
    color: C.amber,
    impact: "Responsive UI + Backend Integration",
    icon: "⚡"
  },
  {
    title: "Grocery Traceability",
    desc: "Built a grocery ordering platform connecting farmers directly with consumers, enabling real-time order tracking, product inventory management, and transparent pricing without intermediaries.",
    tags: ["HTML", "CSS", "JavaScript", "SQL"],
    color: C.green,
    impact: "Direct Farmer-to-Consumer Model",
    icon: "🌱"
  }
];
function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const mv = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(10px)`;
    ref.current.style.boxShadow = `${-x * 24}px ${-y * 24}px 40px rgba(0,0,0,.4), 0 0 40px ${p.color}18`;
  };
  const leave = () => { if (ref.current) { ref.current.style.transform = ""; ref.current.style.boxShadow = ""; } };
  return (
    <div ref={ref} className="tilt-card glass" onMouseMove={mv} onMouseLeave={leave} style={{
      borderRadius: 22, padding: 28, position: "relative", overflow: "hidden",
      borderTop: `2px solid ${p.color}`, animation: `fadeUp .5s ease ${i * .1}s both`,
    }}>
      <div style={{ position: "absolute", top: 20, right: 22 }}>
        <span className="num-badge">0{i + 1}</span>
      </div>
      <div style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, background: `radial-gradient(circle, ${p.color}18, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ fontSize: 36, marginBottom: 16 }}>{p.icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 9, letterSpacing: "-.015em", paddingRight: 40 }}>{p.title}</h3>
      <p style={{ fontSize: 13, color: "rgba(238,242,255,.62)", lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, padding: "7px 14px", background: `${p.color}12`, borderRadius: 10, border: `1px solid ${p.color}25`, width: "fit-content" }}>
        <TrendingUp size={11} color={p.color} />
        <span style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{p.impact}</span>
      </div>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: p.live ? 16 : 0 }}>
        {p.tags.map(t => <span key={t} className="tag tag-muted">{t}</span>)}
      </div>
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 13, fontWeight: 700, color: p.color, textDecoration: "none", padding: "7px 14px", borderRadius: 9, background: `${p.color}10`, border: `1px solid ${p.color}25`, transition: "all .2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = `${p.color}20`; e.currentTarget.style.transform = "translateX(2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = `${p.color}10`; e.currentTarget.style.transform = ""; }}>
          <ExternalLink size={12} /> View Live
        </a>
      )}
    </div>
  );
}
function Projects() {
  return (
    <section id="projects" style={{ padding: "68px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="sec-label">Portfolio</div>
        <h2 className="sec-title" style={{ marginBottom: 52 }}>Featured<br /><span className="grad">Projects</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
const CERTS_AI = [
  { title: "AWS Certified Generative AI Developer – Professional Practice Set", issuer: "AWS", date: "2026", icon: "🎓", desc: "Applied GenAI development practices on AWS" },
  { title: "Building Generative AI Applications Using Amazon Bedrock", issuer: "AWS", date: "2026", icon: "☁️", desc: "Deploying GenAI apps on Amazon Bedrock" },
  { title: "Essentials of Prompt Engineering", issuer: "Anthropic", date: "Mar 2026", icon: "✍️", desc: "Structuring prompts for reliable model output" },
  { title: "Building with the Claude API", issuer: "Anthropic", date: "Mar 2026", icon: "🤖", desc: "Production integration patterns, streaming, tool use" },
  { title: "Claude Code in Action", issuer: "Anthropic", date: "Mar 2026", icon: "⚡", desc: "Agentic coding workflows and automation" },
  { title: "Introduction to MCP", issuer: "Anthropic", date: "Mar 2026", icon: "🧠", desc: "Model Context Protocol architecture & servers" },
];
const CERTS_STD = [
  { title: "MERN Stack Dev", issuer: "Shikshaa Simple Learn", date: "Mar 2025", icon: <FaReact /> },
  { title: "Python Full Stack", issuer: "QSpiders", date: "Aug 2024", icon: <FaPython /> },
];
function Certs() {
  return (
    <section id="certs" style={{ padding: "68px 28px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="sec-label">Credentials</div>
        <h2 className="sec-title" style={{ marginBottom: 12 }}>Certs &<br /><span className="grad">AI Mastery</span></h2>
        <p style={{ fontSize: 15, color: C.muted, marginBottom: 52, maxWidth: 480, lineHeight: 1.75 }}>Verified expertise in cutting-edge AI tooling from Anthropic — the team behind Claude.</p>
        <div style={{ borderRadius: 26, padding: 36, background: "rgba(176,110,243,.04)", border: "1px solid rgba(176,110,243,.18)", marginBottom: 24, position: "relative", overflow: "hidden", animation: "borderGlow 4s ease-in-out infinite" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, background: "radial-gradient(circle, rgba(176,110,243,.15), transparent 70%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: -60, left: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(79,142,247,.08), transparent 70%)", borderRadius: "50%" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30, position: "relative" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,rgba(176,110,243,.3),rgba(79,142,247,.3))", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(176,110,243,.3)" }}>
              <Sparkles size={18} color={C.purple} />
            </div>
            <div>
              <div style={{ fontWeight: 900, color: C.purple, fontSize: 16 }}>🔥 AI Mastery Track — Anthropic</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Verified certifications from the team behind Claude</div>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(176,110,243,.15)", border: "1px solid rgba(176,110,243,.3)", color: C.purple, fontWeight: 800 }}>6 Certs</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, position: "relative" }}>
            {CERTS_AI.map((c, i) => (
              <div key={i} style={{ borderRadius: 18, padding: 28, background: "rgba(176,110,243,.06)", border: "1px solid rgba(176,110,243,.2)", animation: "neonPulse 3s ease-in-out infinite", animationDelay: `${i * .7}s`, transition: "transform .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 8, lineHeight: 1.4 }}>{c.title}</h3>
                <p style={{ fontSize: 12.5, color: C.muted, marginBottom: 16, lineHeight: 1.65 }}>{c.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontSize: 12, color: C.purple, fontWeight: 700 }}>{c.issuer}</span>
                  <span style={{ fontSize: 11, color: C.muted, fontFamily: "JetBrains Mono" }}>{c.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(176,110,243,.1)", width: "fit-content" }}>
                  <Award size={12} color={C.purple} />
                  <span style={{ fontSize: 11, color: C.purple, fontWeight: 700 }}>Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {CERTS_STD.map((c, i) => (
            <div key={i} className="glass glow-card" style={{ borderRadius: 18, padding: 28, animation: `fadeUp .6s ease ${i * .15}s both` }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
              <h3 style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 8 }}>{c.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: C.blue, fontWeight: 700 }}>{c.issuer}</span>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: "JetBrains Mono" }}>{c.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setTimeout(() => { setSent(false); setForm({ name: "", email: "", msg: "" }); }, 3500); }, 1200);
  };
  return (
    <section id="contact" style={{ padding: "68px 28px 80px", position: "relative" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 68 }}>
          <div className="sec-label" style={{ justifyContent: "center" }}>Get In Touch</div>
          <h2 className="sec-title">Let's Build<br /><span className="grad">Something Great</span></h2>
          <p style={{ fontSize: 15, color: C.muted, marginTop: 18, maxWidth: 440, margin: "18px auto 0", lineHeight: 1.75 }}>Open to full-time roles, freelance projects, and AI collaboration.</p>
        </div>
        <div className="items-center! flex justify-center! gap-20" >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
             { Icon: Mail, label: "Email", val: "abhishek250404abi@gmail.com", href: "mailto:abhishek250404abi@gmail.com", color: C.blue },
              { Icon: Phone, label: "Phone", val: "+91 63855 33286", href: "tel:+916385533286", color: C.green },
              { Icon: MapPin, label: "Location", val: "Madurai, Tamil Nadu", color: C.purple },
              { Icon: GithubIcon, label: "GitHub", val: "github.com/Abhishek250404", href: "https://github.com/Abhishek250404", color: C.text },
              { Icon: LinkedinIcon, label: "LinkedIn", val: "www.linkedin.com/in/abhishek-kumar-r-213644224", href: "https://www.linkedin.com/in/abhishek-kumar-r-213644224", color: C.blue },
            ].map(({ Icon, label, val, href, color }) => (

              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass"
                style={{
                  borderRadius: 15,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all .22s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateX(5px)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = C.border;
                }}
              >
                <div style={{
                  width: 42,
                  height: 42,
                  background: `${color}12`,
                  border: `1px solid ${color}22`,
                  borderRadius: 11,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Icon size={16} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 10.5,
                    color: C.muted,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1.8px",
                    marginBottom: 3
                  }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>
                    {val}
                  </div>
                </div>
                {href && <ExternalLink size={12} color={C.muted} />}
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 80, paddingTop: 40, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 13, color: C.muted }}>
            Designed & built by Abhishek Kumar R · © {new Date().getFullYear()}
          </p>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 22 }}>
  {[["GitHub", "https://github.com/Abhishek250404"], ["LinkedIn", "https://www.linkedin.com/in/abhishek-kumar-r-213644224"]].map(([l, h]) => (
    <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.muted, textDecoration: "none", transition: "color .2s" }}
      onMouseEnter={e => e.target.style.color = C.text} onMouseLeave={e => e.target.style.color = C.muted}>{l}</a>
  ))}
</div>
        </div>
      </div>
    </section>
  );
}
const BOT_REPLIES = {
  default: "👋 Hey! I'm Abhishek's AI assistant. Ask me about his skills, projects, experience, or how to hire him!",
  skills: "Abhishek is expert in React, Node.js, Express, MongoDB & Python. Standout skill: Claude API & MCP integration — shipped to production.",
  experience: "Full Stack Dev at Hurryep Technologies (Mar 2026–present), promoted from intern (Jul 2025). 1+ year building MERN apps with JWT/OAuth/RBAC + integrated Claude AI.",
  projects: "6 key projects: 💬 NanoDM Automation, 💧 Aqua Tech RO Portal, 🗂️ Custom CRM, 📊 Global Suggest SEO, ⚡ Thunder Bike Garage, 🌱 Grocery Traceability.",
  contact: "📧 abhishek250404abi@gmail.com · 📞 +91 63855 33286 · 📍 Madurai, India. Open to remote opportunities!",
  ai: "6 AI/Cloud certifications (2026): Claude API, Claude Code, MCP, Prompt Engineering, AWS GenAI Developer & Amazon Bedrock. He ships AI features to production — not just demos.",
  hire: "Abhishek is actively looking! Great for Full Stack, MERN, or AI-integration positions. Use the contact form or email directly.",
};
const getReply = (msg) => {
  const m = msg.toLowerCase();
  if (m.match(/skill|tech|stack|language|framework/)) return BOT_REPLIES.skills;
  if (m.match(/experience|work|job|company|intern/)) return BOT_REPLIES.experience;
  if (m.match(/project|built|portfolio|app/)) return BOT_REPLIES.projects;
  if (m.match(/contact|reach|email|phone|location/)) return BOT_REPLIES.contact;
  if (m.match(/ai|claude|mcp|cert|anthropic/)) return BOT_REPLIES.ai;
  if (m.match(/hire|available|recruit|opening/)) return BOT_REPLIES.hire;
  return "Great question! Abhishek is a passionate Full Stack & AI developer from Madurai. Ask about his skills, projects, experience, or how to hire him 🚀";
};
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ r: "bot", t: BOT_REPLIES.default }]);
  const [inp, setInp] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const send = (text) => {
    const msg = text || inp.trim();
    if (!msg) return;
    setMsgs(m => [...m, { r: "user", t: msg }]);
    setInp(""); setTyping(true);
    setTimeout(() => { setMsgs(m => [...m, { r: "bot", t: getReply(msg) }]); setTyping(false); }, 700 + Math.random() * 500);
  };
  return (
    <>
      {open && (
        <div style={{ position: "fixed", bottom: 100, right: 24, width: 370, borderRadius: 24, overflow: "hidden", zIndex: 500, background: "rgba(8,8,20,.98)", border: "1px solid rgba(176,110,243,.3)", backdropFilter: "blur(28px)", boxShadow: "0 32px 80px rgba(0,0,0,.7), 0 0 60px rgba(176,110,243,.15)", animation: "fadeUp .3s ease" }}>
          <div style={{ padding: "18px 22px", background: "linear-gradient(135deg,rgba(79,142,247,.1),rgba(176,110,243,.1))", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 16px rgba(79,142,247,.4)` }}>
                <Brain size={16} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>Ask about Abhishek</div>
                <div style={{ fontSize: 11, color: C.green, display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <div style={{ width: 5, height: 5, background: C.green, borderRadius: "50%", animation: "pulse 2s infinite" }} /> Online now
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,.06)", border: `1px solid ${C.border}`, borderRadius: 8, color: C.muted, cursor: "pointer", padding: "5px 7px", display: "flex", alignItems: "center" }}><X size={14} /></button>
          </div>
          <div style={{ padding: 16, height: 300, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.r === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "82%", padding: "10px 15px", fontSize: 13, lineHeight: 1.65, borderRadius: m.r === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.r === "user" ? `linear-gradient(135deg,${C.blue},${C.purple})` : "rgba(255,255,255,.06)", border: m.r === "bot" ? `1px solid ${C.border}` : "none" }}>{m.t}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 5, padding: "12px 16px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.border}`, borderRadius: "18px 18px 18px 4px", width: 64 }}>
                {[0, .2, .4].map(d => <div key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: C.muted, animation: `pulse 1s ${d}s infinite` }} />)}
              </div>
            )}
            <div ref={end} />
          </div>
          <div style={{ padding: "8px 16px", display: "flex", gap: 7, flexWrap: "wrap", borderTop: `1px solid ${C.border}` }}>
            {["Skills", "Projects", "Contact", "Hire him?"].map(q => (
              <button key={q} onClick={() => send(q)} style={{ fontSize: 11.5, padding: "5px 13px", borderRadius: 20, background: "rgba(255,255,255,.05)", border: `1px solid ${C.border}`, color: C.muted, cursor: "pointer", fontFamily: "Outfit", fontWeight: 600, transition: "all .2s" }}
                onMouseEnter={e => { e.target.style.borderColor = C.blue; e.target.style.color = C.blue; e.target.style.background = "rgba(79,142,247,.08)"; }}
                onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.muted; e.target.style.background = "rgba(255,255,255,.05)"; }}>
                {q}
              </button>
            ))}
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
            <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask something…" className="field" style={{ flex: 1 }} />
            <button onClick={() => send()} style={{ background: `linear-gradient(135deg,${C.blue},${C.purple})`, border: "none", borderRadius: 11, padding: "0 18px", cursor: "pointer", color: "white", flexShrink: 0, boxShadow: `0 4px 14px rgba(79,142,247,.35)` }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        position: "fixed", bottom: 30, right: 30, width: 58, height: 58, borderRadius: "50%",
        background: `linear-gradient(135deg,${C.blue},${C.purple})`, border: "none",
        cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 8px 30px rgba(79,142,247,.5), 0 0 0 4px rgba(79,142,247,.12)`,
        animation: "float 3.5s ease-in-out infinite", zIndex: 500, transition: "box-shadow .3s",
      }}>
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </>
  );
}
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: 102, right: 30, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.06)", border: `1px solid ${C.border}`, color: C.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, transition: "all .22s", animation: "fadeIn .3s ease" }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.12)"; e.currentTarget.style.borderColor = C.borderHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = ""; }}>
      <ChevronUp size={18} />
    </button>
  );
}
export default function App() {
  return (
    <>
      <style>{GS}</style>
      <Cursor />
      <ScrollProgress />
      <Blobs />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <div className="sec-divider" />
        <BentoAbout />
        <div className="sec-divider" />
        <Skills />
        <div className="sec-divider" />
        <Experience />
        <div className="sec-divider" />
        <Projects />
        <div className="sec-divider" />
        <Certs />
        <div className="sec-divider" />
        <Contact />
      </main>
      <Chatbot />
      <BackToTop />
    </>
  );
}