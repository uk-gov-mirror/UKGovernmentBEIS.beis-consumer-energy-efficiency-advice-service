import {Injectable} from "@angular/core";
import {LocalAuthorityService} from "../local-authority-service/local-authority.service";
import {NationalGrantMetadata} from "./national-grant-metadata";
import {EcoHhcroHelpToHeat} from "./grant-metadata/eco-hhcro-help-to-heat";
import {EcoHhcroSocialEfg} from "./grant-metadata/eco-hhcro-social-efg";
import {EcoHhcroFlex} from "./grant-metadata/eco-hccro-flex";
import {EcoCero} from "./grant-metadata/eco-cero";
import {WinterFuelPayments} from "./grant-metadata/winter-fuel-payments";
import {WarmHomeDiscount} from "./grant-metadata/warm-home-discount";
import {ColdWeatherPayments} from "./grant-metadata/cold-weather-payments";
import {EnergyCalculationApiService} from "../energy-calculation-api-service/energy-calculation-api-service";

@Injectable()
export class NationalGrantMetadataFactory {

    readonly nationalGrants: NationalGrantMetadata[];

    constructor(
        localAuthorityService: LocalAuthorityService,
        energyCalculationApiService: EnergyCalculationApiService
    ) {
        this.nationalGrants = [
            new EcoHhcroHelpToHeat(),
            new EcoHhcroSocialEfg(energyCalculationApiService),
            new EcoHhcroFlex(localAuthorityService),
            new EcoCero(),
            new WinterFuelPayments(),
            new WarmHomeDiscount(),
            new ColdWeatherPayments()
        ]
    }
}