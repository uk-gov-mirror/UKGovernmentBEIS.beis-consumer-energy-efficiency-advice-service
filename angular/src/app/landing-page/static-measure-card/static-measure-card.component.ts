import {Component, Input} from '@angular/core';
import {StaticMeasure} from './static-measure';

@Component({
    selector: 'app-static-measure-card',
    templateUrl: './static-measure-card.component.html',
    styleUrls: ['./static-measure-card.component.scss']
})
export class StaticMeasureCardComponent {
    @Input() measure: StaticMeasure;
}
