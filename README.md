# Dougs Test

Ce projet a été généré avec [Nx](https://nx.dev).
Il est décomposé en 3 sous projets:
- dougs-mouvements-validation-server: Le serveur NodeJS/Express à l'adresse http://localhost:3333
- dougs-mouvements-validation-app: L'application Angular à l'adresse http://localhost:4200
- dougs-mouvements-validation-lib: Librairie partagée entre les deux applications content les modèles

Le serveur NodeJS et l'application Angular ont été entièrement testés.

J'ai décidé de ne pas me contenter de faire un serveur avec une API mais aussi de faire une application Front Angular
pour avoir un environnement de test et de visualisation des inputs/outputs.  
C'est ce qui explique l'utilisation de NX qui est un outil permettant une gestion simplifiée des "mono repo".
Il permet notament une gestion ultra simple des librairies partagées.

Dans l'application Angular, j'ai intégré des cas d'utilisations déjà préparés: inputs minimum, inputs valides et inputs erronés.  
Chacun de ces inputs peut être affiché au click d'un bouton et
chacune de ces requêtes peut être testée et sa réponse visualisée sous une forme plus ergonomique.

J'ai aussi laissé un cas d'utilisation personnalisé où 
il est possible d'importer ses propres paramètres dans une variable directement dans les sources 
(apps/dougs-mouvements-validation-app/src/app.component.ts -> customBody).  
Si aucun paramètre n'a été importé, ces informations sont rappelées.  
Ces paramètres importés sont visualisables et testable de la même manière.  


## Installation

### Pré-requis
NodeJS version >= "12.0.0" (nécessaire pour le lancement des tests uniquement)

### Commandes
- `npm install` ou `yarn` pour installer les dépendances nécessaires
- `npm run start-all` ou `yarn start-all` pour lancer le server et l'application angular simultanément
- `npm run test-all` ou `yarn test-all` pour lancer le testing complet des deux applications
- `npm run nx serve [PROEJCT_NAME]` ou `yarn nx serve [PROEJCT_NAME]` pour lancer une application uniquement
- `npm run nx test [PROEJCT_NAME]` ou `yarn nx test [PROEJCT_NAME]` pour tester une application uniquement

## Validation des mouvements (problème)

#### Assomptions

Suite à mon analyse du problème, voici la liste des assomptions du serveur:
- Le body de la requête POST sur la route /api/movements/validation doit être bien formé suivant le modèle donné.
- La liste des points de contrôle doit nécessairement contenir 2 objets au minimum
- Les listes d'objets fournis sont triés par ordre croissant chronologiquement
- La liste d'opération est chronologiquement comprise entre le premier et le dernier point de contrôle

Cette liste relativement stricte permet de diminuer considérablement la complexité algorithmique tout en restant réaliste vis à vis du problème donné.

#### Spec technique serveur
##### /POST /movements/validation
Request body: 
<pre>
{  
  “operations”: [{ id, date, wording, amount }],
  “checkpoints”: [{ date, balance }]
}
</pre>
          

Responses:  
<pre>Code 202: 
{ “message”: "Accepted", "isValid": true, "reasons": [] }</pre>
<pre>Code 418:
{ “message”: "I’m a teapot", "isValid": false, “reasons”: Reason[] }</pre>
<pre>Code 419:
{ 
“message”: "Wrong parameters, an error occured",
"type": "INTERNAL_ERROR" 
}</pre>

Reason model
<pre>
interface Reason {
  "type": string;
  "message": string;
  "missingOperations"?: MissingOperation;
  "duplicatedOperation"?: Operation;
}
</pre>

MissingOperation model
<pre>
interface MissingOperation {
  "startDate": string | Date;
  "endDate": string | Date;
  "difference": number;
}
</pre>

#### Algorithme de validation
Grâce aux assomptions cités ci-dessus la complexité de l'algorithme est de o(n).  
Les deux premiers points de contrôle sont initialisés instantanément et le serveur boucle ensuite sur la liste d'opérations.
Il y a une séparation des cas sur la comparaison entre la date de l'opération et la date du point de contrôle. Si la date est antérieure, elle est ajouté au compte dynamique.  
Dans le cas contraire, un bilan est fait entre le compte dynamique et le point de contrôle. Puis on passe au point de contrôle suivant.  
Enfin, si un enchainement de point de contrôles est présent après la dernière opération, il pris en compte en itérant sur les points de contrôles "restants".

## Tests

#### Spec serveur NodeJS
`Jest/Supertest/Jasmine`  
`Fichier: server.test.ts`

#### Spec Angular
`Jest/Jasmine`  
`Fichiers: *.spec.ts`


#### Angular app coverage
<html lang="fr">
<body>
<div class='wrapper'>
  <div class="pad1">
    <table class="coverage-summary">
      <thead>
      <tr>
        <th class="file" data-col="file" data-fmt="html" data-html="true">File</th>
        <th class="pic" data-col="pic" data-fmt="html" data-html="true" data-type="number"></th>
        <th class="pct" data-col="statements" data-fmt="pct" data-type="number">Statements</th>
        <th class="abs" data-col="statements_raw" data-fmt="html" data-type="number"></th>
        <th class="pct" data-col="branches" data-fmt="pct" data-type="number">Branches</th>
        <th class="abs" data-col="branches_raw" data-fmt="html" data-type="number"></th>
        <th class="pct" data-col="functions" data-fmt="pct" data-type="number">Functions</th>
        <th class="abs" data-col="functions_raw" data-fmt="html" data-type="number"></th>
        <th class="pct" data-col="lines" data-fmt="pct" data-type="number">Lines</th>
        <th class="abs" data-col="lines_raw" data-fmt="html" data-type="number"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="file high" data-value="app"><a>app</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="20">20/20</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="12">12/12</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="5">5/5</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="18">18/18</td>
      </tr>
      <tr>
        <td class="file high" data-value="app/components/input-visualiser"><a>app/components/input-visualiser</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="19">19/19</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="11">11/11</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="4">4/4</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="17">17/17</td>
      </tr>
      <tr>
        <td class="file high" data-value="app/components/validation-visualiser">
          <a>app/components/validation-visualiser</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="14">14/14</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="0">0/0</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="8">8/8</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="10">10/10</td>
      </tr>
      <tr>
        <td class="file high" data-value="app/constants"><a>app/constants</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="3">3/3</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="0">0/0</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="0">0/0</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="3">3/3</td>
      </tr>
      <tr>
        <td class="file high" data-value="app/services"><a>app/services</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="12">12/12</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="2">2/2</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="2">2/2</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="10">10/10</td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>
    
    
#### Serveur coverage
<html lang="fr">
<body>
<div class='wrapper'>
  <div class="pad1">
    <table class="coverage-summary">
      <thead>
      <tr>
        <th class="file" data-col="file" data-fmt="html" data-html="true">File</th>
        <th class="pic" data-col="pic" data-fmt="html" data-html="true" data-type="number"></th>
        <th class="pct" data-col="statements" data-fmt="pct" data-type="number">Statements</th>
        <th class="abs" data-col="statements_raw" data-fmt="html" data-type="number"></th>
        <th class="pct" data-col="branches" data-fmt="pct" data-type="number">Branches</th>
        <th class="abs" data-col="branches_raw" data-fmt="html" data-type="number"></th>
        <th class="pct" data-col="functions" data-fmt="pct" data-type="number">Functions</th>
        <th class="abs" data-col="functions_raw" data-fmt="html" data-type="number"></th>
        <th class="pct" data-col="lines" data-fmt="pct" data-type="number">Lines</th>
        <th class="abs" data-col="lines_raw" data-fmt="html" data-type="number"></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="file high" data-value="controllers"><a>controllers</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="15">15/15</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="4">4/4</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="2">2/2</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="14">14/14</td>
      </tr>
      <tr>
        <td class="file high" data-value="routes"><a>routes</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="12">12/12</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="0">0/0</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="1">1/1</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="12">12/12</td>
      </tr>
      <tr>
        <td class="file high" data-value="services"><a>services</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="38">38/38</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="8">8/8</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="10">10/10</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="38">38/38</td>
      </tr>
      <tr>
        <td class="file high" data-value="utils"><a>utils</a></td>
        <td class="pic high" data-value="100">
          <div class="chart">
            <div class="cover-fill cover-full" style="width: 100%"></div>
            <div class="cover-empty" style="width: 0%"></div>
          </div>
        </td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="5">5/5</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="0">0/0</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="1">1/1</td>
        <td class="pct high" data-value="100">100%</td>
        <td class="abs high" data-value="5">5/5</td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>
