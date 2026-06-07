# 🌿 Univers Environnement Maroc — uem.ma

Site e-commerce React pour UEM — Réactifs chimiques, matériel de mesure, analyses environnementales et ingénierie eau au Maroc.

---

## 🚀 Déploiement sur Vercel (étape par étape)

### Étape 1 — Mettre le projet sur GitHub

1. Créer un compte sur [github.com](https://github.com)
2. Cliquer sur **"New repository"**
3. Nom du repo : `uem-website`
4. Visibilité : **Private** ✅
5. Cliquer **"Create repository"**
6. Uploader tous les fichiers de ce dossier

### Étape 2 — Déployer sur Vercel

1. Créer un compte sur [vercel.com](https://vercel.com) (avec votre compte GitHub)
2. Cliquer **"New Project"**
3. Sélectionner le repo `uem-website`
4. Framework : **Vite** (détecté automatiquement)
5. Cliquer **"Deploy"** → votre site est en ligne en 2 minutes ✅

### Étape 3 — Relier uem.ma

1. Dans Vercel → Settings → **Domains**
2. Ajouter `uem.ma` et `www.uem.ma`
3. Vercel vous donnera des enregistrements DNS
4. Aller sur votre registrar (nindohost.ma ou vala.ma)
5. Modifier les DNS selon les instructions Vercel
6. Attendre 1–24h pour la propagation DNS ✅

---

## 💻 Développement local

```bash
# Installer les dépendances
npm install

# Lancer en local
npm run dev
# → http://localhost:3000

# Builder pour production
npm run build
```

---

## 📧 Configurer EmailJS (formulaire de devis)

1. Créer un compte sur [emailjs.com](https://emailjs.com)
2. Connecter votre boîte email
3. Dans `src/App.jsx`, remplacer :
   - `VOTRE_SERVICE_ID`
   - `VOTRE_TEMPLATE_ID`  
   - `VOTRE_PUBLIC_KEY`

---

## 💳 Intégration CMI (paiement)

Nécessite un backend Node.js séparé.
Contacter UEM pour les credentials CMI après signature du contrat marchand.

---

## 📁 Structure du projet

```
uem-website/
├── index.html          # Point d'entrée HTML
├── vite.config.js      # Configuration Vite
├── vercel.json         # Configuration Vercel
├── package.json        # Dépendances
├── .gitignore
├── public/
│   └── favicon.svg     # Icône du site
└── src/
    ├── main.jsx        # Point d'entrée React
    └── App.jsx         # Application complète UEM
```

---

© 2026 Univers Environnement Maroc
