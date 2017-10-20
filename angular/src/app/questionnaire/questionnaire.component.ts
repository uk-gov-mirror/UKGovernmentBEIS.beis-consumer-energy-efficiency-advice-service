import {Component, AfterViewInit, ComponentFactoryResolver, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {QuestionnaireService} from './questions/questionnaire.service';
import {QuestionDirective} from './question.directive';
import {oppositeDirection, QuestionBaseComponent, SlideInFrom} from "./base-question/question-base-component";
import {QuestionTypeUtil} from './question-type';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements AfterViewInit {

    private questionComponent: QuestionBaseComponent<any>;
    private onQuestionCompleteSubscription: Subscription;

    currentQuestionIndex: number;
    heading: string;
    questionTypeIconClassName: string;

    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    constructor(private questionnaireService: QuestionnaireService,
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

    private getAnimationDirection(index): SlideInFrom {
        if (index < this.currentQuestionIndex) {
            return 'left';
        } else if (index > this.currentQuestionIndex) {
            return 'right';
        } else {
            return 'none';
        }
    }

    animateToQuestion(index) {
        const direction = this.getAnimationDirection(index);
        this.currentQuestionIndex = index;
        this.renderQuestion(direction);
    }

    canGoBack() {
        return this.questionnaireService.getPreviousQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    canGoForwards() {
        return this.questionnaireService.hasBeenAnswered(this.currentQuestionIndex) &&
               this.questionnaireService.getNextQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    goBackOneQuestion() {
        const prevIndex = this.questionnaireService.getPreviousQuestionIndex(this.currentQuestionIndex);
        if (prevIndex !== -1) {
            this.currentQuestionIndex = prevIndex;
            this.renderQuestion('left');
        }
    }

    goForwardsOneQuestion() {
        const nextIndex = this.questionnaireService.getNextQuestionIndex(this.currentQuestionIndex);
        if (nextIndex !== -1) {
            this.currentQuestionIndex = nextIndex;
            this.renderQuestion('right');
        }
    }

    private renderQuestion(slideInFrom: SlideInFrom) {
        const question = this.questionnaireService.getQuestion(this.currentQuestionIndex);
        if (!!question) {
            this.questionTypeIconClassName = QuestionTypeUtil.getIconClassName(question.questionType);
            this.heading = question.heading;

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(question.componentType);

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

            // Subscribe to the question's completion event, and unsubscribe from the previous one.
            if (this.onQuestionCompleteSubscription !== undefined && !this.onQuestionCompleteSubscription.closed) {
                this.onQuestionCompleteSubscription.unsubscribe();
            }
            this.onQuestionCompleteSubscription = this.questionComponent.complete.subscribe(() =>
                this.goForwardsOneQuestion()
            );
        }
    }
}
