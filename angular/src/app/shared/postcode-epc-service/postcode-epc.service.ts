import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import head from 'lodash-es/head';

import {PostcodeApiService} from './postcode-api-service/postcode-api.service';
import {PostcodeErrorResponse} from './model/response/postcode-error-response';
import {PostcodeDetails} from './model/postcode-details';
import {EpcApiService} from './epc-api-service/epc-api.service';
import {Epc} from "./model/epc";

@Injectable()
export class PostcodeEpcService {

    static readonly POSTCODE_NOT_FOUND: string = 'POSTCODE_NOT_FOUND';
    private static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;

    constructor(private epcApiService: EpcApiService,
                private postcodeApiService: PostcodeApiService, ) {
    }

    static isValidPostcode(postcode: string) {
        return PostcodeEpcService.POSTCODE_REGEXP.test(postcode);
    }

    fetchPostcodeDetails(postcode: string): Observable<PostcodeDetails> {
        if (!PostcodeEpcService.isValidPostcode(postcode)) {
            return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
        }
        return this.fetchEpcsForPostcode(postcode);
    }

    private fetchLocalAuthorityCode(postcode: string): Observable<string> {
        return this.postcodeApiService.fetchBasicPostcodeDetails(postcode)
            .map(postcodeResponse =>  postcodeResponse.result.codes.admin_district)
            .catch((postcodeApiError) =>
                PostcodeEpcService.handlePostcodeApiError(postcodeApiError, postcode));
    }

    private getLocalAuthorityCodeFromEpcsOrPostcode(epcs: Epc[], postcode: string): Observable<string> {
        const firstEpc = head(epcs);
        if (firstEpc) {
            return Observable.of(firstEpc.localAuthorityCode);
        } else {
            return this.fetchLocalAuthorityCode(postcode);
        }
    }

    private fetchEpcsForPostcode(postcode: string): Observable<PostcodeDetails> {
        return this.epcApiService.getEpcsForPostcode(postcode)
            .flatMap(epcs =>
                this.getLocalAuthorityCodeFromEpcsOrPostcode(epcs, postcode)
                    .map(localAuthorityCode => new PostcodeDetails(postcode, epcs, localAuthorityCode))
            )
            .catch(() =>
                this.fetchLocalAuthorityCode(postcode)
                    .map(localAuthorityCode => new PostcodeDetails(postcode, null, localAuthorityCode))
            );
    }

    private static handlePostcodeApiError(err: PostcodeErrorResponse, postcode: string): Observable<string> {
        const isPostcodeNotFoundResponse: boolean = err.status === PostcodeApiService.POSTCODE_NOT_FOUND_STATUS;
        if (isPostcodeNotFoundResponse) {
            return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
        }
        return Observable.throw(`Error when fetching details for postcode "${ postcode }"`);
    }
}
