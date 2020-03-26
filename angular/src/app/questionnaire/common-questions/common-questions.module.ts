import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NumberQuestionComponent} from './number-question/number-question.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {MultipleChoiceQuestionComponent} from "./multiple-choice-question/multiple-choice-question.component";

@NgModule({
    declarations: [
        MultipleChoiceQuestionComponent,
        NumberQuestionComponent
    ],
    exports: [
        MultipleChoiceQuestionComponent,
        NumberQuestionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InlineSVGModule
    ],
})
export class CommonQuestionsModule {
}
