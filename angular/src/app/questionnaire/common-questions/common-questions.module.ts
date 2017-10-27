import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NumberQuestionComponent} from './number-question/number-question.component';
import {CommonModule} from '@angular/common';

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