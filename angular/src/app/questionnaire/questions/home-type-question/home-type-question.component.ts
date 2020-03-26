import {Component} from '@angular/core';
import {getHomeTypeDescription, HomeType} from './home-type';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

class HomeTypeOption implements MultipleChoiceOption {
    public readonly name: string;

    constructor(public readonly value: HomeType, public readonly className: string) {
        this.name = getHomeTypeDescription(value);
    }
}

@Component({
    selector: 'app-home-type-question',
    templateUrl: './home-type-question.component.html',
    animations: [slideInOutAnimation]
})
export class HomeTypeQuestionComponent extends QuestionBaseComponent {
    homeTypeOptions: HomeTypeOption[];

    get responseForAnalytics(): string {
        return HomeType[this.response];
    }

    constructor(responseData: ResponseData) {
        super(responseData);
        this.homeTypeOptions = [
            new HomeTypeOption(HomeType.House, 'house'),
            new HomeTypeOption(HomeType.Bungalow, 'bungalow'),
            new HomeTypeOption(HomeType.FlatDuplexOrMaisonette, 'flat-duplex-or-maisonette'),
            new HomeTypeOption(HomeType.ParkHomeOrMobileHome, 'park-home-or-mobile-home')
        ];
    }

    get response(): HomeType {
        return this.responseData.homeType;
    }

    set response(val: HomeType) {
        this.responseData.homeType = val;
    }
}
