import {browser, by, element, protractor} from "protractor";
import {CommonPageHelpers} from "../common-page-helpers";

export class HomeBasicsQuestionnairePage {
    navigateTo() {
        return browser.get('/questionnaire/home-basics');
    }

    hasError() {
        return element(by.className('error')).isPresent();
    }

    getHeading() {
        return element(by.id('question-heading')).getText();
    }

    enterPostcode(postcode: string) {
        element(by.css('app-postcode-epc-question input.text-input')).sendKeys(postcode, protractor.Key.ENTER);
        browser.waitForAngular();
    }

    private addressListIsPresent() {
        return element(by.css('app-postcode-epc-question .list-select')).isPresent();
    }

    private selectFirstAddress() {
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

    workThroughMiniEpcIfExists() {
        return this.addressListIsPresent().then(isPresent => {
            if (isPresent) {
                this.selectFirstAddress();
                CommonPageHelpers.sleep(1000);

                expect(this.getHeading()).toContain('Here\'s what we know so far...');
                CommonPageHelpers.clickButton('Yes');
            }
        })
    }
}
