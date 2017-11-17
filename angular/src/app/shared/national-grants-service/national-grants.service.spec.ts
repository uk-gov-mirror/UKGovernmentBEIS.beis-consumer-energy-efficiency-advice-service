import {async, getTestBed, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import "rxjs/add/operator/toPromise";
import {NationalGrantsService} from "./national-grants.service";
import {NationalGrantResponse} from "./national-grants-response";

describe('NationalGrantsService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: NationalGrantsService;

    const mockApiResponse: NationalGrantResponse[] = [
        {
            acf: {
                heading: "Eligible grant 1",
                description: "Get paid for creating your own green energy.",
                measures: []
            },
            slug: "an-eligible-grant"
        },
        {
            acf: {
                heading: "Eligible grant 2",
                description: "Get cash if you install or have already installed an eligible renewable heating technology.",
                measures: []
            },
            slug: "another-eligible-grant"
        },
        {
            acf: {
                heading: "Ineligible grant",
                description: "If you're receiving certain benefits, you may get a payment when the weather is cold.",
                measures: []
            },
            slug: "ineligible-grant"
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalAuthorityService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(NationalGrantsService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchNationalGrants', () => {
        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.fetchNationalGrants().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            actualResponse.then((response) => {
                expect(response.length).toBe(3);
                expect(response[0].slug).toEqual('an-eligible-grant');
                expect(response[0].acf.heading).toEqual('Eligible grant 1');
            });
            httpMock.verify();
        }));

        it('does not call API on second call', async(() => {
            // given
            const firstRequest = service.fetchNationalGrants().toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            //when
            firstRequest.then(() => {
                service.fetchNationalGrants().toPromise();

                //then
                httpMock.verify();
            });
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.fetchNationalGrants().toPromise();
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
        const matchesExpectedUrl = request.urlWithParams === 'acf/v3/national_grant';
        return matchesExpectedMethod && matchesExpectedUrl;
    }
});