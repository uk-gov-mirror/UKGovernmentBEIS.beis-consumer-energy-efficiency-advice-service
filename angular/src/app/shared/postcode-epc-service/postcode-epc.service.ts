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
import {parseCountry} from "../../questionnaire/questions/postcode-epc-question/country";
import {PostcodeBasicDetailsResponse} from "./model/response/postcode-basic-details-response";

@Injectable()
export class PostcodeEpcService {

    static readonly POSTCODE_NOT_FOUND: string = 'POSTCODE_NOT_FOUND';
    static readonly POSTCODE_INVALID: string = 'POSTCODE_INVALID';
    private static readonly POSTCODE_REGEXP: RegExp = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;

    constructor(private epcApiService: EpcApiService,
                private postcodeApiService: PostcodeApiService, ) {
    }

    static isValidPostcode(postcode: string) {
        return PostcodeEpcService.POSTCODE_REGEXP.test(postcode);
    }

    fetchPostcodeDetails(postcode: string): Observable<PostcodeDetails> {
        if (!PostcodeEpcService.isValidPostcode(postcode)) {
            return Observable.throw(PostcodeEpcService.POSTCODE_INVALID);
        }
        return this.epcApiService.getEpcsForPostcode(postcode)
            .catch(() => Observable.of(null))
            .flatMap(
                epcs => this.postcodeApiService.fetchBasicPostcodeDetails(postcode)
                        .map(PostcodeEpcService.buildPostcodeDetailsFromPostcodeResponse(postcode, epcs))
                        .catch((postcodeApiError) => PostcodeEpcService.handlePostcodeApiError(postcodeApiError, postcode))
            );
    }

    private static buildPostcodeDetailsFromPostcodeResponse(postcode: string, epcs: Epc[]) {
        return function (postcodeResponse: PostcodeBasicDetailsResponse): PostcodeDetails {
            const localAuthority = postcodeResponse.result.codes.admin_district;
            const country = parseCountry(postcodeResponse.result.country);
            return new PostcodeDetails(postcode, epcs, localAuthority, country);
        };
    }

    private static handlePostcodeApiError(err: PostcodeErrorResponse, postcode: string): Observable<PostcodeDetails> {
        const isPostcodeNotFoundResponse: boolean = err.status === PostcodeApiService.POSTCODE_NOT_FOUND_STATUS;
        if (isPostcodeNotFoundResponse) {
            return Observable.throw(PostcodeEpcService.POSTCODE_NOT_FOUND);
        }
        return Observable.throw(`Error when fetching details for postcode "${ postcode }"`);
    }
}
