import {LandingPage} from "./landing-page.po";
import {browser, by, element} from "protractor";
import {CommonPageHelpers} from "../common-page-helpers";

describe('Landing page', () => {
    let page: LandingPage;

    beforeEach(() => {
        page = new LandingPage();
    });

    it('should display the heading', () => {
        page.navigateToReduceBills();
        expect(page.getHeadingText()).toEqual('Reduce your energy bills');
    });

    it('should navigate to the questionnaire when a postcode is entered', () => {
        page.navigateToReduceBills();
        page.enterPostcode('nw19pq');

        const dropDownMenu = element(by.className('address-dropdown'));
        CommonPageHelpers.waitUntilElementIsVisible(dropDownMenu);
        dropDownMenu.click();

        const dropDownOption = element.all(by.className('address-option')).last();
        dropDownOption.click();

        const goElement = element(by.partialButtonText('Go'));
        CommonPageHelpers.waitUntilElementIsVisible(goElement);
        CommonPageHelpers.clickButton('Go');

        expect(browser.getCurrentUrl()).toContain('/questionnaire/home-basics');
    });
});
