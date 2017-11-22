import {Injectable} from "@angular/core";
import {LocalAuthorityService} from "../../shared/local-authority-service/local-authority.service";
import {NationalGrantCalculator} from "./national-grant-calculator";
import {EcoHhcroHelpToHeat} from "./grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {EcoHhcroSocialEfg} from "./grants/eco-hhcro-social-efg/eco-hhcro-social-efg";
import {EcoHhcroFlex} from "./grants/eco-hhcro-flex/eco-hccro-flex";
import {EcoCero} from "./grants/eco-cero/eco-cero";
import {WinterFuelPayments} from "./grants/winter-fuel-payments/winter-fuel-payments";
import {WarmHomeDiscount} from "./grants/warm-home-discount/warm-home-discount";
import {ColdWeatherPayments} from "./grants/cold-weather-payments/cold-weather-payments";
import {EnergyCalculationApiService} from "../../shared/energy-calculation-api-service/energy-calculation-api-service";
import {IncomeThresholdService} from "./grants/eco-hhcro-help-to-heat/income-threshold-service/income-threshold.service";

@Injectable()
export class NationalGrantCalculatorFactory {

    readonly nationalGrants: NationalGrantCalculator[];

    constructor(
        incomeThresholdService: IncomeThresholdService,
        localAuthorityService: LocalAuthorityService,
        energyCalculationApiService: EnergyCalculationApiService
    ) {
        this.nationalGrants = [
            new EcoHhcroHelpToHeat(incomeThresholdService),
            new EcoHhcroSocialEfg(energyCalculationApiService),
            new EcoHhcroFlex(localAuthorityService),
            new EcoCero(),
            new WinterFuelPayments(),
            new WarmHomeDiscount(),
            new ColdWeatherPayments()
        ]
    }
}