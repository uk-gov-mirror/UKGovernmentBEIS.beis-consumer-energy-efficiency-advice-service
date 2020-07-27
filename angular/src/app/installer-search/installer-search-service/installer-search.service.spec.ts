import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {WordpressApiService} from '../../shared//wordpress-api-service/wordpress-api-service';
import {InstallerSearchService} from "./installer-search.service";
import {Location} from '@angular/common';
import {InstallerResponse} from './installer-response';

describe('InstallerSearchService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: InstallerSearchService;

    const mockApiResponse: InstallerResponse = require('assets/test/installer-search-response.json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InstallerSearchService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}},
                {provide: Location, useValue: {prepareExternalUrl: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(InstallerSearchService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchInstallerDetails', () => {

        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.fetchInstallerDetails("NE30 2LZ", ["100"]).toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            actualResponse.then((installersResponse) => {
                expect(installersResponse).toEqual(mockApiResponse);
            });
            httpMock.verify();
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.fetchInstallerDetails("NE30 2LZ", ["100"]).toPromise();
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
            const matchesExpectedUrl = request.urlWithParams === '/api/installers/NE30%202LZ/100';
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});
