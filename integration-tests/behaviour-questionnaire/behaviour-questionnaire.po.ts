import {browser} from "protractor";
import {QuestionnairePage} from "../questionnaire-page";

export class BehaviourQuestionnairePage extends QuestionnairePage{
    navigateTo() {
        return browser.get('/questionnaire/behaviour');
    }
}
