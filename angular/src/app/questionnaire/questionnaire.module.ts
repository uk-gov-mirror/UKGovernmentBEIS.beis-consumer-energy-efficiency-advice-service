import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {QuestionnaireComponent} from "./questionnaire.component";
import {QuestionDirective} from "./question.directive";
import {QuestionnaireService} from "./questionnaire.service";
import {ProgressIndicatorComponent} from "./progress-indicator/progress-indicator.component";
import {HomeBasicsQuestionnaireModule} from "./questionnaires/home-basics/home-basics-questionnaire.module";
import {QuestionnaireGuard} from "./questionnaires/questionnaire.guard";

@NgModule({
    declarations: [
        QuestionnaireComponent,
        QuestionDirective,
        ProgressIndicatorComponent,
    ],
    exports: [
        QuestionnaireComponent,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HomeBasicsQuestionnaireModule,
    ]
})
export class QuestionnaireModule {
    static forRoot() {
        return {
            ngModule: QuestionnaireModule,
            providers: [QuestionnaireService, QuestionnaireGuard]
        };
    }
}