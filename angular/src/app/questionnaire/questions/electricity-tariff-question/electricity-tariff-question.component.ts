import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ElectricityTariff} from "./electricity-tariff";

@Component({
    selector: 'app-electricity-tariff-question',
    templateUrl: './electricity-tariff-question.component.html',
    styleUrls: ['./electricity-tariff-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class ElectricityTariffQuestionComponent extends QuestionBaseComponent {
    ElectricityTariff: typeof ElectricityTariff = ElectricityTariff;

    get response(): ElectricityTariff {
        return this.responseData.electricityTariff;
    }

    set response(val: ElectricityTariff) {
        this.responseData.electricityTariff = val;
    }
}
