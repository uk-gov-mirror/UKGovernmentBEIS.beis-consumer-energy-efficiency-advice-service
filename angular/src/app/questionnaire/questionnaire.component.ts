import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionDirective} from "./question.directive";
import {QuestionTypeUtil} from "./question-type";
import {oppositeDirection, QuestionBaseComponent, SlideInFrom} from "./base-question/question-base-component";
import {AllQuestionsContent} from "../shared/question-content/all-questions-content";
import {QuestionContent} from "../shared/question-content/question-content";
import {QuestionContentService} from "../shared/question-content/question-content.service";
import {Questionnaire} from "./base-questionnaire/questionnaire";
import {QuestionnaireService} from "./questionnaire.service";
import {Subscription} from "rxjs/Subscription";
import {ResponseData} from "../shared/response-data/response-data";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

    private questionComponent: QuestionBaseComponent;
    private onQuestionCompleteSubscription: Subscription;
    private currentQuestionId: string;

    questionnaire: Questionnaire;
    isLoading: boolean;
    isError: boolean;
    currentQuestionIndex: number;
    allQuestionsContent: AllQuestionsContent;
    currentQuestionContent: QuestionContent;
    questionTypeIconClassName: string;
    shouldDisplayQuestionReason: boolean;

    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    constructor(private questionContentService: QuestionContentService,
                private questionnaireService: QuestionnaireService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private changeDetectorRef: ChangeDetectorRef,
                private router: Router,
                private route: ActivatedRoute
    ) {
        this.currentQuestionIndex = 0;
        this.isLoading = true;
        this.isError = false;
        this.questionnaire = this.questionnaireService.getQuestionnaireWithName(route.snapshot.paramMap.get('name'));
    }

    ngOnInit() {
        this.questionContentService.fetchQuestionsContent().subscribe(
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

    previousQuestionExists() {
        return this.questionnaire.getPreviousQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    nextQuestionExists() {
        return this.questionnaire.getNextQuestionIndex(this.currentQuestionIndex) !== -1;
    }

    canGoBack() {
        return this.previousQuestionExists();
    }

    canGoForwards() {
        return this.nextQuestionExists() &&
            this.questionnaire.hasBeenAnswered(this.currentQuestionIndex);
    }

    goBackOneQuestion() {
        const prevIndex = this.questionnaire.getPreviousQuestionIndex(this.currentQuestionIndex);
        if (prevIndex !== -1) {
            this.currentQuestionIndex = prevIndex;
            this.renderQuestion('left');
        }
    }

    goForwardsOneQuestion() {
        const nextIndex = this.questionnaire.getNextQuestionIndex(this.currentQuestionIndex);
        if (nextIndex !== -1) {
            this.currentQuestionIndex = nextIndex;
            this.renderQuestion('right');
        }
    }

    goToResultsPage() {
        this.router.navigate(['/js/results']);
    }

    toggleQuestionReasonDisplay() {
        this.shouldDisplayQuestionReason = !this.shouldDisplayQuestionReason;
    }

    private renderQuestion(slideInFrom: SlideInFrom) {
        const question = this.questionnaire.getQuestion(this.currentQuestionIndex);
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
            this.onQuestionCompleteSubscription = this.questionComponent.complete.subscribe(() => {
                if (this.nextQuestionExists()) {
                    this.goForwardsOneQuestion()
                } else {
                    this.goToResultsPage();
                }
            });
        }
    }
}
