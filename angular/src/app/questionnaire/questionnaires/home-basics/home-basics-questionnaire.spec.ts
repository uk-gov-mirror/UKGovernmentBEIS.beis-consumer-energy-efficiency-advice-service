import {ResponseData} from "../../../shared/response-data/response-data";
import {UserJourneyType} from "../../../shared/response-data/user-journey-type";
import {HomeBasicsQuestionnaire} from "./home-basics-questionnaire";
import {OccupantsQuestionMetadata} from "../../questions/occupants-question/occupants-question-metadata";
import {LivingRoomTemperatureQuestionMetadata} from "../../questions/living-room-temperature-question/living-room-temperature-question-metadata";
import {ElectricityTariffQuestionMetadata} from "../../questions/electricity-tariff-question/electricity-tariff-question-metadata";
import {BoilerTypeQuestionMetadata} from "../../questions/boiler-type-question/boiler-type-question-metadata";
import {FuelTypeQuestionMetadata} from "../../questions/fuel-type-question/fuel-type-question-metadata";
import {BedroomsQuestionMetadata} from "../../questions/bedrooms-question/bedrooms-question-metadata";
import {StoreysQuestionMetadata} from "../../questions/storeys-question/storeys-question-metadata";
import {HomeAgeQuestionMetadata} from "../../questions/home-age-question/home-age-question-metadata";
import {FlatPositionQuestionMetadata} from "../../questions/flat-position-question/flat-position-question-metadata";
import {HomeTypeQuestionMetadata} from "../../questions/home-type-question/home-type-question-metadata";
import {ConfirmEpcQuestionMetadata} from "../../questions/confirm-epc-question/confirm-epc-question-metadata";
import {PostcodeEpcQuestionMetadata} from "../../questions/postcode-epc-question/postcode-epc-question-metadata";
import {TenureTypeQuestionMetadata} from "../../questions/tenure-type-question/tenure-type-question-metadata";
import {GrantsQuestionnaireQuestionMetadata} from "../../questions/grants-questionnaire-question/grants-questionnaire-question-metadata";

describe('HomeBasicsQuestionnaire', () => {

    let responseData: ResponseData;

    beforeEach(() => {
        responseData = {} as ResponseData;
    });

    it('contains the right questions for a user with journey type Calculator', () => {
        // given
        responseData.userJourneyType = UserJourneyType.Calculator;
        const expectedQuestions = [
            new PostcodeEpcQuestionMetadata(),
            new TenureTypeQuestionMetadata(),
            new ConfirmEpcQuestionMetadata(),
            new HomeTypeQuestionMetadata(),
            new FlatPositionQuestionMetadata(),
            new HomeAgeQuestionMetadata(),
            new StoreysQuestionMetadata(),
            new BedroomsQuestionMetadata(),
            new FuelTypeQuestionMetadata(),
            new BoilerTypeQuestionMetadata(),
            new ElectricityTariffQuestionMetadata(),
            new LivingRoomTemperatureQuestionMetadata(),
            new OccupantsQuestionMetadata(),
            new GrantsQuestionnaireQuestionMetadata()
        ];

        // when
        const behaviourQuestionnaire = HomeBasicsQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type ReduceEnergyBills', () => {
        // given
        responseData.userJourneyType = UserJourneyType.ReduceEnergyBills;
        const expectedQuestions = [
            new PostcodeEpcQuestionMetadata(),
            new TenureTypeQuestionMetadata(),
            new ConfirmEpcQuestionMetadata(),
            new HomeTypeQuestionMetadata(),
            new FlatPositionQuestionMetadata(),
            new HomeAgeQuestionMetadata(),
            new StoreysQuestionMetadata(),
            new BedroomsQuestionMetadata(),
            new FuelTypeQuestionMetadata(),
            new BoilerTypeQuestionMetadata(),
            new ElectricityTariffQuestionMetadata(),
            new LivingRoomTemperatureQuestionMetadata(),
            new OccupantsQuestionMetadata(),
            new GrantsQuestionnaireQuestionMetadata()
        ];

        // when
        const behaviourQuestionnaire = HomeBasicsQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type ReduceCarbonFootprint', () => {
        // given
        responseData.userJourneyType = UserJourneyType.ReduceCarbonFootprint;
        const expectedQuestions = [
            new PostcodeEpcQuestionMetadata(),
            new TenureTypeQuestionMetadata(),
            new ConfirmEpcQuestionMetadata(),
            new HomeTypeQuestionMetadata(),
            new FlatPositionQuestionMetadata(),
            new HomeAgeQuestionMetadata(),
            new StoreysQuestionMetadata(),
            new BedroomsQuestionMetadata(),
            new FuelTypeQuestionMetadata(),
            new BoilerTypeQuestionMetadata(),
            new ElectricityTariffQuestionMetadata(),
            new LivingRoomTemperatureQuestionMetadata(),
            new OccupantsQuestionMetadata(),
            new GrantsQuestionnaireQuestionMetadata()
        ];

        // when
        const behaviourQuestionnaire = HomeBasicsQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type MakeHomeWarmer', () => {
        // given
        responseData.userJourneyType = UserJourneyType.MakeHomeWarmer;
        const expectedQuestions = [
            new PostcodeEpcQuestionMetadata(),
            new TenureTypeQuestionMetadata(),
            new ConfirmEpcQuestionMetadata(),
            new HomeTypeQuestionMetadata(),
            new FlatPositionQuestionMetadata(),
            new HomeAgeQuestionMetadata(),
            new StoreysQuestionMetadata(),
            new BedroomsQuestionMetadata(),
            new FuelTypeQuestionMetadata(),
            new BoilerTypeQuestionMetadata(),
            new ElectricityTariffQuestionMetadata(),
            new GrantsQuestionnaireQuestionMetadata()
        ];

        // when
        const behaviourQuestionnaire = HomeBasicsQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });

    it('contains the right questions for a user with journey type PlanHomeImprovements', () => {
        // given
        responseData.userJourneyType = UserJourneyType.PlanHomeImprovements;
        const expectedQuestions = [
            new PostcodeEpcQuestionMetadata(),
            new TenureTypeQuestionMetadata(),
            new ConfirmEpcQuestionMetadata(),
            new HomeTypeQuestionMetadata(),
            new FlatPositionQuestionMetadata(),
            new HomeAgeQuestionMetadata(),
            new StoreysQuestionMetadata(),
            new BedroomsQuestionMetadata(),
            new FuelTypeQuestionMetadata(),
            new BoilerTypeQuestionMetadata(),
            new ElectricityTariffQuestionMetadata(),
            new GrantsQuestionnaireQuestionMetadata()
        ];

        // when
        const behaviourQuestionnaire = HomeBasicsQuestionnaire.getInstance(responseData);

        // then
        expect(behaviourQuestionnaire.getQuestions()).toEqual(expectedQuestions);
    });
});