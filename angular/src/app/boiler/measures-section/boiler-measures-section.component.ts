import {Component, Input} from "@angular/core";
import {EnergySavingMeasure} from "../../shared/recommendation-card/energy-saving-recommendation";

@Component({
    selector: 'app-boiler-measures-section',
    templateUrl: './boiler-measures-section.component.html',
    styleUrls: ['./boiler-measures-section.component.scss']
})
export class BoilerMeasuresSectionComponent {
    @Input() measures: EnergySavingMeasure[];
}
