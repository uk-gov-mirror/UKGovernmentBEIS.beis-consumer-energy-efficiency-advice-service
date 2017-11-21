import {Component, OnInit, AfterViewInit, OnChanges} from "@angular/core";

@Component({
    selector: 'app-boiler-results-page',
    templateUrl: './boiler-results-page.component.html',
    styleUrls: ['./boiler-results-page.component.scss']
})
export class BoilerResultsPageComponent implements OnInit, AfterViewInit, OnChanges {

    isLoading: boolean = false;
    isError: boolean = false;

    constructor() {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.setEqualHeightsOnOptionCardSections();
    }

    ngOnChanges() {
        this.setEqualHeightsOnOptionCardSections();
    }

    private setEqualHeightsOnOptionCardSections() {
        const cards = Array.from(document.querySelectorAll('.boiler-option'));
        const cardSections = cards.map(card => Array.from(card.querySelectorAll('.card-section')));
        if (cardSections.length > 0) {
            console.log(cardSections);
            for (let i = 0; i < cardSections[0].length; i++) {
                cardSections.forEach((card: any) => delete card[i].style['height']);
                const maxHeight = cardSections.reduce((height: number, card: any) => Math.max(height, card[i].offsetHeight), 0);
                cardSections.forEach((card: any) => card[i].style.height = `${maxHeight}px`);
            }
        }
    }
}
