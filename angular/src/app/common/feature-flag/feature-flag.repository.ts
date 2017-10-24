import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {Observable} from 'rxjs/Observable';
import {FeatureFlags} from './feature-flags';
import {FeatureFlagResponse} from './feature-flag-response';

@Injectable()
export class FeatureFlagRepository {
    private static readonly featureFlagsEndpoint = 'wp/v2/feature_flag';

    private featureFlags: Observable<FeatureFlags>;

    constructor(
        private http: HttpClient,
        private wordpressApiService: WordpressApiService
    ) {
    }

    fetchFeatureFlags(): void {
        const url = this.wordpressApiService.getFullApiEndpoint(FeatureFlagRepository.featureFlagsEndpoint);
        const featureflagResponses: Observable<FeatureFlagResponse[]> = this.http.get(url);
        const featureFlags = featureflagResponses.map(featureFlags => new FeatureFlags(featureFlags));
        this.featureFlags = featureFlags.share();
    }

    getFeatureFlagsAsObservable(): Observable<FeatureFlags> {
        return this.featureFlags;
    }
}