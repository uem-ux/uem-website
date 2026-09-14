// UEM v4.0 — Site complet avec pages détaillées
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./App.css";


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
  mountain: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M3 20L9 8l4 6 3-4 5 10H3z"/></svg>,
  factory: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 21v-4h6v4M8 7h1M8 11h1M8 15h1M15 7h1M15 11h1M15 15h1"/></svg>,
  bed: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19v-6a2 2 0 012-2h5a2 2 0 012 2M14 13h5a2 2 0 012 2v6M3 19h18M3 13V7h4v4"/></svg>,
  cross: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="9" y="2" width="6" height="20" rx="1"/><rect x="2" y="9" width="20" height="6" rx="1"/></svg>,
  sprout: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M12 12C12 8 9 5 5 5c0 4 3 7 7 7z"/><path d="M12 12c0-4 3-7 7-7 0 4-3 7-7 7z"/></svg>,
};

/* Icônes réactifs par famille */
const reactifIco = (type) => ({
  "Filtration": Ico.filter3, "Reminéralisation": Ico.drop,
  "Coagulant": Ico.flask, "Floculant": Ico.flask, "Correction pH": Ico.beaker,
  "Désinfection": Ico.beaker, "Divers": Ico.beaker, "OI": Ico.filter3, "Chaudière": Ico.gauge
}[type] || Ico.flask);

/* DATA */
const SERVICES=[
  {id:1,icon:Ico.drop,color:"#0d2b6e",bg:"#e8f0fe",title:"Traitement des eaux",img:"/Step-traitement.jpg.jpeg",items:["STEP & Stations d'épuration","Eau potable & industrielle","Eaux usées & effluents"]},
  {id:2,icon:Ico.beaker,color:"#0d2b6e",bg:"#e8f0fe",title:"Analyses environnementales",img:"/Laboratoire-uem.jpg.jpeg",items:["Eau, Sol, Air, Boues","Analyses physico-chimiques","Normes NM / ISO"]},
  {id:3,icon:Ico.filter3,color:"#1b7a3e",bg:"#e8f5e9",title:"Médias Filtrants",img:null,items:["Sable de filtration","Calcite lavée pour reminéralisation"]},
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
  "Médias Filtrants":[
    {id:1,nom:"Sable de filtration",desc:"Média filtrant pour la filtration mécanique de l'eau, retient les matières en suspension dans les filtres à sable.",type:"Filtration"},
    {id:2,nom:"Calcite lavée",desc:"Média de reminéralisation pour eaux agressives (osmose inverse, pluie...), corrige le pH et recharge l'eau en calcium.",type:"Reminéralisation"}
  ]
};

