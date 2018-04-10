import {browser, By} from "protractor";
import {QuestionnairePage} from "../questionnaire-page";

export class BehaviourQuestionnairePage extends QuestionnairePage{
    navigateTo() {
        return browser.get('/energy-efficiency/questionnaire/behaviour');
    }

    selectShowerType() {
        browser.element(By.cssContainingText('option', 'I don\'t know')).click();
    }

    inputTumbleDryPercentage() {
        browser.element(By.css('.no-tumble-dryer-button')).click();
    }
}
