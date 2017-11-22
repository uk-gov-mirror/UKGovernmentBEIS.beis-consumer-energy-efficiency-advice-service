import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {NationalGrantContent} from "./national-grants-content";

@Injectable()
export class NationalGrantsContentService {
    private static readonly nationalGrantsEndpoint = 'angular-theme/v1/national-grants';
    private nationalGrants: Observable<NationalGrantContent[]>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchNationalGrants(): Observable<NationalGrantContent[]> {
        if (!this.nationalGrants) {
            this.nationalGrants = this.http.get(this.wordpressApiService.getFullApiEndpoint(NationalGrantsContentService.nationalGrantsEndpoint))
                .shareReplay(1);
        }
        return this.nationalGrants;
    }
}
