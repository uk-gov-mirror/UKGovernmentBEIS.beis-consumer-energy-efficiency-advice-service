import {browser, by, element, protractor} from "protractor";

export class LandingPage {
    navigateToReduceBills() {
        return browser.get('/energy-efficiency/reduce-bills');
    }

    getHeadingText() {
        return element(by.css('.page-heading .heading')).getText();
    }

    enterPostcode(postcode: string) {
        element(by.css('.postcode-input-text')).sendKeys(postcode, protractor.Key.ENTER);
    }
}
