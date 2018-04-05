import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import {PostcodeApiService} from './postcode-api-service/postcode-api.service';
import {PostcodeErrorResponse} from './model/response/postcode-error-response';
import {PostcodeDetails} from './model/postcode-details';
import {EpcApiService} from './epc-api-service/epc-api.service';

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
        return this.fetchEpcsForPostcode(postcode)
            .catch(() => this.fetchBasicPostcodeDetails(postcode));
    }

    fetchBasicPostcodeDetails(postcode: string): Observable<PostcodeDetails> {
        return this.postcodeApiService.fetchBasicPostcodeDetails(postcode)
            .map(postcodeResponse => {
                return {
                    postcode: postcode,
                    allEpcsForPostcode: [],
                    localAuthorityCode: postcodeResponse.result.codes.admin_district
                };
            })
            .catch((postcodeApiError) =>
                PostcodeEpcService.handlePostcodeApiError(postcodeApiError, postcode));
    }

    private fetchEpcsForPostcode(postcode: string): Observable<PostcodeDetails> {
        return this.epcApiService.getEpcsForPostcode(postcode)
            .switchMap(epcs => Observable.of(new PostcodeDetails(postcode, epcs)))
            .catch(() => this.fetchBasicPostcodeDetails(postcode));
    }

    private static handlePostcodeApiError(err: PostcodeErrorResponse, postcode: string): Observable<PostcodeDetails> {
        const isPostcodeNotFoundResponse: boolean = err.status === PostcodeApiService.postcodeNotFoundStatus;
        if (isPostcodeNotFoundResponse) {
            return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
        }
        return Observable.throw(`Error when fetching details for postcode "${ postcode }"`);
    }
}
