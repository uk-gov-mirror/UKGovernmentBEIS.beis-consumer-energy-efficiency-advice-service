import {Component, OnInit} from "@angular/core";
import {EnergyCalculationApiService} from "../shared/energy-calculation-api-service/energy-calculation-api-service";
import {ResponseData} from "../shared/response-data/response-data";
import {RdSapInput} from "../shared/energy-calculation-api-service/request/rdsap-input";
import {EnergySavingRecommendation} from "../shared/recommendation-card/energy-saving-recommendation";
import {EnergyCalculationResponse} from "../shared/energy-calculation-api-service/response/energy-calculation-response";
import {EnergyCalculations} from "./potentials/energy-calculations";
import {LocalAuthorityService} from "../shared/local-authority-service/local-authority.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import keys from "lodash-es/keys";
import orderBy from "lodash-es/orderBy";
import sumBy from "lodash-es/sumBy";
import {WordpressPage} from "../shared/wordpress-pages-service/wordpress-page";
import {QuestionnaireService} from "../questionnaire/questionnaire.service";
import {GrantsEligibilityService} from "../shared/grants-eligibility/grants-eligibility.service";
import {GrantViewModel} from "../shared/grant/grant-view-model";
import {MeasureMetadataResponse} from "../shared/recommendation-service/measure-metadata-response";
import {MeasureService} from "../shared/recommendation-service/measure.service";
import {LocalAuthority} from "../shared/local-authority-service/local-authority";

@Component({
    selector: 'app-results-page',
    templateUrl: './results-page.component.html',
    styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {

    availableGrants: GrantViewModel[];

    recommendations: EnergySavingRecommendation[];
    displayedRecommendations: number = 4;
    energyCalculations: EnergyCalculations;
    localAuthorityName: string;
    measureMetadataResponses: MeasureMetadataResponse[];
    featuredPages: WordpressPage[] = [];

    isLoading: boolean = true;
    isError: boolean = false;

    private energyCalculationResponse: EnergyCalculationResponse;

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private localAuthorityService: LocalAuthorityService,
                private measureService: MeasureService,
                private questionnaireService: QuestionnaireService,
                private grantsEligibilityService: GrantsEligibilityService
    ) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode),
            this.measureService.fetchMeasureDetails(),
            this.grantsEligibilityService.getApplicableGrants()
        )
            .subscribe(
                ([energyCalculation, localAuthority, recommendations, applicableGrants]) => {
                    this.handleEnergyCalculationResponse(energyCalculation);
                    this.handleLocalAuthorityDetails(localAuthority);
                    this.handleMeasureResponses(recommendations);
                    this.handleGrantsResponses(applicableGrants);
                },
                (err) => this.displayErrorMessage(err),
                () => this.onLoadingComplete()
            );
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

    private handleLocalAuthorityDetails(localAuthority: LocalAuthority) {
        this.localAuthorityName = localAuthority.name;
    }

    private handleMeasureResponses(responses: MeasureMetadataResponse[]) {
        this.measureMetadataResponses = responses;
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
        const allRecommendations = keys(this.energyCalculationResponse.measures)
            .map(measureCode => {
                const recommendationMetadata: MeasureMetadataResponse = this.measureMetadataResponses
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.rdsap_measure_code === measureCode);
                if (!recommendationMetadata) {
                    console.error(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                this.addLinkedPagesIfNotAlreadyFeatured(recommendationMetadata);
                return EnergySavingRecommendation.fromResponseData(
                    this.energyCalculationResponse.measures[measureCode],
                    recommendationMetadata,
                    MeasureService.measureIcons[measureCode]
                )
            })
            .filter(measure => measure);
        this.recommendations = orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc']);
        const potentialEnergyBillSavingPoundsPerYear = sumBy(
            this.recommendations,
            recommendation => recommendation.costSavingPoundsPerYear
        );
        this.energyCalculations = new EnergyCalculations(this.energyCalculationResponse, potentialEnergyBillSavingPoundsPerYear);
        this.isLoading = false;
    }

    private addLinkedPagesIfNotAlreadyFeatured(recommendationMetadata: MeasureMetadataResponse) {
        if (recommendationMetadata.acf.linked_pages && recommendationMetadata.acf.linked_pages.length > 0) {
            recommendationMetadata.acf.linked_pages.forEach(linkedPage => {
                const linkedWordpressPage = new WordpressPage({link: linkedPage.post_name, title: {rendered: linkedPage.post_title}});
                if (!this.featuredPages.find(page => page.route === linkedWordpressPage.route)) {
                    this.featuredPages.push(linkedWordpressPage);
                }
            });
        }
    }
}
