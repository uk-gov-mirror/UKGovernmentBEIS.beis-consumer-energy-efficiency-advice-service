import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {EnergySavingMeasureResponse} from "../energy-calculation-api-service/response/energy-saving-measure-response";
import {ResponseData} from "../response-data/response-data";
import {GreenHomesGrantService} from "../../green-homes-grant/green-homes-grant-service/green-homes-grant.service";
import {GreenHomesGrantEligibility} from "../../green-homes-grant/green-homes-grant-service/green-homes-grant-eligibility";
import {BoilerTypesService} from "../../boiler/boiler-types-service/boiler-types.service";
import {
    shouldRecommendAirSourceHeatPump,
    shouldRecommendGroundSourceHeatPump
} from "../heating-systems/heating-systems";
import {BoilerType} from "../../boiler/boiler-types-service/boiler-type";
import {HomeType} from "../../questionnaire/questions/home-type-question/home-type";
import {RoofType} from "../../questionnaire/questions/construction-question/construction-types";

export interface GreenHomesGrantRecommendation {
    code: string;
    response: EnergySavingMeasureResponse;
}

const CODES = {
    AIR_SOURCE_HEAT_PUMP: 'Z1',
    GROUND_SOURCE_HEAT_PUMP: 'Z4',
    PARK_HOME_INSULATION: 'park_home_insulation', // There is no proper BRE measure for park home insulation.
    FLAT_ROOF_INSULATION: 'A2',
    ROOM_IN_ROOF_INSULATION: 'A3'
};

const BOILER_SLUGS = {
    AIR_SOURCE_HEAT_PUMP: 'air-source-heat-pump',
    GROUND_SOURCE_HEAT_PUMP: 'ground-source-heat-pump'
};

@Injectable()
export class GreenHomesGrantRecommendationsService {

    constructor(private responseData: ResponseData,
                private greenHomesGrantService: GreenHomesGrantService,
                private boilerTypesService: BoilerTypesService) {
    }

    getGreenHomesGrantRecommendations(): Observable<GreenHomesGrantRecommendation[]> {
        return Observable.forkJoin(
            this.greenHomesGrantService.getEligibility(),
            this.boilerTypesService.fetchBoilerTypes()
        ).mergeMap(([eligibility, boilerTypes]) => {
            if (eligibility === GreenHomesGrantEligibility.Ineligible) {
                return Observable.of([]);
            }
            const heatingSystemRecommendations = this.getHeatingSystemRecommendations(boilerTypes);
            const insulationRecommendations = this.getInsulationRecommendations();
            const recommendations = heatingSystemRecommendations.concat(insulationRecommendations);
            return Observable.of(recommendations);
        });
    }

    private getHeatingSystemRecommendations(boilerTypes: BoilerType[]): GreenHomesGrantRecommendation[] {
        const recommendations: GreenHomesGrantRecommendation[] = [];
        if (shouldRecommendAirSourceHeatPump(this.responseData)) {
            const response = this.getBoilerTypeResponse(boilerTypes, BOILER_SLUGS.AIR_SOURCE_HEAT_PUMP);
            if (response !== null) {
                recommendations.push({ code: CODES.AIR_SOURCE_HEAT_PUMP, response });
            }
        }
        if (shouldRecommendGroundSourceHeatPump(this.responseData)) {
            const response = this.getBoilerTypeResponse(boilerTypes, BOILER_SLUGS.GROUND_SOURCE_HEAT_PUMP);
            if (response !== null) {
                recommendations.push({ code: CODES.GROUND_SOURCE_HEAT_PUMP, response });
            }
        }
        return recommendations;
    }

    // TODO:SEA-38 Update recommendations with figures provided by BEIS.
    private getInsulationRecommendations(): GreenHomesGrantRecommendation[] {
        const recommendations: GreenHomesGrantRecommendation[] = [];
        const { homeType, roofType } = this.responseData;
        if (homeType === HomeType.ParkHomeOrMobileHome) {
            recommendations.push({
                code: CODES.PARK_HOME_INSULATION,
                response: GreenHomesGrantRecommendationsService.getResponse(0, 0, 0)
            });
        } else if (roofType === RoofType.FlatNoInsulation) {
            recommendations.push({
                code: CODES.FLAT_ROOF_INSULATION,
                response: GreenHomesGrantRecommendationsService.getResponse(0, 0, 0)
            });
        } else if (roofType === RoofType.PitchedNoInsulation || roofType === RoofType.PitchedInsulated) {
            recommendations.push({
                code: CODES.ROOM_IN_ROOF_INSULATION,
                response: GreenHomesGrantRecommendationsService.getResponse(0, 0, 0)
            });
        }
        return recommendations;
    }

    private getBoilerTypeResponse(boilerTypes: BoilerType[], slug: string): EnergySavingMeasureResponse {
        const boilerType = boilerTypes.find(type => type.slug === slug);
        if (boilerType === undefined) {
            return null;
        }
        const { installationCostLower, installationCostUpper, lifetimeYears } = boilerType;
        return GreenHomesGrantRecommendationsService.getResponse(
            installationCostLower,
            installationCostUpper,
            lifetimeYears
        );
    }

    private static getResponse(minInstallationCost: number, maxInstallationCost: number, lifetime: number): EnergySavingMeasureResponse {
        return {
            number: '',
            min_installation_cost: minInstallationCost,
            max_installation_cost: maxInstallationCost,
            lifetime: lifetime,
            energy_saving: 0,
            cost_saving: 0,
            uncertainty: 0,
            FIT: 0,
            RHI: 0
        };
    }
}
