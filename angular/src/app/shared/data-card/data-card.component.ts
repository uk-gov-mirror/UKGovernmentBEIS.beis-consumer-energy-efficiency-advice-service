import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-data-card',
    templateUrl: './data-card.component.html',
    styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent {
    @Input() heading: string;
    @Input() value: string;
    @Input() colorCircleClassName: string;
    @Input() isVerticalAtMobile: boolean = false;
    // Causes the height of a data card to be reduced at mobile and tablet sizes
    @Input() isSmallCard: boolean = false;
    @Input() isPercent: boolean = false;
    @Input() withSmallFontSize: boolean = false;
    @Input() withVerySmallFontSize: boolean = false;
}
