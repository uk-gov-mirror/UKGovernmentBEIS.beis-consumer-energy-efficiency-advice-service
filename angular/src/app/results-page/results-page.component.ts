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
import {RecommendationService} from "../shared/recommendation-service/recommendation.service";
import {RecommendationMetadataResponse} from "../shared/recommendation-service/recommendation-metadata-response";
import {WordpressPage} from "../shared/wordpress-pages-service/wordpress-page";
import {QuestionnaireService} from "../questionnaire/questionnaire.service";
import {GrantsEligibilityService} from "../shared/grants-eligibility/grants-eligibility.service";
import {GrantViewModel} from "../shared/grant/grant-view-model";

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
    recommendationMetadataResponses: RecommendationMetadataResponse[];
    featuredPages: WordpressPage[] = [];

    isLoading: boolean = true;
    isError: boolean = false;

    private energyCalculationResponse: EnergyCalculationResponse;

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private localAuthorityService: LocalAuthorityService,
                private recommendationService: RecommendationService,
                private questionnaireService: QuestionnaireService,
                private grantsEligibilityService: GrantsEligibilityService
    ) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.localAuthorityService.fetchLocalAuthorityName(this.responseData.localAuthorityCode),
            this.recommendationService.fetchRecommendationDetails(),
            this.grantsEligibilityService.getApplicableGrants()
        )
            .subscribe(
                ([energyCalculation, localAuthorityName, recommendations, applicableGrants]) => {
                    this.handleEnergyCalculationResponse(energyCalculation);
                    this.handleLocalAuthorityName(localAuthorityName);
                    this.handleRecommendationResponses(recommendations);
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

    private handleLocalAuthorityName(name: string) {
        this.localAuthorityName = name;
    }

    private handleRecommendationResponses(responses: RecommendationMetadataResponse[]) {
        this.recommendationMetadataResponses = responses;
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
                const recommendationMetadata: RecommendationMetadataResponse = this.recommendationMetadataResponses
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.rdsap_measure_code === measureCode);
                if (!recommendationMetadata) {
                    console.error(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                this.addLinkedPagesIfNotAlreadyFeatured(recommendationMetadata);
                return EnergySavingRecommendation.fromResponseData(
                    this.energyCalculationResponse.measures[measureCode],
                    recommendationMetadata,
                    RecommendationService.recommendationIcons[measureCode]
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

    private addLinkedPagesIfNotAlreadyFeatured(recommendationMetadata: RecommendationMetadataResponse) {
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
