import {Injectable} from "@angular/core";
import {ResponseData} from "../../shared/response-data/response-data";
import {GrantEligibility} from "./grant-eligibility";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/reduce";
import isEqual from "lodash-es/isEqual";
import clone from "lodash-es/clone";
import keys from "lodash-es/keys";
import concat from "lodash-es/concat";
import {NationalGrantsContentService} from "../national-grants-content-service/national-grants-content.service";
import {NationalGrantCalculatorProvider} from "../national-grant-calculator/provider/national-grant-calculator.provider";
import {StandaloneNationalGrant} from "../model/standalone-national-grant";
import {NationalGrantForMeasure} from "../model/national-grant-for-measure";
import {EligibilityByGrant} from "./eligibility-by-grant";
import {EnergySavingMeasureResponse} from "../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import {NationalGrantContent} from "../national-grants-content-service/national-grants-content";
import {FeedInTariff} from "../national-grant-calculator/grants/feed-in-tariff/feed-in-tariff";
import {RenewableHeatIncentive} from "../national-grant-calculator/grants/renewable-heat-incentive/renewable-heat-incentive";

@Injectable()
export class GrantEligibilityService {

    private cachedResponseData: ResponseData;
    private cachedEligibilityByGrant: Observable<EligibilityByGrant>;

    constructor(private responseData: ResponseData,
                private nationalGrantsContentService: NationalGrantsContentService,
                private nationalGrantCalculatorProvider: NationalGrantCalculatorProvider) {
    }

    getEligibleGrantsForMeasure(measureCode: string, measure: EnergySavingMeasureResponse): Observable<NationalGrantForMeasure[]> {
        this.refreshEligibilityByGrantIfNecessary();
        return Observable.forkJoin(
            this.cachedEligibilityByGrant,
            this.nationalGrantsContentService.fetchNationalGrantsContent()
        )
            .map(([eligibilityForGrants, grantsContent]) => {
                const recurringPaymentGrants = GrantEligibilityService
                    .getRecurringPaymentGrantsForMeasure(measure, eligibilityForGrants, grantsContent);
                const oneOffEligibleGrants = GrantEligibilityService
                    .getOneOffPaymentGrantsForMeasure(measureCode, eligibilityForGrants, grantsContent);
                return concat(recurringPaymentGrants, oneOffEligibleGrants);
            });
    }

    getEligibleStandaloneGrants(): Observable<StandaloneNationalGrant[]> {
        this.refreshEligibilityByGrantIfNecessary();
        return Observable.forkJoin(
            this.cachedEligibilityByGrant,
            this.nationalGrantsContentService.fetchNationalGrantsContent()
        )
            .map(([eligibilityByGrant, grantsContent]) => keys(eligibilityByGrant)
                .filter(grantId => GrantEligibilityService.isEligible(eligibilityByGrant[grantId].eligibility))
                .reduce((standaloneNationalGrants, grantId) => {
                        const grantContent = NationalGrantsContentService.getContentForGrant(grantsContent, grantId);
                        if (grantContent.display_without_measures) {
                            standaloneNationalGrants.push(new StandaloneNationalGrant(
                                NationalGrantsContentService.getContentForGrant(grantsContent, grantId),
                                eligibilityByGrant[grantId].eligibility,
                                eligibilityByGrant[grantId].calculator.getStandaloneAnnualPaymentPounds(this.responseData)
                            ));
                        }
                        return standaloneNationalGrants;
                    }, []
                )
            );
    }

    private refreshEligibilityByGrantIfNecessary(): void {
        if (!isEqual(this.responseData, this.cachedResponseData) || !this.cachedEligibilityByGrant) {
            this.cachedResponseData = clone(this.responseData);
            this.cachedEligibilityByGrant = this.fetchEligibilityByGrant().shareReplay(1);
        }
    }

    private fetchEligibilityByGrant(): Observable<EligibilityByGrant> {
        const nationalGrants = this.nationalGrantCalculatorProvider.nationalGrants;
        return Observable.forkJoin(
            nationalGrants.map(nationalGrantCalculator => nationalGrantCalculator.getEligibility(this.responseData))
        )
            .map(grantsEligibility => nationalGrants
                .reduce((eligibilityByGrant, grantCalculator, index) => {
                        eligibilityByGrant[grantCalculator.grantId] = {
                            calculator: grantCalculator,
                            eligibility: grantsEligibility[index]
                        };
                        return eligibilityByGrant;
                    }, {}
                )
            )
    }

    private static getRecurringPaymentGrantsForMeasure(measure: EnergySavingMeasureResponse,
                                                       eligibilityByGrant: EligibilityByGrant,
                                                       grantsContent: NationalGrantContent[]): NationalGrantForMeasure[] {
        let recurringPaymentGrantsForMeasure: NationalGrantForMeasure[] = [];
        if (measure.FIT && measure.FIT > 0) {
            recurringPaymentGrantsForMeasure.push(new NationalGrantForMeasure(
                NationalGrantsContentService.getContentForGrant(grantsContent, FeedInTariff.GRANT_ID),
                eligibilityByGrant[FeedInTariff.GRANT_ID].eligibility,
                measure.FIT
            ));
        }
        if (measure.RHI && measure.RHI > 0) {
            recurringPaymentGrantsForMeasure.push(new NationalGrantForMeasure(
                NationalGrantsContentService.getContentForGrant(grantsContent, RenewableHeatIncentive.GRANT_ID),
                eligibilityByGrant[RenewableHeatIncentive.GRANT_ID].eligibility,
                measure.RHI
            ));
        }
        return recurringPaymentGrantsForMeasure;
    }

    private static getOneOffPaymentGrantsForMeasure(measureCode: string,
                                                    eligibilityByGrant: EligibilityByGrant,
                                                    grantsContent: NationalGrantContent[]): NationalGrantForMeasure[] {
        return keys(eligibilityByGrant)
            .filter(grantId => GrantEligibilityService.isEligible(eligibilityByGrant[grantId].eligibility))
            .reduce((oneOffPaymentGrantsForMeasure, grantId) => {
                const grantContent = NationalGrantsContentService.getContentForGrant(grantsContent, grantId);
                if (grantContent.linked_measure_codes.indexOf(measureCode) > -1) {
                    oneOffPaymentGrantsForMeasure.push(new NationalGrantForMeasure(
                        grantContent,
                        eligibilityByGrant[grantId].eligibility,
                        0
                    ));
                }
                return oneOffPaymentGrantsForMeasure;
            }, []);
    }

    private static isEligible(eligibility: GrantEligibility) {
        return eligibility === GrantEligibility.LikelyEligible ||
            eligibility === GrantEligibility.MayBeEligible;
    }
}