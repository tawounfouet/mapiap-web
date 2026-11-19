# REM-03 - Consolidation des PR visuelles #19 et #20

**Date de consolidation : 19/11/2026**  
**Statut : DRAFT / CI À QUALIFIER / NO-GO publication**  
**Issue : [REM-03 #24](https://github.com/tawounfouet/mapiap-web/issues/24)**

## 1. Références Git exactes

| Référence | Commit | Rôle |
|---|---|---|
| `main` après G0 | `8f982e5ad96902963be17381f31d24f83175bb9d` | Base protégée, CI et registres préservés |
| PR [#19](https://github.com/tawounfouet/mapiap-web/pull/19) | `6f43366eab11ababeb6c6d925141c8ba283ec938` | Refonte visuelle Accueil, LOT-17 |
| PR [#20](https://github.com/tawounfouet/mapiap-web/pull/20) | `3cf0655188c3df7b34695564558057cb9c76a1f9` | Refonte visuelle Cabinet, LOT-18, empilée sur #19 |
| Ancien `main` | `e6091f9c73efbd41c4201f2fab8912f4078ab829` | Ancêtre commun des PR historiques |
| Consolidation de travail | `ae3cc5b571877dc0d4eac87e6fbcbc063d49d4fb` | Portage des différences des PR, sans force-push |

La PR #19 n'est plus fusionnable directement sur `main` après les fusions G0. La PR #20 reste tributaire de #19. **Ne pas fusionner les deux anciennes PR en force et ne pas les fermer avant qualification du remplaçant.**

## 2. Méthode de portage

- Une branche dédiée a été créée à partir du `main` protégé.
- Le delta complet entre l'ancien `main` et le commit final de #20 a été reconstruit : **52 fichiers modifiés au total** (31 ajouts, 20 modifications, 1 suppression), comprenant tous les médias et snapshots.
- Les objets Git originaux de #20 sont réutilisés à SHA identique pour les chemins modifiés, sans décodage ou compression des images.
- Le fichier monolithique `src/components/sections/homepage-showcase.tsx` a été supprimé sur la branche de travail, remplacé par les sections `src/components/sections/home/`.
- Les registres `docs/audit/`, la CI sécurisée, le script `gh` et les correctifs REM-01 restent ceux du `main` courant pour tout fichier non modifié par le portage.
- Le portage est **isolé** : aucune fusion sur `main`, aucune action DNS, aucune publication métier autorisée par ce document.

## 3. Travail visuel conservé

### Accueil (#19)

- Sections réutilisables, contenus `src/content/home.ts`, typographie et tokens de marque.
- Images locales pour hero, cabinet, expertises et call-to-action.
- Navigation avec état actif, accès mobile et tests responsive.
- Tests E2E et captures de référence visuelle à requalifier sur la nouvelle branche.

### Cabinet (#20)

- Hero et introduction éditorialisés ; blocs « Expertise. Innovation. Performance. ».
- Direction avec traitement provisoire du portrait ; CTA de contact.
- Tests Cabinet responsive et snapshots de référence.

## 4. Blocages connus avant une publication ou fusion finale

1. **REM-04 / [#25](https://github.com/tawounfouet/mapiap-web/issues/25)** : l'accueil indique encore trois expertises génériques, alors qu'Yves en demande quatre. Les cartes de la PR sont des éléments de mise en page, pas une taxonomie validée.
2. **REM-05 / [#26](https://github.com/tawounfouet/mapiap-web/issues/26)** : les contenus `homeContent.newsSection` présentent des titres et dates d'articles fictifs en 2024. Ils ne doivent pas être publiés.
3. **REM-06 / [#27](https://github.com/tawounfouet/mapiap-web/issues/27)** : la présentation du fondateur comporte toujours un portrait provisoire et des mentions `À valider`.
4. **RC-003 / RC-010** : textes définitifs Accueil et palette officielle à faire approuver par Yves.
5. **Tests** : nouvelle CI `qualify` sur SHA de consolidation à obtenir et analyser ; vérifier les snapshots Linux Chromium, le responsive et les parcours sur Firefox/WebKit.
6. **SEO / release** : l'état NO-GO du site officiel demeure tant que les conditions `RC-*` restent ouvertes.

**Choix de séquencement** : conserver cette branche de consolidation en DRAFT. Avant sa fusion dans `main`, corriger les contenus factices et les incohérences métier via REM-04, REM-05 et, autant que possible, REM-06, dans des PR de suivi ou dans une branche candidate intégrée. Le rendu visuel devra être revalidé après chaque modification substantielle.

## 5. Critères d'acceptation REM-03

- [ ] Vérifier le diff de la consolidation : uniquement les modifications #19/#20 et cette note.
- [ ] Vérifier `pnpm format:check`, lint, typecheck, unit, build, suite Playwright et snapshots au SHA final.
- [ ] Vérifier navigation et sections des pages Accueil et Cabinet sur une prévisualisation protégée.
- [ ] Conserver les preuves des choix visuels et les demandes de validation Yves, sans confondre modèle provisoire et contenu final.
- [ ] Corriger les conflits et écarts révélés par la CI et documenter leurs causes.
- [ ] Décider de l'ordre d'intégration avec REM-04, REM-05, REM-06 ; conserver les PR #19/#20 comme références historiques.

**Ce document n'autorise pas une fusion immédiate ni la levée du NO-GO de production.**
