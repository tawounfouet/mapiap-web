# R1 - Manifeste de preuves photographiques et techniques

**Origine :** objets Git existants dans https://github.com/tawounfouet/mapiap-web/tree/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e, captures Playwright de la PR #39.
**Code candidate :** `c0bcaf9eb31dd4c8313677597e063c4cabb32a58`.
**Test CI :** https://github.com/tawounfouet/mapiap-web/actions/runs/44622294955, conclusion success.
**Format :** PNG original, non retouche ; screenshots pleine page Chromium sur Linux x86-64.

## 1. Neuf images copiees a l'identique

- **ACC-D-1024** : [accueil-desktop-1024.png](assets/screenshots/accueil-desktop-1024.png) ; capture 1024 px ; blob Git `46ce9f9035ce97554e8a27f80152494e833bf67b` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/home-visual.spec.ts-snapshots/homepage-desktop-1024-chromium-linux.png).
- **ACC-D-1440** : [accueil-desktop-1440.png](assets/screenshots/accueil-desktop-1440.png) ; capture 1440 px ; blob Git `1e2b2e957b4ed7a93a5726e69fb0a39daa8c6957` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/home-visual.spec.ts-snapshots/homepage-desktop-1440-chromium-linux.png).
- **ACC-D-1536** : [accueil-desktop-1536.png](assets/screenshots/accueil-desktop-1536.png) ; capture 1536 px ; blob Git `964efeb762ec9f4b6cf5cc8614e91316f73191cf` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/home-visual.spec.ts-snapshots/homepage-desktop-1536-chromium-linux.png).
- **ACC-M-0320** : [accueil-mobile-320.png](assets/screenshots/accueil-mobile-320.png) ; capture 320 px ; blob Git `4993ce9c24a9a4ec02319fe58ba56a12fdccee31` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/home-visual.spec.ts-snapshots/homepage-mobile-320-chromium-linux.png).
- **ACC-M-0390** : [accueil-mobile-390.png](assets/screenshots/accueil-mobile-390.png) ; capture 390 px ; blob Git `0da30baa386c0ee2da1677aa4358b9df90dbeb75` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/home-visual.spec.ts-snapshots/homepage-mobile-390-chromium-linux.png).
- **ACC-M-0480** : [accueil-mobile-480.png](assets/screenshots/accueil-mobile-480.png) ; capture 480 px ; blob Git `9abb7e2b78093d820900099668dfdc8b29d72d10` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/home-visual.spec.ts-snapshots/homepage-mobile-480-chromium-linux.png).
- **ACC-T-0768** : [accueil-tablette-768.png](assets/screenshots/accueil-tablette-768.png) ; capture 768 px ; blob Git `df958297da008f8aff5ad1869134d3c473e90596` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/home-visual.spec.ts-snapshots/homepage-tablet-768-chromium-linux.png).
- **CAB-D-1440** : [cabinet-desktop-1440.png](assets/screenshots/cabinet-desktop-1440.png) ; capture 1440 px ; blob Git `24c90e5b0831e026f58993d2fcfd22366e9338f6` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/cabinet-visual.spec.ts-snapshots/cabinet-desktop-1440-chromium-linux.png).
- **CAB-M-0390** : [cabinet-mobile-390.png](assets/screenshots/cabinet-mobile-390.png) ; capture 390 px ; blob Git `3940c0b72d16411105d9f27ba093c3ad4c37a0b4` ; [source](https://github.com/tawounfouet/mapiap-web/blob/c0bcaf9eb31dd4c8313677597e063c4cabb32a58/tests/e2e/cabinet-visual.spec.ts-snapshots/cabinet-mobile-390-chromium-linux.png).

Les images sont copiees par reutilisation des blobs Git existants, sans nouvelle generation ni retouche. Le hash du blob source est le meme que celui inscrit dans le nouvel arbre Git de cette PR documentaire.

## 2. Captures manquantes

- **Expertises index 1440 et 390 :** NOT_CAPTURED.
- **Detail Comptabilite 1440 :** NOT_CAPTURED.
- **Detail Consolidation 1440 :** NOT_CAPTURED.
- **Detail Fiscalite / juridique / social 1440 :** NOT_CAPTURED.
- **Detail Audit / evaluation / conseil 1440 :** NOT_CAPTURED.

Capturer ces pages seulement depuis une preview du candidat #39 ou une construction locale propre de ce meme commit, en mentionnant la nouvelle revision et en conservant l'URL. Voir le protocole dans la revue visuelle.

## 3. Limitations de preuve

- Les screenshots prouvent l'existence d'un rendu et leur conformite au snapshot Playwright, pas une recette client.
- Le portrait dans les vues Cabinet est le placeholder `YT` ; il ne constitue pas une preuve d'integration du portrait approuve.
- La presence de titres professionnels dans une capture ne confirme pas leur statut juridique.
- Les screenshots Expertises ne sont pas disponibles au moment de la creation de ce dossier.
- Le rendu futur apres modifications doit etre compare et les images re-generees pour un nouveau SHA si pertinent.
