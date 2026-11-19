# R1 - Plan de recette client MAPIAP Audit & Conseils

**Reference :** R1_MAPIAP_CLIENT_ACCEPTANCE_TEST_PLAN, version initiale 19/11/2026.
**Version technique examinee :** [PR #39](https://github.com/tawounfouet/mapiap-web/pull/39), commit `c0bcaf9eb31dd4c8313677597e063c4cabb32a58`, [CI reussie](https://github.com/tawounfouet/mapiap-web/actions/runs/44622294955).
**Statut :** PREPARATION - aucune seance de recette n'a encore eu lieu.

## 1. Finalite et principes

La recette permet a Yves TCHAMO de confirmer la fidelite du site a l'identite et aux prestations de MAPIAP, de declarer ses reserves et de valider une version identifiee. La qualification CI atteste du fonctionnement automatise de la candidate, pas de l'exactitude commerciale ou reglementaire des textes.

**Decisions distinctes :** GO technique (constate sur le SHA ci-dessus), GO de recette client (NON PRONONCE), GO de publication (NO-GO, sujet de REM-12). Toute modification apres la recette exige d'indiquer le nouveau SHA et de requalifier les cas touches.

## 2. Participants et responsabilites

- **Yves TCHAMO, representant MAPIAP :** valider les formulations, les offres, l'identite, les usages du portrait, les coordonnees et la decision finale de recette.
- **WebTech Solutions, realisation technique :** animer la seance, ouvrir l'environnement protege, preparer les preuves, effectuer les tests, documenter les reserves et corriger les anomalies.
- **Relecture reglementaire selon les besoins :** controler les habilitations professionnelles, l'etendue des interventions fiscales/juridiques/sociales, les mentions legales et la politique de confidentialite. Ne pas assimiler cette relecture a une preuve si elle n'a pas ete effectuee.

## 3. Environnement et prerequis

- **Depot :** https://github.com/tawounfouet/mapiap-web.
- **PR candidate :** https://github.com/tawounfouet/mapiap-web/pull/39 (draft).
- **Code SHA :** `c0bcaf9eb31dd4c8313677597e063c4cabb32a58`.
- **URL de preview protege :** A RENSEIGNER et tester avec l'acces d'Yves. Ne pas employer la production comme site de recette par defaut.
- **CI :** https://github.com/tawounfouet/mapiap-web/actions/runs/44622294955, conclusion success.
- **Navigateurs :** Chrome/Chromium desktop et mobile pour presentation, controles fonctionnels croises Firefox/WebKit fournis par la CI ; tester aussi sur un vrai smartphone lors de la seance si possible.
- **Jeu de donnees :** aucun client reel, aucun message de contact reel, contenu public de travail, et quatre poles provenant du document client du 08/11/2026.
- **Preuves visuelles existantes :** sept captures Accueil et deux Cabinet. Captures de /expertises et des quatre pages detail a produire, pas encore dans ce dossier.

### Conditions d'ouverture de seance

- [ ] URL de preview protege et accessible par Yves sans partager de credentials dans le compte rendu.
- [ ] Capture des pages /expertises et des quatre details, avec date, URL, SHA et viewport.
- [ ] Copie figée des textes proposes et des questions de validation, envoyee a Yves au prealable.
- [ ] Test de formulaire sur destination de recette, ou scenario marque BLOCKED avec raison explicite.
- [ ] Verification des liens et de la version affichee avec le SHA candidat.
- [ ] Registre UAT et PV ouverts avec statuts a examiner, sans cases cochees fictivement.

## 4. Matrice UAT et acceptation

Chaque cas ci-dessous est developpe avec etapes et preuves dans [la matrice CSV](R1_MAPIAP_UAT_MATRIX.csv). Aucun n'a ete execute ou approuve dans la presente phase de preparation.

- **UAT-01 - Accueil - positionnement et hiérarchie :** Message compréhensible, exact et explicitement accepté ; pilote : Yves TCHAMO ; reference : RC-003.
- **UAT-02 - Navigation et parcours :** Liens et libellés compréhensibles ; aucune impasse ; navigation clavier possible ; pilote : Yves + WebTech ; reference : RC-003.
- **UAT-03 - Quatre pôles sur l'Accueil et l'index :** Titres identiques à la source du client, ordre approuvé, aucun intitulé inventé ; pilote : Yves TCHAMO ; reference : RC-005;RC-008.
- **UAT-04A - Comptabilité et accompagnement des TPE/PME :** Périmètre, formulations et exclusions approuvés ; pilote : Yves TCHAMO ; reference : RC-005.
- **UAT-04B - Consolidation des comptes de groupe :** Normes et engagements exacts, pas de revendication non prouvée ; pilote : Yves TCHAMO ; reference : RC-005.
- **UAT-04C - Fiscalité, juridique et social :** Portée de chaque mission confirmée, vérifications réglementaires réalisées ; pilote : Yves TCHAMO ; reference : RC-005;RC-012.
- **UAT-04D - Audit, évaluation et conseil financier :** Distinction entre missions et titres réglementés vérifiée ; pilote : Yves TCHAMO ; reference : RC-005;RC-012.
- **UAT-05 - Cabinet - présentation institutionnelle :** Texte fidèle à la présentation transmise, pas de promesse imprécise ; pilote : Yves TCHAMO ; reference : RC-004.
- **UAT-06 - Direction - biographie et titres :** Biographie approuvée et affirmations professionnelles vérifiées ; pilote : Yves TCHAMO ; reference : RC-004;RC-012.
- **UAT-07 - Portrait du fondateur :** Droit d'usage du portrait confirmé et photo effectivement intégrée et acceptée ; pilote : Yves TCHAMO ; reference : RC-011.
- **UAT-08 - Identité visuelle et responsive :** Identité approuvée, lisibilité correcte, aucun débordement significatif ; pilote : Yves + WebTech ; reference : RC-010;RC-011.
- **UAT-09 - Rubrique Actualités sans article :** Choix explicite du client sur l'état éditorial du MVP ; pilote : Yves TCHAMO ; reference : RC-006;RC-009.
- **UAT-10 - Contact et remise des demandes :** Une demande de test est réellement reçue ; aucune erreur présentée comme succès ; pilote : Yves + WebTech ; reference : RC-002;RC-007.
- **UAT-11 - Navigation mobile et accessibilité :** Aucun blocage des actions importantes, pas de défaut bloquant mobile ; pilote : WebTech + Yves ; reference : RC-003;RC-010.
- **UAT-12 - Mentions légales et confidentialité :** Aucune information supposée ou incomplète ; conformité revue et approuvée ; pilote : Yves + WebTech ; reference : RC-012;RC-013.

## 5. Protocole de realisation

1. Pour chaque UAT, noter l'URL, le SHA, la date, le navigateur et le viewport.
2. L'animateur lit les etapes et recueille l'observation libre d'Yves.
3. Marquer PASS uniquement apres preuve et acceptation explicite ; FAIL si anomalie verifiee ; BLOCKED si donnees/autorisation manquantes ; NOT_RUN si non execute.
4. Pour une reserve, saisir gravite (bloquant, majeur, mineur), resultat observe, attendu, reference image, responsable et date cible si convenue.
5. Ouvrir une Issue GitHub pour les correctifs techniques ; garder les pieces personnelles et justifications reglementaires dans un stockage prive.
6. Relier chaque correction au commit, CI et nouveau cas de retest.

## 6. Agenda recommande, 60 minutes

- 00-10 min : contexte, version candidate, reserves connues.
- 10-25 min : Accueil, navigation, identite et quatre poles.
- 25-40 min : Cabinet, profil d'Yves et quatre fiches expertises.
- 40-50 min : Actualites, contact, pages legales et responsive.
- 50-60 min : arbitrages, enregistrement des decisions, dates de correction et PV.

## 7. Regles de decision

- **ACCEPTE :** tous les UAT bloquants PASS, elements editoriaux et reglementaires approuves et aucune reserve bloquante.
- **ACCEPTE SOUS RESERVES :** seulement des points mineurs explicitement toleres, avec responsable et plan convenu ; ne signifie pas autorisation de publication.
- **REFUSE / A REPRENDRE :** contenu critique faux, titres non justifies, processus de contact non fiable ou autre anomalie bloquante.
- **NON PRONONCE :** aucune decision explicite du client. Valeur initiale obligatoire.

Les gates de publication RC-001 a RC-013 sont controles separement dans `release/production-inputs.json`, REM-07/08/10/12 ; une validation client ne ferme pas les dependances techniques ou legales.

## 8. Sorties attendues

- Matrice de cas mise a jour et preuves visuelles.
- Registre des decisions avec consentement editorial, reserves et citations de versions.
- Liste d'Issues/PR de remediations eventuelles.
- PV date et decision explicite d'Yves, avec lien prive si document signe.
