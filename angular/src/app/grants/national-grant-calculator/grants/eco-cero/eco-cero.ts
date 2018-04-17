import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EcoCero extends NationalGrantCalculator {
    constructor() {
        super('eco-cero');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        // We would have to integrate with the ECO CERO API lookup to determine
        // this more accurately, which we have decided not to do for now.
        return Observable.of(GrantEligibility.MayBeEligible);
    }
}
