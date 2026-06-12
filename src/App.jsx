import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const EJS = { svc:"service_3p09q76", tpl:"template_1qu65qm", key:"bhR3gf_SYQEaKSOky" };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --vert:#1b5e35;--vert2:#2e7d52;--vert3:#43a864;
  --rouge:#c0392b;--or:#c9a84c;
  --fond:#f8f6f1;--blanc:#ffffff;--noir:#0e160f;
  --gris:#6b7c70;--bordure:#e0e8e2;--sable:#f0ebe0;
  --T:cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--fond);color:var(--noir);overflow-x:hidden;-webkit-font-smoothing:antialiased;}

/* ══ NAVBAR ══ */
.nav{position:fixed;top:36px;left:0;right:0;z-index:200;transition:background .3s,box-shadow .3s;}
.nav.solid{background:rgba(248,246,241,.97);backdrop-filter:blur(20px);box-shadow:0 1px 0 var(--bordure);}
.nav-in{max-width:1320px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:68px;}
.logo{display:flex;align-items:center;gap:12px;cursor:pointer;text-decoration:none;}
.logo-sq{width:40px;height:40px;background:var(--vert);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Fraunces',serif;font-weight:900;font-size:1.1rem;flex-shrink:0;}
.logo-tx .l1{font-family:'Fraunces',serif;font-weight:700;font-size:.95rem;color:var(--vert);display:block;line-height:1.1;}
.logo-tx .l2{font-size:.58rem;font-weight:600;color:var(--rouge);letter-spacing:.15em;text-transform:uppercase;display:block;}
.nav-menu{display:flex;gap:2px;list-style:none;}
.nav-menu button{background:none;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-size:.8rem;font-weight:500;color:var(--gris);padding:8px 14px;border-radius:8px;cursor:pointer;transition:color .2s,background .2s;letter-spacing:.02em;}
.nav-menu button:hover{color:var(--vert);background:rgba(27,94,53,.07);}
.nav-menu button.on{color:var(--vert);background:rgba(27,94,53,.1);font-weight:600;}
.nav-r{display:flex;align-items:center;gap:8px;}
.btn-devis{background:var(--vert);color:#fff;border:none;padding:10px 22px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.8rem;font-weight:600;cursor:pointer;transition:background .2s,transform .15s;}
.btn-devis:hover{background:var(--vert2);transform:translateY(-1px);}
.cart-ico{position:relative;background:none;border:1px solid var(--bordure);padding:9px 14px;border-radius:8px;cursor:pointer;font-size:.9rem;transition:border-color .2s;}
.cart-ico:hover{border-color:var(--vert);}
.cbadge{position:absolute;top:-6px;right:-6px;background:var(--rouge);color:#fff;border-radius:50%;width:17px;height:17px;font-size:.6rem;font-weight:700;display:flex;align-items:center;justify-content:center;animation:pop .3s var(--T);}
@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.3)}100%{transform:scale(1)}}
.burger{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:4px;}
.burger span{display:block;width:22px;height:2px;background:var(--vert);border-radius:2px;transition:transform .3s,opacity .3s;}
.burger.on span:first-child{transform:translateY(7px) rotate(45deg);}
.burger.on span:nth-child(2){opacity:0;}
.burger.on span:last-child{transform:translateY(-7px) rotate(-45deg);}
.mob-menu{display:none;flex-direction:column;background:var(--fond);border-top:1px solid var(--bordure);overflow:hidden;max-height:0;transition:max-height .4s var(--T);}
.mob-menu.on{max-height:500px;}
.mob-menu button{display:block;width:100%;text-align:left;padding:14px 24px;background:none;border:none;border-bottom:1px solid var(--bordure);font-family:'Plus Jakarta Sans',sans-serif;font-size:.9rem;font-weight:500;color:var(--noir);cursor:pointer;transition:background .2s,color .2s;}
.mob-menu button:hover,.mob-menu button.on{background:rgba(27,94,53,.07);color:var(--vert);}
.mob-devis{background:var(--vert)!important;color:#fff!important;margin:12px 20px;width:calc(100% - 40px);border-radius:8px;text-align:center!important;padding:13px!important;}

/* ══ TICKER ══ */
.ticker{background:var(--vert);padding:10px 0;overflow:hidden;margin-top:104px;}
.ticker-in{display:flex;gap:60px;animation:slide 32s linear infinite;width:max-content;}
.tick{font-size:.67rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.8);white-space:nowrap;}
@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ══ PAGE DE GARDE ══ */
.garde{min-height:calc(100vh - 78px);display:flex;flex-direction:column;}
.garde-hero{flex:1;display:grid;grid-template-columns:1fr 1fr;max-width:1320px;margin:0 auto;padding:72px 40px 40px;gap:80px;align-items:center;}
.gh-left{display:flex;flex-direction:column;gap:28px;animation:slideUp .9s var(--T) both;}
@keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
.gh-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(192,57,43,.08);border:1px solid rgba(192,57,43,.18);padding:7px 16px;border-radius:100px;width:fit-content;}
.gh-badge-dot{width:7px;height:7px;background:var(--rouge);border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
.gh-badge span{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--rouge);}
.gh-h1{font-family:'Fraunces',serif;font-weight:900;font-size:clamp(2.6rem,5vw,4.4rem);line-height:1.06;color:var(--noir);}
.gh-h1 em{color:var(--vert);font-style:italic;}
.gh-h1 .r{color:var(--rouge);}
.gh-p{font-size:.95rem;color:var(--gris);line-height:1.85;max-width:480px;font-weight:300;}
.gh-btns{display:flex;gap:12px;flex-wrap:wrap;}
.btn-prim{background:var(--vert);color:#fff;border:none;padding:15px 32px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;font-weight:700;letter-spacing:.04em;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s;}
.btn-prim:hover{background:var(--vert2);transform:translateY(-2px);box-shadow:0 10px 28px rgba(27,94,53,.28);}
.btn-sec{background:transparent;color:var(--vert);border:1.5px solid var(--vert);padding:15px 32px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;font-weight:700;cursor:pointer;transition:background .2s,transform .2s;}
.btn-sec:hover{background:rgba(27,94,53,.07);transform:translateY(-2px);}
.gh-stats{display:flex;gap:36px;padding-top:16px;border-top:1px solid var(--bordure);}
.stat-n{font-family:'Fraunces',serif;font-size:2.2rem;font-weight:900;color:var(--vert);line-height:1;}
.stat-l{font-size:.66rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gris);margin-top:3px;}
.gh-right{display:grid;grid-template-columns:1fr 1fr;gap:16px;animation:fadeIn .9s var(--T) .3s both;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.gh-mini{background:var(--blanc);border:1px solid var(--bordure);border-radius:14px;padding:20px 18px;cursor:pointer;transition:transform .3s var(--T),box-shadow .3s,border-color .3s;}
.gh-mini:hover{transform:translateY(-6px);box-shadow:0 14px 36px rgba(0,0,0,.1);border-color:var(--vert3);}
.gh-mini:nth-child(2){margin-top:28px;}
.gh-mini:nth-child(4){margin-top:-28px;}
.gm-icon{font-size:1.8rem;margin-bottom:10px;}
.gm-tag{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:100px;display:inline-block;margin-bottom:8px;}
.tp{background:#e5f4ec;color:var(--vert);}
.tm{background:#e0f2fb;color:#0277bd;}
.ts{background:#fef3e2;color:#e65100;}
.tn{background:#ede7f6;color:#4527a0;}
.gm-nom{font-family:'Fraunces',serif;font-size:.95rem;font-weight:600;line-height:1.3;color:var(--noir);}

/* ══ RUBRIQUES CARDS ══ */
.rubriques{background:var(--sable);border-top:1px solid var(--bordure);padding:64px 40px;}
.rub-in{max-width:1320px;margin:0 auto;}
.rub-top{text-align:center;margin-bottom:48px;}
.rub-eye{font-size:.68rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--vert);margin-bottom:12px;display:flex;align-items:center;justify-content:center;gap:10px;}
.rub-eye::before,.rub-eye::after{content:'';width:24px;height:2px;background:var(--vert);}
.rub-h2{font-family:'Fraunces',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:var(--noir);}
.rub-h2 em{color:var(--vert);font-style:italic;}
.rub-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.rub-card{background:var(--blanc);border:1.5px solid var(--bordure);border-radius:18px;padding:36px 28px;cursor:pointer;transition:transform .3s var(--T),box-shadow .3s,border-color .3s;display:flex;flex-direction:column;align-items:flex-start;gap:14px;position:relative;overflow:hidden;}
.rub-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--vert);transform:scaleX(0);transition:transform .3s var(--T);transform-origin:left;}
.rub-card:hover{transform:translateY(-8px);box-shadow:0 20px 56px rgba(0,0,0,.1);border-color:var(--vert);}
.rub-card:hover::after{transform:scaleX(1);}
.rub-icon-wrap{width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;}
.ic-p{background:#e5f4ec;}
.ic-m{background:#e0f2fb;}
.ic-s{background:#fef3e2;}
.ic-n{background:#ede7f6;}
.rub-card h3{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;color:var(--noir);}
.rub-card p{font-size:.78rem;color:var(--gris);line-height:1.7;flex:1;}
.rub-count{font-size:.68rem;font-weight:700;color:var(--vert);background:rgba(27,94,53,.08);padding:4px 12px;border-radius:100px;}
.rub-arrow{margin-left:auto;font-size:1.1rem;color:var(--vert);opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .3s;}
.rub-card:hover .rub-arrow{opacity:1;transform:translateX(0);}

/* ══ PAGES CONTENT ══ */
.content-page{animation:pageIn .4s var(--T) both;}
@keyframes pageIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.page-header{background:linear-gradient(135deg,var(--vert) 0%,var(--vert2) 100%);color:#fff;padding:56px 40px 48px;}
.ph-in{max-width:1320px;margin:0 auto;display:flex;align-items:center;gap:20px;}
.ph-back{background:rgba(255,255,255,.15);border:none;color:#fff;width:40px;height:40px;border-radius:10px;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0;}
.ph-back:hover{background:rgba(255,255,255,.25);}
.ph-text{}
.ph-eye{font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:8px;}
.ph-title{font-family:'Fraunces',serif;font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;line-height:1.15;}
.ph-title em{font-style:italic;color:rgba(255,255,255,.85);}
.ph-sub{font-size:.85rem;color:rgba(255,255,255,.75);margin-top:8px;max-width:600px;line-height:1.7;font-weight:300;}
.page-body{max-width:1320px;margin:0 auto;padding:56px 40px 80px;}

/* ══ GROUPES PRODUITS ══ */
.grp{margin-bottom:56px;}
.grp-title{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;color:var(--noir);padding-bottom:14px;border-bottom:2px solid var(--bordure);margin-bottom:24px;display:flex;align-items:center;gap:10px;}
.grp-title span{font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(27,94,53,.1);color:var(--vert);padding:3px 10px;border-radius:100px;}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.grid-svc{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}

/* ══ CARTE PRODUIT ══ */
.pc{background:var(--blanc);border:1px solid var(--bordure);border-radius:14px;overflow:hidden;transition:transform .3s var(--T),box-shadow .3s,border-color .3s;animation:fadeIn .5s var(--T) both;}
.pc:hover{transform:translateY(-6px);box-shadow:0 18px 50px rgba(0,0,0,.1);border-color:var(--vert3);}
.pc-img{height:150px;display:flex;align-items:center;justify-content:center;font-size:3.2rem;position:relative;}
.pc-badge{position:absolute;top:10px;left:10px;font-size:.57rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:100px;}
.pc-body{padding:16px 18px 20px;}
.pc-cat{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--vert);margin-bottom:6px;}
.pc-nom{font-family:'Fraunces',serif;font-size:1rem;font-weight:600;line-height:1.3;margin-bottom:7px;color:var(--noir);}
.pc-desc{font-size:.74rem;color:var(--gris);line-height:1.72;margin-bottom:16px;}
.pc-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;}
.pc-prix{font-family:'Fraunces',serif;font-size:1.05rem;font-weight:700;color:var(--vert);line-height:1;}
.pc-unit{font-size:.6rem;color:var(--gris);margin-top:3px;}
.btn-add{border:none;padding:9px 16px;border-radius:7px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.72rem;font-weight:700;cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;flex-shrink:0;}
.btn-add:hover{transform:scale(1.04);}
.ba-green{background:var(--vert);color:#fff;}
.ba-green:hover{background:var(--vert2);}
.ba-blue{background:#1565c0;color:#fff;}
.ba-blue:hover{background:#0d47a1;}
.ba-amber{background:#e65100;color:#fff;}
.ba-amber:hover{background:#bf360c;}

/* ══ CARTE SERVICE ══ */
.sc{background:var(--blanc);border:1px solid var(--bordure);border-radius:16px;padding:32px 28px;display:flex;flex-direction:column;transition:transform .3s var(--T),box-shadow .3s,border-color .3s;animation:fadeIn .5s var(--T) both;}
.sc:hover{transform:translateY(-6px);box-shadow:0 18px 50px rgba(27,94,53,.12);border-color:var(--vert3);}
.sc-icon{font-size:2.4rem;margin-bottom:16px;}
.sc-tag{display:inline-block;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:#fef3e2;color:#e65100;border:1px solid #f5d6a0;padding:3px 10px;border-radius:100px;margin-bottom:12px;}
.sc-nom{font-family:'Fraunces',serif;font-size:1.15rem;font-weight:700;margin-bottom:10px;line-height:1.3;color:var(--noir);}
.sc-desc{font-size:.78rem;color:var(--gris);line-height:1.8;margin-bottom:20px;flex:1;}
.sc-feats{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:24px;}
.sc-feats li{font-size:.74rem;color:var(--gris);display:flex;align-items:flex-start;gap:9px;line-height:1.5;}
.sc-feats li::before{content:'✓';color:var(--vert);font-weight:700;flex-shrink:0;margin-top:1px;}
.btn-devis-card{width:100%;background:transparent;color:var(--vert);border:1.5px solid var(--vert);padding:12px;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.8rem;font-weight:700;cursor:pointer;transition:background .2s,color .2s;}
.btn-devis-card:hover{background:var(--vert);color:#fff;}

/* ══ TABS FORMULATION ══ */
.ftabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px;}
.ftab{background:transparent;border:1.5px solid var(--bordure);color:var(--gris);padding:10px 22px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.76rem;font-weight:600;cursor:pointer;transition:all .2s;}
.ftab:hover{border-color:var(--vert);color:var(--vert);}
.ftab.on{background:var(--vert);border-color:var(--vert);color:#fff;}

/* ══ PAGE CONTACT ══ */
.contact-wrap{max-width:680px;margin:0 auto;}
.contact-intro{text-align:center;margin-bottom:40px;}
.contact-intro h2{font-family:'Fraunces',serif;font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;margin-bottom:10px;}
.contact-intro h2 em{color:var(--vert);font-style:italic;}
.contact-intro p{font-size:.86rem;color:var(--gris);line-height:1.8;}
.contact-form{background:var(--blanc);border:1px solid var(--bordure);border-radius:18px;padding:40px;}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
.ff{display:flex;flex-direction:column;gap:6px;}
.ff.full{grid-column:1/-1;}
.fl{font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gris);}
.fi,.ft{border:1.5px solid var(--bordure);border-radius:9px;padding:12px 16px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.86rem;outline:none;transition:border-color .2s;background:#fff;color:var(--noir);width:100%;}
.fi:focus,.ft:focus{border-color:var(--vert);}
.ft{resize:vertical;min-height:110px;}
.ferr{color:#c0392b;font-size:.76rem;padding:8px 12px;background:#fdf2f2;border-radius:7px;margin-bottom:12px;}
.btn-send{width:100%;background:var(--vert);color:#fff;border:none;padding:16px;border-radius:9px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .2s,box-shadow .2s;margin-top:8px;}
.btn-send:hover{background:var(--vert2);box-shadow:0 8px 24px rgba(27,94,53,.3);}
.btn-send:disabled{opacity:.55;cursor:not-allowed;}
.form-note{text-align:center;font-size:.68rem;color:var(--gris);margin-top:10px;}
.form-ok{text-align:center;padding:48px 20px;}
.fok-icon{font-size:3.5rem;margin-bottom:16px;}
.fok-title{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;color:var(--vert);margin-bottom:8px;}
.fok-sub{font-size:.86rem;color:var(--gris);line-height:1.7;}

/* ══ PANIER ══ */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:300;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(4px);}
.overlay.on{opacity:1;pointer-events:all;}
.cart-panel{position:fixed;top:0;right:-520px;width:480px;max-width:100vw;height:100dvh;background:var(--blanc);z-index:301;display:flex;flex-direction:column;transition:right .4s var(--T);box-shadow:-12px 0 60px rgba(0,0,0,.15);}
.cart-panel.on{right:0;}
.c-hd{padding:22px 26px;border-bottom:1px solid var(--bordure);display:flex;justify-content:space-between;align-items:center;}
.c-hd h2{font-family:'Fraunces',serif;font-size:1.25rem;font-weight:700;}
.c-close{background:none;border:none;cursor:pointer;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--gris);transition:background .2s,color .2s;}
.c-close:hover{background:rgba(192,57,43,.1);color:var(--rouge);}
.c-body{flex:1;overflow-y:auto;padding:18px 26px;display:flex;flex-direction:column;gap:16px;}
.c-empty{text-align:center;color:var(--gris);padding:64px 0;font-size:.86rem;}
.c-item{display:flex;gap:14px;padding-bottom:16px;border-bottom:1px solid var(--bordure);align-items:flex-start;}
.c-ico{width:50px;height:50px;background:var(--sable);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;}
.c-inf{flex:1;min-width:0;}
.c-nom{font-family:'Fraunces',serif;font-size:.92rem;font-weight:600;margin-bottom:3px;line-height:1.3;}
.c-px{font-size:.76rem;color:var(--vert);font-weight:600;}
.c-rm{background:none;border:none;cursor:pointer;color:var(--gris);font-size:.9rem;padding:4px;transition:color .2s;}
.c-rm:hover{color:var(--rouge);}
.c-ft{padding:18px 26px;border-top:1px solid var(--bordure);background:var(--fond);}
.c-tot{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
.c-tot-l{font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gris);}
.c-tot-p{font-family:'Fraunces',serif;font-size:1.5rem;font-weight:700;color:var(--vert);}
.btn-pay{width:100%;background:var(--vert);color:#fff;border:none;padding:16px;border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.88rem;font-weight:700;cursor:pointer;transition:background .2s;}
.btn-pay:hover{background:var(--vert2);}
.btn-pay:disabled{opacity:.5;cursor:not-allowed;}
.pay-note{text-align:center;font-size:.64rem;color:var(--gris);margin-top:9px;}

/* ══ TOAST ══ */
.toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(60px);background:var(--vert);color:#fff;padding:13px 24px;font-size:.8rem;font-weight:500;z-index:400;border-radius:10px;opacity:0;transition:transform .35s var(--T),opacity .35s;white-space:nowrap;box-shadow:0 8px 28px rgba(27,94,53,.4);max-width:90vw;}
.toast.on{transform:translateX(-50%) translateY(0);opacity:1;}

/* ══ AI ══ */
.ai-fab{position:fixed;bottom:28px;right:28px;z-index:500;width:58px;height:58px;border-radius:50%;border:none;background:linear-gradient(135deg,var(--vert),var(--vert2));color:#fff;font-size:1.5rem;cursor:pointer;box-shadow:0 6px 28px rgba(27,94,53,.5);transition:transform .2s,box-shadow .2s;display:flex;align-items:center;justify-content:center;}
.ai-fab:hover{transform:scale(1.08) translateY(-2px);}
.ai-dot{position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:var(--rouge);border-radius:50%;border:2px solid var(--fond);animation:ping 2s infinite;}
@keyframes ping{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.35);opacity:.6}}
.ai-win{position:fixed;bottom:100px;right:28px;z-index:500;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100dvh - 120px);background:var(--blanc);border-radius:20px;box-shadow:0 28px 90px rgba(0,0,0,.2);display:flex;flex-direction:column;transform:scale(.9) translateY(20px);opacity:0;pointer-events:none;transition:transform .35s var(--T),opacity .3s;overflow:hidden;border:1px solid var(--bordure);}
.ai-win.on{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
.ai-hd{padding:16px 18px;background:linear-gradient(135deg,var(--vert),var(--vert2));display:flex;align-items:center;gap:12px;flex-shrink:0;}
.ai-av{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
.ai-hi{flex:1;}
.ai-name{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;color:#fff;}
.ai-status{font-size:.67rem;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:5px;}
.ai-status::before{content:'';width:6px;height:6px;background:#5ddb8a;border-radius:50%;}
.ai-x{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.7);font-size:1.1rem;padding:4px;transition:color .2s;}
.ai-x:hover{color:#fff;}
.ai-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;}
.ai-msgs::-webkit-scrollbar{width:3px;}
.ai-msgs::-webkit-scrollbar-thumb{background:var(--bordure);border-radius:2px;}
.msg{display:flex;gap:8px;animation:msgIn .3s var(--T);}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg.u{flex-direction:row-reverse;}
.m-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.82rem;flex-shrink:0;margin-top:2px;}
.msg.b .m-av{background:linear-gradient(135deg,var(--vert),var(--vert2));}
.msg.u .m-av{background:var(--sable);}
.m-bub{max-width:79%;padding:10px 14px;border-radius:14px;font-size:.8rem;line-height:1.7;}
.msg.b .m-bub{background:var(--fond);color:var(--noir);border-bottom-left-radius:4px;}
.msg.u .m-bub{background:var(--vert);color:#fff;border-bottom-right-radius:4px;}
.typing{display:flex;gap:4px;padding:12px 14px;background:var(--fond);border-radius:14px;border-bottom-left-radius:4px;width:fit-content;}
.typing span{width:6px;height:6px;background:var(--gris);border-radius:50%;animation:bop 1.4s infinite;}
.typing span:nth-child(2){animation-delay:.2s;}
.typing span:nth-child(3){animation-delay:.4s;}
@keyframes bop{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.ai-sugs{padding:0 12px 10px;display:flex;flex-wrap:wrap;gap:6px;}
.sug{background:var(--fond);border:1px solid var(--bordure);color:var(--vert);padding:5px 12px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.68rem;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;}
.sug:hover{background:var(--vert);color:#fff;border-color:var(--vert);}
.ai-inp-row{padding:12px;border-top:1px solid var(--bordure);display:flex;gap:8px;background:#fff;flex-shrink:0;}
.ai-inp{flex:1;border:1.5px solid var(--bordure);border-radius:10px;padding:10px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.83rem;outline:none;transition:border-color .2s;resize:none;max-height:80px;}
.ai-inp:focus{border-color:var(--vert);}
.ai-snd{background:var(--vert);color:#fff;border:none;width:38px;height:38px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:background .2s;flex-shrink:0;align-self:flex-end;}
.ai-snd:hover{background:var(--vert2);}
.ai-snd:disabled{opacity:.5;cursor:not-allowed;}

/* ══ TOP BAR ══ */
.topbar{background:var(--vert);color:rgba(255,255,255,.85);padding:8px 40px;display:flex;align-items:center;justify-content:space-between;font-size:.72rem;gap:16px;flex-wrap:wrap;}
.topbar a{color:rgba(255,255,255,.85);text-decoration:none;display:flex;align-items:center;gap:6px;transition:color .2s;}
.topbar a:hover{color:#fff;}
.topbar-left{display:flex;align-items:center;gap:24px;flex-wrap:wrap;}
.topbar-right{display:flex;align-items:center;gap:16px;}

/* ══ WHATSAPP ══ */
.wa-btn{position:fixed;bottom:100px;left:24px;z-index:500;width:54px;height:54px;border-radius:50%;background:#25d366;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.5);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;}
.wa-btn:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(37,211,102,.6);}
.wa-btn svg{width:28px;height:28px;fill:#fff;}
.wa-tooltip{position:absolute;left:64px;background:var(--noir);color:#fff;padding:6px 12px;border-radius:7px;font-size:.72rem;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;}
.wa-btn:hover .wa-tooltip{opacity:1;}

/* ══ PHOTO PRODUIT ══ */
.pc-img-photo{height:160px;position:relative;overflow:hidden;background:#1b5e35;}
.pc-img-photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s var(--T);}
.pc:hover .pc-img-photo img{transform:scale(1.06);}
.pc-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.2) 0%,rgba(0,0,0,.5) 100%);}
.pc-img-photo .pc-badge{position:absolute;top:10px;left:10px;z-index:2;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:100px;}

/* ══ FOOTER ══ */
footer{background:var(--vert);color:#fff;}
.foot{max-width:1320px;margin:0 auto;padding:56px 40px 28px;}
.foot-grid{display:grid;grid-template-columns:2.2fr 1fr 1fr 1fr;gap:48px;margin-bottom:40px;}
.foot-brand .fb-name{font-family:'Fraunces',serif;font-size:1.25rem;font-weight:700;margin-bottom:12px;}
.foot-brand .fb-name span{color:#5ddb8a;}
.foot-brand p{font-size:.76rem;color:rgba(255,255,255,.55);line-height:1.85;max-width:270px;}
.foot-col h4{font-size:.62rem;text-transform:uppercase;letter-spacing:.16em;color:#5ddb8a;margin-bottom:16px;font-weight:700;}
.foot-col ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
.foot-col li{font-size:.78rem;color:rgba(255,255,255,.5);cursor:pointer;transition:color .2s;}
.foot-col li:hover{color:#5ddb8a;}
.foot-bot{border-top:1px solid rgba(255,255,255,.12);padding-top:22px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.foot-bot span{font-size:.67rem;color:rgba(255,255,255,.35);}

/* ══ RESPONSIVE ══ */
@media(max-width:1024px){
  .nav-menu,.nav-r .btn-devis{display:none;}
  .burger{display:flex;}
  .mob-menu{display:flex;}
  .garde-hero{grid-template-columns:1fr;padding:48px 24px 40px;gap:40px;}
  .gh-right{grid-template-columns:1fr 1fr;}
  .rub-grid{grid-template-columns:repeat(2,1fr);}
  .grid3,.grid4{grid-template-columns:repeat(2,1fr);gap:16px;}
  .grid-svc{grid-template-columns:1fr;gap:20px;}
  .page-header{padding:40px 24px 36px;}
  .page-body{padding:40px 24px 60px;}
  .rubriques{padding:56px 24px;}
  .foot-grid{grid-template-columns:1fr 1fr;gap:32px;}
  .cart-panel{width:100%;right:-100%;}
  .ai-win{right:16px;width:calc(100vw - 32px);}
  .ai-fab{bottom:20px;right:16px;}
}
@media(max-width:600px){
  .nav-in{padding:0 16px;}
  .gh-h1{font-size:2.4rem;}
  .gh-btns{flex-direction:column;}
  .btn-prim,.btn-sec{width:100%;text-align:center;}
  .gh-right{grid-template-columns:1fr 1fr;}
  .rub-grid{grid-template-columns:1fr 1fr;}
  .grid3,.grid4{grid-template-columns:1fr;}
  .foot-grid{grid-template-columns:1fr;gap:28px;}
  .foot-bot{flex-direction:column;}
  .fg{grid-template-columns:1fr;}
  .contact-form{padding:24px 18px;}
  .ai-win{height:calc(100dvh - 110px);}
  .ph-in{flex-direction:column;align-items:flex-start;}
}
`;

/* ════ DATA ════ */
const CHIM = [
  {id:1,grp:"Coagulants",nom:"PAC — Poly Aluminium Chlorure",desc:"Coagulant liquide haute performance. Efficace sur large plage de pH. Réduction turbidité et MES.",emoji:"🧴",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:2,grp:"Coagulants",nom:"Chlorure Ferrique",desc:"Coagulant minéral puissant pour eaux industrielles et boues. Excellent pouvoir floculant.",emoji:"🟤",img:"https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:3,grp:"Coagulants",nom:"Sulfate d'Aluminium",desc:"Coagulant classique pour eau potable et eaux résiduaires. Soluble, facile à doser.",emoji:"🔵",img:"https://images.unsplash.com/photo-1581093196867-ca4e0b8c4f63?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:4,grp:"Floculants",nom:"Floculant Anionique",desc:"Polyacrylamide anionique pour clarification des eaux chargées. Favorise des flocs denses.",emoji:"🫧",img:"https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:5,grp:"Floculants",nom:"Floculant Cationique",desc:"Polyacrylamide cationique pour conditionnement des boues et flottation.",emoji:"💠",img:"https://images.unsplash.com/photo-1616163235154-b8efb32c9b7e?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:6,grp:"Correction pH",nom:"Stabilisant de pH",desc:"Maintient le pH dans la plage optimale de traitement.",emoji:"⚖️",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:7,grp:"Correction pH",nom:"Correcteur de pH",desc:"Correction acide ou basique du pH des effluents. Prêt à l'emploi.",emoji:"🧪",img:"https://images.unsplash.com/photo-1518152006978-fef17ef50b68?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:8,grp:"Désinfection & Traitement",nom:"Hypochlorite de Sodium",desc:"Désinfectant oxydant puissant. Élimine bactéries et virus dans les eaux.",emoji:"💧",img:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:9,grp:"Désinfection & Traitement",nom:"Antimousse",desc:"Élimine et prévient les mousses dans les bassins de traitement et STEP.",emoji:"🫗",img:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:10,grp:"Désinfection & Traitement",nom:"Décolorant",desc:"Élimination des colorants et pigments dans les effluents textiles et industriels.",emoji:"🎨",img:"https://images.unsplash.com/photo-1562977352-f8fc96e5a6ff?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:11,grp:"Désinfection & Traitement",nom:"Peroxyde d'Hydrogène",desc:"Oxydant puissant pour eaux résiduaires. Élimine DCO, H₂S, composés organiques.",emoji:"⚗️",img:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:12,grp:"Osmose Inverse",nom:"Anti-Scalant",desc:"Prévient l'entartrage et le colmatage des membranes OI. Protège contre carbonates et silice.",emoji:"🛡️",img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:13,grp:"Osmose Inverse",nom:"Lavage Membranes — Acide",desc:"Nettoyage acide des membranes OI. Dissout tartre et oxydes métalliques.",emoji:"🔴",img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:14,grp:"Osmose Inverse",nom:"Lavage Membranes — Basique",desc:"Nettoyage alcalin des membranes OI. Élimine biofilm et matière organique.",emoji:"🔵",img:"https://images.unsplash.com/photo-1521813605769-10c6cd6e5bb1?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:15,grp:"Osmose Inverse",nom:"Biocide Non Oxydant",desc:"Contrôle microbiologique pour circuits OI sans dégradation des membranes.",emoji:"🦠",img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:16,grp:"Osmose Inverse",nom:"Métabisulfite de Sodium",desc:"Neutralisant du chlore résiduel avant les membranes OI.",emoji:"🧂",img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:17,grp:"Eaux de Chaudière",nom:"Produit de Passivation",desc:"Protège la surface interne des chaudières contre la corrosion.",emoji:"🔩",img:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:18,grp:"Eaux de Chaudière",nom:"Antitartre Chaudière",desc:"Prévient les dépôts calcaires. Améliore le rendement thermique.",emoji:"♨️",img:"https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:19,grp:"Eaux de Chaudière",nom:"Éliminateur d'Oxygène",desc:"Désoxygénant chimique. Élimine l'oxygène dissous, cause principale de corrosion.",emoji:"💨",img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&h=320&q=80"},
];
const MAT = [
  {id:20,nom:"Kit Mesure de Chlore",desc:"Mesure rapide chlore libre et total. Colorimétrie DPD. Idéal eau potable et piscines.",emoji:"🧫",img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:21,nom:"Kit Mesure de Dureté",desc:"Titrimétrie EDTA pour dureté totale, calcique et magnésienne. Kit portable complet.",emoji:"💎",img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:22,nom:"pH-mètre Portable",desc:"Mesure précise du pH sur terrain. Électrode combinée, calibration automatique, IP67.",emoji:"📏",img:"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:23,nom:"Oxymètre",desc:"Mesure de l'oxygène dissous. Compensation température automatique. Idéal STEP biologiques.",emoji:"🌬️",img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&h=320&q=80"},
  {id:24,nom:"Conductimètre",desc:"Mesure conductivité, TDS et salinité. Gamme 0–200 mS/cm. Étalonnage multi-point.",emoji:"⚡",img:"https://images.unsplash.com/photo-1518152006978-fef17ef50b68?auto=format&fit=crop&w=600&h=320&q=80"},
];
const ANALYSES = [
  {id:30,nom:"Analyse Physicochimique & Bactériologique des Eaux",desc:"Analyse complète : pH, DCO, DBO5, MES, métaux lourds, germes totaux, coliformes.",emoji:"🧫",feats:["Prélèvement sur site par nos ingénieurs","Analyses physico-chimiques & biologiques","Rapport de conformité NM/ISO","Recommandations correctives détaillées","Suivi post-analyse inclus"]},
  {id:31,nom:"Analyse Agronomique & Pédologique des Sols",desc:"Caractérisation complète du sol : texture, pH, matière organique, macro et microéléments.",emoji:"🌍",feats:["Prélèvement et préparation des échantillons","Analyse granulométrique complète","Dosage NPK & oligo-éléments","pH, CEC, matière organique","Rapport avec recommandations agronomiques"]},
  {id:32,nom:"Bilan Environnemental & Conformité NM/ISO",desc:"Évaluation des rejets, mesure des paramètres réglementaires, rapport de conformité.",emoji:"🔭",feats:["Audit terrain complet","Mesure des paramètres réglementaires","Analyse des rejets liquides et solides","Rapport de conformité NM/ISO","Plan d'action correctif"]},
];
const SVCS = [
  {id:"s1",nom:"Conception & Dimensionnement STEP",desc:"De l'avant-projet à la mise en service. Dimensionnement hydraulique et biologique.",emoji:"🏗️",feats:["APS / APD / DCE complets","Dimensionnement hydraulique et biologique","Comparaison et sélection des filières","Dossiers autorisation loi sur l'eau","Assistance maîtrise d'ouvrage (AMO)"]},
  {id:"s2",nom:"Optimisation des STEP Existantes",desc:"Audit technique, diagnostic, optimisation des réactifs et amélioration des performances.",emoji:"⚙️",feats:["Audit complet de votre installation","Bilan de fonctionnement","Optimisation des doses de réactifs","Mise en place d'indicateurs de suivi","Rapport de recommandations"]},
  {id:"s3",nom:"Solutions Traitement des Eaux",desc:"Choix des procédés, sourcing des réactifs, mise en route et suivi des installations.",emoji:"💧",feats:["Étude de faisabilité technique","Choix et dimensionnement des équipements","Formation des équipes opérateurs","Contrat de suivi mensuel disponible","Assistance technique sur site"]},
];
const FNUM = {
  engrais:[
    {id:40,nom:"Engrais Foliaires",desc:"Macro et microéléments, agents chélatants, adjuvants. Calculs de concentration inclus.",prix:"790 MAD",prixVal:790,emoji:"🌿",bg:"#e8f5e9"},
    {id:41,nom:"Engrais de Fertigation",desc:"Formulations N-P-K pour fertigation goutte-à-goutte et hydroponie. Calculateur tankmix.",prix:"890 MAD",prixVal:890,emoji:"💧",bg:"#e3f2fd"},
    {id:42,nom:"Engrais Hydrosolubles",desc:"Complexes NPK + oligo-éléments. Fiches techniques et protocoles de dissolution.",prix:"690 MAD",prixVal:690,emoji:"🧪",bg:"#f1f8e9"},
  ],
  eaux:[
    {id:43,nom:"Coagulant-Floculant Optimisé",desc:"Protocoles de dosage selon nature des effluents. Jar-test intégré, ratios validés.",prix:"890 MAD",prixVal:890,emoji:"📄",bg:"#e8eaf6"},
    {id:44,nom:"Traitement Eaux Résiduaires Industrielles",desc:"Protocoles STEP industrielles : physico-chimique, biologique, tertiaire.",prix:"990 MAD",prixVal:990,emoji:"🏭",bg:"#e0f7fa"},
    {id:45,nom:"Traitement Osmose Inverse",desc:"Dosage anti-scalant, biocide et produits de lavage membranes. Indice LSI inclus.",prix:"790 MAD",prixVal:790,emoji:"🛡️",bg:"#e8f5e9"},
  ],
  nettoyage:[
    {id:46,nom:"Détergents Lave-Vaisselle & Vaisselle Manuelle",desc:"Industriels et domestiques : liquides, poudres, tablettes enzymatiques, antibactériens.",prix:"590 MAD",prixVal:590,emoji:"🍽️",bg:"#e3f2fd"},
    {id:47,nom:"Lessives Liquides & Poudres",desc:"Blanc/couleur, avec/sans enzymes, concentrées, sans phosphore. Détachants inclus.",prix:"590 MAD",prixVal:590,emoji:"👕",bg:"#f3e5f5"},
    {id:48,nom:"Agents Blanchissants & Entretien Machines",desc:"Blanchissants chlorés/oxygénés, eau de Javel concentrée. Anticalcaires, adoucissants.",prix:"490 MAD",prixVal:490,emoji:"🧺",bg:"#fff8e1"},
    {id:49,nom:"Nettoyants Cuisine & Multi-Usages",desc:"Désinfectants plans de travail, nettoyants fours, multi-usages alcalins et chlorés.",prix:"490 MAD",prixVal:490,emoji:"🍳",bg:"#fce4ec"},
    {id:50,nom:"Produits Sanitaires (WC, Canalisations, Douches)",desc:"Nettoyants WC acides/épaissis, déboucheurs, nettoyants douches et carrelages.",prix:"590 MAD",prixVal:590,emoji:"🚿",bg:"#e8f5e9"},
    {id:51,nom:"Hygiène des Mains & Désinfectants",desc:"Savons liquides, moussants, gels hydroalcooliques. Désinfectants chlore et germicides.",prix:"490 MAD",prixVal:490,emoji:"🧴",bg:"#e8eaf6"},
    {id:52,nom:"Dégraissants, Antirouille & Détartrants",desc:"Dégraissants concentrés, antirouille acides/alcalins, nettoyants vitres et écrans.",prix:"590 MAD",prixVal:590,emoji:"⚙️",bg:"#fef3e2"},
    {id:53,nom:"Produits Sols, Tapis & Climatisation",desc:"Nettoyants sols, shampooings tapis, désinfectants climatiseurs.",prix:"490 MAD",prixVal:490,emoji:"🏠",bg:"#e0f7fa"},
  ],
};
const TICKERS = ["💧 Coagulants & Floculants certifiés","⚗️ Réactifs pour STEP & osmose inverse","🔬 Analyses eau, sol & environnement","📄 Formulations numériques — accès immédiat","🏗️ +200 projets STEP au Maroc","✓ Satisfait ou remboursé 30 jours","🇲🇦 Entreprise 100% marocaine","♨️ Traitement eaux de chaudière"];
const SUGS = ["Quel coagulant pour mes eaux usées ?","Anti-scalant osmose inverse ?","Analyse de mon eau de puits ?","Je veux concevoir une STEP","Formule détergent industriel ?"];
const SYS = `Tu es l'assistant IA expert d'Univers Environnement Maroc (UEM). Tu connais toute la gamme : réactifs chimiques (coagulants PAC/chlorure ferrique/sulfate aluminium, floculants anionique/cationique, correction pH, désinfection, osmose inverse, chaudière), matériel de mesure (kit chlore, dureté, pH-mètre, oxymètre, conductimètre), analyses (eaux, sols, environnement NM/ISO), services ingénierie (STEP, optimisation, solutions traitement), formulations numériques (engrais foliaires/fertigation/hydrosolubles, traitement eaux/OI, détergents/lessives/sanitaires/désinfectants). Réponds en français, concis (max 4 phrases), professionnel et chaleureux.`;
const RUBRIQUES = [
  {k:"chimiques", icon:"⚗️", ic:"ic-p", tag:"tp", title:"Produits Chimiques", desc:"Coagulants, floculants, désinfectants, osmose inverse, chaudière — réactifs certifiés.", count:`${CHIM.length} produits`},
  {k:"materiels",  icon:"🔧", ic:"ic-m", tag:"tm", title:"Matériels",          desc:"Instruments de mesure pH, conductivité, oxygène dissous, chlore et dureté.", count:`${MAT.length} équipements`},
  {k:"services",   icon:"🏗️", ic:"ic-s", tag:"ts", title:"Services",           desc:"Ingénierie environnementale, analyses certifiées et conception de STEP.", count:"6 prestations"},
  {k:"formulation",icon:"📄", ic:"ic-n", tag:"tn", title:"Formulation",         desc:"Formules numériques engrais, traitement des eaux et produits de nettoyage.", count:`${FNUM.engrais.length+FNUM.eaux.length+FNUM.nettoyage.length} formules`},
];
const grpBy = (arr,k) => arr.reduce((a,i)=>{ (a[i[k]]=a[i[k]]||[]).push(i); return a; },{});

export default function App() {
  const [page,setPage]     = useState("garde");
  const [panier,setPanier] = useState([]);
  const [cart,setCart]     = useState(false);
  const [mob,setMob]       = useState(false);
  const [scr,setScr]       = useState(false);
  const [toast,setToast]   = useState("");
  const [chat,setChat]     = useState(false);
  const [msgs,setMsgs]     = useState([{r:"b",t:"Bonjour ! Je suis l'assistant expert d'**Univers Environnement Maroc**. 🌱\n\nJe peux vous conseiller sur nos produits, services ou formulations. Comment puis-je vous aider ?"}]);
  const [inp,setInp]       = useState("");
  const [load,setLoad]     = useState(false);
  const [sugs,setSugs]     = useState(true);
  const [ftab,setFtab]     = useState("engrais");
  const [form,setForm]     = useState({nom:"",email:"",tel:"",produit:"",msg:""});
  const [fsend,setFsend]   = useState(false);
  const [fok,setFok]       = useState(false);
  const [ferr,setFerr]     = useState("");
  const tmr = useRef(null);
  const end = useRef(null);
  const iref = useRef(null);

  useEffect(()=>{ const f=()=>setScr(window.scrollY>8); window.addEventListener("scroll",f,{passive:true}); return()=>window.removeEventListener("scroll",f); },[]);
  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[page]);
  useEffect(()=>{ if(chat) end.current?.scrollIntoView({behavior:"smooth"}); },[msgs,load,chat]);
  useEffect(()=>{ if(chat) setTimeout(()=>iref.current?.focus(),350); },[chat]);

  const shToast = m => { setToast(m); clearTimeout(tmr.current); tmr.current=setTimeout(()=>setToast(""),2800); };
  const go = p => { setPage(p); setMob(false); };
  const addCart = p => { setPanier(pr=>{ const ex=pr.find(i=>i.id===p.id); return ex?pr.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...pr,{...p,qty:1}]; }); shToast(`✓ ${p.nom} ajouté`); };
  const delCart = id => setPanier(p=>p.filter(i=>i.id!==id));
  const total = panier.reduce((s,i)=>s+i.prixVal*i.qty,0);
  const qty   = panier.reduce((s,i)=>s+i.qty,0);

  const askDevis = nom => { setForm(f=>({...f,produit:nom})); go("contact"); };

  const aiSend = async text => {
    const txt=(text||inp).trim(); if(!txt||load) return;
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
    if(!form.nom||!form.email||!form.produit){ setFerr("Veuillez remplir les champs obligatoires."); return; }
    setFsend(true); setFerr("");
    try{
      await emailjs.send(EJS.svc,EJS.tpl,{nom:form.nom,email:form.email,telephone:form.tel||"—",produit:form.produit,message:form.msg||"—"},EJS.key);
      setFok(true); setForm({nom:"",email:"",tel:"",produit:"",msg:""});
    }catch{ setFerr("Erreur d'envoi. Contactez-nous directement."); }
    finally{ setFsend(false); }
  };

  const rtx = t => t.split(/(\*\*[^*]+\*\*)/g).map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i}>{p.slice(2,-2)}</strong>:<span key={i}>{p}</span>);

  /* ── COMPOSANT CARTE PRODUIT ── */
  const PC = ({p,type}) => (
    <div className="pc">
      {p.img ? (
        <div className="pc-img-photo">
          <img src={p.img} alt={p.nom} loading="lazy"/>
          <div className="pc-img-overlay"/>
          <span className={`pc-badge ${type==="n"?"tn":type==="m"?"tm":"tp"}`}>{type==="n"?"Numérique":type==="m"?"Matériel":"Réactif"}</span>
        </div>
      ) : (
        <div className="pc-img" style={{background:p.bg||"#e8f5e9"}}>
          <span>{p.emoji}</span>
          <span className={`pc-badge ${type==="n"?"tn":type==="m"?"tm":"tp"}`}>{type==="n"?"Numérique":type==="m"?"Matériel":"Réactif"}</span>
        </div>
      )}
      <div className="pc-body">
        {p.grp&&<div className="pc-cat">{p.grp}</div>}
        <div className="pc-nom">{p.nom}</div>
        <div className="pc-desc">{p.desc}</div>
        <div className="pc-foot">
          <div><div className="pc-prix">{p.prix||"Sur devis"}</div><div className="pc-unit">/{p.unite||"unité"}</div></div>
          {type==="n"
            ? <button className="btn-add ba-blue" onClick={()=>addCart(p)}>⚡ Acheter</button>
            : <button className="btn-add ba-amber" onClick={()=>askDevis(p.nom)}>Devis →</button>}
        </div>
      </div>
    </div>
  );

  /* ── COMPOSANT CARTE SERVICE ── */
  const SC = ({s}) => (
    <div className="sc">
      <div className="sc-icon">{s.emoji}</div>
      <div className="sc-tag">{s.feats?"Service Expert":"Analyse Certifiée"}</div>
      <div className="sc-nom">{s.nom}</div>
      <div className="sc-desc">{s.desc}</div>
      {s.feats&&<ul className="sc-feats">{s.feats.map((f,i)=><li key={i}>{f}</li>)}</ul>}
      <button className="btn-devis-card" onClick={()=>askDevis(s.nom)}>Demander un devis →</button>
    </div>
  );

  /* ══ PAGE DE GARDE ══ */
  const Garde = () => (
    <div className="garde">
      <div className="garde-hero">
        <div className="gh-left">
          <div className="gh-badge"><span className="gh-badge-dot"/><span>Expertise environnementale au Maroc</span></div>
          <h1 className="gh-h1">Réactifs, matériel &<br/><em>ingénierie</em> pour<br/><span className="r">vos eaux</span></h1>
          <p className="gh-p">Produits chimiques certifiés · Matériel de mesure · Ingénierie environnementale · Formulations techniques — tout pour le traitement de l'eau au Maroc.</p>
          <div className="gh-btns">
            <button className="btn-prim" onClick={()=>go("chimiques")}>Voir les produits</button>
            <button className="btn-sec"  onClick={()=>go("services")}>Nos services</button>
          </div>
          <div className="gh-stats">
            <div><div className="stat-n">200+</div><div className="stat-l">STEP conçues</div></div>
            <div><div className="stat-n">15 ans</div><div className="stat-l">D'expertise</div></div>
            <div><div className="stat-n">98%</div><div className="stat-l">Satisfaction</div></div>
          </div>
        </div>
        <div className="gh-right">
          {[{icon:"⚗️",tag:"tp",lbl:"Chimique", nom:"Coagulant PAC",        p:"chimiques"},
            {icon:"📄",tag:"tn",lbl:"Formule",  nom:"Traitement des Eaux",  p:"formulation"},
            {icon:"🏗️",tag:"ts",lbl:"Service",  nom:"Conception STEP",      p:"services"},
            {icon:"🔧",tag:"tm",lbl:"Matériel", nom:"pH-mètre Portable",    p:"materiels"},
          ].map((c,i)=>(
            <div key={i} className="gh-mini" onClick={()=>go(c.p)}>
              <div className="gm-icon">{c.icon}</div>
              <span className={`gm-tag ${c.tag}`}>{c.lbl}</span>
              <div className="gm-nom">{c.nom}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RUBRIQUES */}
      <div className="rubriques">
        <div className="rub-in">
          <div className="rub-top">
            <div className="rub-eye">Nos rubriques</div>
            <h2 className="rub-h2">Explorez notre <em>catalogue complet</em></h2>
          </div>
          <div className="rub-grid">
            {RUBRIQUES.map(r=>(
              <div key={r.k} className="rub-card" onClick={()=>go(r.k)}>
                <div className={`rub-icon-wrap ${r.ic}`}>{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <span className="rub-count">{r.count}</span>
                <span className="rub-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  /* ══ PAGE PRODUITS CHIMIQUES ══ */
  const PageChim = () => {
    const gs = grpBy(CHIM,"grp");
    return (
      <div className="content-page">
        <div className="page-header">
          <div className="ph-in">
            <button className="ph-back" onClick={()=>go("garde")}>←</button>
            <div className="ph-text">
              <div className="ph-eye">Catalogue</div>
              <h1 className="ph-title">Produits <em>Chimiques</em></h1>
              <p className="ph-sub">Réactifs certifiés pour le traitement des eaux — coagulants, floculants, désinfectants, osmose inverse et chaudière. Livraison 24h au Maroc.</p>
            </div>
          </div>
        </div>
        <div className="page-body">
          {Object.entries(gs).map(([grp,items])=>(
            <div key={grp} className="grp">
              <div className="grp-title">{grp} <span>{items.length} produits</span></div>
              <div className="grid3">{items.map((p,i)=><PC key={p.id} p={p} type="p" style={{animationDelay:`${i*.06}s`}}/>)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ══ PAGE MATÉRIELS ══ */
  const PageMat = () => (
    <div className="content-page">
      <div className="page-header">
        <div className="ph-in">
          <button className="ph-back" onClick={()=>go("garde")}>←</button>
          <div className="ph-text">
            <div className="ph-eye">Équipements</div>
            <h1 className="ph-title">Matériels de <em>Mesure</em></h1>
            <p className="ph-sub">Instruments professionnels pour le contrôle qualité de vos eaux — pH, conductivité, oxygène dissous, chlore et dureté.</p>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="grid4">{MAT.map(p=><PC key={p.id} p={p} type="m"/>)}</div>
      </div>
    </div>
  );

  /* ══ PAGE SERVICES ══ */
  const PageSvc = () => (
    <div className="content-page">
      <div className="page-header">
        <div className="ph-in">
          <button className="ph-back" onClick={()=>go("garde")}>←</button>
          <div className="ph-text">
            <div className="ph-eye">Ingénierie & Analyses</div>
            <h1 className="ph-title">Nos <em>Services</em></h1>
            <p className="ph-sub">Accompagnement A à Z : conception STEP, analyses certifiées NM/ISO et optimisation de vos procédés de traitement des eaux.</p>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="grp">
          <div className="grp-title">🏗️ Services d'Ingénierie <span>3 prestations</span></div>
          <div className="grid-svc">{SVCS.map(s=><SC key={s.id} s={s}/>)}</div>
        </div>
        <div className="grp" style={{marginTop:48}}>
          <div className="grp-title">🔬 Analyses Environnementales <span>3 analyses</span></div>
          <div className="grid-svc">{ANALYSES.map(a=><SC key={a.id} s={a}/>)}</div>
        </div>
      </div>
    </div>
  );

  /* ══ PAGE FORMULATION ══ */
  const PageForm = () => {
    const tabs=[{k:"engrais",l:"🌿 Engrais"},{k:"eaux",l:"💧 Traitement des Eaux"},{k:"nettoyage",l:"🧴 Nettoyage & Détergents"}];
    return (
      <div className="content-page">
        <div className="page-header">
          <div className="ph-in">
            <button className="ph-back" onClick={()=>go("garde")}>←</button>
            <div className="ph-text">
              <div className="ph-eye">Produits Numériques</div>
              <h1 className="ph-title">Formulations <em>Techniques</em></h1>
              <p className="ph-sub">Fichiers PDF + Excel — accès permanent après achat. Formules validées en laboratoire pour engrais, traitement des eaux et nettoyage industriel.</p>
            </div>
          </div>
        </div>
        <div className="page-body">
          <div className="ftabs">{tabs.map(t=><button key={t.k} className={`ftab${ftab===t.k?" on":""}`} onClick={()=>setFtab(t.k)}>{t.l}</button>)}</div>
          <div className="grid3">{FNUM[ftab].map(p=><PC key={p.id} p={{...p,unite:"accès permanent"}} type="n"/>)}</div>
        </div>
      </div>
    );
  };

  /* ══ PAGE CONTACT ══ */
  const PageContact = () => (
    <div className="content-page">
      <div className="page-header">
        <div className="ph-in">
          <button className="ph-back" onClick={()=>go("garde")}>←</button>
          <div className="ph-text">
            <div className="ph-eye">Devis & Contact</div>
            <h1 className="ph-title">Parlons de votre <em>projet</em></h1>
            <p className="ph-sub">Remplissez le formulaire — notre équipe vous répond sous 24h.</p>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="contact-wrap">
          <div className="contact-form">
            {fok ? (
              <div className="form-ok">
                <div className="fok-icon">✅</div>
                <div className="fok-title">Demande envoyée !</div>
                <div className="fok-sub">Notre équipe vous contactera sous 24h à l'adresse indiquée.<br/>Merci pour votre confiance.</div>
                <button className="btn-prim" style={{marginTop:28,width:"auto",padding:"12px 28px"}} onClick={()=>setFok(false)}>Nouvelle demande</button>
              </div>
            ):(
              <form onSubmit={submitDevis}>
                <div className="fg">
                  <div className="ff"><label className="fl">Nom complet *</label><input className="fi" placeholder="Votre nom" value={form.nom} onChange={e=>setForm(f=>({...f,nom:e.target.value}))} required/></div>
                  <div className="ff"><label className="fl">Email *</label><input className="fi" type="email" placeholder="votre@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required/></div>
                  <div className="ff"><label className="fl">Téléphone</label><input className="fi" placeholder="+212 6XX XXX XXX" value={form.tel} onChange={e=>setForm(f=>({...f,tel:e.target.value}))}/></div>
                  <div className="ff"><label className="fl">Produit / Service *</label><input className="fi" placeholder="Ex: PAC, Analyse eau, STEP…" value={form.produit} onChange={e=>setForm(f=>({...f,produit:e.target.value}))} required/></div>
                  <div className="ff full"><label className="fl">Message</label><textarea className="ft" placeholder="Décrivez votre besoin, quantité, délai…" value={form.msg} onChange={e=>setForm(f=>({...f,msg:e.target.value}))}/></div>
                </div>
                {ferr&&<div className="ferr">{ferr}</div>}
                <button className="btn-send" type="submit" disabled={fsend}>{fsend?"⏳ Envoi en cours…":"📩 Envoyer la demande de devis"}</button>
                <div className="form-note">Réponse sous 24h · univers.envi@gmail.com</div>
              </form>
            )}
          </div>
          <div style={{textAlign:"center",marginTop:24}}>
            <button className="btn-sec" style={{margin:"0 auto"}} onClick={()=>setChat(true)}>💬 Parler à l'assistant IA</button>
          </div>
        </div>
      </div>
    </div>
  );

  const PAGES = { garde:<Garde/>, chimiques:<PageChim/>, materiels:<PageMat/>, services:<PageSvc/>, formulation:<PageForm/>, contact:<PageContact/> };
  const NAV = [{k:"garde",l:"Accueil"},{k:"chimiques",l:"Produits Chimiques"},{k:"materiels",l:"Matériels"},{k:"services",l:"Services"},{k:"formulation",l:"Formulation"}];

  return (
    <>
      <style>{CSS}</style>
      <div className={`toast${toast?" on":""}`}>{toast}</div>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-left">
          <a href="tel:+212523377417">📞 +212 523 37 74 17</a>
          <a href="https://wa.me/212700090365">💬 +212 700 090 365</a>
          <span>📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida</span>
        </div>
        <div className="topbar-right">
          <a href="mailto:univers.envi@gmail.com">✉️ univers.envi@gmail.com</a>
        </div>
      </div>

      {/* WHATSAPP FLOTTANT */}
      <a href="https://wa.me/212700090365?text=Bonjour%20UEM%2C%20je%20souhaite%20des%20informations%20sur%20vos%20produits." target="_blank" rel="noreferrer" className="wa-btn" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="wa-tooltip">Nous écrire sur WhatsApp</span>
      </a>

      {/* PANIER */}
      <div className={`overlay${cart?" on":""}`} onClick={()=>setCart(false)}/>
      <div className={`cart-panel${cart?" on":""}`}>
        <div className="c-hd"><h2>🛒 Panier{qty>0?` (${qty})`:""}</h2><button className="c-close" onClick={()=>setCart(false)}>✕</button></div>
        <div className="c-body">
          {panier.length===0?<div className="c-empty">💧<br/><br/>Votre panier est vide</div>
            :panier.map(i=>(
            <div key={i.id} className="c-item">
              <div className="c-ico">{i.emoji}</div>
              <div className="c-inf"><div className="c-nom">{i.nom}</div><div className="c-px">{i.prixVal.toLocaleString("fr-MA")} MAD × {i.qty} = {(i.prixVal*i.qty).toLocaleString("fr-MA")} MAD</div></div>
              <button className="c-rm" onClick={()=>delCart(i.id)}>✕</button>
            </div>
          ))}
        </div>
        <div className="c-ft">
          <div className="c-tot"><span className="c-tot-l">Total TTC</span><span className="c-tot-p">{total.toLocaleString("fr-MA")} MAD</span></div>
          <button className="btn-pay" disabled={!panier.length}>🔒 Passer la commande</button>
          <div className="pay-note">Paiement sécurisé · CMI · Virement · PayPal</div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className={`nav${scr?" solid":""}`}>
        <div className="nav-in">
          <div className="logo" onClick={()=>go("garde")}>
            <div className="logo-sq">UE</div>
            <div className="logo-tx"><span className="l1">Univers Environnement</span><span className="l2">Maroc</span></div>
          </div>
          <ul className="nav-menu">
            {NAV.map(n=><li key={n.k}><button className={page===n.k?"on":""} onClick={()=>go(n.k)}>{n.l}</button></li>)}
          </ul>
          <div className="nav-r">
            <button className="btn-devis" onClick={()=>go("contact")}>Demander un devis</button>
            <button className="cart-ico" onClick={()=>setCart(true)}>🛒{qty>0&&<span className="cbadge">{qty}</span>}</button>
          </div>
          <button className={`burger${mob?" on":""}`} onClick={()=>setMob(v=>!v)}><span/><span/><span/></button>
        </div>
        <div className={`mob-menu${mob?" on":""}`}>
          {NAV.map(n=><button key={n.k} className={page===n.k?"on":""} onClick={()=>go(n.k)}>{n.l}</button>)}
          <button className="mob-devis" onClick={()=>go("contact")}>Demander un devis</button>
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker"><div className="ticker-in">{[...TICKERS,...TICKERS].map((t,i)=><span key={i} className="tick">{t}</span>)}</div></div>

      {/* PAGE */}
      {PAGES[page]}

      {/* FOOTER */}
      <footer>
        <div className="foot">
          <div className="foot-grid">
            <div className="foot-brand">
              <div className="fb-name">Univers Environnement <span>Maroc</span></div>
              <p style={{marginBottom:12}}>Solutions intégrées pour le traitement des eaux et l'ingénierie environnementale au Maroc depuis plus de 15 ans.</p>
              <p style={{fontSize:".76rem",color:"rgba(255,255,255,.6)",lineHeight:1.8}}>
                📍 N°1, Bd Jabrane Khalil Jabrane, El Jadida<br/>
                📞 <a href="tel:+212523377417" style={{color:"rgba(255,255,255,.7)",textDecoration:"none"}}>+212 523 37 74 17</a><br/>
                💬 <a href="https://wa.me/212700090365" style={{color:"#5ddb8a",textDecoration:"none"}}>+212 700 090 365</a><br/>
                ✉️ <a href="mailto:univers.envi@gmail.com" style={{color:"rgba(255,255,255,.7)",textDecoration:"none"}}>univers.envi@gmail.com</a>
              </p>
            </div>
            <div className="foot-col"><h4>Navigation</h4><ul>{NAV.map(n=><li key={n.k} onClick={()=>go(n.k)}>{n.l}</li>)}<li onClick={()=>go("contact")}>Contact</li></ul></div>
            <div className="foot-col"><h4>Services</h4><ul><li>Conception STEP</li><li>Analyse environnementale</li><li>Optimisation process</li><li>Formation opérateurs</li></ul></div>
            <div className="foot-col"><h4>Légal</h4><ul><li>Mentions légales</li><li>CGV</li><li>Confidentialité</li><li onClick={()=>go("contact")}>Contact</li></ul></div>
          </div>
          <div className="foot-bot"><span>© 2026 Univers Environnement Maroc — Tous droits réservés</span><span>🔒 Paiements sécurisés · CMI · SSL</span></div>
        </div>
      </footer>

      {/* AI WIDGET */}
      <button className="ai-fab" onClick={()=>setChat(v=>!v)} style={{position:"relative"}}>
        {chat?"✕":"🤖"}{!chat&&<span className="ai-dot"/>}
      </button>
      <div className={`ai-win${chat?" on":""}`}>
        <div className="ai-hd">
          <div className="ai-av">🌱</div>
          <div className="ai-hi"><div className="ai-name">Assistant UEM</div><div className="ai-status">En ligne · Expert eau & environnement</div></div>
          <button className="ai-x" onClick={()=>setChat(false)}>✕</button>
        </div>
        <div className="ai-msgs">
          {msgs.map((m,i)=>(
            <div key={i} className={`msg ${m.r==="u"?"u":"b"}`}>
              <div className="m-av">{m.r==="u"?"👤":"🌱"}</div>
              <div className="m-bub" style={{whiteSpace:"pre-wrap"}}>{rtx(m.t)}</div>
            </div>
          ))}
          {load&&<div className="msg b"><div className="m-av">🌱</div><div className="typing"><span/><span/><span/></div></div>}
          <div ref={end}/>
        </div>
        {sugs&&<div className="ai-sugs">{SUGS.map((s,i)=><button key={i} className="sug" onClick={()=>aiSend(s)}>{s}</button>)}</div>}
        <div className="ai-inp-row">
          <textarea ref={iref} className="ai-inp" placeholder="Posez votre question…" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();aiSend();}}} rows={1}/>
          <button className="ai-snd" onClick={()=>aiSend()} disabled={!inp.trim()||load}>➤</button>
        </div>
      </div>
    </>
  );
}
