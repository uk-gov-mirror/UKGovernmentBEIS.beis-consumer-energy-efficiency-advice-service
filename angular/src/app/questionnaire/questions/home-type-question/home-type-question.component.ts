import {QuestionBaseComponent, QuestionComponent} from "../question.component";
import {HomeType} from "./home-type-question";

@QuestionComponent({
    selector: 'app-home-type-question',
    templateUrl: './home-type-question.component.html',
    styleUrls: ['./home-type-question.component.scss']
})
export class HomeTypeQuestionComponent extends QuestionBaseComponent<HomeType> {
}
