import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../../../common/wordpress-api-service/wordpress-api-service";
import {PostcodeResponse} from "../model/response/postcode/postcode-response";

@Injectable()
export class PostcodeApiService {
    private static readonly postcodeEndpoint = 'angular-theme/v1/postcode/';
    public static readonly postcodeNotFoundStatus: number = 404;
    public static readonly postcodeNotFoundMessage: string = 'Postcode not found';

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    getPostcodeDetails(postcode: string): Observable<PostcodeResponse> {
        const postcodeWithoutSpaces = postcode.replace(/ /g, '');
        const endpoint = PostcodeApiService.postcodeEndpoint + postcodeWithoutSpaces;
        return this.http.get(this.wordpressApiService.getFullApiEndpoint(endpoint));
    }
}
