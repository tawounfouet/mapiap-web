# REM-02 - Gouvernance GitHub et durcissement CI

**État : implémentation partielle.** Les références des actions GitHub sont épinglées dans cette branche, mais une protection de `main` ne peut être déclarée active sans contrôle administratif.

## Référence vérifiée au 19 novembre 2026

- `main` : `protected: false`, source GitHub Branches API.
- `GET /repos/tawounfouet/mapiap-web/rulesets` a renvoyé une liste vide.
- L'API historique de branch protection a renvoyé un statut `403 Resource not accessible by integration`.
- CI existante : workflow `Frontend CI`, job `qualify`, exécutant format, lint, types, unitaires, audit de release, build et tests E2E.

## Changement de code réalisé

Dans `.github/workflows/bootstrap-ci.yml`, références de tâches résolues et épinglées sur leur commit GitHub vérifié :

- `actions/checkout` : `11d5960a326750d5838078e36cf38b85af677262` depuis la ref publique `refs/tags/v4` au 19/11/2026.
- `pnpm/action-setup` : `b906affcce14559ad1aafd4ab0e942779e9f58b1` depuis la ref `refs/tags/v4`, après résolution du tag annoté.
- `actions/setup-node` : `49933ea5288caeca8642d1e84afbd3f7d6820020`, tag `v4.4.0`.
- `persist-credentials: false` est ajouté au checkout pour limiter la persistance des identifiants dans les fichiers Git du runner.
- `permissions: contents: read` est conservé et les tests ne sont pas assouplis.

**À vérifier** : le nouveau SHA avec ces versions exactes passe tous les contrôles en CI.

## Mesures administratives encore à exécuter dans GitHub

À effectuer par un propriétaire ou administrateur disposant de l'interface GitHub `Settings > Rules > Rulesets` ou des règles de protection de branche :

1. Définir une règle ciblant `main`, avec passage obligatoire par pull request.
2. Exiger le check `qualify` du workflow `Frontend CI` sur la tête de PR. Ajouter d'autres contrôles seulement s'ils existent réellement, en évitant les noms de jobs imaginés.
3. Exiger la résolution des conversations avant merge, interdire force-push et suppression de `main`.
4. Définir des revues indépendantes lorsque le dépôt dispose de relecteurs habilités. Le seul auteur/mainteneur ne peut pas valider de manière indépendante sa propre PR ; ne pas activer un verrou impossible à satisfaire.
5. Pour les zones `.github/workflows/`, `release/`, `scripts/`, `src/app/api/` et `src/features/contact/server/`, définir une procédure de revue approfondie et l'équipe habilitée avant d'exiger un CODEOWNERS bloquant.
6. Vérifier effectivement, par l'API ou l'interface d'administration, que les règles sont actives et qu'une PR avec checks manquants ne peut pas être fusionnée.
7. Vérifier que les jobs de contributions non approuvées ne peuvent pas accéder à des secrets de production.

## Critères de clôture REM-02

- [ ] Nouvelle CI verte avec les actions épinglées.
- [ ] Règle réelle protégeant `main` activée et preuve non sensible enregistrée.
- [ ] Test contrôlé de refus de merge sans checks, ou limitation formellement documentée.
- [ ] Gouvernance de revue des changements sensibles acceptée.
- [ ] Risques résiduels et éventuels reports consignés dans le registre AUD.

**Décision actuelle : BLOCKED_ADMIN pour la protection de branche**, et non PASS. Aucune fusion ni modification de paramètres administratifs n'est présumée.
