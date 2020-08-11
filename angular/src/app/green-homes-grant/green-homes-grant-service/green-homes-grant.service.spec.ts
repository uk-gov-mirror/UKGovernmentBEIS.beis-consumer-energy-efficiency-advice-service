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

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            providers: [GreenHomesGrantService,
                {provide: ResponseData, useValue: responseData},
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}}
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

        it("should return partially eligible if they are a landlord and it's not a new build", async(() => {
            responseData.country = Country.England;
            responseData.newBuild = false;
            responseData.ownsHome = OwnHome.Landlord;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.PartiallyEligible);
                });
        }));

        it('should return partially eligible if they are in England, own their home and have no benefits', async(() => {
            responseData.country = Country.England;
            responseData.newBuild = false;
            responseData.ownsHome = OwnHome.Owner;
            responseData.receiveSocietalBenefits = false;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.PartiallyEligible);
                });
        }));

        it("should return partially eligible if they say they have benefits, but then don't have any of the benefits on the list",
        async(() => {
            responseData.country = Country.England;
            responseData.newBuild = false;
            responseData.ownsHome = OwnHome.Owner;
            responseData.receiveAnyBenefits = true;
            responseData.receivePensionGuaranteeCredit = false;
            responseData.receiveIncomeRelatedBenefits = false;
            responseData.receiveContributionBasedBenefits = false;
            responseData.receiveSocietalBenefits = false;
            responseData.receiveHousingBenefit = false;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.PartiallyEligible);
                });
        }));
    });
});
