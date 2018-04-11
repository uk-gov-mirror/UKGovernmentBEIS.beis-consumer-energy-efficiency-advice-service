import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {Location} from '@angular/common';
import {WordpressApiService} from './wordpress-api-service';
import {WordpressPageResponse} from '../wordpress-pages-service/wordpress-page-response';

describe('WordpressApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: WordpressApiService;

    const postUrl = 'post';
    const mockApiResponse = require('assets/test/search-pages-response.json');

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WordpressApiService,
                {provide: Location, useValue: {prepareExternalUrl: x => x}}
            ],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(WordpressApiService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getPost', () => {
        const testSlug = 'my-test-post';

        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.getPost<WordpressPageResponse>(postUrl, testSlug).toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush([mockApiResponse[0]]);

            // then
            actualResponse.then((postResponse) => {
                // match data in 'assets/test/search-pages-response.json'
                expect(postResponse.slug).toContain('microgen-7');
                expect(postResponse.title.rendered).toBe('Microgen 7');
                expect(postResponse.content.rendered).toBe('<p>Microgen 7</p>\n');
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl = request.urlWithParams === `/wp-json/post?per_page=1&slug=${testSlug}`;
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});
