import {Component, OnInit, AfterViewInit, AfterViewChecked} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {EnergySavingRecommendation} from '../../shared/recommendation-card/energy-saving-recommendation';
import {BoilerPageMeasuresService} from '../measures-section/boiler-page-measures.service';
import {ResponseData} from '../../shared/response-data/response-data';
import {isGasOrOil} from '../../questionnaire/questions/fuel-type-question/fuel-type';
import {WaterTankSpace} from '../../questionnaire/questions/water-tank-question/water-tank-space';
import {GardenAccessibility} from '../../questionnaire/questions/garden-question/garden-accessibility';
import {GlazingType, RoofType, WallType} from '../../questionnaire/questions/construction-question/construction-types';
import {RoofSpace} from '../../questionnaire/questions/roof-space-question/roof-space';
import sortBy from 'lodash-es/sortBy';
import {UserStateService} from "../../shared/user-state-service/user-state-service";

@Component({
    selector: 'app-boiler-results-page',
    templateUrl: './boiler-results-page.component.html',
    styleUrls: ['./boiler-results-page.component.scss']
})
export class BoilerResultsPageComponent implements OnInit, AfterViewInit, AfterViewChecked {

    isLoading: boolean = true;
    isError: boolean = false;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    applicableBoilerTypes: BoilerType[];
    measures: EnergySavingRecommendation[];

    constructor(private boilerTypesService: BoilerTypesService,
                private boilerPageMeasuresService: BoilerPageMeasuresService,
                private userStateService: UserStateService,
                private responseData: ResponseData) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.boilerTypesService.fetchBoilerTypes(),
            this.boilerPageMeasuresService.fetchMeasuresForBoilerPages(),
        )
            .subscribe(
                ([boilerTypes, measures]) => {
                    this.applicableBoilerTypes = sortBy(
                        boilerTypes.filter(boilerType => this.boilerIsApplicable(boilerType)),
                        boilerType => boilerType.averageInstallationCost,
                    );
                    this.measures = measures;
                },
                () => this.handleError(),
                () => this.isLoading = false,
            );
        this.userStateService.sendState();
    }

    ngAfterViewInit() {
        this.setEqualHeightsOnOptionCardSections();
    }

    ngAfterViewChecked() {
        this.setEqualHeightsOnOptionCardSections();
    }

    private handleError() {
        this.isError = true;
        this.isLoading = false;
    }

    private boilerIsApplicable(boiler: BoilerType): boolean {
        switch (boiler.slug) {
            case 'combi-boiler':
                return true;
            case 'system-boiler':
                return isGasOrOil(this.responseData.fuelType) && this.responseData.waterTankSpace !== WaterTankSpace.None;
            case 'regular-boiler':
                return isGasOrOil(this.responseData.fuelType) && this.responseData.waterTankSpace === WaterTankSpace.Bigger;
            case 'ground-source-heat-pump':
                return this.hasLargeGarden(this.responseData) && this.isWellInsulated(this.responseData);
            case 'air-source-heat-pump':
                return this.responseData.gardenAccessibility !== GardenAccessibility.NoGarden && this.isWellInsulated(this.responseData);
            case 'solar-water-heater':
                return this.responseData.waterTankSpace !== WaterTankSpace.None && this.responseData.roofSpace !== RoofSpace.NoSpace;
            default:
                return false;
        }
    }

    private hasLargeGarden(responseData: ResponseData) {
        return responseData.gardenAccessibility === GardenAccessibility.Accessible &&
               responseData.gardenSizeSquareMetres >= 400;
    }

    private isWellInsulated(responseData: ResponseData) {
        return responseData.roofType !== RoofType.PitchedNoInsulation && responseData.roofType !== RoofType.FlatNoInsulation  &&
               responseData.wallType !== WallType.CavityNoInsulation  && responseData.wallType !== WallType.SolidNoInsulation &&
               responseData.glazingType !== GlazingType.Single;
    }

    private setEqualHeightsOnOptionCardSections() {
        const cards = Array.from(document.querySelectorAll('.boiler-option'));
        const cardSections = cards.map(card => Array.from(card.querySelectorAll('.card-section')));
        if (cardSections.length > 0) {
            for (let i = 0; i < cardSections[0].length; i++) {
                cardSections.forEach((card: any) => delete card[i].style['height']);
                const maxHeight = Math.max(...cardSections.map((card: any) => card[i].offsetHeight));
                cardSections.forEach((card: any) => card[i].style.height = `${maxHeight}px`);
            }
        }
    }
}
