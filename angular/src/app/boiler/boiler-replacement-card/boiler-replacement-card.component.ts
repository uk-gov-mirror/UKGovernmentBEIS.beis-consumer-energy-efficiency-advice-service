import {Component, Input} from '@angular/core';
import {BoilerType} from '../boiler-types-service/boiler-type';

@Component({
    selector: 'app-boiler-replacement-card',
    templateUrl: './boiler-replacement-card.component.html',
    styleUrls: ['./boiler-replacement-card.component.scss']
})
export class BoilerReplacementCardComponent{

    isExpandedView: boolean = false;
    @Input() boilerType: BoilerType;
    constructor() {}

    toggleExpandedView(): void {
        this.isExpandedView = !this.isExpandedView;
    }
}
