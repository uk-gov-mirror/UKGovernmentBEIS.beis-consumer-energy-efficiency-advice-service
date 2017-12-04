import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {NationalGrantContent} from "./national-grants-content";

@Injectable()
export class NationalGrantsContentService {
    private static readonly nationalGrantsEndpoint = 'angular-theme/v1/national-grants';
    private nationalGrantsContent: Observable<NationalGrantContent[]>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchNationalGrantsContent(): Observable<NationalGrantContent[]> {
        if (!this.nationalGrantsContent) {
            this.nationalGrantsContent = this.http.get(this.wordpressApiService.getFullApiEndpoint(NationalGrantsContentService.nationalGrantsEndpoint))
                .shareReplay(1);
        }
        return this.nationalGrantsContent;
    }

    static getContentForGrant(grantsContent: NationalGrantContent[], grantId: string) {
        const grantContent = grantsContent.find(grant => grant.slug === grantId);
        if (!grantContent) {
            console.warn(`No content found for grant with id "${grantId}"`);
            return null;
        }
        return grantContent;
    }
}
