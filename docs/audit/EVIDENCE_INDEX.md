# MAPIAP - Index de preuves R0 / REM-00

**Photographie de référence : 19 novembre 2026.** Le contrôle est **statique / API GitHub et Vercel**, pas un nouveau run local ni un audit navigateur autorisé.

## Base de référence

**Entrées vérifiables :**
- **main** : `e6091f9c73efbd41c4201f2fab8912f4078ab829` ; [Branche main](https://github.com/tawounfouet/mapiap-web/tree/main)
- **Dernière CI main** : `40211496676` : `failure`, 69 / 75 E2E réussis ; 6 échecs ; [Workflow](https://github.com/tawounfouet/mapiap-web/actions/runs/40211496676)
- **PR #19** : Base `main`, head `6f43366eab11ababeb6c6d925141c8ba283ec938`, draft ; [PR #19](https://github.com/tawounfouet/mapiap-web/pull/19)
- **PR #20** : Base `feat/homepage-visual-alignment`, head `3cf0655188c3df7b34695564558057cb9c76a1f9`, draft ; [PR #20](https://github.com/tawounfouet/mapiap-web/pull/20)
- **CI PR #19** : `40219412094` : `success` sur son SHA ; [Workflow](https://github.com/tawounfouet/mapiap-web/actions/runs/40219412094)
- **CI PR #20** : `40223717773` : `success` sur son SHA ; [Workflow](https://github.com/tawounfouet/mapiap-web/actions/runs/40223717773)
- **Protection main** : `protected: false` ; rulesets API : liste vide ; protection complète : 403 (droits de lecture) ; [Branches](https://github.com/tawounfouet/mapiap-web/branches)
- **GitHub tickets** : 13 issues de remédiation, #21 à #33 ouvertes ; [Issues](https://github.com/tawounfouet/mapiap-web/issues)
- **Vercel projet** : `mapiap-web`, ID `prj_yzFQ6NSThPicY0xKMNeL6kOLveKo` ; [Projet Vercel](https://vercel.com/thomas-awounfouets-projects/mapiap-web)
- **Vercel deployment** : `dpl_2jGmf84ZYgYrHYtKPZMu32ADJjpV`, `READY`, commit `e6091f9` ; [Déploiement](https://vercel.com/thomas-awounfouets-projects/mapiap-web/2jGmf84ZYgYrHYtKPZMu32ADJjpV)
- **Vercel protection** : SSO activée sur domaines Vercel ; domaine métier absent de la liste du projet consulté ; Métadonnées Vercel

## Diagnostic initial CI (AUD-001)

Le H1 attendu dans `tests/e2e/home.spec.ts` et `tests/e2e/home-responsive.spec.ts` est `Expertise. Innovation. Performance.`. Le rendu actuel de `HomepageShowcase` affiche le H1 `Transformer vos ambitions en résultats durables`. Le premier test attend aussi une ancienne section `Trois expertises à structurer` et une section fondateur `Yves TCHAMO`, absentes de l'accueil effectivement rendu.

Le log du run `40211496676` mentionne par ailleurs `Internal: NoFallbackError` de Next.js, sans association certaine avec les six assertions H1 ratées. Il faut distinguer **la cause certaine des six assertions échouées** de **l'anomalie serveur à qualifier séparément**. Une piste à examiner est le comportement des routes `dynamicParams = false` lors de demandes 404 ; aucune résolution n'est présumée à ce stade.

## Registre de preuves des remédiations

**Entrées vérifiables :**
- **REM-00** : À renseigner ; À renseigner ; À renseigner ; Sans objet pour les registres ; WebTech ; En cours
- **REM-01** : À renseigner ; À renseigner ; À renseigner ; À qualifier ; WebTech ; Non qualifié
- **REM-02 à REM-12** : Voir leurs Issues ; À renseigner ; À renseigner ; Selon le lot ; Selon le lot ; Non évalué

## Discipline des preuves

- Les liens d'exécutions CI historiques restent datés et attachés à leurs SHA d'origine.
- Une CI verte sur une branche ne constitue **pas** une validation de publication.
- Ne pas déclarer `REM-00` clos avant revue de sa PR ; ne pas déclarer `REM-01` clos avant CI du SHA corrigé et qualification de `NoFallbackError`.
- Aucune modification de Vercel, DNS ou des paramètres du dépôt n'est effectuée dans REM-00.
