// UEM v3.0 — Version complète avec catalogue, photos, prix
import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bleu:#0d2b6e;--bleu2:#1565c0;--vert:#1b7a3e;--vert2:#145f30;--vert3:#43a047;
  --accent:#5cb800;--navy:#0a1f4e;
  --g50:#f8fafc;--g100:#f1f5f9;--g200:#e2e8f0;--g600:#475569;--g700:#334155;--g900:#0f172a;
  --sh:0 4px 24px rgba(13,43,110,.10);--sh2:0 8px 40px rgba(13,43,110,.15);
  --tr:all .22s cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth;overflow:auto!important;height:auto!important}
body{font-family:'Inter',sans-serif;color:var(--g900);background:#fff;overflow-x:hidden;display:block!important;height:auto!important}
#root{width:100%}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}
button{font-family:'Inter',sans-serif}

/* TOPBAR */
.tb{background:var(--navy);padding:8px 0;font-size:12.5px;color:rgba(255,255,255,.8)}
.tb-in{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.tb-l{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.tb-a{display:flex;align-items:center;gap:5px;color:rgba(255,255,255,.8);transition:var(--tr)}
.tb-a:hover{color:var(--accent)}
.tb-soc{display:flex;gap:8px}
.tb-soc a{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;transition:var(--tr)}
.tb-soc a:hover{background:var(--accent)}

/* NAVBAR */
.nb{background:#fff;position:sticky;top:0;z-index:1000;box-shadow:0 2px 16px rgba(13,43,110,.08)}
.nb-in{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:28px;height:70px}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0;cursor:pointer}
.logo-sq{width:42px;height:42px;background:var(--bleu);color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:800;font-size:15px}
.logo-tx{display:flex;flex-direction:column;line-height:1.2}
.logo-n{font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;color:var(--bleu)}
.logo-s{font-size:9.5px;font-weight:600;color:var(--vert3);letter-spacing:1.5px;text-transform:uppercase}
.nb-links{display:flex;align-items:center;gap:2px;flex:1;list-style:none}
.nb-item{position:relative}
.nb-btn{display:flex;align-items:center;gap:4px;padding:8px 12px;font-size:13.5px;font-weight:500;color:var(--g700);border-radius:8px;cursor:pointer;transition:var(--tr);border:none;background:none;white-space:nowrap}
.nb-btn:hover,.nb-btn.on{color:var(--bleu);background:var(--g100)}
.dd{position:absolute;top:calc(100% + 8px);left:0;background:#fff;border-radius:14px;box-shadow:var(--sh2);padding:8px;min-width:240px;opacity:0;visibility:hidden;transform:translateY(-8px);transition:var(--tr);border:1px solid var(--g200);z-index:100}
.nb-item:hover .dd,.nb-item:focus-within .dd{opacity:1;visibility:visible;transform:translateY(0)}
.dd a{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:13px;color:var(--g700);transition:var(--tr)}
.dd a:hover{background:var(--g100);color:var(--bleu)}
.dd-ico{width:30px;height:30px;border-radius:8px;background:var(--g100);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.nb-cta{background:var(--bleu);color:#fff;padding:10px 20px;border-radius:9px;font-weight:600;font-size:13.5px;cursor:pointer;border:none;transition:var(--tr);margin-left:auto;white-space:nowrap;flex-shrink:0}
.nb-cta:hover{background:var(--bleu2)}
.burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;margin-left:auto}
.burger span{display:block;width:23px;height:2px;background:var(--bleu);border-radius:2px}
.mob-menu{display:none;background:#fff;border-top:1px solid var(--g200);padding:12px 24px 20px}
.mob-menu.open{display:block}
.mob-menu button{display:block;padding:11px 0;border-bottom:1px solid var(--g100);font-size:14.5px;color:var(--g700);background:none;border-top:none;border-left:none;border-right:none;width:100%;text-align:left;cursor:pointer}

/* HERO */
.hero{background:linear-gradient(135deg,#f0f4ff 0%,#e8f5e9 100%);padding:56px 0 0;overflow:hidden}
.hero-in{max-width:1280px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(13,43,110,.08);color:var(--bleu);font-size:11.5px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:6px 14px;border-radius:100px;border:1px solid rgba(13,43,110,.15);margin-bottom:22px}
.hero-tag::before{content:'';width:6px;height:6px;background:var(--accent);border-radius:50%;animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero h1{font-family:'Poppins',sans-serif;font-size:clamp(26px,3.2vw,44px);font-weight:800;line-height:1.13;color:var(--g900);margin-bottom:18px}
.hl-b{color:var(--bleu2)}.hl-g{color:var(--vert3)}.hl-a{color:var(--accent)}
.hero-desc{font-size:15.5px;line-height:1.75;color:var(--g600);margin-bottom:30px;max-width:480px}
.hero-btns{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:36px}
.btn-p{background:var(--bleu);color:#fff;padding:13px 26px;border-radius:9px;font-weight:700;font-size:14px;display:flex;align-items:center;gap:8px;border:none;cursor:pointer;transition:var(--tr)}
.btn-p:hover{background:var(--bleu2);transform:translateY(-2px);box-shadow:0 8px 20px rgba(13,43,110,.3)}
.btn-o{background:transparent;color:var(--bleu);padding:12px 22px;border-radius:9px;font-weight:600;font-size:14px;display:flex;align-items:center;gap:8px;border:2px solid var(--bleu);cursor:pointer;transition:var(--tr)}
.btn-o:hover{background:var(--bleu);color:#fff}
.btn-wa{background:#25D366;color:#fff;padding:12px 20px;border-radius:9px;font-weight:600;font-size:14px;display:flex;align-items:center;gap:8px;border:none;cursor:pointer;transition:var(--tr);text-decoration:none}
.btn-wa:hover{background:#128C7E}
.hero-trust{display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.tr-item{display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--g600)}
.hero-visual{position:relative;height:480px}
.slider{position:relative;width:100%;height:100%;border-radius:20px 20px 0 0;overflow:hidden}
.slide{position:absolute;inset:0;opacity:0;transition:opacity .7s ease;background-size:cover;background-position:center}
.slide.active{opacity:1}
.slide-ov{position:absolute;inset:0;background:linear-gradient(to bottom right,rgba(13,43,110,.35),transparent)}
.slide-dots{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:7px;z-index:5}
.sd{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.5);border:none;cursor:pointer;transition:var(--tr)}
.sd.on{background:#fff;width:22px;border-radius:4px}
.badge15{position:absolute;bottom:28px;right:-12px;background:var(--bleu);color:#fff;border-radius:14px;padding:16px 20px;text-align:center;box-shadow:var(--sh2);z-index:5;animation:fl 3s ease-in-out infinite}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.b15-n{font-family:'Poppins',sans-serif;font-size:34px;font-weight:800;line-height:1}
.b15-s{font-size:17px;vertical-align:super}
.b15-l{font-size:9.5px;font-weight:600;letter-spacing:1px;opacity:.85;margin-top:3px;text-transform:uppercase}

/* STATS */
.stats{background:var(--bleu);padding:32px 0}
.stats-in{max-width:1280px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
.stat{color:#fff}
.stat-n{font-family:'Poppins',sans-serif;font-size:36px;font-weight:800;line-height:1;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:5px}
.stat-ico{width:34px;height:34px;background:rgba(255,255,255,.15);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px}
.stat-l{font-size:12.5px;opacity:.78}

/* CLIENTS */
.clients{padding:44px 0;background:#fff;border-bottom:1px solid var(--g200)}
.cl-in{max-width:1280px;margin:0 auto;padding:0 24px}
.cl-ttl{text-align:center;font-size:11.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--g600);margin-bottom:24px}
.cl-logos{display:flex;align-items:center;justify-content:center;gap:36px;flex-wrap:wrap}
.cl-logo{display:flex;align-items:center;gap:7px;font-size:17px;font-weight:800;opacity:.6;transition:var(--tr);filter:grayscale(1);cursor:pointer}
.cl-logo:hover{opacity:1;filter:grayscale(0)}
.cl-dot{width:9px;height:9px;border-radius:50%}

/* SECTION */
.sec{padding:72px 0}
.sec-in{max-width:1280px;margin:0 auto;padding:0 24px}
.sec-ey{text-align:center;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--vert3);margin-bottom:10px}
.sec-ti{font-family:'Poppins',sans-serif;font-size:clamp(21px,2.6vw,32px);font-weight:700;text-align:center;color:var(--g900);margin-bottom:44px;line-height:1.25}
.sec-ti em{color:var(--vert3);font-style:normal}
.sec-bg{background:var(--g50)}

/* SERVICES GRID */
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.svc-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06);transition:var(--tr);cursor:pointer;border:1px solid var(--g200)}
.svc-card:hover{transform:translateY(-6px);box-shadow:var(--sh2);border-color:transparent}
.svc-ph{height:150px;display:flex;align-items:center;justify-content:center;font-size:44px}
.svc-ph img{width:100%;height:100%;object-fit:cover}
.svc-body{padding:16px}
.svc-hd{display:flex;align-items:center;gap:9px;margin-bottom:12px}
.svc-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.svc-nt{font-size:14px;font-weight:700;color:var(--g900);line-height:1.3}
.svc-ul{list-style:none;margin-bottom:12px}
.svc-ul li{font-size:12px;color:var(--g600);padding:2.5px 0;display:flex;align-items:flex-start;gap:5px;line-height:1.4}
.svc-ul li::before{content:'→';color:var(--accent);font-size:10px;flex-shrink:0;margin-top:2px}
.svc-lnk{font-size:12.5px;font-weight:600;color:var(--vert);border:none;background:none;cursor:pointer;transition:var(--tr);padding:0}
.svc-lnk:hover{color:var(--bleu)}
.btn-c{text-align:center;margin-top:36px}
.btn-nv{background:var(--bleu);color:#fff;padding:13px 30px;border-radius:9px;font-weight:700;font-size:14px;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;transition:var(--tr)}
.btn-nv:hover{background:var(--bleu2);transform:translateY(-2px)}

/* CAROUSEL PRODUITS */
.prod-sec{padding:72px 0;background:var(--navy)}
.prod-in{max-width:1280px;margin:0 auto;padding:0 24px}
.prod-sec .sec-ey{color:var(--accent)}
.prod-sec .sec-ti{color:#fff}
.car-wrap{position:relative}
.car-tr{display:flex;gap:16px;overflow:hidden;padding:6px 0 20px}
.prod-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:14px;overflow:hidden;flex-shrink:0;width:calc((100% - 5*16px)/6);min-width:155px;transition:var(--tr);cursor:pointer}
.prod-card:hover{background:rgba(255,255,255,.13);border-color:var(--accent);transform:translateY(-4px)}
.pc-img{width:100%;height:115px;object-fit:cover;display:block}
.pc-ph{width:100%;height:115px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:30px}
.pc-body{padding:11px 13px 14px}
.pc-t{font-size:12.5px;font-weight:600;color:#fff;text-align:center;line-height:1.4}
.car-arr{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:var(--tr);z-index:5;font-size:18px}
.car-arr:hover{background:var(--accent);border-color:var(--accent)}
.car-arr.l{left:-21px}.car-arr.r{right:-21px}
.btn-ow{background:transparent;color:#fff;padding:11px 26px;border-radius:9px;font-weight:600;font-size:14px;border:2px solid rgba(255,255,255,.4);cursor:pointer;transition:var(--tr);display:inline-flex;align-items:center;gap:8px;margin-top:8px}
.btn-ow:hover{background:rgba(255,255,255,.1);border-color:#fff}
.prod-btn{text-align:center}

/* ADVANTAGES */
.adv-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.adv-card{text-align:center;padding:32px 22px;border-radius:14px;background:var(--g50);border:1px solid var(--g200);transition:var(--tr)}
.adv-card:hover{border-color:var(--bleu2);background:#fff;box-shadow:var(--sh);transform:translateY(-4px)}
.adv-ico{width:60px;height:60px;border-radius:16px;background:var(--bleu);color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 16px;transition:var(--tr)}
.adv-card:hover .adv-ico{background:var(--accent)}
.adv-t{font-weight:700;font-size:15px;color:var(--g900);margin-bottom:8px}
.adv-d{font-size:13px;color:var(--g600);line-height:1.65}

/* TICKER */
.ticker{background:var(--vert);padding:13px 0;overflow:hidden}
.ticker-in{display:flex;gap:60px;animation:tick 22s linear infinite;white-space:nowrap;width:max-content}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.tick-item{display:flex;align-items:center;gap:9px;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.9)}
.tick-dot{width:5px;height:5px;border-radius:50%;background:var(--accent)}

/* REALISATIONS */
.real-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.real-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06);transition:var(--tr);border:1px solid var(--g200)}
.real-card:hover{transform:translateY(-5px);box-shadow:var(--sh2)}
.real-img{height:200px;overflow:hidden;position:relative}
.real-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.real-card:hover .real-img img{transform:scale(1.06)}
.real-cat{position:absolute;top:12px;left:12px;background:var(--bleu);color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:4px}
.real-body{padding:18px}
.real-lieu{font-size:11.5px;color:var(--vert3);font-weight:600;margin-bottom:5px}
.real-t{font-weight:700;font-size:14.5px;color:var(--g900);margin-bottom:8px;line-height:1.35}
.real-tags{display:flex;gap:6px;flex-wrap:wrap}
.real-tag{background:var(--g100);color:var(--g600);font-size:11px;padding:2px 8px;border-radius:4px}

/* BLOG */
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.blog-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06);border:1px solid var(--g200);transition:var(--tr);cursor:pointer}
.blog-card:hover{transform:translateY(-4px);box-shadow:var(--sh2)}
.blog-img{height:170px;background:linear-gradient(135deg,var(--bleu),var(--vert));display:flex;align-items:center;justify-content:center;font-size:44px}
.blog-body{padding:18px}
.blog-tag{display:inline-block;background:var(--g100);color:var(--bleu);font-size:10.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 9px;border-radius:100px;margin-bottom:9px}
.blog-t{font-weight:700;font-size:14px;color:var(--g900);margin-bottom:7px;line-height:1.4}
.blog-ex{font-size:12.5px;color:var(--g600);line-height:1.6;margin-bottom:12px}
.blog-meta{font-size:11.5px;color:var(--g600)}

/* CONTACT */
.contact-sec{padding:72px 0;background:var(--g50)}
.contact-in{max-width:1280px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1fr 1.3fr;gap:60px;align-items:start}
.ct-inf h2{font-family:'Poppins',sans-serif;font-size:28px;font-weight:700;color:var(--g900);margin-bottom:14px;line-height:1.3}
.ct-inf h2 em{color:var(--vert3);font-style:normal}
.ct-inf p{font-size:14.5px;color:var(--g600);line-height:1.75;margin-bottom:28px}
.ct-dets{display:flex;flex-direction:column;gap:14px}
.ct-det{display:flex;align-items:flex-start;gap:13px}
.ct-ico{width:42px;height:42px;border-radius:11px;background:var(--bleu);color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.ct-lbl{font-size:10.5px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--g600);margin-bottom:1px}
.ct-val{font-size:14px;font-weight:500;color:var(--g900)}
.ct-form{background:#fff;border-radius:18px;padding:32px;box-shadow:var(--sh);border:1px solid var(--g200)}
.ct-form-t{font-family:'Poppins',sans-serif;font-size:18px;font-weight:700;color:var(--g900);margin-bottom:22px}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fg{margin-bottom:14px;display:flex;flex-direction:column;gap:5px}
.fg label{font-size:12.5px;font-weight:600;color:var(--g700)}
.fg input,.fg textarea,.fg select{padding:11px 14px;border-radius:9px;border:1.5px solid var(--g200);font-size:13.5px;color:var(--g900);font-family:inherit;transition:var(--tr);background:#fff;width:100%;resize:none}
.fg input:focus,.fg textarea:focus,.fg select:focus{outline:none;border-color:var(--bleu);box-shadow:0 0 0 3px rgba(13,43,110,.1)}
.fg textarea{height:110px}
.btn-send{width:100%;padding:14px;background:var(--bleu);color:#fff;border:none;border-radius:9px;font-weight:700;font-size:14.5px;cursor:pointer;transition:var(--tr);display:flex;align-items:center;justify-content:center;gap:8px}
.btn-send:hover{background:var(--bleu2);transform:translateY(-2px)}
.btn-send:disabled{opacity:.65;cursor:not-allowed;transform:none}
.form-ok{background:#e8f5e9;border:1px solid var(--vert3);color:var(--vert);padding:13px 16px;border-radius:9px;font-size:13.5px;font-weight:500;margin-top:12px;display:flex;align-items:center;gap:8px}

/* FOOTER */
.footer{background:var(--navy);color:rgba(255,255,255,.78);padding:60px 0 0}
.ft-in{max-width:1280px;margin:0 auto;padding:0 24px 44px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;border-bottom:1px solid rgba(255,255,255,.1)}
.ft-logo .logo-n{color:#fff;font-size:15px}
.ft-logo .logo-s{color:var(--accent)}
.ft-desc{font-size:13px;line-height:1.75;margin:14px 0 20px;opacity:.72}
.ft-soc{display:flex;gap:9px}
.ft-soc a{width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;transition:var(--tr)}
.ft-soc a:hover{background:var(--accent)}
.ft-col h4{font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;margin-bottom:16px}
.ft-col ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.ft-col ul li{font-size:13px;opacity:.68;cursor:pointer;transition:var(--tr);display:flex;align-items:center;gap:5px}
.ft-col ul li:hover{opacity:1;color:var(--accent)}
.ft-col ul li::before{content:'→';font-size:10px;flex-shrink:0}
.ft-bot{max-width:1280px;margin:0 auto;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;font-size:12.5px;opacity:.55;flex-wrap:wrap;gap:8px}

/* CART */
.cart-ov{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1100;opacity:0;visibility:hidden;transition:var(--tr)}
.cart-ov.open{opacity:1;visibility:visible}
.cart-pan{position:fixed;top:0;right:0;bottom:0;width:370px;max-width:100vw;background:#fff;z-index:1101;transform:translateX(100%);transition:transform .3s ease;display:flex;flex-direction:column;box-shadow:-8px 0 32px rgba(0,0,0,.15)}
.cart-ov.open .cart-pan{transform:translateX(0)}
.cart-hd{padding:18px 22px;border-bottom:1px solid var(--g200);display:flex;align-items:center;justify-content:space-between}
.cart-hd h3{font-weight:700;font-size:17px;color:var(--g900)}
.cart-x{width:34px;height:34px;border-radius:50%;background:var(--g100);border:none;cursor:pointer;font-size:17px;display:flex;align-items:center;justify-content:center;color:var(--g700)}
.cart-body{flex:1;overflow-y:auto;padding:18px 22px}
.cart-empty{text-align:center;color:var(--g600);padding:44px 0;font-size:14px}
.ci{display:flex;gap:11px;padding:12px 0;border-bottom:1px solid var(--g100);align-items:center}
.ci-ico{width:44px;height:44px;background:var(--g100);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.ci-inf{flex:1}
.ci-nm{font-size:13.5px;font-weight:600;color:var(--g900);margin-bottom:3px}
.ci-q{font-size:11.5px;color:var(--g600)}
.ci-rm{background:none;border:none;cursor:pointer;color:var(--g600);font-size:15px;padding:4px}
.ci-rm:hover{color:#dc2626}
.cart-ft{padding:16px 22px;border-top:1px solid var(--g200)}
.cart-ft-btn{width:100%;padding:13px;background:var(--bleu);color:#fff;border:none;border-radius:9px;font-weight:700;font-size:14px;cursor:pointer;transition:var(--tr)}
.cart-ft-btn:hover{background:var(--bleu2)}

/* AI */
.ai-fl{position:fixed;bottom:88px;right:22px;z-index:900}
.ai-tog{width:50px;height:50px;border-radius:50%;background:var(--bleu);color:#fff;border:none;cursor:pointer;font-size:21px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(13,43,110,.35);transition:var(--tr)}
.ai-tog:hover{background:var(--bleu2);transform:scale(1.08)}
.ai-win{position:absolute;bottom:62px;right:0;width:330px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.18);border:1px solid var(--g200);overflow:hidden;opacity:0;visibility:hidden;transform:translateY(10px) scale(.95);transition:var(--tr)}
.ai-win.open{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
.ai-hd{background:var(--bleu);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:9px}
.ai-av{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:17px}
.ai-nm{font-weight:700;font-size:13.5px}
.ai-st{font-size:10.5px;opacity:.8}
.ai-cx{background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:17px;margin-left:auto}
.ai-msgs{height:250px;overflow-y:auto;padding:13px;display:flex;flex-direction:column;gap:9px;background:var(--g50)}
.ai-msg{max-width:84%;padding:9px 13px;border-radius:11px;font-size:12.5px;line-height:1.55}
.ai-msg.bot{background:#fff;color:var(--g900);border:1px solid var(--g200);align-self:flex-start;border-bottom-left-radius:3px}
.ai-msg.user{background:var(--bleu);color:#fff;align-self:flex-end;border-bottom-right-radius:3px}
.ai-typ{display:flex;gap:4px;align-items:center;padding:9px 13px;background:#fff;border:1px solid var(--g200);border-radius:11px;align-self:flex-start;width:fit-content}
.ai-typ span{width:5px;height:5px;border-radius:50%;background:var(--g600);animation:bp 1.2s ease infinite}
.ai-typ span:nth-child(2){animation-delay:.2s}
.ai-typ span:nth-child(3){animation-delay:.4s}
@keyframes bp{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
.ai-ir{display:flex;gap:7px;padding:11px 13px;border-top:1px solid var(--g200);background:#fff}
.ai-inp{flex:1;padding:9px 13px;border-radius:9px;border:1.5px solid var(--g200);font-size:12.5px;font-family:inherit;color:var(--g900)}
.ai-inp:focus{outline:none;border-color:var(--bleu)}
.ai-snd{width:36px;height:36px;border-radius:9px;background:var(--bleu);color:#fff;border:none;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ai-snd:disabled{opacity:.5;cursor:not-allowed}

/* WA */
.wa-fl{position:fixed;bottom:22px;right:22px;z-index:900}
.wa-btn{width:54px;height:54px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(37,211,102,.42);text-decoration:none;transition:var(--tr);position:relative}
.wa-btn:hover{background:#128C7E;transform:scale(1.08)}
.wa-pulse{position:absolute;inset:0;border-radius:50%;background:#25D366;animation:pls 2s ease infinite;z-index:-1}
@keyframes pls{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.8)}}

/* TOASTS */
.toast-wr{position:fixed;bottom:96px;right:22px;z-index:2000;display:flex;flex-direction:column;gap:9px;align-items:flex-end}
.toast{background:var(--g900);color:#fff;padding:11px 16px;border-radius:9px;font-size:13px;font-weight:500;display:flex;align-items:center;gap:7px;box-shadow:0 4px 18px rgba(0,0,0,.2);animation:sli .3s ease;max-width:300px;border-left:3px solid var(--vert3)}
@keyframes sli{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}

/* ADMIN */
.adm-wrap{min-height:100vh;background:var(--g50);padding:36px 22px;font-family:inherit}
.adm-card{max-width:780px;margin:0 auto;background:#fff;border-radius:18px;box-shadow:var(--sh);overflow:hidden}
.adm-hd{background:var(--bleu);color:#fff;padding:26px 32px;display:flex;align-items:center;gap:14px}
.adm-hd h1{font-size:21px;font-weight:700}
.adm-bd{padding:32px}
.adm-sec{margin-bottom:36px}
.adm-sec h2{font-size:16px;font-weight:700;color:var(--g900);margin-bottom:18px;padding-bottom:9px;border-bottom:2px solid var(--g200)}
.bpi{border:1px solid var(--g200);border-radius:11px;padding:14px;margin-bottom:11px;display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
.bpi-m{font-size:11.5px;color:var(--g600);margin-top:3px}
.btn-del{background:#fee2e2;color:#dc2626;border:none;border-radius:7px;padding:7px 13px;font-size:12.5px;font-weight:600;cursor:pointer}
.btn-grn{background:var(--vert);color:#fff;border:none;border-radius:7px;padding:9px 17px;font-size:12.5px;font-weight:600;cursor:pointer}

/* RESPONSIVE */
@media(max-width:1024px){
  .svc-grid{grid-template-columns:repeat(2,1fr)}
  .adv-grid{grid-template-columns:repeat(2,1fr)}
  .ft-in{grid-template-columns:1fr 1fr}
  .blog-grid{grid-template-columns:repeat(2,1fr)}
  .real-grid{grid-template-columns:repeat(2,1fr)}
  .prod-card{width:calc((100% - 3*16px)/4)}
}
@media(max-width:768px){
  .nb-links,.nb-cta{display:none!important}
  .burger{display:flex}
  .hero-in{grid-template-columns:1fr}
  .hero-visual{height:260px;order:-1}
  .badge15{right:14px;bottom:14px}
  .stats-in{grid-template-columns:repeat(2,1fr)}
  .svc-grid{grid-template-columns:1fr 1fr}
  .adv-grid{grid-template-columns:1fr 1fr}
  .contact-in{grid-template-columns:1fr}
  .ft-in{grid-template-columns:1fr 1fr;gap:28px}
  .blog-grid{grid-template-columns:1fr}
  .real-grid{grid-template-columns:1fr}
  .frow{grid-template-columns:1fr}
  .tb{display:none}
  .prod-card{width:calc((100% - 2*16px)/3)}
}
@media(max-width:480px){
  .stats-in{grid-template-columns:repeat(2,1fr)}
  .svc-grid{grid-template-columns:1fr}
  .adv-grid{grid-template-columns:1fr}
  .ft-in{grid-template-columns:1fr}
  .prod-card{width:calc((100% - 16px)/2)}
}
`;

/* ── DATA ── */
const SERVICES = [
  {id:1,emoji:"💧",color:"#0d2b6e",bg:"#e8f0fe",title:"Traitement des eaux",items:["STEP & Stations d'épuration","Eau potable & industrielle","Eaux usées & effluents"],img:"/Step-traitement.jpg.jpeg"},
  {id:2,emoji:"🧪",color:"#1b7a3e",bg:"#e8f5e9",title:"Analyses environnementales",items:["Eau, Sol, Air, Boues","Analyses physico-chimiques","Normes NM / ISO"],img:"/Laboratoire-uem.jpg.jpeg"},
  {id:3,emoji:"⚗️",color:"#7b1fa2",bg:"#f3e5f5",title:"Produits chimiques",items:["Réactifs de laboratoire","Coagulants, floculants, biocides","Produits de traitement des eaux"],img:null},
  {id:4,emoji:"⚙️",color:"#e65100",bg:"#fff3e0",title:"Équipements & Osmoseurs",items:["Osmoseurs industriels & domestiques","Adoucisseurs, filtres, pompes","Instrumentation & accessoires"],img:null},
  {id:5,emoji:"📐",color:"#f57c00",bg:"#fff8e1",title:"Ingénierie & Conception",items:["Études & Conception STEP","Installation & Mise en service","Suivi & Optimisation"],img:"/mesure-site.jpg.jpeg"},
  {id:6,emoji:"🌿",color:"#2e7d32",bg:"#e8f5e9",title:"Environnement & HSE",items:["Études d'impact & Audits","ISO 14001 – Management env.","Conseil HSE & Conformité"],img:"/analyse -terrain.jpg.jpeg"},
  {id:7,emoji:"🎓",color:"#f9a825",bg:"#fffde7",title:"Formation & Sensibilisation",items:["Formation HSE","Traitement des eaux","Laboratoire & Environnement"],img:null},
  {id:8,emoji:"🔧",color:"#0277bd",bg:"#e1f5fe",title:"Maintenance & SAV",items:["Maintenance préventive & corrective","Contrats annuels","Assistance technique 7/7"],img:"/mesure-bruit.jpg.jpeg"}
];

const PRODUCTS = [
  {id:1,emoji:"🧫",title:"Réactifs de laboratoire",img:null},
  {id:2,emoji:"🛢️",title:"Produits chimiques eaux",img:null},
  {id:3,emoji:"💠",title:"Osmoseurs industriels",img:"/osmoseur-grand.webp"},
  {id:4,emoji:"🏠",title:"Osmoseurs domestiques",img:"/osmoseur-petit.webp"},
  {id:5,emoji:"🔵",title:"Adoucisseurs d'eau",img:null},
  {id:6,emoji:"📦",title:"Consommables & accessoires",img:null},
  {id:7,emoji:"⚗️",title:"Produits HSE & sécurité",img:null},
  {id:8,emoji:"🔬",title:"Équipements de mesure",img:null}
];

const CLIENTS = [
  {name:"OCP",color:"#00873E"},{name:"acciona",color:"#004B9B"},
  {name:"ONCF",color:"#E30613"},{name:"ONEE",color:"#0055A5"},
  {name:"SOMAGEC",color:"#F7941D"},{name:"JESA",color:"#00A79D"}
];

const TICKER = ["💧 Osmoseurs industriels 500L/h à 10m³/h","⚗️ Réactifs chimiques certifiés — Livraison 24h","🔬 Analyses eau & sol NM/ISO — El Jadida","📋 Formulations numériques — Accès immédiat","🏗️ +200 projets STEP au Maroc","🇲🇦 Entreprise 100% marocaine — 15 ans d'expertise"];

const ADVANTAGES = [
  {icon:"✅",title:"Qualité certifiée",desc:"Produits & services conformes aux normes NM, ISO et STEP"},
  {icon:"🎯",title:"Solutions sur mesure",desc:"Études personnalisées adaptées à chaque contexte industriel"},
  {icon:"💡",title:"Innovation continue",desc:"Technologies modernes et performantes pour vos défis environnementaux"},
  {icon:"🤝",title:"Accompagnement global",desc:"De l'étude à la maintenance, on reste à vos côtés à chaque étape"}
];

const HERO_SLIDES = [
  {bg:"linear-gradient(135deg,#0d2b6e,#1565c0 50%,#1b7a3e)",emoji:"💧",img:"/Step-traitement.jpg.jpeg"},
  {bg:"linear-gradient(135deg,#1b7a3e,#43a047 50%,#0d2b6e)",emoji:"🏭",img:"/bassin-desinfection.jpg.jpeg"},
  {bg:"linear-gradient(135deg,#0a1f4e,#1565c0)",emoji:"⚗️",img:"/Laboratoire-uem.jpg.jpeg"}
];

const REALISATIONS = [
  {id:1,img:"/Step-traitement.jpg.jpeg",titre:"Station d'Épuration — Industrie Agroalimentaire",lieu:"Meknès",cat:"STEP",tags:["STEP","Coagulation","Floculation"]},
  {id:2,img:"/bassin-desinfection.jpg.jpeg",titre:"Optimisation Filière Biologique STEP",lieu:"El Jadida",cat:"Optimisation",tags:["Audit","Optimisation"]},
  {id:3,img:"/prélevement-eau de mer.jpg.jpeg",titre:"Bilan Environnemental Rejet Industriel",lieu:"Côte Atlantique",cat:"Analyse",tags:["Bilan","NM/ISO"]},
  {id:4,img:"/analyse -terrain.jpg.jpeg",titre:"Analyse Qualité Eau de Puits",lieu:"Province de Settat",cat:"Analyse",tags:["Eau potable","Bactériologie"]},
  {id:5,img:"/mesure-site.jpg.jpeg",titre:"Mesures Atmosphériques STEP",lieu:"Ouarzazate",cat:"Analyse",tags:["Atmosphérique","H₂S"]},
  {id:6,img:"/Laboratoire-uem.jpg.jpeg",titre:"Développement Laboratoire d'Analyse",lieu:"El Jadida",cat:"Laboratoire",tags:["Laboratoire","ISO"]}
];

const ARTICLES_DEFAULT = [
  {id:"d1",titre:"Traitement des eaux usées industrielles : nouvelles normes NM 2024",resume:"Les dernières mises à jour des normes marocaines pour le traitement des eaux industrielles.",date:"Juin 2024",cat:"Réglementation",emoji:"📋"},
  {id:"d2",titre:"Osmoseur industriel : comment choisir la bonne solution ?",resume:"Guide complet pour sélectionner un système d'osmose inverse adapté à vos besoins.",date:"Mai 2024",cat:"Guide",emoji:"💧"},
  {id:"d3",titre:"HSE au Maroc : obligations et bonnes pratiques pour les industriels",resume:"Tour d'horizon des obligations HSE en vigueur et des meilleures pratiques.",date:"Avril 2024",cat:"HSE",emoji:"🦺"}
];

/* ── APP ── */
export default function App() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMsgs, setAiMsgs] = useState([{role:"bot",text:"Bonjour ! Je suis l'assistant UEM. Comment puis-je vous aider ?"}]);
  const [aiInp, setAiInp] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [carOff, setCarOff] = useState(0);
  const [mobOpen, setMobOpen] = useState(false);
  const [blogs, setBlogs] = useState(() => {try{return JSON.parse(localStorage.getItem("uem_blogs")||"[]")}catch{return []}});
  const [blogForm, setBlogForm] = useState({title:"",excerpt:"",category:"Actualités",emoji:"📰"});
  const [form, setForm] = useState({name:"",email:"",company:"",service:"",message:""});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const aiRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("uem-css")) {
      const s = document.createElement("style");
      s.id = "uem-css"; s.textContent = CSS;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i+1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {if(aiRef.current) aiRef.current.scrollTop = aiRef.current.scrollHeight}, [aiMsgs, aiLoad]);
  useEffect(() => {localStorage.setItem("uem_blogs", JSON.stringify(blogs))}, [blogs]);

  const toast = useCallback((msg, icon="✅") => {
    const id = Date.now();
    setToasts(t => [...t, {id,msg,icon}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const addCart = useCallback((item) => {
    setCart(c => {const ex=c.find(x=>x.id===item.id); if(ex) return c.map(x=>x.id===item.id?{...x,qty:x.qty+1}:x); return [...c,{...item,qty:1}];});
    toast(`${item.emoji} ${item.title} ajouté au panier`);
  }, [toast]);

  const sendAI = useCallback(async () => {
    if (!aiInp.trim() || aiLoad) return;
    const msg = aiInp.trim(); setAiInp("");
    setAiMsgs(m => [...m, {role:"user",text:msg}]);
    setAiLoad(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,
          system:"Tu es l'assistant expert d'UEM (Univers Environnement Maroc), El Jadida. Osmoseurs 500L/h à 10m³/h (48 000 à 230 000 MAD), réactifs chimiques (PAC, chlorure ferrique, floculants, anti-scalant), analyses NM/ISO, conception STEP. Réponds en français, concis (max 3 phrases). Contact : +212 523 37 74 17.",
          messages:[{role:"user",content:msg}]})
      });
      const d = await res.json();
      setAiMsgs(m => [...m, {role:"bot",text:d?.content?.[0]?.text||"Contactez-nous au +212 523 37 74 17."}]);
    } catch { setAiMsgs(m => [...m, {role:"bot",text:"Erreur. Contactez-nous au +212 523 37 74 17."}]); }
    setAiLoad(false);
  }, [aiInp, aiLoad]);

  const handleSubmit = async () => {
    if (!form.name||!form.email||!form.message) {toast("Veuillez remplir tous les champs requis.","⚠️"); return;}
    setSending(true);
    try {
      await emailjs.send("service_3p09q76","template_1qu65qm",{from_name:form.name,from_email:form.email,company:form.company,service:form.service,message:form.message},"bhR3gf_SYQEaKSOky");
      setSent(true); setForm({name:"",email:"",company:"",service:"",message:""});
      toast("Message envoyé ! Nous vous répondons sous 24h.");
    } catch { toast("Erreur d'envoi. Contactez-nous au +212 523 37 74 17","❌"); }
    setSending(false);
  };

  const scrollTo = (id) => {document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMobOpen(false);};

  if (page === "admin") return <AdminPage auth={adminAuth} pwd={adminPwd} setPwd={setAdminPwd} setAuth={setAdminAuth} blogs={blogs} setBlogs={setBlogs} blogForm={blogForm} setBlogForm={setBlogForm} setPage={setPage} toast={toast}/>;

  return (
    <div>
      {/* TOPBAR */}
      <div className="tb">
        <div className="tb-in">
          <div className="tb-l">
            <a className="tb-a" href="tel:+212523377417">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.55 2.18 2 2 0 012.55 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              +212 523 37 74 17
            </a>
            <a className="tb-a" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              +212 700 090 365
            </a>
            <span className="tb-a">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              N°1, Bd Jabrane Khalil Jabrane, El Jadida
            </span>
            <a className="tb-a" href="mailto:univers.env@gmail.com">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              univers.env@gmail.com
            </a>
          </div>
          <div className="tb-soc">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><svg width="12" height="12" fill="white" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#0a1f4e" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg></a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="nb">
        <div className="nb-in">
          <div className="logo" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
            <div className="logo-sq">UE</div>
            <div className="logo-tx">
              <span className="logo-n">Univers Environnement</span>
              <span className="logo-s">MAROC – EL JADIDA</span>
            </div>
          </div>
          <ul className="nb-links">
            <li className="nb-item"><button className="nb-btn on" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>Accueil</button></li>
            <li className="nb-item"><button className="nb-btn">À propos</button></li>
            <li className="nb-item">
              <button className="nb-btn">Nos services <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>
              <div className="dd">
                {SERVICES.map(s => (
                  <a key={s.id} href="#services" onClick={e=>{e.preventDefault();scrollTo("services")}}>
                    <span className="dd-ico" style={{background:s.bg,color:s.color}}>{s.emoji}</span>{s.title}
                  </a>
                ))}
              </div>
            </li>
            <li className="nb-item">
              <button className="nb-btn">Nos produits <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>
              <div className="dd">
                {PRODUCTS.map(p => (
                  <a key={p.id} href="#products" onClick={e=>{e.preventDefault();scrollTo("products")}}>
                    <span className="dd-ico">{p.emoji}</span>{p.title}
                  </a>
                ))}
              </div>
            </li>
            <li className="nb-item"><button className="nb-btn" onClick={() => scrollTo("realisations")}>Nos réalisations</button></li>
            <li className="nb-item"><button className="nb-btn" onClick={() => scrollTo("blog")}>Actualités</button></li>
            <li className="nb-item"><button className="nb-btn" onClick={() => scrollTo("contact")}>Contact</button></li>
          </ul>
          <button style={{background:"none",border:"none",cursor:"pointer",padding:"8px",display:"flex",alignItems:"center",gap:4,color:"var(--g700)",fontSize:13,fontFamily:"inherit",fontWeight:500}} onClick={() => setCartOpen(true)}>
            🛒 {cart.length > 0 && <span style={{background:"var(--accent)",color:"#fff",borderRadius:"50%",width:17,height:17,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{cart.length}</span>}
          </button>
          <button className="nb-cta" onClick={() => scrollTo("contact")}>Demander un devis</button>
          <button className="burger" onClick={() => setMobOpen(o => !o)}><span/><span/><span/></button>
        </div>
        <div className={`mob-menu${mobOpen?" open":""}`}>
          <button onClick={() => {window.scrollTo({top:0,behavior:"smooth"});setMobOpen(false);}}>Accueil</button>
          <button onClick={() => scrollTo("services")}>Nos services</button>
          <button onClick={() => scrollTo("products")}>Nos produits</button>
          <button onClick={() => scrollTo("realisations")}>Nos réalisations</button>
          <button onClick={() => scrollTo("blog")}>Actualités</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
          <button onClick={() => {setPage("admin");setMobOpen(false);}}>Administration</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-in">
          <div>
            <div className="hero-tag">L'expertise verte au service du Maroc</div>
            <h1>Votre partenaire de référence en <span className="hl-b">environnement</span>, <span className="hl-b">traitement des eaux</span>, <span className="hl-g">analyses</span>, <span className="hl-g">produits chimiques</span> et <span className="hl-a">équipements</span> au Maroc.</h1>
            <p className="hero-desc">Plus de 15 ans d'expertise au service des industriels, collectivités et laboratoires avec des solutions innovantes, conformes aux normes marocaines et internationales.</p>
            <div className="hero-btns">
              <button className="btn-p" onClick={() => scrollTo("contact")}>Demander un devis gratuit →</button>
              <button className="btn-o" onClick={() => scrollTo("realisations")}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
                Voir nos réalisations
              </button>
              <a className="btn-wa" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Parler à un expert
              </a>
            </div>
            <div className="hero-trust">
              {[{i:"⏱️",t:"Réponse – Moins de 24h"},{i:"🏅",t:"Experts certifiés"},{i:"📋",t:"Normes NM / ISO / STEP"},{i:"🚀",t:"Partout au Maroc"}].map((x,i) => (
                <div className="tr-item" key={i}><span>{x.i}</span>{x.t}</div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="slider">
              {HERO_SLIDES.map((s,i) => (
                <div key={i} className={`slide${i===slideIdx?" active":""}`} style={{background:s.bg}}>
                  {s.img ? <img src={s.img} alt="UEM" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.6}}/> : null}
                  <div className="slide-ov"/>
                  {!s.img && <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:110,opacity:.18}}>{s.emoji}</div>}
                </div>
              ))}
              <div className="slide-dots">
                {HERO_SLIDES.map((_,i) => <button key={i} className={`sd${i===slideIdx?" on":""}`} onClick={() => setSlideIdx(i)}/>)}
              </div>
            </div>
            <div className="badge15">
              <div className="b15-n">15<span className="b15-s">+</span></div>
              <div className="b15-l">ANS<br/>D'EXPÉRIENCE<br/>AU MAROC</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stats-in">
          {[{i:"🏆",n:"15+",l:"Ans d'expérience"},{i:"📁",n:"200+",l:"Projets réalisés"},{i:"👥",n:"500+",l:"Clients satisfaits"},{i:"⭐",n:"98%",l:"Taux de satisfaction"}].map((s,i) => (
            <div className="stat" key={i}>
              <div className="stat-n"><span className="stat-ico">{s.i}</span>{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CLIENTS */}
      <div className="clients">
        <div className="cl-in">
          <div className="cl-ttl">Ils nous font confiance</div>
          <div className="cl-logos">
            {CLIENTS.map((c,i) => (
              <div key={i} className="cl-logo" style={{color:c.color}}>
                <span className="cl-dot" style={{background:c.color}}/>
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="sec sec-bg" id="services">
        <div className="sec-in">
          <div className="sec-ey">NOS DOMAINES D'EXPERTISE</div>
          <h2 className="sec-ti">Des solutions <em>complètes</em> pour l'eau, l'environnement et l'industrie</h2>
          <div className="svc-grid">
            {SERVICES.map(s => (
              <div className="svc-card" key={s.id}>
                <div className="svc-ph" style={{background:`linear-gradient(135deg,${s.color}22,${s.color}44)`}}>
                  {s.img ? <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <span style={{fontSize:44}}>{s.emoji}</span>}
                </div>
                <div className="svc-body">
                  <div className="svc-hd">
                    <div className="svc-ico" style={{background:s.bg,color:s.color}}>{s.emoji}</div>
                    <div className="svc-nt">{s.title}</div>
                  </div>
                  <ul className="svc-ul">{s.items.map((it,j) => <li key={j}>{it}</li>)}</ul>
                  <button className="svc-lnk">Découvrir →</button>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-c"><button className="btn-nv">Voir tous nos services →</button></div>
        </div>
      </section>

      {/* CAROUSEL PRODUITS */}
      <section className="prod-sec" id="products">
        <div className="prod-in">
          <div className="sec-ey">NOS PRODUITS PHARES</div>
          <h2 className="sec-ti">Des produits de qualité pour des performances durables</h2>
          <div className="car-wrap">
            <button className="car-arr l" onClick={() => setCarOff(o => Math.max(0,o-1))}>‹</button>
            <div className="car-tr">
              {PRODUCTS.slice(carOff).concat(PRODUCTS.slice(0,carOff)).map(p => (
                <div className="prod-card" key={p.id} onClick={() => addCart(p)}>
                  {p.img ? <img className="pc-img" src={p.img} alt={p.title}/> : <div className="pc-ph">{p.emoji}</div>}
                  <div className="pc-body"><div className="pc-t">{p.title}</div></div>
                </div>
              ))}
            </div>
            <button className="car-arr r" onClick={() => setCarOff(o => Math.min(2,o+1))}>›</button>
          </div>
          <div className="prod-btn" style={{marginTop:16}}><button className="btn-ow">Voir tous nos produits →</button></div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="sec">
        <div className="sec-in">
          <h2 className="sec-ti">Pourquoi choisir <em>UEM</em> ?</h2>
          <div className="adv-grid">
            {ADVANTAGES.map((a,i) => (
              <div className="adv-card" key={i}>
                <div className="adv-ico">{a.icon}</div>
                <div className="adv-t">{a.title}</div>
                <div className="adv-d">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-in">
          {[...TICKER,...TICKER].map((item,i) => <span key={i} className="tick-item"><span className="tick-dot"/>{item}</span>)}
        </div>
      </div>

      {/* RÉALISATIONS */}
      <section className="sec sec-bg" id="realisations">
        <div className="sec-in">
          <div className="sec-ey">NOS RÉALISATIONS</div>
          <h2 className="sec-ti">Projets réalisés <em>au Maroc</em></h2>
          <div className="real-grid">
            {REALISATIONS.map(r => (
              <div className="real-card" key={r.id}>
                <div className="real-img">
                  <img src={r.img} alt={r.titre} onError={e => {e.target.style.display="none";e.target.parentNode.style.background="linear-gradient(135deg,var(--bleu),var(--bleu2))";}}/>
                  <span className="real-cat">{r.cat}</span>
                </div>
                <div className="real-body">
                  <div className="real-lieu">📍 {r.lieu}</div>
                  <div className="real-t">{r.titre}</div>
                  <div className="real-tags">{r.tags.map((t,i) => <span key={i} className="real-tag">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-c" style={{marginTop:36}}><button className="btn-nv">Voir toutes nos réalisations →</button></div>
        </div>
      </section>

      {/* BLOG */}
      <section className="sec" id="blog">
        <div className="sec-in">
          <div className="sec-ey">ACTUALITÉS & BLOG</div>
          <h2 className="sec-ti">Nos dernières <em>publications</em></h2>
          <div className="blog-grid">
            {[...ARTICLES_DEFAULT,...blogs].slice(0,6).map(post => (
              <div className="blog-card" key={post.id}>
                <div className="blog-img">{post.emoji}</div>
                <div className="blog-body">
                  <span className="blog-tag">{post.cat||post.category}</span>
                  <div className="blog-t">{post.titre||post.title}</div>
                  <div className="blog-ex">{post.resume||post.excerpt}</div>
                  <div className="blog-meta">📅 {post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-sec" id="contact">
        <div className="contact-in">
          <div className="ct-inf">
            <h2>Demandez votre <em>devis gratuit</em> dès aujourd'hui</h2>
            <p>Notre équipe d'experts vous répond en moins de 24 heures avec une solution adaptée à vos besoins et votre budget.</p>
            <div className="ct-dets">
              {[{i:"📞",l:"Téléphone",v:"+212 523 37 74 17"},{i:"📱",l:"WhatsApp",v:"+212 700 090 365"},{i:"✉️",l:"Email",v:"univers.env@gmail.com"},{i:"📍",l:"Adresse",v:"N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc"}].map((d,i) => (
                <div className="ct-det" key={i}>
                  <div className="ct-ico">{d.i}</div>
                  <div><div className="ct-lbl">{d.l}</div><div className="ct-val">{d.v}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="ct-form">
            <div className="ct-form-t">📋 Formulaire de contact</div>
            <div className="frow">
              <div className="fg"><label>Nom complet *</label><input placeholder="Votre nom" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div className="fg"><label>Email *</label><input type="email" placeholder="votre@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
            </div>
            <div className="frow">
              <div className="fg"><label>Entreprise</label><input placeholder="Nom de votre société" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))}/></div>
              <div className="fg"><label>Service souhaité</label>
                <select value={form.service} onChange={e=>setForm(f=>({...f,service:e.target.value}))}>
                  <option value="">Sélectionner...</option>
                  {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
            </div>
            <div className="fg"><label>Votre message *</label><textarea placeholder="Décrivez votre besoin..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/></div>
            <button className="btn-send" onClick={handleSubmit} disabled={sending}>{sending?"⏳ Envoi en cours...":"Envoyer ma demande →"}</button>
            {sent && <div className="form-ok">✅ Message envoyé ! Nous vous répondons sous 24h.</div>}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="ft-in">
          <div className="ft-logo">
            <div className="logo"><div className="logo-sq">UE</div><div className="logo-tx"><span className="logo-n">Univers Environnement</span><span className="logo-s">MAROC – EL JADIDA</span></div></div>
            <p className="ft-desc">Spécialiste marocain en traitement des eaux, analyses environnementales, produits chimiques et équipements depuis plus de 15 ans. Basé à El Jadida, au service de tout le Maroc.</p>
            <div className="ft-soc">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#0a1f4e" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg></a>
            </div>
          </div>
          <div className="ft-col"><h4>Nos services</h4><ul>{SERVICES.slice(0,5).map(s => <li key={s.id}>{s.title}</li>)}</ul></div>
          <div className="ft-col"><h4>Nos produits</h4><ul>{PRODUCTS.slice(0,5).map(p => <li key={p.id}>{p.title}</li>)}</ul></div>
          <div className="ft-col">
            <h4>Informations</h4>
            <ul>
              <li onClick={() => scrollTo("contact")}>Contact</li>
              <li onClick={() => scrollTo("blog")}>Actualités</li>
              <li onClick={() => scrollTo("realisations")}>Réalisations</li>
              <li onClick={() => setPage("admin")}>Administration</li>
            </ul>
            <div style={{marginTop:20,fontSize:13,opacity:.75,lineHeight:1.9}}>
              <div style={{fontSize:11,opacity:.7,marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>Horaires</div>
              <div>Lun – Ven : 8h30 – 18h00</div>
              <div>Sam : 9h00 – 13h00</div>
            </div>
          </div>
        </div>
        <div className="ft-bot">
          <span>© {new Date().getFullYear()} Univers Environnement Maroc – Tous droits réservés</span>
          <span>N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc</span>
        </div>
      </footer>

      {/* CART */}
      <div className={`cart-ov${cartOpen?" open":""}`} onClick={() => setCartOpen(false)}>
        <div className="cart-pan" onClick={e => e.stopPropagation()}>
          <div className="cart-hd"><h3>🛒 Panier ({cart.length})</h3><button className="cart-x" onClick={() => setCartOpen(false)}>✕</button></div>
          <div className="cart-body">
            {cart.length===0 ? <div className="cart-empty"><div style={{fontSize:44,marginBottom:11}}>🛒</div><p>Votre panier est vide</p></div>
            : cart.map(item => (
              <div className="ci" key={item.id}>
                <div className="ci-ico">{item.emoji}</div>
                <div className="ci-inf"><div className="ci-nm">{item.title}</div><div className="ci-q">Qté: {item.qty}</div></div>
                <button className="ci-rm" onClick={() => setCart(c => c.filter(x => x.id!==item.id))}>🗑️</button>
              </div>
            ))}
          </div>
          {cart.length>0 && <div className="cart-ft"><button className="cart-ft-btn" onClick={() => {toast("Demande de devis envoyée !","📩");setCartOpen(false);}}>Demander un devis →</button></div>}
        </div>
      </div>

      {/* AI */}
      <div className="ai-fl">
        <div className={`ai-win${aiOpen?" open":""}`}>
          <div className="ai-hd">
            <div className="ai-av">🤖</div>
            <div><div className="ai-nm">Assistant UEM</div><div className="ai-st">● En ligne</div></div>
            <button className="ai-cx" onClick={() => setAiOpen(false)}>✕</button>
          </div>
          <div className="ai-msgs" ref={aiRef}>
            {aiMsgs.map((m,i) => <div key={i} className={`ai-msg ${m.role}`}>{m.text}</div>)}
            {aiLoad && <div className="ai-typ"><span/><span/><span/></div>}
          </div>
          <div className="ai-ir">
            <input className="ai-inp" placeholder="Posez votre question..." value={aiInp} onChange={e => setAiInp(e.target.value)} onKeyDown={e => e.key==="Enter"&&sendAI()}/>
            <button className="ai-snd" onClick={sendAI} disabled={aiLoad||!aiInp.trim()}>➤</button>
          </div>
        </div>
        <button className="ai-tog" onClick={() => setAiOpen(o => !o)} title="Assistant UEM">🤖</button>
      </div>

      {/* WHATSAPP */}
      <div className="wa-fl">
        <a className="wa-btn" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
          <div className="wa-pulse"/>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      {/* TOASTS */}
      <div className="toast-wr">{toasts.map(t => <div key={t.id} className="toast">{t.icon} {t.msg}</div>)}</div>
    </div>
  );
}

function AdminPage({auth,pwd,setPwd,setAuth,blogs,setBlogs,blogForm,setBlogForm,setPage,toast}) {
  if (!auth) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc",fontFamily:"Inter,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:18,padding:"44px 36px",boxShadow:"0 8px 40px rgba(0,0,0,.12)",width:360,textAlign:"center"}}>
        <div style={{fontSize:46,marginBottom:14}}>🔒</div>
        <h2 style={{fontSize:21,fontWeight:700,color:"#0d2b6e",marginBottom:7}}>Administration UEM</h2>
        <p style={{color:"#475569",fontSize:13.5,marginBottom:26}}>Accès réservé à l'équipe UEM</p>
        <input style={{width:"100%",padding:"11px 14px",borderRadius:9,border:"1.5px solid #e2e8f0",fontSize:14,fontFamily:"inherit",marginBottom:14,boxSizing:"border-box"}} type="password" placeholder="Mot de passe" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(pwd==="uem-admin-2026"?setAuth(true):toast("Mot de passe incorrect","❌"))}/>
        <button style={{width:"100%",padding:12,background:"#0d2b6e",color:"#fff",border:"none",borderRadius:9,fontWeight:700,fontSize:14.5,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>pwd==="uem-admin-2026"?setAuth(true):toast("Mot de passe incorrect","❌")}>Se connecter</button>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",marginTop:14,fontSize:13,fontFamily:"inherit"}}>← Retour au site</button>
      </div>
    </div>
  );

  const addBlog = () => {
    if (!blogForm.title||!blogForm.excerpt){toast("Titre et extrait requis","⚠️");return;}
    setBlogs(b=>[{...blogForm,id:Date.now().toString(),date:new Date().toLocaleDateString("fr-FR",{month:"long",year:"numeric"})},...b]);
    setBlogForm({title:"",excerpt:"",category:"Actualités",emoji:"📰"});
    toast("Article publié avec succès !");
  };

  return (
    <div className="adm-wrap">
      <div className="adm-card">
        <div className="adm-hd">
          <span style={{fontSize:26}}>⚙️</span>
          <div><h1>Administration UEM</h1><div style={{fontSize:12.5,opacity:.8,marginTop:2}}>Panneau de gestion du site</div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:9}}>
            <button onClick={()=>setPage("home")} style={{background:"rgba(255,255,255,.2)",color:"#fff",border:"none",borderRadius:7,padding:"7px 14px",fontSize:12.5,cursor:"pointer",fontFamily:"inherit"}}>← Site</button>
            <button onClick={()=>setAuth(false)} style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",borderRadius:7,padding:"7px 14px",fontSize:12.5,cursor:"pointer",fontFamily:"inherit"}}>Déconnexion</button>
          </div>
        </div>
        <div className="adm-bd">
          <div className="adm-sec">
            <h2>📝 Ajouter un article de blog</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
              <div className="fg"><label style={{fontSize:12,fontWeight:600,color:"#334155"}}>Titre *</label><input placeholder="Titre de l'article" value={blogForm.title} onChange={e=>setBlogForm(f=>({...f,title:e.target.value}))}/></div>
              <div className="fg"><label style={{fontSize:12,fontWeight:600,color:"#334155"}}>Catégorie</label>
                <select value={blogForm.category} onChange={e=>setBlogForm(f=>({...f,category:e.target.value}))}>
                  <option>Actualités</option><option>Guide</option><option>Réglementation</option><option>HSE</option><option>Innovation</option>
                </select>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:14,marginBottom:14}}>
              <div className="fg" style={{marginBottom:0}}><label style={{fontSize:12,fontWeight:600,color:"#334155"}}>Extrait *</label><textarea style={{height:75}} placeholder="Résumé de l'article..." value={blogForm.excerpt} onChange={e=>setBlogForm(f=>({...f,excerpt:e.target.value}))}/></div>
              <div className="fg" style={{marginBottom:0}}><label style={{fontSize:12,fontWeight:600,color:"#334155"}}>Emoji</label><input style={{width:65,textAlign:"center",fontSize:22}} value={blogForm.emoji} onChange={e=>setBlogForm(f=>({...f,emoji:e.target.value}))}/></div>
            </div>
            <button className="btn-grn" onClick={addBlog}>Publier l'article →</button>
          </div>
          <div className="adm-sec">
            <h2>📚 Articles publiés ({blogs.length})</h2>
            {blogs.length===0 ? <p style={{color:"#475569",fontSize:13.5}}>Aucun article publié.</p>
            : blogs.map(post => (
              <div className="bpi" key={post.id}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}><span>{post.emoji}</span><strong style={{fontSize:14}}>{post.title}</strong></div>
                  <div className="bpi-m">{post.category} — {post.date}</div>
                </div>
                <button className="btn-del" onClick={()=>{setBlogs(b=>b.filter(x=>x.id!==post.id));toast("Article supprimé","🗑️");}}>Supprimer</button>
              </div>
            ))}
          </div>
          <div className="adm-sec">
            <h2>ℹ️ Informations système</h2>
            <div style={{background:"#f8fafc",borderRadius:11,padding:18,fontSize:13.5,color:"#334155",lineHeight:1.85}}>
              <div><strong>Site :</strong> www.uem.ma</div>
              <div><strong>Stack :</strong> React 18 + Vite + EmailJS</div>
              <div><strong>EmailJS :</strong> service_3p09q76 / template_1qu65qm</div>
              <div><strong>Blog :</strong> {blogs.length} article(s) en localStorage</div>
              <div><strong>Version :</strong> 3.0 — Redesign complet 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
