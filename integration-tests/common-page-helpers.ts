import {browser, by, element} from "protractor";

export class CommonPageHelpers {
    static clickButton(text: string) {
        element(by.partialButtonText(text)).click();
    }

    static sleep(ms: number) {
        browser.sleep(ms);
    }
}