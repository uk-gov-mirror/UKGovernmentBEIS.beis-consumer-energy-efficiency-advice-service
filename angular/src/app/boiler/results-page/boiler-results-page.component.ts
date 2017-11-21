import {Component, OnInit, AfterViewInit, AfterViewChecked} from "@angular/core";
import {BoilerTypesService} from "../boiler-types-service/boiler-types.service";
import {BoilerType} from "../boiler-types-service/boiler-type";

@Component({
    selector: 'app-boiler-results-page',
    templateUrl: './boiler-results-page.component.html',
    styleUrls: ['./boiler-results-page.component.scss']
})
export class BoilerResultsPageComponent implements OnInit, AfterViewInit, AfterViewChecked {

    isLoading: boolean = true;
    isError: boolean = false;
    applicableBoilerTypes: BoilerType[];

    constructor(private boilerTypesService: BoilerTypesService) {
    }

    ngOnInit() {
        this.boilerTypesService.fetchBoilerTypes().subscribe(
            boilerTypes => this.handleBoilerTypesResponse(boilerTypes),
            err => this.handleError(),
        );
    }

    ngAfterViewInit() {
        this.setEqualHeightsOnOptionCardSections();
    }

    ngAfterViewChecked() {
        this.setEqualHeightsOnOptionCardSections();
    }

    private handleBoilerTypesResponse(boilerTypes: BoilerType[]) {
        this.applicableBoilerTypes = boilerTypes.slice(0, 3);
        this.isLoading = false;
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
