import {browser, by, element} from "protractor";

export class BehaviourQuestionnairePage {
    navigateTo() {
        return browser.get('/questionnaire/behaviour');
    }

    hasError() {
        return element(by.className('error')).isPresent();
    }

    getHeading() {
        return element(by.id('question-heading')).getText();
    }
}
