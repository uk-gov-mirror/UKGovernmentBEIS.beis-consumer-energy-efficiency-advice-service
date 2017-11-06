import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/shareReplay";
import {FeatureFlags, featureFlagsFromResponses} from "./feature-flags";
import {FeatureFlagResponse} from "./feature-flag-response";

@Injectable()
export class FeatureFlagService {
    private static readonly featureFlagsEndpoint = 'acf/v3/feature_flag';
    private featureFlags: Observable<FeatureFlags>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    public fetchFeatureFlags(): Observable<FeatureFlags> {
        if (!this.featureFlags) {
            const url = this.wordpressApiService.getFullApiEndpoint(FeatureFlagService.featureFlagsEndpoint);
            const featureFlagResponses: Observable<FeatureFlagResponse[]> = this.http.get(url);
            this.featureFlags = featureFlagResponses.map(responses => featureFlagsFromResponses(responses)).shareReplay(1);
        }
        return this.featureFlags;
    }
}
