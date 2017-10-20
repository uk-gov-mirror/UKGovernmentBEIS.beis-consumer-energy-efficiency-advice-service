import {OnInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {QuestionnaireService} from './questions/questionnaire.service';
import {QuestionDirective} from './question.directive';
import {QuestionTypeUtil} from './question-type';
import {oppositeDirection, QuestionBaseComponent, SlideInFrom} from './base-question/question-base-component';
import {AllQuestionsContent} from '../common/question-content/all-questions-content';
import {QuestionContent} from '../common/question-content/question-content';
import {QuestionContentService} from '../common/question-content/question-content.service';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

    private questionComponent: QuestionBaseComponent<any>;
    private allQuestionsContent: AllQuestionsContent;
    private onQuestionCompleteSubscription: Subscription;
    private currentQuestionId: string;

    isLoading: boolean;
    isError: boolean;
    currentQuestionIndex: number;
    currentQuestionContent: QuestionContent;
    questionTypeIconClassName: string;

    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    constructor(private questionContentService: QuestionContentService,
                private questionnaireService: QuestionnaireService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private changeDetectorRef: ChangeDetectorRef) {
        this.currentQuestionIndex = 0;
        this.isLoading = true;
        this.isError = false;
    }

    ngOnInit() {
        this.questionContentService.fetchQuestionsContent()
            .subscribe(
                questionContent => this.onQuestionContentLoaded(questionContent),
                () => this.displayErrorMessage()
            );
    }

    private onQuestionContentLoaded(questionContent: AllQuestionsContent) {
        this.isLoading = false;
        this.allQuestionsContent = questionContent;
        this.jumpToQuestion(this.currentQuestionIndex);
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

    private displayErrorMessage() {
        this.isLoading = false;
        this.isError = true;
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
            this.currentQuestionId = question.questionId;
            this.currentQuestionContent = this.allQuestionsContent[this.currentQuestionId];
            if (!(this.currentQuestionContent && this.currentQuestionContent.questionHeading)) {
                this.displayErrorMessage();
                return;
            }

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(question.componentType);

            // Set the current question to slide out in the opposite direction. Manual change
            // detection must be triggered here or the change will not apply.
            if (this.questionComponent) {
                this.questionComponent.slideInOut = oppositeDirection(slideInFrom);
            }
            this.changeDetectorRef.detectChanges();
            if (!this.questionHost) {
                return;
            }

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
