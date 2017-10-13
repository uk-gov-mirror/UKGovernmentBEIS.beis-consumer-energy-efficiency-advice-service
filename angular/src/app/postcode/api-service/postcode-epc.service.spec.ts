import {TestBed, getTestBed} from "@angular/core/testing";

import {PostcodeEpcService} from "./postcode-epc.service";
import {HttpClientTestingModule, HttpTestingController, RequestMatch} from "@angular/common/http/testing";
import {WordpressApiService} from "../../common/wordpress-api-service/wordpress-api-service";
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
        it('return data from the API endpoint', (done) => {
            // given
            const postcode = 'SW1H 0ET';
            const expectedResponse: EpcsResponse = {
                'column-names': ['dummy-column'],
                'rows': []
            };

            // when
            service.getEpcData(postcode)
                .subscribe(assertExpectedResponse);
            let request = httpMock.expectOne(matchesExpectedRequest);
            request.flush(expectedResponse);

            // then
            httpMock.verify();

            function matchesExpectedRequest(request: HttpRequest<any>): boolean {
                const matchesExpectedMethod = request.method === 'GET';
                const matchesExpectedUrlWithParams =
                    (request.urlWithParams === 'angular-theme/v1/postcode-epc?postcode=SW1H%200ET&size=100');
                return matchesExpectedMethod && matchesExpectedUrlWithParams;
            }

            function assertExpectedResponse(response: EpcsResponse) {
                expect(response).toEqual(expectedResponse);
                done();
            }
        });
    });
});
