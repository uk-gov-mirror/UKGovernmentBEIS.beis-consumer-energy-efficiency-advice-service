import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AssetsService} from "../../shared/assets-service/assets.service";
import {GasAndOilBoiler} from "./gas-and-oil-boiler";

export interface BoilerJson {
    productIndexNumber: string;
    brandName: string;
    modelName: string;
    modelQualifier: string;
    sap2005SeasonalEfficiency: string;
    fuel: string;
}

@Injectable()
export class GasAndOilBoilersService {

    constructor(private assetsService: AssetsService) {
    }

    getGasAndOilBoilers(): Observable<any> {
        return this.assetsService
            .getAsset('boilers/gas-and-oil-boiler.json')
            .map((boilers: any) => boilers.map(boilerJson => GasAndOilBoiler.fromJson(boilerJson)));
    }
}
