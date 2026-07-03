import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

/* ═══════════════════════════════════════════════
   GLOBAL STYLES (injected once)
═══════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bleu: #0d2b6e;
    --bleu2: #1565c0;
    --bleu3: #1e3a8a;
    --vert: #1b7a3e;
    --vert3: #43a047;
    --accent: #5cb800;
    --navy: #0a1f4e;
    --white: #ffffff;
    --gray50: #f8fafc;
    --gray100: #f1f5f9;
    --gray200: #e2e8f0;
    --gray600: #475569;
    --gray700: #334155;
    --gray900: #0f172a;
    --radius: 12px;
    --shadow: 0 4px 24px rgba(13,43,110,.10);
    --shadow-lg: 0 8px 40px rgba(13,43,110,.15);
    --transition: all .22s cubic-bezier(.4,0,.2,1);
  }

  html { scroll-behavior: smooth; overflow: auto !important; height: auto !important; }
  body {
    font-family: 'Inter', sans-serif;
    color: var(--gray900);
    background: #fff;
    overflow-x: hidden;
    display: block !important;
    height: auto !important;
  }
#root { width: 100%; }
  a { text-decoration: none; color: inherit; }

  /* Topbar */
  .topbar {
    background: var(--navy);
    padding: 8px 0;
    font-size: 13px;
    color: rgba(255,255,255,.85);
  }
  .topbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .topbar-left {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .topbar-item {
    display: flex;
    align-items: center;
    gap: 6px;
    transition: var(--transition);
  }
  .topbar-item:hover { color: var(--accent); }
  .topbar-item svg { flex-shrink: 0; }
  .topbar-socials {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .topbar-socials a {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(255,255,255,.12);
    display: flex; align-items: center; justify-content: center;
    transition: var(--transition);
  }
  .topbar-socials a:hover { background: var(--accent); }

  /* Navbar */
  .navbar {
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 16px rgba(13,43,110,.08);
    transition: var(--transition);
  }
  .navbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 32px;
    height: 72px;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .logo-badge {
    width: 44px; height: 44px;
    background: var(--bleu);
    color: #fff;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: 16px;
    letter-spacing: 1px;
  }
  .logo-text { display: flex; flex-direction: column; line-height: 1.2; }
  .logo-name {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: var(--bleu);
  }
  .logo-sub {
    font-size: 10px;
    font-weight: 600;
    color: var(--vert3);
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    list-style: none;
  }
  .nav-item { position: relative; }
  .nav-link {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 14px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray700);
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    border: none;
    background: none;
    white-space: nowrap;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--bleu);
    background: var(--gray100);
  }
  .nav-link.active { color: var(--bleu); font-weight: 600; }
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px; height: 3px;
    background: var(--accent);
    border-radius: 2px;
  }

  /* Dropdown */
  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background: #fff;
    border-radius: 14px;
    box-shadow: var(--shadow-lg);
    padding: 8px;
    min-width: 240px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: var(--transition);
    border: 1px solid var(--gray200);
    z-index: 100;
  }
  .nav-item:hover .dropdown,
  .nav-item:focus-within .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .dropdown a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13.5px;
    color: var(--gray700);
    transition: var(--transition);
  }
  .dropdown a:hover {
    background: var(--gray100);
    color: var(--bleu);
  }
  .dropdown a .dd-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: var(--gray100);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    transition: var(--transition);
  }
  .dropdown a:hover .dd-icon { background: var(--bleu); }
  .dropdown a:hover .dd-icon svg { color: white; }

  .nav-cta {
    background: var(--bleu);
    color: #fff !important;
    padding: 10px 22px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    border: none;
    transition: var(--transition);
    margin-left: auto;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .nav-cta:hover { background: var(--bleu2); transform: translateY(-1px); }

  /* Mobile hamburger */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin-left: auto;
  }
  .hamburger span {
    display: block;
    width: 24px; height: 2px;
    background: var(--bleu);
    border-radius: 2px;
    transition: var(--transition);
  }
  .mobile-menu {
    display: none;
    background: #fff;
    border-top: 1px solid var(--gray200);
    padding: 16px 24px 24px;
  }
  .mobile-menu.open { display: block; }
  .mobile-menu a, .mobile-menu button {
    display: block;
    padding: 12px 0;
    border-bottom: 1px solid var(--gray100);
    font-size: 15px;
    color: var(--gray700);
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
  }
  .mobile-menu a:last-child, .mobile-menu button:last-child { border-bottom: none; }

  /* Hero */
  .hero {
    background: linear-gradient(135deg, #f0f4ff 0%, #e8f5e9 100%);
    padding: 60px 0 0;
    overflow: hidden;
    position: relative;
  }
  .hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(13,43,110,.08);
    color: var(--bleu);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    border: 1px solid rgba(13,43,110,.15);
    margin-bottom: 24px;
  }
  .hero-eyebrow::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--accent);
    border-radius: 50%;
  }
  .hero-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(28px, 3.5vw, 46px);
    font-weight: 800;
    line-height: 1.15;
    color: var(--gray900);
    margin-bottom: 20px;
  }
  .hero-title .hl-blue { color: var(--bleu2); }
  .hero-title .hl-green { color: var(--vert3); }
  .hero-title .hl-accent { color: var(--accent); }
  .hero-desc {
    font-size: 16px;
    line-height: 1.7;
    color: var(--gray600);
    margin-bottom: 32px;
    max-width: 480px;
  }
  .hero-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  .btn-primary {
    background: var(--bleu);
    color: #fff;
    padding: 14px 28px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
  }
  .btn-primary:hover { background: var(--bleu2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,43,110,.3); }
  .btn-outline {
    background: transparent;
    color: var(--bleu);
    padding: 13px 24px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 2px solid var(--bleu);
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
  }
  .btn-outline:hover { background: var(--bleu); color: #fff; }
  .btn-wa {
    background: #25D366;
    color: #fff;
    padding: 13px 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
  }
  .btn-wa:hover { background: #128C7E; transform: translateY(-2px); }

  .hero-trust {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--gray600);
  }
  .trust-item svg { color: var(--vert3); }

  /* Hero right / slider */
  .hero-visual {
    position: relative;
    height: 500px;
  }
  .slider-track {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 24px 24px 0 0;
    overflow: hidden;
  }
  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity .7s ease;
    background-size: cover;
    background-position: center;
  }
  .slide.active { opacity: 1; }
  .slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, rgba(13,43,110,.3), transparent);
  }
  .slider-dots {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 5;
  }
  .slider-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,.5);
    cursor: pointer;
    border: none;
    transition: var(--transition);
  }
  .slider-dot.active { background: #fff; width: 24px; border-radius: 4px; }

  .badge-15 {
    position: absolute;
    bottom: 32px;
    right: -16px;
    background: var(--bleu);
    color: #fff;
    border-radius: 16px;
    padding: 18px 22px;
    text-align: center;
    box-shadow: var(--shadow-lg);
    z-index: 5;
    animation: float 3s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .badge-15 .big { font-size: 36px; font-weight: 800; font-family: 'Poppins', sans-serif; line-height: 1; }
  .badge-15 .sup { font-size: 18px; vertical-align: super; }
  .badge-15 .label { font-size: 10px; font-weight: 600; letter-spacing: 1px; opacity: .85; margin-top: 2px; }

  /* Stats bar */
  .stats-bar {
    background: var(--bleu);
    padding: 36px 0;
  }
  .stats-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    text-align: center;
  }
  .stat-item { color: #fff; }
  .stat-num {
    font-family: 'Poppins', sans-serif;
    font-size: 38px;
    font-weight: 800;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    margin-bottom: 6px;
  }
  .stat-num .stat-icon {
    width: 36px; height: 36px;
    background: rgba(255,255,255,.15);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    margin-right: 10px;
    font-size: 18px;
  }
  .stat-label { font-size: 13px; opacity: .8; font-weight: 400; }

  /* Clients strip */
  .clients {
    padding: 48px 0;
    background: #fff;
    border-bottom: 1px solid var(--gray200);
  }
  .clients-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .section-label {
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gray600);
    margin-bottom: 28px;
  }
  .clients-logos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
  }
  .client-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 800;
    color: var(--gray700);
    opacity: .65;
    transition: var(--transition);
    cursor: pointer;
    filter: grayscale(1);
  }
  .client-logo:hover { opacity: 1; filter: grayscale(0); color: var(--bleu); }
  .client-logo .cl-dot { width: 10px; height: 10px; border-radius: 50%; }
  .clients-cta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--bleu2);
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    transition: var(--transition);
    white-space: nowrap;
  }
  .clients-cta:hover { color: var(--vert); }

  /* Section heading */
  .section-eyebrow {
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: var(--vert3);
    margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(22px, 2.8vw, 34px);
    font-weight: 700;
    text-align: center;
    color: var(--gray900);
    margin-bottom: 48px;
    line-height: 1.25;
  }
  .section-title em { color: var(--vert3); font-style: normal; }

  /* Services grid */
  .services {
    padding: 80px 0;
    background: var(--gray50);
  }
  .services-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .service-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,.06);
    transition: var(--transition);
    cursor: pointer;
    border: 1px solid var(--gray200);
  }
  .service-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }
  .sc-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
  }
  .sc-img-placeholder {
    width: 100%;
    height: 160px;
    background: linear-gradient(135deg, var(--bleu) 0%, var(--bleu2) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }
  .sc-body { padding: 18px; }
  .sc-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .sc-icon-wrap {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .sc-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--gray900);
    line-height: 1.3;
  }
  .sc-list {
    list-style: none;
    margin-bottom: 14px;
  }
  .sc-list li {
    font-size: 12.5px;
    color: var(--gray600);
    padding: 3px 0;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    line-height: 1.4;
  }
  .sc-list li::before {
    content: '→';
    color: var(--accent);
    font-size: 11px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .sc-cta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--vert);
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: var(--transition);
    padding: 0;
  }
  .sc-cta:hover { color: var(--bleu); gap: 10px; }
  .services-btn-wrap {
    text-align: center;
    margin-top: 40px;
  }
  .btn-navy {
    background: var(--bleu);
    color: #fff;
    padding: 14px 32px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
  }
  .btn-navy:hover { background: var(--bleu2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,43,110,.3); }

  /* Products carousel */
  .products {
    padding: 80px 0;
    background: var(--navy);
  }
  .products-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .products .section-eyebrow { color: var(--accent); }
  .products .section-title { color: #fff; }
  .carousel-wrapper { position: relative; }
  .carousel-track {
    display: flex;
    gap: 20px;
    overflow: hidden;
    padding: 8px 0 24px;
  }
  .product-card {
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 16px;
    overflow: hidden;
    flex-shrink: 0;
    width: calc((100% - 5*20px) / 6);
    min-width: 160px;
    transition: var(--transition);
    cursor: pointer;
  }
  .product-card:hover {
    background: rgba(255,255,255,.12);
    border-color: var(--accent);
    transform: translateY(-4px);
  }
  .pc-img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    display: block;
  }
  .pc-img-placeholder {
    width: 100%;
    height: 120px;
    background: rgba(255,255,255,.08);
    display: flex; align-items: center; justify-content: center;
    font-size: 32px;
  }
  .pc-body { padding: 12px 14px 16px; }
  .pc-title {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    line-height: 1.4;
  }
  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,.15);
    border: 1px solid rgba(255,255,255,.25);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: var(--transition);
    z-index: 5;
    font-size: 18px;
  }
  .carousel-arrow:hover { background: var(--accent); border-color: var(--accent); }
  .carousel-arrow.left { left: -22px; }
  .carousel-arrow.right { right: -22px; }
  .products-btn-wrap { text-align: center; margin-top: 16px; }
  .btn-outline-white {
    background: transparent;
    color: #fff;
    padding: 12px 28px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
    border: 2px solid rgba(255,255,255,.4);
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-outline-white:hover { background: rgba(255,255,255,.1); border-color: #fff; }

  /* Advantages */
  .advantages {
    padding: 80px 0;
    background: #fff;
  }
  .advantages-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .adv-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .adv-card {
    text-align: center;
    padding: 36px 24px;
    border-radius: 16px;
    background: var(--gray50);
    border: 1px solid var(--gray200);
    transition: var(--transition);
  }
  .adv-card:hover {
    border-color: var(--bleu2);
    background: #fff;
    box-shadow: var(--shadow);
    transform: translateY(-4px);
  }
  .adv-icon {
    width: 64px; height: 64px;
    border-radius: 18px;
    background: var(--bleu);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    margin: 0 auto 20px;
    transition: var(--transition);
  }
  .adv-card:hover .adv-icon { background: var(--accent); }
  .adv-title {
    font-weight: 700;
    font-size: 16px;
    color: var(--gray900);
    margin-bottom: 10px;
  }
  .adv-desc {
    font-size: 13.5px;
    color: var(--gray600);
    line-height: 1.6;
  }

  /* Ticker */
  .ticker {
    background: var(--vert);
    padding: 14px 0;
    overflow: hidden;
  }
  .ticker-inner {
    display: flex;
    gap: 64px;
    animation: ticker 20s linear infinite;
    white-space: nowrap;
    width: max-content;
  }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,.9);
    letter-spacing: .5px;
  }
  .ticker-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }

  /* Contact section */
  .contact-section {
    padding: 80px 0;
    background: var(--gray50);
  }
  .contact-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 64px;
    align-items: start;
  }
  .contact-info h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: var(--gray900);
    margin-bottom: 16px;
    line-height: 1.3;
  }
  .contact-info h2 em { color: var(--vert3); font-style: normal; }
  .contact-info p {
    font-size: 15px;
    color: var(--gray600);
    line-height: 1.7;
    margin-bottom: 32px;
  }
  .contact-details { display: flex; flex-direction: column; gap: 16px; }
  .contact-detail {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .cd-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--bleu);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .cd-text { flex: 1; }
  .cd-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--gray600); margin-bottom: 2px; }
  .cd-value { font-size: 14px; font-weight: 500; color: var(--gray900); }

  /* Form */
  .contact-form {
    background: #fff;
    border-radius: 20px;
    padding: 36px;
    box-shadow: var(--shadow);
    border: 1px solid var(--gray200);
  }
  .form-title {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--gray900);
    margin-bottom: 24px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
  .form-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--gray700);
  }
  .form-input, .form-textarea, .form-select {
    padding: 12px 16px;
    border-radius: 10px;
    border: 1.5px solid var(--gray200);
    font-size: 14px;
    color: var(--gray900);
    font-family: inherit;
    transition: var(--transition);
    background: #fff;
    resize: none;
    width: 100%;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus {
    outline: none;
    border-color: var(--bleu);
    box-shadow: 0 0 0 3px rgba(13,43,110,.1);
  }
  .form-textarea { height: 120px; }
  .form-submit {
    width: 100%;
    padding: 14px;
    background: var(--bleu);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .form-submit:hover { background: var(--bleu2); transform: translateY(-2px); }
  .form-submit:disabled { opacity: .7; cursor: not-allowed; transform: none; }
  .form-success {
    background: #e8f5e9;
    border: 1px solid var(--vert3);
    color: var(--vert);
    padding: 14px 18px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    margin-top: 14px;
    display: flex; align-items: center; gap: 8px;
  }

  /* Footer */
  .footer {
    background: var(--navy);
    color: rgba(255,255,255,.8);
    padding: 64px 0 0;
  }
  .footer-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(255,255,255,.1);
  }
  .footer-brand .logo-name { color: #fff; font-size: 16px; }
  .footer-brand .logo-sub { color: var(--accent); }
  .footer-desc {
    font-size: 13.5px;
    line-height: 1.7;
    margin: 16px 0 24px;
    opacity: .75;
  }
  .footer-socials { display: flex; gap: 10px; }
  .footer-socials a {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    transition: var(--transition);
    font-size: 15px;
  }
  .footer-socials a:hover { background: var(--accent); transform: translateY(-2px); }
  .footer-col h4 {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 18px;
  }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-col ul li a {
    font-size: 13.5px;
    opacity: .7;
    transition: var(--transition);
    display: flex; align-items: center; gap: 6px;
  }
  .footer-col ul li a:hover { opacity: 1; color: var(--accent); gap: 10px; }
  .footer-col ul li a::before { content: '→'; font-size: 11px; }
  .footer-bottom {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    opacity: .6;
    flex-wrap: wrap;
    gap: 8px;
  }

  /* Floating WhatsApp */
  .wa-float {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 900;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
  .wa-btn {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: #25D366;
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(37,211,102,.4);
    cursor: pointer;
    font-size: 26px;
    border: none;
    transition: var(--transition);
    text-decoration: none;
  }
  .wa-btn:hover { background: #128C7E; transform: scale(1.1); }
  .wa-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #25D366;
    animation: pulse 2s ease infinite;
    z-index: -1;
  }
  @keyframes pulse {
    0% { opacity: .7; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.8); }
  }

  /* Cart panel */
  .cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.5);
    z-index: 1100;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
  }
  .cart-overlay.open { opacity: 1; visibility: visible; }
  .cart-panel {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: 380px;
    max-width: 100vw;
    background: #fff;
    z-index: 1101;
    transform: translateX(100%);
    transition: transform .3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 32px rgba(0,0,0,.15);
  }
  .cart-overlay.open .cart-panel { transform: translateX(0); }
  .cart-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray200);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cart-header h3 { font-weight: 700; font-size: 18px; color: var(--gray900); }
  .cart-close {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--gray100);
    border: none;
    cursor: pointer;
    font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    transition: var(--transition);
    color: var(--gray700);
  }
  .cart-close:hover { background: var(--gray200); }
  .cart-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
  .cart-empty { text-align: center; color: var(--gray600); padding: 48px 0; }
  .cart-item {
    display: flex;
    gap: 12px;
    padding: 14px 0;
    border-bottom: 1px solid var(--gray100);
    align-items: center;
  }
  .ci-icon {
    width: 48px; height: 48px;
    background: var(--gray100);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }
  .ci-info { flex: 1; }
  .ci-name { font-size: 14px; font-weight: 600; color: var(--gray900); margin-bottom: 4px; }
  .ci-qty { font-size: 12px; color: var(--gray600); }
  .ci-remove {
    background: none; border: none; cursor: pointer;
    color: var(--gray600); font-size: 16px; transition: var(--transition);
    padding: 4px;
  }
  .ci-remove:hover { color: #ef4444; }
  .cart-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--gray200);
  }
  .cart-footer-btn {
    width: 100%;
    padding: 14px;
    background: var(--bleu);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
  }
  .cart-footer-btn:hover { background: var(--bleu2); }

  /* Toast */
  .toast-wrap {
    position: fixed;
    bottom: 100px;
    right: 24px;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
  }
  .toast {
    background: var(--gray900);
    color: #fff;
    padding: 12px 18px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,.2);
    animation: slideIn .3s ease;
    max-width: 320px;
  }
  @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  /* AI Assistant */
  .ai-float {
    position: fixed;
    bottom: 92px;
    right: 24px;
    z-index: 900;
  }
  .ai-toggle {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--bleu);
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 22px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(13,43,110,.35);
    transition: var(--transition);
  }
  .ai-toggle:hover { background: var(--bleu2); transform: scale(1.08); }
  .ai-chat {
    position: absolute;
    bottom: 64px;
    right: 0;
    width: 340px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 40px rgba(0,0,0,.18);
    border: 1px solid var(--gray200);
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(12px) scale(.95);
    transition: var(--transition);
  }
  .ai-chat.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }
  .ai-chat-header {
    background: var(--bleu);
    color: #fff;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ai-avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .ai-hinfo { flex: 1; }
  .ai-hname { font-weight: 700; font-size: 14px; }
  .ai-hstatus { font-size: 11px; opacity: .8; }
  .ai-close-btn {
    background: none; border: none; color: rgba(255,255,255,.7);
    cursor: pointer; font-size: 18px; transition: var(--transition);
  }
  .ai-close-btn:hover { color: #fff; }
  .ai-messages {
    height: 260px;
    overflow-y: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: var(--gray50);
  }
  .ai-msg {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 13px;
    line-height: 1.5;
  }
  .ai-msg.bot {
    background: #fff;
    color: var(--gray900);
    border: 1px solid var(--gray200);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
  .ai-msg.user {
    background: var(--bleu);
    color: #fff;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }
  .ai-typing {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 10px 14px;
    background: #fff;
    border: 1px solid var(--gray200);
    border-radius: 12px;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
    width: fit-content;
  }
  .ai-typing span {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gray600);
    animation: bounce 1.2s ease infinite;
  }
  .ai-typing span:nth-child(2) { animation-delay: .2s; }
  .ai-typing span:nth-child(3) { animation-delay: .4s; }
  @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
  .ai-input-row {
    display: flex;
    gap: 8px;
    padding: 12px 14px;
    border-top: 1px solid var(--gray200);
    background: #fff;
  }
  .ai-input {
    flex: 1;
    padding: 10px 14px;
    border-radius: 10px;
    border: 1.5px solid var(--gray200);
    font-size: 13px;
    font-family: inherit;
    color: var(--gray900);
    transition: var(--transition);
  }
  .ai-input:focus { outline: none; border-color: var(--bleu); }
  .ai-send {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: var(--bleu);
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    transition: var(--transition);
    flex-shrink: 0;
  }
  .ai-send:hover { background: var(--bleu2); }
  .ai-send:disabled { opacity: .5; cursor: not-allowed; }

  /* Admin */
  .admin-wrap {
    min-height: 100vh;
    background: var(--gray50);
    padding: 40px 24px;
    font-family: inherit;
  }
  .admin-card {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .admin-header {
    background: var(--bleu);
    color: #fff;
    padding: 28px 36px;
    display: flex; align-items: center; gap: 16px;
  }
  .admin-header h1 { font-size: 22px; font-weight: 700; }
  .admin-body { padding: 36px; }
  .admin-section { margin-bottom: 40px; }
  .admin-section h2 {
    font-size: 17px; font-weight: 700; color: var(--gray900);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--gray200);
  }
  .blog-post-item {
    border: 1px solid var(--gray200);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .bpi-meta { font-size: 12px; color: var(--gray600); margin-top: 4px; }
  .btn-danger {
    background: #fee2e2;
    color: #dc2626;
    border: none;
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
  }
  .btn-danger:hover { background: #fecaca; }
  .btn-green {
    background: var(--vert);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    font-family: inherit;
  }
  .btn-green:hover { background: var(--vert3); }

  /* Blog */
  .blog-section {
    padding: 80px 0;
    background: var(--gray50);
  }
  .blog-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .blog-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,.06);
    border: 1px solid var(--gray200);
    transition: var(--transition);
    cursor: pointer;
  }
  .blog-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .blog-img {
    width: 100%;
    height: 180px;
    background: linear-gradient(135deg, var(--bleu) 0%, var(--vert) 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 48px;
  }
  .blog-body { padding: 20px; }
  .blog-tag {
    display: inline-block;
    background: var(--gray100);
    color: var(--bleu);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 100px;
    margin-bottom: 10px;
  }
  .blog-title { font-weight: 700; font-size: 15px; color: var(--gray900); margin-bottom: 8px; line-height: 1.4; }
  .blog-excerpt { font-size: 13px; color: var(--gray600); line-height: 1.6; margin-bottom: 14px; }
  .blog-meta { font-size: 12px; color: var(--gray600); display: flex; align-items: center; gap: 8px; }

  /* Responsive */
  @media (max-width: 1024px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .adv-grid { grid-template-columns: repeat(2, 1fr); }
    .footer-inner { grid-template-columns: 1fr 1fr; }
    .blog-grid { grid-template-columns: repeat(2, 1fr); }
    .product-card { width: calc((100% - 3*20px) / 4); }
  }

  @media (max-width: 768px) {
    .nav-links, .nav-cta { display: none !important; }
    .hamburger { display: flex; }
    .hero-inner { grid-template-columns: 1fr; }
    .hero-visual { height: 280px; order: -1; }
    .badge-15 { right: 16px; bottom: 16px; }
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .services-grid { grid-template-columns: 1fr 1fr; }
    .adv-grid { grid-template-columns: 1fr 1fr; }
    .contact-inner { grid-template-columns: 1fr; }
    .footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
    .blog-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .product-card { width: calc((100% - 2*20px) / 3); }
    .topbar { display: none; }
    .clients-logos { gap: 24px; }
  }

  @media (max-width: 480px) {
    .stats-inner { grid-template-columns: repeat(2, 1fr); }
    .services-grid { grid-template-columns: 1fr; }
    .adv-grid { grid-template-columns: 1fr; }
    .footer-inner { grid-template-columns: 1fr; }
    .product-card { width: calc((100% - 20px) / 2); }
  }
`;

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const SERVICES = [
  {
    id: 1, emoji: "💧",
    color: "#0d2b6e", bg: "#e8f0fe",
    title: "Traitement des eaux",
    items: ["STEP & Stations d'épuration", "Eau potable & industrielle", "Eaux usées"],
    slug: "traitement-eaux"
  },
  {
    id: 2, emoji: "🧪",
    color: "#1b7a3e", bg: "#e8f5e9",
    title: "Analyses environnementales",
    items: ["Eau, Sol, Air, Boues, Déchets", "Analyses physico-chimiques", "Normes NM / ISO"],
    slug: "analyses-environnementales"
  },
  {
    id: 3, emoji: "⚗️",
    color: "#7b1fa2", bg: "#f3e5f5",
    title: "Produits chimiques",
    items: ["Réactifs de laboratoire", "Produits de traitement des eaux", "Coagulants, floculants, biocides"],
    slug: "produits-chimiques"
  },
  {
    id: 4, emoji: "⚙️",
    color: "#e65100", bg: "#fff3e0",
    title: "Équipements & Osmoseurs",
    items: ["Osmoseurs industriels & domestiques", "Adoucisseurs, filtres, pompes", "Instrumentation & accessoires"],
    slug: "equipements"
  },
  {
    id: 5, emoji: "📐",
    color: "#f57c00", bg: "#fff8e1",
    title: "Ingénierie & Conception",
    items: ["Études & Conception", "Installation & Mise en service", "Suivi & Optimisation"],
    slug: "ingenierie"
  },
  {
    id: 6, emoji: "🌿",
    color: "#2e7d32", bg: "#e8f5e9",
    title: "Environnement & HSE",
    items: ["Études d'impact & Audits", "ISO 14001 – Management env.", "Conseil HSE & Conformité"],
    slug: "environnement-hse"
  },
  {
    id: 7, emoji: "🎓",
    color: "#f9a825", bg: "#fffde7",
    title: "Formation & Sensibilisation",
    items: ["Formation HSE", "Traitement des eaux", "Laboratoire & Environnement"],
    slug: "formation"
  },
  {
    id: 8, emoji: "🔧",
    color: "#0277bd", bg: "#e1f5fe",
    title: "Maintenance & SAV",
    items: ["Maintenance préventive & corrective", "Contrats annuels", "Assistance technique 7/7"],
    slug: "maintenance"
  }
];

const PRODUCTS = [
  { id: 1, emoji: "🧫", title: "Réactifs de laboratoire", slug: "reactifs" },
  { id: 2, emoji: "🛢️", title: "Produits chimiques de traitement des eaux", slug: "chimiques" },
  { id: 3, emoji: "💠", title: "Osmoseurs industriels", slug: "osmoseurs-ind" },
  { id: 4, emoji: "🏠", title: "Osmoseurs domestiques", slug: "osmoseurs-dom" },
  { id: 5, emoji: "🔵", title: "Adoucisseurs d'eau", slug: "adoucisseurs" },
  { id: 6, emoji: "📦", title: "Consommables & accessoires", slug: "consommables" },
  { id: 7, emoji: "⚗️", title: "Produits HSE & sécurité", slug: "hse-securite" },
  { id: 8, emoji: "🔬", title: "Équipements de mesure", slug: "mesure" }
];

const CLIENTS = [
  { name: "OCP", color: "#00873E", dot: "#00873E" },
  { name: "acciona", color: "#004B9B", dot: "#004B9B" },
  { name: "ONCF", color: "#E30613", dot: "#E30613" },
  { name: "ONEE", color: "#0055A5", dot: "#0055A5" },
  { name: "SOMAGEC", color: "#F7941D", dot: "#F7941D" },
  { name: "JESA", color: "#00A79D", dot: "#00A79D" }
];

const TICKER_ITEMS = [
  "Traitement des eaux", "Analyses environnementales", "Produits chimiques",
  "Osmoseurs & équipements", "Ingénierie & HSE", "Formation professionnelle",
  "Maintenance 7/7", "Normes NM / ISO", "Plus de 500 clients satisfaits",
  "15+ ans d'expertise au Maroc", "El Jadida – Maroc"
];

const ADVANTAGES = [
  { icon: "✅", title: "Qualité certifiée", desc: "Produits & services conformes aux normes NM, ISO et STEP" },
  { icon: "🎯", title: "Solutions sur mesure", desc: "Études personnalisées adaptées à chaque contexte industriel" },
  { icon: "💡", title: "Innovation continue", desc: "Technologies modernes et performantes pour vos défis environnementaux" },
  { icon: "🤝", title: "Accompagnement global", desc: "De l'étude à la maintenance, on reste à vos côtés à chaque étape" }
];

const HERO_SLIDES = [
  { bg: "linear-gradient(135deg, #0d2b6e 0%, #1565c0 50%, #1b7a3e 100%)", emoji: "💧" },
  { bg: "linear-gradient(135deg, #1b7a3e 0%, #43a047 50%, #0d2b6e 100%)", emoji: "🏭" },
  { bg: "linear-gradient(135deg, #0a1f4e 0%, #1565c0 100%)", emoji: "⚗️" }
];

/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { role: "bot", text: "Bonjour ! Je suis l'assistant UEM. Comment puis-je vous aider concernant nos services d'environnement, traitement des eaux ou produits chimiques ?" }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [carouselOff, setCarouselOff] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const [blogs, setBlogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("uem_blogs") || "[]"); } catch { return []; }
  });
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", category: "Actualités", emoji: "📰" });

  const aiMessagesRef = useRef(null);

  // Inject CSS
  useEffect(() => {
    if (!document.getElementById("uem-css")) {
      const s = document.createElement("style");
      s.id = "uem-css";
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  // Hero auto-slide
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Scroll AI messages
  useEffect(() => {
    if (aiMessagesRef.current) aiMessagesRef.current.scrollTop = aiMessagesRef.current.scrollHeight;
  }, [aiMessages, aiLoading]);

  // Persist blogs
  useEffect(() => {
    localStorage.setItem("uem_blogs", JSON.stringify(blogs));
  }, [blogs]);

  // Toast helper
  const toast = useCallback((msg, icon = "✅") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  // Cart helpers
  const addToCart = useCallback((item) => {
    setCart(c => {
      const ex = c.find(x => x.id === item.id);
      if (ex) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    toast(`${item.emoji} ${item.title} ajouté au panier`);
  }, [toast]);

  const removeFromCart = useCallback((id) => {
    setCart(c => c.filter(x => x.id !== id));
  }, []);

  // AI send
  const sendAI = useCallback(async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userMsg = aiInput.trim();
    setAiInput("");
    setAiMessages(m => [...m, { role: "user", text: userMsg }]);
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "Tu es l'assistant expert d'UEM (Univers Environnement Maroc), basé à El Jadida au Maroc. Tu aides les clients avec leurs questions sur le traitement des eaux, analyses environnementales, produits chimiques, osmoseurs, équipements HSE et services d'ingénierie. Réponds en français de manière professionnelle et concise (max 3 phrases). Si la question dépasse ton expertise, oriente vers le contact : +212 523 37 74 17 ou univers.env@gmail.com.",
          messages: [{ role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || "Merci pour votre question. Contactez-nous au +212 523 37 74 17 pour une réponse personnalisée.";
      setAiMessages(m => [...m, { role: "bot", text: reply }]);
    } catch {
      setAiMessages(m => [...m, { role: "bot", text: "Une erreur est survenue. Veuillez nous contacter directement au +212 523 37 74 17." }]);
    }
    setAiLoading(false);
  }, [aiInput, aiLoading]);

  // Carousel
  const carouselMax = Math.max(0, PRODUCTS.length - 6);
  const carouselPrev = () => setCarouselOff(o => Math.max(0, o - 1));
  const carouselNext = () => setCarouselOff(o => Math.min(carouselMax, o + 1));

  // Page router
  if (page === "admin") return (
    <AdminPanel
      auth={adminAuth} pwd={adminPwd} setPwd={setAdminPwd}
      setAuth={setAdminAuth} blogs={blogs} setBlogs={setBlogs}
      blogForm={blogForm} setBlogForm={setBlogForm}
      setPage={setPage} toast={toast}
    />
  );

  return (
    <div>
      {/* Topbar */}
      <TopBar />

      {/* Navbar */}
      <Navbar setPage={setPage} cartCount={cart.length} setCartOpen={setCartOpen} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Hero */}
      <HeroSection slideIdx={slideIdx} setSlideIdx={setSlideIdx} />

      {/* Stats */}
      <StatsBar />

      {/* Clients */}
      <ClientsStrip />

      {/* Services */}
      <ServicesGrid />

      {/* Products */}
      <ProductsCarousel
        carouselOff={carouselOff}
        carouselPrev={carouselPrev}
        carouselNext={carouselNext}
        addToCart={addToCart}
      />

      {/* Advantages */}
      <AdvantagesSection />

      {/* Ticker */}
      <TickerBanner />

      {/* Blog */}
      <BlogSection blogs={blogs} />

      {/* Contact */}
      <ContactSection toast={toast} />

      {/* Footer */}
      <FooterSection setPage={setPage} />

      {/* Cart */}
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)}>
        <div className="cart-panel" onClick={e => e.stopPropagation()}>
          <div className="cart-header">
            <h3>🛒 Panier ({cart.length})</h3>
            <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="cart-body">
            {cart.length === 0 ? (
              <div className="cart-empty"><div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div><p>Votre panier est vide</p></div>
            ) : cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="ci-icon">{item.emoji}</div>
                <div className="ci-info">
                  <div className="ci-name">{item.title}</div>
                  <div className="ci-qty">Qté: {item.qty}</div>
                </div>
                <button className="ci-remove" onClick={() => removeFromCart(item.id)}>🗑️</button>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div className="cart-footer">
              <button className="cart-footer-btn" onClick={() => { toast("Demande de devis envoyée ! Nous vous contactons rapidement.", "📩"); setCartOpen(false); }}>
                Demander un devis →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant */}
      <div className="ai-float">
        <div className={`ai-chat ${aiOpen ? "open" : ""}`}>
          <div className="ai-chat-header">
            <div className="ai-avatar">🤖</div>
            <div className="ai-hinfo">
              <div className="ai-hname">Assistant UEM</div>
              <div className="ai-hstatus">● En ligne</div>
            </div>
            <button className="ai-close-btn" onClick={() => setAiOpen(false)}>✕</button>
          </div>
          <div className="ai-messages" ref={aiMessagesRef}>
            {aiMessages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role}`}>{m.text}</div>
            ))}
            {aiLoading && (
              <div className="ai-typing">
                <span /><span /><span />
              </div>
            )}
          </div>
          <div className="ai-input-row">
            <input
              className="ai-input"
              placeholder="Posez votre question..."
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendAI()}
            />
            <button className="ai-send" onClick={sendAI} disabled={aiLoading || !aiInput.trim()}>➤</button>
          </div>
        </div>
        <button className="ai-toggle" onClick={() => setAiOpen(o => !o)} title="Assistant UEM">🤖</button>
      </div>

      {/* WhatsApp */}
      <div className="wa-float">
        <a className="wa-btn" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
          <div className="wa-pulse" />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      {/* Toasts */}
      <div className="toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className="toast">{t.icon} {t.msg}</div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TOPBAR
