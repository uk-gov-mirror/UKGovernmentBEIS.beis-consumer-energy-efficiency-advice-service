import {Component} from "@angular/core";
import {AssetsService} from "../../shared/assets-service/assets.service";

import fuzzysearch from "fuzzysearch";
import sortBy from "lodash-es/sortBy";
import includes from "lodash-es/includes";

interface BoilerMake {
    productIndexNumber: string;
    brandName: string;
    modelName: string;
    modelQualifier: string;
}

interface BoilerDropdownItem {
    id: string;
    name: string;
}

@Component({
    selector: 'app-boiler-make-model-lookup',
    templateUrl: './boiler-make-model-lookup.component.html',
    styleUrls: ['./boiler-make-model-lookup.component.scss']
})
export class BoilerMakeModelLookupComponent {

    searching: boolean;
    searchTerm: string;
    matchedBoilers: BoilerDropdownItem[];
    selectedBoiler: BoilerDropdownItem;

    constructor(private assetsService: AssetsService) {
    }

    lookupBoilersFromSearchTerm(searchTerm: string) {
        this.searching = true;
        this.assetsService.getAsset('/boilers/gas-and-oil-boiler.json').subscribe(
            boilers => this.findMatchedBoilers(searchTerm, boilers),
            () => this.findMatchedBoilers(searchTerm, []),
        );
    }

    private findMatchedBoilers(searchTerm: string, allBoilers: BoilerMake[]) {
        const matchedBoilers = allBoilers
            .map(boiler => ({
                id: boiler.productIndexNumber,
                name: `${boiler.brandName} - ${boiler.modelName}, ${boiler.modelQualifier}`,
            }))
            .filter(boiler => fuzzysearch(searchTerm.toLowerCase(), boiler.name.toLowerCase()));

        this.matchedBoilers = sortBy(matchedBoilers, boiler => !includes(boiler.name.toLowerCase(), searchTerm.toLowerCase()));
        this.searching = false;
    }
}
