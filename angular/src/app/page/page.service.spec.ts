import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {PageService} from './page.service';
import {WordpressApiService} from "../common/wordpress-api-service/wordpress-api-service";

describe('PageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PageService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
    });

    it('should be created', inject([PageService], (service: PageService) => {
        expect(service).toBeTruthy();
    }));

    it('getPage returns results from API', inject([PageService, HttpTestingController], (service: PageService, httpMock: HttpTestingController) => {
        const testSlug = "my-test-page";
        const renderedContent = "<p>test content</p>";

        let returnedPage = {
            content: {
                rendered: renderedContent
            }
        };

        service.getPage(testSlug)
            .subscribe(data => expect(data.content.rendered).toEqual(renderedContent));

        httpMock.expectOne(`wp/v2/pages?per_page=1&slug=${testSlug}`)
            .flush([returnedPage]);
        httpMock.verify();
    }));
});
