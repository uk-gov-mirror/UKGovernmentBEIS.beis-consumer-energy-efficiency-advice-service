import 'rxjs/add/operator/toPromise';
import {ResponseData} from '../../shared/response-data/response-data';
import {QuestionMetadata} from "../base-question/question-metadata";
import {QuestionType} from "./question-type";
import {QuestionBaseComponent} from "../base-question/question-base-component";
import {QuestionGroupBuilder} from "./question-group-builder";

describe('QuestionGroupBuilder', () => {

    it('should handle a simple list of questions', () => {
        const questions = [
            mockQuestionMetadata()
        ];

        const questionGroup = new QuestionGroupBuilder(questions).build();

        expect(questionGroup).toEqual(questions);
    });

    describe('#andThenContinueIf', () => {
        it('should continue if the predicate returns true', () => {
            const questions = [
                mockQuestionMetadata()
            ];
            const questions2 = [
                mockQuestionMetadata()
            ];

            const questionGroup = new QuestionGroupBuilder(questions)
                .andThenContinueIf(() => true, questions2)
                .build();

            expect(questionGroup.map(q => q.isApplicable(new ResponseData()))).toEqual([true, true]);
        });

        it('should not continue if the predicate returns false', () => {
            const questions = [
                mockQuestionMetadata()
            ];
            const questions2 = [
                mockQuestionMetadata()
            ];

            const questionGroup = new QuestionGroupBuilder(questions)
                .andThenContinueIf(() => false, questions2)
                .build();

            expect(questionGroup.map(q => q.isApplicable(new ResponseData()))).toEqual([true, false]);
        });

        it('should skip all remaining questions after the first failed predicate', () => {
            const questions = [
                mockQuestionMetadata()
            ];
            const questions2 = [
                mockQuestionMetadata(),
                mockQuestionMetadata()
            ];
            const questions3 = [
                mockQuestionMetadata(),
                mockQuestionMetadata(),
                mockQuestionMetadata(),
            ];
            const questions4 = [
                mockQuestionMetadata()
            ];

            const questionGroup = new QuestionGroupBuilder(questions)
                .andThenContinueIf(() => true, questions2)
                .andThenContinueIf(() => false, questions3)
                .andThenContinueIf(() => true, questions4)
                .build();

            expect(questionGroup.map(q => q.isApplicable(new ResponseData()))).toEqual([true, true, true, false, false, false, false]);
        });
    });

    function mockQuestionMetadata(): QuestionMetadata {
        class MockQuestionMetadata extends QuestionMetadata {
            isApplicable(responseData: ResponseData): boolean {
                return true;
            }

            hasBeenAnswered(responseData: ResponseData): boolean {
                return false;
            }
        }

        class MockQuestionComponent extends QuestionBaseComponent {
            get responseForAnalytics(): string {
                return "";
            }
        }

        return new MockQuestionMetadata(
            MockQuestionComponent,
            'own_home',
            QuestionType.House
        );
    }
});
