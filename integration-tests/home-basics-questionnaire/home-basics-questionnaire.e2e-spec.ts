import {HomeBasicsQuestionnairePage} from "./home-basics-questionnaire.po";
import {CommonPageHelpers} from "../common-page-helpers";
import {browser, by, element} from "protractor";

describe('Home basics questionnaire', () => {
    let page: HomeBasicsQuestionnairePage;

    beforeEach(() => {
        page = new HomeBasicsQuestionnairePage();
        page.navigateTo();
    });

    afterEach(function() {
        // clear saved progress between tests
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('should display with no errors', () => {
        expect(page.hasError()).toBeFalsy();
        expect(page.getHeading()).toContain('postcode');
    });

    it('should include all core questions when EPC is unavailable', () => {
        // Sleep 1s between each question to allow for animation
        // Postcode and mini-EPC
        page.enterPostcode('nw19pq');
        expect(page.addressListIsPresent()).toBe(true);
        page.selectMyAddressIsNotListed();
        CommonPageHelpers.sleep(500);

        // Mini-EPC
        page.confirmEpcNotAvailable();

        // Tenure type
        // Not testing the page heading because this is likely to be changed completely in wordpress
        expect(element(by.css('.owner-occupancy')).isPresent()).toBe(true);
        expect(element(by.css('.private-tenancy')).isPresent()).toBe(true);
        expect(element(by.css('.social-tenancy')).isPresent()).toBe(true);
        page.clickOption('I own my own home');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Home type
        expect(page.getHeading()).toContain('type of home');
        page.clickOption('flat');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Storey count
        expect(page.getHeading()).toContain('How many floors');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Which floor
        expect(page.getHeading()).toContain('Which floor is your property');
        page.clickOption('basement');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Flat position
        expect(page.getHeading()).toContain('flat position');
        page.clickOption('1 Side Exposed');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Home age
        expect(page.getHeading()).toContain('When was your home built');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Bedrooms count
        expect(page.getHeading()).toContain('How many bedrooms');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Construction insulation
        expect(page.getHeading()).toContain('What best describes the construction');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Floor insulation
        expect(page.getHeading()).toContain('What kind of floor insulation');
        page.clickOption('None');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // The start of optional property questions
        expect(page.getHeading()).toContain('answer more questions about your property');
        CommonPageHelpers.clickButton('Yes');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Floor area
        expect(page.getHeading()).toContain('the floor area of your');
        CommonPageHelpers.clickButton('I don’t know');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Fuel type
        expect(page.getHeading()).toContain('type of fuel');
        page.clickOption('electricity');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Hot water cylinder
        expect(page.getHeading()).toContain('hot water cylinder');
        page.clickOption('Yes');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Tariff
        expect(page.getHeading()).toContain('electricity tariff');
        page.clickOption('Standard');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Length of heating on
        expect(page.getHeading()).toContain('Most days during winter I have my heating on:');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Garden accessibility
        expect(page.getHeading()).toContain('garden accessible');
        page.clickOption('No garden');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Outside space
        expect(page.getHeading()).toContain('outside space?');
        page.clickOption('Yes');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Benefits
        expect(page.getHeading()).toContain('currently receiving a form of benefit');
        page.clickOption('Yes');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Pension guarantee credit
        expect(page.getHeading()).toContain('Pension Guarantee Credit');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Other benefits
        expect(page.getHeading()).toContain('any of the following benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Other benefits contd
        expect(page.getHeading()).toContain('any of the following benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Other benefits contd
        expect(page.getHeading()).toContain('any of the following benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Child Benefit
        expect(page.getHeading()).toContain('Child Benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);
    });

    it('should include core questions but skip questions with answers obtainable from EPC', () => {
        // Sleep 1s between each question to allow for animation
        // Postcode and mini-EPC, if exists
        page.enterPostcode('nw19pq');
        page.selectAddressIfApplicable();
        CommonPageHelpers.sleep(500);

        // Mini-EPC
        page.confirmEpcIfApplicable();

        // Tenure type
        // Not testing the page heading because this is likely to be changed completely in wordpress
        expect(element(by.css('.owner-occupancy')).isPresent()).toBe(true);
        expect(element(by.css('.private-tenancy')).isPresent()).toBe(true);
        expect(element(by.css('.social-tenancy')).isPresent()).toBe(true);
        page.clickOption('I own my own home');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // House Storey count
        expect(page.getHeading()).toContain('How many floors');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Construction insulation
        expect(page.getHeading()).toContain('What best describes the construction');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Floor insulation
        expect(page.getHeading()).toContain('What kind of floor insulation');
        page.clickOption('None');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Fuel type
        expect(page.getHeading()).toContain('type of fuel');
        page.clickOption('electricity');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Hot water cylinder
        expect(page.getHeading()).toContain('hot water cylinder');
        page.clickOption('Yes');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Tariff
        expect(page.getHeading()).toContain('electricity tariff');
        page.clickOption('Standard');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Length of heating on
        expect(page.getHeading()).toContain('Most days during winter I have my heating on:');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Garden accessibility
        expect(page.getHeading()).toContain('garden accessible');
        page.clickOption('No garden');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Outside space
        expect(page.getHeading()).toContain('outside space?');
        page.clickOption('Yes');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Benefits
        expect(page.getHeading()).toContain('currently receiving a form of benefit');
        page.clickOption('Yes');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Pension guarantee credit
        expect(page.getHeading()).toContain('Pension Guarantee Credit');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Other benefits
        expect(page.getHeading()).toContain('any of the following benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Other benefits contd
        expect(page.getHeading()).toContain('any of the following benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Other benefits contd
        expect(page.getHeading()).toContain('any of the following benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);

        // Child Benefit
        expect(page.getHeading()).toContain('Child Benefits');
        page.clickOption('No');
        page.goForwards();
        CommonPageHelpers.sleep(500);
    });
});
