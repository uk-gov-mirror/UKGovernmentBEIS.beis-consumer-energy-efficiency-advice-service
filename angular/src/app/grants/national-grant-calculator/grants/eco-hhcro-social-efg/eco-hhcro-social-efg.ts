import {Injectable} from '@angular/core';
import {NationalGrantCalculator} from '../../national-grant-calculator';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {GrantEligibility} from '../../../grant-eligibility-service/grant-eligibility';
import {TenureType} from '../../../../questionnaire/questions/tenure-type-question/tenure-type';
import {EpcRating} from '../../../../shared/postcode-epc-service/model/epc-rating';
import {Observable} from 'rxjs/Observable';
import {EnergyCalculationApiService} from '../../../../shared/energy-calculation-api-service/energy-calculation-api-service';
import {RdSapInput} from '../../../../shared/energy-calculation-api-service/request/rdsap-input';

@Injectable()
export class EcoHhcroSocialEfg extends NationalGrantCalculator {

    private static readonly APPLICABLE_EPC_RATINGS: EpcRating[] = [
        EpcRating.E,
        EpcRating.F,
        EpcRating.G
    ];

    constructor(private energyCalculationApiService: EnergyCalculationApiService) {
        super('eco-hhcro-social-efg');
    }

    getEligibility(responseData: ResponseData): Observable<GrantEligibility> {
        const isSocialTenant = responseData.tenureType === TenureType.SocialTenancy;
        if (!isSocialTenant) {
            return Observable.of(GrantEligibility.Ineligible);
        }
        const epcRatingObservable: Observable<EpcRating> = (responseData.epc && responseData.epc.currentEnergyRating) ?
            Observable.of(responseData.epc.currentEnergyRating) :
            this.getEstimatedEpc(responseData);
        const isApplicableEpcRatingObservable = epcRatingObservable.map(
            epcRating => EcoHhcroSocialEfg.APPLICABLE_EPC_RATINGS.indexOf(epcRating) > -1);
        return isApplicableEpcRatingObservable.map(
            isApplicableEpcRating => isApplicableEpcRating ? GrantEligibility.LikelyEligible : GrantEligibility.Ineligible);
    }

    private getEstimatedEpc(responseData: ResponseData): Observable<EpcRating> {
        return this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(responseData))
            .map(response => response ? response['Current-SAP-Band'] : null)
            .map(epcRating => epcRating ? EpcRating[epcRating] : null);
    }
}
