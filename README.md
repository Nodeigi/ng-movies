# NgMovies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Requirements

You need to have docker or node (8.9 minimum) installed.

## Development server

There are two way of launching NgMovies in local environment:

### I have node installed at least in version 8.9

Navigate to project's directory `cd ng-movies`

Run `npm install` to install dependencies.

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

### I have docker installed

Navigate to project's directory `cd ng-movies`

Run `docker run -it -w /usr/src/app -v $(pwd):/usr/src/app -p 4200:4200 node:10.7 /bin/bash`

Run `npm install` to install dependencies.

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.
