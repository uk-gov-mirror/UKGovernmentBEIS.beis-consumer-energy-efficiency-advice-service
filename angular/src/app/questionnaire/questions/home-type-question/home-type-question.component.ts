import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from "../question.component";
import {getHomeTypeDescription, HomeType} from "./home-type";

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

    constructor() {
        super();
        this.homeTypeOptions = [
            {name: getHomeTypeDescription(HomeType.DetachedHouse), value: HomeType.DetachedHouse, className: 'detached-house'},
            {name: getHomeTypeDescription(HomeType.SemiDetachedHouse), value: HomeType.SemiDetachedHouse, className: 'semi-detached-house'},
            {name: getHomeTypeDescription(HomeType.EndTerraceHouse), value: HomeType.EndTerraceHouse, className: 'end-terrace-house'},
            {name: getHomeTypeDescription(HomeType.MidTerraceHouse), value: HomeType.MidTerraceHouse, className: 'mid-terrace-house'},
            {name: getHomeTypeDescription(HomeType.GroundFloorFlat), value: HomeType.GroundFloorFlat, className: 'ground-floor-flat'},
            {name: getHomeTypeDescription(HomeType.MidFloorFlat), value: HomeType.MidFloorFlat, className: 'mid-floor-flat'},
            {name: getHomeTypeDescription(HomeType.TopFloorFlat), value: HomeType.TopFloorFlat, className: 'top-floor-flat'},
            {name: getHomeTypeDescription(HomeType.BungalowDetached), value: HomeType.BungalowDetached, className: 'bungalow-detached'},
            {name: getHomeTypeDescription(HomeType.BungalowAttached), value: HomeType.BungalowAttached, className: 'bungalow-attached'},
            {name: getHomeTypeDescription(HomeType.ParkHome), value: HomeType.ParkHome, className: 'park-home'},
        ];
    }
}
