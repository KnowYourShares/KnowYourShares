# PAE PROJECT
Este proyecto nace de la asignatura PAE enseñada en la FIB (Facultat d'informatica de Barcelona).


# SETUP

## Dev config
First of all we must install all the dependencies that are needed.
1. npm install
1. cd www
1. npm install
1. bower install


## Build for dev
In progress. Ideal: livereload
1. Terminal 1: cd www && gulp
1. Terminal 2: nodemon
1. Open localhost:8080

## Build for production
1. cd www
1. gulp
1. cd ..
1. pm2 start -i 0 server.js


# Front-End:
El proyecto se encuentra dentro de la capeta `www/src`, dentro de esta podemos encontrar 2 carpetas y el archivo `index.html`:

* En la carpeta `assets` podremos encontrar todo lo relacionado con css, imagenes, fonts y librerias enbedidas dentro de la
propia applicacion.
  * Si queremos cambiar algo sobre alguno de los anteriores ficheros mencionados, esta es nuestra carpeta.

* En la carpeta `modules` se encuentra el codigo Angular .

* El archivo `index.html` es el archivo base de nuetra applicacion, en el se encuentra el modulo raiz de Angular `<ng-app>`

Dentro de la carpeta `modules` se encuentran las partes de nuestra aplicacion dividida por componentes y el archivo `index.js`:

* La carpeta `app`
  * En esta carpeta se encuentran las diferentes vista de nuestra applicacion.

* La carpeta `directives`
  * En esta carpetas se encuentran las directivas de nuestra applicacion que seran utilizadas por las vistas

* La carpeta `resources`
  * En esta carpeta se encuentran los servicos que realizaran peticiones REST a nuestro servidor node.

* La carpeta `services`
  *  En esta carpeta se encuentran los servicios que utilizara internamente la aplicacion como por ejemplo
  las funciones para calcular los diferentes calculos empresariales.

* El archivo `index.js`
  * En este archivo se introducen los diferentes modulos browserify:
    * `require('dependencia')` para las "dependencias externas" (El nombre que le hayamos puesto dentro del archivo package.json).
    * Para dependencias internas tenemos que incluir el require dentro del `exports.module`.

Dentro del archivo `package.json` tenemos que incluir la dependencia que hayamos incluido con `bower`
en el apartado de "browser".


##### Para añadir un modulo de bower:

1. bower install --save modulo
1. En src/modules/index.js : añadir require('...')
1. En src/modules/app/index.js: añadir el nombre del módulo en el array


Licensing
=========
KnowYourShares is licensed under the Apache License, Version 2.0. See
[LICENSE](https://github.com/KnowYourShares/KnowYourShares/blob/master/LICENSE)
for the full license text.
