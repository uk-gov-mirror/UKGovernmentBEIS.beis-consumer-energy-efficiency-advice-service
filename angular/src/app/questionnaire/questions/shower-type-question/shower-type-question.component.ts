import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component} from "@angular/core";
import {ShowerType} from "./shower-type";

export interface ShowerTypeOption {
    name: string;
    value: ShowerType;
}

@Component({
    selector: 'app-shower-type-question',
    templateUrl: './shower-type-question.component.html',
    styleUrls: ['./shower-type-question.scss'],
    animations: [slideInOutAnimation]
})
export class ShowerTypeQuestionComponent extends QuestionBaseComponent {
    showerTypes: ShowerTypeOption[] = [
        {name: 'None', value: ShowerType.None},
        {name: 'Mixer', value: ShowerType.Mixer},
        {name: 'Pumped', value: ShowerType.Pumped},
        {name: 'Pumped and electric', value: ShowerType.PumpedAndElectric},
        {name: 'Mixer and electric', value: ShowerType.MixerAndElectric},
        {name: 'Electric', value: ShowerType.Electric},
        {name: 'I don\'t know', value: ShowerType.DoNotKnow},
    ];

    get responseForAnalytics(): string {
        return ShowerType[this.response];
    }

    get response(): number {
        return this.responseData.showerType;
    }

    set response(val: number) {
        this.responseData.showerType = val;
    }

    handleFormSubmit() {
        if (this.response) {
            this.complete.emit();
        }
    }
}