This project is a Wordpress project with an Angular 4 frontend, so you'll need some way of locally hosting a PHP app and MySQL server for testing during development.

Suggested way is installing MySQL and PHP standalone, and using IIS. This is most similar to the deployment environment, in Azure.

Other options are using the PHP in-built server, or a package installation such as WAMP. Using the PHP in-built server makes debugging a bit more complicated, and also causes the site to throws occasional strange un-debuggable exceptions, but it does make installing a server trivial if you don't want to install IIS just for this. 

WAMP Package installations are easy to get started with with the caveat that they usually require the base href to be a subdirectory e.g. http://localhost:81/wordpress/ rather than just http://localhost:81. This causes issues with serving our Angular files, so there's a bit more config that you'll have to change (and make sure it doesn't get pushed to Azure).


## Server/database setup

### Using IIS and MySQL
* To set up IIS with PHP, look at https://docs.microsoft.com/en-us/iis/application-frameworks/scenario-build-a-php-website-on-iis/configuring-step-1-install-iis-and-php
  * If you haven't already got IIS installed, follow the instructions in part 1.1 "Install IIS"
  * Install PHP for Windows by following the instructions in part 1.2 "Install PHP by using Web PI"
  * Create your website in IIS by following the steps in part 1.4 "Add Your PHP Application".
    * In step 5, the physical path is the path to the "/wordpress" folder, NOT the root of the repository
    * In step 9, specify port 81
* Install MySQL server - this can be done from Web PI as well
* Make sure the server is running and follow the steps in https://codex.wordpress.org/Installing_WordPress#Using_the_MySQL_Client
  * Use database name "wordpress", database user "wordpress" and database user password "wordpressPassword123"
  * If you've installed some other MySQL client e.g. phpMyAdmin, feel free to use that instead of the command line client...!

### Using a WAMP stack
This might be easier to install, but is more different from the production environment at the moment and is harder to configure (e.g. changing version of PHP) than having all the components separately.

* Download a WAMP installer/environment e.g. WampServer http://www.wampserver.com/en/ or EasyPHP Devserver http://www.easyphp.org/documentation/devserver/getting-started.php. EasyPHP looks a bit more slick?
* Install it
* If using WampServer - add an alias called something sensible like "beis", linking up your "/wordpress" folder. If using EasyPHP, add a working directory called something like "edsa-beis" linking to your "/wordpress" folder.
* Change some config:
  * Change the base href in /wordpress/wp-content/themes/angular-theme/header.php to "/beis" (or "/edsa-beis")
  * Change the deployUrl in angular/.angular-cli.json to "/beis/wp-content/themes/angular-theme/dist/" (or "/edsa-beis/...etc")
  * Make sure you don't commit these changes!
* Make sure the database is running and follow the steps in https://codex.wordpress.org/Installing_WordPress#Using_phpMyAdmin
  * Use database name "wordpress", database user "wordpress" and database user password "wordpressPassword123"

## Wordpress Server Config
API keys and other sensitive configuration are accessed by the PHP application as environment variables. To set these, copy the file
`wordpress/wp-content/themes/angular-theme/config/config.php.template` to a new file called `config.php` in the same directory. This file
 will be ignored by git, so you can safely fill in the template values with real values.

## Initial Wordpress site setup

* Make sure the web and MySQL servers are up and running, and visit http://localhost:81. You should be redirected to an initial setup page for Wordpress.
* Fill out the forms with sensible details.
* Visit the admin backend and:
  * Change the theme to "BEIS DCEAS Theme"
  * Ensure the following plugins are activated:
    * Advanced Custom Fields
    * ACF to REST API
    * Wordpress Importer
    * WP REST API cache
  * Import the necessary Wordpress content to your local wordpress MySQL database. This content is not stored in the repository!
* The front end won't be displaying anything yet... now we need to set up the Angular project.

## Angular setup

* Install Node.js and NPM https://nodejs.org/en/
* Open a cmd window and go to the "angular" directory in the root of the repository
* Run `npm install`
* Install the Angular CLI https://github.com/angular/angular-cli (technically not absolutely necessary, since NPM will install it locally - but it makes things easier)
* Run `ng build` to get the compiled Angular files into the Wordpress theme. The Angular application will now be available at http://localhost:81. 

When developing, it's a good idea to have the command "ng build --watch" running. This will watch your Angular files and automatically compile them on changes.

## Tests

Angular unit tests are run from the Angular project. Open a command window in "/angular" and run `ng test` (or "npm run test"). The tests will automatically be re-run when the files are changed.

Integration tests are in the "/integration-tests" project.

* Go to /integration-tests and run `npm install`
* When you want to run the integration tests:
  * Have the site up and running at http://localhost:81
  * Run `npm run test`
    * If you are running the site at a different URL (e.g. if you're using EasyPHP), then either change exports.config.baseUrl in /integration-tests/protractor.conf.js to the correct baseUrl, or run "npm run test -- --baseUrl=[your base url]" instead
See http://www.protractortest.org/#/ for a guide on writing protractor tests. We probably don't need too many of these - just check that the site basically exists.

## Debugging

Go to https://www.jetbrains.com/help/idea/configuring-xdebug.html. Download and install Xdebug, integrate it with the PHP interpreter and do any IntelliJ config you need.

Create a debug server configuration following the instructions here https://www.jetbrains.com/help/idea/creating-a-php-debug-server-configuration.html

Then just start debugging using this configuration!
