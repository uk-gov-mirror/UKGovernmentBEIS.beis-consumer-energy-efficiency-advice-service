import {async, TestBed} from "@angular/core/testing";
import {NationalGrantCalculatorFactory} from "./national-grant-calculator-factory";
import {NationalGrantCalculator} from "../national-grant-calculator";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GrantEligibility} from "../../grant-eligibility-service/grant-eligibility";
import {Observable} from "rxjs/Observable";

describe('NationalGrantCalculatorFactory', () => {
    let factory: NationalGrantCalculatorFactory;

    abstract class BaseMockNationalGrantCalculator extends NationalGrantCalculator {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.LikelyEligible);
        }

        getAnnualPaymentPounds(responseData: ResponseData): Observable<number> {
            return Observable.of(0);
        }
    }

    class MockNationalGrantCalculator extends BaseMockNationalGrantCalculator {
        constructor() {
            super('mock-national-grant');
        }
    }

    class AnotherMockNationalGrantCalculator extends BaseMockNationalGrantCalculator {
        constructor() {
            super('another-mock-national-grant');
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                NationalGrantCalculatorFactory,
                {provide: NationalGrantCalculator, useClass: MockNationalGrantCalculator, multi: true},
                {provide: NationalGrantCalculator, useClass: AnotherMockNationalGrantCalculator, multi: true}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        factory = TestBed.get(NationalGrantCalculatorFactory);
    });

    it('should be created', () => {
        expect(factory).toBeTruthy();
    });

    it('should be provided with all national grant calculators', () => {
        expect(factory.nationalGrants.length).toBe(2);
        factory.nationalGrants.forEach(grant => expect(grant).toBeTruthy());
    });
});