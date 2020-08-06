import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {WordpressApiService} from '../../shared/wordpress-api-service/wordpress-api-service';
import 'rxjs/add/operator/toPromise';
import {ResponseData} from '../../shared/response-data/response-data';
import {GreenHomesGrantService} from "./green-homes-grant.service";
import {Country} from "../../questionnaire/questions/postcode-epc-question/country";
import {GreenHomesGrantEligibility} from "./green-homes-grant-eligibility";
import {IncomeThresholdService} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/income-threshold-service/income-threshold.service";
import {
    IncomeThresholdByChildren,
    IncomeThresholds
} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/income-threshold-service/income-thresholds";
import {Observable} from 'rxjs/Observable';
import {OwnHome} from "../../questionnaire/questions/own-home-question/ownHome";

describe('GreenHomesGrantService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: GreenHomesGrantService;
    let responseData: ResponseData;
    let incomeThresholds: IncomeThresholds;

    beforeEach(async(() => {
        responseData = new ResponseData();

        incomeThresholds = {
            'child-benefits': {
                singleClaim: new IncomeThresholdByChildren(
                    0,
                    18500,
                    23000,
                    27500,
                    32000
                ),
                jointClaim: new IncomeThresholdByChildren(
                    0,
                    25500,
                    30000,
                    34500,
                    39000
                ),
                getIncomeThresholdByChildren() {
                    return this.singleClaim;
                }
            }
        };

        TestBed.configureTestingModule({
            providers: [GreenHomesGrantService,
                {provide: ResponseData, useValue: responseData},
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}},
                {provide: IncomeThresholdService, useValue: {fetchIncomeThresholds: () => Observable.of(incomeThresholds)}},
            ],
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(GreenHomesGrantService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getEligibility', () => {
        it('should return ineligible for non-English addresses', async(() => {
            responseData.country = Country.Wales;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.Ineligible);
                });
        }));

        it('should return ineligible for new builds', async(() => {
            responseData.country = Country.England;
            responseData.newBuild = true;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.Ineligible);
                });
        }));

        it("should return ineligible if they don't own their home", async(() => {
            responseData.country = Country.England;
            responseData.newBuild = false;
            responseData.ownsHome = OwnHome.Tenant;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.Ineligible);
                });
        }));

        it('should return fully eligible if they own their home and are on non-child benefits', async(() => {
            responseData.country = Country.England;
            responseData.newBuild = false;
            responseData.ownsHome = OwnHome.Owner;
            responseData.receiveSocietalBenefits = true;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.FullyEligible);
                });
        }));

        it('should return fully eligible if they earn below the child benefits threshold', async(() => {
            responseData.country = Country.England;
            responseData.newBuild = false;
            responseData.ownsHome = OwnHome.Owner;
            responseData.receiveChildBenefits = true;
            responseData.income = 10000;
            responseData.numberOfChildrenAgedUnder5 = 1;
            responseData.numberOfChildrenAged5AndAbove = 0;
            responseData.numberOfAdultsAgedUnder64 = 1;
            responseData.numberOfAdultsAged64To80 = 0;
            responseData.numberOfAdultsAgedOver80 = 0;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.FullyEligible);
                });
        }));

        it('should return partially eligible if they earn above the child benefits threshold', async(() => {
            responseData.country = Country.England;
            responseData.newBuild = false;
            responseData.ownsHome = OwnHome.Owner;
            responseData.receiveChildBenefits = true;
            responseData.income = 1000000;
            responseData.numberOfChildrenAgedUnder5 = 1;
            responseData.numberOfChildrenAged5AndAbove = 0;
            responseData.numberOfAdultsAgedUnder64 = 1;
            responseData.numberOfAdultsAged64To80 = 0;
            responseData.numberOfAdultsAgedOver80 = 0;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.PartiallyEligible);
                });
        }));
    });
});
