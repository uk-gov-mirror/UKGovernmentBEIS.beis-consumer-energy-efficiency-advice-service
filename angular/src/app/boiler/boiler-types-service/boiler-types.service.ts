import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {AllBoilerTypes} from "./boiler-type";
import {BoilerTypeMetadataResponse} from "./boiler-type-metadata-response";

@Injectable()
export class BoilerTypesService {
    private static readonly boilerTypesEndpoint = 'acf/v3/boiler?per_page=1000';
    private boilerTypes: Observable<AllBoilerTypes>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchBoilerTypes(): Observable<AllBoilerTypes> {
        if (!this.boilerTypes) {
            this.boilerTypes = this.http
                .get(this.wordpressApiService.getFullApiEndpoint(BoilerTypesService.boilerTypesEndpoint))
                .map((response: BoilerTypeMetadataResponse[]) => new AllBoilerTypes(response))
                .shareReplay(1);
        }
        return this.boilerTypes;
    }
}
