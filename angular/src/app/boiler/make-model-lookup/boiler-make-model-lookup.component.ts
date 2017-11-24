import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";

import sortBy from "lodash-es/sortBy";
import includes from "lodash-es/includes";

@Component({
    selector: 'app-boiler-make-model-lookup',
    templateUrl: './boiler-make-model-lookup.component.html',
    styleUrls: ['./boiler-make-model-lookup.component.scss']
})
export class BoilerMakeModelLookupComponent {

    searching: boolean = false;
    searchTerm: string = '';
    matchedBoilers: GasAndOilBoiler[];
    selectedBoiler: GasAndOilBoiler;

    constructor(private gasAndOilBoilersService: GasAndOilBoilersService,
                private router: Router) {
    }

    lookupBoilersFromSearchTerm(searchTerm: string) {
        this.searching = true;
        this.gasAndOilBoilersService.getGasAndOilBoilersMatching(searchTerm).subscribe(
            boilers => this.setMatchedBoilers(searchTerm, boilers),
            err => this.handleError(err),
        );
    }

    private setMatchedBoilers(searchTerm: string, boilers: GasAndOilBoiler[]) {
        this.matchedBoilers = sortBy(boilers, boiler => !includes(boiler.name.toLowerCase(), searchTerm.toLowerCase()));
        this.searching = false;
    }

    private handleError(err) {
        console.error(err);
        this.matchedBoilers = [];
        this.searching = false;
    }

    onBoilerSelected() {
        if (this.selectedBoiler !== undefined) {
            this.router.navigate(['js/boiler/make-model-replace', this.selectedBoiler.productIndexNumber]);
        } else {
            this.router.navigate(['js/boiler/replace']);
        }
    }
}
