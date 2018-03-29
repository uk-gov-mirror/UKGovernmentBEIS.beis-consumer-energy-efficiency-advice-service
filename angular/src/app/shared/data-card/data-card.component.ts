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
    @Input() isSmallCard: boolean = false;
}
