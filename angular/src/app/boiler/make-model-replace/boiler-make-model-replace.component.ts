import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {GasAndOilBoiler} from '../gas-and-oil-boilers/gas-and-oil-boiler';
import {GasAndOilBoilersService} from '../gas-and-oil-boilers/gas-and-oil-boilers.service';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import sortBy from 'lodash-es/sortBy';
import {BoilerPageMeasuresService} from '../measures-section/boiler-page-measures.service';
import {EnergySavingRecommendation} from '../../shared/recommendation-card/energy-saving-recommendation';

@Component({
    selector: 'app-boiler-make-model-replace',
    templateUrl: './boiler-make-model-replace.component.html',
    styleUrls: ['./boiler-make-model-replace.component.scss']
})
export class BoilerMakeModelReplaceComponent implements OnInit {

    loading: boolean = true;
    error: boolean = false;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    productIndexNumber: string;

    boiler: GasAndOilBoiler;
    boilerTypes: BoilerType[];
    measures: EnergySavingRecommendation[];

    private static readonly EFFICIENCY_THRESHOLD: number = 88;

    constructor(private gasAndOilBoilersService: GasAndOilBoilersService,
                private boilerTypesService: BoilerTypesService,
                private boilerPageMeasuresService: BoilerPageMeasuresService,
                private route: ActivatedRoute) {
        this.productIndexNumber = this.route.snapshot.paramMap.get('productIndexNumber');
    }

    ngOnInit() {
        Observable.forkJoin(
            this.gasAndOilBoilersService.getGasAndOilBoilerWithIndexNumber(this.productIndexNumber),
            this.boilerTypesService.fetchBoilerTypes(),
            this.boilerPageMeasuresService.fetchMeasuresForBoilerPages(),
        )
            .subscribe(
                ([gasAndOilBoiler, boilerTypes, measures]) => {
                    this.boiler = gasAndOilBoiler;
                    this.boilerTypes = sortBy(boilerTypes, type => +(type.averageInstallationCost));
                    this.measures = measures;
                },
                err => this.handleError(err),
                () => this.loading = false,
            );
    }

    get efficiencyThreshold() {
        return BoilerMakeModelReplaceComponent.EFFICIENCY_THRESHOLD;
    }

    boilerNeedsReplacing() {
        return this.boiler.efficiency < this.efficiencyThreshold;
    }

    private handleError(err) {
        console.error(err);
        this.error = true;
        this.loading = false;
    }
}
