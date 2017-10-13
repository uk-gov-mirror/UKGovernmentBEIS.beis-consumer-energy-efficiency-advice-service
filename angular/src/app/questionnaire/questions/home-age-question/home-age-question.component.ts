import {QuestionBaseComponent, QuestionComponent} from '../question.component';
import {HomeAge, HomeAgeUtil} from './home-age';

@QuestionComponent({
    selector: 'app-home-age-question',
    templateUrl: './home-age-question.component.html',
    styleUrls: ['./home-age-question.component.scss']
})
export class HomeAgeQuestionComponent extends QuestionBaseComponent<HomeAge> {
    private homeAges = Object.values(HomeAge)
        .filter(homeAge => !isNaN(homeAge))
        .map(homeAge => {
            return {
                name: HomeAgeUtil.getDisplayName(homeAge),
                value: homeAge
            };
        });

    constructor() {
        super();
    }
}