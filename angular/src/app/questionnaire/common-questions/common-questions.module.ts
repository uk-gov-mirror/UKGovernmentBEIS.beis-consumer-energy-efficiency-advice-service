import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NumberQuestionComponent} from "./number-question/number-question.component";

@NgModule({
    declarations: [
        NumberQuestionComponent
    ],
    exports: [
        NumberQuestionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
})
export class CommonQuestionsModule {
}