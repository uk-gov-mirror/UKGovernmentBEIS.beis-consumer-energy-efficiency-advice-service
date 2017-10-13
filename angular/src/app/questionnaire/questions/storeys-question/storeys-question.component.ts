import {QuestionBaseComponent, QuestionComponent} from "../question.component";

@QuestionComponent({
    selector: 'app-storeys-question',
    templateUrl: './storeys-question.component.html',
    styleUrls: ['./storeys-question.component.scss']
})
export class StoreysQuestionComponent extends QuestionBaseComponent<number> {
    storeys: number = 1;
    isInvalid: boolean;

    constructor() {
        super();
    }

    increaseStoreys(amount: number): void {
        this.storeys += amount;
        this.updateStoreys();
    }

    updateStoreys() {
        if (this.storeys < 1) {
            this.isInvalid = true;
        } else {
            this.isInvalid = false;
            console.log(this.storeys);
        }
    }
}
