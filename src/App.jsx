// UEM v4.0 — Site complet avec pages détaillées
import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bleu:#0d2b6e;--bleu2:#1565c0;--vert:#1b7a3e;--vert2:#145f30;--vert3:#43a047;
  --accent:#5cb800;--navy:#0a1f4e;--or:#f59e0b;
  --g50:#f8fafc;--g100:#f1f5f9;--g200:#e2e8f0;--g600:#475569;--g700:#334155;--g900:#0f172a;
  --sh:0 4px 24px rgba(13,43,110,.10);--sh2:0 8px 40px rgba(13,43,110,.18);
  --tr:all .22s cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth;overflow:auto!important;height:auto!important}
body{font-family:'Inter',sans-serif;color:var(--g900);background:#fff;overflow-x:hidden;display:block!important;height:auto!important}
#root{width:100%}
a{text-decoration:none;color:inherit}
img{max-width:100%;display:block}
button{font-family:'Inter',sans-serif}
.tb{background:var(--navy);padding:8px 0;font-size:12.5px;color:rgba(255,255,255,.8)}
.tb-in{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.tb-l{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.tb-a{display:flex;align-items:center;gap:5px;color:rgba(255,255,255,.8);transition:var(--tr);border:none;background:none;cursor:pointer;font-family:inherit;font-size:inherit}
.tb-a:hover{color:var(--accent)}
.tb-soc{display:flex;gap:8px}
.tb-soc a{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;transition:var(--tr)}
.tb-soc a:hover{background:var(--accent)}
.nb{background:#fff;position:sticky;top:0;z-index:1000;box-shadow:0 2px 14px rgba(13,43,110,.08)}
.nb-in{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:24px;height:70px}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0;cursor:pointer}
.logo-sq{width:42px;height:42px;background:var(--bleu);color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-weight:800;font-size:15px}
.logo-img{height:46px;width:auto;object-fit:contain;flex-shrink:0}
.logo-tx{display:flex;flex-direction:column;line-height:1.2}
.logo-n{font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;color:var(--bleu)}
.logo-s{font-size:9px;font-weight:600;color:var(--vert3);letter-spacing:1.5px;text-transform:uppercase}
.nb-links{display:flex;align-items:center;gap:2px;flex:1;list-style:none}
.nb-item{position:relative}
.nb-btn{display:flex;align-items:center;gap:4px;padding:7px 11px;font-size:13px;font-weight:500;color:var(--g700);border-radius:7px;cursor:pointer;transition:var(--tr);border:none;background:none;white-space:nowrap;font-family:inherit}
.nb-btn:hover,.nb-btn.on{color:var(--bleu);background:var(--g100)}
.nb-btn.on{font-weight:600}
.dd{position:absolute;top:calc(100% + 8px);left:0;background:#fff;border-radius:14px;box-shadow:var(--sh2);padding:8px;min-width:240px;opacity:0;visibility:hidden;transform:translateY(-8px);transition:var(--tr);border:1px solid var(--g200);z-index:200}
.nb-item:hover .dd{opacity:1;visibility:visible;transform:translateY(0)}
.dd-btn{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:13px;color:var(--g700);transition:var(--tr);border:none;background:none;width:100%;cursor:pointer;font-family:inherit}
.dd-btn:hover{background:var(--g100);color:var(--bleu)}
.dd-ico{width:30px;height:30px;border-radius:8px;background:var(--g100);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:var(--bleu)}
.nb-cta{background:var(--bleu);color:#fff;padding:9px 20px;border-radius:9px;font-weight:600;font-size:13px;cursor:pointer;border:none;transition:var(--tr);margin-left:auto;white-space:nowrap;flex-shrink:0;font-family:inherit}
.nb-cta:hover{background:var(--bleu2)}
.nb-adm{background:var(--g100);color:var(--g600);border:1px solid var(--g200);width:36px;height:36px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:var(--tr)}
.nb-adm:hover{background:var(--g200);color:var(--bleu)}
.burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;margin-left:auto}
.burger span{display:block;width:23px;height:2px;background:var(--bleu);border-radius:2px}
.mob-menu{display:none;background:#fff;border-top:1px solid var(--g200);padding:12px 24px 20px}
.mob-menu.open{display:block}
.mob-menu button{display:block;padding:11px 0;border-bottom:1px solid var(--g100);font-size:14px;color:var(--g700);background:none;border-top:none;border-left:none;border-right:none;width:100%;text-align:left;cursor:pointer;font-family:inherit}
.ph{background:linear-gradient(135deg,var(--bleu),var(--bleu2));padding:40px 0 36px}
.ph-in{max-width:1280px;margin:0 auto;padding:0 24px;display:flex;align-items:flex-start;gap:14px}
.ph-bk{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;width:36px;height:36px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0;margin-top:2px;transition:var(--tr)}
.ph-bk:hover{background:rgba(255,255,255,.22)}
.ph-cat{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:7px}
.ph-h1{font-family:'Poppins',sans-serif;font-size:clamp(22px,2.8vw,36px);font-weight:800;color:#fff;line-height:1.12;margin-bottom:8px}
.ph-h1 em{font-style:normal;color:rgba(255,255,255,.75)}
.ph-sub{font-size:14.5px;color:rgba(255,255,255,.72);line-height:1.7;max-width:580px}
.pbody{max-width:1280px;margin:0 auto;padding:44px 24px 68px}
.hero{position:relative;overflow:hidden;background:var(--navy);min-height:calc(100vh - 108px);display:flex;align-items:center;padding:60px 0}
.hero-bg{position:absolute;inset:0;z-index:0}
.hero-bg img{width:100%;height:100%;object-fit:cover}
.hero-in{position:relative;z-index:1;width:100%;max-width:1280px;margin:0 auto;padding:0 24px}
.hero-txt{max-width:600px;padding:40px 70px 40px 32px;margin-left:-32px;background:linear-gradient(115deg,rgba(8,22,58,.95) 0%,rgba(8,22,58,.9) 50%,rgba(8,22,58,.55) 78%,rgba(8,22,58,0) 100%);border-radius:16px}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);color:#fff;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:6px 14px;border-radius:100px;border:1px solid rgba(255,255,255,.2);margin-bottom:22px}
.hero-tag::before{content:'';width:6px;height:6px;background:var(--accent);border-radius:50%;animation:blink 2s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero h1{font-family:'Poppins',sans-serif;font-size:clamp(24px,3vw,42px);font-weight:800;line-height:1.13;color:#fff;margin-bottom:18px}
.hl-b{color:#7ab8ff}.hl-g{color:#9be89b}.hl-a{color:#c8ec5c}
.hero-desc{font-size:15px;line-height:1.75;color:rgba(255,255,255,.82);margin-bottom:30px;max-width:520px}
.hero-btns{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:36px}
.btn-prim{background:var(--bleu);color:#fff;padding:13px 26px;border-radius:9px;font-weight:700;font-size:14px;display:flex;align-items:center;gap:8px;border:none;cursor:pointer;transition:var(--tr);font-family:inherit}
.btn-prim:hover{background:var(--bleu2);transform:translateY(-2px);box-shadow:0 8px 20px rgba(13,43,110,.28)}
.btn-outl{background:transparent;color:#fff;padding:12px 22px;border-radius:9px;font-weight:600;font-size:14px;display:flex;align-items:center;gap:8px;border:2px solid rgba(255,255,255,.55);cursor:pointer;transition:var(--tr);font-family:inherit}
.btn-outl:hover{background:#fff;color:var(--bleu);border-color:#fff}
.btn-wa-s{background:#25D366;color:#fff;padding:12px 18px;border-radius:9px;font-weight:600;font-size:14px;display:flex;align-items:center;gap:8px;border:none;cursor:pointer;transition:var(--tr);font-family:inherit;text-decoration:none}
.btn-wa-s:hover{background:#128C7E}
.tr-item{display:flex;align-items:center;gap:7px;font-size:12px;color:rgba(255,255,255,.85)}
.hero-trust{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.hero-visual{position:relative;height:480px}
.slider{position:relative;width:100%;height:100%;border-radius:20px 20px 0 0;overflow:hidden}
.slide{position:absolute;inset:0;opacity:0;transition:opacity .7s ease}
.slide.on{opacity:1}
.slide-ov{position:absolute;inset:0;background:linear-gradient(to bottom right,rgba(13,43,110,.35),transparent)}
.slide-dots{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:7px;z-index:5}
.sd{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.5);border:none;cursor:pointer;transition:var(--tr)}
.sd.on{background:#fff;width:22px;border-radius:4px}
.badge15{position:absolute;bottom:32px;right:32px;background:rgba(255,255,255,.97);color:var(--bleu);border-radius:14px;padding:16px 20px;text-align:center;box-shadow:var(--sh2);z-index:2;animation:fl 3s ease-in-out infinite}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.b15-n{font-family:'Poppins',sans-serif;font-size:34px;font-weight:800;line-height:1}
.b15-s{font-size:17px;vertical-align:super}
.b15-l{font-size:9px;font-weight:600;letter-spacing:1px;opacity:.85;margin-top:3px;text-transform:uppercase}
.stats{background:var(--bleu);padding:32px 0}
.stats-in{max-width:1280px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
.stat{color:#fff}
.stat-n{font-family:'Poppins',sans-serif;font-size:36px;font-weight:800;line-height:1;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:5px}
.stat-ico{width:34px;height:34px;background:rgba(255,255,255,.15);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px}
.stat-l{font-size:12px;opacity:.78}
.clients{padding:44px 0;background:#fff;border-bottom:1px solid var(--g200)}
.cl-in{max-width:1280px;margin:0 auto;padding:0 24px;text-align:center}
.cl-ttl{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--g600);margin-bottom:24px}
.cl-logos{display:flex;align-items:center;justify-content:center;gap:36px;flex-wrap:wrap}
.cl-logo{display:flex;align-items:center;justify-content:center;height:44px;opacity:.65;transition:var(--tr);filter:grayscale(1);cursor:pointer}
.cl-logo:hover{opacity:1;filter:grayscale(0)}
.cl-logo img{max-height:44px;max-width:120px;width:auto;object-fit:contain}
.cl-dot{width:9px;height:9px;border-radius:50%}
.sec{padding:68px 0}
.sec-in{max-width:1280px;margin:0 auto;padding:0 24px}
.sec-bg{background:var(--g50)}
.sec-navy{background:var(--navy)}
.sec-ey{text-align:center;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--vert3);margin-bottom:10px}
.sec-navy .sec-ey{color:var(--accent)}
.sec-ti{font-family:'Poppins',sans-serif;font-size:clamp(20px,2.4vw,30px);font-weight:700;text-align:center;color:var(--g900);margin-bottom:44px;line-height:1.25}
.sec-ti em{color:var(--vert3);font-style:normal}
.sec-navy .sec-ti{color:#fff}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.svc-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06);transition:var(--tr);cursor:pointer;border:1px solid var(--g200)}
.svc-card:hover{transform:translateY(-5px);box-shadow:var(--sh2);border-color:transparent}
.svc-ph{height:145px;overflow:hidden;display:flex;align-items:center;justify-content:center}
.svc-ph img{width:100%;height:100%;object-fit:cover}
.svc-body{padding:16px}
.svc-hd{display:flex;align-items:center;gap:9px;margin-bottom:11px}
.svc-ico{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.svc-nt{font-size:13.5px;font-weight:700;color:var(--g900);line-height:1.3}
.svc-ul{list-style:none;margin-bottom:12px}
.svc-ul li{font-size:11.5px;color:var(--g600);padding:2px 0;display:flex;align-items:flex-start;gap:5px;line-height:1.4}
.svc-ul li::before{content:'\u2192';color:var(--accent);font-size:10px;flex-shrink:0;margin-top:2px}
.svc-lnk{font-size:12px;font-weight:600;color:var(--vert);border:none;background:none;cursor:pointer;transition:var(--tr);padding:0;font-family:inherit}
.svc-lnk:hover{color:var(--bleu)}
.os-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.os-card{background:#fff;border:1.5px solid var(--g200);border-radius:16px;overflow:hidden;transition:var(--tr);display:flex;flex-direction:column}
.os-card:hover{transform:translateY(-5px);box-shadow:var(--sh2);border-color:var(--bleu2)}
.os-card.featured{border-color:var(--accent)}
.os-img{height:200px;background:linear-gradient(135deg,#e8f0fe,#f0f4ff);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.os-img img{width:100%;height:100%;object-fit:contain;padding:12px}
.os-img-ph{font-size:64px;opacity:.4}
.os-badge{position:absolute;top:12px;right:12px;font-size:10px;font-weight:700;padding:3px 9px;border-radius:4px;text-transform:uppercase;display:flex;align-items:center;gap:4px}
.os-badge.best{background:var(--accent);color:#fff}
.os-badge.pop{background:var(--or);color:#fff}
.os-badge.pro{background:var(--bleu);color:#fff}
.os-body{padding:20px;flex:1;display:flex;flex-direction:column}
.os-debit{font-family:'Poppins',sans-serif;font-size:20px;font-weight:800;color:var(--bleu2);margin-bottom:4px}
.os-ref{font-size:11px;color:var(--g600);font-weight:600;letter-spacing:.5px;margin-bottom:2px}
.os-nom{font-size:14px;font-weight:600;color:var(--g700);margin-bottom:8px;line-height:1.3}
.os-desc{font-size:12.5px;color:var(--g600);line-height:1.65;margin-bottom:16px;flex:1}
.os-specs{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;padding:12px;background:var(--g50);border-radius:8px}
.os-spec{font-size:12px;color:var(--g700);display:flex;align-items:center;gap:7px}
.os-spec::before{content:'\u2713';color:var(--vert3);font-weight:700;flex-shrink:0}
.os-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid var(--g200)}
.os-px{font-family:'Poppins',sans-serif;font-size:18px;font-weight:800;color:var(--vert)}
.os-px-sub{font-size:11px;color:var(--g600)}
.btn-devis{background:var(--bleu);color:#fff;border:none;padding:9px 18px;border-radius:8px;font-size:12.5px;font-weight:600;cursor:pointer;transition:var(--tr);font-family:inherit;white-space:nowrap}
.btn-devis:hover{background:var(--bleu2)}
.os-features{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:44px}
.os-feat{background:#fff;border:1px solid var(--g200);border-radius:12px;padding:20px 16px;text-align:center;transition:var(--tr)}
.os-feat:hover{border-color:var(--bleu2);box-shadow:var(--sh);transform:translateY(-3px)}
.os-feat-ico{margin-bottom:12px;color:var(--bleu);display:flex;justify-content:center;transition:var(--tr)}
.os-feat:hover .os-feat-ico{color:var(--accent)}
.os-feat-t{font-size:13px;font-weight:700;color:var(--g900);margin-bottom:4px}
.os-feat-d{font-size:12px;color:var(--g600);line-height:1.5}
.os-compare{overflow-x:auto;margin-bottom:44px}
.os-table{width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden;box-shadow:var(--sh)}
.os-table th{background:var(--bleu);color:#fff;padding:13px 16px;font-size:12.5px;font-weight:600;text-align:left;white-space:nowrap}
.os-table td{padding:12px 16px;font-size:12.5px;color:var(--g700);border-bottom:1px solid var(--g100)}
.os-table tr:last-child td{border-bottom:none}
.os-table tr:hover td{background:var(--g50)}
.os-table .prix-td{font-family:'Poppins',sans-serif;font-weight:700;color:var(--vert);font-size:14px}
.os-table .debit-td{font-family:'Poppins',sans-serif;font-weight:700;color:var(--bleu2)}
.os-table .ref-td{font-family:'Poppins',sans-serif;font-weight:700;color:var(--g900)}
.chim-grps{display:flex;flex-direction:column;gap:36px}
.chim-grp-hd{display:flex;align-items:center;gap:10px;margin-bottom:18px;padding-bottom:11px;border-bottom:2px solid var(--bleu2)}
.chim-grp-hd h3{font-family:'Poppins',sans-serif;font-size:16px;font-weight:700;color:var(--g900)}
.chim-pill{background:var(--bleu);color:#fff;font-size:11px;font-weight:700;padding:2px 10px;border-radius:4px}
.chim-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.chim-card{background:#fff;border:1px solid var(--g200);border-radius:12px;overflow:hidden;transition:var(--tr)}
.chim-card:hover{transform:translateY(-3px);box-shadow:var(--sh);border-color:var(--bleu2)}
.chim-ph{height:110px;display:flex;align-items:center;justify-content:center;font-size:40px;background:linear-gradient(135deg,#f0f4ff,#e8f5e9)}
.chim-body{padding:14px}
.chim-grp-lbl{font-size:10.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--bleu2);margin-bottom:4px}
.chim-nom{font-size:13.5px;font-weight:700;color:var(--g900);margin-bottom:6px;line-height:1.3}
.chim-desc{font-size:12px;color:var(--g600);line-height:1.6;margin-bottom:12px}
.chim-foot{display:flex;align-items:center;justify-content:space-between}
.chim-type{font-size:10.5px;color:var(--g600);background:var(--g100);padding:3px 9px;border-radius:4px}
.btn-chim{background:transparent;color:var(--bleu2);border:1.5px solid var(--bleu2);padding:6px 13px;border-radius:7px;font-size:11.5px;font-weight:600;cursor:pointer;font-family:inherit}
.btn-chim:hover{background:var(--bleu2);color:#fff}
.svc-det-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.svc-det-card{background:#fff;border:1px solid var(--g200);border-radius:16px;overflow:hidden;transition:var(--tr);cursor:pointer;display:flex;flex-direction:column}
.svc-det-card:hover{transform:translateY(-5px);box-shadow:var(--sh2);border-color:var(--bleu2)}
.svc-det-img{height:190px;overflow:hidden;position:relative}
.svc-det-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.svc-det-card:hover .svc-det-img img{transform:scale(1.05)}
.svc-det-ph{height:190px;display:flex;align-items:center;justify-content:center;font-size:54px}
.svc-det-tag{position:absolute;top:12px;left:12px;font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:4px;text-transform:uppercase}
.tag-ing{background:#e8f0fe;color:var(--bleu)}
.tag-ana{background:#e8f5e9;color:var(--vert)}
.svc-det-body{padding:20px;flex:1;display:flex;flex-direction:column}
.svc-det-t{font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;color:var(--g900);margin-bottom:8px;line-height:1.3}
.svc-det-d{font-size:12.5px;color:var(--g600);line-height:1.65;margin-bottom:14px;flex:1}
.svc-det-feats{list-style:none;margin-bottom:16px}
.svc-det-feats li{font-size:12px;color:var(--g700);padding:3.5px 0;display:flex;align-items:flex-start;gap:7px;border-bottom:1px solid var(--g100)}
.svc-det-feats li:last-child{border-bottom:none}
.svc-det-feats li::before{content:'\u2713';color:var(--vert3);font-weight:700;flex-shrink:0}
.btn-svc{background:transparent;color:var(--bleu2);border:1.5px solid var(--bleu2);padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;width:100%}
.btn-svc:hover{background:var(--bleu2);color:#fff}
.adv-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.adv-card{text-align:center;padding:32px 20px;border-radius:14px;background:var(--g50);border:1px solid var(--g200);transition:var(--tr)}
.adv-card:hover{border-color:var(--bleu2);background:#fff;box-shadow:var(--sh);transform:translateY(-4px)}
.adv-ico{width:58px;height:58px;border-radius:16px;background:var(--bleu);color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 16px;transition:var(--tr)}
.adv-card:hover .adv-ico{background:var(--accent)}
.adv-t{font-weight:700;font-size:14.5px;color:var(--g900);margin-bottom:8px}
.adv-d{font-size:12.5px;color:var(--g600);line-height:1.65}
.car-wrap{position:relative}
.car-tr{display:flex;gap:16px;overflow:hidden;padding:6px 0 20px}
.prod-card{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:14px;overflow:hidden;flex-shrink:0;width:calc((100% - 5*16px)/6);min-width:155px;transition:var(--tr);cursor:pointer}
.prod-card:hover{background:rgba(255,255,255,.13);border-color:var(--accent);transform:translateY(-4px)}
.pc-img{width:100%;height:115px;object-fit:cover;display:block}
.pc-ph{width:100%;height:115px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:30px}
.pc-body{padding:11px 13px 14px}
.pc-t{font-size:12px;font-weight:600;color:#fff;text-align:center;line-height:1.4}
.car-arr{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:var(--tr);z-index:5;font-size:18px}
.car-arr:hover{background:var(--accent);border-color:var(--accent)}
.car-arr.l{left:-21px}.car-arr.r{right:-21px}
.ticker{background:var(--vert);padding:13px 0;overflow:hidden}
.ticker-in{display:flex;gap:60px;animation:tick 22s linear infinite;white-space:nowrap;width:max-content}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.tick-item{display:flex;align-items:center;gap:9px;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.9)}
.tick-dot{width:5px;height:5px;border-radius:50%;background:var(--accent)}
.real-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px}
.rf-btn{background:#fff;border:1.5px solid var(--g200);color:var(--g600);padding:7px 18px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:var(--tr);font-family:inherit}
.rf-btn:hover,.rf-btn.on{background:var(--bleu);color:#fff;border-color:var(--bleu)}
.real-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.real-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06);transition:var(--tr);border:1px solid var(--g200);cursor:pointer}
.real-card:hover{transform:translateY(-4px);box-shadow:var(--sh2)}
.real-img{height:195px;overflow:hidden;position:relative}
.real-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.real-card:hover .real-img img{transform:scale(1.06)}
.real-img-ph{height:195px;display:flex;align-items:center;justify-content:center;font-size:52px;background:linear-gradient(135deg,var(--bleu),var(--bleu2))}
.real-cat{position:absolute;top:12px;left:12px;background:var(--bleu);color:#fff;font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:4px}
.real-body{padding:18px}
.real-lieu{font-size:11px;color:var(--vert3);font-weight:600;margin-bottom:5px;display:flex;align-items:center;gap:5px}
.real-t{font-weight:700;font-size:14px;color:var(--g900);margin-bottom:5px;line-height:1.35}
.real-pb{font-size:11.5px;color:var(--g600);margin-bottom:9px;line-height:1.5}
.real-tags{display:flex;gap:5px;flex-wrap:wrap}
.real-tag{background:var(--g100);color:var(--g600);font-size:10.5px;padding:2px 8px;border-radius:4px}
.blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.blog-card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.06);border:1px solid var(--g200);transition:var(--tr);cursor:pointer}
.blog-card:hover{transform:translateY(-4px);box-shadow:var(--sh2)}
.blog-img{height:165px;background:linear-gradient(135deg,var(--bleu),var(--vert));display:flex;align-items:center;justify-content:center;font-size:44px}
.blog-body{padding:18px}
.blog-tag{display:inline-block;background:var(--g100);color:var(--bleu);font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 9px;border-radius:100px;margin-bottom:9px}
.blog-t{font-weight:700;font-size:14px;color:var(--g900);margin-bottom:7px;line-height:1.4}
.blog-ex{font-size:12px;color:var(--g600);line-height:1.6;margin-bottom:12px}
.blog-meta{font-size:11px;color:var(--g600);display:flex;align-items:center;gap:5px}
.contact-sec{padding:68px 0;background:var(--g50)}
.contact-in{max-width:1280px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1fr 1.3fr;gap:60px;align-items:start}
.ct-inf h2{font-family:'Poppins',sans-serif;font-size:27px;font-weight:700;color:var(--g900);margin-bottom:13px;line-height:1.3}
.ct-inf h2 em{color:var(--vert3);font-style:normal}
.ct-inf p{font-size:14px;color:var(--g600);line-height:1.75;margin-bottom:28px}
.ct-dets{display:flex;flex-direction:column;gap:14px}
.ct-det{display:flex;align-items:flex-start;gap:13px}
.ct-ico{width:42px;height:42px;border-radius:11px;background:var(--bleu);color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.ct-lbl{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--g600);margin-bottom:1px}
.ct-val{font-size:13.5px;font-weight:500;color:var(--g900)}
.ct-form{background:#fff;border-radius:18px;padding:30px;box-shadow:var(--sh);border:1px solid var(--g200)}
.ct-form-t{font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;color:var(--g900);margin-bottom:20px;display:flex;align-items:center;gap:8px}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.fg{margin-bottom:13px;display:flex;flex-direction:column;gap:5px}
.fg label{font-size:12px;font-weight:600;color:var(--g700)}
.fg input,.fg textarea,.fg select{padding:10px 13px;border-radius:9px;border:1.5px solid var(--g200);font-size:13px;color:var(--g900);font-family:inherit;transition:var(--tr);background:#fff;width:100%;resize:none}
.fg input:focus,.fg textarea:focus,.fg select:focus{outline:none;border-color:var(--bleu);box-shadow:0 0 0 3px rgba(13,43,110,.1)}
.fg textarea{height:105px}
.btn-send{width:100%;padding:13px;background:var(--bleu);color:#fff;border:none;border-radius:9px;font-weight:700;font-size:14px;cursor:pointer;transition:var(--tr);display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit}
.btn-send:hover{background:var(--bleu2);transform:translateY(-2px)}
.btn-send:disabled{opacity:.65;cursor:not-allowed;transform:none}
.form-ok{background:#e8f5e9;border:1px solid var(--vert3);color:var(--vert);padding:12px 15px;border-radius:9px;font-size:13px;font-weight:500;margin-top:11px;display:flex;align-items:center;gap:8px}
.footer{background:var(--navy);color:rgba(255,255,255,.78);padding:56px 0 0}
.ft-in{max-width:1280px;margin:0 auto;padding:0 24px 42px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:42px;border-bottom:1px solid rgba(255,255,255,.1)}
.ft-logo .logo-n{color:#fff;font-size:15px}
.ft-logo .logo-s{color:var(--accent)}
.ft-desc{font-size:12.5px;line-height:1.75;margin:13px 0 18px;opacity:.7}
.ft-soc{display:flex;gap:8px}
.ft-soc a{width:33px;height:33px;border-radius:9px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;transition:var(--tr)}
.ft-soc a:hover{background:var(--accent)}
.ft-col h4{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;margin-bottom:15px}
.ft-col ul{list-style:none;display:flex;flex-direction:column;gap:8px}
.ft-col ul li{font-size:12.5px;opacity:.65;cursor:pointer;transition:var(--tr);display:flex;align-items:center;gap:5px}
.ft-col ul li:hover{opacity:1;color:var(--accent)}
.ft-col ul li::before{content:'\u2192';font-size:10px;flex-shrink:0}
.ft-bot{max-width:1280px;margin:0 auto;padding:17px 24px;display:flex;align-items:center;justify-content:space-between;font-size:12px;opacity:.5;flex-wrap:wrap;gap:8px}
.ai-fl{position:fixed;bottom:88px;right:22px;z-index:900}
.ai-tog{width:50px;height:50px;border-radius:50%;background:var(--bleu);color:#fff;border:none;cursor:pointer;font-size:21px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(13,43,110,.35);transition:var(--tr)}
.ai-tog:hover{background:var(--bleu2);transform:scale(1.08)}
.ai-win{position:absolute;bottom:62px;right:0;width:320px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.18);border:1px solid var(--g200);overflow:hidden;opacity:0;visibility:hidden;transform:translateY(10px) scale(.95);transition:var(--tr)}
.ai-win.open{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
.ai-hd{background:var(--bleu);color:#fff;padding:13px 15px;display:flex;align-items:center;gap:9px}
.ai-av{width:33px;height:33px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:17px}
.ai-nm{font-weight:700;font-size:13px}
.ai-st{font-size:10px;opacity:.8}
.ai-cx{background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:16px;margin-left:auto}
.ai-msgs{height:240px;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:var(--g50)}
.ai-msg{max-width:84%;padding:9px 12px;border-radius:11px;font-size:12.5px;line-height:1.55}
.ai-msg.bot{background:#fff;color:var(--g900);border:1px solid var(--g200);align-self:flex-start;border-bottom-left-radius:3px}
.ai-msg.user{background:var(--bleu);color:#fff;align-self:flex-end;border-bottom-right-radius:3px}
.ai-typ{display:flex;gap:4px;align-items:center;padding:9px 12px;background:#fff;border:1px solid var(--g200);border-radius:11px;align-self:flex-start;width:fit-content}
.ai-typ span{width:5px;height:5px;border-radius:50%;background:var(--g600);animation:bp 1.2s ease infinite}
.ai-typ span:nth-child(2){animation-delay:.2s}
.ai-typ span:nth-child(3){animation-delay:.4s}
@keyframes bp{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
.ai-ir{display:flex;gap:7px;padding:10px 12px;border-top:1px solid var(--g200);background:#fff}
.ai-inp{flex:1;padding:8px 12px;border-radius:9px;border:1.5px solid var(--g200);font-size:12.5px;font-family:inherit;color:var(--g900)}
.ai-inp:focus{outline:none;border-color:var(--bleu)}
.ai-snd{width:35px;height:35px;border-radius:9px;background:var(--bleu);color:#fff;border:none;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ai-snd:disabled{opacity:.5;cursor:not-allowed}
.wa-fl{position:fixed;bottom:22px;right:22px;z-index:900}
.wa-btn{width:54px;height:54px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 18px rgba(37,211,102,.42);text-decoration:none;transition:var(--tr);position:relative}
.wa-btn:hover{background:#128C7E;transform:scale(1.08)}
.wa-pulse{position:absolute;inset:0;border-radius:50%;background:#25D366;animation:pls 2s ease infinite;z-index:-1}
@keyframes pls{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(1.8)}}
.toast-wr{position:fixed;bottom:96px;right:22px;z-index:2000;display:flex;flex-direction:column;gap:9px;align-items:flex-end}
.toast{background:var(--g900);color:#fff;padding:11px 16px;border-radius:9px;font-size:12.5px;font-weight:500;display:flex;align-items:center;gap:7px;box-shadow:0 4px 18px rgba(0,0,0,.2);animation:sli .3s ease;max-width:300px;border-left:3px solid var(--vert3)}
@keyframes sli{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
.adm-wrap{min-height:100vh;background:var(--g50);padding:36px 22px;font-family:inherit}
.adm-card{max-width:780px;margin:0 auto;background:#fff;border-radius:18px;box-shadow:var(--sh);overflow:hidden}
.adm-hd{background:var(--bleu);color:#fff;padding:24px 30px;display:flex;align-items:center;gap:14px}
.adm-hd h1{font-size:20px;font-weight:700}
.adm-bd{padding:30px}
.adm-sec{margin-bottom:34px}
.adm-sec h2{font-size:15.5px;font-weight:700;color:var(--g900);margin-bottom:17px;padding-bottom:9px;border-bottom:2px solid var(--g200)}
.bpi{border:1px solid var(--g200);border-radius:11px;padding:13px;margin-bottom:10px;display:flex;align-items:flex-start;justify-content:space-between;gap:13px}
.bpi-m{font-size:11px;color:var(--g600);margin-top:3px}
.btn-del{background:#fee2e2;color:#dc2626;border:none;border-radius:7px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}
.btn-grn{background:var(--vert);color:#fff;border:none;border-radius:7px;padding:8px 16px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit}
.btn-c{text-align:center;margin-top:36px}
.btn-nv{background:var(--bleu);color:#fff;padding:12px 28px;border-radius:9px;font-weight:700;font-size:14px;display:inline-flex;align-items:center;gap:8px;border:none;cursor:pointer;transition:var(--tr);font-family:inherit}
.btn-nv:hover{background:var(--bleu2);transform:translateY(-2px)}
.info-box{background:linear-gradient(135deg,#e8f0fe,#e8f5e9);border:1px solid #c7d7fc;border-radius:12px;padding:20px 24px;margin-bottom:32px;display:flex;gap:12px;align-items:flex-start}
.info-box svg{flex-shrink:0;margin-top:2px;color:var(--bleu)}
.info-box p{font-size:13.5px;color:var(--g700);line-height:1.7}
.info-box strong{color:var(--bleu)}
.tech-note{background:#fffbeb;border:1px solid #fde68a;border-left:3px solid var(--or);border-radius:8px;padding:11px 14px;font-size:12.5px;color:var(--g700);line-height:1.6;margin-bottom:16px}
.tech-note strong{color:#92400e;display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
.divider{height:1px;background:var(--g200);margin:32px 0}
.step-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:36px}
.step-card{background:#fff;border:1px solid var(--g200);border-radius:12px;padding:20px 16px;text-align:center;position:relative}
.step-num{width:32px;height:32px;background:var(--bleu);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;margin:0 auto 12px}
.step-t{font-size:13px;font-weight:700;color:var(--g900);margin-bottom:5px}
.step-d{font-size:11.5px;color:var(--g600);line-height:1.5}
.step-arr{position:absolute;top:50%;right:-10px;transform:translateY(-50%);font-size:18px;color:var(--g300);z-index:1}
.sec-ti-ico{display:inline-flex;vertical-align:-6px;margin-right:8px;color:var(--vert3)}
.sec-navy .sec-ti-ico{color:var(--accent)}
@media(max-width:1100px){
  .os-grid{grid-template-columns:repeat(2,1fr)}
  .svc-grid{grid-template-columns:repeat(2,1fr)}
  .svc-det-grid{grid-template-columns:repeat(2,1fr)}
  .chim-cards{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:1024px){
  .adv-grid{grid-template-columns:repeat(2,1fr)}
  .ft-in{grid-template-columns:1fr 1fr}
  .blog-grid{grid-template-columns:repeat(2,1fr)}
  .real-grid{grid-template-columns:repeat(2,1fr)}
  .stats-in{grid-template-columns:repeat(2,1fr)}
  .prod-card{width:calc((100% - 3*16px)/4)}
  .step-grid{grid-template-columns:repeat(2,1fr)}
  .os-features{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  .nb-links,.nb-cta,.nb-adm{display:none!important}
  .burger{display:flex}
  .hero{padding:40px 0;min-height:calc(100vh - 70px)}
  .hero-in{max-width:100%}
  .hero-txt{max-width:100%;margin-left:0;padding:24px 20px 20px;border-radius:14px;background:linear-gradient(180deg,rgba(8,22,58,.9) 0%,rgba(8,22,58,.94) 100%)}
  .hero-tag{font-size:9.5px;padding:5px 11px;margin-bottom:14px}
  .hero h1{font-size:21px;line-height:1.22;margin-bottom:12px}
  .hero-desc{font-size:13px;line-height:1.55;margin-bottom:18px;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
  .hero-btns{margin-bottom:16px}
  .hero-trust{padding-right:64px}
  .badge15{right:14px;bottom:14px;padding:11px 15px}
  .svc-grid{grid-template-columns:1fr 1fr}
  .svc-det-grid{grid-template-columns:1fr}
  .adv-grid{grid-template-columns:1fr 1fr}
  .contact-in{grid-template-columns:1fr}
  .ft-in{grid-template-columns:1fr 1fr;gap:26px}
  .blog-grid{grid-template-columns:1fr}
  .real-grid{grid-template-columns:1fr}
  .frow{grid-template-columns:1fr}
  .tb{display:none}
  .prod-card{width:calc((100% - 2*16px)/3)}
  .os-grid{grid-template-columns:1fr}
  .chim-cards{grid-template-columns:1fr}
  .os-features{grid-template-columns:1fr 1fr}
}
@media(max-width:480px){
  .stats-in{grid-template-columns:repeat(2,1fr)}
  .svc-grid{grid-template-columns:1fr}
  .adv-grid{grid-template-columns:1fr}
  .ft-in{grid-template-columns:1fr}
  .prod-card{width:calc((100% - 16px)/2)}
}
`;

/* ── Icônes SVG réutilisables (remplacent les emojis) ── */
const Ico = {
  trophy: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M7 5H4a1 1 0 00-1 1v1a4 4 0 004 4M17 5h3a1 1 0 011 1v1a4 4 0 01-4 4"/></svg>,
  folder: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>,
  users: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  star: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  starOutline: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  fire: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c1 3-2 4-2 7a3 3 0 006 0c1.5 1.5 2 3.5 2 5a6 6 0 11-12 0c0-4 2-6 3-8 .5 1 1 1.5 1.5 1.5C11 6 11 3 12 2z"/></svg>,
  check: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  target: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>,
  bulb: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a6 6 0 00-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0012 2z"/></svg>,
  handshake: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 12l2 2 5-5M2 12l4-4 4 2 3-2 4 1 5 4-3 3-2-1-3 3-4-1-3-3-3 1z"/></svg>,
  drop: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2s7 8 7 13a7 7 0 01-14 0c0-5 7-13 7-13z"/></svg>,
  flask: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2h6M10 2v6.5L4.5 18a2 2 0 001.7 3h11.6a2 2 0 001.7-3L14 8.5V2"/><path d="M7 15h10"/></svg>,
  beaker: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15M6 3v6l-3 9a2 2 0 002 3h14a2 2 0 002-3l-3-9V3"/><path d="M6.5 14h11"/></svg>,
  gear: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.33 1.9l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.9-.33 1.7 1.7 0 00-1 1.56V21a2 2 0 01-4 0v-.09A1.7 1.7 0 008.5 19a1.7 1.7 0 00-1.9.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.33-1.9 1.7 1.7 0 00-1.56-1H2a2 2 0 010-4h.09A1.7 1.7 0 003.6 8.5a1.7 1.7 0 00-.33-1.9l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 007.5 4.1a1.7 1.7 0 001-1.56V2a2 2 0 014 0v.09a1.7 1.7 0 001 1.56 1.7 1.7 0 001.9-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.33 1.9V8.5c.14.6.6 1.1 1.56 1H22a2 2 0 010 4h-.09a1.7 1.7 0 00-1.51 1z"/></svg>,
  ruler: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="8" width="20" height="8" rx="1"/><path d="M6 8v3M10 8v3M14 8v3M18 8v3"/></svg>,
  leaf: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A9 9 0 0111 2c4 0 8 3 9 9-6 1-9 5-9 9z"/><path d="M11 20c0-6 2-9 6-11"/></svg>,
  cap: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>,
  wrench: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 10-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 005.4-5.4l-2.8 2.8-2-2z"/></svg>,
  filter3: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="12" r="4"/><path d="M18 3l3 3-3 3M14 6h7M3 18h7"/></svg>,
  gauge: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 100-18 9 9 0 000 18z"/><path d="M12 12l4-4M8 21h8"/></svg>,
  phone: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.55 2.18 2 2 0 012.55 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  whatsapp: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  pin: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  mail: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></svg>,
  info: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg>,
  send: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>,
  robot: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M9 18h6"/></svg>,
  close: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  linkedin: <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  facebook: <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
};

/* Icônes réactifs par famille */
const reactifIco = (type) => ({
  "Coagulant": Ico.flask, "Floculant": Ico.flask, "Correction pH": Ico.beaker,
  "Désinfection": Ico.beaker, "Divers": Ico.beaker, "OI": Ico.filter3, "Chaudière": Ico.gauge
}[type] || Ico.flask);

/* DATA */
const SERVICES=[
  {id:1,icon:Ico.drop,color:"#0d2b6e",bg:"#e8f0fe",title:"Traitement des eaux",img:"/Step-traitement.jpg.jpeg",items:["STEP & Stations d'épuration","Eau potable & industrielle","Eaux usées & effluents"]},
  {id:2,icon:Ico.beaker,color:"#0d2b6e",bg:"#e8f0fe",title:"Analyses environnementales",img:"/Laboratoire-uem.jpg.jpeg",items:["Eau, Sol, Air, Boues","Analyses physico-chimiques","Normes NM / ISO"]},
  {id:3,icon:Ico.flask,color:"#1b7a3e",bg:"#e8f5e9",title:"Produits chimiques",img:"/produits-chimiques.jpg",items:["Réactifs de laboratoire","Coagulants, floculants, biocides","Produits traitement eaux"]},
  {id:4,icon:Ico.gauge,color:"#1b7a3e",bg:"#e8f5e9",title:"Équipements & Osmoseurs",img:"/osmoseur-grand.webp",items:["Osmoseurs industriels & domestiques","Adoucisseurs, filtres, pompes","Instrumentation & accessoires"]},
  {id:5,icon:Ico.ruler,color:"#0d2b6e",bg:"#e8f0fe",title:"Ingénierie & Conception",img:"/mesure-site.jpg.jpeg",items:["Études & Conception STEP","Installation & Mise en service","Suivi & Optimisation"]},
  {id:6,icon:Ico.leaf,color:"#1b7a3e",bg:"#e8f5e9",title:"Environnement & HSE",img:"/analyse -terrain.jpg.jpeg",items:["Études d'impact & Audits","ISO 14001 – Management env.","Conseil HSE & Conformité"]},
  {id:7,icon:Ico.cap,color:"#0d2b6e",bg:"#e8f0fe",title:"Formation & Sensibilisation",img:"/formation-hse.jpg",items:["Formation HSE","Traitement des eaux","Laboratoire & Environnement"]},
  {id:8,icon:Ico.wrench,color:"#1b7a3e",bg:"#e8f5e9",title:"Maintenance & SAV",img:"/mesure-bruit.jpg.jpeg",items:["Maintenance préventive & corrective","Contrats annuels","Assistance technique 7/7"]}
];

const OSMOSEURS=[
  {id:1,ref:"UEM-OS-500L",debit:"500 L/h",nom:"Osmoseur Industriel 500 L/h",desc:"Unité compacte idéale pour petites industries, cliniques, hôtels et laboratoires. Facile d'installation, faible encombrement.",prix:"48 000 MAD HT",badge:"",specs:["Pression : 10–15 bar","Rejection : >97%","Châssis inox 304","Garantie 2 ans","Livraison Maroc"],img:"/osmoseur-petit.webp"},
  {id:2,ref:"UEM-OS-1M3",debit:"1 m³/h",nom:"Osmoseur Industriel 1 m³/h",desc:"Pour industries agroalimentaires, laboratoires et structures médicales. Rendement optimal et faible consommation énergétique.",prix:"82 500 MAD HT",badge:"pop",specs:["Pression : 10–15 bar","Rejection : >97%","Préfiltre sédiment","Compteur débitmètre","Alarme défaut perméat"],img:"/osmoseur-petit.webp"},
  {id:3,ref:"UEM-OS-2M3",debit:"2 m³/h",nom:"Osmoseur Industriel 2 m³/h",desc:"Capacité moyenne pour industries manufacturières, agro-industrie et collectivités. Contrôle automatique de qualité.",prix:"109 500 MAD HT",badge:"",specs:["Pression : 12–16 bar","Rejection : >98%","Contrôleur conductivité","Vanne bypass auto","Afficheur digital"],img:"/osmoseur-moyen.webp"},
  {id:4,ref:"UEM-OS-3M3",debit:"3 m³/h",nom:"Osmoseur Industriel 3 m³/h",desc:"Unité robuste pour industries lourdes, collectivités et sites de production. Système CIP intégré pour nettoyage en place.",prix:"120 000 MAD HT",badge:"",specs:["Pression : 12–16 bar","Rejection : >98%","Membranes 8040","Système CIP","Enregistreur données"],img:"/osmoseur-moyen.webp"},
  {id:5,ref:"UEM-OS-4M3",debit:"4 m³/h",nom:"Osmoseur Industriel 4 m³/h",desc:"Idéal pour grandes industries alimentaires, chimiques et pharmaceutiques. Châssis inox 316L anticorrosion.",prix:"128 000 MAD HT",badge:"best",specs:["Pression : 14–18 bar","Rejection : >98%","Châssis inox 316L","Écran tactile","Double pass disponible"],img:"/osmoseur-grand.webp"},
  {id:6,ref:"UEM-OS-6M3",debit:"6 m³/h",nom:"Osmoseur Industriel 6 m³/h",desc:"Système semi-industriel pour grandes unités de production. Récupérateur d'énergie et système d'alarme complet.",prix:"183 500 MAD HT",badge:"",specs:["Pression : 14–18 bar","Rejection : >98%","Récupérateur énergie","Alarme automatique","Télésurveillance 4G"],img:"/osmoseur-grand.webp"},
  {id:7,ref:"UEM-OS-8M3",debit:"8 m³/h",nom:"Osmoseur Industriel 8 m³/h",desc:"Haute capacité pour dessalement et industries lourdes. Double train de membranes pour continuité de service.",prix:"194 300 MAD HT",badge:"pro",specs:["Pression : 15–20 bar","Rejection : >99%","Double train membranes","SCADA / Automate","Maintenance préventive incluse"],img:"/osmoseur-industriel.webp"},
  {id:8,ref:"UEM-OS-10M3",debit:"10 m³/h",nom:"Osmoseur Industriel 10 m³/h",desc:"Unité haute performance pour grandes STEP et industries. Solution clé en main avec formation des opérateurs et SAV UEM.",prix:"230 000 MAD HT",badge:"pro",specs:["Pression : 15–20 bar","Rejection : >99%","Clé en main complet","SCADA temps réel","SAV UEM 12 mois inclus"],img:"/osmoseur-industriel.webp"}
];

const REACTIFS={
  "Coagulants & Floculants":[
    {id:1,nom:"PAC — Poly Aluminium Chlorure",desc:"Coagulant liquide haute performance. Efficace sur large plage de pH (5,5 à 9). Utilisé en STEP, eau potable et effluents industriels.",type:"Coagulant"},
    {id:2,nom:"Chlorure Ferrique FeCl₃",desc:"Coagulant minéral puissant pour eaux industrielles et boues. Excellent pour déphosphatation.",type:"Coagulant"},
    {id:3,nom:"Sulfate d'Aluminium",desc:"Coagulant classique pour eau potable et eaux résiduaires. Disponible en poudre et en solution.",type:"Coagulant"},
    {id:4,nom:"Floculant Anionique",desc:"Polyacrylamide anionique pour clarification des eaux chargées. Disponible en plusieurs viscosités.",type:"Floculant"},
    {id:5,nom:"Floculant Cationique",desc:"Polyacrylamide cationique pour conditionnement des boues avant filtration et centrifugation.",type:"Floculant"}
  ],
  "Correction pH & Désinfection":[
    {id:6,nom:"Acide Chlorhydrique HCl dilué",desc:"Correction acide du pH des effluents alcalins et nettoyage des membranes. Concentration 33%.",type:"Correction pH"},
    {id:7,nom:"Soude Caustique NaOH",desc:"Correction basique du pH des effluents acides. Disponible en solution (30–50%) et en pastilles.",type:"Correction pH"},
    {id:8,nom:"Hypochlorite de Sodium NaOCl",desc:"Désinfectant oxydant puissant. Élimine bactéries, virus et algues. Disponible en fûts 25L.",type:"Désinfection"},
    {id:9,nom:"Peroxyde d'Hydrogène H₂O₂",desc:"Oxydant puissant. Élimine DCO, H₂S et composés organiques réfractaires. Traitement écologique.",type:"Désinfection"},
    {id:10,nom:"Antimousse Industriel",desc:"Élimine les mousses dans les bassins d'aération, STEP et circuits industriels. Non toxique.",type:"Divers"}
  ],
  "Osmose Inverse & Chaudière":[
    {id:11,nom:"Anti-Scalant Membranes OI",desc:"Prévient l'entartrage des membranes d'osmose inverse. Compatible toutes membranes du marché.",type:"OI"},
    {id:12,nom:"Nettoyant Membranes Acide",desc:"Nettoyage acide des membranes OI pour éliminer incrustations minérales et biofilm.",type:"OI"},
    {id:13,nom:"Nettoyant Membranes Basique",desc:"Nettoyage alcalin des membranes OI pour éliminer fouling organique et biologique.",type:"OI"},
    {id:14,nom:"Métabisulfite de Sodium",desc:"Neutralisant du chlore résiduel avant les membranes OI. Protège les membranes des oxydants.",type:"OI"},
    {id:15,nom:"Antitartre Chaudière",desc:"Prévient les dépôts calcaires dans les chaudières. Améliore le rendement thermique.",type:"Chaudière"},
    {id:16,nom:"Produit de Passivation",desc:"Protège la surface interne des chaudières contre la corrosion. Neutralisation oxygène dissous.",type:"Chaudière"}
  ]
};

const SERVICES_DETAIL=[
  {id:"step",titre:"Conception & Dimensionnement STEP",cat:"Ingénierie",tag:"tag-ing",img:"/Step-traitement.jpg.jpeg",
   desc:"De l'avant-projet sommaire (APS) à la mise en service, UEM accompagne les industriels et collectivités dans la conception de leurs stations d'épuration. Notre bureau d'études intègre les dernières technologies de traitement pour des installations conformes aux normes marocaines.",
   feats:["APS / APD / DCE complets","Dimensionnement hydraulique et biologique","Sélection des filières de traitement","Dossiers d'autorisation ONEE/Région","AMO et suivi de chantier","Formation des opérateurs"],
   process:["Diagnostic & Audit","Étude de faisabilité","Conception & Plans","Suivi travaux","Mise en service","Maintenance"]},
  {id:"optim",titre:"Optimisation STEP Existantes",cat:"Ingénierie",tag:"tag-ing",img:"/bassin-desinfection.jpg.jpeg",
   desc:"Vous avez une STEP sous-performante ? UEM réalise un audit technique complet et propose des solutions d'optimisation concrètes pour améliorer vos rendements d'épuration et réduire vos coûts.",
   feats:["Audit complet terrain","Bilan de fonctionnement","Optimisation des doses de réactifs","Réglage des équipements","Indicateurs de performance (KPI)","Rapport de recommandations"],
   process:["Visite terrain","Prélèvements & mesures","Analyse des données","Plan d'action","Mise en œuvre","Suivi mensuel"]},
  {id:"analyse-eau",titre:"Analyse Physicochimique & Bactériologique",cat:"Analyse certifiée",tag:"tag-ana",img:"/Laboratoire-uem.jpg.jpeg",
   desc:"Notre laboratoire réalise des analyses complètes de vos eaux selon les normes NM marocaines et ISO. Paramètres couverts : pH, DCO, DBO5, MES, métaux lourds, pesticides, bactériologie.",
   feats:["Prélèvement sur site certifié","Analyses physico-chimiques complètes","Analyses bactériologiques (CT, CF, Strepto)","Rapport certifié NM/ISO","Recommandations correctives","Suivi post-analyse"],
   process:["Planification","Prélèvement certifié","Analyses labo","Interprétation","Rapport","Recommandations"]},
  {id:"analyse-sol",titre:"Analyse Agronomique des Sols",cat:"Analyse certifiée",tag:"tag-ana",img:"/analyse -terrain.jpg.jpeg",
   desc:"Optimisez vos apports fertilisants grâce à une connaissance précise de votre sol. UEM réalise des analyses agronomiques complètes pour une agriculture raisonnée.",
   feats:["Prélèvement et préparation","Analyse granulométrique","Dosage NPK complet","pH, CEC, matière organique","Micro-éléments (B, Cu, Fe, Mn, Zn)","Rapport et préconisations"],
   process:["Prélèvement terrain","Préparation échantillons","Analyses laboratoire","Interprétation","Rapport agronomique","Conseil fertilisation"]},
  {id:"hse",titre:"Études d'Impact & Audits HSE",cat:"Environnement",tag:"tag-ing",img:"/mesure-site.jpg.jpeg",
   desc:"UEM accompagne les entreprises dans leur démarche de conformité environnementale : études d'impact, audits HSE, mise en place de systèmes de management environnemental ISO 14001.",
   feats:["Étude d'impact environnemental (EIE)","Audit de conformité réglementaire","Mise en place ISO 14001","Évaluation des risques HSE","Formation des équipes","Bilan carbone"],
   process:["Collecte données","Diagnostic terrain","Analyse réglementaire","Rapport EIE","Plan d'action","Suivi conformité"]},
  {id:"ingenierie",titre:"Solutions Traitement des Eaux Clé en Main",cat:"Ingénierie",tag:"tag-ing",img:"/Step-traitement.jpg.jpeg",
   desc:"UEM conçoit, installe et met en service des systèmes complets de traitement des eaux industrielles et d'osmose inverse. Du design à la maintenance, nous gérons l'intégralité du projet.",
   feats:["Étude de faisabilité","Sélection des équipements","Installation et câblage","Tests de performance","Formation opérateurs","Contrat de maintenance"],
   process:["Cahier des charges","Design système","Fabrication","Installation","Tests & réglages","Livraison"]}
];

const REALISATIONS=[
  {id:1,img:"/Step-traitement.jpg.jpeg",titre:"Station d'Épuration Agroalimentaire",lieu:"Meknès",cat:"STEP",pb:"Traitement des eaux usées industrielles chargées en DCO (>3000 mg/L)",sol:"Filière physico-chimique avec coagulation PAC et floculation anionique",tags:["STEP","Coagulation","Floculation"]},
  {id:2,img:"/bassin-desinfection.jpg.jpeg",titre:"Optimisation Filière Biologique",lieu:"El Jadida",cat:"Optimisation",pb:"Rendements d'épuration insuffisants — DCO rejet > norme",sol:"Audit complet, recalibration des doses de réactifs, optimisation biologique",tags:["Audit","Optimisation","Biologique"]},
  {id:3,img:"/prélevement-eau de mer.jpg.jpeg",titre:"Bilan Environnemental Rejet Industriel",lieu:"Côte Atlantique",cat:"Analyse",pb:"Évaluation de l'impact des rejets industriels en milieu marin",sol:"Campagne d'analyses NM/ISO sur 12 mois",tags:["Bilan","NM/ISO","Milieu marin"]},
  {id:4,img:"/analyse -terrain.jpg.jpeg",titre:"Analyse Qualité Eau de Puits",lieu:"Province de Settat",cat:"Analyse",pb:"Vérification de la potabilité d'une eau de puits pour usage domestique",sol:"Analyses bactériologiques et physicochimiques selon norme NM 03.7.001",tags:["Eau potable","Bactériologie","NM 03.7.001"]},
  {id:5,img:"/mesure-site.jpg.jpeg",titre:"Mesures Atmosphériques H₂S et NH₃",lieu:"Ouarzazate",cat:"Analyse",pb:"Contrôle des émissions gazeuses d'une STEP pour conformité réglementaire",sol:"Campagne de mesures avec analyseur Testo certifié",tags:["Atmosphérique","H₂S","ABHS"]},
  {id:6,img:"/Laboratoire-uem.jpg.jpeg",titre:"Développement Laboratoire d'Analyse",lieu:"El Jadida",cat:"Laboratoire",pb:"Renforcement des capacités analytiques pour répondre à la demande régionale",sol:"Équipement complet, qualification métrologique ISO, formation techniciens",tags:["Laboratoire","ISO","Formation"]},
  {id:7,img:"/Step-traitement.jpg.jpeg",titre:"Installation Osmoseur 4 m³/h",lieu:"Casablanca",cat:"Installation",pb:"Production d'eau ultra-pure pour industrie pharmaceutique",sol:"Osmoseur industriel 4 m³/h double pass, châssis inox 316L, SCADA intégré",tags:["Osmose inverse","Pharma","Double pass"]},
  {id:8,img:"/bassin-desinfection.jpg.jpeg",titre:"Mise en Service STEP Communale",lieu:"El Jadida",cat:"STEP",pb:"Mise en service d'une micro-STEP pour collectivité rurale",sol:"Installation, paramétrage, formation opérateurs et contrat de maintenance annuel",tags:["STEP","Collectivité","Formation"]},
  {id:9,img:"/mesure-bruit.jpg.jpeg",titre:"Surveillance Qualité Eau de Surface",lieu:"Souss-Massa",cat:"Analyse",pb:"Suivi mensuel qualité oued récepteur après mise en service STEP",sol:"Programme surveillance NM/ISO sur 24 mois",tags:["Surveillance","Oued","Programme 24 mois"]}
];

const ARTICLES_DEFAULT=[
  {id:"d1",titre:"Traitement des eaux usées industrielles : nouvelles normes NM 2024",resume:"Les dernières évolutions réglementaires marocaines en matière de traitement des effluents industriels et leurs impacts sur les entreprises.",date:"Juin 2024",cat:"Réglementation"},
  {id:"d2",titre:"Osmoseur industriel : guide complet pour choisir votre système",resume:"Capacité, membranes, pression, énergie : tous les critères pour sélectionner le bon système d'osmose inverse pour votre industrie.",date:"Mai 2024",cat:"Guide"},
  {id:"d3",titre:"HSE au Maroc : obligations légales et bonnes pratiques industrielles",resume:"Panorama des textes réglementaires HSE en vigueur au Maroc et méthodes d'implémentation efficaces pour les PME et grandes industries.",date:"Avril 2024",cat:"HSE"}
];

const CLIENTS=[
  {name:"Somavian",img:"/somavian.jpg"},
  {name:"Excellence Group",img:"/exc-group.jpg"},
  {name:"Ferti Africa",img:"/ferti-africa.jpg"},
  {name:"Chambre d'Agriculture Casablanca-Settat",img:"/chambre-agricole-1.jpg"},
  {name:"Hôtel Centre Ville",img:"/hotel-centre-ville.jpg"},
  {name:"OCP",img:"/ocp.jpg"},
  {name:"SBM — Béton Maghreb",img:"/sbm-beton-maghreb.jpg"},
  {name:"Continental",img:"/continental.jpg"},
  {name:"WIN TSI",img:"/wintsi.jpg"},
  {name:"Hôtel La Place El Jadida",img:"/hotel-la-place.jpg"},
  {name:"Zara Hotel",img:"/zara-hotel.jpg"},
  {name:"SGTM",img:"/sgtm.jpg"},
  {name:"Agri Trade Maroc",img:"/agritrade-maroc.jpg"},
  {name:"HG Golf",img:"/hg-golf.jpg"},
  {name:"Akwel",img:"/akwel.jpg"},
  {name:"NGE",img:"/nge.jpg"},
  {name:"TAQA Morocco",img:"/taqa-morocco.jpg"},
  {name:"Nature Growers",img:"/nature-growers.jpg"},
  {name:"Royal Golf El Jadida",img:"/royal-golf-eljadida.jpg"}
];
const TICKER=["Osmoseurs industriels 500 L/h à 10 m³/h","Réactifs chimiques certifiés — Livraison 24h","Analyses NM/ISO — El Jadida","+200 projets STEP au Maroc","Entreprise marocaine — 15 ans d'expertise","Études d'impact environnemental"];
const ADVANTAGES=[
  {icon:Ico.check,title:"Qualité certifiée",desc:"Produits & services conformes aux normes NM, ISO et réglementations marocaines"},
  {icon:Ico.target,title:"Solutions sur mesure",desc:"Études personnalisées adaptées à chaque contexte industriel et budgétaire"},
  {icon:Ico.bulb,title:"Innovation continue",desc:"Technologies de pointe pour répondre aux défis environnementaux les plus complexes"},
  {icon:Ico.handshake,title:"Accompagnement global",desc:"De l'étude initiale à la maintenance, UEM reste à vos côtés à chaque étape"}
];
const PRODUCTS_CAR=[
  {id:1,icon:Ico.flask,title:"Réactifs laboratoire",img:null,page:"reactifs"},
  {id:2,icon:Ico.beaker,title:"Produits chimiques eaux",img:null,page:"reactifs"},
  {id:3,icon:Ico.gauge,title:"Osmoseurs industriels",img:"/osmoseur-grand.webp",page:"osmoseurs"},
  {id:4,icon:Ico.drop,title:"Osmoseurs domestiques",img:"/osmoseur-petit.webp",page:"osmoseurs"},
  {id:5,icon:Ico.filter3,title:"Adoucisseurs d'eau",img:null,page:"osmoseurs"},
  {id:6,icon:Ico.gear,title:"Consommables",img:null,page:"reactifs"},
  {id:7,icon:Ico.leaf,title:"Produits HSE",img:null,page:"reactifs"},
  {id:8,icon:Ico.chart,title:"Équipements mesure",img:null,page:"reactifs"}
];

/* APP COMPONENT */
export default function App() {
  const [page, setPage] = useState("home");
  const [toasts, setToasts] = useState([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMsgs, setAiMsgs] = useState([{role:"bot",text:"Bonjour ! Je suis l'assistant UEM. Posez-moi vos questions sur nos osmoseurs (48 000 à 230 000 MAD), réactifs chimiques, analyses ou services d'ingénierie."}]);
  const [aiInp, setAiInp] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const [carOff, setCarOff] = useState(0);
  const [mobOpen, setMobOpen] = useState(false);
  const [realFilter, setRealFilter] = useState("Tous");
  const [blogs, setBlogs] = useState(() => {try{return JSON.parse(localStorage.getItem("uem_blogs")||"[]")}catch{return []}});
  const [blogForm, setBlogForm] = useState({title:"",excerpt:"",category:"Actualités"});
  const [techDetails, setTechDetails] = useState(() => {try{return JSON.parse(localStorage.getItem("uem_tech")||'{"osmoseurs":{},"reactifs":{},"services":{}}')}catch{return {osmoseurs:{},reactifs:{},services:{}}}});
  const [form, setForm] = useState({name:"",email:"",company:"",service:"",message:""});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const aiRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("uem-css")) {
      const s = document.createElement("style"); s.id = "uem-css"; s.textContent = CSS;
      document.head.appendChild(s);
    }
  }, []);
  useEffect(() => {if(aiRef.current) aiRef.current.scrollTop = aiRef.current.scrollHeight}, [aiMsgs, aiLoad]);
  useEffect(() => {localStorage.setItem("uem_blogs", JSON.stringify(blogs))}, [blogs]);
  useEffect(() => {localStorage.setItem("uem_tech", JSON.stringify(techDetails))}, [techDetails]);
  useEffect(() => {window.scrollTo(0,0)}, [page]);

  const toast = useCallback((msg, type="success") => {
    const id = Date.now();
    setToasts(t => [...t, {id,msg,type}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const sendAI = useCallback(async () => {
    if (!aiInp.trim() || aiLoad) return;
    const msg = aiInp.trim(); setAiInp("");
    setAiMsgs(m => [...m, {role:"user",text:msg}]);
    setAiLoad(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,
          system:"Tu es l'assistant expert d'UEM (Univers Environnement Maroc), El Jadida. Catalogue : Osmoseurs 500L/h à 10m³/h (48 000 à 230 000 MAD HT), Réactifs (PAC, FeCl3, floculants, anti-scalant, hypochlorite), Analyses NM/ISO, Conception STEP. Tel: +212 523 37 74 17. Réponds en français, professionnel, concis.",
          messages:[{role:"user",content:msg}]})
      });
      const d = await res.json();
      setAiMsgs(m => [...m, {role:"bot",text:d?.content?.[0]?.text||"Contactez-nous au +212 523 37 74 17."}]);
    } catch { setAiMsgs(m => [...m, {role:"bot",text:"Erreur réseau. Contactez-nous au +212 523 37 74 17."}]); }
    setAiLoad(false);
  }, [aiInp, aiLoad]);

  const handleSubmit = async () => {
    if (!form.name||!form.email||!form.message) {toast("Veuillez remplir tous les champs requis.","warning"); return;}
    setSending(true);
    try {
      await emailjs.send("service_3p09q76","template_1qu65qm",{from_name:form.name,from_email:form.email,company:form.company,service:form.service,message:form.message},"bhR3gf_SYQEaKSOky");
      setSent(true); setForm({name:"",email:"",company:"",service:"",message:""});
      toast("Message envoyé ! Nous vous répondons sous 24h.");
    } catch { toast("Erreur. Contactez-nous au +212 523 37 74 17","error"); }
    setSending(false);
  };

  const nav = (p) => { setPage(p); setMobOpen(false); };
  const scrollTo = (id) => {
    if (page !== "home") { setPage("home"); setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"}), 150); }
    else document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setMobOpen(false);
  };
  /* Demande de devis contextualisée : pré-remplit le champ "service" du formulaire
     avec le produit/service concerné puis scrolle vers le formulaire de contact.
     Remplace l'ancien système de panier, plus adapté à une vente B2B sur devis. */
  const requestDevis = (serviceName) => {
    setForm(f => ({...f, service: serviceName}));
    toast(`Devis pré-rempli pour « ${serviceName} »`);
    scrollTo("contact");
  };

  if (page === "admin") return <AdminPage auth={adminAuth} pwd={adminPwd} setPwd={setAdminPwd} setAuth={setAdminAuth} blogs={blogs} setBlogs={setBlogs} blogForm={blogForm} setBlogForm={setBlogForm} techDetails={techDetails} setTechDetails={setTechDetails} setPage={setPage} toast={toast}/>;

  const PageHdr = ({cat,title,sub,back}) => (
    <div className="ph"><div className="ph-in">
      <button className="ph-bk" onClick={() => nav(back||"home")}>←</button>
      <div><div className="ph-cat">{cat}</div><h1 className="ph-h1" dangerouslySetInnerHTML={{__html:title}}/>{sub && <p className="ph-sub">{sub}</p>}</div>
    </div></div>
  );

  const TB = () => (
    <div className="tb"><div className="tb-in">
      <div className="tb-l">
        <a className="tb-a" href="tel:+212523377417">{Ico.phone}+212 523 37 74 17</a>
        <a className="tb-a" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">{Ico.whatsapp}+212 700 090 365</a>
        <span className="tb-a">{Ico.pin}N°1, Bd Jabrane Khalil Jabrane, El Jadida</span>
        <a className="tb-a" href="mailto:univers.env@gmail.com">{Ico.mail}univers.env@gmail.com</a>
      </div>
      <div className="tb-soc">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">{Ico.linkedin}</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">{Ico.facebook}</a>
      </div>
    </div></div>
  );

  const NB = () => (
    <nav className="nb"><div className="nb-in">
      <div className="logo" onClick={() => nav("home")}><img className="logo-img" src="/logo-uem-icon.png" alt="UEM"/><div className="logo-tx"><span className="logo-n">Univers Environnement</span><span className="logo-s">MAROC – EL JADIDA</span></div></div>
      <ul className="nb-links">
        <li className="nb-item"><button className={`nb-btn${page==="home"?" on":""}`} onClick={() => nav("home")}>Accueil</button></li>
        <li className="nb-item"><button className="nb-btn">À propos</button></li>
        <li className="nb-item">
          <button className={`nb-btn${page==="services"||page.startsWith("svc-")?" on":""}`}>Nos services <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>
          <div className="dd">
            {[[Ico.drop,"Traitement des eaux"],[Ico.beaker,"Analyses NM/ISO"],[Ico.ruler,"Ingénierie & Conception"],[Ico.leaf,"Environnement & HSE"],[Ico.cap,"Formation"],[Ico.wrench,"Maintenance & SAV"]].map(([ic,t],i) => (
              <button key={i} className="dd-btn" onClick={() => nav("services")}><span className="dd-ico">{ic}</span>{t}</button>
            ))}
          </div>
        </li>
        <li className="nb-item">
          <button className={`nb-btn${page==="osmoseurs"||page==="reactifs"?" on":""}`}>Nos produits <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>
          <div className="dd">
            <button className="dd-btn" onClick={() => nav("osmoseurs")}><span className="dd-ico">{Ico.gauge}</span>Osmoseurs industriels</button>
            <button className="dd-btn" onClick={() => nav("reactifs")}><span className="dd-ico">{Ico.flask}</span>Réactifs chimiques</button>
            <button className="dd-btn" onClick={() => nav("osmoseurs")}><span className="dd-ico">{Ico.filter3}</span>Adoucisseurs d'eau</button>
            <button className="dd-btn" onClick={() => nav("reactifs")}><span className="dd-ico">{Ico.beaker}</span>Équipements de mesure</button>
          </div>
        </li>
        <li className="nb-item"><button className={`nb-btn${page==="realisations"?" on":""}`} onClick={() => nav("realisations")}>Nos réalisations</button></li>
        <li className="nb-item"><button className="nb-btn" onClick={() => scrollTo("blog")}>Actualités</button></li>
        <li className="nb-item"><button className="nb-btn" onClick={() => scrollTo("contact")}>Contact</button></li>
      </ul>
      <button className="nb-cta" onClick={() => scrollTo("contact")}>Demander un devis</button>
      <button className="nb-adm" title="Administration" onClick={() => nav("admin")}>{Ico.gear}</button>
      <button className="burger" onClick={() => setMobOpen(o=>!o)}><span/><span/><span/></button>
    </div>
    <div className={`mob-menu${mobOpen?" open":""}`}>
      <button onClick={() => nav("home")}>Accueil</button>
      <button onClick={() => nav("services")}>Nos services</button>
      <button onClick={() => nav("osmoseurs")}>Osmoseurs industriels</button>
      <button onClick={() => nav("reactifs")}>Réactifs chimiques</button>
      <button onClick={() => nav("realisations")}>Nos réalisations</button>
      <button onClick={() => scrollTo("blog")}>Actualités</button>
      <button onClick={() => scrollTo("contact")}>Contact</button>
      <button onClick={() => nav("admin")}>Administration</button>
    </div></nav>
  );

  const FT = () => (
    <footer className="footer"><div className="ft-in">
      <div className="ft-logo">
        <div className="logo" onClick={() => nav("home")} style={{cursor:"pointer"}}><img className="logo-img" src="/logo-uem-icon.png" alt="UEM"/><div className="logo-tx"><span className="logo-n">Univers Environnement</span><span className="logo-s">MAROC – EL JADIDA</span></div></div>
        <p className="ft-desc">Spécialiste marocain en traitement des eaux, analyses environnementales, produits chimiques et équipements depuis plus de 15 ans. El Jadida, Maroc.</p>
        <div className="ft-soc">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">{Ico.linkedin}</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">{Ico.facebook}</a>
        </div>
      </div>
      <div className="ft-col"><h4>Nos services</h4><ul>
        <li onClick={() => nav("services")}>Traitement des eaux</li>
        <li onClick={() => nav("services")}>Analyses NM/ISO</li>
        <li onClick={() => nav("services")}>Ingénierie & Conception</li>
        <li onClick={() => nav("services")}>Environnement & HSE</li>
        <li onClick={() => nav("services")}>Maintenance & SAV</li>
      </ul></div>
      <div className="ft-col"><h4>Nos produits</h4><ul>
        <li onClick={() => nav("osmoseurs")}>Osmoseurs industriels</li>
        <li onClick={() => nav("reactifs")}>Réactifs chimiques</li>
        <li onClick={() => nav("osmoseurs")}>Adoucisseurs d'eau</li>
        <li onClick={() => nav("reactifs")}>Équipements de mesure</li>
        <li onClick={() => nav("reactifs")}>Consommables</li>
      </ul></div>
      <div className="ft-col"><h4>Informations</h4><ul>
        <li onClick={() => scrollTo("contact")}>Contact & Devis</li>
        <li onClick={() => nav("realisations")}>Nos réalisations</li>
        <li onClick={() => scrollTo("blog")}>Actualités</li>
        <li onClick={() => nav("admin")}>Administration</li>
      </ul>
      <div style={{marginTop:18,fontSize:12.5,opacity:.75,lineHeight:1.9}}>
        <div style={{fontSize:10.5,opacity:.7,marginBottom:4,textTransform:"uppercase",letterSpacing:"1px"}}>Horaires</div>
        <div>Lun – Ven : 8h30 – 18h00</div><div>Sam : 9h00 – 13h00</div>
      </div></div>
    </div>
    <div className="ft-bot">
      <span>© {new Date().getFullYear()} Univers Environnement Maroc — Tous droits réservés</span>
      <span>N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc</span>
    </div></footer>
  );

  const AI = () => (
    <div className="ai-fl">
      <div className={`ai-win${aiOpen?" open":""}`}>
        <div className="ai-hd"><div className="ai-av">{Ico.robot}</div><div><div className="ai-nm">Assistant UEM</div><div className="ai-st">● En ligne</div></div><button className="ai-cx" onClick={() => setAiOpen(false)}>{Ico.close}</button></div>
        <div className="ai-msgs" ref={aiRef}>
          {aiMsgs.map((m,i) => <div key={i} className={`ai-msg ${m.role}`}>{m.text}</div>)}
          {aiLoad && <div className="ai-typ"><span/><span/><span/></div>}
        </div>
        <div className="ai-ir">
          <input className="ai-inp" placeholder="Posez votre question..." value={aiInp} onChange={e=>setAiInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAI()}/>
          <button className="ai-snd" onClick={sendAI} disabled={aiLoad||!aiInp.trim()}>{Ico.send}</button>
        </div>
      </div>
      <button className="ai-tog" onClick={() => setAiOpen(o=>!o)}>{Ico.robot}</button>
    </div>
  );

  const WA = () => (
    <div className="wa-fl">
      <a className="wa-btn" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
        <div className="wa-pulse"/>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );

  const iconMap = {success:Ico.check, warning:Ico.info, error:Ico.close, delete:Ico.close};
  const TOASTS = () => <div className="toast-wr">{toasts.map(t => <div key={t.id} className="toast">{iconMap[t.type]||Ico.check} {t.msg}</div>)}</div>;

  const CONTACT_SECTION = () => (
    <section className="contact-sec" id="contact">
      <div className="contact-in">
        <div className="ct-inf">
          <h2>Demandez votre <em>devis gratuit</em> dès aujourd'hui</h2>
          <p>Notre équipe d'experts vous répond en moins de 24 heures avec une solution technique et tarifaire adaptée à vos besoins.</p>
          <div className="ct-dets">
            {[{i:Ico.phone,l:"Téléphone",v:"+212 523 37 74 17"},{i:Ico.whatsapp,l:"WhatsApp",v:"+212 700 090 365"},{i:Ico.mail,l:"Email",v:"univers.env@gmail.com"},{i:Ico.pin,l:"Adresse",v:"N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc"}].map((d,i) => (
              <div className="ct-det" key={i}><div className="ct-ico">{d.i}</div><div><div className="ct-lbl">{d.l}</div><div className="ct-val">{d.v}</div></div></div>
            ))}
          </div>
        </div>
        <div className="ct-form">
          <div className="ct-form-t">{Ico.info} Formulaire de contact</div>
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
                {OSMOSEURS.map(o => <option key={o.id} value={o.nom}>{o.nom}</option>)}
                <option value="Réactifs chimiques">Réactifs chimiques</option>
              </select>
            </div>
          </div>
          <div className="fg"><label>Votre message *</label><textarea placeholder="Décrivez votre besoin, débit requis, type d'effluents..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}/></div>
          <button className="btn-send" onClick={handleSubmit} disabled={sending}>{sending?"Envoi...":"Envoyer ma demande →"}</button>
          {sent && <div className="form-ok">{Ico.check} Message envoyé ! Nous vous répondons sous 24h.</div>}
        </div>
      </div>
    </section>
  );

  /* ── PAGE OSMOSEURS ── */
  if (page === "osmoseurs") return (
    <div>
      <TB/><NB/>
      <PageHdr cat="Équipements & Systèmes" title="Osmoseurs Industriels <em>Clé en Main</em>" sub="Systèmes d'osmose inverse de 500 L/h à 10 m³/h. Installation, garantie et SAV UEM inclus. Prix publics TTC disponibles."/>
      <div className="pbody">
        <div className="os-features">
          {[
            {icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/></svg>,t:"Solution clé en main",d:"De la conception à la mise en service, UEM gère tout"},
            {icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 10-5.4 5.4L2 19l3 3 7.3-7.3a4 4 0 005.4-5.4l-2.8 2.8-2-2z"/></svg>,t:"Support & Maintenance",d:"Maintenance préventive et corrective sur site"},
            {icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,t:"Stock local au Maroc",d:"Pièces de rechange disponibles à El Jadida"},
            {icon:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,t:"Garantie constructeur 2 ans",d:"Sur les équipements et les membranes installés"}
          ].map((f,i) => (
            <div className="os-feat" key={i}><div className="os-feat-ico">{f.icon}</div><div className="os-feat-t">{f.t}</div><div className="os-feat-d">{f.d}</div></div>
          ))}
        </div>

        <div className="info-box">
          {Ico.info}
          <p><strong>Prix indicatifs HT</strong> — Les tarifs peuvent varier selon les options (double pass, SCADA, distance). Contactez-nous pour un devis personnalisé gratuit sous 24h. <strong>Financement disponible</strong> : crédit-bail, leasing, paiement échelonné.</p>
        </div>
        <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"18px",fontWeight:700,marginBottom:16,color:"var(--g900)",display:"flex",alignItems:"center",gap:8}}>{Ico.chart} Tableau comparatif des modèles</h2>
        <div className="os-compare">
          <table className="os-table">
            <thead><tr><th>Modèle</th><th>Débit</th><th>Rejection</th><th>Pression</th><th>Châssis</th><th>SCADA</th><th>Prix HT</th><th></th></tr></thead>
            <tbody>
              {OSMOSEURS.map(o => (
                <tr key={o.id}>
                  <td className="ref-td">{o.ref}</td>
                  <td className="debit-td">{o.debit}</td>
                  <td>{o.id>=7?">99%":o.id>=3?">98%":">97%"}</td>
                  <td>{o.specs[0].replace("Pression : ","")}</td>
                  <td>{o.id>=5?"Inox 316L":"Inox 304"}</td>
                  <td style={{color:"var(--vert3)",fontWeight:700}}>{o.id>=7?"✓":"-"}</td>
                  <td className="prix-td">{o.prix}</td>
                  <td><button className="btn-devis" onClick={() => requestDevis(o.nom)}>Devis</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="divider"/>
        <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"18px",fontWeight:700,marginBottom:28,color:"var(--g900)"}}>Fiches techniques détaillées</h2>
        <div className="os-grid">
          {OSMOSEURS.map(o => (
            <div className={`os-card${o.badge==="best"?" featured":""}`} key={o.id}>
              <div className="os-img">
                {o.img?<img src={o.img} alt={o.nom} onError={e=>e.target.style.display="none"}/>:<div className="os-img-ph">{Ico.gauge}</div>}
                {o.badge==="best"&&<span className="os-badge best">{Ico.starOutline} Meilleure vente</span>}
                {o.badge==="pop"&&<span className="os-badge pop">{Ico.fire} Populaire</span>}
                {o.badge==="pro"&&<span className="os-badge pro">PRO</span>}
              </div>
              <div className="os-body">
                <div className="os-ref">{o.ref}</div>
                <div className="os-debit">{o.debit}</div>
                <div className="os-nom">{o.nom}</div>
                <div className="os-desc">{o.desc}</div>
                <div className="os-specs">{o.specs.map((s,i)=><div className="os-spec" key={i}>{s}</div>)}</div>
                {techDetails.osmoseurs?.[o.id] && <div className="tech-note"><strong>Détail technique :</strong> {techDetails.osmoseurs[o.id]}</div>}
                <div className="os-foot">
                  <div><div className="os-px">{o.prix}</div><div className="os-px-sub">HT — Livraison comprise</div></div>
                  <button className="btn-devis" onClick={() => requestDevis(o.nom)}>Demander un devis</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="divider"/>
        <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"18px",fontWeight:700,marginBottom:20,color:"var(--g900)"}}>Notre processus d'installation</h2>
        <div className="step-grid">
          {[{n:1,t:"Étude des besoins",d:"Analyse qualité eau source, débit requis, contraintes site"},{n:2,t:"Sélection équipement",d:"Choix du modèle adapté, options et accessoires"},{n:3,t:"Installation",d:"Montage, raccordements hydrauliques et électriques"},{n:4,t:"Mise en service",d:"Tests de performance, réglages et formation opérateurs"}].map((s,i) => (
            <div className="step-card" key={i}><div className="step-num">{s.n}</div><div className="step-t">{s.t}</div><div className="step-d">{s.d}</div>{i<3&&<span className="step-arr">→</span>}</div>
          ))}
        </div>
      </div>
      <CONTACT_SECTION/><FT/><AI/><WA/><TOASTS/>
    </div>
  );

  /* ── PAGE RÉACTIFS ── */
  if (page === "reactifs") return (
    <div>
      <TB/><NB/>
      <PageHdr cat="Produits Chimiques" title="Catalogue <em>Réactifs Chimiques</em>" sub="Coagulants, floculants, désinfectants, produits osmose inverse et chaudière. Livraison 24-48h sur tout le Maroc."/>
      <div className="pbody">
        <div className="info-box">
          {Ico.info}
          <p><strong>Stock permanent à El Jadida</strong> — Tous nos réactifs sont stockés localement pour une livraison rapide. <strong>Tarifs sur devis</strong> selon les quantités. Conditionnements : bidons 25L, fûts 200L, IBC 1000L. Fiche de données de sécurité (FDS) fournie pour chaque produit.</p>
        </div>
        <div className="chim-grps">
          {Object.entries(REACTIFS).map(([grp, prods]) => (
            <div key={grp}>
              <div className="chim-grp-hd"><h3>{grp}</h3><span className="chim-pill">{prods.length} produits</span></div>
              <div className="chim-cards">
                {prods.map(p => (
                  <div className="chim-card" key={p.id}>
                    <div className="chim-ph" style={{color:"var(--bleu2)"}}>{reactifIco(p.type)}</div>
                    <div className="chim-body">
                      <div className="chim-grp-lbl">{p.type}</div>
                      <div className="chim-nom">{p.nom}</div>
                      <div className="chim-desc">{p.desc}</div>
                      {techDetails.reactifs?.[p.id] && <div className="tech-note"><strong>Détail technique :</strong> {techDetails.reactifs[p.id]}</div>}
                      <div className="chim-foot">
                        <span className="chim-type">{p.type}</span>
                        <button className="btn-chim" onClick={() => requestDevis(p.nom)}>Demander prix</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CONTACT_SECTION/><FT/><AI/><WA/><TOASTS/>
    </div>
  );

  /* ── PAGE SERVICES ── */
  if (page === "services") return (
    <div>
      <TB/><NB/>
      <PageHdr cat="Nos Services" title="Ingénierie Environnementale & <em>Analyses Certifiées</em>" sub="Bureau d'études, analyses de laboratoire NM/ISO, conception STEP et études d'impact. L'expertise UEM au service de votre conformité."/>
      <div className="pbody">
        <div className="svc-det-grid">
          {SERVICES_DETAIL.map(s => (
            <div className="svc-det-card" key={s.id} onClick={() => nav(`svc-${s.id}`)}>
              <div className="svc-det-img">
                {s.img && <img src={s.img} alt={s.titre} onError={e=>e.target.style.display="none"}/>}
                <span className={`svc-det-tag ${s.tag}`}>{s.cat}</span>
              </div>
              <div className="svc-det-body">
                <div className="svc-det-t">{s.titre}</div>
                <div className="svc-det-d">{s.desc.substring(0,120)}...</div>
                <ul className="svc-det-feats">{s.feats.slice(0,4).map((f,i)=><li key={i}>{f}</li>)}</ul>
                <button className="btn-svc">Voir le détail →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CONTACT_SECTION/><FT/><AI/><WA/><TOASTS/>
    </div>
  );

  /* ── PAGE SERVICE DETAIL ── */
  const svcMatch = SERVICES_DETAIL.find(s => page === `svc-${s.id}`);
  if (svcMatch) {
    const s = svcMatch;
    return (
      <div>
        <TB/><NB/>
        <PageHdr cat={s.cat} title={s.titre} sub={s.desc} back="services"/>
        <div className="pbody">
          <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"17px",fontWeight:700,marginBottom:18,color:"var(--g900)"}}>Nos prestations incluses</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:36}}>
            {s.feats.map((f,i) => (
              <div key={i} style={{background:"var(--g50)",border:"1px solid var(--g200)",borderRadius:10,padding:"13px 16px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:"var(--vert3)",flexShrink:0,display:"flex"}}>{Ico.check}</span>
                <span style={{fontSize:13.5,color:"var(--g700)",fontWeight:500}}>{f}</span>
              </div>
            ))}
          </div>
          {techDetails.services?.[s.id] && (
            <div className="tech-note" style={{marginBottom:36}}><strong>Détail technique complémentaire :</strong> {techDetails.services[s.id]}</div>
          )}
          <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"17px",fontWeight:700,marginBottom:18,color:"var(--g900)"}}>Notre processus</h2>
          <div className="step-grid" style={{gridTemplateColumns:`repeat(${Math.min(s.process.length,4)},1fr)`}}>
            {s.process.map((p,i) => (
              <div className="step-card" key={i}><div className="step-num">{i+1}</div><div className="step-t">{p}</div>{i<s.process.length-1&&<span className="step-arr">→</span>}</div>
            ))}
          </div>
          <div style={{background:"linear-gradient(135deg,var(--bleu),var(--bleu2))",borderRadius:16,padding:"32px",textAlign:"center",marginTop:36}}>
            <h3 style={{fontFamily:"'Poppins',sans-serif",fontSize:20,fontWeight:700,color:"#fff",marginBottom:10}}>Besoin de ce service ?</h3>
            <p style={{color:"rgba(255,255,255,.8)",fontSize:14,marginBottom:22,lineHeight:1.65}}>Notre équipe d'experts vous répond sous 24h avec une proposition technique et tarifaire personnalisée.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-prim" style={{background:"#fff",color:"var(--bleu)"}} onClick={() => requestDevis(s.titre)}>Demander un devis gratuit →</button>
              <a className="btn-wa-s" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">{Ico.whatsapp}Parler à un expert</a>
            </div>
          </div>
        </div>
        <FT/><AI/><WA/><TOASTS/>
      </div>
    );
  }

  /* ── PAGE RÉALISATIONS ── */
  if (page === "realisations") {
    const cats = ["Tous", ...new Set(REALISATIONS.map(r => r.cat))];
    const filtered = realFilter==="Tous" ? REALISATIONS : REALISATIONS.filter(r => r.cat===realFilter);
    return (
      <div>
        <TB/><NB/>
        <PageHdr cat="Portfolio" title="Nos <em>Réalisations</em> au Maroc" sub={`${REALISATIONS.length} projets réalisés dans les domaines de l'eau, de l'environnement et de l'analyse industrielle.`}/>
        <div className="pbody">
          <div className="real-filters">{cats.map(c => <button key={c} className={`rf-btn${realFilter===c?" on":""}`} onClick={() => setRealFilter(c)}>{c}</button>)}</div>
          <div className="real-grid">
            {filtered.map(r => (
              <div className="real-card" key={r.id}>
                <div className="real-img">
                  {r.img && <img src={r.img} alt={r.titre} onError={e=>e.target.style.display="none"}/>}
                  <span className="real-cat">{r.cat}</span>
                </div>
                <div className="real-body">
                  <div className="real-lieu">{Ico.pin} {r.lieu}</div>
                  <div className="real-t">{r.titre}</div>
                  <div className="real-pb"><strong>Problématique :</strong> {r.pb}</div>
                  <div className="real-pb"><strong>Solution :</strong> {r.sol}</div>
                  <div className="real-tags">{r.tags.map((t,i)=><span key={i} className="real-tag">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FT/><AI/><WA/><TOASTS/>
      </div>
    );
  }

  /* ── HOME PAGE ── */
  return (
    <div>
      <TB/><NB/>
      <section className="hero" id="home">
        <div className="hero-bg"><img src="/hero-cover.jpg" alt="Univers Environnement Maroc" loading="eager"/></div>
        <div className="hero-in">
          <div className="hero-txt">
            <div className="hero-tag">L'expertise verte au service du Maroc</div>
            <h1>Traitement des eaux, osmose inverse, ingénierie environnementale, analyses, équipements et réactifs chimiques au Maroc</h1>
            <p className="hero-desc">Univers Environnement Maroc accompagne les industriels, collectivités, bureaux d'études et laboratoires avec des solutions complètes en traitement des eaux, osmose inverse, stations d'épuration (STEP), analyses environnementales, réactifs chimiques, équipements de laboratoire, conception, installation, maintenance et assistance technique partout au Maroc.</p>
            <div className="hero-btns">
              <button className="btn-prim" onClick={() => scrollTo("contact")}>Demander un devis gratuit →</button>
              <button className="btn-outl" onClick={() => nav("realisations")}>Voir nos réalisations</button>
              <a className="btn-wa-s" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">{Ico.whatsapp}Parler à un expert</a>
            </div>
            <div className="hero-trust">
              {[{i:Ico.gauge,t:"Réponse < 24h"},{i:Ico.starOutline,t:"Experts certifiés"},{i:Ico.check,t:"Normes NM / ISO"},{i:Ico.pin,t:"Tout le Maroc"}].map((x,i)=><div className="tr-item" key={i}><span>{x.i}</span>{x.t}</div>)}
            </div>
          </div>
        </div>
        <div className="badge15"><div className="b15-n">15<span className="b15-s">+</span></div><div className="b15-l">ANS<br/>D'EXPÉRIENCE<br/>AU MAROC</div></div>
      </section>

      <div className="stats"><div className="stats-in">
        {[{i:Ico.trophy,n:"15+",l:"Ans d'expérience"},{i:Ico.folder,n:"200+",l:"Projets réalisés"},{i:Ico.users,n:"500+",l:"Clients satisfaits"},{i:Ico.star,n:"98%",l:"Taux de satisfaction"}].map((s,i)=>(
          <div className="stat" key={i}><div className="stat-n"><span className="stat-ico">{s.i}</span>{s.n}</div><div className="stat-l">{s.l}</div></div>
        ))}
      </div></div>

      <div className="clients"><div className="cl-in">
        <div className="cl-ttl">Clients de référence</div>
        <div className="cl-logos">{CLIENTS.map((c,i)=><div key={i} className="cl-logo" title={c.name}><img src={c.img} alt={c.name} loading="lazy"/></div>)}</div>
      </div></div>

      <section className="sec sec-bg" id="services">
        <div className="sec-in">
          <div className="sec-ey">NOS DOMAINES D'EXPERTISE</div>
          <h2 className="sec-ti">Des solutions <em>complètes</em> pour l'eau, l'environnement et l'industrie</h2>
          <div className="svc-grid">
            {SERVICES.map(s => (
              <div className="svc-card" key={s.id} onClick={() => nav("services")}>
                <div className="svc-ph" style={{background:`linear-gradient(135deg,${s.color}22,${s.color}44)`}}>
                  {s.img?<img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{color:s.color}}>{s.icon}</span>}
                </div>
                <div className="svc-body">
                  <div className="svc-hd"><div className="svc-ico" style={{background:s.bg,color:s.color}}>{s.icon}</div><div className="svc-nt">{s.title}</div></div>
                  <ul className="svc-ul">{s.items.map((it,j)=><li key={j}>{it}</li>)}</ul>
                  <button className="svc-lnk">Découvrir →</button>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-c"><button className="btn-nv" onClick={() => nav("services")}>Voir tous nos services →</button></div>
        </div>
      </section>

      <section className="sec sec-navy" id="products">
        <div className="sec-in">
          <div className="sec-ey">NOS PRODUITS PHARES</div>
          <h2 className="sec-ti">Des produits de qualité pour des performances durables</h2>
          <div className="car-wrap">
            <button className="car-arr l" onClick={() => setCarOff(o=>Math.max(0,o-1))}>‹</button>
            <div className="car-tr">
              {PRODUCTS_CAR.slice(carOff).concat(PRODUCTS_CAR.slice(0,carOff)).map(p => (
                <div className="prod-card" key={p.id} onClick={() => nav(p.page)}>
                  {p.img?<img className="pc-img" src={p.img} alt={p.title} onError={e=>{e.target.style.display="none";}}/>:null}
                  <div className="pc-ph" style={{display:p.img?"none":"flex",color:"#fff"}}>{p.icon}</div>
                  <div className="pc-body"><div className="pc-t">{p.title}</div></div>
                </div>
              ))}
            </div>
            <button className="car-arr r" onClick={() => setCarOff(o=>Math.min(2,o+1))}>›</button>
          </div>
          <div style={{textAlign:"center",marginTop:16,display:"flex",gap:12,justifyContent:"center"}}>
            <button style={{background:"transparent",color:"#fff",padding:"11px 26px",borderRadius:9,fontWeight:600,fontSize:14,border:"2px solid rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"inherit"}} onClick={() => nav("osmoseurs")}>Osmoseurs & Équipements →</button>
            <button style={{background:"transparent",color:"#fff",padding:"11px 26px",borderRadius:9,fontWeight:600,fontSize:14,border:"2px solid rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"inherit"}} onClick={() => nav("reactifs")}>Réactifs Chimiques →</button>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-in">
          <h2 className="sec-ti">Pourquoi choisir <em>UEM</em> ?</h2>
          <div className="adv-grid">
            {ADVANTAGES.map((a,i)=><div className="adv-card" key={i}><div className="adv-ico">{a.icon}</div><div className="adv-t">{a.title}</div><div className="adv-d">{a.desc}</div></div>)}
          </div>
        </div>
      </section>

      <div className="ticker"><div className="ticker-in">
        {[...TICKER,...TICKER].map((item,i)=><span key={i} className="tick-item"><span className="tick-dot"/>{item}</span>)}
      </div></div>

      <section className="sec sec-bg" id="realisations">
        <div className="sec-in">
          <div className="sec-ey">PORTFOLIO</div>
          <h2 className="sec-ti">Quelques <em>réalisations</em> sélectionnées</h2>
          <div className="real-grid">
            {REALISATIONS.slice(0,6).map(r => (
              <div className="real-card" key={r.id} onClick={() => nav("realisations")}>
                <div className="real-img">
                  {r.img && <img src={r.img} alt={r.titre} onError={e=>e.target.style.display="none"}/>}
                  <span className="real-cat">{r.cat}</span>
                </div>
                <div className="real-body">
                  <div className="real-lieu">{Ico.pin} {r.lieu}</div>
                  <div className="real-t">{r.titre}</div>
                  <div className="real-tags">{r.tags.map((t,i)=><span key={i} className="real-tag">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-c"><button className="btn-nv" onClick={() => nav("realisations")}>Voir toutes nos réalisations ({REALISATIONS.length}) →</button></div>
        </div>
      </section>

      <section className="sec" id="blog">
        <div className="sec-in">
          <div className="sec-ey">ACTUALITÉS & BLOG</div>
          <h2 className="sec-ti">Nos dernières <em>publications</em></h2>
          <div className="blog-grid">
            {[...ARTICLES_DEFAULT,...blogs].slice(0,3).map(post => (
              <div className="blog-card" key={post.id}>
                <div className="blog-img" style={{color:"#fff"}}>{post.icon || reactifIco(post.cat||post.category) || Ico.info}</div>
                <div className="blog-body">
                  <span className="blog-tag">{post.cat||post.category}</span>
                  <div className="blog-t">{post.titre||post.title}</div>
                  <div className="blog-ex">{post.resume||post.excerpt}</div>
                  <div className="blog-meta">{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CONTACT_SECTION/><FT/>
      <AI/><WA/><TOASTS/>
    </div>
  );
}

const TECH_TYPES = {
  osmoseurs: {label:"Osmoseur", items: OSMOSEURS.map(o=>({id:o.id, label:`${o.ref} — ${o.debit}`}))},
  reactifs: {label:"Réactif chimique", items: Object.values(REACTIFS).flat().map(p=>({id:p.id, label:p.nom}))},
  services: {label:"Service", items: SERVICES_DETAIL.map(s=>({id:s.id, label:s.titre}))}
};

function AdminPage({auth,pwd,setPwd,setAuth,blogs,setBlogs,blogForm,setBlogForm,techDetails,setTechDetails,setPage,toast}) {
  const [techType, setTechType] = useState("osmoseurs");
  const [techItemId, setTechItemId] = useState("");
  const [techText, setTechText] = useState("");
  if (!auth) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc",fontFamily:"Inter,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:18,padding:"42px 34px",boxShadow:"0 8px 40px rgba(0,0,0,.12)",width:355,textAlign:"center"}}>
        <img src="/logo-uem-icon.png" alt="UEM" style={{height:64,margin:"0 auto 13px"}}/>
        <h2 style={{fontSize:20,fontWeight:700,color:"#0d2b6e",marginBottom:7}}>Administration UEM</h2>
        <p style={{color:"#475569",fontSize:13,marginBottom:24}}>Accès réservé à l'équipe UEM</p>
        <input style={{width:"100%",padding:"11px 14px",borderRadius:9,border:"1.5px solid #e2e8f0",fontSize:14,fontFamily:"inherit",marginBottom:13,boxSizing:"border-box"}} type="password" placeholder="Mot de passe" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(pwd==="uem-admin-2026"?setAuth(true):toast("Mot de passe incorrect","error"))}/>
        <button style={{width:"100%",padding:12,background:"#0d2b6e",color:"#fff",border:"none",borderRadius:9,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>pwd==="uem-admin-2026"?setAuth(true):toast("Mot de passe incorrect","error")}>Se connecter</button>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",marginTop:13,fontSize:13,fontFamily:"inherit"}}>← Retour au site</button>
      </div>
    </div>
  );
  const addBlog = () => {
    if (!blogForm.title||!blogForm.excerpt){toast("Titre et extrait requis","warning");return;}
    setBlogs(b=>[{...blogForm,id:Date.now().toString(),date:new Date().toLocaleDateString("fr-FR",{month:"long",year:"numeric"})},...b]);
    setBlogForm({title:"",excerpt:"",category:"Actualités"});
    toast("Article publié !");
  };
  return (
    <div className="adm-wrap">
      <div className="adm-card">
        <div className="adm-hd">
          <span style={{display:"flex"}}>{Ico.gear}</span>
          <div><h1>Administration UEM</h1><div style={{fontSize:12,opacity:.8,marginTop:1}}>Gestion du site v4.2</div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:8}}>
            <button onClick={()=>setPage("home")} style={{background:"rgba(255,255,255,.2)",color:"#fff",border:"none",borderRadius:7,padding:"7px 13px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Site</button>
            <button onClick={()=>setAuth(false)} style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"none",borderRadius:7,padding:"7px 13px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Déconnexion</button>
          </div>
        </div>
        <div className="adm-bd">
          <div className="adm-sec">
            <h2>Fiches techniques — Produits & Services</h2>
            <p style={{fontSize:12.5,color:"var(--g600)",marginBottom:14,lineHeight:1.6}}>Ajoutez un détail technique complémentaire (norme, dimension, référence, condition d'usage...) qui s'affichera directement sur la fiche du produit ou service concerné sur le site public.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div className="fg">
                <label>Catégorie</label>
                <select value={techType} onChange={e=>{setTechType(e.target.value);setTechItemId("");setTechText("");}}>
                  {Object.entries(TECH_TYPES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div className="fg">
                <label>Élément</label>
                <select value={techItemId} onChange={e=>{const id=e.target.value;setTechItemId(id);setTechText(techDetails[techType]?.[id]||"");}}>
                  <option value="">Sélectionner...</option>
                  {TECH_TYPES[techType].items.map(it=><option key={it.id} value={it.id}>{it.label}</option>)}
                </select>
              </div>
            </div>
            <div className="fg">
              <label>Détail technique</label>
              <textarea style={{height:88}} placeholder="Ex : Membranes composite polyamide, raccords DN50, conforme NM ISO 9001..." value={techText} onChange={e=>setTechText(e.target.value)} disabled={!techItemId}/>
            </div>
            <button className="btn-grn" disabled={!techItemId||!techText.trim()} onClick={()=>{
              setTechDetails(td=>({...td,[techType]:{...td[techType],[techItemId]:techText.trim()}}));
              toast("Détail technique enregistré !");
            }}>Enregistrer →</button>

            {Object.entries(TECH_TYPES).some(([k])=>Object.keys(techDetails[k]||{}).length>0) && (
              <div style={{marginTop:22}}>
                <div style={{fontSize:11.5,fontWeight:700,color:"var(--g600)",textTransform:"uppercase",letterSpacing:".5px",marginBottom:10}}>Fiches déjà renseignées</div>
                {Object.entries(TECH_TYPES).map(([type,cfg]) => Object.entries(techDetails[type]||{}).map(([id,text]) => {
                  const item = cfg.items.find(it=>String(it.id)===String(id));
                  return (
                    <div className="bpi" key={`${type}-${id}`}>
                      <div><strong style={{fontSize:13}}>{cfg.label} — {item?item.label:id}</strong><div className="bpi-m">{text}</div></div>
                      <button className="btn-del" onClick={()=>{
                        setTechDetails(td=>{const copy={...td,[type]:{...td[type]}};delete copy[type][id];return copy;});
                        toast("Détail supprimé","delete");
                        if(techType===type && String(techItemId)===String(id)) setTechText("");
                      }}>Supprimer</button>
                    </div>
                  );
                }))}
              </div>
            )}
          </div>
          <div className="adm-sec">
            <h2>Ajouter un article</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div className="fg"><label style={{fontSize:11.5,fontWeight:600,color:"var(--g700)"}}>Titre *</label><input placeholder="Titre de l'article" value={blogForm.title} onChange={e=>setBlogForm(f=>({...f,title:e.target.value}))}/></div>
              <div className="fg"><label style={{fontSize:11.5,fontWeight:600,color:"var(--g700)"}}>Catégorie</label><select value={blogForm.category} onChange={e=>setBlogForm(f=>({...f,category:e.target.value}))}><option>Actualités</option><option>Guide</option><option>Réglementation</option><option>HSE</option></select></div>
            </div>
            <div className="fg"><label style={{fontSize:11.5,fontWeight:600,color:"var(--g700)"}}>Extrait *</label><textarea style={{height:72}} placeholder="Résumé..." value={blogForm.excerpt} onChange={e=>setBlogForm(f=>({...f,excerpt:e.target.value}))}/></div>
            <button className="btn-grn" onClick={addBlog}>Publier →</button>
          </div>
          <div className="adm-sec">
            <h2>Articles ({blogs.length})</h2>
            {blogs.length===0?<p style={{color:"var(--g600)",fontSize:13}}>Aucun article.</p>
            :blogs.map(post=><div className="bpi" key={post.id}><div><strong style={{fontSize:13.5}}>{post.title}</strong><div className="bpi-m">{post.category} — {post.date}</div></div><button className="btn-del" onClick={()=>{setBlogs(b=>b.filter(x=>x.id!==post.id));toast("Supprimé","delete");}}>Supprimer</button></div>)}
          </div>
          <div className="adm-sec">
            <h2>Système</h2>
            <div style={{background:"var(--g50)",borderRadius:11,padding:18,fontSize:13,color:"var(--g700)",lineHeight:1.85}}>
              <div><strong>Site :</strong> www.uem.ma</div>
              <div><strong>Stack :</strong> React 18 + Vite + EmailJS</div>
              <div><strong>EmailJS :</strong> service_3p09q76 / template_1qu65qm</div>
              <div><strong>Pages :</strong> Accueil, Osmoseurs (8 modèles + prix), Réactifs chimiques (16 produits), Services (×6 détails), Réalisations (×9 + filtres), Admin</div>
              <div><strong>Version :</strong> 4.2 — Correctifs audit (tableau osmoseurs, doublon client, icônes SVG, devis contextualisé)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
