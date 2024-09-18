# Malcolm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

Amplify Console
https://us-west-2.console.aws.amazon.com/amplify/home?region=us-west-2&code=a299da8f7b1bd0004bfa#/d2njo5m0yb6q3v

master branch automatically deploys to dev environment.

prod branch automatically deploys to prod environment.

## URLs

| env | url |
|-|-|
| dev | https://malcolm.elation.dev |
| prod | https://www.mycoachmalcom.com |
| legacy | https://legacy.mycoachmalcom.com |

## Workflow

1. Branch from `master` to make changes.
1. Create a PR into `master` branch and use `Squash and merge`, which will trigger a deploy to the dev environment.
1. Verify the dev environment.
1. Create a PR from `master` into `prod` branch, and use `Squash and merge`, which will trigger a deploy to the prod environment.
1. Verify the prod environment.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build prerequisites

node 11.15.0

angular  7.3.0

`npm install -g @angular/cli@7.3.0`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Setup redirects in amplify console

This only needs to be done once. Don't yet see a way to configure this in the codebase, so..

Do exactly this in Amplify Console / App settings / Rewrites and redirects
https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html#redirects-for-single-page-web-apps-spa


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