const SERVICES_DETAIL=[
  {id:"analyse-eau",titre:"Analyse des Eaux",cat:"Analyse certifiée",tag:"tag-ana",img:"/Laboratoire-uem.jpg.jpeg",
   desc:"Notre laboratoire réalise des analyses complètes sur tous les types d'eau — eau brute, eau de process, eau de rejet, eau potable, eau de puits et eau de mer — selon les normes NM marocaines et ISO.",
   feats:["Prélèvement sur site certifié, tous types d'eau (brute, process, rejet, potable, puits, mer)","Analyses physico-chimiques complètes (pH, DCO, DBO5, MES, métaux lourds...)","Analyses bactériologiques (coliformes totaux, fécaux, streptocoques...)","Rapport certifié NM/ISO avec interprétation des résultats","Recommandations correctives adaptées à l'usage de l'eau","Suivi post-analyse et devis personnalisé"],
   process:["Planification & type d'eau","Prélèvement certifié","Analyses physico-chimiques","Analyses bactériologiques","Rapport & interprétation","Recommandations"]},
  {id:"analyse-sol",titre:"Analyse Agronomique et Sols",cat:"Analyse certifiée",tag:"tag-ana",img:"/analyse -terrain.jpg.jpeg",
   desc:"Optimisez vos apports fertilisants grâce à une connaissance précise de votre sol, de vos supports de culture et de vos fertilisants. UEM réalise des analyses agronomiques complètes pour une agriculture raisonnée.",
   feats:["Analyse de sol et de support de culture","Analyse des fertilisants et amendements","Analyse foliaire (diagnostic nutritionnel des plantes)","Dosage NPK complet, pH, CEC, matière organique","Micro-éléments (B, Cu, Fe, Mn, Zn)","Rapport et préconisations de fertilisation"],
   process:["Prélèvement terrain","Préparation échantillons","Analyses laboratoire","Interprétation","Rapport agronomique","Conseil fertilisation"]},
  {id:"analyse-environnementale",titre:"Analyse Environnementale",cat:"Environnement",tag:"tag-ana",img:"/mesure-bruit.jpg.jpeg",
   desc:"UEM mesure et quantifie les polluants et nuisances liés à vos installations — air, bruit, vibrations et émissions atmosphériques — pour protéger la santé, l'environnement et assurer votre conformité réglementaire.",
   feats:["Analyse de l'air : CO, CO2, SO2, NOx, H2S, particules (MP1/MP2.5/MP10), métaux dans l'air","Analyse des émissions atmosphériques (usines, chaufferies, process)","Analyse du bruit interne et externe (dB(A), seuils d'alerte et de danger)","Analyse des vibrations sur machines tournantes et structures","Analyse des ambiances de travail (thermique, sonore, lumineuse)","Rapport de conformité et recommandations correctives"],
   process:["Identification des points de mesure","Campagne de mesures terrain","Analyses & traitement des données","Comparaison aux seuils réglementaires","Rapport de conformité","Plan d'action correctif"]},
  {id:"ingenierie",titre:"Ingénierie et Traitement des Eaux",cat:"Ingénierie",tag:"tag-ing",img:"/Step-traitement.jpg.jpeg",
   desc:"UEM conçoit, installe et met en service des systèmes complets de traitement de l'eau douce et de process, ainsi que des filières de traitement des eaux usées. Du design à la maintenance, nous gérons l'intégralité du projet.",
   feats:["Eau douce & process : adoucisseurs, filtres actifs, filtres à sable","Désinfection : UV, chloration, osmose inverse","Eaux usées : traitement physico-chimique","Eaux usées : traitement biologique (boues activées, SBR, MBR)","Conception et dimensionnement de STEP, AMO et suivi de chantier","Formation des opérateurs et contrat de maintenance"],
   process:["Cahier des charges","Choix de la filière (physico-chimique / biologique)","Design système","Installation","Tests & mise en service","Formation & suivi"]},
  {id:"hse",titre:"HSE — Hygiène, Sécurité & Environnement",cat:"Environnement",tag:"tag-ing",img:"/mesure-site.jpg.jpeg",
   desc:"UEM accompagne les entreprises dans leur démarche de conformité HSE : études d'impact, audits, gestion des déchets, systèmes de management ISO et évaluation des risques, pour une activité conforme et maîtrisée.",
   feats:["Étude d'impact environnemental (EIE) et audits HSE","Mise en place de systèmes de management ISO 14001 / ISO 45001","Évaluation des risques professionnels et environnementaux","Gestion et valorisation des déchets","Plans d'urgence et procédures de sécurité","Accompagnement pour les autorisations environnementales"],
   process:["Diagnostic terrain","Analyse réglementaire","Évaluation des risques","Rapport & plan d'action","Mise en place ISO","Suivi de conformité"]},
  {id:"formation",titre:"Formation et Accompagnement",cat:"Formation",tag:"tag-ing",img:"/formation-hse.jpg",
   desc:"UEM conçoit une véritable ingénierie de formation sur mesure : diagnostic des besoins, programmes adaptés et transfert de compétences durable pour vos équipes, sur le traitement des eaux, le laboratoire et la sécurité.",
   feats:["Ingénierie de formation : diagnostic et programme sur mesure","Formation traitement des eaux & osmose inverse","Formation laboratoire et techniques d'analyse","Formation HSE (sécurité, prévention des risques)","Formation à l'exploitation de STEP","Formation en présentiel, sur site ou à distance"],
   process:["Analyse des besoins","Conception du programme","Formation (présentiel/site/distance)","Évaluation des acquis","Attestation de formation","Suivi post-formation"]},
  {id:"maintenance",titre:"Maintenance & Assistance Technique",cat:"Maintenance",tag:"tag-ing",img:"/mesure-bruit.jpg.jpeg",
   desc:"UEM assure la maintenance préventive et corrective de vos équipements de traitement des eaux et de laboratoire, avec des contrats de service adaptés et une assistance technique réactive partout au Maroc.",
   feats:["Maintenance préventive planifiée","Interventions correctives rapides","Contrats de maintenance annuels","Assistance technique 7j/7","Pièces de rechange disponibles à El Jadida","Suivi et reporting des interventions"],
   process:["Diagnostic initial","Contrat de maintenance","Interventions planifiées","Dépannage réactif","Rapport d'intervention","Suivi continu"]},
  {id:"step",titre:"Conception & Dimensionnement STEP",cat:"Ingénierie",tag:"tag-ing",img:"/Step-traitement.jpg.jpeg",
   desc:"De l'avant-projet sommaire (APS) à la mise en service, UEM accompagne les industriels et collectivités dans la conception de leurs stations d'épuration. Notre bureau d'études intègre les dernières technologies de traitement pour des installations conformes aux normes marocaines.",
   feats:["APS / APD / DCE complets","Dimensionnement hydraulique et biologique","Sélection des filières de traitement","Dossiers d'autorisation ONEE/Région","AMO et suivi de chantier","Formation des opérateurs"],
   process:["Diagnostic & Audit","Étude de faisabilité","Conception & Plans","Suivi travaux","Mise en service","Maintenance"]},
  {id:"optim",titre:"Optimisation STEP Existantes",cat:"Ingénierie",tag:"tag-ing",img:"/bassin-desinfection.jpg.jpeg",
   desc:"Vous avez une STEP sous-performante ? UEM réalise un audit technique complet et propose des solutions d'optimisation concrètes pour améliorer vos rendements d'épuration et réduire vos coûts.",
   feats:["Audit complet terrain","Bilan de fonctionnement","Optimisation des doses de réactifs","Réglage des équipements","Indicateurs de performance (KPI)","Rapport de recommandations"],
   process:["Visite terrain","Prélèvements & mesures","Analyse des données","Plan d'action","Mise en œuvre","Suivi mensuel"]}
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
const TICKER=["Osmoseurs industriels 500 L/h à 10 m³/h","Sable de filtration et calcite lavée — Livraison rapide","Analyses NM/ISO — El Jadida","+200 projets STEP au Maroc","Entreprise marocaine — 15 ans d'expertise","Études d'impact environnemental"];
const ADVANTAGES=[
  {icon:Ico.check,title:"Qualité certifiée",desc:"Produits & services conformes aux normes NM, ISO et réglementations marocaines"},
  {icon:Ico.target,title:"Solutions sur mesure",desc:"Études personnalisées adaptées à chaque contexte industriel et budgétaire"},
  {icon:Ico.bulb,title:"Innovation continue",desc:"Technologies de pointe pour répondre aux défis environnementaux les plus complexes"},
  {icon:Ico.handshake,title:"Accompagnement global",desc:"De l'étude initiale à la maintenance, UEM reste à vos côtés à chaque étape"}
];
const PRODUCTS_CAR=[
  {id:1,icon:Ico.filter3,title:"Médias filtrants",img:null,page:"reactifs"},
  {id:3,icon:Ico.gauge,title:"Osmoseurs industriels",img:"/osmoseur-grand.webp",page:"osmoseurs"},
  {id:4,icon:Ico.drop,title:"Osmoseurs domestiques",img:"/osmoseur-petit.webp",page:"osmoseurs"}
];

const SECTEURS=[
  {id:"industrie",nom:"Industrie",icon:Ico.gear,
   resume:"Solutions de traitement des eaux et de conformité environnementale pour sites industriels de toutes tailles.",
   enjeux:["Conformité aux normes de rejet industriel","Gestion des effluents de production","Maîtrise des coûts d'exploitation de l'eau"],
   solutions:["Conception et dimensionnement de STEP industrielles","Analyses physico-chimiques des effluents","Réactifs de traitement adaptés à votre process","Maintenance préventive des installations"]},
  {id:"agroalimentaire",nom:"Agroalimentaire",icon:Ico.leaf,
   resume:"Traitement des eaux usées à forte charge organique et conformité sanitaire pour l'industrie agroalimentaire.",
   enjeux:["Effluents à forte DCO/DBO5 (lavage, transformation)","Exigences sanitaires strictes","Pics de charge saisonniers"],
   solutions:["STEP dimensionnées pour fortes charges organiques","Osmoseurs pour eau de process","Analyses bactériologiques régulières","Réactifs coagulants et floculants adaptés"]},
  {id:"mines",nom:"Mines & Carrières",icon:Ico.mountain,
   resume:"Gestion de l'eau et des rejets pour sites miniers et carrières, dans le respect des normes environnementales.",
   enjeux:["Eaux d'exhaure chargées en métaux et particules","Impact sur les ressources en eau locales","Autorisations environnementales"],
   solutions:["Analyses des eaux et sols (métaux lourds)","Traitement physico-chimique des eaux d'exhaure","Études d'impact environnemental","Suivi réglementaire continu"]},
  {id:"cimenteries",nom:"Cimenteries & Industries lourdes",icon:Ico.factory,
   resume:"Traitement des eaux de process, refroidissement et contrôle des émissions pour cimenteries et industries lourdes.",
   enjeux:["Eaux de refroidissement et de lavage","Qualité de l'air et poussières","Bruit et vibrations des installations"],
   solutions:["Traitement des eaux de circuit de refroidissement","Analyses des émissions atmosphériques","Mesures de bruit et vibrations","Osmoseurs industriels haute capacité"]},
  {id:"chimie",nom:"Industrie chimique",icon:Ico.flask,
   resume:"Traitement spécialisé des effluents chimiques et accompagnement réglementaire pour l'industrie chimique.",
   enjeux:["Effluents dangereux et réglementés","Compatibilité des réactifs de traitement","Traçabilité et conformité"],
   solutions:["Étude sur mesure des filières de traitement","Réactifs et produits chimiques certifiés","Analyses physico-chimiques poussées","Accompagnement autorisations environnementales"]},
  {id:"pharmaceutique",nom:"Pharmaceutique & Cosmétique",icon:Ico.beaker,
   resume:"Eau ultra-pure et conformité qualité pour l'industrie pharmaceutique et cosmétique.",
   enjeux:["Exigences de pureté de l'eau très strictes","Traçabilité qualité","Effluents à traiter avant rejet"],
   solutions:["Osmose inverse double pass pour eau ultra-pure","Analyses de conformité en laboratoire","Déminéralisation et désinfection UV","Maintenance et qualification des installations"]},
  {id:"hotellerie",nom:"Hôtellerie & Tourisme",icon:Ico.bed,
   resume:"Eau potable, piscines et gestion des eaux usées pour hôtels et complexes touristiques.",
   enjeux:["Qualité de l'eau potable et sanitaire","Entretien des piscines et circuits d'eau","Image et satisfaction client"],
   solutions:["Analyses bactériologiques de l'eau potable","Adoucisseurs et osmoseurs semi-industriels","Désinfection et traitement des piscines","Contrats de maintenance réguliers"]},
  {id:"hopitaux",nom:"Hôpitaux & Cliniques",icon:Ico.cross,
   resume:"Traitement des effluents médicaux et sécurisation de l'eau pour établissements de santé.",
   enjeux:["Effluents à risque biologique/médicamenteux","Eau ultra-pure pour dialyse et stérilisation","Normes sanitaires renforcées"],
   solutions:["Traitement spécifique des effluents hospitaliers","Osmose inverse pour eau médicale","Analyses bactériologiques fréquentes","Désinfection UV et chloration contrôlée"]},
  {id:"collectivites",nom:"Collectivités & Régies publiques",icon:Ico.users,
   resume:"Stations d'épuration, eau potable et conformité réglementaire pour communes et régies publiques.",
   enjeux:["Vieillissement des infrastructures","Conformité aux normes de rejet","Budgets d'exploitation contraints"],
   solutions:["Conception et réhabilitation de STEP communales","Analyses de l'eau potable et des rejets","Formation des exploitants","Contrats de maintenance annuels"]},
  {id:"dessalement",nom:"Stations de dessalement",icon:Ico.drop,
   resume:"Expertise en osmose inverse à grande échelle pour la production d'eau douce à partir d'eau de mer ou saumâtre.",
   enjeux:["Prétraitement de l'eau brute","Consommation énergétique","Entretien des membranes"],
   solutions:["Osmoseurs industriels haute capacité","Anti-scalants et nettoyants membranes","Analyses de qualité de l'eau produite","Maintenance et suivi de performance"]},
  {id:"agriculture",nom:"Agriculture",icon:Ico.sprout,
   resume:"Analyse des sols, qualité de l'eau d'irrigation et conseil en fertilisation pour une agriculture raisonnée.",
   enjeux:["Qualité de l'eau d'irrigation","Fertilisation optimale des sols","Salinité et ressources en eau limitées"],
   solutions:["Analyses de sols et programmes de fertilisation","Analyses des eaux d'irrigation et de puits","Conseil agronomique sur le terrain","Formation des agriculteurs"]},
  {id:"universites",nom:"Universités & Centres de recherche",icon:Ico.cap,
   resume:"Accompagnement des laboratoires de recherche et gestion de l'eau sur les campus universitaires.",
   enjeux:["Besoins analytiques variés en recherche","Gestion de l'eau sur de grands campus","Formation des étudiants et personnels"],
   solutions:["Analyses de laboratoire sur mesure","Fourniture de réactifs de recherche","Formation HSE et laboratoire","Conseil technique pour projets étudiants"]}
];


/* Composants hoistés au niveau module (et non plus recréés à chaque rendu de App()).
   C'est ce qui corrige le bug de saisie dans le formulaire : avant, ces composants étaient
   redéfinis à chaque frappe de clavier, ce qui forçait React à démonter/remonter les champs
   et leur faisait perdre le focus après chaque caractère. */
function PageHdr({cat,title,sub,back,nav}) {
  return (
    <div className="ph"><div className="ph-in">
      <button className="ph-bk" onClick={() => nav(back||"home")}>←</button>
      <div><div className="ph-cat">{cat}</div><h1 className="ph-h1" dangerouslySetInnerHTML={{__html:title}}/>{sub && <p className="ph-sub">{sub}</p>}</div>
    </div></div>
  );
}

function TB() {
  return (
    <div className="tb"><div className="tb-in">
      <div className="tb-l">
        <a className="tb-a" href="tel:+212523377417">{Ico.phone}+212 523 37 74 17</a>
        <a className="tb-a" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">{Ico.whatsapp}+212 700 090 365</a>
        <span className="tb-a">{Ico.pin}N°1, Bd Jabrane Khalil Jabrane, El Jadida</span>
        <a className="tb-a" href="mailto:univers.envi@gmail.com">{Ico.mail}univers.envi@gmail.com</a>
      </div>
      <div className="tb-soc">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">{Ico.linkedin}</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">{Ico.facebook}</a>
      </div>
    </div></div>
  );
}

function NB({pathname,nav,scrollTo,mobOpen,setMobOpen}) {
  return (
    <nav className="nb"><div className="nb-in">
      <div className="logo" onClick={() => nav("home")}><img className="logo-img" src="/logo-uem-icon.png" alt="UEM"/><div className="logo-tx"><span className="logo-n">Univers Environnement</span><span className="logo-s">MAROC – EL JADIDA</span></div></div>
      <ul className="nb-links">
        <li className="nb-item"><button className={`nb-btn${pathname==="/"?" on":""}`} onClick={() => nav("home")}>Accueil</button></li>
        <li className="nb-item"><button className="nb-btn">À propos</button></li>
        <li className="nb-item">
          <button className={`nb-btn${pathname==="/services"||pathname.startsWith("/services/")?" on":""}`}>Nos services <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>
          <div className="dd">
            {[[Ico.drop,"Analyse des eaux","analyse-eau"],[Ico.leaf,"Analyse Agronomique et Sols","analyse-sol"],[Ico.beaker,"Analyse Environnementale","analyse-environnementale"],[Ico.ruler,"Ingénierie et Traitement des Eaux","ingenierie"],[Ico.cross,"HSE","hse"],[Ico.cap,"Formation et Accompagnement","formation"],[Ico.wrench,"Maintenance","maintenance"]].map(([ic,t,sid],i) => (
              <button key={i} className="dd-btn" onClick={() => nav(`svc-${sid}`)}><span className="dd-ico">{ic}</span>{t}</button>
            ))}
          </div>
        </li>
        <li className="nb-item">
          <button className={`nb-btn${pathname==="/osmoseurs"||pathname==="/reactifs"?" on":""}`}>Nos produits <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>
          <div className="dd">
            <button className="dd-btn" onClick={() => nav("osmoseurs")}><span className="dd-ico">{Ico.gauge}</span>Équipements</button>
            <button className="dd-btn" onClick={() => nav("reactifs")}><span className="dd-ico">{Ico.filter3}</span>Médias filtrants</button>
          </div>
        </li>
        <li className="nb-item"><button className={`nb-btn${pathname==="/realisations"?" on":""}`} onClick={() => nav("realisations")}>Nos réalisations</button></li>
        <li className="nb-item"><button className={`nb-btn${pathname==="/secteurs"||pathname.startsWith("/secteurs/")?" on":""}`} onClick={() => nav("secteurs")}>Secteurs</button></li>
        <li className="nb-item"><button className="nb-btn" onClick={() => scrollTo("blog")}>Actualités</button></li>
        <li className="nb-item"><button className="nb-btn" onClick={() => scrollTo("contact")}>Contact</button></li>
      </ul>
      <button className="nb-cta" onClick={() => scrollTo("contact")}>Demander un devis</button>
      <button className="burger" onClick={() => setMobOpen(o=>!o)}><span/><span/><span/></button>
    </div>
    <div className={`mob-menu${mobOpen?" open":""}`}>
      <button onClick={() => nav("home")}>Accueil</button>
      <button onClick={() => nav("services")}>Nos services</button>
      <button onClick={() => nav("osmoseurs")}>Équipements</button>
      <button onClick={() => nav("reactifs")}>Médias filtrants</button>
      <button onClick={() => nav("realisations")}>Nos réalisations</button>
      <button onClick={() => nav("secteurs")}>Secteurs d'activité</button>
      <button onClick={() => scrollTo("blog")}>Actualités</button>
      <button onClick={() => scrollTo("contact")}>Contact</button>
    </div></nav>
  );
}

function FT({nav,scrollTo}) {
  return (
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
        <li onClick={() => nav("svc-analyse-eau")}>Analyse des eaux</li>
        <li onClick={() => nav("svc-analyse-sol")}>Analyse Agronomique et Sols</li>
        <li onClick={() => nav("svc-analyse-environnementale")}>Analyse Environnementale</li>
        <li onClick={() => nav("svc-ingenierie")}>Ingénierie et Traitement des Eaux</li>
        <li onClick={() => nav("svc-hse")}>HSE</li>
        <li onClick={() => nav("svc-formation")}>Formation et Accompagnement</li>
        <li onClick={() => nav("svc-maintenance")}>Maintenance</li>
      </ul></div>
      <div className="ft-col"><h4>Nos produits</h4><ul>
        <li onClick={() => nav("osmoseurs")}>Équipements</li>
        <li onClick={() => nav("reactifs")}>Médias filtrants</li>
      </ul></div>
      <div className="ft-col"><h4>Informations</h4><ul>
        <li onClick={() => scrollTo("contact")}>Contact & Devis</li>
        <li onClick={() => nav("realisations")}>Nos réalisations</li>
        <li onClick={() => scrollTo("blog")}>Actualités</li>
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
}

function AI({aiOpen,setAiOpen,aiMsgs,aiInp,setAiInp,aiLoad,sendAI,aiRef}) {
  return (
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
}

function WA() {
  return (
    <div className="wa-fl">
      <a className="wa-btn" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">
        <div className="wa-pulse"/>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  );
}

const TOAST_ICONS = {success:Ico.check, warning:Ico.info, error:Ico.close, delete:Ico.close};
function TOASTS({toasts}) {
  return <div className="toast-wr">{toasts.map(t => <div key={t.id} className="toast">{TOAST_ICONS[t.type]||Ico.check} {t.msg}</div>)}</div>;
}

function CONTACT_SECTION({form,setForm,sending,sent,handleSubmit}) {
  return (
    <section className="contact-sec" id="contact">
      <div className="contact-in">
        <div className="ct-inf">
          <h2>Demandez votre <em>devis gratuit</em> dès aujourd'hui</h2>
          <p>Notre équipe d'experts vous répond en moins de 24 heures avec une solution technique et tarifaire adaptée à vos besoins.</p>
          <div className="ct-dets">
            {[{i:Ico.phone,l:"Téléphone",v:"+212 523 37 74 17"},{i:Ico.whatsapp,l:"WhatsApp",v:"+212 700 090 365"},{i:Ico.mail,l:"Email",v:"univers.envi@gmail.com"},{i:Ico.pin,l:"Adresse",v:"N°1, Bd Jabrane Khalil Jabrane, El Jadida, Maroc"}].map((d,i) => (
              <div className="ct-det" key={i}><div className="ct-ico">{d.i}</div><div><div className="ct-lbl">{d.l}</div><div className="ct-val">{d.v}</div></div></div>
            ))}
          </div>
          <div className="ct-map">
            <iframe title="Localisation UEM — El Jadida" src="https://www.google.com/maps?q=33.2316,-8.5007&output=embed" width="100%" height="220" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
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
                {SERVICES_DETAIL.map(s => <option key={s.id} value={s.titre}>{s.titre}</option>)}
                {OSMOSEURS.map(o => <option key={o.id} value={o.nom}>{o.nom}</option>)}
                <option value="Médias filtrants">Médias filtrants</option>
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
}

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [toasts, setToasts] = useState([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMsgs, setAiMsgs] = useState([{role:"bot",text:"Bonjour ! Je suis l'assistant UEM. Posez-moi vos questions sur nos osmoseurs (48 000 à 230 000 MAD), réactifs chimiques, analyses ou services d'ingénierie."}]);
  const [aiInp, setAiInp] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [realFilter, setRealFilter] = useState("Tous");
  const [blogs, setBlogs] = useState(() => {try{return JSON.parse(localStorage.getItem("uem_blogs")||"[]")}catch{return []}});
  const [blogForm, setBlogForm] = useState({title:"",excerpt:"",category:"Actualités"});
  const [techDetails, setTechDetails] = useState(() => {try{return JSON.parse(localStorage.getItem("uem_tech")||'{"osmoseurs":{},"reactifs":{},"services":{}}')}catch{return {osmoseurs:{},reactifs:{},services:{}}}});
  const [testimonials, setTestimonials] = useState(() => {try{return JSON.parse(localStorage.getItem("uem_testimonials")||"[]")}catch{return []}});
  const [form, setForm] = useState({name:"",email:"",company:"",service:"",message:""});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPwd, setAdminPwd] = useState("");
  const aiRef = useRef(null);

  useEffect(() => {if(aiRef.current) aiRef.current.scrollTop = aiRef.current.scrollHeight}, [aiMsgs, aiLoad]);
  useEffect(() => {localStorage.setItem("uem_blogs", JSON.stringify(blogs))}, [blogs]);
  useEffect(() => {localStorage.setItem("uem_tech", JSON.stringify(techDetails))}, [techDetails]);
  useEffect(() => {localStorage.setItem("uem_testimonials", JSON.stringify(testimonials))}, [testimonials]);
  useEffect(() => {window.scrollTo(0,0)}, [pathname]);
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {threshold:0.12});
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [pathname, testimonials.length]);
  useEffect(() => {
    const titles = {"/":"Univers Environnement Maroc — Traitement des eaux, osmose inverse, analyses environnementales","/osmoseurs":"Osmoseurs Industriels — Univers Environnement Maroc","/reactifs":"Réactifs Chimiques — Univers Environnement Maroc","/services":"Nos Services — Univers Environnement Maroc","/realisations":"Nos Réalisations — Univers Environnement Maroc","/secteurs":"Secteurs d'Activité — Univers Environnement Maroc","/admin":"Administration — UEM"};
    const sect = SECTEURS.find(s => pathname === `/secteurs/${s.id}`);
    if (sect) { document.title = `${sect.nom} — Traitement des eaux — Univers Environnement Maroc`; return; }
    const svc = SERVICES_DETAIL.find(s => pathname === `/services/${s.id}`);
    document.title = svc ? `${svc.titre} — Univers Environnement Maroc` : (titles[pathname] || "Univers Environnement Maroc");
  }, [pathname]);

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
      const res = await emailjs.send("service_3p09q76","template_1qu65qm",{from_name:form.name,from_email:form.email,company:form.company,service:form.service,message:form.message},"bhR3gf_SYQEaKSOky");
      console.log("EmailJS OK:", res);
      setSent(true); setForm({name:"",email:"",company:"",service:"",message:""});
      toast("Message envoyé ! Nous vous répondons sous 24h.");
    } catch (err) {
      console.error("EmailJS ERROR:", err);
      toast("Erreur. Contactez-nous au +212 523 37 74 17","error");
    }
    setSending(false);
  };

  /* Traduit les anciennes "clés" de page (ex: "osmoseurs", "svc-step") en vraies URLs.
     Ça évite de devoir réécrire tous les appels nav(...) existants dans le fichier. */
  const pathFor = (key) => {
    if (key === "home") return "/";
    if (key.startsWith("svc-")) return `/services/${key.slice(4)}`;
    if (key.startsWith("sect-")) return `/secteurs/${key.slice(5)}`;
    return `/${key}`;
  };
  const nav = (p) => { navigate(pathFor(p)); setMobOpen(false); };
  const scrollTo = (id) => {
    if (pathname !== "/") { navigate("/"); setTimeout(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"}), 150); }
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

  if (pathname === "/admin") return <AdminPage auth={adminAuth} pwd={adminPwd} setPwd={setAdminPwd} setAuth={setAdminAuth} blogs={blogs} setBlogs={setBlogs} blogForm={blogForm} setBlogForm={setBlogForm} techDetails={techDetails} setTechDetails={setTechDetails} testimonials={testimonials} setTestimonials={setTestimonials} nav={nav} toast={toast}/>;

  const SHARED_PROPS = {pathname, nav, scrollTo, mobOpen, setMobOpen, aiOpen, setAiOpen, aiMsgs, aiInp, setAiInp, aiLoad, sendAI, aiRef, toasts, form, setForm, sending, sent, handleSubmit, testimonials};
  /* ── PAGE OSMOSEURS ── */
  if (pathname === "/osmoseurs") return (
    <div>
      <TB/><NB {...SHARED_PROPS}/>
      <PageHdr nav={nav} cat="Équipements & Systèmes" title="Osmoseurs & <em>Équipements de Traitement</em>" sub="Osmose inverse, adoucisseurs, filtres, débitmètres et instrumentation. Installation, garantie et SAV UEM inclus partout au Maroc."/>
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
          <p><strong>Devis personnalisé gratuit sous 24h</strong> — Chaque installation est dimensionnée selon vos besoins (débit, qualité d'eau source, options : double pass, SCADA, distance). <strong>Financement disponible</strong> : crédit-bail, leasing, paiement échelonné.</p>
        </div>
        <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"18px",fontWeight:700,marginBottom:16,color:"var(--g900)",display:"flex",alignItems:"center",gap:8}}>{Ico.chart} Tableau comparatif des modèles</h2>
        <div className="os-compare">
          <table className="os-table">
            <thead><tr><th>Modèle</th><th>Débit</th><th>Rejection</th><th>Pression</th><th>Châssis</th><th>SCADA</th><th></th></tr></thead>
            <tbody>
              {OSMOSEURS.map(o => (
                <tr key={o.id}>
                  <td className="ref-td">{o.ref}</td>
                  <td className="debit-td">{o.debit}</td>
                  <td>{o.id>=7?">99%":o.id>=3?">98%":">97%"}</td>
                  <td>{o.specs[0].replace("Pression : ","")}</td>
                  <td>{o.id>=5?"Inox 316L":"Inox 304"}</td>
                  <td style={{color:"var(--vert3)",fontWeight:700}}>{o.id>=7?"✓":"-"}</td>
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
                <div className="os-foot" style={{justifyContent:"center"}}>
                  <button className="btn-devis" style={{width:"100%"}} onClick={() => requestDevis(o.nom)}>Demander un devis</button>
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
        <div className="divider"/>
        <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"18px",fontWeight:700,marginBottom:8,color:"var(--g900)"}}>Autres équipements</h2>
        <p style={{fontSize:13,color:"var(--g600)",marginBottom:20,maxWidth:640}}>En complément des osmoseurs, UEM fournit et installe l'ensemble des équipements nécessaires à votre installation de traitement des eaux.</p>
        <div className="sect-grid" style={{marginBottom:36}}>
          {[
            {t:"Adoucisseurs",d:"Adoucissement de l'eau par résine échangeuse d'ions, contre l'entartrage des circuits.",ic:Ico.filter3},
            {t:"Filtres",d:"Filtres actifs, filtres à sable et filtres à cartouche pour la clarification de l'eau.",ic:Ico.gauge},
            {t:"Débitmètres",d:"Mesure et suivi précis des débits sur vos circuits d'eau et de process.",ic:Ico.chart},
            {t:"Analyseurs en ligne",d:"Contrôle continu de la qualité de l'eau (pH, conductivité, chlore, turbidité).",ic:Ico.beaker},
            {t:"Armoires électriques et automatisme",d:"Pilotage, régulation et supervision automatisée de vos installations.",ic:Ico.gear}
          ].map((e,i) => (
            <div className="sect-card" key={i} onClick={() => requestDevis(e.t)}>
              <div className="sect-ico">{e.ic}</div>
              <div className="sect-nom">{e.t}</div>
              <div className="sect-resume">{e.d}</div>
              <span className="sect-lnk">Demander un devis →</span>
            </div>
          ))}
        </div>
      </div>
      <CONTACT_SECTION {...SHARED_PROPS}/><FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
    </div>
  );

  /* ── PAGE RÉACTIFS ── */
  if (pathname === "/reactifs") return (
    <div>
      <TB/><NB {...SHARED_PROPS}/>
      <PageHdr nav={nav} cat="Médias Filtrants" title="Sable de Filtration & <em>Calcite Lavée</em>" sub="Médias filtrants pour vos filtres à sable et unités de reminéralisation. Livraison sur tout le Maroc."/>
      <div className="pbody">
        <div className="info-box">
          {Ico.info}
          <p><strong>Stock permanent à El Jadida</strong> — Médias filtrants stockés localement pour une livraison rapide. <strong>Tarifs sur devis</strong> selon les quantités et le conditionnement (sacs 25kg, big-bag).</p>
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
      <CONTACT_SECTION {...SHARED_PROPS}/><FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
    </div>
  );

  /* ── PAGE SERVICES ── */
  if (pathname === "/services") return (
    <div>
      <TB/><NB {...SHARED_PROPS}/>
      <PageHdr nav={nav} cat="Nos Services" title="Ingénierie Environnementale & <em>Analyses Certifiées</em>" sub="Bureau d'études, analyses de laboratoire NM/ISO, conception STEP et études d'impact. L'expertise UEM au service de votre conformité."/>
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
      <CONTACT_SECTION {...SHARED_PROPS}/><FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
    </div>
  );

  /* ── PAGE SERVICE DETAIL ── */
  const svcMatch = SERVICES_DETAIL.find(s => pathname === `/services/${s.id}`);
  if (svcMatch) {
    const s = svcMatch;
    return (
      <div>
        <TB/><NB {...SHARED_PROPS}/>
        <PageHdr nav={nav} cat={s.cat} title={s.titre} sub={s.desc} back="services"/>
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
        <FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
      </div>
    );
  }

  /* ── PAGE RÉALISATIONS ── */
  if (pathname === "/realisations") {
    const cats = ["Tous", ...new Set(REALISATIONS.map(r => r.cat))];
    const filtered = realFilter==="Tous" ? REALISATIONS : REALISATIONS.filter(r => r.cat===realFilter);
    return (
      <div>
        <TB/><NB {...SHARED_PROPS}/>
        <PageHdr nav={nav} cat="Portfolio" title="Nos <em>Réalisations</em> au Maroc" sub={`${REALISATIONS.length} projets réalisés dans les domaines de l'eau, de l'environnement et de l'analyse industrielle.`}/>
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
        <FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
      </div>
    );
  }

  /* ── PAGE SECTEURS (liste) ── */
  if (pathname === "/secteurs") return (
    <div>
      <TB/><NB {...SHARED_PROPS}/>
      <PageHdr nav={nav} cat="Solutions par métier" title="Nos <em>Secteurs</em> d'Activité" sub="UEM adapte ses solutions de traitement des eaux et d'ingénierie environnementale aux enjeux spécifiques de chaque secteur, partout au Maroc."/>
      <div className="pbody">
        <div className="sect-grid">
          {SECTEURS.map(s => (
            <div className="sect-card" key={s.id} onClick={() => nav(`sect-${s.id}`)}>
              <div className="sect-ico">{s.icon}</div>
              <div className="sect-nom">{s.nom}</div>
              <div className="sect-resume">{s.resume}</div>
              <span className="sect-lnk">Découvrir →</span>
            </div>
          ))}
        </div>
      </div>
      <CONTACT_SECTION {...SHARED_PROPS}/><FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
    </div>
  );

  /* ── PAGE SECTEUR DÉTAIL ── */
  const sectMatch = SECTEURS.find(s => pathname === `/secteurs/${s.id}`);
  if (sectMatch) {
    const s = sectMatch;
    return (
      <div>
        <TB/><NB {...SHARED_PROPS}/>
        <PageHdr nav={nav} cat="Secteur d'activité" title={s.nom} sub={s.resume} back="secteurs"/>
        <div className="pbody">
          <div className="sect-block">
            <h3>{Ico.target} Enjeux spécifiques du secteur</h3>
            <ul>{s.enjeux.map((e,i) => <li key={i}>{e}</li>)}</ul>
          </div>
          <div className="sect-block">
            <h3>{Ico.check} Ce que UEM vous apporte</h3>
            <ul>{s.solutions.map((sol,i) => <li key={i}>{sol}</li>)}</ul>
          </div>
          <div style={{background:"linear-gradient(135deg,var(--bleu),var(--bleu2))",borderRadius:16,padding:"32px",textAlign:"center",marginTop:36}}>
            <h3 style={{fontFamily:"'Poppins',sans-serif",fontSize:20,fontWeight:700,color:"#fff",marginBottom:10}}>Un projet dans le secteur {s.nom.toLowerCase()} ?</h3>
            <p style={{color:"rgba(255,255,255,.8)",fontSize:14,marginBottom:22,lineHeight:1.65}}>Notre équipe vous répond sous 24h avec une solution technique et tarifaire adaptée à votre activité.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn-prim" style={{background:"#fff",color:"var(--bleu)"}} onClick={() => requestDevis(`Secteur ${s.nom}`)}>Demander un devis gratuit →</button>
              <a className="btn-wa-s" href="https://wa.me/212700090365" target="_blank" rel="noopener noreferrer">{Ico.whatsapp}Parler à un expert</a>
            </div>
          </div>
        </div>
        <FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
      </div>
    );
  }

  /* ── PAGE 404 ── */
  if (pathname !== "/") return (
    <div>
      <TB/><NB {...SHARED_PROPS}/>
      <div className="pbody" style={{textAlign:"center",padding:"90px 24px"}}>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:"clamp(48px,8vw,96px)",fontWeight:800,color:"var(--g200)",lineHeight:1}}>404</div>
        <h1 style={{fontFamily:"'Poppins',sans-serif",fontSize:22,fontWeight:700,color:"var(--g900)",margin:"12px 0 10px"}}>Page introuvable</h1>
        <p style={{fontSize:14,color:"var(--g600)",marginBottom:28,maxWidth:440,marginLeft:"auto",marginRight:"auto"}}>La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <button className="btn-prim" style={{margin:"0 auto"}} onClick={() => nav("home")}>Retour à l'accueil →</button>
      </div>
      <FT {...SHARED_PROPS}/><AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
    </div>
  );

  /* ── HOME PAGE ── */
  return (
    <div>
      <TB/><NB {...SHARED_PROPS}/>
      <section className="hero" id="home">
        <div className="hero-bg"><img src="/hero-cover.jpg" alt="Univers Environnement Maroc" loading="eager"/></div>
        <div className="hero-in">
          <div className="hero-txt">
            <div className="hero-tag">L'expertise verte au service du Maroc</div>
            <h1>Traitement des eaux et ingénierie environnementale au Maroc</h1>
            <div className="hero-badges">
              {[[Ico.ruler,"Conception et réalisation des STEP"],[Ico.drop,"Osmose inverse"],[Ico.beaker,"Analyses environnementales"],[Ico.filter3,"Médias filtrants"]].map(([ic,t],i) => (
                <div className="hero-badge" key={i}>{ic}{t}</div>
              ))}
            </div>
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

      <div className="stats reveal"><div className="stats-in">
        {[{i:Ico.trophy,n:"15+",l:"Ans d'expérience"},{i:Ico.folder,n:"200+",l:"Projets réalisés"},{i:Ico.users,n:"500+",l:"Clients satisfaits"},{i:Ico.star,n:"98%",l:"Taux de satisfaction"}].map((s,i)=>(
          <div className="stat" key={i}><div className="stat-n"><span className="stat-ico">{s.i}</span>{s.n}</div><div className="stat-l">{s.l}</div></div>
        ))}
      </div></div>

      <div className="clients reveal"><div className="cl-in">
        <div className="cl-ttl">Clients de référence</div>
        <div className="cl-logos">{CLIENTS.map((c,i)=><div key={i} className="cl-logo" title={c.name}><img src={c.img} alt={c.name} loading="lazy"/></div>)}</div>
      </div></div>

      <section className="sec sec-bg reveal" id="services">
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

      <section className="sec sec-navy reveal" id="products">
        <div className="sec-in">
          <div className="sec-ey">NOS PRODUITS PHARES</div>
          <h2 className="sec-ti">Des produits de qualité pour des performances durables</h2>
          <div className="car-wrap">
            <div className="car-tr">
              {PRODUCTS_CAR.map(p => (
                <div className="prod-card" key={p.id} onClick={() => nav(p.page)}>
                  {p.img?<img className="pc-img" src={p.img} alt={p.title} onError={e=>{e.target.style.display="none";}}/>:null}
                  <div className="pc-ph" style={{display:p.img?"none":"flex",color:"#fff"}}>{p.icon}</div>
                  <div className="pc-body"><div className="pc-t">{p.title}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{textAlign:"center",marginTop:16,display:"flex",gap:12,justifyContent:"center"}}>
            <button style={{background:"transparent",color:"#fff",padding:"11px 26px",borderRadius:9,fontWeight:600,fontSize:14,border:"2px solid rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"inherit"}} onClick={() => nav("osmoseurs")}>Osmoseurs & Équipements →</button>
            <button style={{background:"transparent",color:"#fff",padding:"11px 26px",borderRadius:9,fontWeight:600,fontSize:14,border:"2px solid rgba(255,255,255,.4)",cursor:"pointer",fontFamily:"inherit"}} onClick={() => nav("reactifs")}>Réactifs Chimiques →</button>
          </div>
        </div>
      </section>

      <section className="sec reveal">
        <div className="sec-in">
          <h2 className="sec-ti">Pourquoi choisir <em>UEM</em> ?</h2>
          <div className="adv-grid">
            {ADVANTAGES.map((a,i)=><div className="adv-card" key={i}><div className="adv-ico">{a.icon}</div><div className="adv-t">{a.title}</div><div className="adv-d">{a.desc}</div></div>)}
          </div>
        </div>
      </section>

      {testimonials.length>0 && (
        <section className="sec sec-bg reveal">
          <div className="sec-in">
            <div className="sec-ey">TÉMOIGNAGES</div>
            <h2 className="sec-ti">Ce que disent <em>nos clients</em></h2>
            <div className="testi-grid">
              {testimonials.slice(0,6).map(t => (
                <div className="testi-card" key={t.id}>
                  <div className="testi-quote">{Ico.check}</div>
                  <p className="testi-txt">« {t.texte} »</p>
                  <div className="testi-auteur">{t.auteur}</div>
                  {t.poste && <div className="testi-poste">{t.poste}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="ticker"><div className="ticker-in">
        {[...TICKER,...TICKER].map((item,i)=><span key={i} className="tick-item"><span className="tick-dot"/>{item}</span>)}
      </div></div>

      <section className="sec sec-bg reveal" id="realisations">
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

      <section className="sec reveal" id="blog">
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

      <CONTACT_SECTION {...SHARED_PROPS}/><FT {...SHARED_PROPS}/>
      <AI {...SHARED_PROPS}/><WA/><TOASTS {...SHARED_PROPS}/>
    </div>
  );
}

const TECH_TYPES = {
  osmoseurs: {label:"Osmoseur", items: OSMOSEURS.map(o=>({id:o.id, label:`${o.ref} — ${o.debit}`}))},
  reactifs: {label:"Réactif chimique", items: Object.values(REACTIFS).flat().map(p=>({id:p.id, label:p.nom}))},
  services: {label:"Service", items: SERVICES_DETAIL.map(s=>({id:s.id, label:s.titre}))}
};

function AdminPage({auth,pwd,setPwd,setAuth,blogs,setBlogs,blogForm,setBlogForm,techDetails,setTechDetails,testimonials,setTestimonials,nav,toast}) {
  const [techType, setTechType] = useState("osmoseurs");
  const [techItemId, setTechItemId] = useState("");
  const [techText, setTechText] = useState("");
  const [testiForm, setTestiForm] = useState({auteur:"",poste:"",texte:""});
  if (!auth) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f8fafc",fontFamily:"Inter,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:18,padding:"42px 34px",boxShadow:"0 8px 40px rgba(0,0,0,.12)",width:355,textAlign:"center"}}>
        <img src="/logo-uem-icon.png" alt="UEM" style={{height:64,margin:"0 auto 13px"}}/>
        <h2 style={{fontSize:20,fontWeight:700,color:"#0d2b6e",marginBottom:7}}>Administration UEM</h2>
        <p style={{color:"#475569",fontSize:13,marginBottom:24}}>Accès réservé à l'équipe UEM</p>
        <input style={{width:"100%",padding:"11px 14px",borderRadius:9,border:"1.5px solid #e2e8f0",fontSize:14,fontFamily:"inherit",marginBottom:13,boxSizing:"border-box"}} type="password" placeholder="Mot de passe" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(pwd==="uem-admin-2026"?setAuth(true):toast("Mot de passe incorrect","error"))}/>
        <button style={{width:"100%",padding:12,background:"#0d2b6e",color:"#fff",border:"none",borderRadius:9,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}} onClick={()=>pwd==="uem-admin-2026"?setAuth(true):toast("Mot de passe incorrect","error")}>Se connecter</button>
        <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",marginTop:13,fontSize:13,fontFamily:"inherit"}}>← Retour au site</button>
      </div>
    </div>
  );
  const addBlog = () => {
    if (!blogForm.title||!blogForm.excerpt){toast("Titre et extrait requis","warning");return;}
    setBlogs(b=>[{...blogForm,id:Date.now().toString(),date:new Date().toLocaleDateString("fr-FR",{month:"long",year:"numeric"})},...b]);
    setBlogForm({title:"",excerpt:"",category:"Actualités"});
    toast("Article publié !");
  };
  const addTestimonial = () => {
    if (!testiForm.auteur||!testiForm.texte){toast("Nom et témoignage requis","warning");return;}
    setTestimonials(t=>[{...testiForm,id:Date.now().toString()},...t]);
    setTestiForm({auteur:"",poste:"",texte:""});
    toast("Témoignage publié !");
  };
  return (
    <div className="adm-wrap">
      <div className="adm-card">
        <div className="adm-hd">
          <span style={{display:"flex"}}>{Ico.gear}</span>
          <div><h1>Administration UEM</h1><div style={{fontSize:12,opacity:.8,marginTop:1}}>Gestion du site v4.2</div></div>
          <div style={{marginLeft:"auto",display:"flex",gap:8}}>
            <button onClick={()=>nav("home")} style={{background:"rgba(255,255,255,.2)",color:"#fff",border:"none",borderRadius:7,padding:"7px 13px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>← Site</button>
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
            <h2>Témoignages clients</h2>
            <p style={{fontSize:12.5,color:"var(--g600)",marginBottom:14,lineHeight:1.6}}>Ajoutez uniquement de vrais témoignages, avec l'accord de la personne citée. Ils s'affichent sur la page d'accueil.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div className="fg"><label>Nom *</label><input placeholder="Ex : Ahmed Bensaid" value={testiForm.auteur} onChange={e=>setTestiForm(f=>({...f,auteur:e.target.value}))}/></div>
              <div className="fg"><label>Poste / Entreprise</label><input placeholder="Ex : Directeur technique, OCP" value={testiForm.poste} onChange={e=>setTestiForm(f=>({...f,poste:e.target.value}))}/></div>
            </div>
            <div className="fg"><label>Témoignage *</label><textarea style={{height:88}} placeholder="Le texte exact du témoignage..." value={testiForm.texte} onChange={e=>setTestiForm(f=>({...f,texte:e.target.value}))}/></div>
            <button className="btn-grn" onClick={addTestimonial}>Publier →</button>
            {testimonials.length>0 && (
              <div style={{marginTop:18}}>
                {testimonials.map(t => (
                  <div className="bpi" key={t.id}>
                    <div><strong style={{fontSize:13}}>{t.auteur}</strong><div className="bpi-m">{t.poste} — « {t.texte.slice(0,60)}{t.texte.length>60?"...":""} »</div></div>
                    <button className="btn-del" onClick={()=>{setTestimonials(ts=>ts.filter(x=>x.id!==t.id));toast("Témoignage supprimé","delete");}}>Supprimer</button>
                  </div>
                ))}
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
              <div><strong>Pages :</strong> Accueil, Osmoseurs (8 modèles + prix), Médias filtrants (2 produits), Services (×9 détails), Réalisations (×9 + filtres), Admin</div>
              <div><strong>Version :</strong> 4.2 — Correctifs audit (tableau osmoseurs, doublon client, icônes SVG, devis contextualisé)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
