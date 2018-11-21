import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {getHouseBuiltFormDescription, HouseBuiltForm} from "./house-built-form";

class HouseBuiltFormOption {
    public readonly name: string;

    constructor(public readonly value: HouseBuiltForm, public readonly className: string) {
        this.name = getHouseBuiltFormDescription(value);
    }
}

@Component({
    selector: 'app-house-built-form-question',
    templateUrl: './house-built-form-question.component.html',
    styleUrls: ['./house-built-form-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HouseBuiltFormQuestionComponent extends QuestionBaseComponent {
    houseBuiltFormOptions: HouseBuiltFormOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.houseBuiltFormOptions = [
            new HouseBuiltFormOption(HouseBuiltForm.Detached, 'detached'),
            new HouseBuiltFormOption(HouseBuiltForm.SemiDetached, 'semi-detached'),
            new HouseBuiltFormOption(HouseBuiltForm.EndTerrace, 'end-terrace'),
            new HouseBuiltFormOption(HouseBuiltForm.MidTerrace, 'mid-terrace'),
            new HouseBuiltFormOption(HouseBuiltForm.EnclosedEndTerrace, 'enclosed-end-terrace'),
            new HouseBuiltFormOption(HouseBuiltForm.EnclosedMidTerrace, 'enclosed-mid-terrace')
        ];
    }

    get responseForAnalytics(): string {
        return HouseBuiltForm[this.response];
    }

    get response(): HouseBuiltForm {
        return this.responseData.houseBuiltForm;
    }

    set response(val: HouseBuiltForm) {
        this.responseData.houseBuiltForm = val;
    }
}
