import {Question} from "../question";
import {HomeTypeQuestionComponent} from "./home-type-question.component";

export enum HomeType {
    DetachedHouse,
    SemiDetachedHouse,
    EndTerraceHouse,
    MidTerraceHouse,
    GroundFloorFlat,
    MidFloorFlat,
    TopFloorFlat,
    BungalowDetached,
    BungalowAttached,
    ParkHome,
}

export class HomeTypeQuestion extends Question<HomeType, HomeTypeQuestionComponent> {
    constructor(responseGetter: () => HomeType, responseSetter: (HomeType) => void) {
        super(HomeTypeQuestionComponent, responseGetter, responseSetter);
    }
}