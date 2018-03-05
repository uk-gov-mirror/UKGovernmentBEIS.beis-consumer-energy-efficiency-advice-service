import {async, TestBed} from '@angular/core/testing';
import {NationalGrantCalculator} from '../national-grant-calculator';
import {ResponseData} from '../../../shared/response-data/response-data';
import {GrantEligibility} from '../../grant-eligibility-service/grant-eligibility';
import {Observable} from 'rxjs/Observable';
import {NationalGrantCalculatorProvider} from './national-grant-calculator.provider';

describe('NationalGrantCalculatorProvider', () => {
    let provider: NationalGrantCalculatorProvider;

    abstract class BaseMockNationalGrantCalculator extends NationalGrantCalculator {
        getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
            return Observable.of(GrantEligibility.LikelyEligible);
        }

        getStandaloneAnnualPaymentPounds(responseData: ResponseData): number {
            return 0;
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
                NationalGrantCalculatorProvider,
                {provide: NationalGrantCalculator, useClass: MockNationalGrantCalculator, multi: true},
                {provide: NationalGrantCalculator, useClass: AnotherMockNationalGrantCalculator, multi: true}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        provider = TestBed.get(NationalGrantCalculatorProvider);
    });

    it('should be created', () => {
        expect(provider).toBeTruthy();
    });

    it('should be provided with all national grant calculators', () => {
        // given
        const containsAMockNationalGrantCalculator = provider.nationalGrants
            .some(grant => grant instanceof MockNationalGrantCalculator);
        const containsAnotherMockNationalGrantCalculator = provider.nationalGrants
            .some(grant => grant instanceof AnotherMockNationalGrantCalculator);

        // then
        expect(provider.nationalGrants.length).toBe(2);
        expect(containsAMockNationalGrantCalculator).toBeTruthy();
        expect(containsAnotherMockNationalGrantCalculator).toBeTruthy();
        provider.nationalGrants.forEach(grant => expect(grant).toBeTruthy());
    });
});
