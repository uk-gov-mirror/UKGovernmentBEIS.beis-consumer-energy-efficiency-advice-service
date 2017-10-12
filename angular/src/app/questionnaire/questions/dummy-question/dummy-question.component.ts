import {QuestionBaseComponent, QuestionComponent } from "../question.component";

@QuestionComponent({
    selector: 'app-dummy-question',
    templateUrl: './dummy-question.component.html',
    styleUrls: ['./dummy-question.component.scss']
})
export class DummyQuestionComponent extends QuestionBaseComponent<number> {

    private isZero() {
        return this.response === 0;
    }

    private isOne() {
        return this.response === 1;
    }
}
