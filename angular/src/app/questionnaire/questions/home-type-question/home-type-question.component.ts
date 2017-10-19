import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from "../question.component";
import {getHomeTypeDescription, HomeType} from "./home-type";

class HomeTypeOption {
    public name: string;

    constructor(public value: HomeType, public className: string) {
        this.name = getHomeTypeDescription(value);
    }
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
            new HomeTypeOption(HomeType.DetachedHouse, 'detached-house'),
            new HomeTypeOption(HomeType.SemiDetachedHouse, 'semi-detached-house'),
            new HomeTypeOption(HomeType.EndTerraceHouse, 'end-terrace-house'),
            new HomeTypeOption(HomeType.MidTerraceHouse, 'mid-terrace-house'),
            new HomeTypeOption(HomeType.GroundFloorFlat, 'ground-floor-flat'),
            new HomeTypeOption(HomeType.MidFloorFlat, 'mid-floor-flat'),
            new HomeTypeOption(HomeType.TopFloorFlat, 'top-floor-flat'),
            new HomeTypeOption(HomeType.BungalowDetached, 'bungalow-detached'),
            new HomeTypeOption(HomeType.BungalowAttached, 'bungalow-attached'),
            new HomeTypeOption(HomeType.ParkHome, 'park-home')
        ];
    }
}
