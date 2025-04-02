# 📓 Convention de Commit

Ce projet suit la convention **Conventional Commits**, rédigée à la main (sans dépendances externes), pour garder des messages de commit clairs, lisibles et cohérents.

---

## ✅ Format d’un message de commit

``<type>(scope?): <message court>``


- **`type`** : type de changement (voir tableau ci-dessous)
- **`scope`** *(optionnel)* : la partie du projet concernée (`auth`, `form`, `dashboard`, etc.)
- **`message`** : une phrase concise à l’infinitif et au présent

---

## 🧠 Types de commits et exemples

| Type        | Description                                                                 | Exemple |
|-------------|-----------------------------------------------------------------------------|---------|
| `feat`      | ✨ Nouvelle fonctionnalité                                                   | `feat: ajout de la page projets` |
| `fix`       | 🐛 Correction de bug                                                        | `fix: corrige le scroll sur mobile` |
| `docs`      | 📚 Modification de documentation uniquement                                 | `docs: mise à jour du README` |
| `style`     | 🎨 Modifications visuelles (indentation, formatage, pas de code métier)     | `style: formatage auto avec Prettier` |
| `refactor`  | 🔧 Refonte du code sans ajout de feature ni correction                      | `refactor: simplifie la logique du header` |
| `perf`      | ⚡️ Amélioration des performances                                            | `perf: améliore le lazy loading des images` |
| `test`      | ✅ Ajout ou modification de tests                                            | `test: ajoute un test unitaire pour le composant Login` |
| `build`     | 🛠️ Changements liés à la compilation, déploiement ou config                 | `build: configuration de Vercel` |
| `ci`        | 🤖 Modifications liées à l'intégration continue                              | `ci: ajout du workflow GitHub Actions` |
| `chore`     | 🔧 Autres tâches (MAJ dépendances, nettoyage, renommage de fichiers, etc.)  | `chore: suppression des fichiers inutiles` |
| `revert`    | ↩️ Annule un commit précédent                                                | `revert: annule le fix du formulaire` |

---

## 💥 Cas particulier : `BREAKING CHANGE`

Si un commit casse une fonctionnalité ou change une API, ajoute une section spéciale :

