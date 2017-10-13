import {Question} from "../question";
import {HomeTypeQuestionComponent} from "./home-type-question.component";
import {HomeType} from "./home-type";

export class HomeTypeQuestion extends Question<HomeType, HomeTypeQuestionComponent> {
    constructor(responseGetter: () => HomeType, responseSetter: (HomeType) => void) {
        super(HomeTypeQuestionComponent, 'So what type of home do you have?', responseGetter, responseSetter);
    }
}