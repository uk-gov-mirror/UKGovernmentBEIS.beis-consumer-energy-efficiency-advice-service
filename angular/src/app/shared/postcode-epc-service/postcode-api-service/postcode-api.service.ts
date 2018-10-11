import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PostcodeBasicDetailsResponse} from '../model/response/postcode-basic-details-response';

@Injectable()
export class PostcodeApiService {
    public static readonly POSTCODE_NOT_FOUND_STATUS: number = 404;
    private static readonly postcodeEndpoint = 'https://postcodes.io/postcodes/';

    private postcodeResponses: {[postcode: string]: Observable<PostcodeBasicDetailsResponse>} = {};

    constructor(private http: HttpClient) {
    }

    fetchBasicPostcodeDetails(postcode: string): Observable<PostcodeBasicDetailsResponse> {
        if (!this.postcodeResponses[postcode]) {
            const postcodeWithoutSpaces = postcode.replace(/ /g, '');
            const endpoint = PostcodeApiService.postcodeEndpoint + postcodeWithoutSpaces;
            this.postcodeResponses[postcode] =
                this.http.get<PostcodeBasicDetailsResponse>(endpoint)
                .shareReplay(1);
        }
        return this.postcodeResponses[postcode];
    }
}
