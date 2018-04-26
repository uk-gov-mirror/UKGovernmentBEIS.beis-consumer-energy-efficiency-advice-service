import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {LocalAuthorityService} from '../../../../shared/local-authority-service/local-authority.service';
import {Observable} from 'rxjs/Observable';
import * as logger from 'loglevel';

@Injectable()
export class EcoHhcroFlex extends NationalGrantCalculator {

    constructor(private localAuthorityService: LocalAuthorityService) {
        super('eco-hhcro-flex');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        return this.localAuthorityService.fetchLocalAuthorityDetails(responseData.localAuthorityCode)
            .map(response => response.isEcoFlexActive ? GrantEligibility.MayBeEligible : GrantEligibility.Ineligible)
            .catch(error => this.handleErrorAndReturnDefault(error));
    }

    private handleErrorAndReturnDefault(error): Observable<GrantEligibility> {
        logger.error(error.message);
        return Observable.of(GrantEligibility.Ineligible);
    }
}
