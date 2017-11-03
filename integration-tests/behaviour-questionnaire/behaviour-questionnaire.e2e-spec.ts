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
        expect(page.getHeading()).toContain('How many people');
    });

    it('should include behaviour questions', () => {
        // Occupants count
        expect(page.getHeading()).toContain('How many people');
        page.goForwards();

        // Number of showers
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('showers');
        page.goForwards();

        // Number of baths
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('baths');
        page.goForwards();

        // Living room temperature
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('living room');
        page.goForwards();

        // Number of fridges and freezers
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('fridges and freezers');
    });
});
