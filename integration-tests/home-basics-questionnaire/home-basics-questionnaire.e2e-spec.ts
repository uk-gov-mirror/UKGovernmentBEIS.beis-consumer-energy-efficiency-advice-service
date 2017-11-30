import {HomeBasicsQuestionnairePage} from "./home-basics-questionnaire.po";
import {CommonPageHelpers} from "../common-page-helpers";
import {by, element} from "protractor";

describe('Home basics questionnaire', () => {
    let page: HomeBasicsQuestionnairePage;

    beforeEach(() => {
        page = new HomeBasicsQuestionnairePage();
        page.navigateTo();
    });

    it('should display with no errors', () => {
        expect(page.hasError()).toBeFalsy();
        expect(page.getHeading()).toContain('Here\'s what we know so far...');
    });

    it('should include core questions', () => {
        // Sleep 1s between each question to allow for animation
        // Mini-EPC
        expect(page.getHeading()).toContain('Here\'s what we know so far...');
        CommonPageHelpers.clickButton('get a few more details');
        CommonPageHelpers.sleep(1000);

        // Tenure type
        // Not testing the page heading because this is likely to be changed completely in wordpress
        expect(element(by.css('owner-occupancy-option'))).toBeTruthy();
        expect(element(by.css('private-tenancy-option'))).toBeTruthy();
        expect(element(by.css('social-tenancy-option'))).toBeTruthy();
        page.clickOption('I own my own home');
        CommonPageHelpers.sleep(1000);

        // Home type
        expect(page.getHeading()).toContain('type of home');
        page.clickOption('flat');
        CommonPageHelpers.sleep(1000);

        // Storey count
        expect(page.getHeading()).toContain('How many floors');
        page.goForwards();
        CommonPageHelpers.sleep(1000);

        // Which floor
        expect(page.getHeading()).toContain('Which floor is your property');
        page.clickOption('basement');
        CommonPageHelpers.sleep(1000);

        // Flat position
        expect(page.getHeading()).toContain('flat position');
        page.clickOption('1 Side Exposed');
        CommonPageHelpers.sleep(1000);

        // Home age
        expect(page.getHeading()).toContain('When was your home built');
        page.selectFirstHomeAge();
        page.goForwards();
        CommonPageHelpers.sleep(1000);

        // Bedrooms count
        expect(page.getHeading()).toContain('How many bedrooms');
        page.goForwards();
        CommonPageHelpers.sleep(1000);

        // The start of optional property questions
        expect(page.getHeading()).toContain('The next set of property questions are optional');
        CommonPageHelpers.clickButton('Yes');
        CommonPageHelpers.sleep(1000);

        // Floor area
        expect(page.getHeading()).toContain('What\'s the floor area of your');
        CommonPageHelpers.clickButton('I don\'t know');
        CommonPageHelpers.sleep(1000);

        // Construction insulation
        expect(page.getHeading()).toContain('What best describes the construction');
        page.goForwards();
        CommonPageHelpers.sleep(1000);

        // Garden
        expect(page.getHeading()).toContain('Is your garden accessible to digging machinery');
        CommonPageHelpers.clickButton('No garden');
        CommonPageHelpers.sleep(1000);

        // Fuel type
        expect(page.getHeading()).toContain('type of fuel');
        page.clickOption('electricity');
        CommonPageHelpers.sleep(1000);

        // Tariff
        expect(page.getHeading()).toContain('electricity tariff');
        page.clickOption('Standard');
        CommonPageHelpers.sleep(1000);

        // Heating cost
        expect(page.getHeading()).toContain('pay a month');
        page.goForwards();
        CommonPageHelpers.sleep(1000);

        // Length of heating on
        expect(page.getHeading()).toContain('How many hours');
    })
});
