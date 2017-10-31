import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
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