import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BoilerUpgradeSchemeAshp extends NationalGrantCalculator {

    constructor() {
        super('boiler-upgrade-scheme-ashp');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        return Observable.of(GrantEligibility.LikelyEligible);
    }
}
