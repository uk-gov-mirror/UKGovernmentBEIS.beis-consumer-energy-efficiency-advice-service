import {TestBed, getTestBed, async} from "@angular/core/testing";

import {PostcodeEpcService} from "./postcode-epc.service";
import {HttpClientTestingModule, HttpTestingController, RequestMatch} from "@angular/common/http/testing";
import {WordpressApiService} from "../../../../common/wordpress-api-service/wordpress-api-service";
import {EpcsResponse} from '../model/response/epcs-response';
import {HttpRequest} from "@angular/common/http";

describe('PostcodeEpcService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: PostcodeEpcService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostcodeEpcService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(PostcodeEpcService);
    });

    afterEach(() => {

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
                (request.urlWithParams === 'angular-theme/v1/postcode-epc?postcode=' + encodedPostcode + '&size=100');
            return matchesExpectedMethod && matchesExpectedUrlWithParams;
        }
    });
});
