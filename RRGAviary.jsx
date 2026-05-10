import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   RRG AVIARY — Complete Website
   "Where Wings Find Their Home"
   Pages: Home · Birds · Accessories · Gallery · About · Contact · Admin
═══════════════════════════════════════════════════════════════════════════ */

/* ─── INJECT GLOBAL CSS ─────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: #FAFAF7;
  color: #1A1A18;
  -webkit-font-smoothing: antialiased;
}
h1,h2,h3,h4,h5 { font-family: 'Playfair Display', serif; }
img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; }
input, textarea, select { font-family: 'DM Sans', sans-serif; }

:root {
  --g1: #2D6A4F;
  --g2: #40916C;
  --g3: #52B788;
  --g4: #74C69D;
  --g5: #B7E4C7;
  --g6: #D8F3DC;
  --g7: #F0FAF2;
  --b1: #1A6B8A;
  --b2: #2D9CCA;
  --b3: #56B4D3;
  --b4: #A8DAEB;
  --b5: #E1F4FB;
  --br1: #6B4423;
  --br2: #8B5E3C;
  --br3: #C8966A;
  --br4: #EDD9C5;
  --br5: #FAF0E6;
  --cream: #FAFAF7;
  --cream2: #F3F1ED;
  --cream3: #EAE7E0;
  --text1: #1A1A18;
  --text2: #3D3D38;
  --text3: #6B6B65;
  --text4: #9E9E96;
  --white: #FFFFFF;
  --r: 18px;
  --r-sm: 10px;
  --r-lg: 24px;
  --shadow: 0 2px 20px rgba(0,0,0,0.07);
  --shadow-md: 0 6px 30px rgba(0,0,0,0.11);
  --shadow-lg: 0 12px 50px rgba(0,0,0,0.15);
  --trans: all 0.28s cubic-bezier(0.4,0,0.2,1);
}

/* Buttons */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--g1); color: #fff;
  padding: 13px 30px; border-radius: 50px;
  font-size: 15px; font-weight: 600;
  transition: var(--trans); cursor: pointer; border: none;
}
.btn-primary:hover { background: var(--g2); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(45,106,79,0.30); }
.btn-primary:active { transform: translateY(0); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--g1);
  border: 2px solid var(--g1);
  padding: 11px 28px; border-radius: 50px;
  font-size: 15px; font-weight: 600;
  transition: var(--trans); cursor: pointer;
}
.btn-outline:hover { background: var(--g1); color: #fff; transform: translateY(-2px); }

.btn-white {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; color: var(--g1);
  padding: 13px 30px; border-radius: 50px;
  font-size: 15px; font-weight: 700;
  transition: var(--trans); cursor: pointer; border: none;
}
.btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.18); }

.btn-blue {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--b1); color: #fff;
  padding: 13px 30px; border-radius: 50px;
  font-size: 15px; font-weight: 600;
  transition: var(--trans); cursor: pointer; border: none;
}
.btn-blue:hover { background: var(--b2); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,107,138,0.28); }

.btn-wa {
  display: inline-flex; align-items: center; gap: 10px;
  background: #25D366; color: #fff;
  padding: 13px 30px; border-radius: 50px;
  font-size: 15px; font-weight: 700;
  transition: var(--trans); cursor: pointer; border: none;
}
.btn-wa:hover { background: #1EB856; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.35); }

/* Cards */
.card {
  background: var(--white);
  border-radius: var(--r);
  box-shadow: var(--shadow);
  transition: var(--trans);
  overflow: hidden;
}
.card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }

/* Inputs */
.nb-input {
  width: 100%; padding: 12px 16px;
  border: 1.5px solid var(--cream3);
  border-radius: var(--r-sm);
  font-size: 15px; color: var(--text1);
  background: var(--white);
  outline: none; transition: border-color 0.2s;
}
.nb-input:focus { border-color: var(--g2); }
.nb-input::placeholder { color: var(--text4); }

