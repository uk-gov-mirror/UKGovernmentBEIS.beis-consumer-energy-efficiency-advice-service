import {QuestionBaseComponent, QuestionComponent} from "../question.component";
import {HomeType} from "./home-type-question";

// TODO: Sort this nonsense out!
const randomWeirdPrefix = 'wp-content/themes/angular-theme/dist/';

@QuestionComponent({
    selector: 'app-home-type-question',
    templateUrl: './home-type-question.component.html',
    styleUrls: ['./home-type-question.component.scss']
})
export class HomeTypeQuestionComponent extends QuestionBaseComponent<HomeType> {
    private homeTypes: {iconSrc: string, name: string, value: HomeType}[] = [
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/detached-house.svg', name: 'Detached house', value: HomeType.DetachedHouse},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/semi-detached-house.svg', name: 'Semi-detached house', value: HomeType.SemiDetachedHouse},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/end-terrace-house.svg', name: 'End-terrace house', value: HomeType.EndTerraceHouse},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/mid-terrace-house.svg', name: 'Mid-terrace house', value: HomeType.MidTerraceHouse},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/ground-floor-flat.svg', name: 'Ground floor flat', value: HomeType.GroundFloorFlat},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/mid-floor-flat.svg', name: 'Mid floor flat', value: HomeType.MidFloorFlat},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/top-floor-flat.svg', name: 'Top floor flat', value: HomeType.TopFloorFlat},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/bungalow-detached.svg', name: 'Bungalow detached', value: HomeType.BungalowDetached},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/bungalow-attached.svg', name: 'Bungalow attached', value: HomeType.BungalowAttached},
        {iconSrc: randomWeirdPrefix + 'assets/images/home-types/park-home.svg', name: 'Park home', value: HomeType.ParkHome},
    ];
}
