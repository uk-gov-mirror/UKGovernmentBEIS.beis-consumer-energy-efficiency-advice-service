# BEIS DCEAS - Energy Efficiency Website

This project is the BEIS Energy Efficiency Website.

It is public-facing.

## Table of Contents

<!-- toc -->

  * [Architecture](#architecture)
  * [Operational Support](#operational-support)
  * [Development Setup](#development-setup)
    + [Development Setup - User Site](#development-setup---user-site)
    + [Development Setup - Admin Site](#development-setup---admin-site)
    + [Development Setup - MySQL Database](#development-setup---mysql-database)
  * [Development Notes](#development-notes)
    + [Adding files from .idea/ to git](#adding-files-from-idea-to-git)
- [Older dev setup instructions - TODO:BEISDEAS-156 sort out](#older-dev-setup-instructions---todobeisdeas-156-sort-out)
  * [Angular setup](#angular-setup)
  * [Tests](#tests)
  * [Debugging](#debugging)
  * [Angular / Wordpress Routing](#angular--wordpress-routing)
  * [Adding a question to the questionnaire](#adding-a-question-to-the-questionnaire)

<!-- tocstop -->

## Architecture

![Architecture overview diagram](architecture-overview.png)

Folders:

 * `wordpress/`
  
The base directory of the Wordpress installation for the admin site. The
theme we're working on lives in `/wordpress/wp-content/themes/angular-theme`.
If you do any PHP work, it should almost certainly be only in
this folder, or to the wp-config.php, or be a separate plugin.

 * `angular/`
 
The Angular application that runs the client-side for the user facing site.
This is compiled into the `user-site-server/src/main/resources/public/dist`
folder for use on the site; however, for ease of config
and development, the source code lives in this folder.

Please see the [angular/README.md] file for documentation specific to this module.

 * `integration-tests/`
 
Simple integration tests to check that the application is generally working as expected.
TODO:BEISDEAS-156 document how to run these?

## Operational Support

Please see [documentation/Operational Support.md](documentation/Operational Support.md)

## Development Setup

There are two web UIs: the user site (Angular JS) and the admin site (Wordpress).

To run and make changes to the user site (without making CMS changes), you will
need Java (Java 8) and Node.js. Follow the "Development Setup - User Site" section below.

Note: Gradle will not compile with Java 9

To run and make changes to the admin site, or to make CMS changes to the user
site you will need PHP. Follow the "Development Setup - Admin Site" section below.

### Development Setup - User Site

You will need the database installed locally, follow
the "Development Setup - MySQL Database" section below.

Ensure that you have Node 8.2.* and `npm` 5.3.* installed.

In the `angular` dir, run:

    npm install

Copy the file
`user-site-server/src/main/resources/application-dev.properties.template`
to a new file called `application-dev.properties` in the same directory and
fill in the config values. This file will be ignored by git, so
you can safely fill in the template values with real values.

In IntelliJ, run both the "ng build --watch" and the "DceasApplication" run configurations
and visit the site at http://localhost:8080

TODO:BEISDEAS-156 for now, you will need the WordPress site running locally as well,
see the "Development Setup - Admin Site" section below. Run the "Wordpress on local server" item.

### Development Setup - Admin Site

You will need the database installed locally, follow
the "Development Setup - MySQL Database" section below.

You will need PHP installed and registered in IntelliJ.
You can install PHP using the Microsoft Web Platform Insaller at
https://www.iis.net/downloads/microsoft/web-platform-installer

You should be able to launch the site by selecting the "on local server"
run configuration in IntelliJ and clicking "Play".

Open the site at http://localhost:81

### Development Setup - MySQL Database

Install MySQL 5.7 from
https://dev.mysql.com/downloads/

Set the root username and password to something
you will remember (e.g. "root" / "password").

Log in as root and run the following to create a WP user and database

    CREATE DATABASE wordpress;
    GRANT ALL PRIVILEGES ON wordpress.* TO "wordpress"@"localhost"
        IDENTIFIED BY "wordpressPassword123";

Get a dump of the database from somewhere (another developer,
the live site etc.) and restore it to that database.

## Development Notes

### Adding files from .idea/ to git

In general, please don't add files from `.idea/ `to version control. Most
of that content is generated from Gradle or NPM and/or varies by machine.

However, please do commit any `.idea/` changes which you are sure are:

 * something we want all developers to have
 * not auto-generated from Gradle or NPM
 * the same for all developers (i.e. ensure that your user name doesn't appear in any file paths)

# Older dev setup instructions - TODO:BEISDEAS-156 sort out

## Angular setup

* Install Node.js and NPM https://nodejs.org/en/

* Open a cmd window and go to the "angular" directory in the root of the repository

* Run `npm install`

* You can use the Angular CLI from `./node_modules/.bin/ng` or you
  can install the Angular CLI https://github.com/angular/angular-cli

* Run `ng build` to get the compiled Angular files into the Wordpress theme.
  The Angular application will now be available at http://localhost:81.

When developing, it's a good idea to have the command
"ng build --watch" running. This will watch your
Angular files and automatically compile them on changes.

## Tests

Angular unit tests are run from the Angular project. Open a command
window in "/angular" and run `ng test` (or "npm run test"). The
tests will automatically be re-run when the files are changed.

Integration tests are in the "/integration-tests" project.

* Go to /integration-tests and run `npm install`
* When you want to run the integration tests:
  * Have the site up and running at http://localhost:81
  * Run `npm run test`
    * If you are running the site at a different URL (e.g. if you're
      using EasyPHP), then either change exports.config.baseUrl in
      /integration-tests/protractor.conf.js to the correct baseUrl,
      or run "npm run test -- --baseUrl=[your base url]" instead

See http://www.protractortest.org/#/ for a guide on
writing protractor tests. We probably don't need too many
of these - just check that the site basically exists.

## Debugging

Go to https://www.jetbrains.com/help/idea/configuring-xdebug.html.
Download and install Xdebug, integrate it with the
PHP interpreter and do any IntelliJ config you need.

Create a debug server configuration following the instructions here
https://www.jetbrains.com/help/idea/creating-a-php-debug-server-configuration.html

Then just start debugging using this configuration!


## Angular / Wordpress Routing

Wordpress has built in redirecting which happens before the Angular app is loaded.

By default, Wordpress's built in routing will redirect any request to a path which ends in a wordpress page slug (e.g. "www.example.com/some/path/:slug") to that page's default Wordpress permalink ("www.example.com/:slug"). This means that an Angular route "www.example.com/some/path/to/slug" could never be reached as an entry point to the app, because Wordpress would redirect before loading the Angular app.

To distinguish Angular routes from Wordpress routes, for now all routes in the Angular app are prefixed with "/js/" and Wordpress routing is disabled for any URL path which begins with "/js/".

## Adding a question to the questionnaire

These, as it stands, are the steps that should be taken when creating a new question component. HomeTypeQuestionMetadata and HomeTypeQuestionComponent can be used as an example.

* Angular theme:
  * (If necessary) Create a class, say MyResponse, that will represent the response to the question.
  * Create a component, say MyQuestionComponent, under questionnaire/questions, and an additional class (MyQuestionMetadata) in the same place. 
  * The component must extend QuestionBaseComponent<MyResponse> and the additional class must extend QuestionMetadata<MyResponse>
  * The component must include the following metadata in the @Component annotation: animations: [slideInOutAnimation]
    * This was previously done via a custom decorator, but in production mode, Angular's AoT compiler is not clever enough to realise what the custom decorator does, so they now have to passed in manually to every single question component (sad)
  * Add your component to entryComponents in the relevant module
  * Define the response getter and setter on MyQuestionComponent such that they read the response from and update the answer on ResponseData (available via the base class).
  * Define isApplicable and hasBeenAnswered on MyQuestionMetadata.
  * Define the questionId in the constructor of MyQuestionMetadata. This should correspond to the slug of the Wordpress post (see below).
  * Define your component's logic, template and styling in the usual way, making use of the response and complete members of the base class.
  * Update QuestionnaireService to be aware of your new question, and possibly change the logic within QuestionnaireComponent (adding helper methods to QuestionnaireService as needed) if your question requires more complicated decisions to be made than is currently allowed for.
* Wordpress:
  * Add a new post of type 'Question' and define the question heading and (if desired) help text. Export your data so it can be imported in other environments/by other developers (see Creating new wordpress content)
  * Ensure the slug corresponds to the questionId in MyQuestionMetadata