/* Badges */
.badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 11px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
.badge-green { background: var(--g6); color: var(--g1); }
.badge-blue { background: var(--b5); color: var(--b1); }
.badge-brown { background: var(--br5); color: var(--br1); }
.badge-red { background: #FDECEA; color: #B00020; }
.badge-orange { background: #FFF0E0; color: #C55A00; }
.badge-gold { background: #FFF8E1; color: #A67B00; }

/* Tabs */
.tab {
  padding: 9px 20px; border-radius: 50px;
  font-size: 14px; font-weight: 600;
  border: 1.5px solid var(--cream3);
  color: var(--text3); background: transparent;
  cursor: pointer; transition: var(--trans);
  white-space: nowrap;
}
.tab.active, .tab:hover { background: var(--g1); color: #fff; border-color: var(--g1); }

/* Nav */
.rrg-nav {
  position: sticky; top: 0; z-index: 200;
  background: rgba(250,250,247,0.96);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(45,106,79,0.1);
}
.nav-link {
  font-size: 14.5px; font-weight: 600;
  color: var(--text2); padding: 5px 2px;
  position: relative; cursor: pointer;
  background: none; border: none;
  transition: color 0.2s;
}
.nav-link::after {
  content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
  height: 2px; background: var(--g1); border-radius: 2px;
  transform: scaleX(0); transition: transform 0.22s;
}
.nav-link:hover, .nav-link.active { color: var(--g1); }
.nav-link.active::after, .nav-link:hover::after { transform: scaleX(1); }

/* Hero */
.hero-section {
  min-height: 90vh; position: relative;
  display: flex; align-items: center;
  overflow: hidden;
}

/* Section header */
.section-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 12.5px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  margin-bottom: 14px;
}
.eyebrow-line { width: 30px; height: 2px; border-radius: 2px; }
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 700; line-height: 1.15;
  color: var(--text1);
}
.section-sub {
  font-size: 16px; color: var(--text3);
  line-height: 1.7; margin-top: 10px;
}

/* Bird card image */
.bird-img { width: 100%; height: 228px; object-fit: cover; transition: transform 0.55s ease; }
.card:hover .bird-img { transform: scale(1.07); }
.acc-img { width: 100%; height: 188px; object-fit: cover; transition: transform 0.5s ease; }
.card:hover .acc-img { transform: scale(1.05); }

/* Gallery */
.gal-item { position: relative; overflow: hidden; border-radius: var(--r); cursor: pointer; }
.gal-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
.gal-item:hover img { transform: scale(1.08); }
.gal-overlay {
  position: absolute; inset: 0;
  background: rgba(45,106,79,0); border-radius: var(--r);
  display: flex; align-items: center; justify-content: center;
  transition: background 0.3s;
}
.gal-item:hover .gal-overlay { background: rgba(45,106,79,0.52); }
.gal-overlay svg { opacity: 0; transition: opacity 0.25s; }
.gal-item:hover .gal-overlay svg { opacity: 1; }

/* Lightbox */
.lightbox {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.25s ease;
}
.lightbox img { max-width: 90vw; max-height: 88vh; border-radius: 14px; object-fit: contain; }

/* WhatsApp FAB */
.wa-fab {
  position: fixed; bottom: 26px; right: 26px; z-index: 900;
  width: 60px; height: 60px; border-radius: 50%;
  background: #25D366;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 22px rgba(37,211,102,0.45);
  transition: var(--trans); border: none; cursor: pointer;
}
.wa-fab:hover { transform: scale(1.1); box-shadow: 0 6px 32px rgba(37,211,102,0.55); }
.wa-fab-ring {
  position: absolute; inset: -5px;
  border: 2px solid rgba(37,211,102,0.45); border-radius: 50%;
  animation: pulse-ring 2.2s ease-out infinite;
}

/* Testimonial */
.testimonial-card {
  background: var(--white); border-radius: var(--r);
  padding: 30px 28px; box-shadow: var(--shadow);
  position: relative; overflow: hidden;
}
.testimonial-card::before {
  content: '"'; position: absolute; top: 6px; left: 18px;
  font-family: 'Playfair Display', serif;
  font-size: 100px; color: var(--g6); line-height: 1;
  pointer-events: none;
}

/* Admin */
.admin-sidebar {
  width: 252px; background: #162B1F; flex-shrink: 0;
  display: flex; flex-direction: column; min-height: 100%;
}
.admin-menu-item {
  display: flex; align-items: center; gap: 13px;
  padding: 13px 18px; font-size: 14px; font-weight: 600;
  color: rgba(255,255,255,0.65);
  cursor: pointer; transition: all 0.2s;
  border-radius: 10px; margin: 2px 10px;
  border: none; background: none; width: calc(100% - 20px);
  text-align: left;
}
.admin-menu-item:hover, .admin-menu-item.active { background: var(--g1); color: #fff; }

/* Stat card */
.stat-card {
  background: var(--white); border-radius: var(--r);
  padding: 22px 24px; box-shadow: var(--shadow);
}

/* Cart drawer */
.cart-drawer {
  position: fixed; inset: 0; z-index: 800;
  background: rgba(0,0,0,0.48);
}
.cart-panel {
  position: absolute; top: 0; right: 0; bottom: 0;
  width: min(420px, 100vw);
  background: var(--white); padding: 28px;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

/* Mobile menu */
.mobile-overlay {
  position: fixed; inset: 0; z-index: 500;
  background: rgba(0,0,0,0.5);
}
.mobile-panel {
  position: absolute; top: 0; left: 0; bottom: 0; width: 280px;
  background: var(--white); padding: 24px; overflow-y: auto;
  animation: slideIn 0.3s ease;
}

/* Contact card */
.contact-info-card {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 20px; background: var(--white);
  border-radius: var(--r); box-shadow: var(--shadow);
  transition: var(--trans);
}
.contact-info-card:hover { transform: translateX(5px); box-shadow: var(--shadow-md); }
.icon-circle {
  width: 46px; height: 46px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* Availability dot */
.avail-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 5px; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes floatY { 0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);} }
@keyframes pulse-ring { 0%{transform:scale(1);opacity:1;}100%{transform:scale(1.45);opacity:0;} }

.fade-in-up { animation: fadeInUp 0.65s ease both; }
.float-anim { animation: floatY 5s ease-in-out infinite; }

/* Responsive utilities */
@media(max-width:900px) {
  .desktop-nav { display: none !important; }
  .mobile-btn { display: flex !important; }
}
@media(min-width:901px) {
  .mobile-btn { display: none !important; }
  .desktop-nav { display: flex !important; }
}
@media(max-width:600px) {
  .hero-section { min-height: 80vh; }
  .wa-fab { bottom: 18px; right: 18px; }
  .admin-sidebar { width: 200px; }
}
`;

function injectGlobalCSS() {
  if (document.getElementById("rrg-global-css")) return;
  const s = document.createElement("style");
  s.id = "rrg-global-css";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

/* ─── SVG ICONS (inline, no dependency) ────────────────────────────────── */
const Icon = {
  Feather: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>
    </svg>
  ),
  Menu: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevRight: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevLeft: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevDown: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Arrow: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Star: (p) => <svg {...p} viewBox="0 0 24 24" fill={p.filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Phone: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.24a2 2 0 0 1 1.99-2.18H5.6a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.7a16 16 0 0 0 6.02 6.02l.97-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.06z"/></svg>,
  Mail: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  MapPin: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Instagram: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Facebook: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  Cart: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Search: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Eye: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Check: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Trash: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  Plus: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Logout: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Home: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Package: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Settings: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Shield: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Heart: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Award: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Leaf: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 22H7L11 20C14.77 15.53 17 8 17 8z"/><path d="M2.5 2.5s4.5 1.5 5.5 6.5"/></svg>,
  Alert: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Camera: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Msg: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  WhatsApp: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  Users: (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const BIRDS_DATA = [
  {
    id: 1, name: "Goldie", species: "Sun Conure", category: "sun-conure",
    age: "4 months", gender: "Male", mutation: "Normal Green-Naped",
    price: 4500, availability: "available", badge: "Popular",
    description: "Vibrant, hand-tamed Sun Conure with brilliant golden plumage. Extremely playful and loves human interaction. Step-up trained.",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
  },
  {
    id: 2, name: "Papaya", species: "Sun Conure", category: "sun-conure",
    age: "6 months", gender: "Female", mutation: "Pineapple",
    price: 5500, availability: "available", badge: "Rare",
    description: "Stunning pineapple mutation with warm reddish-orange tones. Tame, cuddly, and loves shoulder time.",
    image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600&q=80",
  },
  {
    id: 3, name: "Zara", species: "Sun Conure", category: "sun-conure",
    age: "3 months", gender: "Female", mutation: "Yellow-sided",
    price: 4800, availability: "reserved", badge: null,
    description: "Young Yellow-sided mutation with a calm temperament, ideal for families with children.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    id: 4, name: "Romeo & Juliet", species: "African Lovebird", category: "lovebird",
    age: "5 months", gender: "Pair", mutation: "Green Peach-faced",
    price: 3800, availability: "available", badge: "Pair",
    description: "A bonded lovebird pair — inseparable and full of affection. Perfect for a peaceful and lively aviary.",
    image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=600&q=80",
  },
  {
    id: 5, name: "Azure", species: "African Lovebird", category: "lovebird",
    age: "7 months", gender: "Male", mutation: "Blue Masked",
    price: 3200, availability: "available", badge: "Rare",
    description: "Deep vivid blue mutation with a striking white eye-ring. Hand-raised and very social.",
    image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&q=80",
  },
  {
    id: 6, name: "Sunny", species: "African Lovebird", category: "lovebird",
    age: "4 months", gender: "Female", mutation: "Lutino",
    price: 2800, availability: "sold", badge: null,
    description: "All-yellow Lutino lovebird with red eyes. Sweet nature, very tame. Already weaned.",
    image: "https://images.unsplash.com/photo-1606225695126-df45b87fae7f?w=600&q=80",
  },
  {
    id: 7, name: "Bluebell", species: "Budgerigar", category: "budgie",
    age: "8 weeks", gender: "Male", mutation: "Skyblue",
    price: 850, availability: "available", badge: null,
    description: "Cheerful sky-blue budgie, already learning to mimic words. Very sociable and active.",
    image: "https://images.unsplash.com/photo-1573406836559-7a8a2e1d4dc5?w=600&q=80",
  },
  {
    id: 8, name: "Rainbow", species: "Budgerigar", category: "budgie",
    age: "10 weeks", gender: "Female", mutation: "Rainbow Opaline",
    price: 1300, availability: "available", badge: "Rare",
    description: "A gorgeous rainbow mutation budgie with spectacular multi-color feather variations.",
    image: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?w=600&q=80",
  },
  {
    id: 9, name: "Pistachio", species: "Budgerigar", category: "budgie",
    age: "6 weeks", gender: "Female", mutation: "Olive Green",
    price: 750, availability: "available", badge: null,
    description: "Sweet olive-green budgie, ideal for first-time bird owners. Eats well and very active.",
    image: "https://images.unsplash.com/photo-1618590589088-0df57374b5ef?w=600&q=80",
  },
  {
    id: 10, name: "Tangelo", species: "Zebra Finch", category: "finch",
    age: "3 months", gender: "Male", mutation: "Orange-cheeked",
    price: 600, availability: "available", badge: null,
    description: "Active and melodious zebra finch with bright orange cheek patches. Great in flocks.",
    image: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=600&q=80",
  },
  {
    id: 11, name: "Pearl", species: "Society Finch", category: "finch",
    age: "4 months", gender: "Female", mutation: "White Pearl",
    price: 550, availability: "available", badge: "Rare",
    description: "Rare white pearl mutation society finch. Peaceful, low-maintenance, and incredibly gentle.",
    image: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=600&q=80",
  },
  {
    id: 12, name: "Dapper", species: "Zebra Finch", category: "finch",
    age: "5 months", gender: "Male", mutation: "Chestnut-flanked White",
    price: 650, availability: "sold", badge: null,
    description: "Beautiful white finch with elegant chestnut side markings.",
    image: "https://images.unsplash.com/photo-1534643960519-11ad79bc19df?w=600&q=80",
  },
];

const ACC_DATA = [
  { id: 1, name: "Premium Bird Villa Cage", category: "cages", price: 3200, rating: 4.8, description: "Spacious powder-coated steel cage with multiple doors, removable tray and play top. Fits conures and lovebirds.", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80" },
  { id: 2, name: "Mini Budgie Starter Cage", category: "cages", price: 1400, rating: 4.6, description: "Compact yet roomy cage perfect for budgies and finches. Includes 2 perches and 2 feeders.", image: "https://images.unsplash.com/photo-1601758175114-e711537ef165?w=600&q=80" },
  { id: 3, name: "Natural Manzanita Perch Set", category: "perches", price: 380, rating: 4.9, description: "Set of 3 natural wood perches of varying diameter. Promotes healthy foot grip and nail wear.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { id: 4, name: "Rope Spiral Perch", category: "perches", price: 220, rating: 4.7, description: "Cotton rope perch for foot exercise and comfort. Safe for all hookbill birds. Easy clip-on.", image: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?w=600&q=80" },
  { id: 5, name: "Exotic Bird Mix Feed 1kg", category: "feed", price: 480, rating: 4.8, description: "Premium blend of millet, sunflower seeds, safflower and dried fruits. Ideal for conures and lovebirds.", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=600&q=80" },
  { id: 6, name: "Budgie Seed Mix 500g", category: "feed", price: 280, rating: 4.7, description: "Specially formulated mix of millets and grass seeds for budgies and finches.", image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80" },
  { id: 7, name: "Foraging Toy Bundle", category: "toys", price: 650, rating: 4.9, description: "Set of 5 colorful foraging and chew toys. Keeps parrots mentally stimulated and beak healthy.", image: "https://images.unsplash.com/photo-1573406836559-7a8a2e1d4dc5?w=600&q=80" },
  { id: 8, name: "Shreddable Palm Toy Set", category: "toys", price: 420, rating: 4.8, description: "Biodegradable palm leaf and paper toys for healthy beak activity and foraging.", image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=600&q=80" },
  { id: 9, name: "Natural Coco Nest Box", category: "nest", price: 340, rating: 4.9, description: "Handwoven coconut fiber nest box, perfect for lovebirds and budgies during breeding season.", image: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=600&q=80" },
  { id: 10, name: "Wooden Finch Nest Box", category: "nest", price: 260, rating: 4.7, description: "Compact wooden nesting box designed for zebra finches and society finches.", image: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?w=600&q=80" },
  { id: 11, name: "Stainless Steel Sipper Bottle", category: "water", price: 190, rating: 4.8, description: "Rust-free sipper bottle with no-drip valve. Attaches to cage bars effortlessly.", image: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=600&q=80" },
  { id: 12, name: "Ceramic Bird Bath Set", category: "water", price: 240, rating: 4.6, description: "Set of 2 ceramic bird baths — one for drinking, one for splashing. Dishwasher safe.", image: "https://images.unsplash.com/photo-1534643960519-11ad79bc19df?w=600&q=80" },
];

const TESTIMONIALS_DATA = [
  { name: "Kavya Menon", city: "Chennai", rating: 5, text: "I bought a pair of Sun Conures from RRG Aviary and they are the most well-socialised birds I have ever encountered. The care that goes into raising them is absolutely evident. Highly recommended!", bird: "Sun Conure Pair", avatar: "KM" },
  { name: "Arjun Rajan", city: "Coimbatore", rating: 5, text: "Amazing experience from start to finish! The African Lovebirds I purchased were perfectly healthy, hand-tamed and came with detailed care instructions. Will definitely recommend to all bird lovers.", bird: "African Lovebirds", avatar: "AR" },
  { name: "Priya Suresh", city: "Tirunelveli", rating: 5, text: "The budgies from RRG Aviary are absolutely delightful. They adapted to their new home within two days. Customer support was excellent throughout. Worth every rupee!", bird: "Rainbow Budgie", avatar: "PS" },
  { name: "Dinesh Kumar", city: "Madurai", rating: 5, text: "Purchased finches plus accessories together. Everything was perfect. The manzanita perch set is exceptional quality — my birds love it. Great service and fast delivery!", bird: "Zebra Finches", avatar: "DK" },
];

const GALLERY_DATA = [
  { id: 1, src: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80", alt: "Sun Conure closeup" },
  { id: 2, src: "https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=800&q=80", alt: "Lovebird pair" },
  { id: 3, src: "https://images.unsplash.com/photo-1573406836559-7a8a2e1d4dc5?w=800&q=80", alt: "Blue budgies" },
  { id: 4, src: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?w=800&q=80", alt: "Finch on branch" },
  { id: 5, src: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800&q=80", alt: "Birds in aviary" },
  { id: 6, src: "https://images.unsplash.com/photo-1606225695126-df45b87fae7f?w=800&q=80", alt: "Lovebird portrait" },
  { id: 7, src: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?w=800&q=80", alt: "Budgie pair" },
  { id: 8, src: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&q=80", alt: "Blue lovebird" },
  { id: 9, src: "https://images.unsplash.com/photo-1534643960519-11ad79bc19df?w=800&q=80", alt: "Finch on twig" },
];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
const WALink = (text) =>
  `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;

const FALLBACK_IMG = "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=50";

/* ─── WHATSAPP FAB ───────────────────────────────────────────────────────── */
function WhatsAppFAB() {
  return (
    <a href={WALink("Hi! I found RRG Aviary online and I'd like to enquire about birds.")} target="_blank" rel="noreferrer">
      <button className="wa-fab" title="Chat on WhatsApp">
        <div className="wa-fab-ring" />
        <Icon.WhatsApp width={30} height={30} />
      </button>
    </a>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
function Navbar({ page, setPage, cartCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p) => { setPage(p); setMobileOpen(false); window.scrollTo(0, 0); };

  const links = [
    { id: "home", label: "Home" },
    { id: "birds", label: "Birds" },
    { id: "accessories", label: "Accessories" },
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="rrg-nav" style={{ boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.09)" : "none" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 22px", display: "flex", alignItems: "center", height: 68 }}>
          {/* Logo */}
          <button onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 11, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, var(--g1) 0%, var(--b1) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon.Feather width={20} height={20} style={{ color: "white" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "var(--g1)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>RRG Aviary</div>
              <div style={{ fontSize: 10, color: "var(--text4)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Exotic Birds</div>
            </div>
          </button>

          <div style={{ flex: 1 }} />

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ gap: 28 }}>
            {links.map(l => (
              <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => go(l.id)}>
                {l.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 22 }}>
            <button onClick={() => go("accessories")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "var(--text2)", padding: 4 }}>
              <Icon.Cart width={22} height={22} />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, width: 17, height: 17, background: "var(--g1)", color: "#fff", borderRadius: "50%", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
              )}
            </button>
            <button onClick={() => go("admin")} className="btn-primary" style={{ padding: "8px 18px", fontSize: 13 }}>
              Admin
            </button>
            <button className="mobile-btn" onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text2)", padding: 4 }}>
              <Icon.Menu width={24} height={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-panel" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--g1)" }}>RRG Aviary</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)" }}>
                <Icon.X width={22} height={22} />
              </button>
            </div>
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "15px 0", fontSize: 17, fontWeight: 600, color: page === l.id ? "var(--g1)" : "var(--text1)", background: "none", border: "none", cursor: "pointer", borderBottom: "1px solid var(--cream3)" }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => go("admin")} className="btn-primary" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}>
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <footer style={{ background: "#111E17", color: "rgba(255,255,255,0.75)", marginTop: 96 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "68px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 48, marginBottom: 52 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, var(--g1), var(--b1))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon.Feather width={18} height={18} style={{ color: "white" }} />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "white" }}>RRG Aviary</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 22 }}>
              Where Wings Find Their Home. Premium hand-raised exotic birds bred with love in Nagercoil, Tamil Nadu since 2015.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { href: "#", icon: Icon.Instagram },
                { href: "#", icon: Icon.Facebook },
                { href: WALink("Hi! I found RRG Aviary."), icon: Icon.Msg, green: true },
              ].map(({ href, icon: I, green }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" style={{ width: 38, height: 38, borderRadius: "50%", background: green ? "rgba(37,211,102,0.18)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", color: green ? "#25D366" : "rgba(255,255,255,0.7)" }}>
                  <I width={15} height={15} />
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "white", marginBottom: 18 }}>Quick Links</h4>
            {[["home","Home"],["birds","Bird Collection"],["accessories","Accessories"],["gallery","Gallery"],["about","About Us"],["contact","Contact"]].map(([p, l]) => (
              <button key={p} onClick={() => go(p)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)", fontSize: 14, padding: "5px 0", transition: "color 0.2s", textAlign: "left" }}
                onMouseOver={e => e.target.style.color = "var(--g4)"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.55)"}>
                {l}
              </button>
            ))}
          </div>
          {/* Species */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "white", marginBottom: 18 }}>Bird Species</h4>
            {["Sun Conures", "African Lovebirds", "Budgerigars", "Zebra Finches", "Society Finches"].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--g3)", flexShrink: 0 }} />
                {s}
              </div>
            ))}
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "white", marginBottom: 18 }}>Get In Touch</h4>
            {[
              { I: Icon.Phone, t: "+91 98765 43210" },
              { I: Icon.Mail, t: "info@rrgaviary.com" },
              { I: Icon.MapPin, t: "Nagercoil, Tamil Nadu, India" },
            ].map(({ I, t }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                <I width={14} height={14} style={{ color: "var(--g4)", marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>© 2025 RRG Aviary. All rights reserved.</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Made with ❤️ for Bird Lovers</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── BIRD CARD ──────────────────────────────────────────────────────────── */
function BirdCard({ bird, delay = 0 }) {
  const avail = bird.availability;
  const statusCfg = {
    available: { bg: "#E6F7EE", color: "#1B6B3A", dot: "#27AE60", label: "Available" },
    reserved:  { bg: "#FFF3E0", color: "#8B4C00", dot: "#F57C00", label: "Reserved" },
    sold:      { bg: "#FDECEA", color: "#8B0000", dot: "#C0392B", label: "Sold" },
  }[avail] || {};

  return (
    <div className="card fade-in-up" style={{ animationDelay: `${delay}s` }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img src={bird.image} alt={bird.name} className="bird-img"
          onError={e => { e.target.src = FALLBACK_IMG; }} />
        <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {bird.badge
            ? <span className="badge badge-gold">{bird.badge}</span>
            : <span />}
          <span style={{ background: statusCfg.bg, color: statusCfg.color, padding: "4px 11px", borderRadius: 20, fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
            <span className="avail-dot" style={{ background: statusCfg.dot }} />{statusCfg.label}
          </span>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "var(--text1)", lineHeight: 1.1 }}>{bird.name}</h3>
            <p style={{ fontSize: 13, color: "var(--text3)", fontWeight: 600, marginTop: 2 }}>{bird.species}</p>
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "var(--g1)", lineHeight: 1 }}>
            ₹{bird.price.toLocaleString("en-IN")}
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", margin: "10px 0 12px" }}>
          <span className="badge badge-brown">{bird.age}</span>
          <span className="badge badge-blue">{bird.gender}</span>
          <span className="badge badge-green">{bird.mutation}</span>
        </div>
        <p style={{ fontSize: 13.5, color: "var(--text3)", lineHeight: 1.6, marginBottom: 16 }}>{bird.description}</p>
        <a href={WALink(`Hi! I'm interested in ${bird.name} (${bird.species}) listed at ₹${bird.price.toLocaleString("en-IN")}. Is it still available?`)} target="_blank" rel="noreferrer" style={{ display: "block" }}>
          <button className={avail === "sold" ? "btn-outline" : "btn-primary"} style={{ width: "100%", justifyContent: "center", padding: "12px 20px", fontSize: 14, opacity: avail === "sold" ? 0.55 : 1, pointerEvents: avail === "sold" ? "none" : "auto" }}>
            <Icon.WhatsApp width={15} height={15} />
            {avail === "sold" ? "Sold Out" : "Contact to Buy"}
          </button>
        </a>
      </div>
    </div>
  );
}

/* ─── ACCESSORY CARD ─────────────────────────────────────────────────────── */
function AccessoryCard({ item, onAdd, delay = 0 }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => { onAdd(item); setAdded(true); setTimeout(() => setAdded(false), 2000); };
  return (
    <div className="card fade-in-up" style={{ animationDelay: `${delay}s` }}>
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img src={item.image} alt={item.name} className="acc-img" onError={e => { e.target.src = FALLBACK_IMG; }} />
        <div style={{ position: "absolute", top: 10, right: 10, background: "white", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4, color: "var(--text2)" }}>
          <Icon.Star width={12} height={12} filled style={{ color: "#F59E0B" }} /> {item.rating}
        </div>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 11, color: "var(--b1)", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 5 }}>{item.category}</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 7, color: "var(--text1)" }}>{item.name}</h3>
        <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.55, marginBottom: 14 }}>{item.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "var(--g1)" }}>₹{item.price.toLocaleString("en-IN")}</span>
          <button onClick={handleAdd} className={added ? "btn-primary" : "btn-outline"} style={{ padding: "9px 18px", fontSize: 13 }}>
            {added ? <><Icon.Check width={14} height={14} /> Added</> : <><Icon.Cart width={14} height={14} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE: HOME
═══════════════════════════════════════════════════════════════════════════ */
function HomePage({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const featuredBirds = BIRDS_DATA.filter(b => b.availability === "available").slice(0, 4);
  const featuredAcc = ACC_DATA.slice(0, 4);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="hero-section">
        {/* layered background */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, #071910 0%, #0D2E1C 45%, #073040 100%)" }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center 35%",
          opacity: 0.38,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg, rgba(7,25,16,0.92) 0%, rgba(7,25,16,0.68) 55%, rgba(5,25,46,0.82) 100%)" }} />

        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(82,183,136,0.08)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(82,183,136,0.06)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ maxWidth: 660 }}>
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(82,183,136,0.14)", border: "1px solid rgba(82,183,136,0.25)", borderRadius: 50, padding: "8px 18px", marginBottom: 30 }}>
              <Icon.Feather width={14} height={14} style={{ color: "var(--g4)" }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--g4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Premium Exotic Bird Breeder · Nagercoil</span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 700, color: "white", lineHeight: 1.1, marginBottom: 22, animation: "fadeInUp 0.85s ease both" }}>
              Where Wings<br />
              <span style={{ color: "var(--g4)", fontStyle: "italic" }}>Find Their</span><br />
              Home
            </h1>

            {/* Tagline */}
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 38, maxWidth: 520, animation: "fadeInUp 0.85s 0.15s ease both" }}>
              Healthy, hand-raised Sun Conures, African Lovebirds, Budgies, and Finches — every bird nurtured with love and care from day one.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeInUp 0.85s 0.28s ease both" }}>
              <button className="btn-white" onClick={() => go("birds")}>
                Meet Our Birds <Icon.Arrow width={16} height={16} />
              </button>
              <a href={WALink("Hi! I found RRG Aviary and I'd like to enquire about available birds.")} target="_blank" rel="noreferrer">
                <button className="btn-wa">
                  <Icon.WhatsApp width={18} height={18} /> WhatsApp Us
                </button>
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 36, marginTop: 52, animation: "fadeInUp 0.85s 0.42s ease both", flexWrap: "wrap" }}>
              {[["100+", "Birds Sold"], ["9+", "Years Breeding"], ["4", "Species"], ["500+", "Happy Families"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: "var(--g4)", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.4)", animation: "floatY 2.5s ease-in-out infinite", zIndex: 2 }}>
          <span style={{ fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700 }}>SCROLL</span>
          <Icon.ChevDown width={18} height={18} />
        </div>
      </section>

      {/* ── SPECIES QUICK JUMP ── */}
      <section style={{ background: "var(--cream2)", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
          {[
            { name: "Sun Conures", count: BIRDS_DATA.filter(b => b.category === "sun-conure").length, color: "#F59E0B", emoji: "🦜" },
            { name: "African Lovebirds", count: BIRDS_DATA.filter(b => b.category === "lovebird").length, color: "#EF4444", emoji: "🦜" },
            { name: "Budgerigars", count: BIRDS_DATA.filter(b => b.category === "budgie").length, color: "#3B82F6", emoji: "🐦" },
            { name: "Finches", count: BIRDS_DATA.filter(b => b.category === "finch").length, color: "#10B981", emoji: "🐦" },
          ].map(sp => (
            <button key={sp.name} onClick={() => go("birds")}
              style={{ background: "white", border: "1.5px solid var(--cream3)", borderRadius: "var(--r)", padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all 0.25s", textAlign: "left" }}
              onMouseOver={e => { const el = e.currentTarget; el.style.borderColor = sp.color; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "var(--shadow-md)"; }}
              onMouseOut={e => { const el = e.currentTarget; el.style.borderColor = "var(--cream3)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: sp.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{sp.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text1)" }}>{sp.name}</div>
                <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 2 }}>{sp.count} birds available</div>
              </div>
              <Icon.ChevRight width={16} height={16} style={{ color: "var(--text4)" }} />
            </button>
          ))}
        </div>
      </section>

      {/* ── FEATURED BIRDS ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="section-eyebrow" style={{ color: "var(--g1)", justifyContent: "center" }}>
            <div className="eyebrow-line" style={{ background: "var(--g1)" }} />
            Featured Birds
            <div className="eyebrow-line" style={{ background: "var(--g1)" }} />
          </div>
          <h2 className="section-title">Meet Our Beautiful Birds</h2>
          <p className="section-sub" style={{ maxWidth: 500, margin: "10px auto 0" }}>Every bird is hand-raised with love, ensuring excellent temperament and perfect health</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
          {featuredBirds.map((b, i) => <BirdCard key={b.id} bird={b} delay={i * 0.08} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 42 }}>
          <button className="btn-outline" onClick={() => go("birds")}>View All Birds <Icon.Arrow width={16} height={16} /></button>
        </div>
      </section>

      {/* ── WHY CHOOSE RRG ── */}
      <section style={{ background: "linear-gradient(135deg, var(--g7) 0%, var(--b5) 100%)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 className="section-title">Why Choose RRG Aviary?</h2>
            <p className="section-sub">Our commitment to bird welfare and quality sets us apart</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 22 }}>
            {[
              { I: Icon.Heart, c: "#EF4444", t: "Raised with Love", d: "Every chick is socialised daily from hatching for exceptional tameness and bonding", bg: "#FEF2F2" },
              { I: Icon.Shield, c: "var(--g1)", t: "Vet Certified Healthy", d: "All birds are vet-checked, dewormed and vaccinated before they go to their new home", bg: "var(--g7)" },
              { I: Icon.Award, c: "#F59E0B", t: "Proven Genetics", d: "Imported and selectively bred pairs chosen for vibrant, healthy mutations", bg: "#FFFBEB" },
              { I: Icon.Leaf, c: "var(--b1)", t: "Lifetime Support", d: "Free expert guidance on bird care, diet, training and health — always available", bg: "var(--b5)" },
            ].map(({ I, c, t, d, bg }) => (
              <div key={t} style={{ background: "white", borderRadius: "var(--r)", padding: "28px 24px", boxShadow: "var(--shadow)", textAlign: "center" }}>
                <div style={{ width: 58, height: 58, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <I width={26} height={26} style={{ color: c }} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, marginBottom: 10, color: "var(--text1)" }}>{t}</h3>
                <p style={{ fontSize: 14, color: "var(--text3)", lineHeight: 1.65 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ACCESSORIES ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="section-eyebrow" style={{ color: "var(--b1)", justifyContent: "center" }}>
            <div className="eyebrow-line" style={{ background: "var(--b1)" }} />
            Accessories Store
            <div className="eyebrow-line" style={{ background: "var(--b1)" }} />
          </div>
          <h2 className="section-title">Everything Your Bird Needs</h2>
          <p className="section-sub" style={{ maxWidth: 500, margin: "10px auto 0" }}>Premium cages, toys, feed, nests and more — curated for your bird's wellbeing</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 22 }}>
          {featuredAcc.map((a, i) => <AccessoryCard key={a.id} item={a} onAdd={() => {}} delay={i * 0.07} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 42 }}>
          <button className="btn-blue" onClick={() => go("accessories")}>Shop All Accessories <Icon.Arrow width={16} height={16} /></button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "var(--cream2)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 className="section-title">Happy Bird Families</h2>
            <p className="section-sub">Stories from our wonderful community of bird lovers across Tamil Nadu</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
            {TESTIMONIALS_DATA.map(t => (
              <div key={t.name} className="testimonial-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 16, marginTop: 10 }}>
                  {Array(t.rating).fill(0).map((_, i) => <Icon.Star key={i} width={15} height={15} filled style={{ color: "#F59E0B" }} />)}
                </div>
                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.75, fontStyle: "italic", marginBottom: 22 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--g6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "var(--g1)", flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text1)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 1 }}>{t.city} · {t.bird}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: "linear-gradient(130deg, var(--g1) 0%, #1A5C38 50%, var(--b1) 100%)", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 350, height: 350, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 18 }}>
            Ready to Bring Home a<br /><span style={{ fontStyle: "italic", color: "var(--g5)" }}>Feathered Companion?</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 38 }}>
            Browse our available birds or reach us on WhatsApp for enquiries, pricing, and home delivery options across Tamil Nadu.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-white" onClick={() => go("birds")}>
              Browse Birds <Icon.Arrow width={16} height={16} />
            </button>
            <a href={WALink("Hi RRG Aviary! I'd like to enquire about available birds.")} target="_blank" rel="noreferrer">
              <button className="btn-wa"><Icon.WhatsApp width={18} height={18} /> WhatsApp Now</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE: BIRDS
═══════════════════════════════════════════════════════════════════════════ */
function BirdsPage() {
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [search, setSearch] = useState("");

  const categories = [
    { id: "all", label: "All Birds" },
    { id: "sun-conure", label: "Sun Conures" },
    { id: "lovebird", label: "African Lovebirds" },
    { id: "budgie", label: "Budgerigars" },
    { id: "finch", label: "Finches" },
  ];

  const filtered = BIRDS_DATA.filter(b =>
    (category === "all" || b.category === category) &&
    (availability === "all" || b.availability === availability) &&
    (search === "" || [b.name, b.species, b.mutation, b.description].join(" ").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, var(--g7) 0%, var(--b5) 100%)", padding: "54px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-eyebrow" style={{ color: "var(--g1)" }}>
            <Icon.Feather width={14} height={14} /> Bird Collection
          </div>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Find Your Perfect Bird</h1>
          <p className="section-sub">Browse our hand-raised exotic birds, all ready for loving homes in Tamil Nadu</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "34px 24px" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 340 }}>
            <Icon.Search width={16} height={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text4)" }} />
            <input className="nb-input" placeholder="Search by name, species, mutation…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
          </div>
          <select className="nb-input" value={availability} onChange={e => setAvailability(e.target.value)} style={{ width: "auto", flex: "0 1 auto", minWidth: 160 }}>
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {categories.map(c => (
            <button key={c.id} className={`tab ${category === c.id ? "active" : ""}`} onClick={() => setCategory(c.id)}>{c.label}</button>
          ))}
        </div>

        {/* Count */}
        <p style={{ fontSize: 14, color: "var(--text3)", fontWeight: 600, marginBottom: 24 }}>
          Showing <strong style={{ color: "var(--text1)" }}>{filtered.length}</strong> bird{filtered.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--text4)" }}>
            <Icon.Feather width={52} height={52} style={{ margin: "0 auto 18px", opacity: 0.3 }} />
            <p style={{ fontSize: 19, fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>No birds found</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtered.map((b, i) => <BirdCard key={b.id} bird={b} delay={i * 0.04} />)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE: ACCESSORIES
═══════════════════════════════════════════════════════════════════════════ */
function AccessoriesPage() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [ordered, setOrdered] = useState(false);

  const cats = [
    { id: "all", label: "All Products" },
    { id: "cages", label: "Cages" },
    { id: "perches", label: "Perches" },
    { id: "feed", label: "Bird Feed" },
    { id: "toys", label: "Toys" },
    { id: "nest", label: "Nest Boxes" },
    { id: "water", label: "Water Bottles" },
  ];

  const filtered = ACC_DATA.filter(a =>
    (category === "all" || a.category === category) &&
    (search === "" || a.name.toLowerCase().includes(search.toLowerCase()))
  );

  const addToCart = (item) => setCart(prev => {
    const ex = prev.find(c => c.id === item.id);
    return ex ? prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { ...item, qty: 1 }];
  });
  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));
  const updateQty = (id, delta) => setCart(prev =>
    prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
  );

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const placeOrder = () => {
    setOrdered(true);
    setTimeout(() => { setOrdered(false); setCart([]); setCartOpen(false); }, 3500);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, var(--b5) 0%, var(--g7) 100%)", padding: "54px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-eyebrow" style={{ color: "var(--b1)" }}>
              <Icon.Package width={14} height={14} /> Accessories Store
            </div>
            <h1 className="section-title" style={{ marginBottom: 8 }}>Bird Care Essentials</h1>
            <p className="section-sub">Premium accessories curated for your bird's health and happiness</p>
          </div>
          <button className="btn-blue" onClick={() => setCartOpen(true)} style={{ position: "relative" }}>
            <Icon.Cart width={18} height={18} /> Cart{totalItems > 0 ? ` (${totalItems})` : ""}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "34px 24px" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 340 }}>
            <Icon.Search width={16} height={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text4)" }} />
            <input className="nb-input" placeholder="Search accessories…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {cats.map(c => <button key={c.id} className={`tab ${category === c.id ? "active" : ""}`} onClick={() => setCategory(c.id)}>{c.label}</button>)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 22 }}>
          {filtered.map((a, i) => <AccessoryCard key={a.id} item={a} onAdd={addToCart} delay={i * 0.04} />)}
        </div>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="cart-drawer" onClick={() => setCartOpen(false)}>
          <div className="cart-panel" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, paddingBottom: 18, borderBottom: "1.5px solid var(--cream3)" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700 }}>Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)" }}>
                <Icon.X width={22} height={22} />
              </button>
            </div>

            {ordered ? (
              <div style={{ textAlign: "center", padding: "70px 20px" }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", background: "var(--g6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Icon.Check width={34} height={34} style={{ color: "var(--g1)" }} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Order Sent!</h3>
                <p style={{ color: "var(--text3)", fontSize: 15, lineHeight: 1.65 }}>We'll contact you on WhatsApp shortly to confirm your order and arrange delivery.</p>
              </div>
            ) : cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "70px 20px", color: "var(--text3)" }}>
                <Icon.Cart width={52} height={52} style={{ margin: "0 auto 18px", opacity: 0.25 }} />
                <p style={{ fontSize: 17, fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>Your cart is empty</p>
                <p style={{ fontSize: 14, marginTop: 8 }}>Add some bird accessories above!</p>
              </div>
            ) : (
              <>
                {/* Items */}
                <div style={{ flex: 1, marginBottom: 20 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--cream3)" }}>
                      <img src={item.image} alt={item.name} style={{ width: 58, height: 58, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} onError={e => { e.target.src = FALLBACK_IMG; }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text1)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                        <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 2 }}>₹{item.price.toLocaleString("en-IN")}</div>
                        {/* Qty controls */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ width: 26, height: 26, borderRadius: "50%", border: "1.5px solid var(--cream3)", background: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>−</button>
                          <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} style={{ width: 26, height: 26, borderRadius: "50%", border: "1.5px solid var(--cream3)", background: "none", cursor: "pointer", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>+</button>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontWeight: 700, color: "var(--g1)", fontSize: 15 }}>₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#C0392B", marginTop: 6, padding: 2 }}>
                          <Icon.Trash width={15} height={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div style={{ borderTop: "2px solid var(--cream3)", paddingTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>Subtotal ({totalItems} items)</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--g1)" }}>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "var(--text4)", marginBottom: 18 }}>Delivery charges will be discussed via WhatsApp</p>
                  <a href={WALink(`Hi RRG Aviary! I'd like to order these accessories:\n${cart.map(c => `• ${c.name} × ${c.qty} = ₹${(c.price * c.qty).toLocaleString("en-IN")}`).join("\n")}\n\nTotal: ₹${totalPrice.toLocaleString("en-IN")}`)} target="_blank" rel="noreferrer" onClick={placeOrder} style={{ display: "block" }}>
                    <button className="btn-wa" style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15 }}>
                      <Icon.WhatsApp width={18} height={18} /> Order via WhatsApp
                    </button>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE: GALLERY
═══════════════════════════════════════════════════════════════════════════ */
function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox(l => (l - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
  const next = () => setLightbox(l => (l + 1) % GALLERY_DATA.length);

  useEffect(() => {
    const fn = (e) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox]);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, var(--g7) 0%, var(--b5) 100%)", padding: "54px 24px 40px", textAlign: "center" }}>
        <div className="section-eyebrow" style={{ color: "var(--g1)", justifyContent: "center" }}>
          <Icon.Camera width={14} height={14} /> Gallery
        </div>
        <h1 className="section-title" style={{ marginBottom: 8 }}>Life at RRG Aviary</h1>
        <p className="section-sub">A glimpse into our colourful world of exotic birds</p>
      </div>

      {/* Masonry Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 24px" }}>
        <div style={{ columns: "3 260px", columnGap: 16 }}>
          {GALLERY_DATA.map((img, i) => (
            <div key={img.id} className="gal-item" style={{ marginBottom: 16, breakInside: "avoid" }} onClick={() => setLightbox(i)}>
              <img src={img.src} alt={img.alt} style={{ width: "100%", borderRadius: "var(--r)", display: "block" }} onError={e => { e.target.src = FALLBACK_IMG; }} />
              <div className="gal-overlay">
                <Icon.Eye width={36} height={36} style={{ color: "white" }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 12, color: "var(--text4)", fontSize: 13.5 }}>Click any photo to view fullscreen · Use arrow keys to navigate</p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 18, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", backdropFilter: "blur(6px)" }}>
            <Icon.ChevLeft width={26} height={26} />
          </button>

          <img src={GALLERY_DATA[lightbox].src} alt={GALLERY_DATA[lightbox].alt} onClick={e => e.stopPropagation()} />

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 18, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", backdropFilter: "blur(6px)" }}>
            <Icon.ChevRight width={26} height={26} />
          </button>

          {/* Close */}
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,0.14)", border: "none", borderRadius: "50%", width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
            <Icon.X width={20} height={20} />
          </button>

          {/* Counter + label */}
          <div style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, fontWeight: 600 }}>
              {lightbox + 1} / {GALLERY_DATA.length} — {GALLERY_DATA[lightbox].alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE: ABOUT
═══════════════════════════════════════════════════════════════════════════ */
function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(130deg, #071910 0%, #0D2E1C 50%, #073040 100%)", padding: "80px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -100, top: -100, width: 450, height: 450, borderRadius: "50%", border: "1px solid rgba(82,183,136,0.07)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="section-eyebrow" style={{ color: "var(--g4)" }}>
            <Icon.Feather width={14} height={14} /> Our Story
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 5vw, 62px)", fontWeight: 700, color: "white", lineHeight: 1.15, maxWidth: 620 }}>
            A Passion for Birds,<br />
            <span style={{ color: "var(--g4)", fontStyle: "italic" }}>Nurtured for Nine Years</span>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "68px 24px" }}>
        {/* Story section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 52, alignItems: "center", marginBottom: 80 }}>
          <div>
            <div style={{ width: 56, height: 3, background: "linear-gradient(90deg, var(--g1), var(--b1))", borderRadius: 3, marginBottom: 22 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, marginBottom: 22, color: "var(--text1)" }}>The RRG Aviary Story</h2>
            <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.82, marginBottom: 18 }}>
              Founded in 2015 in the beautiful coastal town of Nagercoil, Tamil Nadu, RRG Aviary was born from a deep personal love for exotic birds. What started with a single pair of Sun Conures soon grew into a premier aviary housing over 15 breeding pairs across four beloved species.
            </p>
            <p style={{ fontSize: 16, color: "var(--text2)", lineHeight: 1.82 }}>
              We believe every bird deserves to be raised with the same warmth and attention you'd give a cherished family member — not mass-produced. Our birds are held, spoken to, and socialised from the very first day of life, resulting in companions that are gentle, trusting, and bursting with personality.
            </p>
          </div>
          <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
            <img src="https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=700&q=80" alt="RRG Aviary" style={{ width: "100%", height: 370, objectFit: "cover" }} onError={e => { e.target.src = FALLBACK_IMG; }} />
          </div>
        </div>

        {/* Values grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 22, marginBottom: 72 }}>
          {[
            { I: Icon.Heart, c: "#EF4444", bg: "#FEF2F2", t: "Hand-Taming Process", d: "From 10 days of age, all our chicks are handled daily. By weaning, every bird is comfortable on fingers, shoulders, and with strangers — making them ideal family companions." },
            { I: Icon.Shield, c: "var(--g1)", bg: "var(--g7)", t: "Hygiene & Safety", d: "Cages are cleaned twice daily. Breeding areas are sanitised weekly with bird-safe disinfectants. All birds undergo routine vet checks and scheduled deworming." },
            { I: Icon.Feather, c: "var(--b1)", bg: "var(--b5)", t: "Genetics & Mutations", d: "We carefully pair birds to produce healthy, vibrant mutations. Our genetics records go back multiple generations, ensuring no inbreeding and exceptional health." },
            { I: Icon.Leaf, c: "#F59E0B", bg: "#FFFBEB", t: "Diet & Nutrition", d: "Fresh millets, seasonal vegetables, egg food, mineral blocks and fruits — our birds receive a balanced, varied diet resulting in brilliant plumage and excellent immunity." },
          ].map(({ I, c, bg, t, d }) => (
            <div key={t} style={{ background: "white", borderRadius: "var(--r)", padding: 28, boxShadow: "var(--shadow)" }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <I width={24} height={24} style={{ color: c }} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 600, marginBottom: 10, color: "var(--text1)" }}>{t}</h3>
              <p style={{ fontSize: 14, color: "var(--text3)", lineHeight: 1.7 }}>{d}</p>
            </div>
          ))}
        </div>

        {/* Promise banner */}
        <div style={{ background: "linear-gradient(135deg, var(--g7) 0%, var(--b5) 100%)", borderRadius: "var(--r-lg)", padding: "52px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, marginBottom: 16, color: "var(--text1)" }}>Our Promise to You</h2>
          <p style={{ fontSize: 17, color: "var(--text2)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.8 }}>
            Every bird that leaves RRG Aviary is guaranteed healthy, fully weaned, and comes with a detailed care guide. We remain available for lifetime support — because when you buy a bird from us, you become part of our family.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {["Health Guarantee", "Lifetime Support", "Ethical Breeding", "Honest Pricing", "Expert Guidance"].map(p => (
              <span key={p} className="badge badge-green" style={{ padding: "10px 18px", fontSize: 13.5 }}>
                <Icon.Check width={13} height={13} /> {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE: CONTACT
═══════════════════════════════════════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const msg = `Hi! I'm ${form.name}.\nSubject: ${form.subject}\n\n${form.message}\n\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ""}`;
    window.open(WALink(msg), "_blank");
    setSent(true);
    setErrors({});
    setTimeout(() => setSent(false), 4000);
  };

  const f = (key, val) => { setForm(p => ({ ...p, [key]: val })); setErrors(p => ({ ...p, [key]: "" })); };

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, var(--g7) 0%, var(--b5) 100%)", padding: "54px 24px 40px", textAlign: "center" }}>
        <div className="section-eyebrow" style={{ color: "var(--g1)", justifyContent: "center" }}>
          <Icon.Msg width={14} height={14} /> Get In Touch
        </div>
        <h1 className="section-title" style={{ marginBottom: 8 }}>We'd Love to Hear from You</h1>
        <p className="section-sub">Enquiries about birds, availability, accessories or care? Reach out anytime!</p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 52 }}>
          {/* Left: Info */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 28, color: "var(--text1)" }}>Contact Information</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {[
                { I: Icon.Phone, bg: "var(--g7)", c: "var(--g1)", label: "Phone / WhatsApp", value: "+91 98765 43210", href: "tel:+919876543210" },
                { I: Icon.Mail, bg: "var(--b5)", c: "var(--b1)", label: "Email Address", value: "info@rrgaviary.com", href: "mailto:info@rrgaviary.com" },
                { I: Icon.MapPin, bg: "var(--br5)", c: "var(--br1)", label: "Location", value: "Nagercoil, Kanyakumari District, Tamil Nadu 629001" },
              ].map(({ I, bg, c, label, value, href }) => (
                <div key={label} className="contact-info-card">
                  <div className="icon-circle" style={{ background: bg }}>
                    <I width={20} height={20} style={{ color: c }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11.5, color: "var(--text4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{label}</div>
                    {href
                      ? <a href={href} style={{ fontSize: 15, fontWeight: 700, color: "var(--text1)" }}>{value}</a>
                      : <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text1)", lineHeight: 1.5 }}>{value}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Follow Us</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              {[
                { href: "#", I: Icon.Instagram, bg: "#E1306C", label: "Instagram" },
                { href: "#", I: Icon.Facebook, bg: "#1877F2", label: "Facebook" },
                { href: WALink("Hi RRG Aviary!"), I: Icon.Msg, bg: "#25D366", label: "WhatsApp" },
              ].map(({ href, I, bg, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: bg + "14", border: `1px solid ${bg}33`, borderRadius: 50, padding: "10px 18px", fontSize: 14, fontWeight: 700, color: bg, transition: "all 0.2s" }}>
                  <I width={15} height={15} /> {label}
                </a>
              ))}
            </div>

            {/* Map */}
            <div style={{ borderRadius: "var(--r)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126144.6038736673!2d77.3579427!3d8.1831527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f6c36de26f5d%3A0x3c9ca5f9e6d4e9e7!2sNagercoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="250" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" title="RRG Aviary Location"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div style={{ background: "white", borderRadius: "var(--r-lg)", padding: "38px", boxShadow: "var(--shadow-md)" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24, color: "var(--text1)" }}>Send a Message</h2>

              {sent && (
                <div style={{ background: "var(--g6)", border: "1px solid var(--g5)", borderRadius: "var(--r-sm)", padding: "14px 16px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon.Check width={18} height={18} style={{ color: "var(--g1)" }} />
                  <span style={{ fontSize: 14, color: "var(--g1)", fontWeight: 600 }}>Message opened in WhatsApp!</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[
                    { key: "name", label: "Your Name *", ph: "e.g. Ravi Kumar", type: "text" },
                    { key: "phone", label: "Phone Number *", ph: "+91 98765 43210", type: "tel" },
                  ].map(({ key, label, ph, type }) => (
                    <div key={key}>
                      <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>{label}</label>
                      <input className="nb-input" type={type} value={form[key]} onChange={e => f(key, e.target.value)} placeholder={ph} style={{ borderColor: errors[key] ? "#EF4444" : undefined }} />
                      {errors[key] && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors[key]}</p>}
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>Email Address</label>
                  <input className="nb-input" type="email" value={form.email} onChange={e => f("email", e.target.value)} placeholder="your@email.com" />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>Subject *</label>
                  <select className="nb-input" value={form.subject} onChange={e => f("subject", e.target.value)} style={{ borderColor: errors.subject ? "#EF4444" : undefined }}>
                    <option value="">Select a subject…</option>
                    <option>Bird Availability Enquiry</option>
                    <option>Accessories Order</option>
                    <option>Bird Care & Health Advice</option>
                    <option>Home Delivery Enquiry</option>
                    <option>Breeding Pair Request</option>
                    <option>General Question</option>
                  </select>
                  {errors.subject && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.subject}</p>}
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>Message *</label>
                  <textarea className="nb-input" rows={5} value={form.message} onChange={e => f("message", e.target.value)} placeholder="Tell us which bird you're interested in, or ask us anything about bird care, delivery, or pricing…" style={{ resize: "vertical", borderColor: errors.message ? "#EF4444" : undefined }} />
                  {errors.message && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.message}</p>}
                </div>

                <button type="submit" className="btn-wa" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16 }}>
                  <Icon.WhatsApp width={20} height={20} /> Send via WhatsApp
                </button>
                <p style={{ textAlign: "center", fontSize: 12.5, color: "var(--text4)", marginTop: 12 }}>This will open WhatsApp with your message pre-filled</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE: ADMIN
═══════════════════════════════════════════════════════════════════════════ */
function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [birds, setBirds] = useState(BIRDS_DATA);
  const [accessories, setAccessories] = useState(ACC_DATA);
  const [showAddBird, setShowAddBird] = useState(false);
  const [showAddAcc, setShowAddAcc] = useState(false);
  const [editingBird, setEditingBird] = useState(null);

  const emptyBird = { name: "", species: "Sun Conure", category: "sun-conure", age: "", gender: "Male", mutation: "", price: "", availability: "available", description: "", image: "", badge: "" };
  const emptyAcc = { name: "", category: "cages", price: "", description: "", image: "", rating: 4.8 };
  const [newBird, setNewBird] = useState(emptyBird);
  const [newAcc, setNewAcc] = useState(emptyAcc);

  /* Login */
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === "admin@rrgaviary.com" && loginForm.password === "rrg2025") {
      setLoggedIn(true); setLoginError("");
    } else {
      setLoginError("Invalid credentials. Use: admin@rrgaviary.com / rrg2025");
    }
  };

  /* Birds CRUD */
  const addBird = () => {
    if (!newBird.name || !newBird.price) return;
    setBirds(p => [...p, { ...newBird, id: Date.now(), price: Number(newBird.price), badge: newBird.badge || null }]);
    setNewBird(emptyBird); setShowAddBird(false);
  };
  const deleteBird = (id) => setBirds(p => p.filter(b => b.id !== id));
  const toggleAvail = (id) => setBirds(p => p.map(b => b.id === id
    ? { ...b, availability: b.availability === "available" ? "sold" : "available" } : b));

  /* Accessories CRUD */
  const addAcc = () => {
    if (!newAcc.name || !newAcc.price) return;
    setAccessories(p => [...p, { ...newAcc, id: Date.now(), price: Number(newAcc.price) }]);
    setNewAcc(emptyAcc); setShowAddAcc(false);
  };
  const deleteAcc = (id) => setAccessories(p => p.filter(a => a.id !== id));

  /* Stats */
  const stats = [
    { label: "Total Birds", val: birds.length, I: Icon.Feather, c: "var(--g1)", bg: "var(--g7)" },
    { label: "Available", val: birds.filter(b => b.availability === "available").length, I: Icon.Check, c: "#16A34A", bg: "#DCFCE7" },
    { label: "Sold", val: birds.filter(b => b.availability === "sold").length, I: Icon.Cart, c: "var(--b1)", bg: "var(--b5)" },
    { label: "Products", val: accessories.length, I: Icon.Package, c: "var(--br1)", bg: "var(--br5)" },
  ];

  const menuItems = [
    { id: "dashboard", I: Icon.Home, label: "Dashboard" },
    { id: "birds", I: Icon.Feather, label: "Manage Birds" },
    { id: "accessories", I: Icon.Package, label: "Accessories" },
    { id: "orders", I: Icon.Cart, label: "Orders" },
    { id: "settings", I: Icon.Settings, label: "Settings" },
  ];

  /* ── Login Screen ── */
  if (!loggedIn) return (
    <div style={{ minHeight: "82vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream2)", padding: 24 }}>
      <div style={{ background: "white", borderRadius: "var(--r-lg)", padding: "46px", maxWidth: 430, width: "100%", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 60, height: 60, borderRadius: "var(--r)", background: "linear-gradient(135deg, var(--g1), var(--b1))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
            <Icon.Feather width={28} height={28} style={{ color: "white" }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 5 }}>Admin Login</h2>
          <p style={{ fontSize: 14, color: "var(--text3)" }}>RRG Aviary Management Panel</p>
          <div style={{ marginTop: 14, padding: "10px 16px", background: "var(--b5)", borderRadius: "var(--r-sm)", fontSize: 13, color: "var(--b1)", fontWeight: 500, border: "1px solid var(--b4)" }}>
            Demo: admin@rrgaviary.com / rrg2025
          </div>
        </div>

        {loginError && (
          <div style={{ background: "#FDECEA", color: "#B91C1C", borderRadius: "var(--r-sm)", padding: "12px 16px", fontSize: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon.Alert width={16} height={16} /> {loginError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>Email Address</label>
            <input className="nb-input" type="email" required value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} placeholder="admin@rrgaviary.com" />
          </div>
          <div style={{ marginBottom: 26 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>Password</label>
            <input className="nb-input" type="password" required value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16 }}>
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );

  /* ── Admin Layout ── */
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 68px)", background: "#EDE9E3" }}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div style={{ padding: "22px 16px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--g1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon.Feather width={18} height={18} style={{ color: "white" }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>RRG Aviary</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>Admin Panel</div>
            </div>
          </div>
          <div style={{ marginTop: 18, padding: "10px 12px", background: "rgba(255,255,255,0.07)", borderRadius: 8 }}>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Administrator</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>admin@rrgaviary.com</div>
          </div>
        </div>
        <div style={{ padding: "8px 0", flex: 1 }}>
          {menuItems.map(m => (
            <button key={m.id} className={`admin-menu-item ${activeMenu === m.id ? "active" : ""}`} onClick={() => setActiveMenu(m.id)}>
              <m.I width={17} height={17} /> {m.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "10px 10px 18px" }}>
          <button className="admin-menu-item" onClick={() => setLoggedIn(false)} style={{ color: "#FCA5A5" }}>
            <Icon.Logout width={17} height={17} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto", minWidth: 0 }}>

        {/* ── DASHBOARD ── */}
        {activeMenu === "dashboard" && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, marginBottom: 6 }}>Dashboard</h2>
            <p style={{ fontSize: 14, color: "var(--text3)", marginBottom: 28 }}>Welcome back! Here's your aviary at a glance.</p>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
              {stats.map(s => (
                <div key={s.label} className="stat-card">
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <s.I width={21} height={21} style={{ color: s.c }} />
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "var(--text1)", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 13.5, color: "var(--text3)", fontWeight: 600, marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent birds table */}
            <div style={{ background: "white", borderRadius: "var(--r)", padding: "26px", boxShadow: "var(--shadow)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700 }}>Recent Birds</h3>
                <button onClick={() => setActiveMenu("birds")} className="btn-outline" style={{ padding: "8px 16px", fontSize: 13 }}>Manage All</button>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--cream2)" }}>
                      {["", "Name", "Species", "Price", "Status", "Action"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11.5, fontWeight: 700, color: "var(--text4)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {birds.slice(0, 7).map(b => {
                      const sc = { available: { bg: "#DCFCE7", c: "#15803D" }, reserved: { bg: "#FEF3C7", c: "#92400E" }, sold: { bg: "#FEE2E2", c: "#991B1B" } }[b.availability];
                      return (
                        <tr key={b.id} style={{ borderBottom: "1px solid var(--cream2)", transition: "background 0.15s" }}
                          onMouseOver={e => e.currentTarget.style.background = "var(--cream2)"}
                          onMouseOut={e => e.currentTarget.style.background = "none"}>
                          <td style={{ padding: "10px 14px" }}>
                            <img src={b.image || FALLBACK_IMG} alt={b.name} style={{ width: 46, height: 46, borderRadius: 8, objectFit: "cover" }} onError={e => { e.target.src = FALLBACK_IMG; }} />
                          </td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "var(--text1)" }}>{b.name}</td>
                          <td style={{ padding: "10px 14px", color: "var(--text3)" }}>{b.species}</td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "var(--g1)", fontFamily: "'Playfair Display', serif", fontSize: 16 }}>₹{b.price.toLocaleString("en-IN")}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{ padding: "4px 11px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: sc.bg, color: sc.c }}>
                              {b.availability.charAt(0).toUpperCase() + b.availability.slice(1)}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <button onClick={() => toggleAvail(b.id)} style={{ background: "var(--g7)", border: "1px solid var(--g5)", borderRadius: 7, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: "var(--g1)", transition: "all 0.15s" }}>
                              {b.availability === "available" ? "Mark Sold" : "Mark Available"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── MANAGE BIRDS ── */}
        {activeMenu === "birds" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700 }}>Manage Birds</h2>
                <p style={{ fontSize: 14, color: "var(--text3)", marginTop: 3 }}>{birds.length} birds in your collection</p>
              </div>
              <button className="btn-primary" onClick={() => setShowAddBird(v => !v)}>
                <Icon.Plus width={16} height={16} /> {showAddBird ? "Cancel" : "Add New Bird"}
              </button>
            </div>

            {/* Add Bird Form */}
            {showAddBird && (
              <div style={{ background: "white", borderRadius: "var(--r)", padding: "28px", boxShadow: "var(--shadow)", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Add New Bird</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  {[
                    { key: "name", label: "Bird Name *", ph: "e.g. Goldie" },
                    { key: "age", label: "Age", ph: "e.g. 4 months" },
                    { key: "mutation", label: "Mutation / Colour", ph: "e.g. Pineapple" },
                    { key: "price", label: "Price (₹) *", ph: "e.g. 4500", type: "number" },
                    { key: "image", label: "Image URL", ph: "https://unsplash.com/..." },
                    { key: "badge", label: "Badge (optional)", ph: "e.g. Popular, Rare, Pair" },
                  ].map(({ key, label, ph, type }) => (
                    <div key={key}>
                      <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>{label}</label>
                      <input className="nb-input" type={type || "text"} value={newBird[key]} onChange={e => setNewBird(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>Gender</label>
                    <select className="nb-input" value={newBird.gender} onChange={e => setNewBird(p => ({ ...p, gender: e.target.value }))}>
                      {["Male", "Female", "Pair", "Unknown"].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>Category</label>
                    <select className="nb-input" value={newBird.category} onChange={e => setNewBird(p => ({ ...p, category: e.target.value }))}>
                      {[["sun-conure", "Sun Conure"], ["lovebird", "African Lovebird"], ["budgie", "Budgerigar"], ["finch", "Finch"]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>Availability</label>
                    <select className="nb-input" value={newBird.availability} onChange={e => setNewBird(p => ({ ...p, availability: e.target.value }))}>
                      {["available", "reserved", "sold"].map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>Description</label>
                  <textarea className="nb-input" rows={3} value={newBird.description} onChange={e => setNewBird(p => ({ ...p, description: e.target.value }))} placeholder="Brief bird description and temperament…" style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button className="btn-primary" onClick={addBird}><Icon.Plus width={15} height={15} /> Add Bird</button>
                  <button className="btn-outline" onClick={() => { setShowAddBird(false); setNewBird(emptyBird); }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Birds table */}
            <div style={{ background: "white", borderRadius: "var(--r)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead style={{ background: "var(--cream2)" }}>
                    <tr>
                      {["Photo", "Name", "Species", "Mutation", "Age/Gender", "Price", "Status", "Actions"].map(h => (
                        <th key={h} style={{ padding: "13px 14px", textAlign: "left", fontSize: 11.5, fontWeight: 700, color: "var(--text4)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {birds.map(b => {
                      const sc = { available: { bg: "#DCFCE7", c: "#15803D" }, reserved: { bg: "#FEF3C7", c: "#92400E" }, sold: { bg: "#FEE2E2", c: "#991B1B" } }[b.availability];
                      return (
                        <tr key={b.id} style={{ borderBottom: "1px solid var(--cream2)" }}
                          onMouseOver={e => e.currentTarget.style.background = "#FAFAF7"}
                          onMouseOut={e => e.currentTarget.style.background = "white"}>
                          <td style={{ padding: "10px 14px" }}>
                            <img src={b.image || FALLBACK_IMG} alt={b.name} style={{ width: 48, height: 48, borderRadius: 9, objectFit: "cover" }} onError={e => { e.target.src = FALLBACK_IMG; }} />
                          </td>
                          <td style={{ padding: "10px 14px", fontWeight: 700, color: "var(--text1)" }}>{b.name}</td>
                          <td style={{ padding: "10px 14px", color: "var(--text3)", fontSize: 13 }}>{b.species}</td>
                          <td style={{ padding: "10px 14px", color: "var(--text3)", fontSize: 13 }}>{b.mutation}</td>
                          <td style={{ padding: "10px 14px", color: "var(--text3)", fontSize: 13 }}>{b.age} · {b.gender}</td>
                          <td style={{ padding: "10px 14px", fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "var(--g1)" }}>₹{b.price.toLocaleString("en-IN")}</td>
                          <td style={{ padding: "10px 14px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11.5, fontWeight: 700, background: sc.bg, color: sc.c }}>
                              {b.availability.charAt(0).toUpperCase() + b.availability.slice(1)}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px" }}>
                            <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                              <button onClick={() => toggleAvail(b.id)} style={{ background: "var(--g7)", border: "1px solid var(--g5)", borderRadius: 7, padding: "6px 11px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: "var(--g1)", whiteSpace: "nowrap" }}>
                                {b.availability === "available" ? "Mark Sold" : "Mark Available"}
                              </button>
                              <button onClick={() => deleteBird(b.id)} style={{ background: "#FEE2E2", border: "none", borderRadius: 7, padding: "7px 9px", cursor: "pointer", color: "#B91C1C", display: "flex", alignItems: "center" }}>
                                <Icon.Trash width={14} height={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ── ACCESSORIES ── */}
        {activeMenu === "accessories" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700 }}>Accessories</h2>
                <p style={{ fontSize: 14, color: "var(--text3)", marginTop: 3 }}>{accessories.length} products in your store</p>
              </div>
              <button className="btn-primary" onClick={() => setShowAddAcc(v => !v)}>
                <Icon.Plus width={16} height={16} /> {showAddAcc ? "Cancel" : "Add Accessory"}
              </button>
            </div>

            {showAddAcc && (
              <div style={{ background: "white", borderRadius: "var(--r)", padding: "28px", boxShadow: "var(--shadow)", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 22 }}>Add New Accessory</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
                  {[
                    { key: "name", label: "Product Name *", ph: "e.g. Large Bird Cage" },
                    { key: "price", label: "Price (₹) *", ph: "e.g. 2500", type: "number" },
                    { key: "image", label: "Image URL", ph: "https://..." },
                    { key: "rating", label: "Rating (0-5)", ph: "e.g. 4.8", type: "number" },
                  ].map(({ key, label, ph, type }) => (
                    <div key={key}>
                      <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>{label}</label>
                      <input className="nb-input" type={type || "text"} value={newAcc[key]} onChange={e => setNewAcc(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>Category</label>
                    <select className="nb-input" value={newAcc.category} onChange={e => setNewAcc(p => ({ ...p, category: e.target.value }))}>
                      {["cages", "perches", "feed", "toys", "nest", "water"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 5 }}>Description</label>
                  <textarea className="nb-input" rows={2} value={newAcc.description} onChange={e => setNewAcc(p => ({ ...p, description: e.target.value }))} placeholder="Product description…" style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button className="btn-primary" onClick={addAcc}><Icon.Plus width={15} height={15} /> Add Product</button>
                  <button className="btn-outline" onClick={() => { setShowAddAcc(false); setNewAcc(emptyAcc); }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {accessories.map(a => (
                <div key={a.id} style={{ background: "white", borderRadius: "var(--r)", boxShadow: "var(--shadow)", overflow: "hidden" }}>
                  <img src={a.image} alt={a.name} style={{ width: "100%", height: 148, objectFit: "cover" }} onError={e => { e.target.src = FALLBACK_IMG; }} />
                  <div style={{ padding: "16px 16px 18px" }}>
                    <div style={{ fontSize: 11, color: "var(--b1)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>{a.category}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 5, color: "var(--text1)" }}>{a.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--g1)" }}>₹{a.price.toLocaleString("en-IN")}</span>
                      <button onClick={() => deleteAcc(a.id)} style={{ background: "#FEE2E2", border: "none", borderRadius: 7, padding: "7px 12px", cursor: "pointer", color: "#B91C1C", display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 700 }}>
                        <Icon.Trash width={13} height={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── ORDERS ── */}
        {activeMenu === "orders" && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Orders</h2>
            <div style={{ background: "white", borderRadius: "var(--r)", padding: "52px 40px", boxShadow: "var(--shadow)", textAlign: "center", maxWidth: 520 }}>
              <Icon.Cart width={52} height={52} style={{ margin: "0 auto 18px", color: "var(--text4)", opacity: 0.4 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Orders via WhatsApp</h3>
              <p style={{ color: "var(--text3)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                All purchase enquiries and orders are handled through WhatsApp Business for personalised service. Connect your account below.
              </p>
              <a href={`https://wa.me/919876543210`} target="_blank" rel="noreferrer">
                <button className="btn-wa" style={{ justifyContent: "center" }}>
                  <Icon.WhatsApp width={18} height={18} /> Open WhatsApp Business
                </button>
              </a>
            </div>
          </>
        )}

        {/* ── SETTINGS ── */}
        {activeMenu === "settings" && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Settings</h2>
            <div style={{ background: "white", borderRadius: "var(--r)", padding: "34px", boxShadow: "var(--shadow)", maxWidth: 580 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Aviary Information</h3>
              {[
                { label: "Business Name", val: "RRG Aviary" },
                { label: "Tagline", val: "Where Wings Find Their Home" },
                { label: "WhatsApp Number", val: "+91 98765 43210" },
                { label: "Email Address", val: "info@rrgaviary.com" },
                { label: "Location", val: "Nagercoil, Tamil Nadu 629001" },
                { label: "Instagram Handle", val: "@rrgaviary" },
              ].map(({ label, val }) => (
                <div key={label} style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", display: "block", marginBottom: 6 }}>{label}</label>
                  <input className="nb-input" defaultValue={val} />
                </div>
              ))}
              <button className="btn-primary" style={{ marginTop: 8 }}>
                <Icon.Check width={16} height={16} /> Save Changes
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════════ */
export default function RRGAviaryApp() {
  const [page, setPage] = useState("home");
  const [cartCount] = useState(0);

  useEffect(() => {
    injectGlobalCSS();
    document.title = "RRG Aviary — Where Wings Find Their Home";
  }, []);

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pageComponents = {
    home:        <HomePage setPage={navigate} />,
    birds:       <BirdsPage />,
    accessories: <AccessoriesPage />,
    gallery:     <GalleryPage />,
    about:       <AboutPage />,
    contact:     <ContactPage />,
    admin:       <AdminPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <Navbar page={page} setPage={navigate} cartCount={cartCount} />

      <main key={page} style={{ animation: "fadeIn 0.35s ease" }}>
        {pageComponents[page] || pageComponents.home}
      </main>

      {page !== "admin" && <Footer setPage={navigate} />}
      <WhatsAppFAB />
    </div>
  );
}
