import {async, getTestBed, TestBed} from "@angular/core/testing";
import "rxjs/add/operator/toPromise";

import {EpcApiService} from "./epc-api.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {JsonApiResponse} from "./model/response/json-api-response";
import {HttpRequest} from "@angular/common/http";
import {Epc} from "./model/epc";
import {EpcResponse} from "./model/response/epc-response";
import {EpcRecommendation} from "./model/response/epc-recommendation";

describe('EpcApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: EpcApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EpcApiService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(EpcApiService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getEpcsForPostcode', () => {

        const postcode = 'SW1H 0ET';

        it('returns data from the API endpoint', async(() => {
            // given
            const dummyEpcResponse = require('assets/test/dummy-epc-response.json');
            const expectedResponse: JsonApiResponse<EpcResponse> = {
                'column-names': ['dummy-column'],
                'rows': [dummyEpcResponse]
            };

            // when
            const actualResponse = service.getEpcsForPostcode(postcode).toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(expectedResponse);

            // then
            actualResponse.then((response) => {
                expect(response).toEqual([new Epc(dummyEpcResponse)]);
            });
            httpMock.verify();
        }));

        it('should return only the most recent epc for each address', async(() => {
            // given
            const dummyEpcsResponse = require('assets/test/dummy-epcs-response.json');

            // when
            const actualResponse = service.getEpcsForPostcode(postcode).toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(dummyEpcsResponse);

            // then
            actualResponse.then(epcs => {
                const epc = epcs.find(epc => epc.address === 'Apartment 1, 1 Test Street');
                expect(epc.epcDate).toEqual(new Date('2017-01-01'));
            });
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const encodedPostcode = encodeURI(postcode);
            const matchesExpectedUrlWithParams =
                (request.urlWithParams === 'angular-theme/v1/epc?postcode=' + encodedPostcode + '&size=100');
            return matchesExpectedMethod && matchesExpectedUrlWithParams;
        }
    });

    describe('#getRecommendationsForLmkKey', () => {
        const lmkKey = 'fakeKey';

        it('returns recommendations from the EPC recommendations API', () => {
            // given
            const dummyEpcRecommendationsResponse = require('assets/test/dummy-epc-recommendations-response.json');

            // when
            const actualResponse = service.getRecommendationsForLmkKey(lmkKey).toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(dummyEpcRecommendationsResponse);

            // then
            actualResponse.then(response =>
               expect(response).toEqual(dummyEpcRecommendationsResponse.rows.map(rec => new EpcRecommendation(rec)))
            );
        });

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const encodedLmkKey = encodeURI(lmkKey);
            const matchesExpectedUrlWithParams =
                (request.urlWithParams === 'angular-theme/v1/epc-recommendations?lmkKey=' + encodedLmkKey);
            return matchesExpectedMethod && matchesExpectedUrlWithParams;
        }
    });


});
