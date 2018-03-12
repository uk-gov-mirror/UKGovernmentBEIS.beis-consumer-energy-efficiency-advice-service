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
        // TODO:BEISDEAS-171 add ECO CERO API lookup
        return Observable.of(GrantEligibility.MayBeEligible);
    }
}
