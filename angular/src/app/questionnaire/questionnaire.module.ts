import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {QuestionnaireComponent} from './questionnaire.component';
import {QuestionDirective} from './question.directive';
import {QuestionnaireService} from './questionnaire.service';
import {ProgressIndicatorComponent} from './progress-indicator/progress-indicator.component';
import {SmallIndicatorComponent} from "./small-progress-indicator/small-indicator.component";
import {SharedModule} from '../shared/shared.module';
import {QuestionsModule} from './questions/questions.module';
import {QuestionHeadingProcessor} from './question-heading-processor.service';
import {InlineSVGModule} from 'ng-inline-svg';

@NgModule({
    declarations: [
        QuestionnaireComponent,
        QuestionDirective,
        ProgressIndicatorComponent,
        SmallIndicatorComponent
    ],
    exports: [
        QuestionnaireComponent,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        SharedModule,
        QuestionsModule,
        InlineSVGModule
    ]
})
export class QuestionnaireModule {
    static forRoot() {
        return {
            ngModule: QuestionnaireModule,
            providers: [QuestionnaireService, QuestionHeadingProcessor]
        };
    }
}
