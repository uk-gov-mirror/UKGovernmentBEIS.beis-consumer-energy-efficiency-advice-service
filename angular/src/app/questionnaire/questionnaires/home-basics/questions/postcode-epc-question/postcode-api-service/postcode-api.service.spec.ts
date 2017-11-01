import {async, getTestBed, TestBed} from "@angular/core/testing";

import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WordpressApiService} from "../../../../../../shared/wordpress-api-service/wordpress-api-service";
import {HttpRequest} from "@angular/common/http";
import {PostcodeApiService} from "./postcode-api.service";
import {PostcodeResponse} from "../model/response/postcode/postcode-response";

describe('PostcodeApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: PostcodeApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostcodeApiService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(PostcodeApiService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getPostcodeDetails', () => {

        const postcode = 'SW1H 0ET';
        const postcodeWithoutSpaces = 'SW1H0ET';

        it('returns data from the API endpoint', async(() => {
            // given
            const expectedResponse: PostcodeResponse = {
                status: 200,
                result: {
                    postcode: postcode,
                    codes: {
                        admin_district: "E09000033"
                    }
                }
            };

            // when
            const actualResponse = service.getPostcodeDetails(postcode).toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(expectedResponse);

            // then
            actualResponse.then((response) => {
                expect(response).toEqual(expectedResponse);
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl =
                (request.urlWithParams === `angular-theme/v1/postcode/${ postcodeWithoutSpaces }`);
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});
