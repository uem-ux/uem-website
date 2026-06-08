import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --vert:#1b5e35;--vert2:#2e7d52;--vert3:#4caf78;--neon:#5ddb8a;
  --rouge:#c0392b;--sable:#f5ede0;--fond:#f9f5ef;--carte:#ffffff;
  --noir:#111810;--gris:#7a8c7f;--bordure:#dde8e1;
  --T:cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--fond);color:var(--noir);overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.bg-zellige{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.025;
  background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%231b5e35'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size:60px 60px;}
.navbar{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(249,245,239,.94);backdrop-filter:blur(16px);border-bottom:1px solid var(--bordure);transition:box-shadow .3s;}
.navbar.scrolled{box-shadow:0 2px 20px rgba(27,94,53,.10);}
.nav-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:64px;}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;}
.logo-badge{width:38px;height:38px;border-radius:8px;background:linear-gradient(135deg,var(--vert),var(--vert2));display:flex;align-items:center;justify-content:center;font-family:'Fraunces',serif;font-weight:700;color:#fff;font-size:1rem;}
.logo-texts{display:flex;flex-direction:column;line-height:1.1;}
.logo-main{font-family:'Fraunces',serif;font-weight:700;font-size:.9rem;color:var(--vert);}
.logo-sub{font-size:.6rem;font-weight:500;color:var(--rouge);letter-spacing:.12em;text-transform:uppercase;}
.nav-links{display:flex;gap:28px;list-style:none;}
.nav-links a{font-size:.78rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;color:var(--gris);transition:color .2s;}
.nav-links a:hover{color:var(--vert);}
.nav-right{display:flex;align-items:center;gap:10px;}
.cart-btn{position:relative;display:flex;align-items:center;gap:7px;background:var(--vert);color:#fff;border:none;padding:9px 18px;border-radius:6px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.75rem;font-weight:600;letter-spacing:.06em;cursor:pointer;transition:background .2s,transform .15s;}
.cart-btn:hover{background:var(--vert2);transform:translateY(-1px);}
.cart-count{position:absolute;top:-7px;right:-7px;background:var(--rouge);color:#fff;border-radius:50%;width:18px;height:18px;font-size:.62rem;font-weight:700;display:flex;align-items:center;justify-content:center;animation:pop .3s var(--T);}
@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.3)}100%{transform:scale(1)}}
.burger{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:4px;}
.burger span{display:block;width:24px;height:2px;background:var(--vert);border-radius:2px;transition:transform .3s,opacity .3s;}
.burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
.burger.open span:nth-child(2){opacity:0;}
.burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
.mobile-menu{display:none;flex-direction:column;background:var(--fond);border-top:1px solid var(--bordure);max-height:0;overflow:hidden;transition:max-height .4s var(--T),padding .3s;}
.mobile-menu.open{max-height:500px;padding:16px 0 24px;}
.mobile-menu a{display:block;padding:12px 24px;font-size:.85rem;font-weight:500;color:var(--noir);text-decoration:none;border-bottom:1px solid var(--bordure);transition:background .2s,color .2s;}
.mobile-menu a:hover{background:rgba(27,94,53,.06);color:var(--vert);}
.mobile-menu .m-cart{margin:12px 24px 0;background:var(--vert);color:#fff;border:none;padding:13px;border-radius:8px;text-align:center;font-family:'Plus Jakarta Sans',sans-serif;font-size:.85rem;font-weight:600;cursor:pointer;width:calc(100% - 48px);}
.ticker{overflow:hidden;background:var(--vert);padding:9px 0;margin-top:64px;}
.ticker-track{display:flex;gap:56px;animation:tick 32s linear infinite;width:max-content;}
.tick-item{font-size:.68rem;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.85);white-space:nowrap;}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.hero{position:relative;z-index:1;padding:72px 32px 80px;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.hero-left{display:flex;flex-direction:column;gap:24px;animation:up .8s var(--T) both;}
.hero-flag{display:inline-flex;align-items:center;gap:10px;background:rgba(192,57,43,.08);border:1px solid rgba(192,57,43,.2);padding:6px 14px;border-radius:100px;width:fit-content;font-size:.68rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--rouge);}
.hero-flag .dot{width:6px;height:6px;background:var(--rouge);border-radius:50%;animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero-h1{font-family:'Fraunces',serif;font-weight:700;font-size:clamp(2.4rem,4.5vw,3.8rem);line-height:1.1;color:var(--noir);}
.hero-h1 em{color:var(--vert);font-style:italic;}
.hero-h1 .acc{color:var(--rouge);}
.hero-p{font-size:.9rem;color:var(--gris);line-height:1.8;max-width:460px;font-weight:300;}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;}
.btn-vert{background:var(--vert);color:#fff;border:none;padding:14px 28px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:.06em;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;}
.btn-vert:hover{background:var(--vert2);transform:translateY(-2px);box-shadow:0 8px 24px rgba(27,94,53,.25);}
.btn-ghost{background:transparent;color:var(--vert);border:1.5px solid var(--vert);padding:14px 28px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:.06em;cursor:pointer;transition:background .2s,transform .15s;}
.btn-ghost:hover{background:rgba(27,94,53,.06);transform:translateY(-2px);}
.hero-kpis{display:flex;gap:32px;padding-top:12px;border-top:1px solid var(--bordure);flex-wrap:wrap;}
.kpi-n{font-family:'Fraunces',serif;font-size:2rem;font-weight:700;color:var(--vert);}
.kpi-l{font-size:.68rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--gris);}
.hero-right{display:grid;grid-template-columns:1fr 1fr;gap:14px;animation:fadein 1s var(--T) .2s both;}
.hmini{background:var(--carte);border:1px solid var(--bordure);border-radius:12px;padding:18px 16px;display:flex;flex-direction:column;gap:8px;transition:transform .3s var(--T),box-shadow .3s;}
.hmini:hover{transform:translateY(-5px);box-shadow:0 12px 32px rgba(27,94,53,.12);}
.hmini:nth-child(2){margin-top:24px;}
.hmini:nth-child(4){margin-top:-24px;}
.hmini-icon{font-size:1.6rem;}
.hmini-tag{font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:2px 8px;border-radius:100px;width:fit-content;}
.t-p{background:#e6f4ec;color:var(--vert);}
.t-n{background:#e8eaf6;color:#1a56db;}
.t-s{background:#fef3e2;color:#92400e;}
.t-m{background:#e0f7fa;color:#0277bd;}
.hmini-nom{font-family:'Fraunces',serif;font-size:.9rem;line-height:1.3;}
@keyframes up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.section{position:relative;z-index:1;padding:80px 32px;max-width:1280px;margin:0 auto;}
.section-full{position:relative;z-index:1;padding:80px 32px;background:var(--sable);border-top:1px solid var(--bordure);border-bottom:1px solid var(--bordure);}
.section-full-inner{max-width:1280px;margin:0 auto;}
.sec-eye{font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--vert);display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.sec-eye::before{content:'';width:20px;height:2px;background:var(--vert);border-radius:2px;}
.sec-h2{font-family:'Fraunces',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;line-height:1.15;margin-bottom:12px;}
.sec-h2 em{color:var(--vert);font-style:italic;}
.sec-sub{font-size:.84rem;color:var(--gris);line-height:1.8;max-width:540px;font-weight:300;margin-bottom:40px;}
.filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px;}
.fbt{background:transparent;border:1.5px solid var(--bordure);color:var(--gris);padding:8px 18px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:all .2s;}
.fbt:hover{border-color:var(--vert);color:var(--vert);background:rgba(27,94,53,.05);}
.fbt.active{background:var(--vert);border-color:var(--vert);color:#fff;}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.pcard{background:var(--carte);border:1px solid var(--bordure);border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .3s var(--T),box-shadow .3s,border-color .3s;animation:up .5s var(--T) both;}
.pcard:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,.1);border-color:var(--vert3);}
.pcard-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;}
.pbadge{position:absolute;top:10px;left:10px;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:100px;}
.pcard-body{padding:14px 16px 18px;}
.pcard-cat{font-size:.6rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--vert);margin-bottom:5px;}
.pcard-nom{font-family:'Fraunces',serif;font-size:.98rem;font-weight:600;line-height:1.3;margin-bottom:6px;}
.pcard-desc{font-size:.73rem;color:var(--gris);line-height:1.65;margin-bottom:14px;}
.pcard-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;}
.pcard-prix{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;color:var(--vert);line-height:1;}
.pcard-unit{font-size:.6rem;color:var(--gris);margin-top:3px;}
.add-btn{background:var(--vert);color:#fff;border:none;padding:8px 14px;border-radius:6px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.7rem;font-weight:600;cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;flex-shrink:0;}
.add-btn:hover{background:var(--vert2);transform:scale(1.04);}
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.scard{background:var(--carte);border:1px solid var(--bordure);border-radius:14px;padding:28px 24px;display:flex;flex-direction:column;transition:transform .3s var(--T),box-shadow .3s,border-color .3s;animation:up .5s var(--T) both;}
.scard:hover{transform:translateY(-5px);box-shadow:0 12px 40px rgba(27,94,53,.12);border-color:var(--vert3);}
.scard-icon{font-size:2.2rem;margin-bottom:14px;}
.scard-tag{display:inline-block;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:#fef3e2;color:#92400e;border:1px solid #f5d6a0;padding:3px 10px;border-radius:100px;margin-bottom:12px;width:fit-content;}
.scard-nom{font-family:'Fraunces',serif;font-size:1.15rem;font-weight:600;line-height:1.3;margin-bottom:10px;}
.scard-desc{font-size:.78rem;color:var(--gris);line-height:1.75;margin-bottom:20px;flex:1;}
.scard-feats{list-style:none;display:flex;flex-direction:column;gap:7px;margin-bottom:24px;}
.scard-feats li{font-size:.74rem;color:var(--gris);display:flex;align-items:flex-start;gap:8px;line-height:1.5;}
.scard-feats li::before{content:'✓';color:var(--vert);font-weight:700;font-size:.72rem;margin-top:1px;flex-shrink:0;}
.devis-btn{width:100%;background:transparent;color:var(--vert);border:1.5px solid var(--vert);padding:12px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.78rem;font-weight:600;letter-spacing:.06em;cursor:pointer;transition:background .2s,color .2s;}
.devis-btn:hover{background:var(--vert);color:#fff;}
.bande-chiffres{background:var(--vert);padding:48px 32px;display:grid;grid-template-columns:repeat(4,1fr);gap:32px;position:relative;z-index:1;}
.bchiffre{text-align:center;}
.bchiffre-n{font-family:'Fraunces',serif;font-size:2.6rem;font-weight:700;color:#fff;}
.bchiffre-l{font-size:.7rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-top:4px;}
.av-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
.avcard{text-align:center;padding:24px 16px;}
.avcard-icon{font-size:2rem;margin-bottom:12px;}
.avcard-t{font-family:'Fraunces',serif;font-size:1rem;font-weight:600;margin-bottom:6px;}
.avcard-d{font-size:.76rem;color:var(--gris);line-height:1.65;}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:300;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(3px);}
.overlay.open{opacity:1;pointer-events:all;}
.cart-panel{position:fixed;top:0;right:-520px;width:480px;max-width:100vw;height:100dvh;background:#fff;z-index:301;display:flex;flex-direction:column;transition:right .4s var(--T);box-shadow:-8px 0 48px rgba(0,0,0,.12);}
.cart-panel.open{right:0;}
.cart-hd{padding:20px 24px;border-bottom:1px solid var(--bordure);display:flex;justify-content:space-between;align-items:center;}
.cart-hd h2{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;}
.xbtn{background:none;border:none;cursor:pointer;font-size:1.3rem;color:var(--gris);transition:color .2s;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;}
.xbtn:hover{color:var(--rouge);background:rgba(192,57,43,.08);}
.cart-body{flex:1;overflow-y:auto;padding:16px 24px;display:flex;flex-direction:column;gap:14px;}
.cart-empty{text-align:center;color:var(--gris);padding:60px 0;font-size:.84rem;}
.citem{display:flex;gap:12px;padding-bottom:14px;border-bottom:1px solid var(--bordure);align-items:flex-start;}
.citem-ico{width:48px;height:48px;background:var(--sable);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;}
.citem-info{flex:1;min-width:0;}
.citem-nom{font-family:'Fraunces',serif;font-size:.9rem;font-weight:600;margin-bottom:3px;line-height:1.3;}
.citem-px{font-size:.75rem;color:var(--vert);font-weight:600;}
.citem-rm{background:none;border:none;cursor:pointer;color:var(--gris);font-size:.9rem;padding:4px;transition:color .2s;flex-shrink:0;}
.citem-rm:hover{color:var(--rouge);}
.cart-ft{padding:16px 24px;border-top:1px solid var(--bordure);background:var(--fond);}
.cart-tot{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.cart-tot-l{font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gris);}
.cart-tot-p{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:700;color:var(--vert);}
.pay-btn{width:100%;background:var(--vert);color:#fff;border:none;padding:15px;border-radius:8px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.84rem;font-weight:700;letter-spacing:.06em;cursor:pointer;transition:background .2s,box-shadow .2s;}
.pay-btn:hover{background:var(--vert2);box-shadow:0 6px 20px rgba(27,94,53,.3);}
.pay-btn:disabled{opacity:.5;cursor:not-allowed;}
.pay-note{text-align:center;font-size:.64rem;color:var(--gris);margin-top:8px;}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(60px);background:var(--vert);color:#fff;padding:12px 22px;font-size:.78rem;font-weight:500;z-index:400;border-radius:8px;opacity:0;transition:transform .35s var(--T),opacity .35s;white-space:nowrap;box-shadow:0 6px 24px rgba(27,94,53,.4);max-width:90vw;}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1;}
footer{background:var(--vert);color:#fff;position:relative;z-index:1;}
.foot-inner{max-width:1280px;margin:0 auto;padding:56px 32px 28px;}
.foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:40px;}
.foot-logo-w .fl{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;margin-bottom:10px;}
.foot-desc{font-size:.76rem;color:rgba(255,255,255,.6);line-height:1.8;max-width:260px;}
.foot-col h4{font-size:.64rem;text-transform:uppercase;letter-spacing:.14em;color:var(--neon);margin-bottom:14px;font-weight:600;}
.foot-col ul{list-style:none;display:flex;flex-direction:column;gap:9px;}
.foot-col li{font-size:.78rem;color:rgba(255,255,255,.55);cursor:pointer;transition:color .2s;}
.foot-col li:hover{color:var(--neon);}
.foot-bottom{border-top:1px solid rgba(255,255,255,.15);padding-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
.foot-copy,.foot-secure{font-size:.68rem;color:rgba(255,255,255,.4);}
.ai-fab{position:fixed;bottom:28px;right:28px;z-index:500;width:58px;height:58px;border-radius:50%;border:none;background:linear-gradient(135deg,var(--vert),var(--vert2));color:#fff;font-size:1.5rem;cursor:pointer;box-shadow:0 6px 28px rgba(27,94,53,.45);transition:transform .2s var(--T),box-shadow .2s;display:flex;align-items:center;justify-content:center;}
.ai-fab:hover{transform:scale(1.08) translateY(-2px);box-shadow:0 10px 36px rgba(27,94,53,.55);}
.ai-badge{position:absolute;top:-3px;right:-3px;width:14px;height:14px;background:var(--rouge);border-radius:50%;border:2px solid var(--fond);animation:ping 2s infinite;}
@keyframes ping{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}
.ai-window{position:fixed;bottom:100px;right:28px;z-index:500;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100dvh - 120px);background:#fff;border-radius:20px;box-shadow:0 24px 80px rgba(0,0,0,.18);display:flex;flex-direction:column;transform:scale(.92) translateY(16px);opacity:0;pointer-events:none;transition:transform .35s var(--T),opacity .3s;overflow:hidden;border:1px solid var(--bordure);}
.ai-window.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
.ai-head{padding:16px 18px;background:linear-gradient(135deg,var(--vert),var(--vert2));display:flex;align-items:center;gap:12px;flex-shrink:0;}
.ai-avatar{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
.ai-head-info{flex:1;}
.ai-head-name{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;color:#fff;}
.ai-head-status{font-size:.68rem;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:5px;}
.ai-head-status::before{content:'';width:6px;height:6px;background:#5ddb8a;border-radius:50%;}
.ai-close{background:none;border:none;cursor:pointer;color:rgba(255,255,255,.7);font-size:1.1rem;transition:color .2s;padding:4px;}
.ai-close:hover{color:#fff;}
.ai-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;}
.ai-messages::-webkit-scrollbar{width:4px;}
.ai-messages::-webkit-scrollbar-thumb{background:var(--bordure);border-radius:2px;}
.msg{display:flex;gap:8px;animation:msgIn .3s var(--T);}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg.user{flex-direction:row-reverse;}
.msg-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0;margin-top:2px;}
.msg.bot .msg-av{background:linear-gradient(135deg,var(--vert),var(--vert2));}
.msg.user .msg-av{background:var(--sable);font-size:.75rem;}
.msg-bub{max-width:78%;padding:10px 14px;border-radius:14px;font-size:.8rem;line-height:1.65;}
.msg.bot .msg-bub{background:var(--fond);color:var(--noir);border-bottom-left-radius:4px;}
.msg.user .msg-bub{background:var(--vert);color:#fff;border-bottom-right-radius:4px;}
.typing{display:flex;gap:4px;padding:12px 14px;background:var(--fond);border-radius:14px;border-bottom-left-radius:4px;width:fit-content;}
.typing span{width:6px;height:6px;background:var(--gris);border-radius:50%;animation:bounce 1.4s infinite;}
.typing span:nth-child(2){animation-delay:.2s;}
.typing span:nth-child(3){animation-delay:.4s;}
@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
.ai-sugs{padding:0 12px 10px;display:flex;flex-wrap:wrap;gap:6px;}
.sug{background:var(--fond);border:1px solid var(--bordure);color:var(--vert);padding:5px 11px;border-radius:100px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.68rem;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;}
.sug:hover{background:var(--vert);color:#fff;border-color:var(--vert);}
.ai-input-row{padding:12px;border-top:1px solid var(--bordure);display:flex;gap:8px;background:#fff;flex-shrink:0;}
.ai-inp{flex:1;border:1.5px solid var(--bordure);border-radius:10px;padding:10px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:.82rem;outline:none;transition:border-color .2s;resize:none;max-height:80px;}
.ai-inp:focus{border-color:var(--vert);}
.ai-send{background:var(--vert);color:#fff;border:none;width:38px;height:38px;border-radius:10px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0;align-self:flex-end;}
.ai-send:hover{background:var(--vert2);}
.ai-send:disabled{opacity:.5;cursor:not-allowed;}
@media(max-width:960px){
  .nav-links,.nav-right{display:none;}
  .burger{display:flex;}
  .mobile-menu{display:flex;}
  .hero{grid-template-columns:1fr;padding:40px 20px 60px;gap:40px;}
  .pgrid{grid-template-columns:repeat(2,1fr);gap:16px;}
  .sgrid{grid-template-columns:1fr;gap:20px;}
  .bande-chiffres{grid-template-columns:repeat(2,1fr);padding:40px 24px;gap:24px;}
  .av-grid{grid-template-columns:repeat(2,1fr);}
  .foot-grid{grid-template-columns:1fr 1fr;gap:32px;}
  .section,.section-full{padding:56px 20px;}
  .cart-panel{width:100%;right:-100%;}
  .ai-window{right:16px;width:calc(100vw - 32px);}
  .ai-fab{bottom:20px;right:16px;}
}
@media(max-width:560px){
  .nav-inner{padding:0 16px;}
  .hero{padding:32px 16px 48px;}
  .hero-h1{font-size:2.2rem;}
  .hero-right{grid-template-columns:1fr 1fr;}
  .hero-btns{flex-direction:column;}
  .btn-vert,.btn-ghost{width:100%;text-align:center;padding:14px;}
  .pgrid{grid-template-columns:1fr;}
  .bande-chiffres{grid-template-columns:1fr 1fr;padding:32px 16px;gap:20px;}
  .av-grid{grid-template-columns:1fr 1fr;gap:16px;}
  .section,.section-full{padding:48px 16px;}
  .foot-grid{grid-template-columns:1fr;gap:28px;}
  .foot-bottom{flex-direction:column;align-items:flex-start;}
  .filters{gap:6px;}
  .fbt{font-size:.68rem;padding:7px 14px;}
  .ai-window{height:calc(100dvh - 110px);}
}
`;

const PRODUITS = [
  // ── Coagulants
  {id:1,type:"physique",cat:"Coagulants",nom:"PAC — Poly Aluminium Chlorure",desc:"Coagulant liquide haute performance. Efficace sur large plage de pH. Réduction turbidité et MES.",prix:"Sur devis",prixVal:0,unite:"bidon / IBC",emoji:"🧴",bg:"#e3f2fd"},
  {id:2,type:"physique",cat:"Coagulants",nom:"Chlorure Ferrique",desc:"Coagulant minéral puissant pour eaux industrielles et boues. Excellent pouvoir floculant.",prix:"Sur devis",prixVal:0,unite:"bidon / sac",emoji:"🟤",bg:"#fbe9e7"},
  {id:3,type:"physique",cat:"Coagulants",nom:"Sulfate d'Aluminium",desc:"Coagulant classique pour traitement eau potable et eaux résiduaires. Soluble, facile à doser.",prix:"Sur devis",prixVal:0,unite:"sac 25 kg",emoji:"🔵",bg:"#e8f5e9"},
  // ── Floculants
  {id:4,type:"physique",cat:"Floculants",nom:"Floculant Anionique",desc:"Polyacrylamide anionique pour clarification des eaux chargées. Favorise la formation de flocs denses.",prix:"Sur devis",prixVal:0,unite:"sac 25 kg",emoji:"🫧",bg:"#f3e5f5"},
  {id:5,type:"physique",cat:"Floculants",nom:"Floculant Cationique",desc:"Polyacrylamide cationique pour conditionnement des boues et flottation. Haute efficacité de déshydratation.",prix:"Sur devis",prixVal:0,unite:"sac 25 kg",emoji:"💠",bg:"#e8eaf6"},
  // ── pH
  {id:6,type:"physique",cat:"Correction pH",nom:"Stabilisant de pH",desc:"Maintient le pH dans la plage optimale de traitement. Compatible avec tous les procédés biologiques et physico-chimiques.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"⚖️",bg:"#fff8e1"},
  {id:7,type:"physique",cat:"Correction pH",nom:"Correcteur de pH",desc:"Correction acide ou basique du pH des effluents. Acide chlorhydrique ou soude caustique dilués, prêts à l'emploi.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🧪",bg:"#fce4ec"},
  // ── Désinfection & Traitement
  {id:8,type:"physique",cat:"Désinfection & Traitement",nom:"Hypochlorite de Sodium",desc:"Désinfectant oxydant puissant pour eaux usées et eau potable. Élimine bactéries, virus et agents pathogènes.",prix:"Sur devis",prixVal:0,unite:"bidon / IBC",emoji:"💧",bg:"#e0f7fa"},
  {id:9,type:"physique",cat:"Désinfection & Traitement",nom:"Antimousse",desc:"Élimine et prévient la formation de mousses dans les bassins de traitement et STEP. Action rapide et durable.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🫗",bg:"#f1f8e9"},
  {id:10,type:"physique",cat:"Désinfection & Traitement",nom:"Décolorant",desc:"Élimination des colorants et pigments dans les effluents textiles et industriels. Traitement physicochimique spécifique.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🎨",bg:"#fce4ec"},
  {id:11,type:"physique",cat:"Désinfection & Traitement",nom:"Peroxyde d'Hydrogène",desc:"Oxydant puissant pour traitement des eaux résiduaires industrielles. Élimine DCO, H₂S, composés organiques.",prix:"Sur devis",prixVal:0,unite:"bidon 30L",emoji:"⚗️",bg:"#e3f2fd"},
  // ── Osmose Inverse
  {id:12,type:"physique",cat:"Osmose Inverse",nom:"Anti-Scalant",desc:"Prévient l'entartrage et le colmatage des membranes d'osmose inverse. Protège contre carbonate de calcium, sulfates et silice.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🛡️",bg:"#e8f5e9"},
  {id:13,type:"physique",cat:"Osmose Inverse",nom:"Produit de Lavage Membranes — Acide",desc:"Nettoyage acide des membranes d'osmose inverse. Dissout tartre, oxydes métalliques et dépôts minéraux.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🔴",bg:"#fbe9e7"},
  {id:14,type:"physique",cat:"Osmose Inverse",nom:"Produit de Lavage Membranes — Basique",desc:"Nettoyage alcalin des membranes OI. Élimine biofilm, matière organique et colloïdes.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🔵",bg:"#e8eaf6"},
  {id:15,type:"physique",cat:"Osmose Inverse",nom:"Biocide Non Oxydant",desc:"Traitement biocide pour circuits d'osmose inverse. Contrôle microbiologique sans dégradation des membranes.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🦠",bg:"#f3e5f5"},
  {id:16,type:"physique",cat:"Osmose Inverse",nom:"Métabisulfite de Sodium",desc:"Neutralisant du chlore résiduel avant les membranes OI. Protège les membranes de l'oxydation.",prix:"Sur devis",prixVal:0,unite:"sac 25 kg",emoji:"🧂",bg:"#fff8e1"},
  // ── Eaux de Chaudière
  {id:17,type:"physique",cat:"Eaux de Chaudière",nom:"Produit de Passivation",desc:"Protège la surface interne des chaudières contre la corrosion. Forme un film protecteur durable sur les métaux ferreux.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"🔩",bg:"#fbe9e7"},
  {id:18,type:"physique",cat:"Eaux de Chaudière",nom:"Antitartre Chaudière",desc:"Prévient et élimine les dépôts calcaires dans les circuits chaudière. Améliore le rendement thermique.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"♨️",bg:"#fff3e0"},
  {id:19,type:"physique",cat:"Eaux de Chaudière",nom:"Agent Éliminateur d'Oxygène",desc:"Désoxygénant chimique pour chaudières. Élimine l'oxygène dissous, principale cause de corrosion des circuits vapeur.",prix:"Sur devis",prixVal:0,unite:"bidon 20L",emoji:"💨",bg:"#e0f7fa"},
  // ── Matériel de Mesure
  {id:20,type:"materiel",cat:"Matériel de Mesure",nom:"Kit Mesure de Chlore",desc:"Mesure rapide du chlore libre et total. Colorimétrie DPD. Idéal pour contrôle eau potable et piscines.",prix:"Sur devis",prixVal:0,unite:"kit complet",emoji:"🧫",bg:"#e3f2fd"},
  {id:21,type:"materiel",cat:"Matériel de Mesure",nom:"Kit Mesure de la Dureté",desc:"Détermination rapide du TH (titre hydrotimétrique). Méthode complexométrique, résultats en °F ou mg/L CaCO₃.",prix:"Sur devis",prixVal:0,unite:"kit complet",emoji:"💎",bg:"#f3e5f5"},
  {id:22,type:"materiel",cat:"Matériel de Mesure",nom:"pH-mètre",desc:"Mesure précise du pH en continu ou portable. Électrode combinée, compensation automatique de température.",prix:"Sur devis",prixVal:0,unite:"unité",emoji:"📊",bg:"#e8f5e9"},
  {id:23,type:"materiel",cat:"Matériel de Mesure",nom:"Oxymètre",desc:"Mesure de l'oxygène dissous en mg/L et % saturation. Indispensable pour suivi des bassins biologiques.",prix:"Sur devis",prixVal:0,unite:"unité",emoji:"🌬️",bg:"#e0f7fa"},
  {id:24,type:"materiel",cat:"Matériel de Mesure",nom:"Conductimètre",desc:"Mesure de la conductivité électrique (µS/cm – mS/cm). Contrôle salinité, TDS et qualité d'eau épurée.",prix:"Sur devis",prixVal:0,unite:"unité",emoji:"⚡",bg:"#fff8e1"},
  // ── Analyses (service)
  {id:30,type:"service_prod",cat:"Analyse des Eaux",nom:"Analyse Physicochimique & Bactériologique",desc:"Analyse complète des eaux de surface, souterraines ou résiduaires : pH, DCO, DBO5, métaux lourds, germes totaux, coliformes.",prix:"Sur devis",prixVal:0,unite:"rapport certifié",emoji:"🧫",bg:"#e0f7fa"},
  {id:31,type:"service_prod",cat:"Analyse des Sols",nom:"Analyse Agronomique & Pédologique",desc:"Caractérisation complète du sol : texture, pH, matière organique, macro et microéléments, conductivité.",prix:"Sur devis",prixVal:0,unite:"rapport certifié",emoji:"🌍",bg:"#f1f8e9"},
  {id:32,type:"service_prod",cat:"Analyse Environnementale",nom:"Bilan Environnemental & Conformité",desc:"Évaluation des rejets liquides et solides, mesure des paramètres réglementaires, rapport de conformité NM/ISO.",prix:"Sur devis",prixVal:0,unite:"rapport certifié",emoji:"🔭",bg:"#fce4ec"},
  // ── Formulations numériques
  {id:40,type:"numerique",cat:"Formulations — Engrais",nom:"Formule Engrais Foliaires",desc:"Formulation complète pour engrais foliaires : macro et microéléments, agents chélatants, adjuvants. Calculs de concentration et compatibilité inclus.",prix:"790 MAD",prixVal:790,unite:"accès permanent",emoji:"🌿",bg:"#e8f5e9"},
  {id:41,type:"numerique",cat:"Formulations — Engrais",nom:"Formule Engrais de Fertigation",desc:"Formulations N-P-K pour fertigation goutte-à-goutte et hydroponie. Calculateur de tankmix, compatibilité ionique, ajustement pH.",prix:"890 MAD",prixVal:890,unite:"accès permanent",emoji:"💧",bg:"#e3f2fd"},
  {id:42,type:"numerique",cat:"Formulations — Engrais",nom:"Formule Engrais Hydrosolubles",desc:"Formulation d'engrais hydrosolubles complexes NPK + oligo-éléments. Fiches techniques et protocoles de dissolution.",prix:"690 MAD",prixVal:690,unite:"accès permanent",emoji:"🧪",bg:"#f1f8e9"},
  {id:43,type:"numerique",cat:"Formulations — Traitement des Eaux",nom:"Formule Coagulant-Floculant Optimisé",desc:"Formulation et protocole de dosage coagulant-floculant selon nature des effluents. Jar-test intégré, ratios validés en laboratoire.",prix:"890 MAD",prixVal:890,unite:"accès permanent",emoji:"📄",bg:"#e8eaf6"},
  {id:44,type:"numerique",cat:"Formulations — Traitement des Eaux",nom:"Formule Traitement Eaux Résiduaires Industrielles",desc:"Protocoles complets pour STEP industrielles : physico-chimique, biologique, tertiaire. Fiches de dosage et suivi qualité.",prix:"990 MAD",prixVal:990,unite:"accès permanent",emoji:"🏭",bg:"#e0f7fa"},
  {id:45,type:"numerique",cat:"Formulations — Traitement des Eaux",nom:"Formule Traitement Osmose Inverse",desc:"Calcul de dosage anti-scalant, biocide et produits de lavage membranes. Indice de Langelier, LSI et compatibilité chimique.",prix:"790 MAD",prixVal:790,unite:"accès permanent",emoji:"🛡️",bg:"#e8f5e9"},
  {id:46,type:"numerique",cat:"Formulations — Nettoyage",nom:"Formule Détergent Industriel Alcalin",desc:"Formulation de nettoyants alcalins pour industries agroalimentaire, pharmaceutique et chimique. Calculateur de dilution et fiches MSDS.",prix:"590 MAD",prixVal:590,unite:"accès permanent",emoji:"🧴",bg:"#fce4ec"},
  {id:47,type:"numerique",cat:"Formulations — Nettoyage",nom:"Formule Détergent Industriel Acide",desc:"Détartrants et dégraissants acides pour circuits industriels, échangeurs, chaudières. Protocoles de neutralisation inclus.",prix:"590 MAD",prixVal:590,unite:"accès permanent",emoji:"⚗️",bg:"#fff8e1"},
  {id:48,type:"numerique",cat:"Formulations — Nettoyage",nom:"Formule Désinfectant & Biocide de Surface",desc:"Formulations désinfectantes pour surfaces industrielles et milieux sensibles. Spectre d'action, temps de contact, rinçabilité.",prix:"690 MAD",prixVal:690,unite:"accès permanent",emoji:"🦠",bg:"#f3e5f5"},
];

const SERVICES=[
  {id:"s1",nom:"Analyse Environnementale",desc:"Évaluation complète de vos rejets industriels et agricoles selon normes marocaines et internationales.",emoji:"🔭",feats:["Prélèvement sur site par nos ingénieurs","Analyses physico-chimiques & biologiques","Rapport de conformité NM/ISO","Recommandations correctives","Suivi post-analyse inclus"]},
  {id:"s2",nom:"Conception & Dimensionnement STEP",desc:"De l'avant-projet à la mise en service. Dimensionnement hydraulique et biologique complet.",emoji:"🏗️",feats:["APS / APD / DCE complets","Dimensionnement hydraulique et biologique","Comparaison et sélection des filières","Dossiers autorisation loi sur l'eau","Assistance maîtrise d'ouvrage (AMO)"]},
  {id:"s3",nom:"Solutions Traitement des Eaux",desc:"Audit, optimisation et suivi de vos procédés. Réduction des coûts, amélioration des performances.",emoji:"⚗️",feats:["Audit complet de votre installation","Optimisation doses de réactifs","Indicateurs de performance","Formation de vos équipes opérateurs","Contrat de suivi mensuel disponible"]},
];

const FILTRES=[
  {k:"tous",l:"Tout voir"},
  {k:"physique",l:"⚗️ Réactifs chimiques"},
  {k:"materiel",l:"🔧 Matériel"},
  {k:"service_prod",l:"🔬 Analyses"},
  {k:"numerique",l:"📄 Formulations numériques"},
];

const TICKERS=["💧 Coagulants & Floculants certifiés","⚗️ Réactifs pour STEP & osmose inverse","🔧 Matériel de mesure professionnel","📄 Formulations numériques — accès immédiat","🏗️ +200 projets STEP au Maroc","✓ Satisfait ou remboursé 30 jours","🇲🇦 Entreprise 100% marocaine","♨️ Traitement eaux de chaudière","🌿 Formules engrais & fertigation"];
const SUGS=["Quel coagulant pour mes eaux usées ?","Formule engrais foliaires disponible ?","Anti-scalant pour osmose inverse ?","Analyse de mon eau de puits ?","Je veux concevoir une STEP"];
const SYS=`Tu es l'assistant IA expert d'Univers Environnement Maroc (UEM). Gammes disponibles :
RÉACTIFS CHIMIQUES — Coagulants: PAC, Chlorure ferrique, Sulfate d'aluminium | Floculants: anionique, cationique | Correction pH: stabilisant, correcteur | Désinfection: hypochlorite de sodium, antimousse, décolorant, peroxyde d'hydrogène | Osmose inverse: anti-scalant, lavage acide membranes, lavage basique membranes, biocide non oxydant, métabisulfite de sodium | Chaudière: passivation, antitartre, éliminateur d'oxygène
MATÉRIEL — Kit mesure chlore, kit dureté, pH-mètre, oxymètre, conductimètre
ANALYSES — Physicochimique & bactériologique eaux, agronomique & pédologique sols, bilan environnemental NM/ISO
FORMULATIONS NUMÉRIQUES (PDF + Excel, accès permanent) — Engrais: foliaires, fertigation, hydrosolubles | Traitement des eaux: coagulant-floculant, STEP industrielles, osmose inverse | Nettoyage: détergent alcalin, détergent acide, désinfectant & biocide
SERVICES — Analyse environnementale, conception/dimensionnement STEP, solutions traitement des eaux
Conseille sur le bon produit ou la bonne formulation, réponds aux questions techniques (chimie eau, STEP, osmose inverse, chaudières, normes NM). Réponds toujours en français. Concis (max 3-4 phrases). Professionnel et chaleureux.`;

const BADGE_LABELS={physique:"Réactif",materiel:"Matériel",service_prod:"Analyse",numerique:"Numérique"};
const BADGE_CLASSES={physique:"t-p",materiel:"t-m",service_prod:"t-s",numerique:"t-n"};
const BG_COLORS={physique:"#e6f4ec",materiel:"#e0f7fa",service_prod:"#fef3e2",numerique:"#e8eaf6"};

export default function App() {
  const [filtre,setFiltre]=useState("tous");
  const [panier,setPanier]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [toast,setToast]=useState("");
  const [chatOpen,setChatOpen]=useState(false);
  const [msgs,setMsgs]=useState([{role:"bot",text:"Bonjour ! Je suis l'assistant expert d'**Univers Environnement Maroc**. 🌱\n\nJe peux vous conseiller sur nos réactifs chimiques, matériel de mesure, analyses ou services d'ingénierie. Comment puis-je vous aider ?"}]);
  const [inp,setInp]=useState("");
  const [loading,setLoading]=useState(false);
  const [showSugs,setShowSugs]=useState(true);
  const timerRef=useRef(null);
  const endRef=useRef(null);
  const inpRef=useRef(null);

  useEffect(()=>{const f=()=>setScrolled(window.scrollY>8);window.addEventListener("scroll",f,{passive:true});return()=>window.removeEventListener("scroll",f);},[]);
  useEffect(()=>{if(chatOpen)endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading,chatOpen]);
  useEffect(()=>{if(chatOpen)setTimeout(()=>inpRef.current?.focus(),350);},[chatOpen]);

  const showToast=(m)=>{setToast(m);clearTimeout(timerRef.current);timerRef.current=setTimeout(()=>setToast(""),2800);};
  const addToCart=(p)=>{setPanier(prev=>{const ex=prev.find(i=>i.id===p.id);return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1}];});showToast(`✓ "${p.nom}" ajouté au panier`);};
  const removeItem=(id)=>setPanier(p=>p.filter(i=>i.id!==id));
  const total=panier.reduce((s,i)=>s+i.prixVal*i.qty,0);
  const qty=panier.reduce((s,i)=>s+i.qty,0);
  const pFiltres=filtre==="tous"?PRODUITS:PRODUITS.filter(p=>p.type===filtre);
  const scrollTo=(id)=>{setMenuOpen(false);setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),80);};

  const send=async(text)=>{
    const txt=(text||inp).trim();
    if(!txt||loading)return;
    setInp("");setShowSugs(false);
    setMsgs(prev=>[...prev,{role:"user",text:txt}]);
    setLoading(true);
    const history=msgs.map(m=>({role:m.role==="user"?"user":"assistant",content:m.text}));
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:SYS,messages:[...history,{role:"user",content:txt}]})});
      const data=await res.json();
      const reply=data.content?.map(b=>b.text||"").join("")||"Désolé, une erreur est survenue.";
      setMsgs(prev=>[...prev,{role:"bot",text:reply}]);
    }catch{
      setMsgs(prev=>[...prev,{role:"bot",text:"Une erreur est survenue. Veuillez réessayer ou contacter notre équipe."}]);
    }finally{setLoading(false);}
  };

  const renderTxt=(t)=>t.split(/(\*\*[^*]+\*\*)/g).map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i}>{p.slice(2,-2)}</strong>:<span key={i}>{p}</span>);

  // Group products by category for display
  const cats=[...new Set(pFiltres.map(p=>p.cat))];

  return(
    <>
      <style>{CSS}</style>
      <div className="bg-zellige"/>
      <div className={`toast${toast?" show":""}`}>{toast}</div>

      {/* PANIER */}
      <div className={`overlay${cartOpen?" open":""}`} onClick={()=>setCartOpen(false)}/>
      <div className={`cart-panel${cartOpen?" open":""}`}>
        <div className="cart-hd"><h2>🛒 Panier{qty>0?` (${qty})`:""}</h2><button className="xbtn" onClick={()=>setCartOpen(false)}>✕</button></div>
        <div className="cart-body">
          {panier.length===0?<div className="cart-empty">💧<br/><br/>Votre panier est vide</div>
            :panier.map(i=>(
              <div key={i.id} className="citem">
                <div className="citem-ico">{i.emoji}</div>
                <div className="citem-info"><div className="citem-nom">{i.nom}</div><div className="citem-px">Devis demandé</div></div>
                <button className="citem-rm" onClick={()=>removeItem(i.id)}>✕</button>
              </div>
            ))}
        </div>
        <div className="cart-ft">
          <div className="cart-tot"><span className="cart-tot-l">{panier.length} produit{panier.length>1?"s":""} sélectionné{panier.length>1?"s":""}</span></div>
          <button className="pay-btn" disabled={!panier.length} onClick={()=>showToast("📩 Demande de devis groupé envoyée !")}>📩 Demander un devis groupé</button>
          <div className="pay-note">Réponse sous 24h · Tarifs dégressifs disponibles</div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className={`navbar${scrolled?" scrolled":""}`}>
        <div className="nav-inner">
          <a className="logo" href="#"><div className="logo-badge">UE</div><div className="logo-texts"><span className="logo-main">Univers Environnement</span><span className="logo-sub">Maroc</span></div></a>
          <ul className="nav-links">
            <li><a href="#" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"})}}>Accueil</a></li>
            <li><a href="#produits" onClick={e=>{e.preventDefault();scrollTo("produits")}}>Produits</a></li>
            <li><a href="#services" onClick={e=>{e.preventDefault();scrollTo("services")}}>Services</a></li>
            <li><a href="#contact" onClick={e=>{e.preventDefault();scrollTo("contact")}}>Contact</a></li>
          </ul>
          <div className="nav-right"><button className="cart-btn" onClick={()=>setCartOpen(true)}>🛒 Devis{qty>0&&<span className="cart-count">{qty}</span>}</button></div>
          <button className={`burger${menuOpen?" open":""}`} onClick={()=>setMenuOpen(v=>!v)}><span/><span/><span/></button>
        </div>
        <div className={`mobile-menu${menuOpen?" open":""}`}>
          <a href="#" onClick={e=>{e.preventDefault();setMenuOpen(false);window.scrollTo({top:0,behavior:"smooth"})}}>Accueil</a>
          <a href="#produits" onClick={e=>{e.preventDefault();scrollTo("produits")}}>Produits</a>
          <a href="#services" onClick={e=>{e.preventDefault();scrollTo("services")}}>Services</a>
          <a href="#contact" onClick={e=>{e.preventDefault();scrollTo("contact")}}>Contact</a>
          <button className="m-cart" onClick={()=>{setCartOpen(true);setMenuOpen(false);}}>🛒 Devis{qty>0?` (${qty})`:""}</button>
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker"><div className="ticker-track">{[...TICKERS,...TICKERS].map((t,i)=><span key={i} className="tick-item">{t}</span>)}</div></div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-flag"><span className="dot"/>Expertise environnementale au Maroc</div>
          <h1 className="hero-h1">Réactifs, matériel &<br/><em>ingénierie</em> pour<br/><span className="acc">vos eaux</span></h1>
          <p className="hero-p">Coagulants · Floculants · Osmose inverse · Chaudières · Analyses certifiées · Conception STEP</p>
          <div className="hero-btns">
            <button className="btn-vert" onClick={()=>scrollTo("produits")}>Explorer le catalogue</button>
            <button className="btn-ghost" onClick={()=>scrollTo("services")}>Nos services</button>
          </div>
          <div className="hero-kpis">
            <div><div className="kpi-n">200+</div><div className="kpi-l">STEP conçues</div></div>
            <div><div className="kpi-n">15 ans</div><div className="kpi-l">D'expertise</div></div>
            <div><div className="kpi-n">24h</div><div className="kpi-l">Livraison Maroc</div></div>
          </div>
        </div>
        <div className="hero-right">
          {[{icon:"🧴",tag:"t-p",label:"Coagulant",nom:"PAC / Chlorure ferrique"},{icon:"🫧",tag:"t-p",label:"Floculant",nom:"Anionique & Cationique"},{icon:"🛡️",tag:"t-p",label:"Osmose inverse",nom:"Anti-scalant & Biocide"},{icon:"⚡",tag:"t-m",label:"Matériel",nom:"pH-mètre · Conductimètre"}]
            .map((c,i)=><div key={i} className="hmini"><div className="hmini-icon">{c.icon}</div><span className={`hmini-tag ${c.tag}`}>{c.label}</span><div className="hmini-nom">{c.nom}</div></div>)}
        </div>
      </section>

      {/* CHIFFRES */}
      <div className="bande-chiffres">
        {[{n:"500+",l:"Clients actifs"},{n:"24h",l:"Livraison Maroc"},{n:"NM/ISO",l:"Analyses certifiées"},{n:"🇲🇦",l:"100% Marocain"}]
          .map((c,i)=><div key={i} className="bchiffre"><div className="bchiffre-n">{c.n}</div><div className="bchiffre-l">{c.l}</div></div>)}
      </div>

      {/* PRODUITS */}
      <section className="section" id="produits">
        <div className="sec-eye">Catalogue</div>
        <h2 className="sec-h2">Réactifs, matériel & <em>analyses</em></h2>
        <p className="sec-sub">Traitement des eaux usées, osmose inverse, chaudières, matériel de mesure et analyses environnementales certifiées.</p>
        <div className="filters">
          {FILTRES.map(f=><button key={f.k} className={`fbt${filtre===f.k?" active":""}`} onClick={()=>setFiltre(f.k)}>{f.l}</button>)}
        </div>
        {cats.map(cat=>(
          <div key={cat} style={{marginBottom:40}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
              <span style={{fontFamily:"'Fraunces',serif",fontSize:"1.1rem",fontWeight:700,color:"var(--vert)"}}>{cat}</span>
              <span style={{flex:1,height:1,background:"var(--bordure)"}}/>
              <span style={{fontSize:".68rem",color:"var(--gris)",fontWeight:500}}>{pFiltres.filter(p=>p.cat===cat).length} produit{pFiltres.filter(p=>p.cat===cat).length>1?"s":""}</span>
            </div>
            <div className="pgrid">
              {pFiltres.filter(p=>p.cat===cat).map((p,idx)=>(
                <div key={p.id} className="pcard" style={{animationDelay:`${idx*.06}s`}}>
                  <div className="pcard-img" style={{background:p.bg}}>
                    <span>{p.emoji}</span>
                    <span className={`pbadge ${BADGE_CLASSES[p.type]||"t-p"}`}>{BADGE_LABELS[p.type]||p.type}</span>
                  </div>
                  <div className="pcard-body">
                    <div className="pcard-cat">{p.cat}</div>
                    <div className="pcard-nom">{p.nom}</div>
                    <div className="pcard-desc">{p.desc}</div>
                    <div className="pcard-foot">
                      <div><div className="pcard-prix">{p.prix}</div><div className="pcard-unit">/{p.unite}</div></div>
                      {p.type==="service_prod"
                        ? <button className="add-btn" style={{background:"#92400e"}} onClick={()=>showToast(`📩 Demande : "${p.nom}"`)}>Devis →</button>
                        : p.type==="numerique"
                          ? <button className="add-btn" style={{background:"#1a56db"}} onClick={()=>addToCart(p)}>⚡ Acheter</button>
                          : <button className="add-btn" onClick={()=>addToCart(p)}>+ Devis</button>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* AVANTAGES */}
      <div className="section-full">
        <div className="section-full-inner">
          <div className="sec-eye" style={{marginBottom:32}}>Pourquoi nous choisir</div>
          <div className="av-grid">
            {[{icon:"🚚",t:"Livraison rapide",d:"Expédition sous 24h partout au Maroc. Suivi en temps réel."},{icon:"📦",t:"Stock disponible",d:"Réactifs en stock permanent. Commandes urgentes acceptées."},{icon:"🔬",t:"Qualité certifiée",d:"Produits conformes normes NM et réglementations marocaines."},{icon:"🇲🇦",t:"Expertise locale",d:"15 ans d'expérience terrain au Maroc. Support technique dédié."}]
              .map((a,i)=><div key={i} className="avcard"><div className="avcard-icon">{a.icon}</div><div className="avcard-t">{a.t}</div><div className="avcard-d">{a.d}</div></div>)}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="sec-eye">Ingénierie & Conseil</div>
        <h2 className="sec-h2">Nos <em>services</em> d'expertise</h2>
        <p className="sec-sub">Accompagnement A à Z : analyse terrain, conception d'ouvrages et optimisation de process selon normes marocaines.</p>
        <div className="sgrid">
          {SERVICES.map((s,idx)=>(
            <div key={s.id} className="scard" style={{animationDelay:`${idx*.1}s`}}>
              <div className="scard-icon">{s.emoji}</div>
              <div className="scard-tag">Service Expert</div>
              <div className="scard-nom">{s.nom}</div>
              <div className="scard-desc">{s.desc}</div>
              <ul className="scard-feats">{s.feats.map((f,i)=><li key={i}>{f}</li>)}</ul>
              <button className="devis-btn" onClick={()=>showToast(`📩 Demande : "${s.nom}" envoyée`)}>Demander un devis →</button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <div className="section-full" id="contact">
        <div className="section-full-inner" style={{textAlign:"center"}}>
          <div className="sec-eye" style={{justifyContent:"center"}}>Contact</div>
          <h2 className="sec-h2" style={{textAlign:"center"}}>Parlons de votre <em>projet</em></h2>
          <p className="sec-sub" style={{margin:"0 auto 32px",textAlign:"center"}}>Une question, un devis, un partenariat ? Notre équipe vous répond sous 24h.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-vert" onClick={()=>showToast("📩 Redirection vers le formulaire...")}>Envoyer un message</button>
            <button className="btn-ghost" onClick={()=>setChatOpen(true)}>💬 Parler à l'assistant IA</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="foot-inner">
          <div className="foot-grid">
            <div className="foot-logo-w"><div className="fl">Univers Environnement Maroc</div><p className="foot-desc">Réactifs chimiques, matériel de mesure et ingénierie environnementale au Maroc depuis plus de 15 ans.</p></div>
            <div className="foot-col"><h4>Réactifs</h4><ul><li>Coagulants</li><li>Floculants</li><li>Désinfection</li><li>Osmose inverse</li><li>Eaux de chaudière</li></ul></div>
            <div className="foot-col"><h4>Services</h4><ul><li>Analyse environnementale</li><li>Conception STEP</li><li>Optimisation process</li><li>Formation opérateurs</li></ul></div>
            <div className="foot-col"><h4>Légal</h4><ul><li>Mentions légales</li><li>CGV</li><li>Confidentialité</li><li>Contact</li></ul></div>
          </div>
          <div className="foot-bottom"><span className="foot-copy">© 2026 Univers Environnement Maroc — Tous droits réservés</span><span className="foot-secure">🔒 Devis gratuit · Livraison 24h · Maroc</span></div>
        </div>
      </footer>

      {/* AI FAB */}
      <button className="ai-fab" onClick={()=>setChatOpen(v=>!v)} aria-label="Assistant IA" style={{position:"relative"}}>
        {chatOpen?"✕":"🤖"}
        {!chatOpen&&<span className="ai-badge"/>}
      </button>

      {/* AI WINDOW */}
      <div className={`ai-window${chatOpen?" open":""}`}>
        <div className="ai-head">
          <div className="ai-avatar">🌱</div>
          <div className="ai-head-info"><div className="ai-head-name">Assistant UEM</div><div className="ai-head-status">En ligne · Expert traitement des eaux</div></div>
          <button className="ai-close" onClick={()=>setChatOpen(false)}>✕</button>
        </div>
        <div className="ai-messages">
          {msgs.map((m,i)=>(
            <div key={i} className={`msg ${m.role==="user"?"user":"bot"}`}>
              <div className="msg-av">{m.role==="user"?"👤":"🌱"}</div>
              <div className="msg-bub" style={{whiteSpace:"pre-wrap"}}>{renderTxt(m.text)}</div>
            </div>
          ))}
          {loading&&<div className="msg bot"><div className="msg-av">🌱</div><div className="typing"><span/><span/><span/></div></div>}
          <div ref={endRef}/>
        </div>
        {showSugs&&<div className="ai-sugs">{SUGS.map((s,i)=><button key={i} className="sug" onClick={()=>send(s)}>{s}</button>)}</div>}
        <div className="ai-input-row">
          <textarea ref={inpRef} className="ai-inp" placeholder="Posez votre question..." value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} rows={1}/>
          <button className="ai-send" onClick={()=>send()} disabled={!inp.trim()||loading}>➤</button>
        </div>
      </div>
    </>
  );
}
