import {async, getTestBed, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WordpressApiService} from "../wordpress-api-service/wordpress-api-service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import {GrantsEligibilityService} from "./grants-eligibility.service";
import {LocalAuthority} from "../local-authority-service/local-authority";
import {ResponseData} from "../response-data/response-data";
import {NationalGrantResponse} from "../national-grants-service/national-grants-response";
import {NationalGrantsService} from "../national-grants-service/national-grants.service";
import {NationalGrantMetadataFactory} from "../grant/national-grant-metadata-factory";
import {NationalGrantMetadata} from "../grant/national-grant-metadata";
import {LocalAuthorityService} from "../local-authority-service/local-authority.service";
import {LocalAuthorityGrantViewModel} from "../grant/local-authority-grant-view-model";
import {GrantEligibility} from "./grant-eligibility";

describe('GrantsEligibilityService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: GrantsEligibilityService;

    const localAuthorityGrants: LocalAuthorityGrantViewModel[] = [
        {
            name: 'LA Grant 1',
            description: 'some LA grant',
            eligibility: GrantEligibility.MayBeEligible
        },
        {
            name: 'LA Grant 2',
            description: 'another LA grant',
            eligibility: GrantEligibility.MayBeEligible
        }
    ];

    const nationalGrants: NationalGrantResponse[] = [
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

    class EligibleNationalGrant extends NationalGrantMetadata {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.LikelyEligible);
        }
    }

    class IneligibleNationalGrant extends NationalGrantMetadata {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.Ineligible);
        }
    }

    let localAuthorityResponse: Observable<LocalAuthority>;
    const localAuthorityServiceStub = {
        fetchLocalAuthorityDetails: () => localAuthorityResponse
    };

    let nationalGrantsResponse: Observable<NationalGrantResponse[]>;
    const nationalGrantsServiceStub = {
        fetchNationalGrants: () => nationalGrantsResponse
    };

    let nationalGrantsMetadata: NationalGrantMetadata[];
    const nationalGrantMetadataFactoryStub = {
        nationalGrants: [
            new EligibleNationalGrant('an-eligible-grant'),
            new EligibleNationalGrant('another-eligible-grant'),
            new IneligibleNationalGrant('ineligible-grant')
        ]
    };

    beforeEach(async(() => {
        localAuthorityResponse = Observable.of({
            name: 'Westminster',
            isEcoFlexActive: true,
            ecoFlexMoreInfoLink: 'http://www.example.com',
            grants: localAuthorityGrants
        });
        nationalGrantsResponse = Observable.of(nationalGrants);

        TestBed.configureTestingModule({
            providers: [GrantsEligibilityService,
                ResponseData,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}},
                {provide: LocalAuthorityService, useValue: localAuthorityServiceStub},
                {provide: NationalGrantsService, useValue: nationalGrantsServiceStub},
                {provide: NationalGrantMetadataFactory, useValue: nationalGrantMetadataFactoryStub}
            ],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(GrantsEligibilityService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getApplicableGrants', () => {
        it('should return all local authority grants', async(() => {
            // when
            service.getApplicableGrants().toPromise()
                .then((applicableGrants) => {

                // then
                const allGrantNames = applicableGrants.map(grant => grant.name);
                expect(allGrantNames).toContain('LA Grant 1');
                expect(allGrantNames).toContain('LA Grant 2');
            });
        }));

        it('should return all eligible national grants', async(() => {
            // when
            service.getApplicableGrants().toPromise()
                .then((applicableGrants) => {

                    // then
                    const allGrantNames = applicableGrants.map(grant => grant.name);
                    expect(allGrantNames).toContain('Eligible grant 1');
                    expect(allGrantNames).toContain('Eligible grant 2');
                });
        }));

        it('should return ineligible national grants', async(() => {
            // when
            service.getApplicableGrants().toPromise()
                .then((applicableGrants) => {

                    // then
                    const allGrantNames = applicableGrants.map(grant => grant.name);
                    expect(allGrantNames).not.toContain('Ineligible grant');
                });
        }));
    });
});