# REM-05 - Publications fictives retirées du site MAPIAP

**Statut : implémenté dans la PR #39, choix éditorial à faire valider par Yves.**

## Source du choix de travail

Lors des échanges du 8 novembre 2026, aucun article définitivement approuvé n'était transmis pour publication. Les articles datés de 2024 sur l'accueil et les deux publications intitulées `Article 01` et `Article 02` étaient des données de démonstration.

## Implémentation

- Le catalogue local des articles publics est désormais vide : `src/content/actualites.ts`.
- La page Actualités présente un état vide honnête, sans lien mort ni article inventé.
- L'accueil n'affiche plus de titres, dates ou cartes d'articles fictifs.
- La fixture `article-brouillon-a-valider` reste isolée au chemin de prévisualisation, jamais dans les listings publics.
- Les articles publiés par un éventuel CMS restent gérés par `CmsArticleRepository`, avec leur contrat propre, et ne sont pas considérés comme validés automatiquement.
- Les tests unitaires et E2E ont été adaptés aux nouveaux comportements.

## Choix client restant

- [ ] Yves confirme le maintien d'un espace éditorial visible mais vide dans le MVP, ou demande de masquer l'entrée Actualités.
- [ ] Un futur article dispose d'un contenu validé, d'une URL stable et d'une date sourcée avant sa publication.
- [ ] Le référencement et le sitemap sont vérifiés dans l'environnement de recette.
- [ ] Les snapshots visuels sont actualisés et approuvés.
- [ ] RC-006 et, si nécessaire, RC-009 sont décidés explicitement.

Issue : https://github.com/tawounfouet/mapiap-web/issues/26
