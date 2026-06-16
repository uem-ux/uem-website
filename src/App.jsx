import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const EJS = { svc:"service_3p09q76", tpl:"template_1qu65qm", key:"bhR3gf_SYQEaKSOky" };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --vert:#1a5c32;--vert2:#236b3b;--vert3:#2e8b57;
  --rouge:#b03020;--dore:#c8a040;
  --fond:#f5f7f5;--blanc:#ffffff;--noir:#12201a;
  --gris1:#4a5c52;--gris2:#7a8c82;--gris3:#b8c8be;
  --bordure:#d8e4dc;--sable:#f0ece4;
  --ombre:0 2px 12px rgba(18,32,26,.08);
  --T:cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:var(--fond);color:var(--noir);overflow-x:hidden;-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.6;}

/* ─── TOPBAR ─────────────────────────────────────── */
.topbar{background:var(--noir);color:rgba(255,255,255,.75);font-size:.75rem;padding:7px 0;}
.topbar-in{max-width:1200px;margin:0 auto;padding:0 32px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;}
.topbar a{color:rgba(255,255,255,.75);text-decoration:none;transition:color .2s;display:inline-flex;align-items:center;gap:5px;}
.topbar a:hover{color:#fff;}
.tb-sep{color:rgba(255,255,255,.3);margin:0 4px;}

/* ─── NAVBAR ─────────────────────────────────────── */
.nav{position:sticky;top:0;z-index:200;background:var(--blanc);border-bottom:1px solid var(--bordure);box-shadow:var(--ombre);}
.nav-in{max-width:1200px;margin:0 auto;padding:0 32px;height:66px;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.logo{display:flex;align-items:center;gap:11px;cursor:pointer;flex-shrink:0;}
.logo-sq{width:40px;height:40px;background:var(--vert);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.95rem;letter-spacing:-.5px;flex-shrink:0;}
.logo-tx{display:flex;flex-direction:column;line-height:1.15;}
.logo-tx .n1{font-size:.88rem;font-weight:700;color:var(--noir);}
.logo-tx .n2{font-size:.6rem;font-weight:500;color:var(--vert);letter-spacing:.1em;text-transform:uppercase;}
.nav-links{display:flex;align-items:center;gap:2px;}
.nav-links button{background:none;border:none;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:500;color:var(--gris1);padding:6px 12px;border-radius:6px;cursor:pointer;transition:all .2s;white-space:nowrap;}
.nav-links button:hover{background:var(--fond);color:var(--vert);}
.nav-links button.on{color:var(--vert);font-weight:600;background:rgba(26,92,50,.08);}
.nav-right{display:flex;align-items:center;gap:10px;}
.btn-devis-nav{background:var(--vert);color:#fff;border:none;padding:9px 20px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.82rem;font-weight:600;cursor:pointer;transition:background .2s,box-shadow .2s;white-space:nowrap;}
.btn-devis-nav:hover{background:var(--vert2);box-shadow:0 4px 14px rgba(26,92,50,.3);}
.burger{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:6px;}
.burger span{display:block;width:22px;height:2px;background:var(--noir);border-radius:2px;transition:transform .3s,opacity .3s;}
.burger.on span:first-child{transform:translateY(7px) rotate(45deg);}
.burger.on span:nth-child(2){opacity:0;}
.burger.on span:last-child{transform:translateY(-7px) rotate(-45deg);}
.mob-menu{background:var(--blanc);border-top:1px solid var(--bordure);overflow:hidden;max-height:0;transition:max-height .35s var(--T);}
.mob-menu.on{max-height:500px;}
.mob-menu nav{display:flex;flex-direction:column;padding:8px 0 16px;}
.mob-menu button{background:none;border:none;font-family:'Inter',sans-serif;font-size:.9rem;font-weight:500;color:var(--noir);text-align:left;padding:13px 24px;cursor:pointer;border-bottom:1px solid var(--bordure);transition:background .2s;}
.mob-menu button:hover,.mob-menu button.on{background:rgba(26,92,50,.06);color:var(--vert);}
.mob-menu .mob-cta{background:var(--vert);color:#fff;margin:12px 20px 4px;border-radius:8px;text-align:center;border-bottom:none;font-weight:600;}

/* ─── TICKER ─────────────────────────────────────── */
.ticker{background:var(--vert);overflow:hidden;padding:9px 0;}
.ticker-t{display:flex;gap:56px;animation:slide 32s linear infinite;width:max-content;}
.ticker-i{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.78);white-space:nowrap;}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ─── HERO ───────────────────────────────────────── */
.hero{background:var(--blanc);border-bottom:1px solid var(--bordure);}
.hero-in{max-width:1200px;margin:0 auto;padding:64px 32px 72px;display:grid;grid-template-columns:1fr 420px;gap:72px;align-items:center;}
.hero-tag{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(176,48,32,.25);background:rgba(176,48,32,.06);padding:5px 14px;border-radius:4px;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--rouge);margin-bottom:20px;}
.hero-tag span{width:6px;height:6px;background:var(--rouge);border-radius:50%;animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,3.8vw,3.4rem);font-weight:700;line-height:1.12;color:var(--noir);margin-bottom:16px;}
.hero h1 em{color:var(--vert);font-style:italic;}
.hero h1 .r{color:var(--rouge);}
.hero-desc{font-size:.95rem;color:var(--gris1);line-height:1.8;max-width:480px;margin-bottom:28px;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px;}
.btn-p{background:var(--vert);color:#fff;border:none;padding:13px 28px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.86rem;font-weight:600;cursor:pointer;transition:background .2s,box-shadow .2s;}
.btn-p:hover{background:var(--vert2);box-shadow:0 6px 20px rgba(26,92,50,.28);}
.btn-o{background:transparent;color:var(--vert);border:1.5px solid var(--vert);padding:13px 28px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.86rem;font-weight:600;cursor:pointer;transition:all .2s;}
.btn-o:hover{background:rgba(26,92,50,.07);}
.hero-stats{display:flex;gap:32px;padding-top:24px;border-top:1px solid var(--bordure);}
.hs-n{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:var(--vert);line-height:1;}
.hs-l{font-size:.68rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--gris2);margin-top:4px;}
.hero-right{display:flex;flex-direction:column;gap:12px;}
.hcard{background:var(--fond);border:1px solid var(--bordure);border-radius:10px;padding:18px 20px;cursor:pointer;transition:border-color .2s,box-shadow .2s,transform .2s;display:flex;align-items:center;gap:16px;}
.hcard:hover{border-color:var(--vert3);box-shadow:var(--ombre);transform:translateX(4px);}
.hcard-ico{width:44px;height:44px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;}
.ico-g{background:#e6f2ea;}.ico-b{background:#e6eef7;}.ico-o{background:#fdf3e7;}.ico-p{background:#eee6f7;}
.hcard-tx .hct{font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gris2);}
.hcard-tx .hcn{font-size:.92rem;font-weight:600;color:var(--noir);}
.hcard-arr{margin-left:auto;color:var(--gris3);font-size:1.1rem;transition:transform .2s;}
.hcard:hover .hcard-arr{transform:translateX(4px);color:var(--vert);}

/* ─── RUBRIQUES ──────────────────────────────────── */
.rubriques{padding:64px 32px;}
.rub-in{max-width:1200px;margin:0 auto;}
.sec-label{font-size:.7rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--vert);margin-bottom:10px;}
.sec-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:var(--noir);margin-bottom:8px;}
.sec-title em{color:var(--vert);font-style:italic;}
.sec-sub{font-size:.9rem;color:var(--gris1);line-height:1.7;max-width:520px;margin-bottom:40px;}
.rub-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.rcard{background:var(--blanc);border:1px solid var(--bordure);border-radius:10px;padding:28px 24px;cursor:pointer;transition:border-color .25s,box-shadow .25s,transform .25s;position:relative;overflow:hidden;}
.rcard::before{content:'';position:absolute;bottom:0;left:0;width:100%;height:3px;background:var(--vert);transform:scaleX(0);transition:transform .3s var(--T);transform-origin:left;}
.rcard:hover{border-color:var(--vert3);box-shadow:0 8px 28px rgba(26,92,50,.1);transform:translateY(-4px);}
.rcard:hover::before{transform:scaleX(1);}
.rcard-ico{width:48px;height:48px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:16px;}
.rcard h3{font-size:1rem;font-weight:700;color:var(--noir);margin-bottom:8px;}
.rcard p{font-size:.78rem;color:var(--gris1);line-height:1.65;margin-bottom:14px;}
.rcard-count{font-size:.68rem;font-weight:600;color:var(--vert);background:rgba(26,92,50,.08);padding:3px 10px;border-radius:4px;display:inline-block;}

