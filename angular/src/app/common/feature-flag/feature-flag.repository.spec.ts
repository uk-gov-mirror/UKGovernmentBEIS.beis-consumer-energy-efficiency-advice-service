import {TestBed, getTestBed, async} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";

import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {FeatureFlagRepository} from './feature-flag.repository';

describe('FeatureFlagRepository', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: FeatureFlagRepository;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FeatureFlagRepository,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}} ],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(FeatureFlagRepository);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchFeatureFlags', () => {

        it('should return data from the wordpress API', async(() => {
            // given
            const mockApiResponse = require('assets/test/feature-flags-response.json');

            // when
            const actualResponse = service.fetchFeatureFlags().toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(mockApiResponse);

            // then
            actualResponse.then((featureFlags) => {
                // match data in 'assets/test/feature-flags-response.json'
                expect(Object.keys(featureFlags).length).toBe(1);
                expect(featureFlags['fetch-epc-data']).toBeTruthy();
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl = request.urlWithParams === 'wp/v2/feature_flag';
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});