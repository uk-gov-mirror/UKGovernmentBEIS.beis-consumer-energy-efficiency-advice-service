import {Component, OnInit, AfterViewInit, AfterViewChecked} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import {AllBoilerTypes, BoilerType} from "../boiler-types-service/boiler-type";
import {EnergySavingMeasure} from "../../shared/recommendation-card/energy-saving-recommendation";
import {BoilerPageMeasuresService} from "../measures-section/boiler-page-measures.service";

@Component({
    selector: 'app-boiler-results-page',
    templateUrl: './boiler-results-page.component.html',
    styleUrls: ['./boiler-results-page.component.scss']
})
export class BoilerResultsPageComponent implements OnInit, AfterViewInit, AfterViewChecked {

    isLoading: boolean = true;
    isError: boolean = false;
    applicableBoilerTypes: BoilerType[];
    measures: EnergySavingMeasure[];

    constructor(private boilerTypesService: BoilerTypesService,
                private boilerPageMeasuresService: BoilerPageMeasuresService) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this.boilerTypesService.fetchBoilerTypes(),
            this.boilerPageMeasuresService.fetchMeasuresForBoilerPages(),
        )
            .subscribe(
                ([boilerTypes, measures]) => {
                    this.handleBoilerTypesResponse(boilerTypes);
                    this.measures = measures;
                },
                () => this.handleError(),
                () => this.isLoading = false,
            );
    }

    ngAfterViewInit() {
        this.setEqualHeightsOnOptionCardSections();
    }

    ngAfterViewChecked() {
        this.setEqualHeightsOnOptionCardSections();
    }

    private handleBoilerTypesResponse(boilerTypes: AllBoilerTypes) {
        this.applicableBoilerTypes = [boilerTypes['combi-boiler'], boilerTypes['regular-boiler'], boilerTypes['ground-source-heat-pump']];
    }

    private handleError() {
        this.isError = true;
        this.isLoading = false;
    }

    private setEqualHeightsOnOptionCardSections() {
        const cards = Array.from(document.querySelectorAll('.boiler-option'));
        const cardSections = cards.map(card => Array.from(card.querySelectorAll('.card-section')));
        if (cardSections.length > 0) {
            for (let i = 0; i < cardSections[0].length; i++) {
                cardSections.forEach((card: any) => delete card[i].style['height']);
                const maxHeight = cardSections.reduce((height: number, card: any) => Math.max(height, card[i].offsetHeight), 0);
                cardSections.forEach((card: any) => card[i].style.height = `${maxHeight}px`);
            }
        }
    }
}
