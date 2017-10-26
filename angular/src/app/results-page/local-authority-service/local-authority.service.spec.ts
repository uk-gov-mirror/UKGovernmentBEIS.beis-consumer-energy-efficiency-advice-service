import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {LocalAuthorityService} from './local-authority.service';
import {LocalAuthorityResponse} from './local-authority-response';
import {WordpressApiService} from '../../common/wordpress-api-service/wordpress-api-service';

describe('LocalAuthorityService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: LocalAuthorityService;

    const localAuthorityCode = 'E09000033';
    const mockApiResponse: LocalAuthorityResponse = {
        local_authority_code: localAuthorityCode,
        display_name: 'Westminster'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalAuthorityService,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(LocalAuthorityService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchLocalAuthorityDetails', () => {

        it('calls API and returns data correctly', async(() => {
            // when
            const actualResponse = service.fetchLocalAuthorityDetails(localAuthorityCode).toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(mockApiResponse);

            // then
            actualResponse.then((localAuthorityResponse) => {
                expect(localAuthorityResponse.local_authority_code).toBe(localAuthorityCode);
                expect(localAuthorityResponse.display_name).toBe(mockApiResponse.display_name);
            });
            httpMock.verify();
        }));

        it('throws an error if API returns an error', async(() => {
            // given
            const expectedStatus = 400;
            const expectedStatusText = 'bad request';

            // when
            const actualResponse = service.fetchLocalAuthorityDetails(localAuthorityCode).toPromise();
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
            const matchesExpectedUrl = request.urlWithParams === `angular-theme/v1/local-authority/${ localAuthorityCode }`;
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});