import {async, getTestBed, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WordpressApiService} from "../../shared/wordpress-api-service/wordpress-api-service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import {ResponseData} from "../../shared/response-data/response-data";
import {NationalGrantCalculator} from "../national-grant-calculator/national-grant-calculator";
import {GrantEligibility} from "./grant-eligibility";
import {GrantEligibilityService} from "./grant-eligibility.service";
import {NationalGrantContent} from "../national-grants-content-service/national-grants-content";
import {NationalGrantsContentService} from "../national-grants-content-service/national-grants-content.service";
import {NationalGrantCalculatorProvider} from "../national-grant-calculator/provider/national-grant-calculator.provider";
import {EnergySavingMeasureResponse} from "../../shared/energy-calculation-api-service/response/energy-saving-measure-response";

describe('GrantEligibilityService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: GrantEligibilityService;

    const measureCode = "U";

    const nationalGrantsContent: NationalGrantContent[] = [
        {
            heading: "Linked eligible grant 1",
            description: "Get paid for creating your own green energy.",
            linked_measure_codes: [measureCode],
            display_without_measures: false,
            link_to_measures: true,
            slug: "linked-eligible-grant-1",
            advantages: [],
            steps: []
        },
        {
            heading: "Linked eligible grant 2",
            description: "Get cash if you install or have already installed an eligible renewable heating technology.",
            linked_measure_codes: [measureCode],
            display_without_measures: false,
            link_to_measures: true,
            slug: "linked-eligible-grant-2",
            advantages: [],
            steps: []
        },
        {
            heading: "Standalone eligible grant 1",
            description: "Get cash if you install or have already installed an eligible renewable heating technology.",
            linked_measure_codes: [],
            display_without_measures: true,
            link_to_measures: false,
            slug: "standalone-eligible-grant-1",
            advantages: [],
            steps: []
        },
        {
            heading: "Standalone eligible grant 2",
            description: "Get cash if you install or have already installed an eligible renewable heating technology.",
            linked_measure_codes: [],
            display_without_measures: true,
            link_to_measures: false,
            slug: "standalone-eligible-grant-2",
            advantages: [],
            steps: []
        },
        {
            heading: "Standalone ineligible grant",
            description: "If you're receiving certain benefits, you may get a payment when the weather is cold.",
            linked_measure_codes: [],
            display_without_measures: true,
            link_to_measures: false,
            slug: "standalone-ineligible-grant",
            advantages: [],
            steps: []
        },
        {
            heading: "Linked ineligible grant",
            description: "If you're receiving certain benefits, you may get a payment when the weather is cold.",
            linked_measure_codes: [measureCode],
            display_without_measures: false,
            link_to_measures: true,
            slug: "linked-ineligible-grant",
            advantages: [],
            steps: []
        },
        {
            heading: "Feed in tariff",
            description: "",
            linked_measure_codes: [],
            display_without_measures: false,
            link_to_measures: true,
            slug: "feed-in-tariff",
            advantages: [],
            steps: []
        },
        {
            heading: "Renewable heat incentive",
            description: "",
            linked_measure_codes: [],
            display_without_measures: false,
            link_to_measures: true,
            slug: "renewable-heat-incentive",
            advantages: [],
            steps: []
        }
    ];

    class EligibleNationalGrant extends NationalGrantCalculator {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.LikelyEligible);
        }

        getStandaloneAnnualPaymentPounds(responseData: ResponseData): number {
            return 120;
        }
    }

    class IneligibleNationalGrant extends NationalGrantCalculator {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.Ineligible);
        }

        getStandaloneAnnualPaymentPounds(responseData: ResponseData): number {
            return null;
        }
    }

    let nationalGrantsResponse: Observable<NationalGrantContent[]>;
    const nationalGrantsContentServiceStub = {
        fetchNationalGrantsContent: () => nationalGrantsResponse
    };

    const nationalGrantCalculatorProviderStub = {
        nationalGrants: [
            new EligibleNationalGrant('linked-eligible-grant-1'),
            new EligibleNationalGrant('linked-eligible-grant-2'),
            new EligibleNationalGrant('standalone-eligible-grant-1'),
            new EligibleNationalGrant('standalone-eligible-grant-2'),
            new EligibleNationalGrant('feed-in-tariff'),
            new EligibleNationalGrant('renewable-heat-incentive'),
            new IneligibleNationalGrant('linked-ineligible-grant'),
            new IneligibleNationalGrant('standalone-ineligible-grant')
        ]
    };

    beforeEach(async(() => {
        nationalGrantsResponse = Observable.of(nationalGrantsContent);

        TestBed.configureTestingModule({
            providers: [GrantEligibilityService,
                ResponseData,
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}},
                {provide: NationalGrantsContentService, useValue: nationalGrantsContentServiceStub},
                {provide: NationalGrantCalculatorProvider, useValue: nationalGrantCalculatorProviderStub}
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

    describe('#getEligibleStandaloneGrants', () => {
        it('should return all standalone eligible national grants', async(() => {
            // when
            service.getEligibleStandaloneGrants().toPromise()
                .then((applicableGrants) => {

                    // then
                    const allGrantNames = applicableGrants.map(grant => grant.name);
                    expect(allGrantNames).toContain('Standalone eligible grant 1');
                    expect(allGrantNames).toContain('Standalone eligible grant 2');
                });
        }));

        it('should not return ineligible national grants', async(() => {
            // when
            service.getEligibleStandaloneGrants().toPromise()
                .then((applicableGrants) => {

                    // then
                    const allGrantNames = applicableGrants.map(grant => grant.name);
                    expect(allGrantNames).not.toContain('Standalone ineligible grant');
                });
        }));

        it('should not return non-standalone grants', async(() => {
            // when
            service.getEligibleStandaloneGrants().toPromise()
                .then((applicableGrants) => {

                    // then
                    const allGrantNames = applicableGrants.map(grant => grant.name);
                    expect(allGrantNames).not.toContain('Linked eligible grant 1');
                    expect(allGrantNames).not.toContain('Linked eligible grant 2');
                });
        }));
    });

    describe('#getEligibleGrantsForMeasure', () => {
        it('should return FIT if included in measure', async(() => {
            // given
            const measure: EnergySavingMeasureResponse = {
                "cost_saving": 230.64,
                "energy_saving": 0,
                "number": "34",
                "FIT": 100,
                "RHI": 0
            };
            const fitMeasureCode = "U";

            // when
            const grants = service.getEligibleGrantsForMeasure(fitMeasureCode, measure);

            // then
            grants.toPromise().then((applicableGrants) => {
                    const allGrantNames = applicableGrants.map(grant => grant.name);
                    expect(allGrantNames).toContain('Feed in tariff');
                });
        }));

        it('should not return FIT if not included in measure', async(() => {
            // given
            const measure: EnergySavingMeasureResponse = {
                "cost_saving": 230.64,
                "energy_saving": 0,
                "number": "34",
                "FIT": 0,
                "RHI": 0
            };
            const fitMeasureCode = "U";

            // when
            const grants = service.getEligibleGrantsForMeasure(fitMeasureCode, measure);

            // then
            grants.toPromise().then((applicableGrants) => {
                const allGrantNames = applicableGrants.map(grant => grant.name);
                expect(allGrantNames).not.toContain('Feed in tariff');
            });
        }));

        it('should return RHI if included in measure', async(() => {
            // given
            const measure: EnergySavingMeasureResponse = {
                "cost_saving": 230.64,
                "energy_saving": 0,
                "number": "34",
                "FIT": 0,
                "RHI": 100
            };

            // when
            const grants = service.getEligibleGrantsForMeasure(measureCode, measure);

            // then
            grants.toPromise().then((applicableGrants) => {
                const allGrantNames = applicableGrants.map(grant => grant.name);
                expect(allGrantNames).toContain('Renewable heat incentive');
            });
        }));

        it('should not return RHI if not included in measure', async(() => {
            // given
            const measure: EnergySavingMeasureResponse = {
                "cost_saving": 230.64,
                "energy_saving": 0,
                "number": "34",
                "FIT": 0,
                "RHI": 0
            };

            // when
            const grants = service.getEligibleGrantsForMeasure(measureCode, measure);

            // then
            grants.toPromise().then((applicableGrants) => {
                const allGrantNames = applicableGrants.map(grant => grant.name);
                expect(allGrantNames).not.toContain('Renewable heat incentive');
            });
        }));

        it('should return all grants linked to the measure', async(() => {
            // given
            const measure: EnergySavingMeasureResponse = {
                "cost_saving": 230.64,
                "energy_saving": 0,
                "number": "34",
                "FIT": 0,
                "RHI": 0
            };

            // when
            const grants = service.getEligibleGrantsForMeasure(measureCode, measure);

            // then
            grants.toPromise().then((applicableGrants) => {
                const allGrantNames = applicableGrants.map(grant => grant.name);
                expect(allGrantNames).toContain('Linked eligible grant 1');
                expect(allGrantNames).toContain('Linked eligible grant 2');
            });
        }));

        it('should not return grants not linked to the measure', async(() => {
            // given
            const measure: EnergySavingMeasureResponse = {
                "cost_saving": 230.64,
                "energy_saving": 0,
                "number": "34",
                "FIT": 0,
                "RHI": 0
            };

            // when
            const grants = service.getEligibleGrantsForMeasure(measureCode, measure);

            // then
            grants.toPromise().then((applicableGrants) => {
                const allGrantNames = applicableGrants.map(grant => grant.name);
                expect(allGrantNames).not.toContain('Standalone eligible grant 1');
                expect(allGrantNames).not.toContain('Standalone eligible grant 2');
            });
        }));

        it('should not return ineligible grants', async(() => {
            // given
            const measure: EnergySavingMeasureResponse = {
                "cost_saving": 230.64,
                "energy_saving": 0,
                "number": "34",
                "FIT": 0,
                "RHI": 0
            };

            // when
            const grants = service.getEligibleGrantsForMeasure(measureCode, measure);

            // then
            grants.toPromise().then((applicableGrants) => {
                const allGrantNames = applicableGrants.map(grant => grant.name);
                expect(allGrantNames).not.toContain('Linked ineligible grant');
            });
        }));
    });
});