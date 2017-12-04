import {browser, by, element, protractor} from "protractor";
import {CommonPageHelpers} from "../common-page-helpers";
import {QuestionnairePage} from "../questionnaire-page";

export class HomeBasicsQuestionnairePage extends QuestionnairePage {
    private miniEpcEnabled: boolean;

    navigateTo() {
        return browser.get('/js/energy-efficiency/questionnaire/home-basics');
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

    selectAddressIfApplicable() {
        this.addressListIsPresent().then(isPresent => {
            this.miniEpcEnabled = isPresent;
            if (isPresent) {
                this.selectFirstAddress();
            }
        });
    }

    confirmEpcIfApplicable() {
        // This must be checked in the control flow, as this.miniEpcEnabled is set asynchronously in #selectAddressIfApplicable.
        return browser.controlFlow().execute(() => {
            if (this.miniEpcEnabled) {
                expect(this.getHeading()).toContain('Here\'s what we know so far...');
                CommonPageHelpers.clickButton('get a few more details');
                CommonPageHelpers.sleep(1000);
            }
        });
    }
}
