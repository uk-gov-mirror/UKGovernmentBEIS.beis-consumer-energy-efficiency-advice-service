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
import {PageStateService} from "../shared/page-state-service/page-state.service";

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
    currentQuestionIndex: number;
    allQuestionsContent: AllQuestionsContent;
    currentQuestionContent: QuestionContent;
    questionTypeIconClassName: string;

    @ViewChild(QuestionDirective) questionHost: QuestionDirective;

    constructor(private questionContentService: QuestionContentService,
                private questionnaireService: QuestionnaireService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private changeDetectorRef: ChangeDetectorRef,
                private router: Router,
                private route: ActivatedRoute,
                private responseData: ResponseData,
                private pageStateService: PageStateService
    ) {
        this.currentQuestionIndex = 0;
        this.questionnaire = this.questionnaireService.getQuestionnaireWithName(route.snapshot.paramMap.get('name'));
    }

    ngOnInit() {
        // Merge the partial response data, passed in via route params, with the saved responses.
        const partialResponse = this.route.snapshot.paramMap.get('partialResponse');
        if (partialResponse !== null) {
            Object.assign(this.responseData, JSON.parse(partialResponse));
        }
        this.pageStateService.showLoading();
        this.questionContentService.fetchQuestionsContent().subscribe(
            questionContent => this.onQuestionContentLoaded(questionContent),
            (error) => this.pageStateService.showGenericErrorAndLogMessage(error)
        );
    }

    private onQuestionContentLoaded(questionContent: AllQuestionsContent) {
        this.allQuestionsContent = questionContent;
        this.jumpToQuestion(this.currentQuestionIndex);
        this.pageStateService.showLoadingComplete();
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
        this.router.navigate(['/results']);
    }

    private renderQuestion(slideInFrom: SlideInFrom) {
        const question = this.questionnaire.getQuestion(this.currentQuestionIndex);
        if (!!question) {
            this.questionTypeIconClassName = QuestionTypeUtil.getIconClassName(question.questionType);
            this.currentQuestionId = question.questionId;
            this.currentQuestionContent = this.allQuestionsContent[this.currentQuestionId];
            if (!(this.currentQuestionContent && this.currentQuestionContent.questionHeading)) {
                this.pageStateService.showGenericErrorAndLogMessage(`No question content found in Wordpress for question with id ${ this.currentQuestionId }`);
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
