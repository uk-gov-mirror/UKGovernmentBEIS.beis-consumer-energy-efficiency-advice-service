import {async, getTestBed, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";
import "rxjs/add/operator/toPromise";
import {IncomeThresholdService} from "./income-threshold.service";
import {WordpressApiService} from "../../../../../shared/wordpress-api-service/wordpress-api-service";

describe('IncomeThresholdService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: IncomeThresholdService;

    const mockApiResponse = require('assets/test/income-thresholds.json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IncomeThresholdService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(IncomeThresholdService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchIncomeThresholds', () => {
        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.fetchIncomeThresholds().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            // match data in assets/test/income-thresholds.json
            actualResponse.then((response) => {
                expect(response['tax-credits'].singleClaim.zeroChildren).toEqual(13200);
                expect(response['universal-credit'].jointClaim.threeChildren).toEqual(2700);
            });
            httpMock.verify();
        }));

        it('does not call API on second call', async(() => {
            // given
            const firstRequest = service.fetchIncomeThresholds().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            //when
            firstRequest.then(() => {
                service.fetchIncomeThresholds().toPromise();

                //then
                httpMock.verify();
            });
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.fetchIncomeThresholds().toPromise();
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
    });

    function matchesExpectedRequest(request: HttpRequest<any>): boolean {
        const matchesExpectedMethod = request.method === 'GET';
        const matchesExpectedUrl = request.urlWithParams === 'acf/v3/income_threshold';
        return matchesExpectedMethod && matchesExpectedUrl;
    }
});