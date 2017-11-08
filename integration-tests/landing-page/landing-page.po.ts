import {browser, by, element, protractor} from "protractor";

export class LandingPage {
    navigateToReduceBills() {
        return browser.get('/js/reduce-bills');
    }

    getHeadingText() {
        return element(by.css('.heading-text')).getText();
    }

    enterPostcode(postcode: string) {
        element(by.css('.postcode-input-text')).sendKeys(postcode, protractor.Key.ENTER);
    }
}
