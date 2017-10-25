import {async, getTestBed, TestBed} from '@angular/core/testing';

import {EpcApiService} from './epc-api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {WordpressApiService} from '../../../../common/wordpress-api-service/wordpress-api-service';
import {EpcsResponse} from '../model/response/epc/epcs-response';
import {HttpRequest} from '@angular/common/http';

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

    describe('#getEpcData', () => {

        const postcode = 'SW1H 0ET';

        it('returns data from the API endpoint', async(() => {
            // given
            const expectedResponse: EpcsResponse = {
                'column-names': ['dummy-column'],
                'rows': []
            };

            // when
            const actualResponse = service.getEpcData(postcode).toPromise();
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(expectedResponse);

            // then
            actualResponse.then((response) => {
                expect(response).toEqual(expectedResponse);
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const encodedPostcode = encodeURI(postcode);
            const matchesExpectedUrlWithParams =
                (request.urlWithParams === 'angular-theme/v1/epc?postcode=' + encodedPostcode + '&size=100');
            return matchesExpectedMethod && matchesExpectedUrlWithParams;
        }
    });
});
