import {browser, by, element, protractor} from "protractor";

export class LandingPage {
    navigateToReduceBills() {
        return browser.get('/energy-efficiency/reduce-bills');
    }

    getHeadingText() {
        return element(by.css('.page-heading .heading')).getText();
    }

    enterPostcode(postcode: string) {
        const postcodeInput = element(by.css('.postcode-input-text'));
        // Send ctrl + a, Del to clear the current postcode
        postcodeInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'), protractor.Key.DELETE);
        postcodeInput.sendKeys(postcode, protractor.Key.ENTER);
    }
}
