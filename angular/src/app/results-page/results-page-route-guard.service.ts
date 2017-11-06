import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {isComplete, ResponseData} from "../shared/response-data/response-data";
import {HomeType} from "../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type";
import {HomeAge} from "../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age";
import {FuelType} from "../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type";

@Injectable()
export class ResultsPageRouteGuard implements CanActivate {

    constructor(private responseData: ResponseData,
                private router: Router) {
    }

    canActivate() {
        Object.assign(this.responseData, {
            postcode: 'se20ul',
            epc: null,
            localAuthorityCode: 'E09000011',
            confirmEpc: true,
            homeowner: true,
            homeType: HomeType.MidTerraceHouse,
            homeAge: HomeAge.pre1900,
            flatPosition: undefined,
            numberOfStoreys: 1,
            numberOfBedrooms: 1,
            fuelType: FuelType.MainsGas,
            condensingBoiler: true,
            electricityTariff: undefined,
            numberOfOccupants: 2,
            numberOfShowersPerWeek: 2,
            numberOfBathsPerWeek: 7,
            numberOfFridgeFreezers: 1,
            numberOfFridges: 0,
            numberOfFreezers: 0,
            livingRoomTemperature: 18
        });
        if (isComplete(this.responseData)) {
            return true;
        }
        // If the response data is not complete then we can't display the results page so we navigate to the home page
        this.router.navigate(['/']);
        return false;
    }
}