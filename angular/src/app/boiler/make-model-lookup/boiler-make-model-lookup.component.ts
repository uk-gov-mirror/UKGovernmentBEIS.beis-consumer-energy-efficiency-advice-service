import {Component} from "@angular/core";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";

import fuzzysearch from "fuzzysearch";
import sortBy from "lodash-es/sortBy";
import includes from "lodash-es/includes";

@Component({
    selector: 'app-boiler-make-model-lookup',
    templateUrl: './boiler-make-model-lookup.component.html',
    styleUrls: ['./boiler-make-model-lookup.component.scss']
})
export class BoilerMakeModelLookupComponent {

    searching: boolean;
    searchTerm: string;
    matchedBoilers: GasAndOilBoiler[];
    selectedBoiler: GasAndOilBoiler;

    constructor(private gasAndOilBoilersService: GasAndOilBoilersService) {
    }

    lookupBoilersFromSearchTerm(searchTerm: string) {
        this.searching = true;
        this.gasAndOilBoilersService.getGasAndOilBoilers().subscribe(
            boilers => this.findMatchedBoilers(searchTerm, boilers),
            () => this.findMatchedBoilers(searchTerm, []),
        );
    }

    private findMatchedBoilers(searchTerm: string, allBoilers: GasAndOilBoiler[]) {
        const matchedBoilers = allBoilers
            .filter(boiler => fuzzysearch(searchTerm.toLowerCase(), boiler.name.toLowerCase()));
        this.matchedBoilers = sortBy(matchedBoilers, boiler => !includes(boiler.name.toLowerCase(), searchTerm.toLowerCase()));
        this.searching = false;
    }
}
