import {async, getTestBed, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import "rxjs/add/operator/toPromise";
import {NationalGrantsContentService} from "./national-grants-content.service";
import {NationalGrantContent} from "./national-grants-content";

describe('NationalGrantsContentService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: NationalGrantsContentService;

    const mockApiResponse: NationalGrantContent[] = [
        {
            heading: "Eligible grant 1",
            description: "Get paid for creating your own green energy.",
            linked_measure_codes: ['A', 'B', 'C'],
            display_without_measures: false,
            link_to_measures: true,
            slug: "an-eligible-grant",
            advantages: 'get paid for energy'
        },
        {
            heading: "Eligible grant 2",
            description: "Get cash if you install or have already installed an eligible renewable heating technology.",
            linked_measure_codes: ['A'],
            display_without_measures: false,
            link_to_measures: true,
            slug: "another-eligible-grant",
            advantages: ''
        },
        {
            heading: "Ineligible grant",
            description: "If you're receiving certain benefits, you may get a payment when the weather is cold.",
            linked_measure_codes: [],
            display_without_measures: false,
            link_to_measures: true,
            slug: "ineligible-grant",
            advantages: ''
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NationalGrantsContentService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(NationalGrantsContentService);
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
                expect(response[0].heading).toEqual('Eligible grant 1');
                expect(response[0].linked_measure_codes).toEqual(['A', 'B', 'C']);
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
        const matchesExpectedUrl = request.urlWithParams === 'angular-theme/v1/national-grants';
        return matchesExpectedMethod && matchesExpectedUrl;
    }
});