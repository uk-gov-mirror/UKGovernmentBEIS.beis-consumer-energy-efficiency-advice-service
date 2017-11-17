import {Injectable} from "@angular/core";
import {ResponseData} from "../response-data/response-data";
import {GrantEligibility} from "./grant-eligibility";
import {LocalAuthorityService} from "../local-authority-service/local-authority.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";
import {GrantViewModel} from "../grant/grant-view-model";
import {NationalGrantMetadata} from "../grant/national-grant-metadata";
import {LocalAuthorityGrantViewModel} from "../grant/local-authority-grant-view-model";
import {NationalGrantViewModel} from "../grant/national-grant-view-model";
import {NationalGrantsService} from "../national-grants-service/national-grants.service";
import {NationalGrantResponse} from "../national-grants-service/national-grants-response";
import isEqual from "lodash-es/isEqual";
import clone from "lodash-es/clone";
import {NationalGrantMetadataFactory} from "../grant/national-grant-metadata-factory";

@Injectable()
export class GrantsEligibilityService {

    private cachedResponseData: ResponseData;
    private cachedApplicableGrants: Observable<GrantViewModel[]>;

    constructor(private responseData: ResponseData,
                private localAuthorityService: LocalAuthorityService,
                private nationalGrantsService: NationalGrantsService,
                private nationalGrantMetadataFactory: NationalGrantMetadataFactory) {
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
                    .filter(grantViewModel => !!grantViewModel && GrantsEligibilityService.isEligible(grantViewModel))
                )
            );
    }

    private getAllNationalGrantViewModels(grantResponses: NationalGrantResponse[]): Observable<NationalGrantViewModel[]> {
        return Observable.forkJoin(this.nationalGrantMetadataFactory.nationalGrants
            .map(grantMetadata => this.getGrantViewModel(grantMetadata, grantResponses)));
    }

    private getGrantViewModel(grantMetadata: NationalGrantMetadata,
                              grantResponses: NationalGrantResponse[]): Observable<NationalGrantViewModel> {
        const grantResponse = grantResponses.find(grant => grant.slug === grantMetadata.grantId);
        if (!grantResponse) {
            console.error(`No grant info found in wordpress for grant with slug "${ grantMetadata.grantId }"`);
            console.log(grantResponses);
            return null;
        }
        return grantMetadata.getEligibility(this.responseData)
            .map(eligiblity => new NationalGrantViewModel(grantResponse, eligiblity));
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