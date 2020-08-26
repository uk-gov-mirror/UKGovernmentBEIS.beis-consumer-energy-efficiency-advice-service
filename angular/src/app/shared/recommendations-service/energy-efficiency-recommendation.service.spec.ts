import {EnergyEfficiencyRecommendationService} from "./energy-efficiency-recommendation.service";
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";

describe('EnergyEfficiencyRecommendationService', () => {
    const MINIMUM_BEFORE_ROUNDING = 5;
    const MAXIMUM_BEFORE_ROUNDING = 10;
    const SMALL_VALUE = 0.4;

    describe('#getSavingDisplay', () => {
        it('should get display value correctly', () => {
            // given
            const recommendation = getRecommendationWithCostSaving(3, 12);
            // when
            const savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(recommendation, false);

            // then
            expect(savingDisplay).toBe('£3 – £10');
        });

        it('should display a range if rounded maximum value is different from rounded minimum value', () => {
            // given
            const recommendation = getRecommendationWithCostSaving(MINIMUM_BEFORE_ROUNDING, MAXIMUM_BEFORE_ROUNDING);
            // when
            const savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(recommendation, false);

            // then
            expect(savingDisplay).toBe('£5 – £10');
        });

        it('should display a value if rounded maximum value is the same as rounded minimum value', () => {
            // given
            const recommendation = getRecommendationWithCostSaving(5, 7);
            // when
            const savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(recommendation, false);

            // then
            expect(savingDisplay).toBe('£5');
        });

        it('should display a dash if value is smaller than 1', () => {
            // given
            const recommendation = getRecommendationWithCostSaving(SMALL_VALUE, SMALL_VALUE);
            // when
            const savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(recommendation, false);

            // then
            expect(savingDisplay).toBe('-');
        });

        it('should not display rounded minimum as a dash when a range is displayed', () => {
            // given
            const recommendation = getRecommendationWithCostSaving(SMALL_VALUE, MAXIMUM_BEFORE_ROUNDING);
            // when
            const savingDisplay = EnergyEfficiencyRecommendationService.getSavingDisplay(recommendation, false);

            // then
            expect(savingDisplay).toBe('£0 – £10');
        });
    });

    function getRecommendationWithCostSaving(
        minimumCostSavingPoundsPerYear: number, maximumCostSavingPoundsPerYear
    ): EnergyEfficiencyRecommendation {
        return {
            lifetimeYears: 40,
            costSavingPoundsPerYear: 10,
            minimumCostSavingPoundsPerYear: minimumCostSavingPoundsPerYear,
            maximumCostSavingPoundsPerYear: maximumCostSavingPoundsPerYear,
            energySavingKwhPerYear: 5,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Cylinder insulation',
            summary: 'No description available',
            whatItIs: '',
            isItRightForMe: '',
            tags: EnergyEfficiencyRecommendationTag.LongerTerm | EnergyEfficiencyRecommendationTag.Grant,
            grant: null,
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
            trustMarkTradeCodes: [],
            installationCost: {estimatedInvestment: 20}
        };
    }
});
