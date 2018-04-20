import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {WordpressPagesService} from './wordpress-pages.service';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';

describe('WordpressPagesService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: WordpressPagesService;

    const mockApiResponse = require('assets/test/search-pages-response.json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WordpressPagesService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}
            ],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(WordpressPagesService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getTopLevelPages', () => {
        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.getTopLevelPages().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            actualResponse.then((pagesResponse) => {
                // match data in 'assets/test/search-pages-response.json'
                expect(pagesResponse.length).toBe(7);
                expect(pagesResponse[0].route).toContain('microgen-7');
                expect(pagesResponse[0].title).toBe('Microgen 7');
            });
            httpMock.verify();
        }));

        it('does not call API on second call', async(() => {
            // given
            const firstRequest = service.getTopLevelPages().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // when
            firstRequest.then(() => {
                service.getTopLevelPages().toPromise();

                // then
                httpMock.verify();
            });
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.getTopLevelPages().toPromise();
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
            const matchesExpectedUrl = request.urlWithParams === 'wp/v2/pages?parent=0&context=embed';
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });

    describe('#getLatestPages', () => {
        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.getLatestPages('tag_homepage').toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            actualResponse.then((pagesResponse) => {
                // match data in 'assets/test/search-pages-response.json'
                expect(pagesResponse.length).toBe(7);
                expect(pagesResponse[1].route).toContain('grants');
                expect(pagesResponse[1].title).toBe('Grants');
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl = request.urlWithParams ===
                'wp/v2/pages?tag=tag_homepage&per_page=4&orderby=date&order=desc&context=embed';
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});
