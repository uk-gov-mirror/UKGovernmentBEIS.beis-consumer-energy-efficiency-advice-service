import { Component, AfterViewInit, ComponentFactoryResolver, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { QuestionService } from "./questions/question.service";
import {QuestionDirective} from "./questions/question.directive";
import {oppositeDirection, QuestionBaseComponent, SlideInFrom} from "./questions/question.component";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
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

    canGoBack() {
        return this.questionService.getPreviousQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    canGoForwards() {
        return this.questionService.getNextQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    goBackOneQuestion() {
        const prevIndex = this.questionService.getPreviousQuestionIndex(this.currentQuestionIndex);
        if (prevIndex !== -1) {
            this.currentQuestionIndex = prevIndex;
            this.renderQuestion('left');
        }
    }

    goForwardsOneQuestion() {
        const nextIndex = this.questionService.getNextQuestionIndex(this.currentQuestionIndex);
        if (nextIndex !== -1) {
            this.currentQuestionIndex = nextIndex;
            this.renderQuestion('right');
        }
    }

    getHeading() {
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
            this.questionComponent.question = question;
            this.questionComponent.notifyOfCompletion = () => {
                this.goForwardsOneQuestion();
            };
        }
    }
}
