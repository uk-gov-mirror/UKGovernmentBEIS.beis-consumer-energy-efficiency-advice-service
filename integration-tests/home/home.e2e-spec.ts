import {HomePage} from "./home.po";
import {browser} from "protractor";

describe('Homepage', () => {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display the heading', () => {
        page.navigateTo();
        expect(page.getHeadingText()).toEqual('Impartial and independent advice to help you...');
    });

    it('should navigate to landing page when link is clicked', () => {
        page.navigateTo();
        page.clickLandingPageLink();
        expect(browser.getCurrentUrl()).toContain('/reduce-bills');
    });
});
