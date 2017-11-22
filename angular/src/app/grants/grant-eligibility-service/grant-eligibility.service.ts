import {Injectable} from "@angular/core";
import {ResponseData} from "../../shared/response-data/response-data";
import {GrantEligibility} from "./grant-eligibility";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import {GrantViewModel} from "../model/grant-view-model";
import {NationalGrantCalculator} from "../national-grant-calculator/national-grant-calculator";
import {LocalAuthorityGrantViewModel} from "../model/local-authority-grant-view-model";
import {NationalGrantViewModel} from "../model/national-grant-view-model";
import isEqual from "lodash-es/isEqual";
import clone from "lodash-es/clone";
import {NationalGrantCalculatorFactory} from "../national-grant-calculator/national-grant-calculator-factory";
import {NationalGrantsContentService} from "../national-grants-content-service/national-grants-content.service";
import {NationalGrantContent} from "../national-grants-content-service/national-grants-content";

@Injectable()
export class GrantEligibilityService {

    private cachedResponseData: ResponseData;
    private cachedApplicableGrants: Observable<GrantViewModel[]>;

    constructor(private responseData: ResponseData,
                private localAuthorityService: LocalAuthorityService,
                private nationalGrantsService: NationalGrantsContentService,
                private nationalGrantMetadataFactory: NationalGrantCalculatorFactory) {
    }

    getApplicableGrants(): Observable<GrantViewModel[]> {
        if (!isEqual(this.responseData, this.cachedResponseData) || !this.cachedApplicableGrants) {
            this.cachedResponseData = clone(this.responseData);
            this.cachedApplicableGrants = Observable.forkJoin(
                this.getEligibleNationalGrantViewModels(),
                this.getLocalAuthorityGrantViewModels()
            )
                .map(([nationalGrants, localGrants]) => nationalGrants.concat(localGrants)).shareReplay(1);
        }
        return this.cachedApplicableGrants;
    }

    private getEligibleNationalGrantViewModels(): Observable<NationalGrantViewModel[]> {
        return this.nationalGrantsService.fetchNationalGrants()
            .mergeMap(nationalGrants => this.getAllNationalGrantViewModels(nationalGrants)
                .map(grantViewModels => grantViewModels
                    .filter(grantViewModel => !!grantViewModel && GrantEligibilityService.isEligible(grantViewModel))
                )
            );
    }

    private getAllNationalGrantViewModels(grantsContent: NationalGrantContent[]): Observable<NationalGrantViewModel[]> {
        return Observable.forkJoin(this.nationalGrantMetadataFactory.nationalGrants
            .map(grantMetadata => this.getGrantViewModel(grantMetadata, grantsContent)));
    }

    private getGrantViewModel(grantCalculator: NationalGrantCalculator,
                              grantsContent: NationalGrantContent[]): Observable<NationalGrantViewModel> {
        const grantResponse = grantsContent.find(grant => grant.slug === grantCalculator.grantId);
        if (!grantResponse) {
            console.error(`No grant info found in wordpress for grant with slug "${ grantCalculator.grantId }"`);
            return Observable.of(null);
        }
        return Observable.forkJoin(
            grantCalculator.getEligibility(this.responseData),
            grantCalculator.getAnnualPaymentPounds(this.responseData)
        )
            .map(([eligibility, annualPaymentPounds]) =>
                new NationalGrantViewModel(grantResponse, eligibility, annualPaymentPounds));
    }

    private static isEligible(grantViewModel: GrantViewModel) {
        return grantViewModel.eligibility === GrantEligibility.LikelyEligible ||
            grantViewModel.eligibility === GrantEligibility.MayBeEligible;
    }

    private getLocalAuthorityGrantViewModels(): Observable<LocalAuthorityGrantViewModel[]> {
        return this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
            .map(response => response.grants);
    }
}