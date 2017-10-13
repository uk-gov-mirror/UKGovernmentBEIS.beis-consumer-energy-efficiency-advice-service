import {QuestionBaseComponent, QuestionComponent} from '../question.component';
import {HomeAge, HomeAgeUtil} from './home-age';
import {HorizontalDraggableSelectorDirective} from './horizontal-draggable-selector.directive';
import {ViewChild} from "@angular/core";

interface HomeAgeOption {
    name: string,
    value: HomeAge
}

@QuestionComponent({
    selector: 'app-home-age-question',
    templateUrl: './home-age-question.component.html',
    styleUrls: ['./home-age-question.component.scss']
})
export class HomeAgeQuestionComponent extends QuestionBaseComponent<HomeAge> {
    @ViewChild(HorizontalDraggableSelectorDirective) selector:HorizontalDraggableSelectorDirective;

    constructor() {
        super();
    }

    private homeAges: HomeAge[] = Object.values(HomeAge)
        .filter(homeAge => !isNaN(homeAge));

    private homeAgeOptions: HomeAgeOption[] = this.homeAges
        .map(homeAge => {
            return {
                name: HomeAgeUtil.getDisplayName(homeAge),
                value: homeAge
            };
        });

    private selectHomeAge(option: HomeAgeOption) {
        this.selector.selectResponse(option.value);
    }

    private saveHomeAge(selectedOption: HomeAge) {
        this.response = selectedOption;
    }
}