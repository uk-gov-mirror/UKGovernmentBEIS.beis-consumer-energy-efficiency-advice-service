import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NumberQuestionComponent} from "./number-question/number-question.component";

@NgModule({
    declarations: [
        NumberQuestionComponent
    ],
    exports: [
        NumberQuestionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class CommonQuestionsModule {
}