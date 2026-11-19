# REM-01 - Diagnostic des échecs E2E de main

**État de cette note** : analyse de cause racine du défaut d'assertions, enquête ouverte sur l'erreur interne Next.js. Aucun test du nouveau SHA n'est présumé réussi tant que le workflow GitHub n'a pas été exécuté.

## Source de vérité

- Ancienne CI : [run 40211496676](https://github.com/tawounfouet/mapiap-web/actions/runs/40211496676), SHA `e6091f9c73efbd41c4201f2fab8912f4078ab829`.
- Résultat : 69 tests Playwright réussis sur 75, 6 échecs (deux scénarios sur Chromium, Firefox et WebKit).
- Les échecs concernent `tests/e2e/home.spec.ts` et `tests/e2e/home-responsive.spec.ts`.

## Cause racine confirmée

`src/app/(website)/page.tsx` rend `HomepageShowcase`, qui affiche :

- H1 : « Transformer vos ambitions en résultats durables » ;
- H2 métier : « Trois domaines d’expertise pour créer de la valeur durable » ;
- H2 cabinet : « Un partenaire engagé à vos côtés ».

Les deux tests attendaient l'ancien H1 « Expertise. Innovation. Performance. ». Le test desktop attendait en plus un ancien H2 « Trois expertises à structurer » et une section fondateur « Yves TCHAMO » sur la homepage. Cette dernière se trouve dans la page `/cabinet`, non sur l'accueil rendu de `main`.

**Correctif** : mettre les tests en concordance avec les composants actuellement rendus et conserver les tests sémantiques sur le parcours Cabinet, le CTA, le menu mobile et les débordements.

**À ne pas confondre** : ces assertions décrivent un état de référence **provisoire**, qui devra être réaligné sur les quatre expertises validées après la PR #19 et REM-04. Le correctif REM-01 ne constitue **pas** une validation métier de la homepage.

## `Internal: NoFallbackError` - diagnostic séparé

Le log de la CI du 25/10/2026 affiche trois occurrences de `[WebServer] Error: Internal: NoFallbackError`. Le dépôt possède une page dynamique `/expertises/[slug]` avec `dynamicParams = false` et un test qui demande le slug inconnu `/expertises/expertise-inconnue`, en attendant HTTP 404.

**Hypothèse à vérifier** : Next.js 16 peut émettre cette erreur interne dans les logs lors d'un 404 pour des paramètres non répertoriés avec `dynamicParams = false`. L'anomalie a été décrite dans [vercel/next.js#90537](https://github.com/vercel/next.js/issues/90537). La simple présence de ces éléments ne prouve pas que chaque ligne observée provient de ce cas précis.

### Procédure de qualification

1. Examiner la nouvelle CI de la PR REM-01 et conserver le SHA et le lien du run.
2. Vérifier les tests du slug inconnu sur Chromium, Firefox et WebKit ; statut 404, et vérifier qu'aucun 500 n'apparaît.
3. Compter les occurrences de `NoFallbackError` et, si possibles, les corréler par timestamp aux requêtes non reconnues.
4. Si l'erreur persiste, ouvrir/relier un suivi ciblé, enregistrer risque opérationnel et décision ; ne pas masquer `console.error` ni désactiver la route 404 pour obtenir une CI verte.
5. Ne déclarer REM-01 terminé qu'après résultat CI du candidat et décision explicite sur cette anomalie.

## Traçabilité

- Issue : [REM-01 #22](https://github.com/tawounfouet/mapiap-web/issues/22)
- PR de correction : à renseigner après création
- CI de la PR : à renseigner après exécution
- Décision : **PENDING VERIFICATION**
