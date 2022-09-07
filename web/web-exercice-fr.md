{{TOC}}

## Intro

Comme exercice je vous propose de recréer la page du lecteur youtube, ça vous permettra de pratiquer html et css.
Si vous préférez, vous pouvez reconstruire une page de discord, ça vous donnera aussi une bonne idée de comment utiliser les choses et vous aurez à faire par vous même, la structure du code ne sera pas très différente mais le résultat si.

> [!hint] Ce que je vous donne
>
> Vous pourrez suivre avec le code que je mettrai en lien mais je vous invite à faire d'abord par vous même. Il y aura des indications avant chaque section.
> Il y aura aussi un screenshot après chaque avancée, si vous n'avez pas exactement la même chose que moi ce n'est pas grave.
> Vous pouvez aussi faire tout autre chose et utiliser mon exemple comme source seulement.
>
> N'oubliez pas les exemples [ici](https://github.com/Akahara/documentation/tree/master/web/examples) !

> [!check] Info - temps par étape
>
> J'indique des temps à chaque étape *à titre indicatif*, ce sont les temps que je pense que j'aurais mit à tout faire pour la première fois, je sors les chiffres de mon chapeau donc ne vous inquiétez pas si vous prenez plus ou moins de temps qu'indiqué.
> Surtout sur la partie css, vous pouvez passer un instant ou plusieurs jours dessus.

### Avant de commencer

