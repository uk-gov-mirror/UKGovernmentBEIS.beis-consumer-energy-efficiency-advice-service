# Angular client-side SPA for the user facing site

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

## Table of Contents

<!-- toc -->

- [Running tests](#running-tests)
- [Running the site](#running-the-site)
- [Code scaffolding](#code-scaffolding)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Further help with Angular](#further-help-with-angular)
- [Adding a question to the questionnaire](#adding-a-question-to-the-questionnaire)
  * [Angular code:](#angular-code)
  * [Wordpress:](#wordpress)

<!-- tocstop -->

## Running tests

Run the following:

    ./node_modules/.bin/ng test --browsers Chrome

then use the Chrome window which appears to view the test output.
(The window will take 10-30s to appear, after things get compiled. Be patient.)

To debug tests, open the Chrome devtools window.

To run a single test, click its name in the test output in Chrome.

## Running the site

Follow the "Development Setup - User Site" section in [the main README](../README.md)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running end-to-end tests

TODO:BEIS-156 check these instructions

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help with Angular

To get more help on the Angular CLI use `ng help` or go check out the [Angular
CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Adding a question to the questionnaire

These, as it stands, are the steps that should be taken when creating a new question component.
`HomeTypeQuestionMetadata` and `HomeTypeQuestionComponent` can be used as an example.

### Angular code:

 * (If necessary) Create a class, say `MyResponse`, that will represent the response to the question.
 * 	Create a component, say `MyQuestionComponent`, under `questionnaire/questions`,
    and an additional class (`MyQuestionMetadata`) in the same place.
 * 	The component must extend `QuestionBaseComponent<MyResponse>` and the additional
    class must extend `QuestionMetadata<MyResponse>`
 * 	The component must include the following metadata in the `@Component` annotation:
     `animations: [slideInOutAnimation]`
 * 	This was previously done via a custom decorator, but in production mode,
    Angular's AoT compiler is not clever enough to realise what the custom decorator does,
    so they now have to passed in manually to every single question component
 * 	Add your component to `entryComponents` in the relevant module
 * 	Define the response getter and setter on `MyQuestionComponent` such that they read the
    response from and update the answer on `ResponseData` (available via the base class).
 * 	Define `isApplicable` and `hasBeenAnswered` on `MyQuestionMetadata`.
 * 	Define the `questionId` in the constructor of `MyQuestionMetadata`.
    This should correspond to the slug of the Wordpress post (see below).
 * 	Define your component's logic, template and styling in the usual way,
    making use of the response and complete members of the base class.
 * 	Update `QuestionnaireService` to be aware of your new question,
    and possibly change the logic within `QuestionnaireComponent`
     (adding helper methods to `QuestionnaireService` as needed) if your question
     requires more complicated decisions to be made than is currently allowed for.

### Wordpress:

 * 	Add a new post of type 'Question' and define the question heading and (if desired)
    help text. Add a migration so that your new question will be added to all environments; 
    see `2018-11-22-add-built-form-question.xml` for an example.
 * 	Ensure the slug corresponds to the questionId in MyQuestionMetadata
