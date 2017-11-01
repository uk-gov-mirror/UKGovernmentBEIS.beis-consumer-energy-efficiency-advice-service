import {LandingPage} from "./landing-page.po";
import {browser} from "protractor";

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
        page.enterPostcode('SW111AA');
        expect(browser.getCurrentUrl()).toContain('/questionnaire/home-basics');
    });
});