═══════════════════════════════════════════════ */
function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <a className="topbar-item" href="tel:+212523377417">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.55 2.18 2 2 0 012.55 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l.91-.91a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            +212 523 37 74 17
          </a>
          <a className="topbar-item" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            +212 700 090 365
          </a>
          <span className="topbar-item">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            N°1, Bd Jabrane Khalil Jabrane, El Jadida
          </span>
          <a className="topbar-item" href="mailto:univers.env@gmail.com">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            univers.env@gmail.com
          </a>
        </div>
        <div className="topbar-socials">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
            <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
            <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#0a1f4e" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */
function Navbar({ setPage, cartCount, setCartOpen, mobileOpen, setMobileOpen }) {
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="logo-badge">UE</div>
          <div className="logo-text">
            <span className="logo-name">Univers Environnement</span>
            <span className="logo-sub">MAROC – EL JADIDA</span>
          </div>
        </div>

        <ul className="nav-links">
          <li className="nav-item">
            <button className="nav-link active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Accueil</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">À propos</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">
              Nos services
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="dropdown">
              {SERVICES.map(s => (
                <a key={s.id} href="#services" onClick={e => { e.preventDefault(); scrollTo("services"); }}>
                  <span className="dd-icon" style={{ background: s.bg, color: s.color }}>
                    <span style={{ fontSize: 16 }}>{s.emoji}</span>
                  </span>
                  {s.title}
                </a>
              ))}
            </div>
          </li>
          <li className="nav-item">
            <button className="nav-link">
              Nos produits
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div className="dropdown">
              {PRODUCTS.map(p => (
                <a key={p.id} href="#products" onClick={e => { e.preventDefault(); scrollTo("products"); }}>
                  <span className="dd-icon">{p.emoji}</span>
                  {p.title}
                </a>
              ))}
            </div>
          </li>
          <li className="nav-item">
            <button className="nav-link">Nos réalisations</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollTo("blog")}>Actualités</button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
          </li>
        </ul>

        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", gap: 4, color: "var(--gray700)", fontSize: 13, fontFamily: "inherit", fontWeight: 500 }}
          onClick={() => setCartOpen(true)}
        >
          🛒 {cartCount > 0 && <span style={{ background: "var(--accent)", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{cartCount}</span>}
        </button>

        <button className="nav-cta" onClick={() => scrollTo("contact")}>Demander un devis</button>

        <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMobileOpen(false); }}>Accueil</button>
        <button onClick={() => scrollTo("services")}>Nos services</button>
        <button onClick={() => scrollTo("products")}>Nos produits</button>
        <button onClick={() => scrollTo("blog")}>Actualités</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>
        <button onClick={() => { setPage("admin"); setMobileOpen(false); }}>Admin</button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
