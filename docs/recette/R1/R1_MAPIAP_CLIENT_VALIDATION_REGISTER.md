# R1 - Registre des decisions client MAPIAP

**Valeur initiale :** NOT_REVIEWED. Aucune approbation reelle n'a encore ete recueillie. Ce registre est un cadre de saisie, pas une attestation.
**Version candidate :** `c0bcaf9eb31dd4c8313677597e063c4cabb32a58` (PR #39) ; changer la version pour toute nouvelle livraison.

## 1. Politique des statuts

- `NOT_REVIEWED` : aucun arbitrage communique.
- `APPROVED` : accord explicite d'Yves sur une version identifiee, avec preuve.
- `CHANGES_REQUESTED` : demande de modification et ticket correctif.
- `BLOCKED` : information, droit, verification ou acces manquant.
- `NOT_APPLICABLE` : hors perimetre, avec justification et accord.

Un test technique PASS n'implique pas `APPROVED`. Il faut aussi enregistrer les confirmations relatives aux prestations et aux titres professionnels.

## 2. Registre initial des decisions

### UAT-01 - Accueil - positionnement et hiérarchie

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-003`.
- **Ce qu'il faut valider :** Message compréhensible, exact et explicitement accepté.
- **Preuve attendue :** captures Accueil 1440 et 390 + accord écrit.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-02 - Navigation et parcours

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves + WebTech.
- **Gates associes :** `RC-003`.
- **Ce qu'il faut valider :** Liens et libellés compréhensibles ; aucune impasse ; navigation clavier possible.
- **Preuve attendue :** compte rendu de parcours et liens vérifiés.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-03 - Quatre pôles sur l'Accueil et l'index

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-005`, `RC-008`.
- **Ce qu'il faut valider :** Titres identiques à la source du client, ordre approuvé, aucun intitulé inventé.
- **Preuve attendue :** écran /expertises à capturer + accord écrit.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-04A - Comptabilité et accompagnement des TPE/PME

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-005`.
- **Ce qu'il faut valider :** Périmètre, formulations et exclusions approuvés.
- **Preuve attendue :** version du texte et commentaires client.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-04B - Consolidation des comptes de groupe

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-005`.
- **Ce qu'il faut valider :** Normes et engagements exacts, pas de revendication non prouvée.
- **Preuve attendue :** version du texte et commentaires client.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-04C - Fiscalité, juridique et social

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-005`, `RC-012`.
- **Ce qu'il faut valider :** Portée de chaque mission confirmée, vérifications réglementaires réalisées.
- **Preuve attendue :** accord écrit + contrôle de conformité.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-04D - Audit, évaluation et conseil financier

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-005`, `RC-012`.
- **Ce qu'il faut valider :** Distinction entre missions et titres réglementés vérifiée.
- **Preuve attendue :** accord écrit + contrôle de conformité.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-05 - Cabinet - présentation institutionnelle

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-004`.
- **Ce qu'il faut valider :** Texte fidèle à la présentation transmise, pas de promesse imprécise.
- **Preuve attendue :** captures Cabinet 1440 et 390 + accord écrit.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-06 - Direction - biographie et titres

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-004`, `RC-012`.
- **Ce qu'il faut valider :** Biographie approuvée et affirmations professionnelles vérifiées.
- **Preuve attendue :** approbation + références justificatives sans documents sensibles dans Git.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-07 - Portrait du fondateur

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-011`.
- **Ce qu'il faut valider :** Droit d'usage du portrait confirmé et photo effectivement intégrée et acceptée.
- **Preuve attendue :** accord d'usage + capture après intégration.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-08 - Identité visuelle et responsive

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves + WebTech.
- **Gates associes :** `RC-010`, `RC-011`.
- **Ce qu'il faut valider :** Identité approuvée, lisibilité correcte, aucun débordement significatif.
- **Preuve attendue :** 9 captures versionnées + compte rendu de revue.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-09 - Rubrique Actualités sans article

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves TCHAMO.
- **Gates associes :** `RC-006`, `RC-009`.
- **Ce qu'il faut valider :** Choix explicite du client sur l'état éditorial du MVP.
- **Preuve attendue :** décision écrite visible/masqué + état choisi.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-10 - Contact et remise des demandes

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves + WebTech.
- **Gates associes :** `RC-002`, `RC-007`.
- **Ce qu'il faut valider :** Une demande de test est réellement reçue ; aucune erreur présentée comme succès.
- **Preuve attendue :** preuve de réception expurgée + validation des coordonnées.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-11 - Navigation mobile et accessibilité

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** WebTech + Yves.
- **Gates associes :** `RC-003`, `RC-010`.
- **Ce qu'il faut valider :** Aucun blocage des actions importantes, pas de défaut bloquant mobile.
- **Preuve attendue :** rapport de recette + traces d'accessibilité.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

### UAT-12 - Mentions légales et confidentialité

- **Decision :** `NOT_REVIEWED`.
- **Responsable de validation :** Yves + WebTech.
- **Gates associes :** `RC-012`, `RC-013`.
- **Ce qu'il faut valider :** Aucune information supposée ou incomplète ; conformité revue et approuvée.
- **Preuve attendue :** approbation et référentiel légal confirmé.
- **Commentaire client :** A renseigner.
- **Date / version du texte / URL preview :** A renseigner.
- **Issue ou action correctrice :** A renseigner si necessaire.

## 3. Decisions transversales bloquees

- **D-REG-01 :** droits d'usage du portrait, source et photographe. Statut : BLOCKED (preuve non archivee dans le dossier).
- **D-REG-02 :** verifications d'habilitation professionnelle et des missions reglementees. Statut : BLOCKED.
- **D-REG-03 :** URL de preview utilisable par Yves. Statut : NOT_REVIEWED.
- **D-REG-04 :** politique de confidentialite et mentions legales. Statut : BLOCKED.
- **D-REG-05 :** destination et preuve de remise du formulaire contact. Statut : BLOCKED.
- **D-REG-06 :** coherence du registre RC-005, dont la description historique mentionne encore trois expertises. Statut : CHANGES_REQUESTED, suivi REM-12.

## 4. Schema de preuve d'une approbation

`Decision ID + texte ou image exact + SHA + date + canal + approbateur autorise + mention d'accord explicite + reference de la preuve + reserve eventuelle`.

Ne pas copier dans GitHub les documents officiels, numeros personnels, donnees de messagerie, identifiants de connexion ou preuves d'identite. Les liens vers les sources privees doivent etre rediges sans jetons ni URLs signees.

## 5. Total initial

- 15 cas UAT a examiner.
- 0 approuve.
- Aucune date de seance ni signature saisie.
- Publication officielle toujours NO-GO.
