import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../../../shared/wordpress-api-service/wordpress-api-service";
import {PostcodeResponse} from "../model/response/postcode/postcode-response";

@Injectable()
export class PostcodeApiService {
    private static readonly postcodeEndpoint = 'angular-theme/v1/postcode/';
    public static readonly postcodeNotFoundStatus: number = 404;
    public static readonly postcodeNotFoundMessage: string = 'Postcode not found';

    private postcodeResponses: {[postcode: string]: Observable<PostcodeResponse>} = {};

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    getPostcodeDetails(postcode: string): Observable<PostcodeResponse> {
        if (!this.postcodeResponses[postcode]) {
            const postcodeWithoutSpaces = postcode.replace(/ /g, '');
            const endpoint = PostcodeApiService.postcodeEndpoint + postcodeWithoutSpaces;
            this.postcodeResponses[postcode] = this.http.get(this.wordpressApiService.getFullApiEndpoint(endpoint))
                .shareReplay(1);
        }
        return this.postcodeResponses[postcode];
    }
}
