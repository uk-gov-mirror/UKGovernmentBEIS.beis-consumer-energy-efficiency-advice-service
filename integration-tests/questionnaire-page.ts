import {by, element} from "protractor";
import {CommonPageHelpers} from "./common-page-helpers";

export class QuestionnairePage {
    hasError() {
        return element(by.className('error')).isPresent();
    }

    getHeading() {
        return element(by.className('question-heading')).getText();
    }

    clickOption(text: string) {
        const option = element(by.cssContainingText('.multiple-choice-option', text));
        option.getTagName().then((tagName: string) => {
            const clickableOption = tagName === 'button' ? option : option.element(by.tagName('button'));
            CommonPageHelpers.clickWhenClickable(clickableOption);
        });
    }

    goForwards() {
        element(by.css('.right-arrow')).click();
    }
}