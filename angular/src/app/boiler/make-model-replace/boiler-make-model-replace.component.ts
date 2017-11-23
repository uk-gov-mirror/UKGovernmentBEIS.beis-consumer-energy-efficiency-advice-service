import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";
import {FuelType} from "../../questionnaire/questions/fuel-type-question/fuel-type";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import {BoilerType} from "../boiler-types-service/boiler-type";
import sortBy from "lodash-es/sortBy";

@Component({
    selector: 'app-boiler-make-model-replace',
    templateUrl: './boiler-make-model-replace.component.html',
    styleUrls: ['./boiler-make-model-replace.component.scss']
})
export class BoilerMakeModelReplaceComponent implements OnInit {

    loading: boolean = true;
    error: boolean = false;
    productIndexNumber: string;
    boiler: GasAndOilBoiler;
    efficiencyThreshold: number = 88;
    boilerTypes: BoilerType[];

    constructor(private gasAndOilBoilersService: GasAndOilBoilersService,
                private boilerTypesService: BoilerTypesService,
                private route: ActivatedRoute) {
        this.productIndexNumber = this.route.snapshot.paramMap.get('productIndexNumber');
    }

    ngOnInit() {
        Observable.forkJoin(
            this.gasAndOilBoilersService.getGasAndOilBoilers(),
            this.boilerTypesService.fetchBoilerTypes()
        )
            .subscribe(
                ([gasAndOilBoilers, boilerTypes]) => {
                    this.boilerTypes = sortBy(Object.values(boilerTypes), type => +(type.installationCostLower));
                    this.setBoiler(gasAndOilBoilers);
                },
                err => this.handleError(err),
                () => this.loading = false,
            );
    }

    getFuelTypeName(fuelType: FuelType) {
        switch (fuelType) {
            case FuelType.MainsGas:
                return 'Mains gas';
            case FuelType.LPGGas:
                return 'LPG gas';
            case FuelType.HeatingOil:
                return 'Heating oil';
            default:
                return 'Unknown';
        }
    }

    shouldReplace() {
        return this.boiler.efficiency < this.efficiencyThreshold;
    }

    private setBoiler(allBoilers: GasAndOilBoiler[]) {
        this.boiler = allBoilers.find(boiler => boiler.productIndexNumber === this.productIndexNumber);
    }

    private handleError(err) {
        console.error(err);
        this.error = true;
        this.loading = false;
    }
}
