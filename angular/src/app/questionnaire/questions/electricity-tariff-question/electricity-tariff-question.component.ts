import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from "../question.component";
import {ElectricityTariff} from "./electricity-tariff";

@Component({
    selector: 'app-electricity-tariff-question',
    templateUrl: './electricity-tariff-question.component.html',
    styleUrls: ['./electricity-tariff-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class ElectricityTariffQuestionComponent extends QuestionBaseComponent<ElectricityTariff> {
    ElectricityTariff: typeof ElectricityTariff = ElectricityTariff;
}
