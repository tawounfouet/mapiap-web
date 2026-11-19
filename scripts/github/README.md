# MAPIAP - Protection de `main` avec `gh`

Ce script reprend l'approche de gouvernance deja utilisee dans PyAccountingKit, PyAuthKit et PyNetworkKit : simulation par defaut, creation explicite, verification aupres de GitHub.

## Prerequis

- GitHub CLI (`gh`) et `jq` installes.
- Compte connecte ayant les droits `Administration: write` sur `tawounfouet/mapiap-web`.
- Script execute depuis une copie locale du depot, sans jeton dans le code.

## Commandes

```bash
gh auth login
gh auth status
bash scripts/github/configure_main_ruleset.sh --plan
bash scripts/github/configure_main_ruleset.sh --apply
bash scripts/github/configure_main_ruleset.sh --verify
```

Pour lancer les tests du contrat API sans acces reseau :

```bash
bash tests/scripts/test_configure_main_ruleset.sh
```

## Politique de gouvernance

- Obligation de passer par une pull request pour modifier `main`.
- Check `qualify` exige, avec strategie stricte et `integration_id: 15368` (GitHub Actions).
- Zero approbation obligatoire pour un mainteneur unique, avec resolution des discussions de revue.
- Force-push et suppression de `main` interdits.
- Aucun acteur disposant d'une exception.

## Garanties et limites

- `--plan` et `--verify` lisent la configuration sans la modifier.
- `--apply` cree une nouvelle regle, puis relit la configuration effective.
- Si un ruleset existe, le script ne l'ecrase pas : il valide sa conformite ou echoue.
- Si une autre protection est deja en place, l'application est refusee pour eviter les chevauchements.
- Le script controle l'identite du depot, le SHA actuel de `main` et la presence d'une CI reussie.
- Les tests locaux utilisent une fausse CLI GitHub : ils ne prouvent pas l'activation reelle.
- La protection de `main` ne remplace pas les criteres de publication MAPIAP (`RC-001` a `RC-013`).

## References

- [Issue REM-02 #23](https://github.com/tawounfouet/mapiap-web/issues/23)
- [Documentation GitHub des rulesets](https://docs.github.com/en/rest/repos/rules)
- [Documentation de `gh api`](https://cli.github.com/manual/gh_api)
- `tawounfouet/pyaccountingkit`: `scripts/configure_solo_maintainer_ruleset.sh`
- `tawounfouet/pyauthkit`: `scripts/gh_configure_m0_governance.sh`
