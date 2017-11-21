import {Component, OnInit} from "@angular/core";
import {EnergyCalculationApiService} from "../../shared/energy-calculation-api-service/energy-calculation-api-service";
import {ResponseData} from "../../shared/response-data/response-data";
import {RdSapInput} from "../../shared/energy-calculation-api-service/request/rdsap-input";
import {EnergyCalculationResponse} from "../../shared/energy-calculation-api-service/response/energy-calculation-response";
import {EnergyCalculations} from "./energy-calculations";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import keys from "lodash-es/keys";
import orderBy from "lodash-es/orderBy";
import sumBy from "lodash-es/sumBy";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {MeasureContent} from "../../shared/energy-saving-measure-content-service/measure-content";
import {EnergySavingMeasureContentService} from "../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation-card/energy-efficiency-recommendation";
import {concat} from "lodash-es";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";

@Component({
    selector: 'app-energy-efficiency-results-page',
    templateUrl: './energy-efficiency-results.component.html',
    styleUrls: ['./energy-efficiency-results.component.scss']
})
export class EnergyEfficiencyResultsComponent implements OnInit {

    private static RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED: number = 5;

    availableGrants: GrantViewModel[];
    localGrants: GrantViewModel[];
    recommendations: EnergyEfficiencyRecommendation[] = [];
    displayedRecommendations: number = EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED;
    energyCalculations: EnergyCalculations;
    measuresContent: MeasureContent[];
    localAuthorityName: string;

    isLoading: boolean = true;
    isError: boolean = false;

    private energyCalculationResponse: EnergyCalculationResponse;

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private measureService: EnergySavingMeasureContentService,
                private questionnaireService: QuestionnaireService,
                private grantsEligibilityService: GrantEligibilityService,
                private localAuthorityService: LocalAuthorityService) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.measureService.fetchMeasureDetails(),
            this.grantsEligibilityService.getApplicableGrants(),
            this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
        )
            .subscribe(
                ([energyCalculation, recommendations, applicableGrants, localAuthority]) => {
                    this.handleEnergyCalculationResponse(energyCalculation);
                    this.handleMeasureResponses(recommendations);
                    this.handleGrantsResponses(applicableGrants);
                    this.handleLocalAuthorityResponse(localAuthority);
                },
                (err) => this.displayErrorMessage(err),
                () => this.onLoadingComplete()
            );
    }

    toggleDisplayAllRecommendations(): void {
        const canDisplayMoreRecommendations = this.recommendations.length > this.displayedRecommendations;
        this.displayedRecommendations = canDisplayMoreRecommendations ?
            this.recommendations.length :
            EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED;
    }

    getExpandRecommendationsListButtonText(): string {
        const extraRecommendationsAvailable = this.recommendations.length - this.displayedRecommendations;
        if (extraRecommendationsAvailable > 1) {
            return `There are ${extraRecommendationsAvailable} more recommendations available. See all ▼`;
        } else if (extraRecommendationsAvailable === 1) {
            return 'There is 1 more recommendation available. See all ▼';
        } else {
            return 'Show fewer ▲';
        }
    }

    shouldDisplayExpandRecommendationsListButton(): boolean {
        return this.recommendations.length > EnergyEfficiencyResultsComponent.RECOMMENDATIONS_TO_DISPLAY_WHEN_MINIMISED;
    }

    getTotalInvestment(): number {
        return sumBy(this.recommendations.slice(0, this.displayedRecommendations), rec => rec.investmentPounds);
    }

    getTotalSavings(): number {
        return sumBy(this.recommendations.slice(0, this.displayedRecommendations), rec => rec.costSavingPoundsPerYear);
    }

    behaviourQuestionnaireComplete(): boolean {
        return this.questionnaireService.isComplete('behaviour');
    }

    private handleEnergyCalculationResponse(response: EnergyCalculationResponse) {
        this.energyCalculationResponse = response;
    }

    private handleMeasureResponses(responses: MeasureContent[]) {
        this.measuresContent = responses;
    }

    private handleLocalAuthorityResponse(response: LocalAuthority) {
        this.localAuthorityName = response.name;
    }

    private handleGrantsResponses(grants: GrantViewModel[]) {
        this.availableGrants = grants;
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private onLoadingComplete() {
        this.recommendations = EnergyEfficiencyResultsComponent.getAllRecommendationsOrderedBySaving(
            this.energyCalculationResponse,
            this.availableGrants,
            this.measuresContent
        );
        this.energyCalculations = EnergyEfficiencyResultsComponent.getEnergyCalculations(
            this.energyCalculationResponse,
            this.recommendations
        );
        this.localGrants = this.availableGrants.filter(grant => {
            return grant.constructor.name === 'LocalAuthorityGrantViewModel';
        });
        this.isLoading = false;
    }

    private static getAllRecommendationsOrderedBySaving(energyCalculationResponse: EnergyCalculationResponse,
                                                        availableGrants: GrantViewModel[],
                                                        measuresContent: MeasureContent[]): EnergyEfficiencyRecommendation[] {
        const homeImprovementRecommendations = EnergyEfficiencyResultsComponent
            .getHomeImprovementRecommendations(energyCalculationResponse, measuresContent);
        const grantRecommendations = EnergyEfficiencyResultsComponent.getGrantRecommendations(availableGrants);
        const allRecommendations = concat(homeImprovementRecommendations, grantRecommendations);
        return orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc']);
    }

    private static getEnergyCalculations(energyCalculationResponse: EnergyCalculationResponse,
                                         recommendations: EnergyEfficiencyRecommendation[]): EnergyCalculations {
        const potentialEnergyBillSavingPoundsPerYear = sumBy(
            recommendations,
            recommendation => recommendation.costSavingPoundsPerYear
        );
        return new EnergyCalculations(energyCalculationResponse, potentialEnergyBillSavingPoundsPerYear);
    }

    private static getHomeImprovementRecommendations(energyCalculationResponse: EnergyCalculationResponse,
                                                     measuresContent: MeasureContent[]): EnergyEfficiencyRecommendation[] {
        return keys(energyCalculationResponse.measures)
            .map(measureCode => {
                const recommendationMetadata: MeasureContent = measuresContent
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.rdsap_measure_code === measureCode);
                if (!recommendationMetadata) {
                    console.error(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                return EnergyEfficiencyRecommendation.fromMeasure(
                    energyCalculationResponse.measures[measureCode],
                    recommendationMetadata,
                    EnergySavingMeasureContentService.measureIcons[measureCode]
                )
            })
            .filter(measure => measure);
    }

    private static getGrantRecommendations(grants: GrantViewModel[]): EnergyEfficiencyRecommendation[] {
        return grants
            .filter(grant => grant.shouldDisplayWithoutMeasures)
            .map(grant => EnergyEfficiencyRecommendation.fromGrant(grant, 'icon-grant'));
    }
}
