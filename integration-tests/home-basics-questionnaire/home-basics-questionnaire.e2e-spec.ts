import {HomeBasicsQuestionnairePage} from "./home-basics-questionnaire.po";
import {CommonPageHelpers} from "../common-page-helpers";

describe('Home basics questionnaire', () => {
    let page: HomeBasicsQuestionnairePage;

    beforeEach(() => {
        page = new HomeBasicsQuestionnairePage();
        page.navigateTo();
    });

    it('should display with no errors', () => {
        expect(page.hasError()).toBeFalsy();
        expect(page.getHeading()).toContain('postcode');
    });

    fit('should include core questions', () => {
        // Sleep 1s between each question to allow for animation
        // Postcode and mini-EPC, if exists
        page.enterPostcode('nw19pq');
        page.selectAddressIfApplicable();
        CommonPageHelpers.sleep(1000);

        // Home type
        expect(page.getHeading()).toContain('own your home');
        page.clickOption('I am a tenant');
        CommonPageHelpers.sleep(1000);

        // Mini-EPC
        page.confirmEpcIfApplicable();

        // Home type
        expect(page.getHeading()).toContain('type of home');
        page.clickOption('ground floor flat');
        CommonPageHelpers.sleep(1000);

        // Flat position
        expect(page.getHeading()).toContain('its position');
        page.clickOption('1 Side Exposed');
        CommonPageHelpers.sleep(1000);

        // Home age
        expect(page.getHeading()).toContain('How old');
        page.selectFirstHomeAge();
        page.goForwards();
        CommonPageHelpers.sleep(1000);

        // Storey count
        expect(page.getHeading()).toContain('How many storeys');
        page.goForwards();

        // Bedrooms count
        expect(page.getHeading()).toContain('How many bedrooms ');
        page.goForwards();
        CommonPageHelpers.sleep(1000);

        // Fuel type
        expect(page.getHeading()).toContain('type of fuel');
        page.clickOption('electricity');
        CommonPageHelpers.sleep(1000);

        // Tariff
        expect(page.getHeading()).toContain('electricity tariff');
    })
});
