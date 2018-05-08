import { Component, Input, OnInit } from '@angular/core';
import {MeasureContent} from "../../shared/energy-saving-measure-content-service/measure-content";
import {EnergySavingMeasureContentService} from '../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';

@Component({
  selector: 'app-measure-card',
  templateUrl: './measure-card.component.html',
  styleUrls: ['./measure-card.component.scss']
})
export class MeasureCardComponent implements OnInit {
    @Input() measure: MeasureContent;
    statisticValue: string;
    statisticContext: string;

    getMeasureIcon(measure: MeasureContent) {
        return EnergySavingMeasureContentService.measureIcons[measure.acf.measure_code];
    }

    ngOnInit() {
        const statistic = this.measure.acf.statistic;
        if (statistic) {
            this.statisticValue = statistic.substring(0, statistic.indexOf(" "));
            this.statisticContext = statistic.substring(statistic.indexOf(" ") + 1);
        }
    }
}
