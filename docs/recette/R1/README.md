# MAPIAP - Dossier de recette client R1

**Statut :** KIT PREPARE / NON ENCORE SOUMIS AU CLIENT / AUCUNE APPROBATION ENREGISTREE.
**Date de preparation :** 19/11/2026.
**Version candidate :** PR [#39](https://github.com/tawounfouet/mapiap-web/pull/39), commit `c0bcaf9eb31dd4c8313677597e063c4cabb32a58`.
**Preuve technique :** [CI 44622294955](https://github.com/tawounfouet/mapiap-web/actions/runs/44622294955), conclusion `success`, 63 tests unitaires et 120 E2E.
**Attention :** les captures de ce dossier viennent de la PR #39, pas du site actuellement present sur la branche main.

## Les quatre livrables de reference

- [Plan de recette](R1_MAPIAP_CLIENT_ACCEPTANCE_TEST_PLAN.md) : perimetre, scenarios, roles, criteres, methode et gates.
- [Revue visuelle](R1_MAPIAP_CLIENT_VISUAL_REVIEW.md) : neuf captures reelles, decisions a demander et trous de preuves.
- [Registre des validations](R1_MAPIAP_CLIENT_VALIDATION_REGISTER.md) : 15 decisions ouvertes, champs a documenter et liens RC.
- [Proces-verbal de recette](R1_MAPIAP_CLIENT_ACCEPTANCE_REPORT.md) : modele de PV a renseigner apres la reunion, non signe.

## Pieces operatoires

- [Matrice UAT CSV](R1_MAPIAP_UAT_MATRIX.csv) : 15 cas de recette, tous initialises a NOT_RUN.
- [Manifeste de preuves](R1_MAPIAP_EVIDENCE_MANIFEST.md) : provenance des neuf PNG et vues non encore couvertes.
- [Captures reelles Accueil / Cabinet](assets/screenshots/) : copies exactes des baselines Playwright du commit candidat, sans retouche.

## Limites explicites

- Neuf captures produites : 7 Accueil et 2 Cabinet, en Chromium Linux, full page.
- Aucune capture Expertises ni des quatre fiches de detail n'est inventee. Ces vues sont marquees **A PRODUIRE** et devront etre jointes apres nouvelle capture du candidat #39.
- Aucune URL de preview client accessible n'est encore renseignee. La protection SSO doit etre configuree pour Yves et testee.
- La figure du fondateur comporte encore un placeholder `YT`. Autorisation du portrait et titres professionnels a verifier.
- `release/production-inputs.json` sur la PR #39 conserve une formulation obsolete sur trois expertises dans RC-005. Corriger cette description dans REM-12 avant release ; ne pas la considerer comme une validation des quatre poles.
- Toutes les demandes d'accord attendent une preuve explicite d'Yves. Une capture ou une CI verte n'est pas une approbation.

## Circuit documentaire

1. WebTech renseigne la preview protegee, controle toutes les routes et joint les captures Expertises reelles.
2. WebTech partage le dossier et les textes exacts a Yves avant la seance.
3. Les cas UAT sont joues, les commentaires sont consignés dans le registre, avec date, version et preuve.
4. WebTech corrige les anomalies dans des Issues et PR avec tests sur nouveau SHA.
5. Yves statue sur le PV : accepte, accepte sous reserves non bloquantes, ou refuse / a reprendre.
6. La recette client ne remplace pas la decision de publication REM-12, qui reste NO-GO tant que les RC bloquants subsistent.

## Confidentialite

Ne pas mettre dans ce dossier public les CV bruts, numeros d'identite, emails prives, secrets GitHub/Vercel, donnees de demandes reelles ni fichiers de preuve des habilitations. Les preuves sensibles sont references par identifiant dans un espace prive a acces limite.