function HeroSection({ slideIdx, setSlideIdx }) {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">L'expertise verte au service du Maroc</div>
          <h1 className="hero-title">
            Votre partenaire de référence en{" "}
            <span className="hl-blue">environnement</span>,{" "}
            <span className="hl-blue">traitement des eaux</span>,{" "}
            <span className="hl-green">analyses</span>,{" "}
            <span className="hl-green">produits chimiques</span>{" "}
            et <span className="hl-accent">équipements</span> au Maroc.
          </h1>
          <p className="hero-desc">
            Plus de 15 ans d'expertise au service des industriels, collectivités et laboratoires avec des solutions innovantes, conformes aux normes marocaines et internationales.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Demander un devis gratuit →
            </button>
            <button className="btn-outline">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
              Voir nos réalisations
            </button>
            <a className="btn-wa" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Parler à un expert
            </a>
          </div>
          <div className="hero-trust">
            {[
              { icon: "⏱️", text: "Réponse rapide – Moins de 24h" },
              { icon: "🏅", text: "Experts certifiés – Équipes qualifiées" },
              { icon: "📋", text: "Normes NM / ISO / STEP" },
              { icon: "🚀", text: "Intervention – Partout au Maroc" }
            ].map((t, i) => (
              <div key={i} className="trust-item">
                <span>{t.icon}</span> {t.text}
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="slider-track">
            {HERO_SLIDES.map((s, i) => (
              <div
                key={i}
                className={`slide ${i === slideIdx ? "active" : ""}`}
                style={{ background: s.bg }}
              >
                <div className="slide-overlay" />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, opacity: .2 }}>{s.emoji}</div>
              </div>
            ))}
            <div className="slider-dots">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} className={`slider-dot ${i === slideIdx ? "active" : ""}`} onClick={() => setSlideIdx(i)} />
              ))}
            </div>
          </div>
          <div className="badge-15">
            <div className="big">15<span className="sup">+</span></div>
            <div className="label">ANS<br/>D'EXPÉRIENCE<br/>AU MAROC</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   STATS BAR
