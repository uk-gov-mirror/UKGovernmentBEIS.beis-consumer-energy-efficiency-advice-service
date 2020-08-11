import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {EnergySavingRecommendation} from '../../shared/recommendation-card/energy-saving-recommendation';
import {ResponseData} from '../../shared/response-data/response-data';
import {isGasOrOil} from '../../questionnaire/questions/fuel-type-question/fuel-type';
import {WaterTankSpace} from '../../questionnaire/questions/water-tank-question/water-tank-space';
import sortBy from 'lodash-es/sortBy';
import {UserStateService} from "../../shared/user-state-service/user-state-service";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {
    shouldRecommendAirSourceHeatPump,
    shouldRecommendGroundSourceHeatPump,
    shouldRecommendSolarWaterHeater
} from "../../shared/heating-systems/heating-systems";

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
                private userStateService: UserStateService,
                private responseData: ResponseData,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.boilerTypesService.fetchBoilerTypes(),
        )
            .subscribe(
                ([boilerTypes]) => {
                    this.applicableBoilerTypes = sortBy(
                        boilerTypes.filter(boilerType => this.boilerIsApplicable(boilerType)),
                        boilerType => boilerType.averageInstallationCost,
                    );
                },
                () => this.handleError(),
                () => this.isLoading = false,
            );
        this.userStateService.saveState();
        this.pageTitle.set('Your boiler recommendations');
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
                return shouldRecommendGroundSourceHeatPump(this.responseData);
            case 'air-source-heat-pump':
                return shouldRecommendAirSourceHeatPump(this.responseData);
            case 'solar-water-heater':
                return shouldRecommendSolarWaterHeater(this.responseData);
            default:
                return false;
        }
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
