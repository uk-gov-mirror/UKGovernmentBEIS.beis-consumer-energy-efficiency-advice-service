import {ResponseData} from "../../../shared/response-data/response-data";
import {UserJourneyType} from "../../../shared/response-data/user-journey-type";
import {BehaviourQuestionnaire} from "./behaviour-questionnaire";
import {ShowersAndBathsQuestionMetadata} from "../../questions/showers-and-baths-question/showers-and-baths-question-metadata";
import {ShowerTypeQuestionMetadata} from "../../questions/shower-type-question/shower-type-question-metadata";
import {FridgeFreezerQuestionMetadata} from "../../questions/fridge-freezer-question/fridge-freezer-question-metadata";
import {OccupantsQuestionMetadata} from "../../questions/occupants-question/occupants-question-metadata";
import {LivingRoomTemperatureQuestionMetadata} from "../../questions/living-room-temperature-question/living-room-temperature-question-metadata";

describe('BehaviourQuestionnaire', () => {

    let responseData: ResponseData;

    beforeEach(() => {
       responseData = {} as ResponseData;
    });

    it('contains the right questions for a user with journey type Calculator', () => {
        // given
        responseData.userJourneyType = UserJourneyType.Calculator;
        const expectedQuestions = [
            new ShowersAndBathsQuestionMetadata(),
            new ShowerTypeQuestionMetadata(),
            new FridgeFreezerQuestionMetadata(),
        ];

        // when
        const behaviourQuestionnaire = BehaviourQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type ReduceEnergyBills', () => {
        // given
        responseData.userJourneyType = UserJourneyType.ReduceEnergyBills;
        const expectedQuestions = [
            new ShowersAndBathsQuestionMetadata(),
            new ShowerTypeQuestionMetadata(),
            new FridgeFreezerQuestionMetadata(),
        ];

        // when
        const behaviourQuestionnaire = BehaviourQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type ReduceCarbonFootprint', () => {
        // given
        responseData.userJourneyType = UserJourneyType.ReduceCarbonFootprint;
        const expectedQuestions = [
            new ShowersAndBathsQuestionMetadata(),
            new ShowerTypeQuestionMetadata(),
            new FridgeFreezerQuestionMetadata(),
        ];

        // when
        const behaviourQuestionnaire = BehaviourQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type MakeHomeWarmer', () => {
        // given
        responseData.userJourneyType = UserJourneyType.MakeHomeWarmer;
        const expectedQuestions = [
            new LivingRoomTemperatureQuestionMetadata(),
            new OccupantsQuestionMetadata(),
            new ShowersAndBathsQuestionMetadata(),
            new ShowerTypeQuestionMetadata(),
            new FridgeFreezerQuestionMetadata(),
        ];

        // when
        const behaviourQuestionnaire = BehaviourQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type PlanHomeImprovements', () => {
        // given
        responseData.userJourneyType = UserJourneyType.PlanHomeImprovements;
        const expectedQuestions = [
            new LivingRoomTemperatureQuestionMetadata(),
            new OccupantsQuestionMetadata(),
            new ShowersAndBathsQuestionMetadata(),
            new ShowerTypeQuestionMetadata(),
            new FridgeFreezerQuestionMetadata(),
        ];

        // when
        const behaviourQuestionnaire = BehaviourQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });
});