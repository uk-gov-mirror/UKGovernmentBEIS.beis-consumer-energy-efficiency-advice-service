import {browser, by, element} from "protractor";

export class HomePage {
    navigateTo() {
        return browser.get('/');
    }

    getHeadingText() {
        return element(by.css('.heading-text')).getText();
    }

    clickLandingPageLink() {
        element(by.cssContainingText('.landing-page-link', 'Reduce your energy bills')).click();
    }
}
