import {BehaviourQuestionnairePage} from "./behaviour-questionnaire.po";
import {CommonPageHelpers} from "../common-page-helpers";

describe('Behaviour questionnaire', () => {
    let page: BehaviourQuestionnairePage;

    beforeEach(() => {
        page = new BehaviourQuestionnairePage();
        page.navigateTo();
    });

    it('should display with no errors', () => {
        expect(page.hasError()).toBeFalsy();
        expect(page.getHeading()).toContain('What temperature');
    });

    it('should include behaviour questions', () => {
        // Living room temperature
        expect(page.getHeading()).toContain('What temperature');
        page.goForwards();

        // Occupants count
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many people');
        page.goForwards();

        // Number of showers and baths
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many showers and baths');
        page.goForwards();

        // Type of shower
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('What type of shower');
        page.selectShowerType();
        page.goForwards();

        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('What percentage of your washing');
        page.inputTumbleDryPercentage();

        // Number of fridges and freezers
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many fridges and freezers');
    });
});