import { Component, Input } from '@angular/core';
import {MeasureContent} from "../../shared/energy-saving-measure-content-service/measure-content";
import {EnergySavingMeasureContentService} from '../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';

@Component({
  selector: 'app-measure-card',
  templateUrl: './measure-card.component.html',
  styleUrls: ['./measure-card.component.scss']
})
export class MeasureCardComponent {
    @Input() measure: MeasureContent;

    getMeasureIcon(measure: MeasureContent) {
        return EnergySavingMeasureContentService.measureIcons[measure.acf.measure_code];
    }
}
