import {async, getTestBed, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";
import {WordpressApiService} from "../../common/wordpress-api-service/wordpress-api-service";
import {RecommendationService} from './recommendation.service';
import {RecommendationMetadataResponse} from './recommendation-metadata-response';

describe('RecommendationService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: RecommendationService;

    const mockApiResponse: RecommendationMetadataResponse[] = require('assets/test/recommendations-response.json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RecommendationService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(RecommendationService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchRecommendationDetails', () => {

        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.fetchRecommendationDetails().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            actualResponse.then((recommendationsResponse) => {
                expect(recommendationsResponse).toEqual(mockApiResponse);
            });
            httpMock.verify();
        }));

        it('does not call API on second call', async(() => {
            // given
            const firstRequest = service.fetchRecommendationDetails().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            //when
            firstRequest.then(() => {
                service.fetchRecommendationDetails().toPromise();

                //then
                httpMock.verify();
            });
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.fetchRecommendationDetails().toPromise();
            httpMock.expectOne(matchesExpectedRequest)
                .error(
                    new ErrorEvent('mock network error'),
                    {
                        status: expectedStatus,
                        statusText: expectedStatusText
                    }
                );

            // then
            actualResponse.catch((errorResponse) => {
                expect(errorResponse.statusText).toBe(expectedStatusText);
                expect(errorResponse.status).toBe(expectedStatus);
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl = request.urlWithParams === 'acf/v3/recommendation?per_page=1000';
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});