═══════════════════════════════════════════════ */
function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {[
          { icon: "🏆", num: "15+", label: "Ans d'expérience" },
          { icon: "📁", num: "200+", label: "Projets réalisés" },
          { icon: "👥", num: "500+", label: "Clients satisfaits" },
          { icon: "⭐", num: "98%", label: "Taux de satisfaction" }
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">
              <span className="stat-icon">{s.icon}</span>
              {s.num}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CLIENTS STRIP
═══════════════════════════════════════════════ */
function ClientsStrip() {
  return (
    <div className="clients">
      <div className="clients-inner">
        <div className="section-label">Ils nous font confiance</div>
        <div className="clients-logos">
          {CLIENTS.map((c, i) => (
            <div key={i} className="client-logo" style={{ color: c.color }}>
              <span className="cl-dot" style={{ background: c.dot }} />
              {c.name}
            </div>
          ))}
          <button className="clients-cta">
            Voir toutes nos références →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES GRID
═══════════════════════════════════════════════ */
function ServicesGrid() {
  return (
    <section className="services" id="services">
      <div className="services-inner">
        <div className="section-eyebrow">NOS DOMAINES D'EXPERTISE</div>
        <h2 className="section-title">Des solutions <em>complètes</em> pour l'eau, l'environnement et l'industrie</h2>
        <div className="services-grid">
          {SERVICES.map(s => (
            <div className="service-card" key={s.id}>
              <div className="sc-img-placeholder" style={{ background: `linear-gradient(135deg, ${s.color}22 0%, ${s.color}44 100%)` }}>
                <span style={{ fontSize: 48 }}>{s.emoji}</span>
              </div>
              <div className="sc-body">
                <div className="sc-header">
                  <div className="sc-icon-wrap" style={{ background: s.bg, color: s.color }}>{s.emoji}</div>
                  <div className="sc-title">{s.title}</div>
                </div>
                <ul className="sc-list">
                  {s.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <button className="sc-cta">Découvrir →</button>
              </div>
            </div>
          ))}
        </div>
        <div className="services-btn-wrap">
          <button className="btn-navy">Voir tous nos services →</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PRODUCTS CAROUSEL
═══════════════════════════════════════════════ */
function ProductsCarousel({ carouselOff, carouselPrev, carouselNext, addToCart }) {
  return (
    <section className="products" id="products">
      <div className="products-inner">
        <div className="section-eyebrow">NOS PRODUITS PHARES</div>
        <h2 className="section-title">Des produits de qualité pour des performances durables</h2>
        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={carouselPrev}>‹</button>
          <div className="carousel-track">
            {PRODUCTS.slice(carouselOff).concat(PRODUCTS.slice(0, carouselOff)).map(p => (
              <div className="product-card" key={p.id} onClick={() => addToCart(p)}>
                <div className="pc-img-placeholder">{p.emoji}</div>
                <div className="pc-body">
                  <div className="pc-title">{p.title}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={carouselNext}>›</button>
        </div>
        <div className="products-btn-wrap">
          <button className="btn-outline-white">Voir tous nos produits →</button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ADVANTAGES
═══════════════════════════════════════════════ */
function AdvantagesSection() {
  return (
    <section className="advantages" id="advantages">
      <div className="advantages-inner">
        <h2 className="section-title">Pourquoi choisir <em>UEM</em> ?</h2>
        <div className="adv-grid">
          {ADVANTAGES.map((a, i) => (
            <div className="adv-card" key={i}>
              <div className="adv-icon">{a.icon}</div>
              <div className="adv-title">{a.title}</div>
              <div className="adv-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TICKER
═══════════════════════════════════════════════ */
function TickerBanner() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   BLOG SECTION
═══════════════════════════════════════════════ */
function BlogSection({ blogs }) {
  const defaultPosts = [
    { id: "d1", title: "Traitement des eaux usées industrielles : nouvelles normes NM 2024", excerpt: "Les dernières mises à jour des normes marocaines pour le traitement des eaux industrielles et leurs impacts sur les entreprises.", category: "Réglementation", emoji: "📋", date: "Juin 2024" },
    { id: "d2", title: "Osmoseur industriel : comment choisir la bonne solution ?", excerpt: "Guide complet pour sélectionner un système d'osmose inverse adapté à vos besoins industriels ou domestiques.", category: "Guide", emoji: "💧", date: "Mai 2024" },
    { id: "d3", title: "HSE au Maroc : obligations et bonnes pratiques pour les industriels", excerpt: "Tour d'horizon des obligations HSE en vigueur et des meilleures pratiques pour une conformité durable.", category: "HSE", emoji: "🦺", date: "Avril 2024" }
  ];
  const all = [...defaultPosts, ...blogs].slice(0, 6);

  return (
    <section className="blog-section" id="blog">
      <div className="blog-inner">
        <div className="section-eyebrow">ACTUALITÉS & BLOG</div>
        <h2 className="section-title">Nos dernières <em>publications</em></h2>
        <div className="blog-grid">
          {all.map(post => (
            <div className="blog-card" key={post.id}>
              <div className="blog-img">{post.emoji}</div>
              <div className="blog-body">
                <span className="blog-tag">{post.category}</span>
                <div className="blog-title">{post.title}</div>
                <div className="blog-excerpt">{post.excerpt}</div>
                <div className="blog-meta">📅 {post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════ */
function ContactSection({ toast }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { toast("Veuillez remplir tous les champs requis.", "⚠️"); return; }
    setSending(true);
    try {
      await emailjs.send("service_3p09q76", "template_contact_uem", {
        from_name: form.name,
        from_email: form.email,
        company: form.company,
        service: form.service,
        message: form.message
      }, "bhR3gf_SYQEaKSOky");
      setSent(true);
      setForm({ name: "", email: "", company: "", service: "", message: "" });
      toast("Votre message a bien été envoyé ! Nous vous répondons sous 24h.", "✅");
    } catch {
      toast("Erreur d'envoi. Contactez-nous directement au +212 523 37 74 17", "❌");
    }
    setSending(false);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-info">
          <h2>Demandez votre <em>devis gratuit</em> dès aujourd'hui</h2>
          <p>Notre équipe d'experts vous répond en moins de 24 heures avec une solution adaptée à vos besoins et votre budget.</p>
          <div className="contact-details">
            {[
              { icon: "📞", label: "Téléphone", value: "+212 523 37 74 17" },
              { icon: "📱", label: "WhatsApp", value: "+212 700 090 365" },
              { icon: "✉️", label: "Email", value: "univers.env@gmail.com" },
              { icon: "📍", label: "Adresse", value: "N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc" }
            ].map((d, i) => (
              <div className="contact-detail" key={i}>
                <div className="cd-icon">{d.icon}</div>
                <div className="cd-text">
                  <div className="cd-label">{d.label}</div>
                  <div className="cd-value">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-form">
          <div className="form-title">📋 Formulaire de contact</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nom complet *</label>
              <input className="form-input" placeholder="Votre nom" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" placeholder="votre@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Entreprise</label>
              <input className="form-input" placeholder="Nom de votre société" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Service souhaité</label>
              <select className="form-select" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                <option value="">Sélectionner...</option>
                {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Votre message *</label>
            <textarea className="form-textarea" placeholder="Décrivez votre besoin..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          </div>
          <button className="form-submit" onClick={handleSubmit} disabled={sending}>
            {sending ? "⏳ Envoi en cours..." : "Envoyer ma demande →"}
          </button>
          {sent && (
            <div className="form-success">✅ Message envoyé ! Nous vous répondons sous 24h.</div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
function FooterSection({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-badge">UE</div>
            <div className="logo-text">
              <span className="logo-name">Univers Environnement</span>
              <span className="logo-sub">MAROC – EL JADIDA</span>
            </div>
          </div>
          <p className="footer-desc">
            Spécialiste marocain en traitement des eaux, analyses environnementales, produits chimiques et équipements depuis plus de 15 ans. Basé à El Jadida, au service de tout le Maroc.
          </p>
          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#0a1f4e" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Nos services</h4>
          <ul>
            {SERVICES.slice(0, 5).map(s => <li key={s.id}><a href="#services">{s.title}</a></li>)}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Nos produits</h4>
          <ul>
            {PRODUCTS.slice(0, 5).map(p => <li key={p.id}><a href="#products">{p.title}</a></li>)}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Informations</h4>
          <ul>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#blog">Actualités</a></li>
            <li><a href="#advantages">À propos</a></li>
            <li><button onClick={() => setPage("admin")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, padding: "0", transition: "var(--transition)" }}>→ Administration</button></li>
          </ul>
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, opacity: .6, marginBottom: 8 }}>Horaires</div>
            <div style={{ fontSize: 13, opacity: .8 }}>Lun – Ven : 8h30 – 18h00</div>
            <div style={{ fontSize: 13, opacity: .8 }}>Sam : 9h00 – 13h00</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Univers Environnement Maroc – Tous droits réservés</span>
        <span>N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc</span>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   ADMIN PANEL
═══════════════════════════════════════════════ */
function AdminPanel({ auth, pwd, setPwd, setAuth, blogs, setBlogs, blogForm, setBlogForm, setPage, toast }) {
  if (!auth) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gray50)", fontFamily: "Inter, sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "48px 40px", boxShadow: "0 8px 40px rgba(0,0,0,.12)", width: 380, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--bleu)", marginBottom: 8 }}>Administration UEM</h2>
          <p style={{ color: "var(--gray600)", fontSize: 14, marginBottom: 28 }}>Accès réservé à l'équipe UEM</p>
          <input
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid var(--gray200)", fontSize: 14, fontFamily: "inherit", marginBottom: 16, boxSizing: "border-box" }}
            type="password"
            placeholder="Mot de passe"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (pwd === "uem-admin-2026" ? setAuth(true) : toast("Mot de passe incorrect", "❌"))}
          />
          <button
            style={{ width: "100%", padding: 13, background: "var(--bleu)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => pwd === "uem-admin-2026" ? setAuth(true) : toast("Mot de passe incorrect", "❌")}
          >Se connecter</button>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", color: "var(--gray600)", cursor: "pointer", marginTop: 16, fontSize: 13, fontFamily: "inherit" }}>← Retour au site</button>
        </div>
      </div>
    );
  }

  const addBlog = () => {
    if (!blogForm.title || !blogForm.excerpt) { toast("Titre et extrait requis", "⚠️"); return; }
    const newPost = { ...blogForm, id: Date.now().toString(), date: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }) };
    setBlogs(b => [newPost, ...b]);
    setBlogForm({ title: "", excerpt: "", category: "Actualités", emoji: "📰" });
    toast("Article publié avec succès !", "✅");
  };

  return (
    <div className="admin-wrap">
      <div className="admin-card">
        <div className="admin-header">
          <span style={{ fontSize: 28 }}>⚙️</span>
          <div>
            <h1>Administration UEM</h1>
            <div style={{ fontSize: 13, opacity: .8, marginTop: 2 }}>Panneau de gestion du site</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <button onClick={() => setPage("home")} style={{ background: "rgba(255,255,255,.2)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>← Site</button>
            <button onClick={() => setAuth(false)} style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Déconnexion</button>
          </div>
        </div>
        <div className="admin-body">
          <div className="admin-section">
            <h2>📝 Ajouter un article de blog</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div className="form-group">
                <label className="form-label">Titre *</label>
                <input className="form-input" placeholder="Titre de l'article" value={blogForm.title} onChange={e => setBlogForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Catégorie</label>
                <select className="form-select" value={blogForm.category} onChange={e => setBlogForm(f => ({ ...f, category: e.target.value }))}>
                  <option>Actualités</option>
                  <option>Guide</option>
                  <option>Réglementation</option>
                  <option>HSE</option>
                  <option>Innovation</option>
                  <option>Formation</option>
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 16 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Extrait *</label>
                <textarea className="form-textarea" style={{ height: 80 }} placeholder="Résumé de l'article..." value={blogForm.excerpt} onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))} />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Emoji</label>
                <input className="form-input" style={{ width: 70, textAlign: "center", fontSize: 24 }} value={blogForm.emoji} onChange={e => setBlogForm(f => ({ ...f, emoji: e.target.value }))} />
              </div>
            </div>
            <button className="btn-green" onClick={addBlog}>Publier l'article →</button>
          </div>

          <div className="admin-section">
            <h2>📚 Articles publiés ({blogs.length})</h2>
            {blogs.length === 0 ? (
              <p style={{ color: "var(--gray600)", fontSize: 14 }}>Aucun article publié.</p>
            ) : blogs.map(post => (
              <div className="blog-post-item" key={post.id}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span>{post.emoji}</span>
                    <strong style={{ fontSize: 15 }}>{post.title}</strong>
                  </div>
                  <div className="bpi-meta">{post.category} — {post.date}</div>
                  <div style={{ fontSize: 13, color: "var(--gray600)", marginTop: 4, maxWidth: 500 }}>{post.excerpt}</div>
                </div>
                <button className="btn-danger" onClick={() => { setBlogs(b => b.filter(x => x.id !== post.id)); toast("Article supprimé", "🗑️"); }}>Supprimer</button>
              </div>
            ))}
          </div>

          <div className="admin-section">
            <h2>ℹ️ Informations système</h2>
            <div style={{ background: "var(--gray50)", borderRadius: 12, padding: 20, fontSize: 14, color: "var(--gray700)", lineHeight: 1.8 }}>
              <div><strong>Site :</strong> www.uem.ma</div>
              <div><strong>Stack :</strong> React 18 + Vite + EmailJS</div>
              <div><strong>EmailJS Service :</strong> service_3p09q76</div>
              <div><strong>Blog :</strong> {blogs.length} article(s) en localStorage</div>
              <div><strong>Version :</strong> 2.0 — Redesign 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
