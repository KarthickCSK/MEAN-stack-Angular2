# MEAN-stack-Angular2
[![Build Status](https://travis-ci.org/linnovate/mean-cli.svg)](https://travis-ci.org/linnovate/mean-cli)
[![Circle CI](https://circleci.com/gh/linnovate/mean-cli.svg?style=svg)](https://circleci.com/gh/linnovate/mean-cli)
[![NPM version](https://badge.fury.io/js/mean-cli.svg)](http://badge.fury.io/js/mean-cli)
[![Dependency Status](https://david-dm.org/linnovate/mean-cli.svg)](https://david-dm.org/linnovate/mean-cli)
[![Gitter](https://badges.gitter.im/JoinChat.svg)](https://gitter.im/linnovate/mean?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Known Vulnerabilities](https://snyk.io/test/github/linnovate/mean-cli/badge.svg)](https://snyk.io/test/github/linnovate/mean-cli)

# [![MEAN Logo](http://mean.io/system/assets/img/logos/meanlogo.png)](http://mean.io/) MEAN Command Line



## Basic Usage

  Install Package:

    $ [sudo] npm init

 	$ [sudo] npm install -g @angular/cli

**Note:** You may need to use sudo only for OSX, *nix, BSD etc and run your command shell as Administrator (for Windows)
  Create a new angular app:

    ### Generating and serving an Angular project via a development server

```bash
ng new PROJECT-NAME
cd PROJECT-NAME
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can configure the default HTTP host and port used by the development server with two command-line options :

```bash
ng serve --host 0.0.0.0 --port 4201
```

### Generating Components, Directives, Pipes and Services

You can use the `ng generate` (or just `ng g`) command to generate Angular components:

```bash
ng generate component my-new-component
ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory src/app/feature/ and you run
ng g component new-cmp
# your component will be generated in src/app/feature/new-cmp
# but if you were to run
ng g component ../newer-cmp
# your component will be generated in src/app/newer-cmp
# if in the directory src/app you can also run
ng g component feature/new-cmp
# and your component will be generated in src/app/feature/new-cmp