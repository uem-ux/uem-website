import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

/* ══ CONFIG ══ */
const EJS = { svc:"service_3p09q76", tpl:"template_1qu65qm", key:"bhR3gf_SYQEaKSOky" };
const TEL = "212523377417", WA = "212700090365";
const ADMIN_PASS = "uem-admin-2026";

/* ══ CSS ══ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --v:#1565c0;--v2:#0d47a1;--v3:#42a5f5;
  --gr:#5cb800;--gr2:#4a9200;--gr3:#8bc34a;
  --r:#e53935;--fond:#f4f9ff;--w:#fff;--k:#0d1b2e;
  --g1:#3a5068;--g2:#7090a8;--g3:#b0c8d8;
  --b:#cce0f5;--s:#e8f4fd;
  --sh:0 2px 12px rgba(13,27,46,.08);
  --T:cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:var(--fond);color:var(--k);overflow-x:hidden;-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.6;}
/* TOPBAR */
.tb{background:linear-gradient(135deg,#0d47a1,#1565c0);color:rgba(255,255,255,.82);font-size:.74rem;padding:7px 0;}
.tb-in{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;}
.tb a{color:rgba(255,255,255,.72);text-decoration:none;transition:color .2s;}
.tb a:hover{color:#fff;}
.tb-sep{color:rgba(255,255,255,.25);margin:0 4px;}
/* NAVBAR */
.nav{position:sticky;top:0;z-index:100;background:var(--w);border-bottom:1px solid var(--b);box-shadow:var(--sh);}
.nav-in{max-width:1200px;margin:0 auto;padding:0 28px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px;}
.logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex-shrink:0;}
.logo-sq{width:38px;height:38px;background:linear-gradient(135deg,var(--v),var(--gr));border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.9rem;flex-shrink:0;}
.logo-t .n1{font-size:.86rem;font-weight:700;color:var(--k);display:block;line-height:1.2;}
.logo-t .n2{font-size:.58rem;font-weight:600;color:var(--gr2);letter-spacing:.1em;text-transform:uppercase;}
.nav-links{display:flex;align-items:center;gap:2px;}
.nav-links button{background:none;border:none;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:500;color:var(--g1);padding:6px 11px;border-radius:6px;cursor:pointer;transition:all .2s;white-space:nowrap;}
.nav-links button:hover{background:var(--fond);color:var(--v);}
.nav-links button.on{color:var(--v);font-weight:700;background:rgba(26,92,50,.09);}
.nav-r{display:flex;align-items:center;gap:8px;}
.btn-dv{background:var(--v);color:#fff;border:none;padding:8px 18px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.8rem;font-weight:600;cursor:pointer;transition:background .2s;}
.btn-dv:hover{background:var(--v2);}
.cart-btn{background:none;border:1px solid var(--b);padding:8px 13px;border-radius:7px;cursor:pointer;font-size:.88rem;position:relative;transition:border-color .2s;}
.cart-btn:hover{border-color:var(--v);}
.cbadge{position:absolute;top:-6px;right:-6px;background:var(--r);color:#fff;border-radius:50%;width:16px;height:16px;font-size:.58rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
.burger{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:5px;}
.burger span{display:block;width:22px;height:2px;background:var(--k);border-radius:2px;transition:transform .3s,opacity .3s;}
.burger.on span:first-child{transform:translateY(7px) rotate(45deg);}
.burger.on span:nth-child(2){opacity:0;}
.burger.on span:last-child{transform:translateY(-7px) rotate(-45deg);}
.mob{background:var(--w);border-top:1px solid var(--b);overflow:hidden;max-height:0;transition:max-height .35s var(--T);}
.mob.on{max-height:480px;}
.mob nav{display:flex;flex-direction:column;}
.mob button{background:none;border:none;font-family:'Inter',sans-serif;font-size:.9rem;font-weight:500;color:var(--k);text-align:left;padding:13px 24px;cursor:pointer;border-bottom:1px solid var(--b);transition:background .2s;}
.mob button:hover,.mob button.on{background:rgba(26,92,50,.07);color:var(--v);}
.mob .mob-cta{background:var(--v);color:#fff;text-align:center!important;font-weight:600;margin:10px 20px;border-radius:7px;border-bottom:none;}
/* TICKER */
.tkr{background:linear-gradient(135deg,var(--gr2),var(--gr));overflow:hidden;padding:8px 0;}
.tkr-t{display:flex;gap:52px;animation:slid 30s linear infinite;width:max-content;}
.tkr-i{font-size:.67rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75);white-space:nowrap;}
@keyframes slid{from{transform:translateX(0)}to{transform:translateX(-50%)}}
/* HERO */
.hero{background:var(--w);border-bottom:1px solid var(--b);}
.hero-in{max-width:1200px;margin:0 auto;padding:60px 28px 68px;display:grid;grid-template-columns:1fr 400px;gap:64px;align-items:center;}
.h-tag{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(92,184,0,.3);background:rgba(92,184,0,.08);padding:5px 13px;border-radius:4px;font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gr2);margin-bottom:18px;}
.h-tag span{width:6px;height:6px;background:var(--gr);border-radius:50%;animation:bl 2s infinite;}
@keyframes bl{0%,100%{opacity:1}50%{opacity:.3}}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,3.2rem);font-weight:700;line-height:1.12;color:var(--k);margin-bottom:14px;}
.hero h1 em{color:var(--v);font-style:italic;}
.hero h1 .r{color:var(--gr);}
.h-desc{font-size:.9rem;color:var(--g1);line-height:1.8;max-width:460px;margin-bottom:24px;}
.h-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px;}
.btn-p{background:var(--v);color:#fff;border:none;padding:12px 26px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.84rem;font-weight:600;cursor:pointer;transition:background .2s,box-shadow .2s;}
.btn-p:hover{background:var(--v2);box-shadow:0 5px 18px rgba(26,92,50,.28);}
.btn-o{background:transparent;color:var(--v);border:1.5px solid var(--v);padding:12px 26px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.84rem;font-weight:600;cursor:pointer;transition:all .2s;}
.btn-o:hover{background:rgba(26,92,50,.07);}
.h-stats{display:flex;gap:28px;padding-top:20px;border-top:1px solid var(--b);}
.hs-n{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:700;color:var(--v);line-height:1;}
.hs-l{font-size:.65rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--g2);margin-top:3px;}
.h-right{display:flex;flex-direction:column;gap:10px;}
.hcard{background:var(--fond);border:1px solid var(--b);border-radius:9px;padding:16px 18px;cursor:pointer;transition:border-color .2s,box-shadow .2s,transform .2s;display:flex;align-items:center;gap:14px;}
.hcard:hover{border-color:var(--v3);box-shadow:var(--sh);transform:translateX(4px);}
.hct{font-size:.65rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--g2);}
.hcn{font-size:.9rem;font-weight:600;color:var(--k);}
.harr{margin-left:auto;color:var(--g3);font-size:1rem;transition:transform .2s,color .2s;}
.hcard:hover .harr{transform:translateX(4px);color:var(--v);}
/* RUBRIQUES */
.rubs{padding:56px 28px;}
.rubs-in{max-width:1200px;margin:0 auto;}
.slbl{font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--v);margin-bottom:8px;}
.stitle{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,2.3vw,2rem);font-weight:700;color:var(--k);margin-bottom:6px;}
.stitle em{color:var(--v);font-style:italic;}
.ssub{font-size:.86rem;color:var(--g1);line-height:1.7;max-width:500px;margin-bottom:36px;}
.rub-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.rcard{background:var(--w);border:1px solid var(--b);border-radius:10px;padding:24px 20px;cursor:pointer;transition:border-color .25s,box-shadow .25s,transform .25s;position:relative;overflow:hidden;}
.rcard::before{content:'';position:absolute;bottom:0;left:0;width:100%;height:3px;transform:scaleX(0);transition:transform .3s var(--T);transform-origin:left;}
.rcard:hover{box-shadow:0 7px 24px rgba(26,92,50,.1);transform:translateY(-3px);}
.rcard:hover::before{transform:scaleX(1);}
.rcard h3{font-size:.95rem;font-weight:700;color:var(--k);margin-bottom:7px;margin-top:14px;}
.rcard p{font-size:.75rem;color:var(--g1);line-height:1.6;margin-bottom:12px;}
.rcnt{font-size:.65rem;font-weight:600;padding:2px 9px;border-radius:4px;display:inline-block;}
/* BANDE CHIFFRES */
.bch{background:linear-gradient(135deg,var(--v2),var(--v));padding:44px 28px;}
.bch-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:28px;text-align:center;}
.bcn{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;color:#fff;}
.bcl{font-size:.68rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.58);margin-top:5px;}
/* AVANTAGES */
.av{background:var(--s);border-top:1px solid var(--b);border-bottom:1px solid var(--b);padding:48px 28px;}
.av-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
.av-it{text-align:center;}
.av-i{font-size:1.7rem;margin-bottom:9px;}
.av-t{font-size:.88rem;font-weight:700;color:var(--k);margin-bottom:4px;}
.av-d{font-size:.75rem;color:var(--g1);line-height:1.6;}
/* PAGE HEADER */
.ph{background:linear-gradient(135deg,var(--v2),var(--v));padding:36px 28px 32px;}
.ph-in{max-width:1200px;margin:0 auto;display:flex;align-items:flex-start;gap:14px;}
.ph-bk{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;width:34px;height:34px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.95rem;transition:background .2s;flex-shrink:0;margin-top:3px;}
.ph-bk:hover{background:rgba(255,255,255,.2);}
.ph-cat{font-size:.65rem;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.48);margin-bottom:7px;}
.ph-title{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,2.6vw,2.2rem);font-weight:700;color:#fff;margin-bottom:7px;line-height:1.15;}
.ph-title em{font-style:italic;color:rgba(255,255,255,.75);}
.ph-sub{font-size:.82rem;color:rgba(255,255,255,.58);line-height:1.7;max-width:560px;}
/* PAGE BODY */
.pbody{max-width:1200px;margin:0 auto;padding:44px 28px 68px;}
/* GROUPES */
.grp{margin-bottom:48px;}
.grp-hd{display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:11px;border-bottom:1px solid var(--b);}
.grp-hd h2{font-size:.95rem;font-weight:700;color:var(--k);}
.gpill{background:rgba(26,92,50,.1);color:var(--v);font-size:.63rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:2px 9px;border-radius:4px;}
/* GRILLES */
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.gsvc{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
/* CARTE PRODUIT */
.pc{background:var(--w);border:1px solid var(--b);border-radius:9px;overflow:hidden;transition:border-color .22s,box-shadow .22s,transform .22s;}
.pc:hover{border-color:var(--v3);box-shadow:0 7px 24px rgba(0,0,0,.09);transform:translateY(-3px);}
.pc-img{height:150px;position:relative;overflow:hidden;background:var(--fond);}
.pc-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s var(--T);}
.pc:hover .pc-img img{transform:scale(1.06);}
.pc-ov{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.08) 0%,rgba(0,0,0,.38) 100%);}
.pc-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2.6rem;}
.pbadge{position:absolute;top:9px;left:9px;font-size:.56rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:2px 8px;border-radius:4px;z-index:1;}
.bd-r{background:rgba(26,92,50,.88);color:#fff;}
.bd-m{background:rgba(21,101,192,.88);color:#fff;}
.bd-n{background:rgba(94,53,177,.88);color:#fff;}
.pc-body{padding:14px 16px 18px;}
.pc-grp{font-size:.6rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--v);margin-bottom:4px;}
.pc-nom{font-size:.92rem;font-weight:700;color:var(--k);margin-bottom:5px;line-height:1.32;}
.pc-desc{font-size:.75rem;color:var(--g1);line-height:1.68;margin-bottom:14px;}
.pc-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:7px;}
.pc-px{font-size:.9rem;font-weight:700;color:var(--v);line-height:1;}
.pc-u{font-size:.6rem;color:var(--g2);margin-top:2px;}
.btn-add{border:none;padding:7px 14px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.72rem;font-weight:600;cursor:pointer;transition:all .18s;white-space:nowrap;flex-shrink:0;}
.ba-g{background:var(--v);color:#fff;}.ba-g:hover{background:var(--v2);}
.ba-b{background:#1565c0;color:#fff;}.ba-b:hover{background:#0d47a1;}
.ba-r{background:var(--r);color:#fff;}.ba-r:hover{background:#922818;}
/* SERVICE */
.sc{background:var(--w);border:1px solid var(--b);border-radius:9px;padding:24px 20px;display:flex;flex-direction:column;transition:border-color .22s,box-shadow .22s,transform .22s;}
.sc:hover{border-color:var(--v3);box-shadow:0 7px 24px rgba(26,92,50,.09);transform:translateY(-3px);}
.sc-ico{font-size:1.9rem;margin-bottom:12px;}
.sc-tag{display:inline-block;font-size:.58rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;padding:2px 8px;border-radius:4px;margin-bottom:10px;}
.st-i{background:#fdf3e7;color:#92400e;border:1px solid #f5d6a0;}
.st-a{background:#e6f2ea;color:var(--v);border:1px solid #b8d8c4;}
.sc-nom{font-size:.95rem;font-weight:700;color:var(--k);margin-bottom:7px;line-height:1.32;}
.sc-desc{font-size:.76rem;color:var(--g1);line-height:1.72;margin-bottom:16px;flex:1;}
.sc-feats{list-style:none;margin-bottom:18px;}
.sc-feats li{font-size:.73rem;color:var(--g1);padding:3px 0 3px 18px;position:relative;border-bottom:1px solid var(--b);}
.sc-feats li:last-child{border-bottom:none;}
.sc-feats li::before{content:'✓';position:absolute;left:0;color:var(--v);font-weight:700;}
.btn-dvc{width:100%;background:transparent;color:var(--v);border:1.5px solid var(--v);padding:10px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.76rem;font-weight:600;cursor:pointer;transition:background .2s,color .2s;}
.btn-dvc:hover{background:var(--v);color:#fff;}
/* FORMULATION TABS */
.ftabs{display:flex;gap:4px;margin-bottom:28px;background:var(--s);padding:4px;border-radius:8px;width:fit-content;}
.ftab{background:transparent;border:none;padding:8px 18px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.78rem;font-weight:500;color:var(--g1);cursor:pointer;transition:all .2s;}
.ftab:hover{color:var(--v);}
.ftab.on{background:var(--w);color:var(--v);font-weight:700;box-shadow:var(--sh);}
/* CONTACT FORM — CRITIQUE */
.cw{max-width:620px;margin:0 auto;}
.ci-intro{margin-bottom:28px;}
.ci-intro h2{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:700;color:var(--k);margin-bottom:7px;}
.ci-intro h2 em{color:var(--v);font-style:italic;}
.ci-intro p{font-size:.86rem;color:var(--g1);line-height:1.7;}
.form-wrap{background:var(--w);border:1.5px solid var(--b);border-radius:12px;padding:32px;box-shadow:var(--sh);position:relative;z-index:1;}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
.frow.full{grid-template-columns:1fr;}
.fg{display:flex;flex-direction:column;gap:5px;}
.fg label{font-size:.7rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--g1);display:block;}
/* INPUTS CRITIQUES - z-index et pointer-events explicites */
.fg input,
.fg textarea,
.fg select{
  display:block;
  width:100%;
  padding:11px 14px;
  font-family:'Inter',sans-serif;
  font-size:.88rem;
  line-height:1.5;
  color:var(--k);
  background-color:#ffffff;
  border:1.5px solid var(--b);
  border-radius:8px;
  outline:none;
  box-shadow:none;
  cursor:text;
  transition:border-color .2s,box-shadow .2s;
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
  position:static;
  z-index:auto;
  pointer-events:auto;
  user-select:text;
  -webkit-user-select:text;
}
.fg input:focus,
.fg textarea:focus,
.fg select:focus{
  border-color:var(--v);
  box-shadow:0 0 0 3px rgba(26,92,50,.1);
  outline:none;
}
.fg input::placeholder,
.fg textarea::placeholder{color:#aab8b2;font-size:.84rem;}
.fg textarea{resize:vertical;min-height:100px;line-height:1.6;cursor:text;}
.fg select{cursor:pointer;}
.ferr{background:#fdf2f2;border:1px solid #f5c6c6;color:#922818;font-size:.78rem;padding:10px 14px;border-radius:7px;margin-bottom:12px;display:flex;align-items:flex-start;gap:8px;}
.ferr::before{content:'⚠️';flex-shrink:0;}
.fsuccess{background:#f0f9f4;border:1px solid #b8d8c4;color:#1a5c32;font-size:.78rem;padding:10px 14px;border-radius:7px;margin-bottom:12px;}
.btn-send{width:100%;background:var(--v);color:#fff;border:none;padding:13px;border-radius:8px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:700;cursor:pointer;transition:background .2s,box-shadow .2s;margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px;}
.btn-send:hover:not(:disabled){background:var(--v2);box-shadow:0 5px 18px rgba(26,92,50,.28);}
.btn-send:disabled{opacity:.55;cursor:not-allowed;}
.fnote{text-align:center;font-size:.68rem;color:var(--g2);margin-top:9px;}
.fok{text-align:center;padding:44px 16px;}
.fok-i{font-size:2.8rem;margin-bottom:14px;}
.fok-t{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:var(--v);margin-bottom:7px;}
.fok-s{font-size:.84rem;color:var(--g1);line-height:1.7;}
.c-alt{margin-top:20px;padding:18px;background:var(--fond);border:1px solid var(--b);border-radius:9px;display:flex;flex-wrap:wrap;gap:14px;justify-content:center;}
.ca{display:flex;align-items:center;gap:7px;font-size:.8rem;color:var(--g1);}
.ca a{color:var(--v);text-decoration:none;font-weight:600;}
.ca a:hover{text-decoration:underline;}
/* PANIER */
.ov{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;opacity:0;pointer-events:none;transition:opacity .3s;}
.ov.on{opacity:1;pointer-events:all;}
.cart{position:fixed;top:0;right:-480px;width:440px;max-width:100vw;height:100dvh;background:var(--w);z-index:301;display:flex;flex-direction:column;transition:right .4s var(--T);box-shadow:-6px 0 36px rgba(0,0,0,.12);}
.cart.on{right:0;}
.c-hd{padding:18px 22px;border-bottom:1px solid var(--b);display:flex;justify-content:space-between;align-items:center;}
.c-hd h2{font-size:1.05rem;font-weight:700;}
.c-x{background:none;border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:1rem;color:var(--g2);display:flex;align-items:center;justify-content:center;transition:all .2s;}
.c-x:hover{background:rgba(176,48,32,.08);color:var(--r);}
.c-body{flex:1;overflow-y:auto;padding:14px 22px;display:flex;flex-direction:column;gap:12px;}
.c-empty{text-align:center;color:var(--g2);padding:56px 0;font-size:.84rem;}
.ci{display:flex;gap:11px;padding-bottom:12px;border-bottom:1px solid var(--b);align-items:flex-start;}
.ci-ico{width:42px;height:42px;background:var(--fond);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
.ci-inf{flex:1;min-width:0;}
.ci-nom{font-size:.85rem;font-weight:600;margin-bottom:2px;line-height:1.3;}
.ci-px{font-size:.73rem;color:var(--v);font-weight:600;}
.ci-rm{background:none;border:none;cursor:pointer;color:var(--g2);font-size:.85rem;padding:4px;flex-shrink:0;transition:color .2s;}
.ci-rm:hover{color:var(--r);}
.c-ft{padding:14px 22px;border-top:1px solid var(--b);background:var(--fond);}
.c-tot{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
.c-tot-l{font-size:.7rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--g2);}
.c-tot-p{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:var(--v);}
.btn-pay{width:100%;background:var(--v);color:#fff;border:none;padding:13px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.86rem;font-weight:700;cursor:pointer;transition:background .2s;}
.btn-pay:hover{background:var(--v2);}
.btn-pay:disabled{opacity:.5;cursor:not-allowed;}
.pay-n{text-align:center;font-size:.63rem;color:var(--g2);margin-top:7px;}
/* TOAST */
.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%) translateY(60px);background:var(--k);color:#fff;padding:10px 18px;font-size:.78rem;font-weight:500;z-index:500;border-radius:7px;opacity:0;transition:transform .32s var(--T),opacity .32s;white-space:nowrap;box-shadow:0 5px 20px rgba(0,0,0,.28);max-width:92vw;border-left:3px solid var(--v);}
.toast.on{transform:translateX(-50%) translateY(0);opacity:1;}
/* WHATSAPP */
.wa{position:fixed;bottom:92px;left:22px;z-index:200;width:50px;height:50px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 3px 14px rgba(37,211,102,.42);display:flex;align-items:center;justify-content:center;text-decoration:none;transition:transform .2s;}
.wa:hover{transform:scale(1.08);}
.wa svg{width:24px;height:24px;fill:#fff;}
/* AI */
.ai-fab{position:fixed;bottom:26px;right:22px;z-index:200;width:50px;height:50px;border-radius:50%;background:var(--v);border:none;color:#fff;font-size:1.3rem;cursor:pointer;box-shadow:0 3px 16px rgba(26,92,50,.42);display:flex;align-items:center;justify-content:center;transition:transform .2s;}
.ai-fab:hover{transform:scale(1.08);}
.ai-dot{position:absolute;top:-2px;right:-2px;width:12px;height:12px;background:var(--r);border-radius:50%;border:2px solid var(--fond);}
.ai-win{position:fixed;bottom:88px;right:22px;z-index:200;width:350px;max-width:calc(100vw - 28px);height:500px;max-height:calc(100dvh - 108px);background:var(--w);border-radius:13px;border:1px solid var(--b);box-shadow:0 18px 56px rgba(0,0,0,.14);display:flex;flex-direction:column;transform:scale(.9) translateY(16px);opacity:0;pointer-events:none;transition:transform .3s var(--T),opacity .28s;overflow:hidden;}
.ai-win.on{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
.ai-hd{padding:13px 15px;background:linear-gradient(135deg,var(--v),var(--gr2));display:flex;align-items:center;gap:9px;flex-shrink:0;}
.ai-av{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.ai-nm{font-size:.88rem;font-weight:700;color:#fff;}
.ai-st{font-size:.63rem;color:rgba(255,255,255,.7);display:flex;align-items:center;gap:4px;}
.ai-st::before{content:'';width:5px;height:5px;background:#5ddb8a;border-radius:50%;}
.ai-cx{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.65);font-size:.95rem;margin-left:auto;padding:3px;transition:color .2s;}
.ai-cx:hover{color:#fff;}
.ai-msgs{flex:1;overflow-y:auto;padding:13px;display:flex;flex-direction:column;gap:9px;}
.ai-msgs::-webkit-scrollbar{width:3px;}
.ai-msgs::-webkit-scrollbar-thumb{background:var(--b);}
.ai-m{display:flex;gap:6px;}
.ai-m.u{flex-direction:row-reverse;}
.ai-mav{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.7rem;flex-shrink:0;margin-top:1px;}
.ai-m.b .ai-mav{background:var(--v);color:#fff;}
.ai-m.u .ai-mav{background:var(--s);}
.ai-mb{max-width:82%;padding:8px 11px;border-radius:11px;font-size:.76rem;line-height:1.62;}
.ai-m.b .ai-mb{background:var(--fond);color:var(--k);border-bottom-left-radius:3px;}
.ai-m.u .ai-mb{background:var(--v);color:#fff;border-bottom-right-radius:3px;}
.typ{display:flex;gap:3px;padding:9px 11px;background:var(--fond);border-radius:11px;width:fit-content;}
.typ span{width:5px;height:5px;background:var(--g2);border-radius:50%;animation:bp 1.4s infinite;}
.typ span:nth-child(2){animation-delay:.2s;}
.typ span:nth-child(3){animation-delay:.4s;}
@keyframes bp{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
.ai-sugs{padding:0 9px 7px;display:flex;flex-wrap:wrap;gap:5px;}
.sug{background:var(--fond);border:1px solid var(--b);color:var(--v);padding:4px 9px;border-radius:4px;font-family:'Inter',sans-serif;font-size:.66rem;font-weight:500;cursor:pointer;transition:all .18s;}
.sug:hover{background:var(--v);color:#fff;border-color:var(--v);}
.ai-ir{padding:9px;border-top:1px solid var(--b);display:flex;gap:6px;background:#fff;flex-shrink:0;}
.ai-inp{flex:1;border:1px solid var(--b);border-radius:7px;padding:8px 11px;font-family:'Inter',sans-serif;font-size:.8rem;outline:none;transition:border-color .2s;resize:none;max-height:68px;background:#fff;color:var(--k);}
.ai-inp:focus{border-color:var(--v);}
.ai-snd{background:var(--v);color:#fff;border:none;width:32px;height:32px;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;align-self:flex-end;transition:background .2s;}
.ai-snd:hover{background:var(--v2);}
.ai-snd:disabled{opacity:.5;cursor:not-allowed;}
/* FOOTER */
footer{background:linear-gradient(135deg,#0a1628,#0d2240);color:#fff;}
.fi-in{max-width:1200px;margin:0 auto;padding:52px 28px 24px;}
.fi-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;margin-bottom:36px;}
.fb-n{font-size:1.05rem;font-weight:700;margin-bottom:11px;}
.fb-n span{color:var(--gr3);}
.fb-desc{font-size:.75rem;color:rgba(255,255,255,.48);line-height:1.8;margin-bottom:13px;}
.fb-ct{display:flex;flex-direction:column;gap:6px;}
.fb-ct a{font-size:.75rem;color:rgba(255,255,255,.52);text-decoration:none;transition:color .2s;display:flex;align-items:center;gap:5px;}
.fb-ct a:hover{color:#4caf78;}
.fc h4{font-size:.62rem;text-transform:uppercase;letter-spacing:.14em;color:#4caf78;margin-bottom:12px;font-weight:600;}
.fc ul{list-style:none;display:flex;flex-direction:column;gap:8px;}
.fc li{font-size:.77rem;color:rgba(255,255,255,.46);cursor:pointer;transition:color .2s;}
.fc li:hover{color:#4caf78;}
.fi-bot{border-top:1px solid rgba(255,255,255,.09);padding-top:18px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:9px;}
.fi-bot span{font-size:.66rem;color:rgba(255,255,255,.32);}
/* ADMIN */
.adm-body{min-height:100vh;background:#f0f2f5;font-family:'Inter',sans-serif;}
.adm-login{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0a1628,#1565c0);}
.adm-box{background:#fff;border-radius:14px;padding:36px;width:340px;max-width:90vw;box-shadow:0 18px 56px rgba(0,0,0,.28);}
.adm-logo{text-align:center;margin-bottom:24px;}
.adm-logo .sq{width:48px;height:48px;background:linear-gradient(135deg,#1565c0,#5cb800);border-radius:11px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.1rem;margin:0 auto 10px;}
.adm-logo h1{font-size:1rem;font-weight:700;color:#12201a;}
.adm-logo p{font-size:.74rem;color:#6b7c70;margin-top:3px;}
.adm-box label{font-size:.7rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#6b7c70;display:block;margin-bottom:5px;}
.adm-box input{width:100%;border:1.5px solid #d8e4dc;border-radius:7px;padding:10px 13px;font-family:'Inter',sans-serif;font-size:.9rem;outline:none;margin-bottom:14px;transition:border-color .2s;color:#12201a;background:#fff;}
.adm-box input:focus{border-color:#1a5c32;}
.adm-login-btn{width:100%;background:#1a5c32;color:#fff;border:none;padding:12px;border-radius:7px;font-family:'Inter',sans-serif;font-size:.88rem;font-weight:700;cursor:pointer;transition:background .2s;}
.adm-login-btn:hover{background:#236b3b;}
.adm-err{background:#fdf2f2;border:1px solid #f5c6c6;color:#922818;font-size:.76rem;padding:8px 11px;border-radius:6px;margin-bottom:11px;text-align:center;}
.adm-top{background:#12201a;color:#fff;padding:0 22px;height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50;}
.adm-tl{display:flex;align-items:center;gap:9px;}
.adm-tl .sq{width:30px;height:30px;background:#1a5c32;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.78rem;}
.adm-tl span{font-size:.86rem;font-weight:600;}
.adm-tr{display:flex;align-items:center;gap:11px;}
.adm-tr a{font-size:.75rem;color:rgba(255,255,255,.58);text-decoration:none;transition:color .2s;}
.adm-tr a:hover{color:#fff;}
.adm-out{background:rgba(255,255,255,.1);border:none;color:rgba(255,255,255,.68);padding:5px 13px;border-radius:5px;font-family:'Inter',sans-serif;font-size:.75rem;cursor:pointer;transition:all .2s;}
.adm-out:hover{background:rgba(255,255,255,.18);color:#fff;}
.adm-lay{display:flex;min-height:calc(100vh - 54px);}
.adm-side{width:210px;background:#fff;border-right:1px solid #e0e8e2;padding:18px 0;flex-shrink:0;}
.adm-ni{display:flex;align-items:center;gap:9px;padding:10px 18px;font-size:.82rem;font-weight:500;color:#4a5c52;cursor:pointer;transition:all .2s;border-left:3px solid transparent;}
.adm-ni:hover{background:#f0f2f5;color:#1a5c32;}
.adm-ni.on{background:#e6f2ea;color:#1a5c32;font-weight:700;border-left-color:#1a5c32;}
.adm-ni .ni{font-size:.95rem;width:18px;text-align:center;}
.adm-cnt{flex:1;padding:24px;overflow-y:auto;}
.adm-card{background:#fff;border:1px solid #e0e8e2;border-radius:9px;padding:22px;margin-bottom:18px;}
.adm-card-t{font-size:.86rem;font-weight:700;color:#12201a;margin-bottom:14px;padding-bottom:9px;border-bottom:1px solid #e0e8e2;}
.adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
.adm-stat{background:#fff;border:1px solid #e0e8e2;border-radius:9px;padding:18px;text-align:center;}
.adm-stat-n{font-size:1.7rem;font-weight:700;color:#1a5c32;line-height:1;}
.adm-stat-l{font-size:.7rem;color:#6b7c70;margin-top:4px;font-weight:500;}
.adm-promo-box{background:#fff;border:1px solid #e0e8e2;border-radius:9px;padding:22px;margin-bottom:18px;}
.adm-tog{display:flex;align-items:center;gap:11px;margin-bottom:14px;}
.adm-tog input[type="checkbox"]{width:40px;height:22px;appearance:none;background:#d8e4dc;border-radius:11px;cursor:pointer;transition:background .2s;position:relative;flex-shrink:0;}
.adm-tog input[type="checkbox"]::after{content:'';position:absolute;width:16px;height:16px;background:#fff;border-radius:50%;top:3px;left:3px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2);}
.adm-tog input[type="checkbox"]:checked{background:#1a5c32;}
.adm-tog input[type="checkbox"]:checked::after{left:21px;}
.adm-tog label{font-size:.86rem;font-weight:600;color:#12201a;cursor:pointer;}
.adm-f{margin-bottom:13px;}
.adm-f label{font-size:.68rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#6b7c70;display:block;margin-bottom:4px;}
.adm-f input,.adm-f textarea,.adm-f select{width:100%;border:1.5px solid #d8e4dc;border-radius:6px;padding:8px 11px;font-family:'Inter',sans-serif;font-size:.83rem;color:#12201a;background:#fff;outline:none;transition:border-color .2s;}
.adm-f input:focus,.adm-f textarea:focus{border-color:#1a5c32;}
.adm-f textarea{resize:vertical;min-height:72px;}
.adm-btn{border:none;padding:8px 16px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.76rem;font-weight:600;cursor:pointer;transition:all .18s;}
.adm-bg{background:#1a5c32;color:#fff;}.adm-bg:hover{background:#236b3b;}
.adm-br{background:#b03020;color:#fff;}.adm-br:hover{background:#922818;}
.adm-bw{background:#fff;color:#4a5c52;border:1px solid #d8e4dc;}.adm-bw:hover{border-color:#1a5c32;color:#1a5c32;}
.adm-pl{display:flex;flex-direction:column;gap:7px;}
.adm-pi{display:flex;align-items:center;gap:11px;padding:11px 13px;border:1px solid #e0e8e2;border-radius:7px;cursor:pointer;transition:all .18s;background:#fff;}
.adm-pi:hover{border-color:#1a5c32;background:#f8fbf9;}
.adm-pi.ed{border-color:#1a5c32;background:#e6f2ea;}
.adm-pn{flex:1;font-size:.82rem;font-weight:600;color:#12201a;}
.adm-pp{font-size:.76rem;color:#1a5c32;font-weight:600;white-space:nowrap;}
.adm-pg{font-size:.62rem;color:#6b7c70;margin-top:2px;}
.adm-ep{background:#f8fbf9;border:1px solid #b8d8c4;border-radius:7px;padding:14px;margin-top:7px;margin-bottom:7px;}
.adm-tabs{display:flex;gap:4px;margin-bottom:18px;flex-wrap:wrap;}
.adm-tab{background:transparent;border:none;padding:7px 14px;border-radius:6px;font-family:'Inter',sans-serif;font-size:.76rem;font-weight:500;color:#6b7c70;cursor:pointer;transition:all .18s;}
.adm-tab.on{background:#e6f2ea;color:#1a5c32;font-weight:700;}
.adm-bmod{display:inline-block;width:6px;height:6px;background:#e65100;border-radius:50%;margin-left:4px;vertical-align:middle;}
.adm-prev{background:#1a5c32;color:#fff;padding:8px;text-align:center;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;border-radius:6px;margin-top:10px;}
.adm-sb{background:#fff;border-top:1px solid #e0e8e2;padding:13px 24px;display:flex;align-items:center;justify-content:space-between;position:sticky;bottom:0;}
.adm-sb span{font-size:.76rem;color:#6b7c70;}
.adm-sv{color:#5ddb8a;font-size:.76rem;font-weight:700;}
@media(max-width:1024px){.nav-links,.nav-r .btn-dv{display:none;}.burger{display:flex;}.hero-in{grid-template-columns:1fr;padding:44px 20px 52px;gap:36px;}.rub-grid{grid-template-columns:repeat(2,1fr);}.bch-in{grid-template-columns:repeat(2,1fr);padding:36px 20px;}.g3,.g4{grid-template-columns:repeat(2,1fr);}.gsvc{grid-template-columns:1fr;}.av-in{grid-template-columns:repeat(2,1fr);}.fi-grid{grid-template-columns:1fr 1fr;gap:28px;}.ph{padding:28px 20px 24px;}.pbody{padding:36px 20px 52px;}.rubs{padding:44px 20px;}.cart{width:100%;right:-100%;}.adm-stats{grid-template-columns:1fr 1fr;}.adm-side{display:none;}.adm-cnt{padding:14px;}}
@media(max-width:600px){.nav-in{padding:0 14px;}.tb-in{padding:0 14px;}.hero h1{font-size:1.9rem;}.h-btns{flex-direction:column;}.btn-p,.btn-o{width:100%;text-align:center;}.h-right{display:grid;grid-template-columns:1fr 1fr;gap:8px;}.hcard{flex-direction:column;align-items:flex-start;gap:6px;padding:12px 14px;}.harr{display:none;}.rub-grid{grid-template-columns:1fr 1fr;}.g3,.g4{grid-template-columns:1fr;}.gsvc{grid-template-columns:1fr;}.bch-in{grid-template-columns:1fr 1fr;}.av-in{grid-template-columns:1fr 1fr;}.fi-grid{grid-template-columns:1fr;gap:24px;}.frow{grid-template-columns:1fr;}.form-wrap{padding:20px 14px;}.ftabs{flex-direction:column;width:100%;}.ai-win{right:10px;width:calc(100vw - 20px);height:calc(100dvh - 106px);}}
`;

/* ══ DATA ══ */
const CHIM=[{id:1,grp:"Coagulants",nom:"PAC — Poly Aluminium Chlorure",desc:"Coagulant liquide haute performance. Efficace sur large plage de pH. Réduction turbidité et MES.",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=300&q=75"},{id:2,grp:"Coagulants",nom:"Chlorure Ferrique",desc:"Coagulant minéral puissant pour eaux industrielles et boues.",img:"https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=600&h=300&q=75"},{id:3,grp:"Coagulants",nom:"Sulfate d'Aluminium",desc:"Coagulant classique pour eau potable et eaux résiduaires. Soluble, facile à doser.",img:"https://images.unsplash.com/photo-1581093196867-ca4e0b8c4f63?auto=format&fit=crop&w=600&h=300&q=75"},{id:4,grp:"Floculants",nom:"Floculant Anionique",desc:"Polyacrylamide anionique pour clarification des eaux chargées.",img:"https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&h=300&q=75"},{id:5,grp:"Floculants",nom:"Floculant Cationique",desc:"Polyacrylamide cationique pour conditionnement des boues et flottation.",img:"https://images.unsplash.com/photo-1616163235154-b8efb32c9b7e?auto=format&fit=crop&w=600&h=300&q=75"},{id:6,grp:"Correction pH",nom:"Stabilisant de pH",desc:"Maintient le pH dans la plage optimale de traitement.",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&h=300&q=75"},{id:7,grp:"Correction pH",nom:"Correcteur de pH",desc:"Correction acide ou basique du pH des effluents. Prêt à l'emploi.",img:"https://images.unsplash.com/photo-1518152006978-fef17ef50b68?auto=format&fit=crop&w=600&h=300&q=75"},{id:8,grp:"Désinfection & Traitement",nom:"Hypochlorite de Sodium",desc:"Désinfectant oxydant puissant. Élimine bactéries et virus.",img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=300&q=75"},{id:9,grp:"Désinfection & Traitement",nom:"Antimousse",desc:"Élimine et prévient les mousses dans les bassins et STEP.",img:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=300&q=75"},{id:10,grp:"Désinfection & Traitement",nom:"Décolorant",desc:"Élimination des colorants et pigments dans les effluents textiles.",img:"https://images.unsplash.com/photo-1562977352-f8fc96e5a6ff?auto=format&fit=crop&w=600&h=300&q=75"},{id:11,grp:"Désinfection & Traitement",nom:"Peroxyde d'Hydrogène",desc:"Oxydant puissant. Élimine DCO, H₂S et composés organiques.",img:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&h=300&q=75"},{id:12,grp:"Osmose Inverse",nom:"Anti-Scalant",desc:"Prévient l'entartrage des membranes OI. Protège contre carbonates et silice.",img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=300&q=75"},{id:13,grp:"Osmose Inverse",nom:"Lavage Membranes — Acide",desc:"Nettoyage acide des membranes OI. Dissout tartre et oxydes.",img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=300&q=75"},{id:14,grp:"Osmose Inverse",nom:"Lavage Membranes — Basique",desc:"Nettoyage alcalin des membranes OI. Élimine biofilm et matière organique.",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=300&q=75"},{id:15,grp:"Osmose Inverse",nom:"Biocide Non Oxydant",desc:"Contrôle microbiologique pour circuits OI.",img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=300&q=75"},{id:16,grp:"Osmose Inverse",nom:"Métabisulfite de Sodium",desc:"Neutralisant du chlore résiduel avant les membranes OI.",img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=300&q=75"},{id:17,grp:"Eaux de Chaudière",nom:"Produit de Passivation",desc:"Protège la surface interne des chaudières contre la corrosion.",img:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&h=300&q=75"},{id:18,grp:"Eaux de Chaudière",nom:"Antitartre Chaudière",desc:"Prévient les dépôts calcaires. Améliore le rendement thermique.",img:"https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&w=600&h=300&q=75"},{id:19,grp:"Eaux de Chaudière",nom:"Éliminateur d'Oxygène",desc:"Désoxygénant chimique. Élimine l'oxygène dissous.",img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=300&q=75"}];
const MAT=[{id:20,nom:"Kit Mesure de Chlore",desc:"Mesure rapide chlore libre et total. Colorimétrie DPD.",img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=300&q=75"},{id:21,nom:"Kit Mesure de Dureté",desc:"Titrimétrie EDTA pour dureté totale, calcique et magnésienne.",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&h=300&q=75"},{id:22,nom:"pH-mètre Portable",desc:"Mesure précise du pH sur terrain. Calibration automatique, IP67.",img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=300&q=75"},{id:23,nom:"Oxymètre",desc:"Mesure de l'oxygène dissous. Compensation température automatique.",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=300&q=75"},{id:24,nom:"Conductimètre",desc:"Mesure conductivité, TDS et salinité. Gamme 0–200 mS/cm.",img:"https://images.unsplash.com/photo-1518152006978-fef17ef50b68?auto=format&fit=crop&w=600&h=300&q=75"}];
const SVCS=[{id:"s1",nom:"Conception & Dimensionnement STEP",desc:"De l'avant-projet à la mise en service. Dimensionnement hydraulique et biologique complet.",ico:"🏗️",tag:"st-i",tlbl:"Service Ingénierie",feats:["APS / APD / DCE complets","Dimensionnement hydraulique et biologique","Comparaison et sélection des filières","Dossiers autorisation loi sur l'eau","Assistance maîtrise d'ouvrage (AMO)"]},{id:"s2",nom:"Optimisation des STEP Existantes",desc:"Audit technique, diagnostic et optimisation des réactifs et des performances.",ico:"⚙️",tag:"st-i",tlbl:"Service Ingénierie",feats:["Audit complet de l'installation","Bilan de fonctionnement","Optimisation des doses de réactifs","Mise en place d'indicateurs de suivi","Rapport de recommandations"]},{id:"s3",nom:"Solutions Traitement des Eaux",desc:"Choix des procédés, sourcing des réactifs, mise en route et suivi des installations.",ico:"💧",tag:"st-i",tlbl:"Service Ingénierie",feats:["Étude de faisabilité technique","Choix et dimensionnement des équipements","Formation des équipes opérateurs","Contrat de suivi mensuel disponible","Assistance technique sur site"]}];
const ANALYSES=[{id:30,nom:"Analyse Physicochimique & Bactériologique des Eaux",desc:"pH, DCO, DBO5, MES, métaux lourds, germes totaux, coliformes.",ico:"🔬",tag:"st-a",tlbl:"Analyse Certifiée",feats:["Prélèvement sur site par nos ingénieurs","Analyses physico-chimiques & biologiques","Rapport de conformité NM/ISO","Recommandations correctives","Suivi post-analyse inclus"]},{id:31,nom:"Analyse Agronomique & Pédologique des Sols",desc:"Texture, pH, matière organique, macro et microéléments.",ico:"🌍",tag:"st-a",tlbl:"Analyse Certifiée",feats:["Prélèvement et préparation échantillons","Analyse granulométrique complète","Dosage NPK & oligo-éléments","pH, CEC, matière organique","Rapport avec recommandations"]},{id:32,nom:"Bilan Environnemental & Conformité NM/ISO",desc:"Évaluation des rejets, mesure des paramètres réglementaires.",ico:"🔭",tag:"st-a",tlbl:"Analyse Certifiée",feats:["Audit terrain complet","Mesure des paramètres réglementaires","Analyse des rejets liquides et solides","Rapport de conformité NM/ISO","Plan d'action correctif"]}];
const FNUM={engrais:[{id:40,nom:"Formule Engrais Foliaires",desc:"Macro et microéléments, agents chélatants, adjuvants. Calculs de concentration inclus.",prix:"790 MAD",prixVal:790,emoji:"🌿",bg:"#e8f5e9"},{id:41,nom:"Formule Engrais de Fertigation",desc:"Formulations N-P-K pour fertigation et hydroponie. Calculateur tankmix inclus.",prix:"890 MAD",prixVal:890,emoji:"💧",bg:"#e3f2fd"},{id:42,nom:"Formule Engrais Hydrosolubles",desc:"Complexes NPK + oligo-éléments. Fiches techniques et protocoles de dissolution.",prix:"690 MAD",prixVal:690,emoji:"🧪",bg:"#f1f8e9"}],eaux:[{id:43,nom:"Formule Coagulant-Floculant Optimisé",desc:"Protocoles de dosage selon effluents. Jar-test intégré, ratios validés.",prix:"890 MAD",prixVal:890,emoji:"📄",bg:"#e8eaf6"},{id:44,nom:"Formule STEP Industrielles",desc:"Protocoles complets : physico-chimique, biologique, tertiaire.",prix:"990 MAD",prixVal:990,emoji:"🏭",bg:"#e0f7fa"},{id:45,nom:"Formule Osmose Inverse",desc:"Dosage anti-scalant, biocide et lavage membranes. Indice LSI inclus.",prix:"790 MAD",prixVal:790,emoji:"🛡️",bg:"#e8f5e9"}],nettoyage:[{id:46,nom:"Détergents Lave-Vaisselle & Vaisselle Manuelle",desc:"Industriels et domestiques : liquides, poudres, tablettes, antibactériens.",prix:"590 MAD",prixVal:590,emoji:"🍽️",bg:"#e3f2fd"},{id:47,nom:"Lessives Liquides & Poudres",desc:"Blanc/couleur, enzymatiques, sans phosphore. Détachants inclus.",prix:"590 MAD",prixVal:590,emoji:"👕",bg:"#f3e5f5"},{id:48,nom:"Agents Blanchissants & Machines",desc:"Blanchissants chlorés/oxygénés. Anticalcaires, adoucissants textiles.",prix:"490 MAD",prixVal:490,emoji:"🧺",bg:"#fff8e1"},{id:49,nom:"Nettoyants Cuisine & Multi-Usages",desc:"Désinfectants surfaces, fours, multi-usages alcalins et chlorés.",prix:"490 MAD",prixVal:490,emoji:"🍳",bg:"#fce4ec"},{id:50,nom:"Produits Sanitaires (WC, Canalisations, Douches)",desc:"Nettoyants WC acides, déboucheurs, carrelages et douches.",prix:"590 MAD",prixVal:590,emoji:"🚿",bg:"#e8f5e9"},{id:51,nom:"Hygiène des Mains & Désinfectants",desc:"Savons liquides, gels hydroalcooliques, désinfectants germicides.",prix:"490 MAD",prixVal:490,emoji:"🧴",bg:"#e8eaf6"},{id:52,nom:"Dégraissants, Antirouille & Détartrants",desc:"Dégraissants concentrés, antirouille acides/alcalins, nettoyants vitres.",prix:"590 MAD",prixVal:590,emoji:"⚙️",bg:"#fef3e2"},{id:53,nom:"Produits Sols, Tapis & Climatisation",desc:"Nettoyants sols, shampooings tapis, désinfectants climatiseurs.",prix:"490 MAD",prixVal:490,emoji:"🏠",bg:"#e0f7fa"}]};
const TICKERS=["💧 Coagulants & Floculants certifiés","⚗️ Réactifs osmose inverse & STEP","🔬 Analyses eau, sol, environnement NM/ISO","📄 Formulations numériques — accès immédiat","🏗️ +200 projets STEP au Maroc","🇲🇦 Entreprise 100% marocaine","♨️ Traitement eaux de chaudière","✓ Satisfait ou remboursé 30 jours"];
const SUGS=["Quel coagulant pour mes eaux ?","Anti-scalant osmose inverse ?","Analyse eau de puits ?","Concevoir une STEP ?","Formule détergent industriel ?"];
const SYS=`Tu es l'assistant IA expert d'Univers Environnement Maroc (UEM), El Jadida. Gammes : Réactifs chimiques (coagulants PAC/chlorure ferrique/sulfate aluminium, floculants, correction pH, hypochlorite, anti-scalant, biocide, passivation chaudière), Matériels (pH-mètre, conductimètre, oxymètre, kits chlore/dureté), Analyses (eaux NM/ISO, sols agronomiques, bilan environnemental), Services (STEP conception/optimisation/solutions), Formulations numériques (engrais foliaires/fertigation, traitement eaux, détergents/lessives/sanitaires). Tel: +212523377417. Réponds en français, concis, professionnel.`;
const RUBRIQUES=[{k:"chimiques",num:"01",color:"#1a5c32",title:"Produits Chimiques",desc:"Coagulants, floculants, désinfectants, osmose inverse, chaudière.",count:`${CHIM.length} produits`},{k:"materiels",num:"02",color:"#1565c0",title:"Matériels",desc:"Instruments de mesure pH, conductivité, oxygène dissous, chlore.",count:`${MAT.length} équipements`},{k:"services",num:"03",color:"#e65100",title:"Services",desc:"Ingénierie environnementale, analyses certifiées et STEP.",count:"6 prestations"},{k:"formulation",num:"04",color:"#4527a0",title:"Formulation",desc:"Formules numériques : engrais, eaux, nettoyage & détergents.",count:`${FNUM.engrais.length+FNUM.eaux.length+FNUM.nettoyage.length} formules`}];
const NAV=[{k:"garde",l:"Accueil"},{k:"chimiques",l:"Produits Chimiques"},{k:"materiels",l:"Matériels"},{k:"services",l:"Services"},{k:"formulation",l:"Formulation"}];
const grpBy=(arr,k)=>arr.reduce((a,i)=>{ (a[i[k]]=a[i[k]]||[]).push(i); return a; },{});
const rtx=t=>t.split(/(\*\*[^*]+\*\*)/g).map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i}>{p.slice(2,-2)}</strong>:<span key={i}>{p}</span>);

/* ══════════════════════════════════════════════════════════════════
   COMPOSANTS DE PAGE DÉFINIS EN DEHORS DE APP()
   CORRECTION CRITIQUE : évite le re-mount à chaque frappe clavier
══════════════════════════════════════════════════════════════════ */

/* CARTE PRODUIT */
function PCard({p,type,onDevis,onCart,edits}){
  const e=edits&&edits[p.id];
  return(
    <div className="pc">
      {p.img?(<div className="pc-img"><img src={p.img} alt={p.nom} loading="lazy"/><div className="pc-ov"/><span className={`pbadge ${type==="n"?"bd-n":type==="m"?"bd-m":"bd-r"}`}>{type==="n"?"Numérique":type==="m"?"Matériel":"Réactif"}</span></div>):(<div className="pc-bg" style={{background:p.bg||"#e8f5e9"}}><span>{p.emoji}</span><span className={`pbadge ${type==="n"?"bd-n":type==="m"?"bd-m":"bd-r"}`}>{type==="n"?"Numérique":type==="m"?"Matériel":"Réactif"}</span></div>)}
      <div className="pc-body">
        {p.grp&&<div className="pc-grp">{p.grp}</div>}
        <div className="pc-nom">{(e&&e.nom)||p.nom}</div>
        <div className="pc-desc">{(e&&e.desc)||p.desc}</div>
        <div className="pc-foot">
          <div><div className="pc-px">{(e&&e.prix)||p.prix||"Sur devis"}</div><div className="pc-u">/{p.unite||"unité"}</div></div>
          {type==="n"?<button className="btn-add ba-b" onClick={()=>onCart(p)}>⚡ Acheter</button>:<button className="btn-add ba-r" onClick={()=>onDevis(p.nom)}>Devis →</button>}
        </div>
      </div>
    </div>
  );
}

/* CARTE SERVICE */
function SCard({s,onDevis}){
  return(
    <div className="sc">
      <div className="sc-ico">{s.ico}</div>
      <span className={`sc-tag ${s.tag}`}>{s.tlbl}</span>
      <div className="sc-nom">{s.nom}</div>
      <div className="sc-desc">{s.desc}</div>
      {s.feats&&<ul className="sc-feats">{s.feats.map((f,i)=><li key={i}>{f}</li>)}</ul>}
      <button className="btn-dvc" onClick={()=>onDevis(s.nom)}>Demander un devis →</button>
    </div>
  );
}

/* PAGE HEADER */
function PageHdr({cat,h1,em,sub,onBack}){
  return(
    <div className="ph">
      <div className="ph-in">
        <button className="ph-bk" onClick={onBack}>←</button>
        <div>
          <div className="ph-cat">{cat}</div>
          <h1 className="ph-title">{h1}{em&&<> — <em>{em}</em></>}</h1>
          {sub&&<p className="ph-sub">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

/* PAGE GARDE */
function PageGarde({onGo}){
  return(
    <>
      <div className="hero">
        <div className="hero-in">
          <div>
            <div className="h-tag"><span/>L'Expertise Verte au Service du Maroc</div>
            <h1>Réactifs, matériel &<br/><em>ingénierie</em> pour<br/><span className="r">vos eaux</span></h1>
            <p className="h-desc">Produits chimiques certifiés · Matériel de mesure · Ingénierie environnementale · Formulations techniques — tout pour le traitement de l'eau au Maroc.</p>
            <div className="h-btns">
              <button className="btn-p" onClick={()=>onGo("chimiques")}>Explorer les produits</button>
              <button className="btn-o" onClick={()=>onGo("contact")}>Demander un devis</button>
            </div>
            <div className="h-stats">
              {[{n:"200+",l:"STEP conçues"},{n:"15 ans",l:"D'expertise"},{n:"500+",l:"Clients actifs"},{n:"98%",l:"Satisfaction"}].map((s,i)=><div key={i}><div className="hs-n">{s.n}</div><div className="hs-l">{s.l}</div></div>)}
            </div>
          </div>
          <div className="h-right">
            {[{color:"#1a5c32",cat:"Réactifs Chimiques",nom:"Coagulants · Floculants · Désinfectants",p:"chimiques"},{color:"#1565c0",cat:"Matériels de Mesure",nom:"pH-mètre · Conductimètre · Oxymètre",p:"materiels"},{color:"#e65100",cat:"Services Ingénierie",nom:"Conception STEP · Analyses · Optimisation",p:"services"},{color:"#4527a0",cat:"Formulations Numériques",nom:"Engrais · Traitement eaux · Nettoyage",p:"formulation"}].map((c,i)=>(
              <div key={i} className="hcard" onClick={()=>onGo(c.p)} style={{borderLeft:`3px solid ${c.color}`}}>
                <div><div className="hct" style={{color:c.color}}>{c.cat}</div><div className="hcn">{c.nom}</div></div>
                <span className="harr" style={{color:c.color}}>→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bch"><div className="bch-in">{[{n:"Livraison 24h",l:"Partout au Maroc"},{n:"NM / ISO",l:"Analyses certifiées"},{n:"Gratuit",l:"Hébergement Vercel"},{n:"🇲🇦",l:"100% Marocain"}].map((c,i)=><div key={i}><div className="bcn">{c.n}</div><div className="bcl">{c.l}</div></div>)}</div></div>
      <div className="rubs"><div className="rubs-in">
        <div className="slbl">Nos rubriques</div>
        <h2 className="stitle">Explorez notre <em>catalogue complet</em></h2>
        <p className="ssub">Produits chimiques, matériels, services d'ingénierie et formulations numériques.</p>
        <div className="rub-grid">
          {RUBRIQUES.map(r=>(
            <div key={r.k} className="rcard" onClick={()=>onGo(r.k)} style={{borderTop:`3px solid ${r.color}`,borderColor:r.color}}>
              <style>{`.rcard:nth-child(${RUBRIQUES.indexOf(r)+1})::before{background:${r.color};}`}</style>
              <div style={{fontSize:"1.3rem",fontWeight:700,color:r.color,fontFamily:"Inter,sans-serif",letterSpacing:"-.02em"}}>{r.num}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <span className="rcnt" style={{background:`${r.color}18`,color:r.color}}>{r.count}</span>
            </div>
          ))}
        </div>
      </div></div>
      <div className="av"><div className="av-in">{[{i:"🚚",t:"Livraison 24h",d:"Expédition rapide partout au Maroc."},{i:"⚡",t:"Accès immédiat",d:"Formulations numériques dès paiement."},{i:"🔒",t:"Paiement sécurisé",d:"CMI, virement, PayPal — 100% sécurisé."},{i:"🇲🇦",t:"Expertise locale",d:"15 ans d'expérience terrain au Maroc."}].map((a,i)=><div key={i} className="av-it"><div className="av-i">{a.i}</div><div className="av-t">{a.t}</div><div className="av-d">{a.d}</div></div>)}</div></div>
    </>
  );
}

/* PAGE CHIMIQUES */
function PageChim({onBack,onDevis,onCart,edits}){
  const gs=grpBy(CHIM,"grp");
  return(<>
    <PageHdr cat="Catalogue" h1="Produits Chimiques" em="Réactifs certifiés" sub="Coagulants, floculants, désinfectants, osmose inverse et chaudière — qualité certifiée, livraison 24h au Maroc." onBack={onBack}/>
    <div className="pbody">{Object.entries(gs).map(([grp,items])=><div key={grp} className="grp"><div className="grp-hd"><h2>{grp}</h2><span className="gpill">{items.length} produits</span></div><div className="g3">{items.map(p=><PCard key={p.id} p={p} type="p" onDevis={onDevis} onCart={onCart} edits={edits}/>)}</div></div>)}</div>
  </>);
}

/* PAGE MATÉRIELS */
function PageMat({onBack,onDevis,onCart,edits}){
  return(<>
    <PageHdr cat="Équipements" h1="Matériels de Mesure" em="Instruments professionnels" sub="pH-mètres, conductimètres, oxymètres, kits terrain — équipements fiables pour le contrôle qualité de vos eaux." onBack={onBack}/>
    <div className="pbody"><div className="g4">{MAT.map(p=><PCard key={p.id} p={p} type="m" onDevis={onDevis} onCart={onCart} edits={edits}/>)}</div></div>
  </>);
}

/* PAGE SERVICES */
function PageSvc({onBack,onDevis}){
  return(<>
    <PageHdr cat="Ingénierie & Analyses" h1="Nos Services" em="Expertise terrain" sub="Conception STEP, analyses certifiées NM/ISO et optimisation de vos procédés — accompagnement A à Z." onBack={onBack}/>
    <div className="pbody">
      <div className="grp"><div className="grp-hd"><h2>Services d'ingénierie</h2><span className="gpill">3 prestations</span></div><div className="gsvc">{SVCS.map(s=><SCard key={s.id} s={s} onDevis={onDevis}/>)}</div></div>
      <div className="grp"><div className="grp-hd"><h2>Analyses environnementales</h2><span className="gpill">3 analyses</span></div><div className="gsvc">{ANALYSES.map(a=><SCard key={a.id} s={a} onDevis={onDevis}/>)}</div></div>
    </div>
  </>);
}

/* PAGE FORMULATION */
function PageForm({onBack,onCart,ftab,setFtab,edits}){
  return(<>
    <PageHdr cat="Produits Numériques" h1="Formulations Techniques" em="PDF + Excel" sub="Accès permanent après achat. Formules validées en laboratoire pour engrais, traitement des eaux et nettoyage industriel." onBack={onBack}/>
    <div className="pbody">
      <div className="ftabs">{[{k:"engrais",l:"🌿 Engrais"},{k:"eaux",l:"💧 Traitement des Eaux"},{k:"nettoyage",l:"🧴 Nettoyage & Détergents"}].map(t=><button key={t.k} className={`ftab${ftab===t.k?" on":""}`} onClick={()=>setFtab(t.k)}>{t.l}</button>)}</div>
      <div className="g3">{FNUM[ftab].map(p=><PCard key={p.id} p={{...p,unite:"accès permanent"}} type="n" onDevis={()=>{}} onCart={onCart} edits={edits}/>)}</div>
    </div>
  </>);
}

/* PAGE CONTACT — COMPOSANT STABLE HORS APP */
function PageContact({onBack,initProduit}){
  const [form,setForm]=useState({nom:"",email:"",tel:"",produit:initProduit||"",rubrique:"",msg:""});
  const [sending,setSending]=useState(false);
  const [ok,setOk]=useState(false);
  const [err,setErr]=useState("");

  /* sync si initProduit change (depuis "Devis →") */
  useEffect(()=>{if(initProduit)setForm(f=>({...f,produit:initProduit}));},[initProduit]);

  const handleChange=useCallback(e=>{
    const {name,value}=e.target;
    setForm(prev=>({...prev,[name]:value}));
  },[]);

  const submit=async e=>{
    e.preventDefault();
    if(!form.nom.trim()||!form.email.trim()||!form.produit.trim()){
      setErr("Veuillez remplir les champs obligatoires : Nom, Email et Produit/Service.");
      return;
    }
    setSending(true); setErr("");
    try{
      await emailjs.send(
        EJS.svc, EJS.tpl,
        {
          from_name: form.nom,
          nom: form.nom,
          email: form.email,
          telephone: form.tel||"Non renseigné",
          produit: form.produit+(form.rubrique?" ("+form.rubrique+")":""),
          message: form.msg||"—"
        },
        EJS.key
      );
      setOk(true);
    }catch(ex){
      setErr("Erreur d'envoi ("+ex.text+"). Contactez-nous directement : univers.envi@gmail.com ou WhatsApp +212 700 090 365");
    }finally{setSending(false);}
  };

  if(ok)return(
    <><PageHdr cat="Devis & Contact" h1="Demandez votre devis" em="gratuit" sub="Notre équipe vous répond sous 24h." onBack={onBack}/>
    <div className="pbody"><div className="cw"><div className="form-wrap" style={{textAlign:"center",padding:"48px 24px"}}>
      <div className="fok-i">✅</div>
      <div className="fok-t">Demande envoyée avec succès !</div>
      <div className="fok-s" style={{margin:"8px 0 20px"}}>Merci {form.nom}, nous avons bien reçu votre demande.<br/>Notre équipe vous contactera sous 24h à l'adresse <strong>{form.email}</strong>.</div>
      <button className="btn-p" style={{width:"auto",padding:"11px 26px"}} onClick={()=>{setOk(false);setForm({nom:"",email:"",tel:"",produit:"",rubrique:"",msg:""});}}>Nouvelle demande</button>
    </div></div></div></>
  );

  return(<>
    <PageHdr cat="Devis & Contact" h1="Demandez votre devis" em="gratuit" sub="Notre équipe vous répond sous 24h — El Jadida, Maroc." onBack={onBack}/>
    <div className="pbody">
      <div className="cw">
        <div className="ci-intro">
          <h2>Parlons de votre <em>projet</em></h2>
          <p>Remplissez le formulaire. Les champs marqués * sont obligatoires.</p>
        </div>
        <div className="form-wrap">
          <form onSubmit={submit} noValidate>
            <div className="frow">
              <div className="fg">
                <label htmlFor="c-nom">Nom complet *</label>
                <input id="c-nom" name="nom" type="text" placeholder="Votre nom et prénom" autoComplete="name" value={form.nom} onChange={handleChange} required/>
              </div>
              <div className="fg">
                <label htmlFor="c-email">Email *</label>
                <input id="c-email" name="email" type="email" placeholder="votre@email.com" autoComplete="email" value={form.email} onChange={handleChange} required/>
              </div>
            </div>
            <div className="frow">
              <div className="fg">
                <label htmlFor="c-tel">Téléphone</label>
                <input id="c-tel" name="tel" type="tel" placeholder="+212 6XX XXX XXX" autoComplete="tel" value={form.tel} onChange={handleChange}/>
              </div>
              <div className="fg">
                <label htmlFor="c-rub">Rubrique</label>
                <select id="c-rub" name="rubrique" value={form.rubrique} onChange={handleChange}>
                  <option value="">Sélectionnez...</option>
                  <option value="Produits Chimiques">Produits Chimiques</option>
                  <option value="Matériels">Matériels de Mesure</option>
                  <option value="Services">Services d'Ingénierie</option>
                  <option value="Analyses">Analyses Environnementales</option>
                  <option value="Formulation">Formulations Numériques</option>
                </select>
              </div>
            </div>
            <div className="frow full">
              <div className="fg">
                <label htmlFor="c-prod">Produit / Service concerné *</label>
                <input id="c-prod" name="produit" type="text" placeholder="Ex : PAC Coagulant, Analyse eau, STEP 500m³/j..." value={form.produit} onChange={handleChange} required/>
              </div>
            </div>
            <div className="frow full">
              <div className="fg">
                <label htmlFor="c-msg">Message & détails</label>
                <textarea id="c-msg" name="msg" placeholder="Décrivez votre besoin : quantité souhaitée, débit STEP, type d'eau, délai..." value={form.msg} onChange={handleChange} rows={4}/>
              </div>
            </div>
            {err&&<div className="ferr">{err}</div>}
            <button className="btn-send" type="submit" disabled={sending}>
              {sending?<><span>⏳</span>Envoi en cours...</>:<><span>📩</span>Envoyer la demande de devis</>}
            </button>
            <div className="fnote">🔒 Données confidentielles · Réponse sous 24h · univers.envi@gmail.com</div>
          </form>
        </div>
        <div className="c-alt">
          <div className="ca">📞 <a href={`tel:+${TEL}`}>+212 523 37 74 17</a></div>
          <div className="ca">💬 <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div className="ca">✉️ <a href="mailto:univers.envi@gmail.com">univers.envi@gmail.com</a></div>
          <div className="ca">📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida</div>
        </div>
      </div>
    </div>
  </>);
}

/* ══ ADMIN PANEL ══ */
function AdminPanel(){
  const [logged,setLogged]=useState(()=>sessionStorage.getItem("uem_admin")==="ok");
  const [pw,setPw]=useState(""); const [pwErr,setPwErr]=useState("");
  const [sec,setSec]=useState("dashboard");
  const [promos,setPromos]=useState(()=>{try{return JSON.parse(localStorage.getItem("uem_promo")||"{}");}catch{return {};}});
  const [edits,setEdits]=useState(()=>{try{return JSON.parse(localStorage.getItem("uem_prod_edits")||"{}");}catch{return {};}});
  const [editing,setEditing]=useState(null); const [editData,setEditData]=useState({});
  const [saved,setSaved]=useState(false); const [etab,setEtab]=useState("chimiques");
  const login=e=>{e.preventDefault();if(pw===ADMIN_PASS){sessionStorage.setItem("uem_admin","ok");setLogged(true);}else setPwErr("Mot de passe incorrect.");};
  const savePromo=p=>{const n={...promos,...p};setPromos(n);localStorage.setItem("uem_promo",JSON.stringify(n));setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const startEdit=p=>{setEditing(p.id);setEditData({nom:p.nom,desc:p.desc,prix:p.prix||"Sur devis"});};
  const saveProd=id=>{const n={...edits,[id]:editData};setEdits(n);localStorage.setItem("uem_prod_edits",JSON.stringify(n));setEditing(null);setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const resetProd=id=>{const n={...edits};delete n[id];setEdits(n);localStorage.setItem("uem_prod_edits",JSON.stringify(n));setEditing(null);};
  const resetAll=()=>{if(!window.confirm("Réinitialiser toutes les modifications ?"))return;localStorage.removeItem("uem_prod_edits");localStorage.removeItem("uem_promo");setEdits({});setPromos({});};
  const logout=()=>{sessionStorage.removeItem("uem_admin");setLogged(false);};
  const mc=Object.keys(edits).length;
  const tabProds={chimiques:CHIM,materiels:MAT,engrais:FNUM.engrais,eaux:FNUM.eaux,nettoyage:FNUM.nettoyage};
  if(!logged)return(<div className="adm-body"><style>{CSS}</style><div className="adm-login"><div className="adm-box"><div className="adm-logo"><div className="sq">UE</div><h1>Univers Environnement Maroc</h1><p>Espace Administrateur</p></div>{pwErr&&<div className="adm-err">{pwErr}</div>}<form onSubmit={login}><label htmlFor="adm-pw">Mot de passe</label><input id="adm-pw" type="password" placeholder="••••••••••••" value={pw} onChange={e=>setPw(e.target.value)} autoFocus/><button className="adm-login-btn" type="submit">Se connecter</button></form><div style={{textAlign:"center",marginTop:14,fontSize:".7rem",color:"#6b7c70"}}><a href="/" style={{color:"#1a5c32"}}>← Retour au site</a></div></div></div></div>);
  return(<div className="adm-body"><style>{CSS}</style><div className="adm-top"><div className="adm-tl"><div className="sq">UE</div><span>Panel Admin — UEM</span></div><div className="adm-tr"><a href="/" target="_blank" rel="noreferrer">🌐 Voir le site</a>{saved&&<span className="adm-sv">✓ Sauvegardé</span>}<button className="adm-out" onClick={logout}>Déconnexion</button></div></div><div className="adm-lay"><div className="adm-side">{[{k:"dashboard",i:"📊",l:"Tableau de bord"},{k:"catalogue",i:"⚗️",l:`Catalogue${mc>0?" ("+mc+")":""}`},{k:"promotions",i:"🎯",l:"Promotions"},{k:"contact",i:"📞",l:"Contact"}].map(n=><div key={n.k} className={`adm-ni${sec===n.k?" on":""}`} onClick={()=>setSec(n.k)}><span className="ni">{n.i}</span>{n.l}{n.k==="catalogue"&&mc>0&&<span className="adm-bmod"/>}</div>)}<div style={{margin:"18px 14px 6px",fontSize:".62rem",color:"#b8c8be",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase"}}>Actions</div><div className="adm-ni" onClick={resetAll} style={{color:"#b03020"}}><span className="ni">🔄</span>Réinitialiser tout</div></div><div className="adm-cnt">{sec==="dashboard"&&<><h2 style={{fontSize:"1.1rem",fontWeight:700,marginBottom:18,color:"#12201a"}}>Tableau de bord</h2><div className="adm-stats">{[{n:CHIM.length,l:"Réactifs"},{n:MAT.length,l:"Matériels"},{n:FNUM.engrais.length+FNUM.eaux.length+FNUM.nettoyage.length,l:"Formulations"},{n:6,l:"Services"}].map((s,i)=><div key={i} className="adm-stat"><div className="adm-stat-n">{s.n}</div><div className="adm-stat-l">{s.l}</div></div>)}</div><div className="adm-card"><div className="adm-card-t">État du site</div>{[{l:"Site en ligne",v:"✅ www.uem.ma",c:"#1a5c32"},{l:"Hébergement",v:"✅ Vercel (gratuit)"},{l:"Formulaire devis",v:"✅ EmailJS actif"},{l:"Assistant IA",v:"✅ Claude intégré"},{l:"Modifications",v:mc>0?`⚠️ ${mc} produit(s) modifié(s)`:"✅ Aucune",c:mc>0?"#e65100":"#1a5c32"},{l:"Promotion active",v:promos.active?"✅ "+promos.texte:"— Aucune"}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #e0e8e2",fontSize:".82rem"}}><span style={{color:"#4a5c52",fontWeight:500}}>{r.l}</span><span style={{fontWeight:600,color:r.c||"#12201a"}}>{r.v}</span></div>)}</div></>}{sec==="catalogue"&&<><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}><h2 style={{fontSize:"1.1rem",fontWeight:700,color:"#12201a"}}>Catalogue Produits</h2><span style={{fontSize:".75rem",color:"#6b7c70"}}>{mc} modification(s)</span></div><div className="adm-tabs">{[{k:"chimiques",l:"Réactifs (19)"},{k:"materiels",l:"Matériels (5)"},{k:"engrais",l:"Engrais"},{k:"eaux",l:"Formules Eaux"},{k:"nettoyage",l:"Nettoyage"}].map(t=><button key={t.k} className={`adm-tab${etab===t.k?" on":""}`} onClick={()=>setEtab(t.k)}>{t.l}</button>)}</div><div className="adm-pl">{(tabProds[etab]||[]).map(p=>{const mod=edits[p.id];const d=mod?{...p,...mod}:p;return(<div key={p.id}><div className={`adm-pi${editing===p.id?" ed":""}`} onClick={()=>editing===p.id?setEditing(null):startEdit(p)}><div style={{flex:1}}><div className="adm-pn">{d.nom||p.nom}{mod&&<span style={{fontSize:".62rem",background:"#fdf3e7",color:"#e65100",padding:"1px 5px",borderRadius:3,marginLeft:5}}>modifié</span>}</div><div className="adm-pg">{p.grp||"Formulation"}</div></div><div className="adm-pp">{d.prix||"Sur devis"}</div><span style={{fontSize:".75rem",color:"#b8c8be",marginLeft:7}}>{editing===p.id?"▲":"▼"}</span></div>{editing===p.id&&<div className="adm-ep"><div className="adm-f"><label>Nom</label><input value={editData.nom||""} onChange={e=>setEditData(d=>({...d,nom:e.target.value}))}/></div><div className="adm-f"><label>Description</label><textarea value={editData.desc||""} onChange={e=>setEditData(d=>({...d,desc:e.target.value}))} rows={3}/></div><div className="adm-f"><label>Prix affiché</label><input value={editData.prix||""} onChange={e=>setEditData(d=>({...d,prix:e.target.value}))} placeholder="Ex: 390 MAD ou Sur devis"/></div><div style={{display:"flex",gap:7,marginTop:4}}><button className="adm-btn adm-bg" onClick={()=>saveProd(p.id)}>✓ Enregistrer</button><button className="adm-btn adm-bw" onClick={()=>setEditing(null)}>Annuler</button>{mod&&<button className="adm-btn adm-br" onClick={()=>resetProd(p.id)}>Réinitialiser</button>}</div></div>}</div>);})}</div></>}{sec==="promotions"&&<><h2 style={{fontSize:"1.1rem",fontWeight:700,marginBottom:18,color:"#12201a"}}>Gestion des Promotions</h2><div className="adm-promo-box"><div className="adm-card-t">Bannière promotionnelle</div><div className="adm-tog"><input type="checkbox" id="p-on" checked={!!promos.active} onChange={e=>savePromo({active:e.target.checked})}/><label htmlFor="p-on">{promos.active?"Bannière ACTIVE sur le site":"Bannière désactivée"}</label></div><div className="adm-f"><label>Texte de la bannière</label><input value={promos.texte||""} onChange={e=>savePromo({texte:e.target.value})} placeholder="Ex: 🎉 Promotion -20% sur les coagulants"/></div><div className="adm-f"><label>Couleur</label><select value={promos.couleur||"vert"} onChange={e=>savePromo({couleur:e.target.value})}><option value="vert">Vert</option><option value="rouge">Rouge (urgence)</option><option value="bleu">Bleu (info)</option><option value="orange">Orange (solde)</option></select></div>{promos.texte&&<div className="adm-prev" style={{background:{vert:"#1a5c32",rouge:"#b03020",bleu:"#1565c0",orange:"#e65100"}[promos.couleur||"vert"]}}>Aperçu : {promos.texte}</div>}</div><div className="adm-card"><div className="adm-card-t">Idées prêtes à utiliser</div>{["🎉 Promotion -20% sur les coagulants jusqu'au 31/07","⚡ Livraison offerte sur toute commande > 2000 MAD","🔬 Formulation offerte pour tout contrat STEP signé en juillet","📄 -15% sur les formulations numériques ce mois"].map((s,i)=><div key={i} style={{padding:"7px 0",borderBottom:"1px solid #f0f2f5",fontSize:".8rem",color:"#4a5c52",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{s}</span><button className="adm-btn adm-bw" style={{fontSize:".68rem",padding:"3px 9px"}} onClick={()=>savePromo({texte:s})}>Utiliser</button></div>)}</div></>}{sec==="contact"&&<><h2 style={{fontSize:"1.1rem",fontWeight:700,marginBottom:18,color:"#12201a"}}>Informations de Contact</h2><div className="adm-card"><div className="adm-card-t">Coordonnées actuelles</div>{[["Téléphone","+212 523 37 74 17"],["WhatsApp","+212 700 090 365"],["Email","univers.envi@gmail.com"],["Adresse","N°1, Bd Jabrane Khalil Jabrane, El Jadida"],["Domaine","www.uem.ma"]].map((r,i)=><div key={i} style={{display:"flex",gap:14,padding:"9px 0",borderBottom:"1px solid #f0f2f5",fontSize:".82rem"}}><span style={{width:130,color:"#6b7c70",fontWeight:600,flexShrink:0}}>{r[0]}</span><span style={{color:"#12201a",fontWeight:500}}>{r[1]}</span></div>)}</div><div className="adm-card" style={{background:"#fdf3e7",borderColor:"#f5d6a0"}}><div className="adm-card-t" style={{color:"#e65100"}}>⚠️ Modifier ces informations</div><p style={{fontSize:".82rem",color:"#4a5c52",lineHeight:1.7}}>Pour modifier les coordonnées, envoyez un message à Claude avec les nouvelles informations et il mettra à jour le code source.</p></div></>}</div></div>{mc>0&&<div className="adm-sb"><span>⚠️ {mc} modification(s) sauvegardées dans ce navigateur.</span><button className="adm-btn adm-bg" onClick={()=>setSaved(true)}>✓ OK</button></div>}</div>);
}

/* ══════════════════════════════
   APP PRINCIPAL
══════════════════════════════ */
export default function App(){
  /* ── TOUS LES HOOKS EN PREMIER — AVANT TOUT RETURN ── */
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
  const [devisProd,setDevisProd] = useState("");

  const tmr = useRef(null);
  const end = useRef(null);
  const iref = useRef(null);

  const isAdmin = window.location.pathname === "/admin";

  /* SEO dynamique */
  const SEO_PAGES = {
    garde:       { title:"Univers Environnement Maroc | Réactifs Chimiques, STEP & Analyses — El Jadida", desc:"UEM — Fournisseur de réactifs chimiques, conception STEP et analyses environnementales certifiées NM/ISO. El Jadida, Maroc." },
    chimiques:   { title:"Produits Chimiques — Coagulants, Floculants, Osmose Inverse | UEM Maroc", desc:"PAC, chlorure ferrique, floculants, hypochlorite, anti-scalant, biocides. Livraison 24h au Maroc." },
    materiels:   { title:"Matériels de Mesure — pH-mètre, Conductimètre, Oxymètre | UEM Maroc", desc:"Instruments de mesure professionnels : pH-mètres, conductimètres, oxymètres, kits chlore et dureté." },
    services:    { title:"Services Ingénierie — Conception STEP, Analyses Environnementales | UEM Maroc", desc:"Conception STEP, optimisation de stations d'épuration, analyses physicochimiques NM/ISO au Maroc." },
    formulation: { title:"Formulations Techniques Numériques — Engrais, Traitement Eaux | UEM", desc:"Formules PDF+Excel : engrais foliaires, traitement des eaux, détergents et nettoyage industriels." },
    contact:     { title:"Demander un Devis Gratuit — Contact UEM El Jadida Maroc", desc:"Contactez UEM pour un devis gratuit. +212 523 37 74 17. N°1 Bd Jabrane Khalil Jabrane, El Jadida." },
  };

  useEffect(()=>{
    if(isAdmin) return;
    const seo = SEO_PAGES[page] || SEO_PAGES.garde;
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute("content", seo.desc);
    const canonical = document.querySelector('link[rel="canonical"]');
    if(canonical) canonical.setAttribute("href", `https://www.uem.ma/${page==="garde"?"":page}`);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if(ogTitle) ogTitle.setAttribute("content", seo.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if(ogDesc) ogDesc.setAttribute("content", seo.desc);
  },[page, isAdmin]);

  useEffect(()=>{
    if(isAdmin) return;
    const existing = document.getElementById("sd");
    if(existing) existing.remove();
    let schema = null;
    if(page==="chimiques") schema={"@context":"https://schema.org","@type":"ItemList","name":"Réactifs Chimiques UEM","itemListElement":CHIM.slice(0,5).map((p,i)=>({"@type":"ListItem","position":i+1,"item":{"@type":"Product","name":p.nom,"description":p.desc}}))};
    else if(page==="garde") schema={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.uem.ma/"},{"@type":"ListItem","position":2,"name":"Produits Chimiques","item":"https://www.uem.ma/chimiques"}]};
    if(schema){const s=document.createElement("script");s.id="sd";s.type="application/ld+json";s.textContent=JSON.stringify(schema);document.head.appendChild(s);}
    return()=>{const el=document.getElementById("sd");if(el)el.remove();};
  },[page, isAdmin]);

  useEffect(()=>{ if(!isAdmin) window.scrollTo({top:0,behavior:"smooth"}); },[page, isAdmin]);
  useEffect(()=>{ if(!isAdmin&&chat) end.current?.scrollIntoView({behavior:"smooth"}); },[msgs,load,chat,isAdmin]);
  useEffect(()=>{ if(!isAdmin&&chat) setTimeout(()=>iref.current?.focus(),350); },[chat,isAdmin]);

  const shToast = useCallback(m=>{setToast(m);clearTimeout(tmr.current);tmr.current=setTimeout(()=>setToast(""),2800);},[]);
  const go      = useCallback(p=>{setPage(p);setMob(false);},[]);
  const addCart = useCallback(p=>{setPanier(pr=>{const ex=pr.find(i=>i.id===p.id);return ex?pr.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...pr,{...p,qty:1}];});shToast(`✓ "${p.nom}" ajouté`);},[shToast]);
  const delCart = useCallback(id=>setPanier(p=>p.filter(i=>i.id!==id)),[]);
  const askDevis= useCallback(nom=>{setDevisProd(nom);go("contact");},[go]);
  const aiSend  = useCallback(async t=>{
    const txt=(t||inp).trim(); if(!txt||load)return;
    setInp(""); setSugs(false);
    setMsgs(p=>[...p,{r:"u",t:txt}]); setLoad(true);
    const hist=msgs.map(m=>({role:m.r==="u"?"user":"assistant",content:m.t}));
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:SYS,messages:[...hist,{role:"user",content:txt}]})});
      const d=await res.json();
      setMsgs(p=>[...p,{r:"b",t:d.content?.map(b=>b.text||"").join("")||"Désolé, une erreur est survenue."}]);
    }catch{setMsgs(p=>[...p,{r:"b",t:"Une erreur est survenue."}]);}
    finally{setLoad(false);}
  },[inp,load,msgs]);

  /* ── APRÈS TOUS LES HOOKS — return conditionnel ── */
  if(isAdmin) return <AdminPanel/>;

  const prodEdits = (()=>{try{return JSON.parse(localStorage.getItem("uem_prod_edits")||"{}");}catch{return {};}})();
  const promoData = (()=>{try{return JSON.parse(localStorage.getItem("uem_promo")||"{}");}catch{return {};}})();
  const total = panier.reduce((s,i)=>s+i.prixVal*i.qty,0);
  const qty   = panier.reduce((s,i)=>s+i.qty,0);

  const renderPage=()=>{
    const props={onBack:()=>go("garde"),onDevis:askDevis,onCart:addCart,edits:prodEdits};
    switch(page){
      case"garde":       return <PageGarde onGo={go}/>;
      case"chimiques":   return <PageChim {...props}/>;
      case"materiels":   return <PageMat {...props}/>;
      case"services":    return <PageSvc onBack={()=>go("garde")} onDevis={askDevis}/>;
      case"formulation": return <PageForm onBack={()=>go("garde")} onCart={addCart} ftab={ftab} setFtab={setFtab} edits={prodEdits}/>;
      case"contact":     return <PageContact onBack={()=>go("garde")} initProduit={devisProd}/>;
      default:           return <PageGarde onGo={go}/>;
    }
  };

  return(
    <>
      <style>{CSS}</style>
      <div className={`toast${toast?" on":""}`}>{toast}</div>

      {/* PANIER */}
      <div className={`ov${cart?" on":""}`} onClick={()=>setCart(false)}/>
      <div className={`cart${cart?" on":""}`}>
        <div className="c-hd"><h2>🛒 Panier{qty>0?` (${qty})`:""}</h2><button className="c-x" onClick={()=>setCart(false)}>✕</button></div>
        <div className="c-body">{panier.length===0?<div className="c-empty">Votre panier est vide.</div>:panier.map(i=><div key={i.id} className="ci"><div className="ci-ico">{i.emoji||"📄"}</div><div className="ci-inf"><div className="ci-nom">{i.nom}</div><div className="ci-px">{i.prixVal.toLocaleString("fr-MA")} MAD × {i.qty} = {(i.prixVal*i.qty).toLocaleString("fr-MA")} MAD</div></div><button className="ci-rm" onClick={()=>delCart(i.id)}>✕</button></div>)}</div>
        <div className="c-ft"><div className="c-tot"><span className="c-tot-l">Total TTC</span><span className="c-tot-p">{total.toLocaleString("fr-MA")} MAD</span></div><button className="btn-pay" disabled={!panier.length}>🔒 Passer la commande</button><div className="pay-n">Paiement sécurisé · CMI · Virement · PayPal</div></div>
      </div>

      {/* TOP BAR */}
      <div className="tb"><div className="tb-in">
        <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
          <a href={`tel:+${TEL}`}>📞 +212 523 37 74 17</a>
          <span className="tb-sep">|</span>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">💬 +212 700 090 365</a>
          <span className="tb-sep">|</span>
          <span style={{color:"rgba(255,255,255,.55)"}}>📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida</span>
        </div>
        <a href="mailto:univers.envi@gmail.com">✉️ univers.envi@gmail.com</a>
      </div></div>

      {/* NAVBAR */}
      <div className="nav"><div className="nav-in">
        <div className="logo" onClick={()=>go("garde")} role="button" tabIndex={0}>
          <div className="logo-sq">UE</div>
          <div className="logo-t"><span className="n1">Univers Environnement</span><span className="n2">Maroc — El Jadida</span></div>
        </div>
        <div className="nav-links">{NAV.map(n=><button key={n.k} className={page===n.k?"on":""} onClick={()=>go(n.k)}>{n.l}</button>)}</div>
        <div className="nav-r">
          <button className="btn-dv" onClick={()=>go("contact")}>Demander un devis</button>
          <button className="cart-btn" onClick={()=>setCart(true)}>🛒{qty>0&&<span className="cbadge">{qty}</span>}</button>
        </div>
        <button className={`burger${mob?" on":""}`} onClick={()=>setMob(v=>!v)}><span/><span/><span/></button>
      </div>
      <div className={`mob${mob?" on":""}`}><nav>
        {NAV.map(n=><button key={n.k} className={page===n.k?"on":""} onClick={()=>go(n.k)}>{n.l}</button>)}
        <button className="mob-cta" onClick={()=>go("contact")}>Demander un devis</button>
      </nav></div></div>

      {/* TICKER */}
      <div className="tkr"><div className="tkr-t">{[...TICKERS,...TICKERS].map((t,i)=><span key={i} className="tkr-i">{t}</span>)}</div></div>

      {/* BANNIÈRE PROMO */}
      {promoData.active&&promoData.texte&&(
        <div style={{background:{vert:"#1a5c32",rouge:"#b03020",bleu:"#1565c0",orange:"#e65100"}[promoData.couleur||"vert"],color:"#fff",padding:"10px",textAlign:"center",fontSize:".8rem",fontWeight:600,letterSpacing:".04em"}}>
          {promoData.texte}
        </div>
      )}

      {/* PAGE */}
      {renderPage()}

      {/* FOOTER */}
      <footer><div className="fi-in">
        <div className="fi-grid">
          <div>
            <div className="fb-n">Univers Environnement <span>Maroc</span></div>
            <p className="fb-desc">Solutions intégrées pour le traitement des eaux et l'ingénierie environnementale au Maroc depuis plus de 15 ans.</p>
            <div className="fb-ct">
              <a href={`tel:+${TEL}`}>📞 +212 523 37 74 17</a>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">💬 +212 700 090 365</a>
              <a href="mailto:univers.envi@gmail.com">✉️ univers.envi@gmail.com</a>
              <a href="#">📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida</a>
            </div>
          </div>
          <div className="fc"><h4>Navigation</h4><ul>{NAV.map(n=><li key={n.k} onClick={()=>go(n.k)}>{n.l}</li>)}<li onClick={()=>go("contact")}>Contact & Devis</li></ul></div>
          <div className="fc"><h4>Services</h4><ul><li>Conception STEP</li><li>Analyse environnementale</li><li>Optimisation process</li><li>Formation opérateurs</li></ul></div>
          <div className="fc"><h4>Informations</h4><ul><li>À propos</li><li>Mentions légales</li><li>CGV</li><li>Confidentialité</li></ul></div>
        </div>
        <div className="fi-bot"><span>© 2026 Univers Environnement Maroc — Tous droits réservés</span><span>🔒 Paiements sécurisés · CMI · SSL</span></div>
      </div></footer>

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
          <div style={{flex:1}}><div className="ai-nm">Assistant UEM</div><div className="ai-st">En ligne · Expert eau & environnement</div></div>
          <button className="ai-cx" onClick={()=>setChat(false)}>✕</button>
        </div>
        <div className="ai-msgs">
          {msgs.map((m,i)=><div key={i} className={`ai-m ${m.r==="u"?"u":"b"}`}><div className="ai-mav">{m.r==="u"?"👤":"🌱"}</div><div className="ai-mb" style={{whiteSpace:"pre-wrap"}}>{rtx(m.t)}</div></div>)}
          {load&&<div className="ai-m b"><div className="ai-mav">🌱</div><div className="typ"><span/><span/><span/></div></div>}
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
