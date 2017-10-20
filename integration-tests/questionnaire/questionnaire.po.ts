import {browser, by, element, protractor} from "protractor";

export class QuestionnairePage {
    navigateTo() {
        return browser.get('/questionnaire');
    }

    hasError() {
        return element(by.className('error')).isPresent();
    }

    getHeading() {
        return element(by.id('question-heading')).getText();
    }

    enterPostcode(postcode: string) {
        element(by.css('app-postcode-epc-question input.text-input')).sendKeys(postcode, protractor.Key.ENTER);
    }

    selectFirstAddress() {
        element(by.css('app-postcode-epc-question .list-select .list-select-option:first-child')).click();
    }

    selectFirstHomeAge() {
        element(by.css('app-home-age-question .home-age-option:first-child')).click();
    }

    clickOption(text: string) {
        element(by.cssContainingText('.multiple-choice-option', text)).element(by.tagName('button')).click();
    }

    goForwards() {
        element(by.css('.right-arrow')).click();
    }
}
