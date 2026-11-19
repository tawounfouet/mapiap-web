# MAPIAP - Registre des validations et dépendances de publication

**Baseline 19/11/2026**. Ce registre ne substitue pas `release/production-inputs.json`. Les documents fournis par Yves sont des sources de travail ; ils ne constituent pas automatiquement une approbation des textes ou titres publiés.

**Entrées vérifiables :**
- **RC-001** : Domaine officiel ; WEBTECH / MAPIAP ; REM-10 ; [#31](https://github.com/tawounfouet/mapiap-web/issues/31) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-002** : Transport du formulaire ; MAPIAP + WebTech ; REM-07 ; [#28](https://github.com/tawounfouet/mapiap-web/issues/28) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-003** : Textes définitifs Accueil ; Yves ; REM-03/04/05/06 ; [#24](https://github.com/tawounfouet/mapiap-web/issues/24) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-004** : Textes définitifs Cabinet ; Yves ; REM-06 ; [#27](https://github.com/tawounfouet/mapiap-web/issues/27) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-005** : Quatre expertises validées ; Yves ; REM-04 ; [#25](https://github.com/tawounfouet/mapiap-web/issues/25) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-006** : Articles réels ou état vide approuvé ; Yves ; REM-05 ; [#26](https://github.com/tawounfouet/mapiap-web/issues/26) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-007** : Coordonnées publiques et contact ; Yves ; REM-07/08 ; [#28](https://github.com/tawounfouet/mapiap-web/issues/28) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-008** : Slugs d'expertise ; WebTech + Yves ; REM-04/10 ; [#25](https://github.com/tawounfouet/mapiap-web/issues/25) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-009** : Slugs des articles ; WebTech + Yves ; REM-05/10 ; [#26](https://github.com/tawounfouet/mapiap-web/issues/26) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-010** : Valeurs couleur officielles ; Yves ; REM-06 ; [#27](https://github.com/tawounfouet/mapiap-web/issues/27) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-011** : Portrait approuvé et intégré ; Yves + WebTech ; REM-06 ; [#27](https://github.com/tawounfouet/mapiap-web/issues/27) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-012** : Mentions légales et réglementaires ; Yves + WebTech ; REM-08 ; [#29](https://github.com/tawounfouet/mapiap-web/issues/29) ; NON VALIDÉ / À REQUALIFIER ; À renseigner
- **RC-013** : Politique de confidentialité ; Yves + WebTech ; REM-08 ; [#29](https://github.com/tawounfouet/mapiap-web/issues/29) ; NON VALIDÉ / À REQUALIFIER ; À renseigner

## Gates conditionnels

- `RC-CMS-001/002/003` : applicables uniquement à `CONTENT_SOURCE=cms` (endpoint, secret de preview, revalidation).
- `RC-ANALYTICS-001` : applicable uniquement à `ANALYTICS_MODE=consent` (transport vérifié et conformité du consentement).
- Les modes inactifs ne doivent pas créer de blocage artificiel, mais leur état sur l'environnement de publication doit être vérifié.

## Sources et décisions Yves

- Remarques du 08/11/2026 : quatre pôles métier, présentation et retours sur le site ; demander validation exacte des textes finaux.
- CV Word/PDF, portrait reçus le 25/10/2026 : droit d'usage du portrait et titres professionnels à confirmer avant affichage.
- Actualités : aucun article définitif validé au 19/11/2026 ; faire choisir un état vide, masqué ou du contenu approuvé.
- Mentions réglementées : ne pas présumer une habilitation de commissaire aux comptes sur seule base de signature.

## Format d'une validation

`RC-ID` + version exacte du contenu/paramètre + environnement + date + décision explicite de Yves / responsable compétent + lien de preuve non sensible + SHA de référence.
