import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {GasAndOilBoiler} from "../gas-and-oil-boilers/gas-and-oil-boiler";
import {GasAndOilBoilersService} from "../gas-and-oil-boilers/gas-and-oil-boilers.service";
import {FuelType, getFuelTypeDescription} from "../../questionnaire/questions/fuel-type-question/fuel-type";
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
    boilerTypes: BoilerType[];

    private static readonly EFFICIENCY_THRESHOLD: number = 88;

    constructor(private gasAndOilBoilersService: GasAndOilBoilersService,
                private boilerTypesService: BoilerTypesService,
                private route: ActivatedRoute) {
        this.productIndexNumber = this.route.snapshot.paramMap.get('productIndexNumber');
    }

    ngOnInit() {
        Observable.forkJoin(
            this.gasAndOilBoilersService.getGasAndOilBoilerWithIndexNumber(this.productIndexNumber),
            this.boilerTypesService.fetchBoilerTypes()
        )
            .subscribe(
                ([gasAndOilBoiler, boilerTypes]) => {
                    this.boilerTypes = sortBy(boilerTypes, type => +(type.installationCostLower));
                    this.boiler = gasAndOilBoiler;
                },
                err => this.handleError(err),
                () => this.loading = false,
            );
    }

    getFuelTypeName(fuelType: FuelType) {
        const description = getFuelTypeDescription(fuelType);
        return description === null ? 'Unknown' : description;
    }

    shouldReplace() {
        return this.boiler.efficiency < this.efficiencyThreshold;
    }

    get efficiencyThreshold(): number {
        return BoilerMakeModelReplaceComponent.EFFICIENCY_THRESHOLD;
    }

    private handleError(err) {
        console.error(err);
        this.error = true;
        this.loading = false;
    }
}