/* ─── BANDE CHIFFRES ─────────────────────────────── */
.bchiffres{background:var(--vert);padding:48px 32px;}
.bch-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:32px;text-align:center;}
.bchn{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;color:#fff;}
.bchl{font-size:.7rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-top:6px;}

/* ─── PAGE HEADER ────────────────────────────────── */
.page-hdr{background:var(--noir);padding:40px 32px 36px;}
.ph-in{max-width:1200px;margin:0 auto;display:flex;align-items:flex-start;gap:16px;}
.ph-back{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;width:36px;height:36px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:background .2s;flex-shrink:0;margin-top:4px;}
.ph-back:hover{background:rgba(255,255,255,.2);}
.ph-txt .ph-cat{font-size:.68rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:8px;}
.ph-txt h1{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:700;color:#fff;margin-bottom:8px;line-height:1.15;}
.ph-txt h1 em{font-style:italic;color:rgba(255,255,255,.75);}
.ph-txt p{font-size:.86rem;color:rgba(255,255,255,.6);line-height:1.7;max-width:580px;}

/* ─── PAGE BODY ──────────────────────────────────── */
.page-body{max-width:1200px;margin:0 auto;padding:48px 32px 72px;}

/* ─── GROUPE TITRE ───────────────────────────────── */
.grp{margin-bottom:52px;}
.grp-hd{display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid var(--bordure);}
.grp-hd h2{font-size:1rem;font-weight:700;color:var(--noir);}
.grp-pill{background:rgba(26,92,50,.1);color:var(--vert);font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:4px;}

/* ─── GRILLES ────────────────────────────────────── */
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.g-svc{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}

/* ─── CARTE PRODUIT ──────────────────────────────── */
.pc{background:var(--blanc);border:1px solid var(--bordure);border-radius:10px;overflow:hidden;transition:border-color .25s,box-shadow .25s,transform .25s;}
.pc:hover{border-color:var(--vert3);box-shadow:0 8px 28px rgba(0,0,0,.1);transform:translateY(-4px);}
.pc-img{height:160px;position:relative;overflow:hidden;background:var(--fond);}
.pc-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s var(--T);}
.pc:hover .pc-img img{transform:scale(1.05);}
.pc-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.1) 0%,rgba(0,0,0,.4) 100%);}
.pc-badge{position:absolute;top:10px;left:10px;font-size:.58rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:4px;z-index:1;}
.badge-r{background:rgba(26,92,50,.9);color:#fff;}
.badge-m{background:rgba(21,101,192,.9);color:#fff;}
.badge-n{background:rgba(94,53,177,.9);color:#fff;}
.pc-fallback{height:160px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;background:var(--fond);position:relative;}
.pc-body{padding:16px 18px 20px;}
.pc-grp{font-size:.62rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--vert);margin-bottom:5px;}
.pc-nom{font-size:.95rem;font-weight:700;color:var(--noir);margin-bottom:6px;line-height:1.35;}
.pc-desc{font-size:.78rem;color:var(--gris1);line-height:1.7;margin-bottom:16px;}
.pc-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;}
.pc-prix{font-size:.95rem;font-weight:700;color:var(--vert);line-height:1;}
.pc-unit{font-size:.62rem;color:var(--gris2);margin-top:3px;}
.btn-r{border:none;padding:8px 16px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.74rem;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0;}
.br-g{background:var(--vert);color:#fff;}
.br-g:hover{background:var(--vert2);}
.br-b{background:#1565c0;color:#fff;}
.br-b:hover{background:#0d47a1;}
.br-a{background:var(--rouge);color:#fff;}
.br-a:hover{background:#922818;}

/* ─── CARTE SERVICE ──────────────────────────────── */
.sc{background:var(--blanc);border:1px solid var(--bordure);border-radius:10px;padding:28px 24px;display:flex;flex-direction:column;transition:border-color .25s,box-shadow .25s,transform .25s;}
.sc:hover{border-color:var(--vert3);box-shadow:0 8px 28px rgba(26,92,50,.1);transform:translateY(-4px);}
.sc-ico{font-size:2rem;margin-bottom:14px;}
.sc-tag{display:inline-block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:4px;margin-bottom:12px;}
.st-ing{background:#fdf3e7;color:#92400e;border:1px solid #f5d6a0;}
.st-ana{background:#e6f2ea;color:var(--vert);border:1px solid #b8d8c4;}
.sc-nom{font-size:1rem;font-weight:700;color:var(--noir);margin-bottom:8px;line-height:1.35;}
.sc-desc{font-size:.8rem;color:var(--gris1);line-height:1.75;margin-bottom:18px;flex:1;}
.sc-feats{list-style:none;margin-bottom:20px;}
.sc-feats li{font-size:.76rem;color:var(--gris1);padding:4px 0 4px 20px;position:relative;border-bottom:1px solid var(--bordure);}
.sc-feats li:last-child{border-bottom:none;}
.sc-feats li::before{content:'✓';position:absolute;left:0;color:var(--vert);font-weight:700;}
.btn-dvc{width:100%;background:transparent;color:var(--vert);border:1.5px solid var(--vert);padding:11px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:600;cursor:pointer;transition:background .2s,color .2s;}
.btn-dvc:hover{background:var(--vert);color:#fff;}

/* ─── ONGLETS FORMULATION ────────────────────────── */
.ftabs{display:flex;gap:4px;margin-bottom:32px;background:var(--sable);padding:5px;border-radius:9px;width:fit-content;}
.ftab{background:transparent;border:none;padding:9px 20px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;color:var(--gris1);cursor:pointer;transition:all .2s;}
.ftab:hover{color:var(--vert);}
.ftab.on{background:var(--blanc);color:var(--vert);font-weight:600;box-shadow:var(--ombre);}

/* ─── CONTACT / FORMULAIRE ───────────────────────── */
.contact-wrap{max-width:640px;margin:0 auto;}
.contact-intro{margin-bottom:32px;}
.contact-intro h2{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--noir);margin-bottom:8px;}
.contact-intro h2 em{color:var(--vert);font-style:italic;}
.contact-intro p{font-size:.9rem;color:var(--gris1);line-height:1.7;}
.form-card{background:var(--blanc);border:1px solid var(--bordure);border-radius:12px;padding:36px;box-shadow:var(--ombre);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px;}
.form-row.full{grid-template-columns:1fr;}
.form-group{display:flex;flex-direction:column;gap:6px;}
.form-group label{font-size:.74rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--gris1);}
.form-group input,.form-group textarea,.form-group select{
  border:1.5px solid var(--bordure);
  border-radius:8px;
  padding:11px 14px;
  font-family:'Inter',sans-serif;
  font-size:.88rem;
  color:var(--noir);
  background:#ffffff;
  outline:none;
  width:100%;
  transition:border-color .2s,box-shadow .2s;
  position:relative;
  z-index:1;
  -webkit-appearance:none;
  appearance:none;
}
.form-group input:focus,.form-group textarea:focus,.form-group select:focus{
  border-color:var(--vert);
  box-shadow:0 0 0 3px rgba(26,92,50,.1);
}
.form-group input::placeholder,.form-group textarea::placeholder{color:var(--gris3);}
.form-group textarea{resize:vertical;min-height:110px;line-height:1.6;}
.form-group select option{background:#fff;color:var(--noir);}
.form-error{background:#fdf2f2;border:1px solid #f5c6c6;color:#922818;font-size:.78rem;padding:10px 14px;border-radius:7px;margin-bottom:14px;}
.btn-submit{width:100%;background:var(--vert);color:#fff;border:none;padding:14px;border-radius:8px;font-family:'Inter',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .2s,box-shadow .2s;margin-top:6px;}
.btn-submit:hover{background:var(--vert2);box-shadow:0 6px 20px rgba(26,92,50,.28);}
.btn-submit:disabled{opacity:.55;cursor:not-allowed;}
.form-note{text-align:center;font-size:.7rem;color:var(--gris2);margin-top:10px;}
.form-ok{text-align:center;padding:48px 20px;}
.fok-ico{font-size:3rem;margin-bottom:16px;}
.fok-title{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--vert);margin-bottom:8px;}
.fok-sub{font-size:.88rem;color:var(--gris1);line-height:1.7;}
.contact-alt{margin-top:24px;padding:20px;background:var(--fond);border:1px solid var(--bordure);border-radius:10px;display:flex;flex-wrap:wrap;gap:16px;justify-content:center;}
.calt-item{display:flex;align-items:center;gap:8px;font-size:.82rem;color:var(--gris1);}
.calt-item a{color:var(--vert);text-decoration:none;font-weight:600;}
.calt-item a:hover{text-decoration:underline;}

/* ─── AVANTAGES ──────────────────────────────────── */
.avantages{background:var(--sable);border-top:1px solid var(--bordure);border-bottom:1px solid var(--bordure);padding:52px 32px;}
.av-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:28px;}
.av-item{text-align:center;}
.av-ico{font-size:1.8rem;margin-bottom:10px;}
.av-t{font-size:.9rem;font-weight:700;color:var(--noir);margin-bottom:5px;}
.av-d{font-size:.78rem;color:var(--gris1);line-height:1.65;}

/* ─── PANIER ─────────────────────────────────────── */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(3px);}
.overlay.on{opacity:1;pointer-events:all;}
.cart{position:fixed;top:0;right:-500px;width:460px;max-width:100vw;height:100dvh;background:var(--blanc);z-index:301;display:flex;flex-direction:column;transition:right .4s var(--T);box-shadow:-8px 0 40px rgba(0,0,0,.12);}
.cart.on{right:0;}
.cart-hd{padding:20px 24px;border-bottom:1px solid var(--bordure);display:flex;justify-content:space-between;align-items:center;}
.cart-hd h2{font-size:1.1rem;font-weight:700;}
.cart-x{background:none;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:1.1rem;color:var(--gris2);display:flex;align-items:center;justify-content:center;transition:all .2s;}
.cart-x:hover{background:rgba(176,48,32,.08);color:var(--rouge);}
.cart-body{flex:1;overflow-y:auto;padding:16px 24px;display:flex;flex-direction:column;gap:14px;}
.cart-empty{text-align:center;color:var(--gris2);padding:60px 0;font-size:.88rem;}
.ci{display:flex;gap:12px;padding-bottom:14px;border-bottom:1px solid var(--bordure);align-items:flex-start;}
.ci-ico{width:46px;height:46px;background:var(--fond);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;}
.ci-info{flex:1;min-width:0;}
.ci-nom{font-size:.88rem;font-weight:600;margin-bottom:3px;line-height:1.3;}
.ci-px{font-size:.76rem;color:var(--vert);font-weight:600;}
.ci-rm{background:none;border:none;cursor:pointer;color:var(--gris2);font-size:.9rem;padding:4px;flex-shrink:0;transition:color .2s;}
.ci-rm:hover{color:var(--rouge);}
.cart-ft{padding:16px 24px;border-top:1px solid var(--bordure);background:var(--fond);}
.cart-tot{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.cart-tot-l{font-size:.74rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--gris2);}
.cart-tot-p{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:var(--vert);}
.btn-pay{width:100%;background:var(--vert);color:#fff;border:none;padding:14px;border-radius:8px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:700;cursor:pointer;transition:background .2s;}
.btn-pay:hover{background:var(--vert2);}
.btn-pay:disabled{opacity:.5;cursor:not-allowed;}
.pay-note{text-align:center;font-size:.66rem;color:var(--gris2);margin-top:8px;}

/* ─── TOAST ──────────────────────────────────────── */
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(60px);background:var(--noir);color:#fff;padding:11px 20px;font-size:.8rem;font-weight:500;z-index:500;border-radius:8px;opacity:0;transition:transform .35s var(--T),opacity .35s;white-space:nowrap;box-shadow:0 6px 24px rgba(0,0,0,.3);max-width:92vw;border-left:3px solid var(--vert);}
.toast.on{transform:translateX(-50%) translateY(0);opacity:1;}

/* ─── WHATSAPP ───────────────────────────────────── */
.wa{position:fixed;bottom:96px;left:24px;z-index:400;width:52px;height:52px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(37,211,102,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;}
.wa:hover{transform:scale(1.08);box-shadow:0 6px 24px rgba(37,211,102,.55);}
.wa svg{width:26px;height:26px;fill:#fff;}

/* ─── AI CHAT ────────────────────────────────────── */
.ai-fab{position:fixed;bottom:28px;right:24px;z-index:400;width:52px;height:52px;border-radius:50%;background:var(--vert);border:none;color:#fff;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 18px rgba(26,92,50,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;}
.ai-fab:hover{transform:scale(1.08);}
.ai-dot{position:absolute;top:-2px;right:-2px;width:13px;height:13px;background:var(--rouge);border-radius:50%;border:2px solid var(--fond);}
.ai-win{position:fixed;bottom:92px;right:24px;z-index:400;width:360px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100dvh - 112px);background:var(--blanc);border-radius:14px;border:1px solid var(--bordure);box-shadow:0 20px 60px rgba(0,0,0,.15);display:flex;flex-direction:column;transform:scale(.9) translateY(16px);opacity:0;pointer-events:none;transition:transform .3s var(--T),opacity .3s;overflow:hidden;}
.ai-win.on{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
.ai-hd{padding:14px 16px;background:var(--vert);display:flex;align-items:center;gap:10px;flex-shrink:0;}
.ai-av{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.ai-hi{flex:1;}
.ai-nm{font-size:.9rem;font-weight:700;color:#fff;}
.ai-st{font-size:.65rem;color:rgba(255,255,255,.7);display:flex;align-items:center;gap:4px;}
.ai-st::before{content:'';width:5px;height:5px;background:#5ddb8a;border-radius:50%;}
.ai-cx{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.7);font-size:1rem;padding:4px;transition:color .2s;}
.ai-cx:hover{color:#fff;}
.ai-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;}
.ai-msgs::-webkit-scrollbar{width:3px;}
.ai-msgs::-webkit-scrollbar-thumb{background:var(--bordure);}
.m{display:flex;gap:7px;}
.m.u{flex-direction:row-reverse;}
.m-av{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.75rem;flex-shrink:0;margin-top:1px;}
.m.b .m-av{background:var(--vert);color:#fff;}
.m.u .m-av{background:var(--sable);font-size:.7rem;}
.m-b{max-width:80%;padding:9px 12px;border-radius:12px;font-size:.78rem;line-height:1.65;}
.m.b .m-b{background:var(--fond);color:var(--noir);border-bottom-left-radius:3px;}
.m.u .m-b{background:var(--vert);color:#fff;border-bottom-right-radius:3px;}
.typing{display:flex;gap:3px;padding:10px 12px;background:var(--fond);border-radius:12px;width:fit-content;}
.typing span{width:5px;height:5px;background:var(--gris2);border-radius:50%;animation:bop 1.4s infinite;}
.typing span:nth-child(2){animation-delay:.2s;}
.typing span:nth-child(3){animation-delay:.4s;}
@keyframes bop{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
.ai-sugs{padding:0 10px 8px;display:flex;flex-wrap:wrap;gap:5px;}
.sug{background:var(--fond);border:1px solid var(--bordure);color:var(--vert);padding:4px 10px;border-radius:4px;font-family:'Inter',sans-serif;font-size:.68rem;font-weight:500;cursor:pointer;transition:all .2s;}
.sug:hover{background:var(--vert);color:#fff;border-color:var(--vert);}
.ai-ir{padding:10px;border-top:1px solid var(--bordure);display:flex;gap:7px;background:#fff;flex-shrink:0;}
.ai-inp{flex:1;border:1px solid var(--bordure);border-radius:8px;padding:9px 12px;font-family:'Inter',sans-serif;font-size:.82rem;outline:none;transition:border-color .2s;resize:none;max-height:72px;background:#fff;color:var(--noir);}
.ai-inp:focus{border-color:var(--vert);}
.ai-snd{background:var(--vert);color:#fff;border:none;width:34px;height:34px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0;align-self:flex-end;transition:background .2s;}
.ai-snd:hover{background:var(--vert2);}
.ai-snd:disabled{opacity:.5;cursor:not-allowed;}

/* ─── FOOTER ─────────────────────────────────────── */
footer{background:var(--noir);color:#fff;}
.foot-in{max-width:1200px;margin:0 auto;padding:56px 32px 28px;}
.foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:40px;}
.foot-brand .fb-n{font-size:1.1rem;font-weight:700;margin-bottom:12px;}
.foot-brand .fb-n span{color:#4caf78;}
.foot-brand p{font-size:.78rem;color:rgba(255,255,255,.5);line-height:1.8;margin-bottom:14px;}
.foot-brand .fb-contact{display:flex;flex-direction:column;gap:7px;}
.foot-brand .fb-contact a{font-size:.78rem;color:rgba(255,255,255,.55);text-decoration:none;transition:color .2s;display:flex;align-items:center;gap:6px;}
.foot-brand .fb-contact a:hover{color:#4caf78;}
.foot-col h4{font-size:.65rem;text-transform:uppercase;letter-spacing:.14em;color:#4caf78;margin-bottom:14px;font-weight:600;}
.foot-col ul{list-style:none;display:flex;flex-direction:column;gap:9px;}
.foot-col li{font-size:.8rem;color:rgba(255,255,255,.48);cursor:pointer;transition:color .2s;}
.foot-col li:hover{color:#4caf78;}
.foot-bot{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.foot-bot span{font-size:.68rem;color:rgba(255,255,255,.35);}

/* ─── RESPONSIVE ─────────────────────────────────── */
@media(max-width:1024px){
  .nav-links,.nav-right .btn-devis-nav{display:none;}
  .burger{display:flex;}
  .hero-in{grid-template-columns:1fr;padding:48px 24px 56px;gap:40px;}
  .rub-grid{grid-template-columns:repeat(2,1fr);}
  .bch-in{grid-template-columns:repeat(2,1fr);padding:40px 24px;}
  .g3,.g4{grid-template-columns:repeat(2,1fr);}
  .g-svc{grid-template-columns:1fr;}
  .av-in{grid-template-columns:repeat(2,1fr);}
  .foot-grid{grid-template-columns:1fr 1fr;gap:32px;}
  .page-hdr{padding:32px 20px 28px;}
  .page-body{padding:36px 20px 56px;}
  .rubriques{padding:48px 20px;}
  .cart{width:100%;right:-100%;}
}
@media(max-width:600px){
  .nav-in{padding:0 16px;}
  .topbar-in{padding:0 16px;}
  .hero h1{font-size:2rem;}
  .hero-btns{flex-direction:column;}
  .btn-p,.btn-o{width:100%;text-align:center;}
  .hero-right{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .hcard{flex-direction:column;align-items:flex-start;padding:14px 16px;}
  .hcard-arr{display:none;}
  .rub-grid{grid-template-columns:1fr 1fr;}
  .g3,.g4{grid-template-columns:1fr;}
  .g-svc{grid-template-columns:1fr;}
  .bch-in{grid-template-columns:1fr 1fr;}
  .av-in{grid-template-columns:1fr 1fr;}
  .foot-grid{grid-template-columns:1fr;gap:28px;}
  .form-row{grid-template-columns:1fr;}
  .form-card{padding:22px 16px;}
  .ftabs{flex-direction:column;width:100%;}
  .ai-win{right:12px;width:calc(100vw - 24px);height:calc(100dvh - 110px);}
}

/* ─── ADMIN PANEL ─────────────────────────────────── */
.adm-body{min-height:100vh;background:#f0f2f5;font-family:'Inter',sans-serif;}
.adm-login{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f2017,#1a5c32);}
.adm-login-box{background:#fff;border-radius:16px;padding:40px;width:360px;max-width:90vw;box-shadow:0 20px 60px rgba(0,0,0,.3);}
.adm-login-logo{text-align:center;margin-bottom:28px;}
.adm-login-logo .sq{width:52px;height:52px;background:#1a5c32;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.2rem;margin:0 auto 12px;}
.adm-login-logo h1{font-size:1.1rem;font-weight:700;color:#12201a;}
.adm-login-logo p{font-size:.78rem;color:#6b7c70;margin-top:4px;}
.adm-login-box label{font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#6b7c70;display:block;margin-bottom:6px;}
.adm-login-box input{width:100%;border:1.5px solid #d8e4dc;border-radius:8px;padding:11px 14px;font-family:'Inter',sans-serif;font-size:.9rem;outline:none;margin-bottom:16px;transition:border-color .2s;}
.adm-login-box input:focus{border-color:#1a5c32;}
.adm-btn-login{width:100%;background:#1a5c32;color:#fff;border:none;padding:13px;border-radius:8px;font-family:'Inter',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .2s;}
.adm-btn-login:hover{background:#236b3b;}
.adm-err{background:#fdf2f2;border:1px solid #f5c6c6;color:#922818;font-size:.78rem;padding:9px 12px;border-radius:7px;margin-bottom:12px;text-align:center;}
.adm-top{background:#12201a;color:#fff;padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.adm-top-l{display:flex;align-items:center;gap:10px;}
.adm-top-l .sq{width:32px;height:32px;background:#1a5c32;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.8rem;}
.adm-top-l span{font-size:.9rem;font-weight:600;color:#fff;}
.adm-top-r{display:flex;align-items:center;gap:12px;}
.adm-top-r a{font-size:.78rem;color:rgba(255,255,255,.6);text-decoration:none;transition:color .2s;}
.adm-top-r a:hover{color:#fff;}
.adm-logout{background:rgba(255,255,255,.1);border:none;color:rgba(255,255,255,.7);padding:6px 14px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.78rem;cursor:pointer;transition:all .2s;}
.adm-logout:hover{background:rgba(255,255,255,.2);color:#fff;}
.adm-layout{display:flex;min-height:calc(100vh - 56px);}
.adm-sidebar{width:220px;background:#fff;border-right:1px solid #e0e8e2;padding:20px 0;flex-shrink:0;}
.adm-nav-item{display:flex;align-items:center;gap:10px;padding:11px 20px;font-size:.84rem;font-weight:500;color:#4a5c52;cursor:pointer;transition:all .2s;border-left:3px solid transparent;}
.adm-nav-item:hover{background:#f0f2f5;color:#1a5c32;}
.adm-nav-item.on{background:#e6f2ea;color:#1a5c32;font-weight:600;border-left-color:#1a5c32;}
.adm-nav-item .ni{font-size:1rem;width:20px;text-align:center;}
.adm-content{flex:1;padding:28px;overflow-y:auto;}
.adm-card{background:#fff;border:1px solid #e0e8e2;border-radius:10px;padding:24px;margin-bottom:20px;}
.adm-card-title{font-size:.9rem;font-weight:700;color:#12201a;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid #e0e8e2;display:flex;align-items:center;justify-content:space-between;}
.adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;}
.adm-stat{background:#fff;border:1px solid #e0e8e2;border-radius:10px;padding:20px;text-align:center;}
.adm-stat-n{font-size:1.8rem;font-weight:700;color:#1a5c32;line-height:1;}
.adm-stat-l{font-size:.72rem;color:#6b7c70;margin-top:5px;font-weight:500;}
.adm-promo-box{background:#fff;border:1px solid #e0e8e2;border-radius:10px;padding:24px;margin-bottom:20px;}
.adm-toggle{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
.adm-toggle input[type="checkbox"]{width:42px;height:24px;appearance:none;background:#d8e4dc;border-radius:12px;cursor:pointer;transition:background .2s;position:relative;flex-shrink:0;}
.adm-toggle input[type="checkbox"]::after{content:'';position:absolute;width:18px;height:18px;background:#fff;border-radius:50%;top:3px;left:3px;transition:left .2s;box-shadow:0 1px 4px rgba(0,0,0,.2);}
.adm-toggle input[type="checkbox"]:checked{background:#1a5c32;}
.adm-toggle input[type="checkbox"]:checked::after{left:21px;}
.adm-toggle label{font-size:.88rem;font-weight:600;color:#12201a;cursor:pointer;}
.adm-field{margin-bottom:14px;}
.adm-field label{font-size:.7rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#6b7c70;display:block;margin-bottom:5px;}
.adm-field input,.adm-field textarea,.adm-field select{width:100%;border:1.5px solid #d8e4dc;border-radius:7px;padding:9px 12px;font-family:'Inter',sans-serif;font-size:.85rem;color:#12201a;background:#fff;outline:none;transition:border-color .2s;}
.adm-field input:focus,.adm-field textarea:focus{border-color:#1a5c32;}
.adm-field textarea{resize:vertical;min-height:80px;}
.adm-btn{border:none;padding:9px 18px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:600;cursor:pointer;transition:all .2s;}
.adm-btn-g{background:#1a5c32;color:#fff;}
.adm-btn-g:hover{background:#236b3b;}
.adm-btn-r{background:#b03020;color:#fff;}
.adm-btn-r:hover{background:#922818;}
.adm-btn-w{background:#fff;color:#4a5c52;border:1px solid #d8e4dc;}
.adm-btn-w:hover{border-color:#1a5c32;color:#1a5c32;}
.adm-prod-list{display:flex;flex-direction:column;gap:8px;}
.adm-prod-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid #e0e8e2;border-radius:8px;cursor:pointer;transition:all .2s;background:#fff;}
.adm-prod-item:hover{border-color:#1a5c32;background:#f8fbf9;}
.adm-prod-item.editing{border-color:#1a5c32;background:#e6f2ea;}
.adm-prod-name{flex:1;font-size:.84rem;font-weight:600;color:#12201a;}
.adm-prod-prix{font-size:.8rem;color:#1a5c32;font-weight:600;white-space:nowrap;}
.adm-prod-grp{font-size:.65rem;color:#6b7c70;margin-top:2px;}
.adm-edit-panel{background:#f8fbf9;border:1px solid #b8d8c4;border-radius:8px;padding:16px;margin-top:8px;margin-bottom:8px;}
.adm-save-bar{background:#fff;border-top:1px solid #e0e8e2;padding:14px 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;bottom:0;}
.adm-save-bar span{font-size:.8rem;color:#6b7c70;}
.adm-banner-preview{background:#1a5c32;color:#fff;padding:9px;text-align:center;font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;border-radius:6px;margin-top:12px;}
.adm-tabs{display:flex;gap:4px;margin-bottom:20px;}
.adm-tab{background:transparent;border:none;padding:8px 16px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;color:#6b7c70;cursor:pointer;transition:all .2s;}
.adm-tab.on{background:#e6f2ea;color:#1a5c32;font-weight:600;}
.adm-badge-mod{display:inline-block;width:7px;height:7px;background:#e65100;border-radius:50%;margin-left:5px;vertical-align:middle;}
@media(max-width:768px){.adm-stats{grid-template-columns:1fr 1fr;}.adm-sidebar{display:none;}.adm-content{padding:16px;}}
`;


/* ══════════ DATA ══════════ */
const TEL = "+212523377417";
const WA  = "212700090365";
const CHIM = [
  {id:1,grp:"Coagulants",nom:"PAC — Poly Aluminium Chlorure",desc:"Coagulant liquide haute performance. Efficace sur large plage de pH. Réduction turbidité et MES.",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:2,grp:"Coagulants",nom:"Chlorure Ferrique",desc:"Coagulant minéral puissant pour eaux industrielles et boues. Excellent pouvoir floculant.",img:"https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:3,grp:"Coagulants",nom:"Sulfate d'Aluminium",desc:"Coagulant classique pour eau potable et eaux résiduaires. Soluble, facile à doser.",img:"https://images.unsplash.com/photo-1581093196867-ca4e0b8c4f63?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:4,grp:"Floculants",nom:"Floculant Anionique",desc:"Polyacrylamide anionique pour clarification des eaux chargées. Favorise des flocs denses.",img:"https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:5,grp:"Floculants",nom:"Floculant Cationique",desc:"Polyacrylamide cationique pour conditionnement des boues et flottation.",img:"https://images.unsplash.com/photo-1616163235154-b8efb32c9b7e?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:6,grp:"Correction pH",nom:"Stabilisant de pH",desc:"Maintient le pH dans la plage optimale de traitement.",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:7,grp:"Correction pH",nom:"Correcteur de pH",desc:"Correction acide ou basique du pH des effluents. Prêt à l'emploi.",img:"https://images.unsplash.com/photo-1518152006978-fef17ef50b68?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:8,grp:"Désinfection & Traitement",nom:"Hypochlorite de Sodium",desc:"Désinfectant oxydant puissant. Élimine bactéries et virus.",img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:9,grp:"Désinfection & Traitement",nom:"Antimousse",desc:"Élimine et prévient les mousses dans les bassins de traitement et STEP.",img:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:10,grp:"Désinfection & Traitement",nom:"Décolorant",desc:"Élimination des colorants et pigments dans les effluents textiles.",img:"https://images.unsplash.com/photo-1562977352-f8fc96e5a6ff?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:11,grp:"Désinfection & Traitement",nom:"Peroxyde d'Hydrogène",desc:"Oxydant puissant. Élimine DCO, H₂S et composés organiques.",img:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:12,grp:"Osmose Inverse",nom:"Anti-Scalant",desc:"Prévient l'entartrage des membranes OI. Protège contre carbonates et silice.",img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:13,grp:"Osmose Inverse",nom:"Lavage Membranes — Acide",desc:"Nettoyage acide des membranes OI. Dissout tartre et oxydes métalliques.",img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:14,grp:"Osmose Inverse",nom:"Lavage Membranes — Basique",desc:"Nettoyage alcalin des membranes OI. Élimine biofilm et matière organique.",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:15,grp:"Osmose Inverse",nom:"Biocide Non Oxydant",desc:"Contrôle microbiologique pour circuits OI.",img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:16,grp:"Osmose Inverse",nom:"Métabisulfite de Sodium",desc:"Neutralisant du chlore résiduel avant les membranes OI.",img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:17,grp:"Eaux de Chaudière",nom:"Produit de Passivation",desc:"Protège la surface interne des chaudières contre la corrosion.",img:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:18,grp:"Eaux de Chaudière",nom:"Antitartre Chaudière",desc:"Prévient les dépôts calcaires. Améliore le rendement thermique.",img:"https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:19,grp:"Eaux de Chaudière",nom:"Éliminateur d'Oxygène",desc:"Désoxygénant chimique. Élimine l'oxygène dissous, cause principale de corrosion.",img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=300&q=75"},
];
const MAT = [
  {id:20,nom:"Kit Mesure de Chlore",desc:"Mesure rapide chlore libre et total. Colorimétrie DPD. Idéal eau potable.",img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:21,nom:"Kit Mesure de Dureté",desc:"Titrimétrie EDTA pour dureté totale, calcique et magnésienne.",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:22,nom:"pH-mètre Portable",desc:"Mesure précise du pH sur terrain. Calibration automatique, étanche IP67.",img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:23,nom:"Oxymètre",desc:"Mesure de l'oxygène dissous. Compensation température automatique.",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=300&q=75"},
  {id:24,nom:"Conductimètre",desc:"Mesure conductivité, TDS et salinité. Gamme 0–200 mS/cm.",img:"https://images.unsplash.com/photo-1518152006978-fef17ef50b68?auto=format&fit=crop&w=600&h=300&q=75"},
];
const SVCS = [
  {id:"s1",nom:"Conception & Dimensionnement STEP",desc:"De l'avant-projet à la mise en service. Dimensionnement hydraulique et biologique complet.",ico:"🏗️",tag:"st-ing",tlbl:"Service Ingénierie",feats:["APS / APD / DCE complets","Dimensionnement hydraulique et biologique","Comparaison et sélection des filières","Dossiers autorisation loi sur l'eau","Assistance maîtrise d'ouvrage (AMO)"]},
  {id:"s2",nom:"Optimisation des STEP Existantes",desc:"Audit technique, diagnostic et optimisation des réactifs. Amélioration des performances épuratoires.",ico:"⚙️",tag:"st-ing",tlbl:"Service Ingénierie",feats:["Audit complet de l'installation","Bilan de fonctionnement","Optimisation des doses de réactifs","Mise en place d'indicateurs de suivi","Rapport de recommandations"]},
  {id:"s3",nom:"Solutions Traitement des Eaux",desc:"Choix des procédés, sourcing des réactifs, mise en route et suivi des installations.",ico:"💧",tag:"st-ing",tlbl:"Service Ingénierie",feats:["Étude de faisabilité technique","Choix et dimensionnement des équipements","Formation des équipes opérateurs","Contrat de suivi mensuel disponible","Assistance technique sur site"]},
];
const ANALYSES = [
  {id:30,nom:"Analyse Physicochimique & Bactériologique",desc:"Eaux de surface, souterraines ou résiduaires : pH, DCO, DBO5, MES, métaux lourds, germes.",ico:"🔬",tag:"st-ana",tlbl:"Analyse Certifiée",feats:["Prélèvement sur site par nos ingénieurs","Analyses physico-chimiques & biologiques","Rapport de conformité NM/ISO","Recommandations correctives","Suivi post-analyse inclus"]},
  {id:31,nom:"Analyse Agronomique & Pédologique des Sols",desc:"Caractérisation complète : texture, pH, matière organique, macro et microéléments.",ico:"🌍",tag:"st-ana",tlbl:"Analyse Certifiée",feats:["Prélèvement et préparation échantillons","Analyse granulométrique complète","Dosage NPK & oligo-éléments","pH, CEC, matière organique","Rapport avec recommandations"]},
  {id:32,nom:"Bilan Environnemental & Conformité NM/ISO",desc:"Évaluation des rejets, mesure des paramètres réglementaires, rapport de conformité.",ico:"🔭",tag:"st-ana",tlbl:"Analyse Certifiée",feats:["Audit terrain complet","Mesure des paramètres réglementaires","Analyse des rejets liquides et solides","Rapport de conformité NM/ISO","Plan d'action correctif"]},
];
const FNUM = {
  engrais:[
    {id:40,nom:"Formule Engrais Foliaires",desc:"Macro et microéléments, agents chélatants, adjuvants. Calculs de concentration inclus.",prix:"790 MAD",prixVal:790,emoji:"🌿",bg:"#e8f5e9"},
    {id:41,nom:"Formule Engrais de Fertigation",desc:"Formulations N-P-K pour fertigation goutte-à-goutte et hydroponie. Calculateur tankmix.",prix:"890 MAD",prixVal:890,emoji:"💧",bg:"#e3f2fd"},
    {id:42,nom:"Formule Engrais Hydrosolubles",desc:"Complexes NPK + oligo-éléments. Fiches techniques et protocoles de dissolution.",prix:"690 MAD",prixVal:690,emoji:"🧪",bg:"#f1f8e9"},
  ],
  eaux:[
    {id:43,nom:"Formule Coagulant-Floculant Optimisé",desc:"Protocoles de dosage selon effluents. Jar-test intégré, ratios validés en laboratoire.",prix:"890 MAD",prixVal:890,emoji:"📄",bg:"#e8eaf6"},
    {id:44,nom:"Formule STEP Industrielles",desc:"Protocoles complets : physico-chimique, biologique, tertiaire. Fiches de dosage.",prix:"990 MAD",prixVal:990,emoji:"🏭",bg:"#e0f7fa"},
    {id:45,nom:"Formule Osmose Inverse",desc:"Dosage anti-scalant, biocide et produits de lavage membranes. Indice LSI.",prix:"790 MAD",prixVal:790,emoji:"🛡️",bg:"#e8f5e9"},
  ],
  nettoyage:[
    {id:46,nom:"Détergents Lave-Vaisselle & Vaisselle Manuelle",desc:"Industriels et domestiques : liquides, poudres, tablettes, antibactériens.",prix:"590 MAD",prixVal:590,emoji:"🍽️",bg:"#e3f2fd"},
    {id:47,nom:"Lessives Liquides & Poudres",desc:"Blanc/couleur, enzymatiques, sans phosphore. Détachants inclus.",prix:"590 MAD",prixVal:590,emoji:"👕",bg:"#f3e5f5"},
    {id:48,nom:"Agents Blanchissants & Machines",desc:"Blanchissants chlorés/oxygénés. Anticalcaires, adoucissants textiles.",prix:"490 MAD",prixVal:490,emoji:"🧺",bg:"#fff8e1"},
    {id:49,nom:"Nettoyants Cuisine & Multi-Usages",desc:"Désinfectants surfaces, fours, multi-usages alcalins et chlorés.",prix:"490 MAD",prixVal:490,emoji:"🍳",bg:"#fce4ec"},
    {id:50,nom:"Produits Sanitaires (WC, Canalisations, Douches)",desc:"Nettoyants WC acides, déboucheurs, carrelages et douches.",prix:"590 MAD",prixVal:590,emoji:"🚿",bg:"#e8f5e9"},
    {id:51,nom:"Hygiène des Mains & Désinfectants",desc:"Savons liquides, gels hydroalcooliques, désinfectants germicides.",prix:"490 MAD",prixVal:490,emoji:"🧴",bg:"#e8eaf6"},
    {id:52,nom:"Dégraissants, Antirouille & Détartrants",desc:"Dégraissants concentrés, antirouille acides/alcalins, nettoyants vitres.",prix:"590 MAD",prixVal:590,emoji:"⚙️",bg:"#fef3e2"},
    {id:53,nom:"Produits Sols, Tapis & Climatisation",desc:"Nettoyants sols, shampooings tapis, désinfectants climatiseurs.",prix:"490 MAD",prixVal:490,emoji:"🏠",bg:"#e0f7fa"},
  ],
};
const TICKERS = ["💧 Coagulants & Floculants certifiés","⚗️ Réactifs osmose inverse & STEP","🔬 Analyses eau, sol, environnement NM/ISO","📄 Formulations numériques — accès immédiat","🏗️ +200 projets STEP au Maroc","🇲🇦 Entreprise 100% marocaine","♨️ Traitement eaux de chaudière","✓ Satisfait ou remboursé 30 jours"];
const SUGS = ["Quel coagulant pour mes eaux ?","Anti-scalant osmose inverse ?","Analyse eau de puits ?","Concevoir une STEP ?","Formule détergent industriel ?"];
const SYS = `Tu es l'assistant IA expert d'Univers Environnement Maroc (UEM), El Jadida. Gammes : Réactifs chimiques (coagulants PAC/chlorure ferrique/sulfate aluminium, floculants anionique/cationique, correction pH, hypochlorite, antimousse, anti-scalant, biocide, passivation chaudière), Matériels (pH-mètre, conductimètre, oxymètre, kits chlore/dureté), Analyses (eaux NM/ISO, sols agronomiques, bilan environnemental), Services (STEP conception/optimisation/solutions), Formulations numériques (engrais foliaires/fertigation, traitement eaux, détergents/lessives/sanitaires). Tel: +212523377417. Réponds en français, concis, professionnel.`;
const RUBRIQUES = [
  {k:"chimiques", num:"01", color:"#1a5c32", ic_bg:"#e6f2ea", title:"Produits Chimiques", desc:"Coagulants, floculants, désinfectants, osmose inverse, chaudière.", count:`${CHIM.length} produits`},
  {k:"materiels",  num:"02", color:"#1565c0", ic_bg:"#e6eef7", title:"Matériels",           desc:"Instruments de mesure pH, conductivité, oxygène dissous, chlore.", count:`${MAT.length} équipements`},
  {k:"services",   num:"03", color:"#e65100", ic_bg:"#fdf3e7", title:"Services",            desc:"Ingénierie environnementale, analyses certifiées et STEP.", count:"6 prestations"},
  {k:"formulation",num:"04", color:"#4527a0", ic_bg:"#eee6f7", title:"Formulation",          desc:"Formules numériques : engrais, eaux, nettoyage & détergents.", count:`${FNUM.engrais.length+FNUM.eaux.length+FNUM.nettoyage.length} formules`},
];
const grpBy = (arr,k) => arr.reduce((a,i)=>{ (a[i[k]]=a[i[k]]||[]).push(i); return a; },{});
const NAV = [{k:"garde",l:"Accueil"},{k:"chimiques",l:"Produits Chimiques"},{k:"materiels",l:"Matériels"},{k:"services",l:"Services"},{k:"formulation",l:"Formulation"}];

/* ══════════ ADMIN PANEL ══════════ */
const ADMIN_PASS = "uem-admin-2026";

function AdminPanel() {
  const [logged,  setLogged]  = useState(()=>sessionStorage.getItem("uem_admin")==="ok");
  const [passInp, setPassInp] = useState("");
  const [loginErr,setLoginErr]= useState("");
  const [section, setSection] = useState("dashboard");
  const [promos,  setPromos]  = useState(()=>{ try{ return JSON.parse(localStorage.getItem("uem_promo")||"{}"); }catch{return {};} });
  const [prodEdits,setProdEdits]= useState(()=>{ try{ return JSON.parse(localStorage.getItem("uem_prod_edits")||"{}"); }catch{return {};} });
  const [editing, setEditing] = useState(null);
  const [editData,setEditData]= useState({});
  const [saved,   setSaved]   = useState(false);
  const [editTab, setEditTab] = useState("chimiques");

  const login = e => {
    e.preventDefault();
    if(passInp === ADMIN_PASS){ sessionStorage.setItem("uem_admin","ok"); setLogged(true); }
    else{ setLoginErr("Mot de passe incorrect."); }
  };

  const savePromo = p => {
    const n = {...promos,...p};
    setPromos(n);
    localStorage.setItem("uem_promo", JSON.stringify(n));
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const startEdit = p => { setEditing(p.id); setEditData({prix:p.prix||"Sur devis",desc:p.desc,nom:p.nom}); };

  const saveProd = (id) => {
    const n = {...prodEdits,[id]:editData};
    setProdEdits(n);
    localStorage.setItem("uem_prod_edits",JSON.stringify(n));
    setEditing(null); setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const resetProd = id => {
    const n = {...prodEdits}; delete n[id];
    setProdEdits(n); localStorage.setItem("uem_prod_edits",JSON.stringify(n));
    setEditing(null);
  };

  const resetAll = () => {
    if(!window.confirm("Réinitialiser toutes les modifications ?")) return;
    localStorage.removeItem("uem_prod_edits"); localStorage.removeItem("uem_promo");
    setProdEdits({}); setPromos({}); setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const logout = () => { sessionStorage.removeItem("uem_admin"); setLogged(false); };

  const allProds = [...CHIM,...MAT,...FNUM.engrais,...FNUM.eaux,...FNUM.nettoyage];
  const modCount = Object.keys(prodEdits).length;
  const tabProds = {chimiques:CHIM,materiels:MAT,engrais:FNUM.engrais,eaux:FNUM.eaux,nettoyage:FNUM.nettoyage};

  if(!logged) return (
    <div className="adm-body">
      <style>{CSS}</style>
      <div className="adm-login">
        <div className="adm-login-box">
          <div className="adm-login-logo">
            <div className="sq">UE</div>
            <h1>Univers Environnement Maroc</h1>
            <p>Espace Administrateur</p>
          </div>
          {loginErr&&<div className="adm-err">{loginErr}</div>}
          <form onSubmit={login}>
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••••••" value={passInp} onChange={e=>setPassInp(e.target.value)} autoFocus/>
            <button className="adm-btn-login" type="submit">Se connecter</button>
          </form>
          <div style={{textAlign:"center",marginTop:16,fontSize:".72rem",color:"#6b7c70"}}>
            <a href="/" style={{color:"#1a5c32"}}>← Retour au site</a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="adm-body">
      <style>{CSS}</style>
      {/* TOP BAR */}
      <div className="adm-top">
        <div className="adm-top-l">
          <div className="sq">UE</div>
          <span>Panel Admin — Univers Environnement Maroc</span>
        </div>
        <div className="adm-top-r">
          <a href="/" target="_blank" rel="noreferrer">🌐 Voir le site</a>
          {saved&&<span style={{color:"#5ddb8a",fontSize:".78rem",fontWeight:600}}>✓ Sauvegardé</span>}
          <button className="adm-logout" onClick={logout}>Déconnexion</button>
        </div>
      </div>
      <div className="adm-layout">
        {/* SIDEBAR */}
        <div className="adm-sidebar">
          {[
            {k:"dashboard",i:"📊",l:"Tableau de bord"},
            {k:"catalogue",i:"⚗️",l:`Catalogue${modCount>0?" ("+modCount+" modif.)":""}`},
            {k:"promotions",i:"🎯",l:"Promotions"},
            {k:"contact",i:"📞",l:"Contact & Infos"},
          ].map(n=><div key={n.k} className={`adm-nav-item${section===n.k?" on":""}`} onClick={()=>setSection(n.k)}><span className="ni">{n.i}</span>{n.l}{n.k==="catalogue"&&modCount>0&&<span className="adm-badge-mod"/>}</div>)}
          <div style={{margin:"20px 16px 8px",fontSize:".65rem",color:"#b8c8be",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase"}}>Actions</div>
          <div className="adm-nav-item" onClick={resetAll} style={{color:"#b03020"}}><span className="ni">🔄</span>Réinitialiser tout</div>
        </div>

        {/* CONTENT */}
        <div className="adm-content">

          {/* DASHBOARD */}
          {section==="dashboard"&&(<>
            <h2 style={{fontSize:"1.2rem",fontWeight:700,marginBottom:20,color:"#12201a"}}>Tableau de bord</h2>
            <div className="adm-stats">
              {[{n:CHIM.length,l:"Réactifs chimiques"},{n:MAT.length,l:"Matériels"},{n:`${FNUM.engrais.length+FNUM.eaux.length+FNUM.nettoyage.length}`,l:"Formulations"},{n:"6",l:"Services"}].map((s,i)=>(
                <div key={i} className="adm-stat"><div className="adm-stat-n">{s.n}</div><div className="adm-stat-l">{s.l}</div></div>
              ))}
            </div>
            <div className="adm-card">
              <div className="adm-card-title">État du site</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[
                  {l:"Site en ligne",v:"✅ www.uem.ma",c:"#1a5c32"},
                  {l:"Hébergement",v:"✅ Vercel (gratuit)"},
                  {l:"Formulaire devis",v:"✅ EmailJS actif"},
                  {l:"Assistant IA",v:"✅ Claude intégré"},
                  {l:"Modifications en attente",v:modCount>0?`⚠️ ${modCount} produit(s) modifié(s)`:"✅ Aucune",c:modCount>0?"#e65100":"#1a5c32"},
                  {l:"Promotion active",v:promos.active?"✅ Oui — "+promos.texte:"— Aucune"},
                ].map((r,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #e0e8e2",fontSize:".84rem"}}>
                    <span style={{color:"#4a5c52",fontWeight:500}}>{r.l}</span>
                    <span style={{fontWeight:600,color:r.c||"#12201a"}}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="adm-card">
              <div className="adm-card-title">Guide rapide</div>
              {[["⚗️ Catalogue","Modifier les prix et descriptions de vos produits"],["🎯 Promotions","Activer une bannière promotionnelle sur le site"],["📞 Contact","Consulter vos informations de contact actuelles"]].map((r,i)=>(
                <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid #f0f2f5",alignItems:"flex-start"}}>
                  <span style={{fontSize:"1.2rem"}}>{r[0].split(" ")[0]}</span>
                  <div><div style={{fontSize:".84rem",fontWeight:600,color:"#12201a"}}>{r[0].slice(2)}</div><div style={{fontSize:".78rem",color:"#6b7c70",marginTop:2}}>{r[1]}</div></div>
                </div>
              ))}
            </div>
          </>)}

          {/* CATALOGUE */}
          {section==="catalogue"&&(<>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h2 style={{fontSize:"1.2rem",fontWeight:700,color:"#12201a"}}>Catalogue Produits</h2>
              <span style={{fontSize:".78rem",color:"#6b7c70"}}>{modCount} modification(s)</span>
            </div>
            <div className="adm-tabs">
              {[{k:"chimiques",l:"Réactifs (19)"},{k:"materiels",l:"Matériels (5)"},{k:"engrais",l:"Engrais"},{k:"eaux",l:"Formules Eaux"},{k:"nettoyage",l:"Nettoyage"}]
                .map(t=><button key={t.k} className={`adm-tab${editTab===t.k?" on":""}`} onClick={()=>setEditTab(t.k)}>{t.l}</button>)}
            </div>
            <div className="adm-prod-list">
              {(tabProds[editTab]||[]).map(p=>{
                const mod = prodEdits[p.id];
                const disp = mod ? {...p,...mod} : p;
                return (
                  <div key={p.id}>
                    <div className={`adm-prod-item${editing===p.id?" editing":""}`} onClick={()=>editing===p.id?setEditing(null):startEdit(p)}>
                      <div style={{flex:1}}>
                        <div className="adm-prod-name">{disp.nom||p.nom}{mod&&<span style={{fontSize:".65rem",background:"#fdf3e7",color:"#e65100",padding:"1px 6px",borderRadius:3,marginLeft:6}}>modifié</span>}</div>
                        <div className="adm-prod-grp">{p.grp||"Formulation numérique"}</div>
                      </div>
                      <div className="adm-prod-prix">{disp.prix||"Sur devis"}</div>
                      <span style={{fontSize:".8rem",color:"#b8c8be",marginLeft:8}}>{editing===p.id?"▲":"▼"}</span>
                    </div>
                    {editing===p.id&&(
                      <div className="adm-edit-panel">
                        <div className="adm-field">
                          <label>Nom du produit</label>
                          <input value={editData.nom||""} onChange={e=>setEditData(d=>({...d,nom:e.target.value}))}/>
                        </div>
                        <div className="adm-field">
                          <label>Description</label>
                          <textarea value={editData.desc||""} onChange={e=>setEditData(d=>({...d,desc:e.target.value}))} rows={3}/>
                        </div>
                        <div className="adm-field">
                          <label>Prix affiché</label>
                          <input value={editData.prix||""} onChange={e=>setEditData(d=>({...d,prix:e.target.value}))} placeholder="Ex: 390 MAD ou Sur devis"/>
                        </div>
                        <div style={{display:"flex",gap:8,marginTop:4}}>
                          <button className="adm-btn adm-btn-g" onClick={()=>saveProd(p.id)}>✓ Enregistrer</button>
                          <button className="adm-btn adm-btn-w" onClick={()=>setEditing(null)}>Annuler</button>
                          {mod&&<button className="adm-btn adm-btn-r" onClick={()=>resetProd(p.id)}>Réinitialiser</button>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>)}

          {/* PROMOTIONS */}
          {section==="promotions"&&(<>
            <h2 style={{fontSize:"1.2rem",fontWeight:700,marginBottom:20,color:"#12201a"}}>Gestion des Promotions</h2>
            <div className="adm-promo-box">
              <div className="adm-card-title">Bannière promotionnelle</div>
              <div className="adm-toggle">
                <input type="checkbox" id="promo-on" checked={!!promos.active} onChange={e=>savePromo({active:e.target.checked})}/>
                <label htmlFor="promo-on">{promos.active?"Bannière ACTIVE sur le site":"Bannière désactivée"}</label>
              </div>
              <div className="adm-field">
                <label>Texte de la bannière</label>
                <input value={promos.texte||""} onChange={e=>savePromo({texte:e.target.value})} placeholder="Ex: 🎉 Promotion -20% sur les coagulants jusqu'au 30/07"/>
              </div>
              <div className="adm-field">
                <label>Couleur de fond</label>
                <select value={promos.couleur||"vert"} onChange={e=>savePromo({couleur:e.target.value})}>
                  <option value="vert">Vert (défaut)</option>
                  <option value="rouge">Rouge (urgence)</option>
                  <option value="bleu">Bleu (info)</option>
                  <option value="orange">Orange (solde)</option>
                </select>
              </div>
              {promos.texte&&<div className="adm-banner-preview" style={{background:{vert:"#1a5c32",rouge:"#b03020",bleu:"#1565c0",orange:"#e65100"}[promos.couleur||"vert"]}}>Aperçu : {promos.texte}</div>}
            </div>
            <div className="adm-card">
              <div className="adm-card-title">Idées de promotions</div>
              {["🎉 Promotion -20% sur les coagulants jusqu'au 31/07","⚡ Livraison offerte sur toute commande > 2000 MAD","🔬 Formulation offerte pour tout contrat STEP signé en juillet","📄 -15% sur les formulations numériques ce mois"].map((s,i)=>(
                <div key={i} style={{padding:"8px 0",borderBottom:"1px solid #f0f2f5",fontSize:".82rem",color:"#4a5c52",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>{s}</span>
                  <button className="adm-btn adm-btn-w" style={{fontSize:".7rem",padding:"4px 10px"}} onClick={()=>savePromo({texte:s})}>Utiliser</button>
                </div>
              ))}
            </div>
          </>)}

          {/* CONTACT */}
          {section==="contact"&&(<>
            <h2 style={{fontSize:"1.2rem",fontWeight:700,marginBottom:20,color:"#12201a"}}>Informations de Contact</h2>
            <div className="adm-card">
              <div className="adm-card-title">Coordonnées actuelles sur le site</div>
              {[["Téléphone","+212 523 37 74 17"],["WhatsApp","+212 700 090 365"],["Email","univers.envi@gmail.com"],["Adresse","N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc"],["Domaine","www.uem.ma"],["EmailJS Service","service_3p09q76"]].map((r,i)=>(
                <div key={i} style={{display:"flex",gap:16,padding:"10px 0",borderBottom:"1px solid #f0f2f5",fontSize:".84rem"}}>
                  <span style={{width:140,color:"#6b7c70",fontWeight:600,flexShrink:0}}>{r[0]}</span>
                  <span style={{color:"#12201a",fontWeight:500}}>{r[1]}</span>
                </div>
              ))}
            </div>
            <div className="adm-card" style={{background:"#fdf3e7",borderColor:"#f5d6a0"}}>
              <div className="adm-card-title" style={{color:"#e65100"}}>⚠️ Pour modifier ces informations</div>
              <p style={{fontSize:".84rem",color:"#4a5c52",lineHeight:1.7}}>Les coordonnées sont intégrées dans le code source. Pour les modifier, envoyez un message à Claude avec les nouvelles informations et il mettra à jour le site.</p>
            </div>
          </>)}

        </div>
      </div>
      {modCount>0&&<div className="adm-save-bar"><span>⚠️ {modCount} modification(s) — Les changements sont sauvegardés dans ce navigateur. Pour les appliquer sur tous les appareils, contactez Claude.</span><button className="adm-btn adm-btn-g" onClick={()=>setSaved(true)}>✓ OK</button></div>}
    </div>
  );
}

export default function App() {
  const [page,setPage]     = useState("garde");
  const [panier,setPanier] = useState([]);
  const [cart,setCart]     = useState(false);
  const [mob,setMob]       = useState(false);
  const [toast,setToast]   = useState("");
  const [chat,setChat]     = useState(false);
  const [msgs,setMsgs]     = useState([{r:"b",t:"Bonjour ! Je suis l'assistant expert d'**Univers Environnement Maroc**.\n\nJe peux vous conseiller sur nos produits chimiques, matériels, services ou formulations. Comment puis-je vous aider ?"}]);
  const [inp,setInp]       = useState("");
  const [load,setLoad]     = useState(false);
  const [sugs,setSugs]     = useState(true);
  const [ftab,setFtab]     = useState("engrais");
  const [form,setForm]     = useState({nom:"",email:"",tel:"",produit:"",rubrique:"",msg:""});
  const [fsend,setFsend]   = useState(false);
  const [fok,setFok]       = useState(false);
  const [ferr,setFerr]     = useState("");

  // Admin routing
  if(window.location.pathname==="/admin") return <AdminPanel/>;

  // Load admin edits from localStorage
  const prodEdits = (() => { try{ return JSON.parse(localStorage.getItem("uem_prod_edits")||"{}"); }catch{return {};} })();
  const promoData = (() => { try{ return JSON.parse(localStorage.getItem("uem_promo")||"{}"); }catch{return {};} })();
  const applyEdits = arr => arr.map(p => prodEdits[p.id] ? {...p,...prodEdits[p.id]} : p);
  const tmr = useRef(null); const end = useRef(null); const iref = useRef(null);

  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);
  useEffect(()=>{ if(chat) end.current?.scrollIntoView({behavior:"smooth"}); },[msgs,load,chat]);
  useEffect(()=>{ if(chat) setTimeout(()=>iref.current?.focus(),350); },[chat]);

  const shToast = m => { setToast(m); clearTimeout(tmr.current); tmr.current=setTimeout(()=>setToast(""),2800); };
  const go = p => { setPage(p); setMob(false); };
  const addCart = p => { setPanier(pr=>{ const ex=pr.find(i=>i.id===p.id); return ex?pr.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...pr,{...p,qty:1}]; }); shToast(`✓ "${p.nom}" ajouté au panier`); };
  const delCart = id => setPanier(p=>p.filter(i=>i.id!==id));
  const total = panier.reduce((s,i)=>s+i.prixVal*i.qty,0);
  const qty   = panier.reduce((s,i)=>s+i.qty,0);
  const askDevis = nom => { setForm(f=>({...f,produit:nom})); go("contact"); };

  const aiSend = async t => {
    const txt=(t||inp).trim(); if(!txt||load) return;
    setInp(""); setSugs(false);
    setMsgs(p=>[...p,{r:"u",t:txt}]); setLoad(true);
    const hist=msgs.map(m=>({role:m.r==="u"?"user":"assistant",content:m.t}));
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:SYS,messages:[...hist,{role:"user",content:txt}]})});
      const d=await res.json();
      setMsgs(p=>[...p,{r:"b",t:d.content?.map(b=>b.text||"").join("")||"Désolé, une erreur est survenue."}]);
    }catch{ setMsgs(p=>[...p,{r:"b",t:"Une erreur est survenue. Veuillez réessayer."}]); }
    finally{ setLoad(false); }
  };

  const submitDevis = async e => {
    e.preventDefault();
    if(!form.nom||!form.email||!form.produit){ setFerr("Veuillez remplir les champs marqués d'un astérisque (*)."); return; }
    setFsend(true); setFerr("");
    try{
      await emailjs.send(EJS.svc,EJS.tpl,{nom:form.nom,email:form.email,telephone:form.tel||"—",produit:form.produit+" ("+form.rubrique+")",message:form.msg||"—"},EJS.key);
      setFok(true); setForm({nom:"",email:"",tel:"",produit:"",rubrique:"",msg:""});
    }catch(err){ setFerr("Erreur d'envoi. Contactez-nous directement : univers.envi@gmail.com"); }
    finally{ setFsend(false); }
  };

  const rtx = t => t.split(/(\*\*[^*]+\*\*)/g).map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i}>{p.slice(2,-2)}</strong>:<span key={i}>{p}</span>);

  const PCard = ({p,type}) => (
    <div className="pc">
      {p.img ? (
        <div className="pc-img">
          <img src={p.img} alt={p.nom} loading="lazy"/>
          <div className="pc-overlay"/>
          <span className={`pc-badge ${type==="n"?"badge-n":type==="m"?"badge-m":"badge-r"}`}>{type==="n"?"Numérique":type==="m"?"Matériel":"Réactif"}</span>
        </div>
      ) : (
        <div className="pc-fallback" style={{background:p.bg||"#e8f5e9"}}>
          <span>{p.emoji}</span>
          <span className={`pc-badge ${type==="n"?"badge-n":type==="m"?"badge-m":"badge-r"}`}>{type==="n"?"Numérique":type==="m"?"Matériel":"Réactif"}</span>
        </div>
      )}
      <div className="pc-body">
        {p.grp&&<div className="pc-grp">{p.grp}</div>}
        <div className="pc-nom">{p.nom}</div>
        <div className="pc-desc">{p.desc}</div>
        <div className="pc-foot">
          <div><div className="pc-prix">{p.prix||"Sur devis"}</div><div className="pc-unit">/ {p.unite||"unité"}</div></div>
          {type==="n"
            ? <button className="btn-r br-b" onClick={()=>addCart(p)}>⚡ Acheter</button>
            : <button className="btn-r br-a" onClick={()=>askDevis(p.nom)}>Demander →</button>}
        </div>
      </div>
    </div>
  );

  const PageHdr = ({cat,h1,em,sub}) => (
    <div className="page-hdr">
      <div className="ph-in">
        <button className="ph-back" onClick={()=>go("garde")}>←</button>
        <div className="ph-txt">
          <div className="ph-cat">{cat}</div>
          <h1>{h1}{em&&<> — <em>{em}</em></>}</h1>
          {sub&&<p>{sub}</p>}
        </div>
      </div>
    </div>
  );

  /* ═══ PAGE GARDE ═══ */
  const Garde = ()=>(
    <>
      <div className="hero">
        <div className="hero-in">
          <div>
            <div className="hero-tag"><span/>Expertise environnementale au Maroc</div>
            <h1>Réactifs, matériel &<br/><em>ingénierie</em> pour<br/><span className="r">vos eaux</span></h1>
            <p className="hero-desc">Produits chimiques certifiés · Matériel de mesure · Ingénierie environnementale · Formulations techniques — tout pour le traitement de l'eau au Maroc.</p>
            <div className="hero-btns">
              <button className="btn-p" onClick={()=>go("chimiques")}>Explorer les produits</button>
              <button className="btn-o" onClick={()=>go("contact")}>Demander un devis</button>
            </div>
            <div className="hero-stats">
              {[{n:"200+",l:"STEP conçues"},{n:"15 ans",l:"D'expertise"},{n:"500+",l:"Clients actifs"},{n:"98%",l:"Satisfaction"}].map((s,i)=>(
                <div key={i}><div className="hs-n">{s.n}</div><div className="hs-l">{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-right">
            {[{color:"#1a5c32",cat:"Réactifs Chimiques",nom:"Coagulants · Floculants · Désinfectants",p:"chimiques"},
              {color:"#1565c0",cat:"Matériels de Mesure",nom:"pH-mètre · Conductimètre · Oxymètre",p:"materiels"},
              {color:"#e65100",cat:"Services Ingénierie",nom:"Conception STEP · Analyses · Optimisation",p:"services"},
              {color:"#4527a0",cat:"Formulations Numériques",nom:"Engrais · Traitement eaux · Nettoyage",p:"formulation"},
            ].map((c,i)=>(
              <div key={i} className="hcard" onClick={()=>go(c.p)} style={{borderLeft:`3px solid ${c.color}`}}>
                <div className="hcard-tx">
                  <div className="hct" style={{color:c.color}}>{c.cat}</div>
                  <div className="hcn">{c.nom}</div>
                </div>
                <span className="hcard-arr" style={{color:c.color}}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bchiffres">
        <div className="bch-in">
          {[{n:"Livraison 24h",l:"Partout au Maroc"},{n:"NM / ISO",l:"Analyses certifiées"},{n:"Gratuit",l:"Hébergement Vercel"},{n:"🇲🇦",l:"100% Marocain"}].map((c,i)=>(
            <div key={i}><div className="bchn">{c.n}</div><div className="bchl">{c.l}</div></div>
          ))}
        </div>
      </div>
      <div className="rubriques">
        <div className="rub-in">
          <div className="sec-label">Nos rubriques</div>
          <h2 className="sec-title">Explorez notre <em>catalogue complet</em></h2>
          <p className="sec-sub">Produits chimiques, matériels, services d'ingénierie et formulations numériques.</p>
          <div className="rub-grid">
            {RUBRIQUES.map(r=>(
              <div key={r.k} className="rcard" onClick={()=>go(r.k)} style={{borderTop:`3px solid ${r.color}`}}>
                <div style={{fontSize:"1.4rem",fontWeight:700,color:r.color,fontFamily:"Inter,sans-serif",marginBottom:12,letterSpacing:"-.02em"}}>{r.num}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <span className="rcard-count" style={{background:`${r.color}18`,color:r.color}}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="avantages">
        <div className="av-in">
          {[{i:"🚚",t:"Livraison 24h",d:"Expédition rapide partout au Maroc."},
            {i:"⚡",t:"Accès immédiat",d:"Formulations numériques dès paiement."},
            {i:"🔒",t:"Paiement sécurisé",d:"CMI, virement, PayPal — 100% sécurisé."},
            {i:"🇲🇦",t:"Expertise locale",d:"15 ans d'expérience terrain au Maroc."}
          ].map((a,i)=><div key={i} className="av-item"><div className="av-ico">{a.i}</div><div className="av-t">{a.t}</div><div className="av-d">{a.d}</div></div>)}
        </div>
      </div>
    </>
  );

  /* ═══ PAGE CHIMIQUES ═══ */
  const PageChim = ()=>{
    const gs=grpBy(CHIM,"grp");
    return(<>
      <PageHdr cat="Catalogue" h1="Produits Chimiques" em="Réactifs certifiés" sub="Coagulants, floculants, désinfectants, osmose inverse et chaudière — qualité certifiée, livraison 24h au Maroc."/>
      <div className="page-body">
        {Object.entries(gs).map(([grp,items])=>(
          <div key={grp} className="grp">
            <div className="grp-hd"><h2>{grp}</h2><span className="grp-pill">{items.length} produits</span></div>
            <div className="g3">{items.map(p=><PCard key={p.id} p={p} type="p"/>)}</div>
          </div>
        ))}
      </div>
    </>);
  };

  /* ═══ PAGE MATÉRIELS ═══ */
  const PageMat = ()=>(<>
    <PageHdr cat="Équipements" h1="Matériels de Mesure" em="Instruments professionnels" sub="pH-mètres, conductimètres, oxymètres, kits terrain — équipements fiables pour le contrôle qualité de vos eaux."/>
    <div className="page-body"><div className="g4">{MAT.map(p=><PCard key={p.id} p={p} type="m"/>)}</div></div>
  </>);

  /* ═══ PAGE SERVICES ═══ */
  const PageSvc = ()=>(<>
    <PageHdr cat="Ingénierie & Analyses" h1="Nos Services" em="Expertise terrain" sub="Conception STEP, analyses certifiées NM/ISO et optimisation de vos procédés — accompagnement A à Z."/>
    <div className="page-body">
      <div className="grp">
        <div className="grp-hd"><h2>Services d'ingénierie</h2><span className="grp-pill">3 prestations</span></div>
        <div className="g-svc">{SVCS.map(s=>(<div key={s.id} className="sc"><div className="sc-ico">{s.ico}</div><span className={`sc-tag ${s.tag}`}>{s.tlbl}</span><div className="sc-nom">{s.nom}</div><div className="sc-desc">{s.desc}</div><ul className="sc-feats">{s.feats.map((f,i)=><li key={i}>{f}</li>)}</ul><button className="btn-dvc" onClick={()=>askDevis(s.nom)}>Demander un devis →</button></div>))}</div>
      </div>
      <div className="grp">
        <div className="grp-hd"><h2>Analyses environnementales</h2><span className="grp-pill">3 analyses</span></div>
        <div className="g-svc">{ANALYSES.map(a=>(<div key={a.id} className="sc"><div className="sc-ico">{a.ico}</div><span className={`sc-tag ${a.tag}`}>{a.tlbl}</span><div className="sc-nom">{a.nom}</div><div className="sc-desc">{a.desc}</div><ul className="sc-feats">{a.feats.map((f,i)=><li key={i}>{f}</li>)}</ul><button className="btn-dvc" onClick={()=>askDevis(a.nom)}>Demander un devis →</button></div>))}</div>
      </div>
    </div>
  </>);

  /* ═══ PAGE FORMULATION ═══ */
  const PageForm = ()=>(<>
    <PageHdr cat="Produits Numériques" h1="Formulations Techniques" em="PDF + Excel" sub="Accès permanent après achat. Formules validées en laboratoire pour engrais, traitement des eaux et nettoyage industriel."/>
    <div className="page-body">
      <div className="ftabs">
        {[{k:"engrais",l:"🌿 Engrais"},{k:"eaux",l:"💧 Traitement des Eaux"},{k:"nettoyage",l:"🧴 Nettoyage & Détergents"}]
          .map(t=><button key={t.k} className={`ftab${ftab===t.k?" on":""}`} onClick={()=>setFtab(t.k)}>{t.l}</button>)}
      </div>
      <div className="g3">{FNUM[ftab].map(p=><PCard key={p.id} p={{...p,unite:"accès permanent"}} type="n"/>)}</div>
    </div>
  </>);

  /* ═══ PAGE CONTACT ═══ */
  const PageContact = ()=>(<>
    <PageHdr cat="Devis & Contact" h1="Demandez votre devis" em="gratuit" sub="Notre équipe vous répond sous 24h — El Jadida, Maroc."/>
    <div className="page-body">
      <div className="contact-wrap">
        <div className="contact-intro">
          <h2>Parlons de votre <em>projet</em></h2>
          <p>Remplissez le formulaire ci-dessous. Tous les champs marqués * sont obligatoires.</p>
        </div>
        <div className="form-card">
          {fok?(
            <div className="form-ok">
              <div className="fok-ico">✅</div>
              <div className="fok-title">Demande envoyée !</div>
              <div className="fok-sub">Merci, nous avons bien reçu votre demande.<br/>Notre équipe vous contactera sous 24h.</div>
              <button className="btn-p" style={{marginTop:24,width:"auto",padding:"11px 28px"}} onClick={()=>setFok(false)}>Nouvelle demande</button>
            </div>
          ):(
            <form onSubmit={submitDevis} autoComplete="on">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="f-nom">Nom complet *</label>
                  <input id="f-nom" type="text" name="nom" placeholder="Votre nom et prénom" autoComplete="name" value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="f-email">Adresse email *</label>
                  <input id="f-email" type="email" name="email" placeholder="votre@email.com" autoComplete="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="f-tel">Téléphone</label>
                  <input id="f-tel" type="tel" name="telephone" placeholder="+212 6XX XXX XXX" autoComplete="tel" value={form.tel} onChange={e=>setForm(f=>({...f,tel:e.target.value}))}/>
                </div>
                <div className="form-group">
                  <label htmlFor="f-rub">Rubrique</label>
                  <select id="f-rub" name="rubrique" value={form.rubrique} onChange={e=>setForm(f=>({...f,rubrique:e.target.value}))}>
                    <option value="">Sélectionnez...</option>
                    <option value="Produits Chimiques">Produits Chimiques</option>
                    <option value="Matériels">Matériels de Mesure</option>
                    <option value="Services">Services d'Ingénierie</option>
                    <option value="Analyses">Analyses Environnementales</option>
                    <option value="Formulation">Formulations Numériques</option>
                  </select>
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label htmlFor="f-prod">Produit / Service concerné *</label>
                  <input id="f-prod" type="text" name="produit" placeholder="Ex : PAC Coagulant, Analyse eau, STEP 500m³/j..." value={form.produit} onChange={e=>setForm(f=>({...f,produit:e.target.value}))} required/>
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label htmlFor="f-msg">Message & détails de votre besoin</label>
                  <textarea id="f-msg" name="message" placeholder="Décrivez votre besoin : quantité souhaitée, débit de la STEP, type d'eau à traiter, délai..." value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))}/>
                </div>
              </div>
              {ferr&&<div className="form-error">{ferr}</div>}
              <button className="btn-submit" type="submit" disabled={fsend}>{fsend?"⏳ Envoi en cours...":"📩 Envoyer la demande de devis"}</button>
              <div className="form-note">🔒 Vos données sont confidentielles · Réponse sous 24h</div>
            </form>
          )}
        </div>
        <div className="contact-alt">
          <div className="calt-item">📞 <a href={`tel:+${TEL}`}>+212 523 37 74 17</a></div>
          <div className="calt-item">💬 <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div className="calt-item">✉️ <a href="mailto:univers.envi@gmail.com">univers.envi@gmail.com</a></div>
          <div className="calt-item">📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida</div>
        </div>
      </div>
    </div>
  </>);

  const PAGES = {garde:<Garde/>,chimiques:<PageChim/>,materiels:<PageMat/>,services:<PageSvc/>,formulation:<PageForm/>,contact:<PageContact/>};

  return (
    <>
      <style>{CSS}</style>
      <div className={`toast${toast?" on":""}`}>{toast}</div>

      {/* PANIER */}
      <div className={`overlay${cart?" on":""}`} onClick={()=>setCart(false)}/>
      <div className={`cart${cart?" on":""}`}>
        <div className="cart-hd"><h2>🛒 Panier{qty>0?` (${qty})`:""}</h2><button className="cart-x" onClick={()=>setCart(false)}>✕</button></div>
        <div className="cart-body">
          {panier.length===0?<div className="cart-empty">Votre panier est vide.</div>
            :panier.map(i=><div key={i.id} className="ci"><div className="ci-ico">{i.emoji||"📄"}</div><div className="ci-info"><div className="ci-nom">{i.nom}</div><div className="ci-px">{i.prixVal.toLocaleString("fr-MA")} MAD × {i.qty} = {(i.prixVal*i.qty).toLocaleString("fr-MA")} MAD</div></div><button className="ci-rm" onClick={()=>delCart(i.id)}>✕</button></div>)}
        </div>
        <div className="cart-ft">
          <div className="cart-tot"><span className="cart-tot-l">Total TTC</span><span className="cart-tot-p">{total.toLocaleString("fr-MA")} MAD</span></div>
          <button className="btn-pay" disabled={!panier.length}>🔒 Passer la commande</button>
          <div className="pay-note">Paiement sécurisé · CMI · Virement · PayPal</div>
        </div>
      </div>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-in">
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <a href={`tel:+${TEL}`}>📞 +212 523 37 74 17</a>
            <span className="tb-sep">|</span>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">💬 +212 700 090 365</a>
            <span className="tb-sep">|</span>
            <span>📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida</span>
          </div>
          <a href="mailto:univers.envi@gmail.com">✉️ univers.envi@gmail.com</a>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="nav">
        <div className="nav-in">
          <div className="logo" onClick={()=>go("garde")} role="button" tabIndex={0}>
            <div className="logo-sq">UE</div>
            <div className="logo-tx"><span className="n1">Univers Environnement</span><span className="n2">Maroc — El Jadida</span></div>
          </div>
          <div className="nav-links">
            {NAV.map(n=><button key={n.k} className={page===n.k?"on":""} onClick={()=>go(n.k)}>{n.l}</button>)}
          </div>
          <div className="nav-right">
            <button className="btn-devis-nav" onClick={()=>go("contact")}>Demander un devis</button>
            <button className="cart-x" style={{position:"relative"}} onClick={()=>setCart(true)}>🛒{qty>0&&<span style={{position:"absolute",top:"-6px",right:"-6px",background:"#b03020",color:"#fff",borderRadius:"50%",width:"16px",height:"16px",fontSize:".6rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{qty}</span>}</button>
          </div>
          <button className={`burger${mob?" on":""}`} onClick={()=>setMob(v=>!v)}><span/><span/><span/></button>
        </div>
        <div className={`mob-menu${mob?" on":""}`}>
          <nav>
            {NAV.map(n=><button key={n.k} className={page===n.k?"on":""} onClick={()=>go(n.k)}>{n.l}</button>)}
            <button className="mob-cta" onClick={()=>go("contact")}>Demander un devis</button>
          </nav>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker"><div className="ticker-t">{[...TICKERS,...TICKERS].map((t,i)=><span key={i} className="ticker-i">{t}</span>)}</div></div>

      {/* BANNIÈRE PROMO */}
      {promoData.active&&promoData.texte&&(
        <div style={{background:{vert:"#1a5c32",rouge:"#b03020",bleu:"#1565c0",orange:"#e65100"}[promoData.couleur||"vert"],color:"#fff",padding:"10px",textAlign:"center",fontSize:".8rem",fontWeight:600,letterSpacing:".04em"}}>
          {promoData.texte}
        </div>
      )}

      {/* PAGE */}
      {PAGES[page]||<Garde/>}

      {/* FOOTER */}
      <footer>
        <div className="foot-in">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="fb-n">Univers Environnement <span>Maroc</span></div>
              <p>Solutions intégrées pour le traitement des eaux et l'ingénierie environnementale au Maroc depuis plus de 15 ans.</p>
              <div className="fb-contact">
                <a href={`tel:+${TEL}`}>📞 +212 523 37 74 17</a>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">💬 +212 700 090 365</a>
                <a href="mailto:univers.envi@gmail.com">✉️ univers.envi@gmail.com</a>
                <a href="#">📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida</a>
              </div>
            </div>
            <div className="foot-col"><h4>Navigation</h4><ul>{NAV.map(n=><li key={n.k} onClick={()=>go(n.k)}>{n.l}</li>)}<li onClick={()=>go("contact")}>Contact & Devis</li></ul></div>
            <div className="foot-col"><h4>Services</h4><ul><li>Conception STEP</li><li>Analyse environnementale</li><li>Optimisation process</li><li>Formation opérateurs</li></ul></div>
            <div className="foot-col"><h4>Informations</h4><ul><li>À propos</li><li>Mentions légales</li><li>CGV</li><li>Confidentialité</li></ul></div>
          </div>
          <div className="foot-bot"><span>© 2026 Univers Environnement Maroc — Tous droits réservés</span><span>🔒 Paiements sécurisés · CMI · SSL</span></div>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a href={`https://wa.me/${WA}?text=Bonjour%20UEM%2C%20je%20souhaite%20des%20informations.`} target="_blank" rel="noreferrer" className="wa" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* AI CHAT */}
      <button className="ai-fab" onClick={()=>setChat(v=>!v)} style={{position:"relative"}} aria-label="Assistant IA">
        {chat?"✕":"💬"}{!chat&&<span className="ai-dot"/>}
      </button>
      <div className={`ai-win${chat?" on":""}`}>
        <div className="ai-hd">
          <div className="ai-av">🌱</div>
          <div className="ai-hi"><div className="ai-nm">Assistant UEM</div><div className="ai-st">En ligne · Expert eau & environnement</div></div>
          <button className="ai-cx" onClick={()=>setChat(false)}>✕</button>
        </div>
        <div className="ai-msgs">
          {msgs.map((m,i)=>(
            <div key={i} className={`m ${m.r==="u"?"u":"b"}`}>
              <div className="m-av">{m.r==="u"?"👤":"🌱"}</div>
              <div className="m-b" style={{whiteSpace:"pre-wrap"}}>{rtx(m.t)}</div>
            </div>
          ))}
          {load&&<div className="m b"><div className="m-av">🌱</div><div className="typing"><span/><span/><span/></div></div>}
          <div ref={end}/>
        </div>
        {sugs&&<div className="ai-sugs">{SUGS.map((s,i)=><button key={i} className="sug" onClick={()=>aiSend(s)}>{s}</button>)}</div>}
        <div className="ai-ir">
          <textarea ref={iref} className="ai-inp" placeholder="Posez votre question…" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();aiSend();}}} rows={1}/>
          <button className="ai-snd" onClick={()=>aiSend()} disabled={!inp.trim()||load}>➤</button>
        </div>
      </div>
    </>
  );
}
