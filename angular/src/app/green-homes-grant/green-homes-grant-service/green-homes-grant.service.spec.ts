import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {WordpressApiService} from '../../shared/wordpress-api-service/wordpress-api-service';
import 'rxjs/add/operator/toPromise';
import {ResponseData} from '../../shared/response-data/response-data';
import {GreenHomesGrantService} from "./green-homes-grant.service";
import {Country} from "../../questionnaire/questions/postcode-epc-question/country";
import {GreenHomesGrantEligibility} from "./green-homes-grant-eligibility";

describe('GreenHomesGrantService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: GreenHomesGrantService;
    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();
        responseData.country = Country.England;

        TestBed.configureTestingModule({
            providers: [GreenHomesGrantService,
                {provide: ResponseData, useValue: responseData},
                {provide: WordpressApiService, useValue: {getFullApiEndpoint: x => x}},
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
            responseData.newBuild = true;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.Ineligible);
                });
        }));

        it('should return eligible means-tested if they own their home', async(() => {
            responseData.ownsHome = true;

            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.EligibleMeansTested);
                });
        }));

        it('should return eligible for English addresses', async(() => {
            service.getEligibility().toPromise()
                .then(eligibility => {
                    expect(eligibility).toBe(GreenHomesGrantEligibility.Eligible);
                });
        }));
    });
});
