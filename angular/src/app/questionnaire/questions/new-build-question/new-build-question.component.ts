import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component} from '@angular/core';

@Component({
    selector: 'app-new-build-question',
    templateUrl: './new-build-question.component.html',
    animations: [slideInOutAnimation]
})
export class NewBuildQuestionComponent extends QuestionBaseComponent {
    get responseForAnalytics(): string {
        return this.responseData.newBuild
            ? 'Home is a new build'
            : 'Home is not a new build';
    }

    get response(): boolean {
        return this.responseData.newBuild;
    }

    set response(val: boolean) {
        this.responseData.newBuild = val;
    }
}
