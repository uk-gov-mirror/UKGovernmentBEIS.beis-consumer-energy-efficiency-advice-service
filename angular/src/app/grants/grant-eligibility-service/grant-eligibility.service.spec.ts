import {async, getTestBed, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import {LocalAuthority} from "../../shared/local-authority-service/local-authority";
import {ResponseData} from "../../shared/response-data/response-data";
import {NationalGrantCalculatorFactory} from "../national-grant-calculator/national-grant-calculator-factory";
import {NationalGrantCalculator} from "../national-grant-calculator/national-grant-calculator";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {LocalAuthorityGrantViewModel} from "../model/local-authority-grant-view-model";
import {GrantEligibility} from "./grant-eligibility";
import {GrantEligibilityService} from "./grant-eligibility.service";
import {NationalGrantContent} from "../national-grants-content-service/national-grants-content";
import {NationalGrantsContentService} from "../national-grants-content-service/national-grants-content.service";

describe('GrantEligibilityService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: GrantEligibilityService;

    const localAuthorityGrants: LocalAuthorityGrantViewModel[] = [
        {
            name: 'LA Grant 1',
            description: 'some LA grant',
            eligibility: GrantEligibility.MayBeEligible,
            shouldDisplayWithoutMeasures: false,
            annualPaymentPounds: null,
            linkedMeasureCodes: null
        },
        {
            name: 'LA Grant 2',
            description: 'another LA grant',
            eligibility: GrantEligibility.MayBeEligible,
            shouldDisplayWithoutMeasures: false,
            annualPaymentPounds: null,
            linkedMeasureCodes: null
        }
    ];

    const nationalGrantsContent: NationalGrantContent[] = [
        {
            heading: "Eligible grant 1",
            description: "Get paid for creating your own green energy.",
            linked_measure_codes: [],
            display_without_measures: false,
            link_to_measures: true,
            slug: "an-eligible-grant"
        },
        {
            heading: "Eligible grant 2",
            description: "Get cash if you install or have already installed an eligible renewable heating technology.",
            linked_measure_codes: [],
            display_without_measures: false,
            link_to_measures: true,
            slug: "another-eligible-grant"
        },
        {
            heading: "Ineligible grant",
            description: "If you're receiving certain benefits, you may get a payment when the weather is cold.",
            linked_measure_codes: [],
            display_without_measures: false,
            link_to_measures: true,
            slug: "ineligible-grant"
        }
    ];

    class EligibleNationalGrant extends NationalGrantCalculator {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.LikelyEligible);
        }

        getAnnualPaymentPounds(responseData: ResponseData): Observable<number> {
            return Observable.of(120);
        }
    }

    class IneligibleNationalGrant extends NationalGrantCalculator {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.Ineligible);
        }

        getAnnualPaymentPounds(responseData: ResponseData): Observable<number> {
            return Observable.of(null);
        }
    }

    let localAuthorityResponse: Observable<LocalAuthority>;
    const localAuthorityServiceStub = {
        fetchLocalAuthorityDetails: () => localAuthorityResponse
    };

    let nationalGrantsResponse: Observable<NationalGrantContent[]>;
    const nationalGrantsContentServiceStub = {
        fetchNationalGrants: () => nationalGrantsResponse
    };

    let nationalGrantCalculators: NationalGrantCalculator[];
    const nationalGrantCalculatorFactoryStub = {
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
        nationalGrantsResponse = Observable.of(nationalGrantsContent);

        TestBed.configureTestingModule({
            providers: [GrantEligibilityService,
                ResponseData,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}},
                {provide: LocalAuthorityService, useValue: localAuthorityServiceStub},
                {provide: NationalGrantsContentService, useValue: nationalGrantsContentServiceStub},
                {provide: NationalGrantCalculatorFactory, useValue: nationalGrantCalculatorFactoryStub}
            ],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(GrantEligibilityService);
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