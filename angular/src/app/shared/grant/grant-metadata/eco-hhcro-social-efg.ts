import {NationalGrantMetadata} from "../national-grant-metadata";
import {ResponseData} from "../../response-data/response-data";
import {GrantEligibility} from "../../grants-eligibility/grant-eligibility";
import {TenureType} from "../../../questionnaire/questions/tenure-type-question/tenure-type";
import {EpcRating} from "../../postcode-epc-service/model/epc-rating";
import {Observable} from "rxjs/Observable";
import {EnergyCalculationApiService} from "../../energy-calculation-api-service/energy-calculation-api-service";
import {RdSapInput} from "../../energy-calculation-api-service/request/rdsap-input";

export class EcoHhcroSocialEfg extends NationalGrantMetadata {

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
        const epcRating: Observable<EpcRating> = (responseData.epc && responseData.epc.currentEnergyRating) ?
            Observable.of(responseData.epc.currentEnergyRating) :
            this.getEstimatedEpc(responseData);
        const isApplicableEpcRating = epcRating.map(epcRating => EcoHhcroSocialEfg.APPLICABLE_EPC_RATINGS.indexOf(epcRating) > -1);
        return isApplicableEpcRating.map(isApplicableEpcRating => isApplicableEpcRating ? GrantEligibility.LikelyEligible : GrantEligibility.Ineligible);
    }

    private getEstimatedEpc(responseData: ResponseData): Observable<EpcRating> {
        return this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(responseData))
            .map(response => response ? response['Current-SAP-Band'] : null)
            .map(epcRating => epcRating ? EpcRating[epcRating] : null);
    }
}