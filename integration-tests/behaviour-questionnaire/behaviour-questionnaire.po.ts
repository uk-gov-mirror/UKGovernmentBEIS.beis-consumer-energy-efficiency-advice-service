import {browser, By} from "protractor";
import {QuestionnairePage} from "../questionnaire-page";

export class BehaviourQuestionnairePage extends QuestionnairePage{
    navigateTo() {
        return browser.get('/js/questionnaire/behaviour');
    }

    selectShowerType() {
        browser.element(By.cssContainingText('option', 'I don\'t know')).click();
    }
}
