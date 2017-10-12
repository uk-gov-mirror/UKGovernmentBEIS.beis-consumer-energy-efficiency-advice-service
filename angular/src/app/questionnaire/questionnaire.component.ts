import { Component, AfterViewInit, ComponentFactoryResolver, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { DUMMY_QUESTION_1, DUMMY_QUESTION_2, DUMMY_QUESTION_3, QuestionService } from "./questions/question.service";
import {Question} from "./questions/question";
import {QuestionDirective} from "./questions/question.directive";
import {oppositeDirection, QuestionBaseComponent, SlideInFrom} from "./questions/question.component";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionnaireComponent implements AfterViewInit {

    private questionOrder: {key: string, heading: string}[];
    private currentQuestionIndex: number;
    private questionComponent: QuestionBaseComponent<any>;
    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    constructor(private questionService: QuestionService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private changeDetectorRef: ChangeDetectorRef) {
        this.questionOrder = [
            {key: DUMMY_QUESTION_1, heading: "Dummy question 1"},
            {key: DUMMY_QUESTION_2, heading: "Dummy question 2"},
            {key: DUMMY_QUESTION_3, heading: "Dummy question 3"}
        ];
        this.currentQuestionIndex = 0;
    }

    ngAfterViewInit() {
        // Since we are inside a change detection hook, we can't just call this directly! We must
        // schedule it to be called after the change detection cycle has completed.
        setTimeout(() =>  this.jumpToQuestion(this.findFirstUnansweredQuestionIndex()), 0);
    }

    private findFirstUnansweredQuestionIndex(): number {
        const index = this.questionOrder.findIndex(q => this.questionService.getQuestion(q.key).response === undefined);
        return index === -1 ? this.questionOrder.length - 1 : index;
    }

    private jumpToQuestion(index) {
        this.currentQuestionIndex = index;
        this.renderQuestion('none');
    }

    private canGoBack() {
        return this.currentQuestionIndex !== 0;
    }

    private canGoForwards() {
        return this.currentQuestionHasBeenAnswered() && this.currentQuestionIndex !== this.questionOrder.length - 1;
    }

    private goBackOneQuestion() {
        if (this.canGoBack()) {
            this.currentQuestionIndex -= 1;
            this.renderQuestion('left');
        }
    }

    private goForwardsOneQuestion() {
        if (this.canGoForwards()) {
            this.currentQuestionIndex += 1;
            this.renderQuestion('right');
        }
    }

    private getCurrentQuestion(): Question<any, QuestionBaseComponent<any>> {
        return this.questionService.getQuestion(this.questionOrder[this.currentQuestionIndex].key);
    }

    private currentQuestionHasBeenAnswered(): boolean {
        return this.getCurrentQuestion().response !== undefined;
    }

    private renderQuestion(slideInFrom: SlideInFrom) {
        const question = this.getCurrentQuestion();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(question.questionComponent);

        // Set the current question to slide out in the opposite direction. Manual change
        // detection must be triggered here or the change will not apply.
        if (this.questionComponent) {
            this.questionComponent.slideInOut = oppositeDirection(slideInFrom);
        }
        this.changeDetectorRef.detectChanges();

        // Instantiate the new question and slide in in from the given direction.
        this.questionHost.viewContainerRef.clear();
        const componentRef = this.questionHost.viewContainerRef.createComponent(componentFactory);
        this.questionComponent = componentRef.instance;

        this.questionComponent.slideInOut = slideInFrom;
        this.questionComponent.response = question.response;
        this.questionComponent.onResponse = response => {
            this.getCurrentQuestion().response = this.questionComponent.response = response;
            // Allow a change-detection cycle to run, and the user to see their updated answer,
            // before moving on to the next question.
            setTimeout(() => this.goForwardsOneQuestion(), 50);
        };
    }
}
