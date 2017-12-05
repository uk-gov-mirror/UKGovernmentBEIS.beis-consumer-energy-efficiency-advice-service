import {browser, by, element, ElementFinder, protractor} from "protractor";

export class CommonPageHelpers {

    private static readonly MAXIMUM_WAITING_TIME_IN_SECONDS = 5000;

    static clickButton(text: string) {
        let button = element(by.partialButtonText(text));
        CommonPageHelpers.clickWhenClickable(button);
    }

    static clickWhenClickable(e: ElementFinder) {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(e), this.MAXIMUM_WAITING_TIME_IN_SECONDS);
        e.click();
    }

    static sleep(ms: number) {
        browser.sleep(ms);
    }

    static waitUntilElementIsVisible(e: ElementFinder) {
        browser.wait(protractor.ExpectedConditions.visibilityOf(e), CommonPageHelpers.MAXIMUM_WAITING_TIME_IN_SECONDS);
    }
}