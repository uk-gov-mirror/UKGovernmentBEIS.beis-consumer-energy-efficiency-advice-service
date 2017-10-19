import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {HomeType} from "./home-type";
import {ResponseData} from "../../response-data/response-data";

interface HomeTypeOption {
    name: string;
    value: HomeType;
    className: string;
}

@Component({
    selector: 'app-home-type-question',
    templateUrl: './home-type-question.component.html',
    styleUrls: ['./home-type-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HomeTypeQuestionComponent extends QuestionBaseComponent<HomeType> {
    homeTypeOptions: HomeTypeOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.homeTypeOptions = [
            {name: 'Detached house', value: HomeType.DetachedHouse, className: 'detached-house'},
            {name: 'Semi-detached house', value: HomeType.SemiDetachedHouse, className: 'semi-detached-house'},
            {name: 'End-terrace house', value: HomeType.EndTerraceHouse, className: 'end-terrace-house'},
            {name: 'Mid-terrace house', value: HomeType.MidTerraceHouse, className: 'mid-terrace-house'},
            {name: 'Ground floor flat', value: HomeType.GroundFloorFlat, className: 'ground-floor-flat'},
            {name: 'Mid floor flat', value: HomeType.MidFloorFlat, className: 'mid-floor-flat'},
            {name: 'Top floor flat', value: HomeType.TopFloorFlat, className: 'top-floor-flat'},
            {name: 'Bungalow detached', value: HomeType.BungalowDetached, className: 'bungalow-detached'},
            {name: 'Bungalow attached', value: HomeType.BungalowAttached, className: 'bungalow-attached'},
            {name: 'Park home', value: HomeType.ParkHome, className: 'park-home'},
        ];
    }

    get response(): HomeType {
        return this.responseData.homeType;
    }

    set response(val: HomeType) {
        this.responseData.homeType = val;
    }
}
