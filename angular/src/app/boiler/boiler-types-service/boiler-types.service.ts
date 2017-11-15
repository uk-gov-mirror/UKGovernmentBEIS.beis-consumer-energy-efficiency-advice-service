import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {BoilerType} from "./boiler-type";
import {BoilerTypeMetadataResponse} from "./boiler-type-metadata-response";

@Injectable()
export class BoilerTypesService {
    private static readonly boilerTypesEndpoint = 'acf/v3/boiler?per_page=1000';
    private boilerTypes: Observable<BoilerType[]>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchBoilerTypes(): Observable<BoilerType[]> {
        if (!this.boilerTypes) {
            this.boilerTypes = this.http
                .get(this.wordpressApiService.getFullApiEndpoint(BoilerTypesService.boilerTypesEndpoint))
                .map((response: BoilerTypeMetadataResponse[]) => response.map(metadata => BoilerType.fromMetadata(metadata)))
                .shareReplay(1);
        }
        return this.boilerTypes;
    }
}
