const questionnaireTypes = {
    'home-basics': ''
};

export type QuestionnaireType = keyof typeof questionnaireTypes;

export function isQuestionnaireType(s: string): boolean {
    return questionnaireTypes.hasOwnProperty(s);
}