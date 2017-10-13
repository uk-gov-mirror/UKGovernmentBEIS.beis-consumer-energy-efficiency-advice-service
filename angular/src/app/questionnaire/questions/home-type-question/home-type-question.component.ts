import {QuestionBaseComponent, QuestionComponent} from "../question.component";
import {HomeType} from "./home-type-question";
import {Constants} from "../../../common/constants";

@QuestionComponent({
    selector: 'app-home-type-question',
    templateUrl: './home-type-question.component.html',
    styleUrls: ['./home-type-question.component.scss']
})
export class HomeTypeQuestionComponent extends QuestionBaseComponent<HomeType> {
    private homeTypes: {iconSrc: string, name: string, value: HomeType}[];

    constructor(constants: Constants) {
        super();
        this.homeTypes = [
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/detached-house.svg', name: 'Detached house', value: HomeType.DetachedHouse},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/semi-detached-house.svg', name: 'Semi-detached house', value: HomeType.SemiDetachedHouse},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/end-terrace-house.svg', name: 'End-terrace house', value: HomeType.EndTerraceHouse},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/mid-terrace-house.svg', name: 'Mid-terrace house', value: HomeType.MidTerraceHouse},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/ground-floor-flat.svg', name: 'Ground floor flat', value: HomeType.GroundFloorFlat},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/mid-floor-flat.svg', name: 'Mid floor flat', value: HomeType.MidFloorFlat},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/top-floor-flat.svg', name: 'Top floor flat', value: HomeType.TopFloorFlat},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/bungalow-detached.svg', name: 'Bungalow detached', value: HomeType.BungalowDetached},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/bungalow-attached.svg', name: 'Bungalow attached', value: HomeType.BungalowAttached},
            {iconSrc: constants.ASSETS_ROOT + '/images/home-types/park-home.svg', name: 'Park home', value: HomeType.ParkHome},
        ];
    }
}
