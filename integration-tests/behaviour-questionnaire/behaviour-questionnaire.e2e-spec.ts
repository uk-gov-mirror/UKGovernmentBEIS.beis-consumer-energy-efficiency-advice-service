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

    it('should include core questions', () => {
        // Occupants count
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many people');
    });
});
