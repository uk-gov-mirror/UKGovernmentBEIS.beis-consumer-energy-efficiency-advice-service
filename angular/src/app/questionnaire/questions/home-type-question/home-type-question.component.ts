import {Component} from "@angular/core";
import {getHomeTypeDescription, HomeType} from "./home-type";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ResponseData} from "../../../shared/response-data/response-data";

class HomeTypeOption {
    public readonly name: string;

    constructor(public readonly value: HomeType, public readonly className: string) {
        this.name = getHomeTypeDescription(value);
    }
}

@Component({
    selector: 'app-home-type-question',
    templateUrl: './home-type-question.component.html',
    styleUrls: ['./home-type-question.component.scss'],
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

    get response(): HomeType {
        return this.responseData.homeType;
    }

    set response(val: HomeType) {
        this.responseData.homeType = val;
    }
}
