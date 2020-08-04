# User-site integration tests

These tests run against the deployed user-site and use Protractor to execute
a few browser tests.

Run them with:

    npm install
    TESTS_USERNAME=beissea TESTS_PASSWORD='{password}' TESTS_HOST=https://dceas-user-site-int.cloudapps.digital/ npm run test

(Note the single quotes around the password).

To run them against local version

    TESTS_HOST=http://localhost:8080/ npm run test