import {browser, by, element, protractor} from "protractor";
import {CommonPageHelpers} from "../common-page-helpers";
import {QuestionnairePage} from "../questionnaire-page";

export class HomeBasicsQuestionnairePage extends QuestionnairePage {

    navigateTo() {
        return browser.get('/js/energy-efficiency/questionnaire/home-basics');
    }

    selectFirstHomeAge() {
        element(by.css('app-home-age-question .home-age-option:first-child')).click();
    }
}
