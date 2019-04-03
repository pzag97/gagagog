# Operational Client


## Development server
Run `npm install` to install dependencies

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Server communications
All requests are mocked using observables and localStorage API.

## Store
The app is built with @ngrx/store. You can start the app in development mode to inspect app's state using Redux Devtools.

## Authorization

By default there is only one user. These are credentials for admin account:

`username: 'super.user'`

`password: 'test'`

## Configurations
Configurations are parsed recursively and forms are generated dynamically so multiple nested levels configs are supported.

## Add more accounts
You can create new users and delete old ones in edit users menu. You can login with new accounts using default password `test`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

All NGRX Store Actions are covered by unit tests.

## How application can be improved
Some components can be refactored into multiple 'dumb' and smaller components.

Styles can be organized better using full angular material themes functionality, variables and mixins.

The app is not tested to work on mobile 

Most of the app's components and services should be covered by unit and integration tests

The app should have loader service and indicators for better UX

Apps' permissions are saved for the user and are displayed but not really used yet.
