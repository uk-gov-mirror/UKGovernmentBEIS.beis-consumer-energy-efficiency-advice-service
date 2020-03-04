import {Injectable} from '@angular/core';
import {ResponseData} from '../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import Config from '../config';
import {BuiltFormAnswer, getBuiltFormFromEpc} from "../questionnaire/questions/built-form-question/built-form-answer";
import {BuiltForm} from "../shared/energy-calculation-api-service/request/built-form";
import {RdsapInputHelper} from "../shared/energy-calculation-api-service/request/rdsap-input-helper";

@Injectable()
export class ECOSelfReferralApiService {
    private readonly postEndpoint: string = Config().apiRoot + '/eco-self-referral';

    constructor(private http: HttpClient) {
    }

    submitECOSelfReferral(responseData: ResponseData): Observable<Object> {
        return this.http.post(this.postEndpoint, ECOSelfReferralApiService.getPostBody(responseData));
    }

    private static getPostBody(responseData: ResponseData) {
        if (!responseData.builtForm && responseData.epc) {
            responseData.builtForm = getBuiltFormFromEpc(responseData.epc);
        }
        console.log(responseData);

        return {
            'lmk_key': responseData.epc ? responseData.epc.lmkKey : undefined,
            'name': responseData.name,
            'email': responseData.emailAddress,
            'phone_number': responseData.phoneNumber,
            'receive_pension_guarantee_credit': responseData.receivePensionGuaranteeCredit,
            'receive_income_related_benefits': responseData.receiveIncomeRelatedBenefits,
            'receive_societal_benefits': responseData.receiveSocietalBenefits,
            'receive_defense_related_benefits': responseData.receiveDefenseRelatedBenefits,
            'receive_child_benefits': responseData.receiveChildBenefits,
            'income': responseData.income,
            'address1': responseData.epc ? responseData.epc.address1 : undefined,
            'address2': responseData.epc ? responseData.epc.address2 : undefined,
            'address3': responseData.epc ? responseData.epc.address3 : undefined,
            'postcode': responseData.epc ? responseData.epc.postcode : responseData.postcode,
            'tenure_type': responseData.tenureType,
            'home_type': responseData.homeType,
            'number_of_storeys': responseData.numberOfStoreys,
            'number_of_storeys_in_building': responseData.numberOfStoreysInBuilding,
            'built_form': responseData.builtForm,
            'flat_exposed_wall_type': responseData.numberOfExposedWallsInFlat,
            'home_age_band': responseData.homeAge,
            'number_of_bedrooms': responseData.numberOfBedrooms,
            'has_loft': responseData.hasLoft,
            'has_loft_insulation': responseData.hasLoftInsulation,
            'is_loft_accessible_and_clear_of_clutter': responseData.isLoftAccessibleAndClearOfClutter,
            'has_loft_history_of_infestation': responseData.hasLoftHistoryOfInfestation,
            'has_loft_history_of_water_damage': responseData.hasLoftHistoryOfWaterDamage,
            'wall_type': responseData.wallType,
            'fuel_type': responseData.fuelType,
            'has_hot_water_cylinder': responseData.hotWaterCylinder,
            'has_condensing_boiler': responseData.condensingBoiler
        };
    }
}
