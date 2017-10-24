import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import {FeatureFlags} from './feature-flags';
import {FeatureFlagResponse} from './feature-flag-response';

@Injectable()
export class FeatureFlagService {
    private static readonly featureFlagsEndpoint = 'wp/v2/feature_flag';
    private readonly featureFlags: Observable<FeatureFlags>;

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
        const url = this.wordpressApiService.getFullApiEndpoint(FeatureFlagService.featureFlagsEndpoint);
        const featureflagResponses: Observable<FeatureFlagResponse[]> = this.http.get(url);
        this.featureFlags = featureflagResponses.map(featureFlags => new FeatureFlags(featureFlags)).shareReplay(1);
    }

    public fetchFeatureFlags(): Observable<FeatureFlags> {
        return this.featureFlags;
    }
}
