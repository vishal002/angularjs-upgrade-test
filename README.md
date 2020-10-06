# AngularjsUpgradeTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

------------------------------------------------------------------------------------------------------------------------------------------------------


# Steps to create a new angular based project:-
## install node 10x
## npm install -g @angular/cli
## follow this link: https://www.competa.com/blog/migrate-angularjs-to-angular-using-upgrademodule-part-1/ 

https://www.digitalocean.com/community/tutorials/how-to-upgrade-from-angularjs-to-angular-with-ngupgrade
https://medium.com/code-divoire/a-story-of-ngupgrade-bringing-an-angularjs-application-from-1-6-to-angular-4-84eae4434010
npm install @angular/upgrade --save
npm i @types/angular --save-dev

1) ng new <project-name>
2) Would you like to add Angular routing? Yes
3) Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss]
4) npm install @angular/upgrade –save-dev
5) if having some legacy build tools then add it to package.json file in scripts and merge all dependencies 
6) merge index.html
7) 


------------------------------------------------------------------------------------------------------------------------------------------------------

Issues & Solution

I: cannot find namespace angular typescript  angular.IAngularStatic;
S: import * as angular from 'angular'; in file app.module.js

I: Cannot find name 'angular' in ts file
S: npm install --save @types/angular  &&  ,"types": [ "angular"]  in file tsconfig.json 
   OR
   https://stackoverflow.com/questions/50353414/can-not-find-namespace-angular/50353787

I: Cannot find name 'require'
S: npm i @types/node

I: Hybrid app fails to bootstrap AngularJS if loaded from import
S: https://github.com/angular/angular/issues/16484 

I: A weird case of AngularJS router url encoding gone wrong "http://localhost:4200/#!/home"
S: https://medium.com/code-divoire/a-weird-case-of-angularjs-router-url-encoding-gone-wrong-2164cd3947bb 

I: ERROR in ./src/tv-dashboard/app/lib/mobikon/views/modal-popup.html 1:0
   Module parse failed: Unexpected token (1:0)
   You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
   > <div class="modal show image-upload-error-modal">
   |     <div class="modal-dialog">
   |         <div class="modal-content">
   ERROR in ./src/tv-dashboard/app/lib/mobikon/directives/emenu/order-items/order-items.html 1:0
   Module parse failed: Unexpected token (1:0)
   You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
   > <div class="order-item-wrapper" ng-repeat="item in getItems()">
   |     <mk-order-item order="order" item="::item" can-edit="::canEdit"></mk-order-item>
   | </div>
S: https://github.com/angular/angular-cli/issues/14855 

I: ERROR in ./src/tv-dashboard/app/lib/mobikon/assets/images/profile-male.png
   Module build failed (from ./node_modules/file-loader/index.js):
   TypeError: Cannot read property 'context' of undefined
       at Object.module.exports (/Users/vishalkumar/Desktop/mobikon-office/upgrade-aj-to-a/upgraded-angular/node_modules/file-loader/index.js:12:42)
   ERROR in ./src/tv-dashboard/app/lib/mobikon/assets/images/profile-default.png
   Module build failed (from ./node_modules/file-loader/index.js):
   TypeError: Cannot read property 'context' of undefined
       at Object.module.exports (/Users/vishalkumar/Desktop/mobikon-office/upgrade-aj-to-a/upgraded-angular/node_modules/file-loader/index.js:12:42)
   OR
   You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file angular 8
S: Simply upgrade ur loaders to @latest eg: npm i file-loader@latest --save-dev

I: Unknown compiler option 'stylePreprocessorOptions'.
S: https://github.com/angular/angular-cli/issues/10473  add in angular.json file

I: import scss file in another scss file using angular 8
S: https://scotch.io/tutorials/angular-shortcut-to-importing-styles-files-in-components

I: This module is declared with using 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.
S: https://github.com/visjs/vis-network/issues/67 in angular.json file

I: WARNING in Circular dependency detected:
   src/tv-dashboard/app/lib/mobikon/directives/emenu/pickup-date-elapsed/pickup-date-elapsed.js -> src/tv-dashboard/app/lib/mobikon/services/emenu/show-modal.js -> src/tv-dashboard/app/lib/mobikon/directives/emenu/pickup-date-elapsed/pickup-date-elapsed.js
S:

I:
S:




