import { Component, AfterViewInit, ComponentFactoryResolver, ViewChild, ViewEncapsulation } from '@angular/core';
import { DUMMY_QUESTION_1, DUMMY_QUESTION_2, DUMMY_QUESTION_3, QuestionService } from "./questions/question.service";
import {Question} from "./questions/question";
import {QuestionDirective} from "./questions/question.directive";
import {QuestionBaseComponent} from "./questions/question.component";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionnaireComponent implements AfterViewInit {

    private questionOrder: {key: string, heading: string}[];
    private currentQuestionIndex: number;
    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    constructor(private questionService: QuestionService, private componentFactoryResolver: ComponentFactoryResolver) {
        this.questionOrder = [
            {key: DUMMY_QUESTION_1, heading: "Dummy question 1"},
            {key: DUMMY_QUESTION_2, heading: "Dummy question 2"},
            {key: DUMMY_QUESTION_3, heading: "Dummy question 3"}
        ];
        this.currentQuestionIndex = 0;
    }

    ngAfterViewInit() {
        // Since we are inside a change detection hook, we can't just call this directly!
        setTimeout(() =>  this.goToQuestion(this.findFirstUnansweredQuestionIndex()), 0);
    }

    private findFirstUnansweredQuestionIndex(): number {
        const index = this.questionOrder.findIndex(q => this.questionService.getQuestion(q.key).response === undefined);
        return index === -1 ? this.questionOrder.length - 1 : index;
    }

    private goToQuestion(index) {
        this.currentQuestionIndex = index;
        this.renderQuestion();
    }

    private canGoBack() {
        return this.currentQuestionIndex !== 0;
    }

    private canGoForwards() {
        return this.currentQuestionHasBeenAnswered() && this.currentQuestionIndex !== this.questionOrder.length - 1;
    }

    private goBackOneQuestion() {
        if (this.canGoBack()) {
            this.goToQuestion(this.currentQuestionIndex - 1);
        }
    }

    private goForwardsOneQuestion() {
        if (this.canGoForwards()) {
            this.goToQuestion(this.currentQuestionIndex + 1);
        }
    }

    private getCurrentQuestion(): Question<any, QuestionBaseComponent<any>> {
        return this.questionService.getQuestion(this.questionOrder[this.currentQuestionIndex].key);
    }

    private currentQuestionHasBeenAnswered(): boolean {
        return this.getCurrentQuestion().response !== undefined;
    }

    private renderQuestion() {
        const question = this.getCurrentQuestion();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(question.questionComponent);

        const viewContainerRef = this.questionHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance: QuestionBaseComponent<any> = componentRef.instance;

        componentInstance.response = question.response;
        componentInstance.onResponse = response => {
            this.getCurrentQuestion().response = componentInstance.response = response;
            this.goForwardsOneQuestion();
        }
    }
}