Avant de commencer une page c'est toujours une bonne idée de dessiner au crayon un sketch de ce que vous voulez obtenir à la fin. Pour cet exemple je l'ai déjà [ici](https://youtu.be/dQw4w9WgXcQ).

## D'abord l'html

On commence *toujours* par l'html, on y écrit ce que contient la page. Le but de cette étape n'est pas d'avoir quelque chose de joli mais de savoir *où* on va, et ce qu'il y aura à terme.

> [!check] Etape 1 (1/2h)
>
> Commencez avec une page vide puis rajoutez les balises, les textes et même les images si vous voulez. Utilisez le [lorem ipsum](https://www.lipsum.com/) pour les textes longs, ça ne sert à rien d'écrire le contenu de votre site tout de suite.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%201/)
![missing image](follow-allong/screenshots/step%201.png)

## Un meilleur html

Avant d'ajouter du css on peut faire des choses un peu plus jolies. Par exemple j'aime bien utiliser [google fonts](https://developers.google.com/fonts/docs/material_icons) pour ajouter des icônes et des polices de texte.

### Google icons

La liste des icones est [ici](https://fonts.google.com/icons), il vous suffit de rajouter
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
dans votre balise `<head>`, puis de copier la ligne
```html
<span class="material-symbols-outlined">menu</span>
```
qui correspond à votre icône.

### Les images

La balise `<img/>` permet d'intégrer des images à votre page, elle s'utilise de cette façon :
```html
<img src="URL/CHEMIN"/>
```
Si votre image est un fichier vous pouvez indiquer son chemin relatif *au fichier .html*. Si elle vient d'internet vous pouvez aussi simplement mettre son url.

> Pour les images j'utiliserai les vignettes des tracks de [Lena Raine](https://www.youtube.com/c/LenaRaine/videos), je vous invite à aller écouter ce qu'elle fait !

> [!check] Etape 2a (1/4h)
>
> Rajoutez les images et les icônes si ce n'est pas déjà fait.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%202a/)
![missing image](follow-allong/screenshots/step%202a.png)

### Les liens

C'est aussi le moment de rajouter les liens vers d'autres pages si vous en avez. Ici je parle seulement des liens avec les balises `<a>` comme les menus et les liens externes. Si vous avez des trucs plus compliqués comme une barre de recherche ce sera plus tard.

> [!check] Etape 2b (5min)
>
> Rajoutez les liens des balises `<a>`.

> Je ne mets pas le code tout de suite, quand j'ai construit l'exemple j'ai rajouté les liens après le css.

### Les sélecteurs

Pour ajouter du css il va vous falloir des *IDs* et des *classes* dans votre html, si vous avez l'habitude vous pouvez les rajouter en même temps que le reste, mais ça marche aussi de les rajouter après le reste.

> J'ai rajouté un peu plus d'IDs que nécessaire, en prévision du JS. C'est toujours utile de rajouter les IDs des éléments interactifs (boutons...).

> [!check] Etape 2c (10min)
>
> Rajoutez les sélecteurs (IDs et classes) les plus importants, de toute façon vous serez amené à les modifier en ajoutant le css.

> Je ne mets pas le code tout de suite, il n'a de l'intérêt qu'après le css.

## Le css

Le css c'est souvent l'étape la plus longue, on peut faire quelque chose vite fait bien fait ou y passer des heures.
La première phase c'est de positionner vos éléments sur la page, la seconde c'est mettre les bonnes couleurs aux bons endroits, mettre les accents dans le texte, les bordures etc...

> Si vous ne voulez pas faire de css tout de suite vous pouvez vous en passer, ca risque juste d'être un peu pénible de développer avec une interface aussi moche.

> [!check] Etape 3a (1h à 5h)
>
> Prenez le temps qu'il faut pour bien placer vos éléments dans la page, vous pouvez utiliser les listes des propriétés et des sélecteurs du "cours" et vous servir d'internet !

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%203a/)
![missing image](follow-allong/screenshots/step%203a.png)

> [!check] Etape 3b (1/2h à 2h)
>
> Passez aussi un peu de temps pour colorier ce qui doit être colorié, mettre les bordures, changer les styles par défaut etc...

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%203b/)
![missing image](follow-allong/screenshots/step%203b.png)

## Le php

Pour pratiquer un peu le php je vous propose de faire en sorte que les vidéos listées à droite du lecteur soient choisies aléatoirement à chaque rechargement de la page.

Pour pouvoir faire ça il va nous falloir un serveur avec php (j'utiliserai xampp). Vérifiez que votre installation fonctionne en renommant l'index en `index.php`, placez-le à la racine de votre serveur web et tapez `localhost` dans l'url de votre navigateur.
Si votre page ne s'affiche pas allez voir le "cours".

Pour afficher des vidéos il va vous falloir... des vidéos (qui l'eut cru !). Pour éviter de tout mettre au même endroit je vais créer un fichier `videos.php` qui contiendra juste une liste des vidéos possibles.

> [!check] Etape 4a (10min)
>
> Faites vous une liste de vidéos et mettez-la dans un fichier `videos.php`, vous pouvez aussi reprendre la mienne si ça ne vous intéresse pas.
> > Si vous faites le projet discord plutôt que youtube, vous pouvez faire une liste de comptes ou de messages.

Ensuite il reste à rajouter le php dans la page, d'abord avec un `#include "videos.php"` en haut de la page puis avec des `foreach`, `echo` ou `<?= ... ?>`.

> [!check] Etape 4b (1/4h)
>
> Rajoutez le php nécessaire à l'affichage des vidéos, vous pouvez faire comme moi et afficher miniature, titre, auteur et vues et vous pouvez même rajouter un lien vers la vidéo avec une balise `<a href="...">`.
> Vous aurez peut-être besoin de changer le css, dans ce cas c'est bien plus qu'1/4h qu'il vous faudra.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%204/)
![missing image](follow-allong/screenshots/step%204.png)

Ca c'était le php statique, pas de connexion avec une base de données ni d'entrées utilisateur.

Avant d'intégrer bdd/interactivité il va nous falloir un *form* en html.

## Les forms

Nous allons utiliser le champ de recherche en haut de la page pour filtrer les vidéos de la barre de droite - ce n'est pas très raccord avec le site de base mais ça nous évite d'avoir à créer plusieurs pages.

Nous avons déjà une balise `<input/>` pour le champ de recherche, il suffit de l'entourer par un `<form>` et de mettre un bouton `<button type="submit">` à la place de l'icône de recherche (en gardant l'icône *dans* le bouton).

Ensuite il reste à préciser le champ `name="..."` du champ de recherche et l'action/la méthode du form.
Pour vérifier que tout fonctionne je vais d'abord rediriger les recherches sur le site officiel de youtube. Pour ca il me suffit de faire une recherche normale, sur youtube, et de regarder l'url que ca me produit :
```
https://www.youtube.com/results?search_query=web
```
Avec ça j'obtiens les attributs que je dois rajouter :

| Attribut | Balise | Valeur |
|----|----|----|
| action | form | "https://www.youtube.com/results" |
| method | form | "GET" |
| name | input | "search_query" |

> [!check] Etape 5 (10min)
>
> Rajoutez le form et mettez les bons attributs aux bons endroits. Vérifiez que la barre de recherche vous amène bien sur youtube.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%205/)

## L'interaction form-php

On peut garder notre form tel quel à l'exception de son *action*. On va rediriger la requête sur la même page en remplaçant l'url de youtube par "#". On va s'assurer que la valeur du champ de recherche est bien passée en ajoutant `<?= $_GET['search_query'] ?>` quelque part, tout en haut de l'html ou dans le titre de la vidéo par exemple.

Une fois que c'est fait il reste à filtrer les vidéos qui peuvent être affichées avec la valeur en question. N'oubliez pas qu'elle peut ne pas exister, notamment à la première ouverture de la page.

> [!check] Etape 6 (1/4h)
>
> Changez le php pour filtrer les vidéos dont le titre contient ce que l'utilisateur a recherché.
>
> > N'hésitez pas à différencier le code php pour l'affichage et pour le filtrage. Souvent on met tout ce qui est récupération des données en php avant l'html et l'affichage est mixé à l'html.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%206/)

## BDD

Pour éviter d'avoir à écrire toutes les vidéos tel quelles en php, on va utiliser une base de données, avec apache et mysql vous devriez avoir accès à phpmyadmin ([localhost/phpmyadmin](http://localhost/phpmyadmin)), vous devriez pouvoir créer une bdd et un utilisateur avec un mot de passe.

J'utiliserai PDO, vous pourrez trouver un code de base dans le "cours".

> [!check] Etape 7 (1/2h-1h)
>
> Créez un utilisateur et une base de données avec une seule table des vidéos du site. Remplissez la table et faites une requête en php qui récupère les vidéos dont le nom contient la recherche de l'utilisateur.
> Vous devriez pouvoir retirer le fichier `videos.php` ensuite.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/step%207/)

## La suite

À ce niveau vous devriez avoir à peu près tout pour faire votre premier site. Si vous voulez continuer à lire je vous propose de remplacer l'intégration des vidéos directement en php par une api pour pratiquer un peu le javascript. Sinon c'est la fin de cet exercice !

### Une api

L'idée est de retirer tout le code php de l'index et d'utiliser javascript pour demander au serveur les vidéos à afficher. Du point de vue de l'utilisateur la page va être chargée mais sera vide au début, et les vidéos apparaîtront après.

> [!check] Etape I (5min-1/4h)
>
> Je vais commencer par créer un fichier `api.php` qui récupèrera seulement les vidéos (comme on le faisait déjà) et qui les affichera sous format json (cf la fonction `json_encode`).
> Vous pouvez vérifier que l'api fonctionne en allant la regarder depuis votre navigateur.

> [!check] Etape II (5min)
>
> Retirez tout le php de l'index, vous pouvez même renommer l'extension en `.html`. Gardez ce l'élément `<li>` qui était dans la boucle `foreach` mais placez-le dans une balise `<template>`, il nous sera utile pour rajouter les vidéos ensuite.

> [!check] Etape III (1/2h-3/4h)
>
> Rajoutez un script js et faites deux fonctions : une qui ajoute une balise `<li>` d'une vidéo à la liste et l'autre qui envoie une requête GET sur l'api et qui appelle la première pour générer la liste des vidéos.

> [!check] Etape IV (1/4h)
>
> Il ne reste plus qu'à filtrer les vidéos affichées en fonction du paramètre `search_query` de l'étape 6.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/API%201/)

> [!check] Alternative
>
> Techniquement, c'est mieux d'envoyer le paramètre à l'api, ne rien filtrer en JS et de changer le form pour qu'il ne recharge pas complètement la page. Si vous êtes arrivé jusque là vous ne devriez pas avoir de mal à voir comment faire, je mets quand même le code dans le doute.

👉 [code](https://github.com/Akahara/documentation/tree/master/web/follow-allong/API%202/)
