# REM-04 - Quatre pôles MAPIAP et source métier

**Statut : implémenté sur la PR #39, en attente de validation client et de recette.**

## Source

Document `Remarques sur projet de site MAC.docx`, transmis par Yves TCHAMO le 8 novembre 2026.

Les quatre intitulés métier sont conservés exactement :

1. Comptabilité et accompagnement des TPE/PME
2. Consolidation des comptes de groupe (normes françaises et IFRS)
3. Fiscalité, juridique et social
4. Audit, évaluation et conseil financier

Les descriptions de `src/content/expertises.ts` reprennent et synthétisent les textes clients. Les informations décrivant des prestations réglementées sont à vérifier avant publication.

## Contrats vérifiables

- Une seule liste `expertises` sert à l'accueil, à l'index, aux détails et au sitemap.
- Les quatre routes ont des slugs explicites et distincts.
- Les slugs fictifs `expertise-01/02/03-a-valider` ne constituent plus des pages valides.
- Les cartes de la page d'accueil prennent leurs titres, résumés et URLs dans la liste canonique.
- Les images restent des visuels éditoriaux de travail, distincts de la validation des prestations.

## Conditions de clôture

- [ ] CI et tests des quatre pages de détail sur le SHA final.
- [ ] Contrôle responsive 320, 390, 768, 1024 et 1440 pixels.
- [ ] Validation écrite d'Yves sur les textes et les périmètres de mission.
- [ ] Validation réglementaire des activités relevant de professions encadrées.
- [ ] Validation des visuels et captures de référence.
- [ ] Clôture RC-005 documentée avec version exacte et preuve.

Issue : https://github.com/tawounfouet/mapiap-web/issues/25
