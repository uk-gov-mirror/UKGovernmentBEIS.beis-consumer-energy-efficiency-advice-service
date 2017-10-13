import { Component, AfterViewInit, ComponentFactoryResolver, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { QuestionService } from "./questions/question.service";
import {QuestionDirective} from "./questions/question.directive";
import {oppositeDirection, QuestionBaseComponent, SlideInFrom} from "./questions/question.component";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionnaireComponent implements AfterViewInit {

    private currentQuestionIndex: number;
    private questionComponent: QuestionBaseComponent<any>;
    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    constructor(private questionService: QuestionService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private changeDetectorRef: ChangeDetectorRef) {
        this.currentQuestionIndex = 0;
    }

    ngAfterViewInit() {
        // Since we are inside a change detection hook, we can't just call this directly! We must
        // schedule it to be called after the change detection cycle has completed.
        setTimeout(() => this.jumpToQuestion(this.currentQuestionIndex), 0);
    }

    private jumpToQuestion(index) {
        this.currentQuestionIndex = index;
        this.renderQuestion('none');
    }

    private canGoBack() {
        return this.currentQuestionIndex !== 0;
    }

    private canGoForwards() {
        return (
            this.questionService.getQuestion(this.currentQuestionIndex) !== undefined &&
            this.questionService.getQuestion(this.currentQuestionIndex).response !== undefined &&
            this.currentQuestionIndex + 1 < this.questionService.numberOfQuestions
        );
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

    private getHeading() {
        return this.questionService.getHeading(this.currentQuestionIndex);
    }

    private renderQuestion(slideInFrom: SlideInFrom) {
        const question = this.questionService.getQuestion(this.currentQuestionIndex);
        if (!!question) {
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
                question.response = this.questionComponent.response = response;
                // Allow a change-detection cycle to run, and the user to see their updated answer,
                // before moving on to the next question.
                setTimeout(() => this.goForwardsOneQuestion(), 50);
            };
        }
    }
}
