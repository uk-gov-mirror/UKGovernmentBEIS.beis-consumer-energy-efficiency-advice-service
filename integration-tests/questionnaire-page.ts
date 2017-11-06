import {by, element} from "protractor";

export class QuestionnairePage {
    hasError() {
        return element(by.className('error')).isPresent();
    }

    getHeading() {
        return element(by.id('question-heading')).getText();
    }

    clickOption(text: string) {
        let option = element(by.cssContainingText('.multiple-choice-option', text));
        option.getTagName().then((tagName: string) => {
            if (tagName === 'button') {
                option.click();
            } else {
                option.element(by.tagName('button')).click();
            }
        });
    }

    goForwards() {
        element(by.css('.right-arrow')).click();
    }
}