// This object is shallow-cloned in the questionnaire component
// If any objects are added as fields, we should change that cloning
// to use a deep-cloning method
export interface QuestionContent {
    questionHeading: string;
    helpHtml: string;
    questionReason: string;
    autoOpenQuestionReason?: boolean;
    accordion?: boolean;
}
