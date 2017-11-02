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

    it('should include core questions', () => {
        // Sleep 1s between each question to allow for animation
        // Postcode and mini-EPC, if exists
        page.enterPostcode('nw19pq');
        page.workThroughMiniEpcIfExists();

        // Home type
        CommonPageHelpers.sleep(2000);
        expect(page.getHeading()).toContain('type of home');
        page.clickOption('ground floor flat');

        // Flat position
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('its position');
        page.clickOption('1 Side Exposed');

        // Home age
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How old');
        page.selectFirstHomeAge();
        page.goForwards();

        // Storey count
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many storeys');
        page.goForwards();

        // Bedrooms count
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many bedrooms ');
        page.goForwards();

        // Fuel type
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('type of fuel');
        page.clickOption('electricity');

        // Tariff
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('electricity tariff');
    })
});
